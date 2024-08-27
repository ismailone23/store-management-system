import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";
import { z } from "zod";
import { PriceTable, ProductTable, StocksTable } from "@/server/schema";
import { productsjointype, stockhistory } from "@/types";
import { and, desc, eq, gt } from "drizzle-orm";

export const productRouter = createTRPCRouter({
    createProduct: protectedProcedure.input(z.object({
        productname: z.string(),
        userid: z.string(),
        purchasedprice: z.number().default(0),
        mrp: z.number().default(0),
        discount: z.number().default(0),
        totalstock: z.number().default(0),
        image: z.string().optional()
    })).mutation(async ({
        ctx: { db },
        input: {
            discount,
            mrp,
            productname,
            userid,
            purchasedprice,
            totalstock,
            image
        } }) => {
        const newProduct = await db.insert(ProductTable).values({ productname, image: image ?? 'no image' }).returning()
        const productid = newProduct[0].id
        const newPriceTable = new Promise((resolve) => {
            const datatoresolve = db.insert(PriceTable).values({ productid, mrp, discount, purchasedprice }).returning()
            resolve(datatoresolve)
        })
        const newStockTable = new Promise((resolve) => {
            const historyjson: stockhistory = [{ date: new Date(Date.now()), quantity: totalstock, userid }]
            const history = JSON.stringify(historyjson)
            const datatoresolve = db.insert(StocksTable).values({ productid, totalstock, history }).returning()
            resolve(datatoresolve)
        })
        Promise.all([newPriceTable, newStockTable]).then((data) => {
            return data
        }).catch(err => { return err })
    }),
    getProdcts: protectedProcedure.input(z.string().optional()).query(async ({ ctx: { db }, input: str }) => {
        if (!str) return await db.select()
            .from(ProductTable)
            .innerJoin(PriceTable, eq(PriceTable.productid, ProductTable.id))
            .innerJoin(StocksTable, eq(StocksTable.productid, ProductTable.id)).where(eq(ProductTable.isDeleted, false)).orderBy(desc(ProductTable.updatedat))
        return await db.select()
            .from(ProductTable)
            .innerJoin(PriceTable, eq(PriceTable.productid, ProductTable.id))
            .innerJoin(StocksTable, eq(StocksTable.productid, ProductTable.id)).where(and(gt(StocksTable.totalstock, 0), eq(ProductTable.isDeleted, false))).orderBy(desc(ProductTable.updatedat))
    }),
    updateProduct: protectedProcedure.input(z.object({
        id: z.string().optional(),
        productname: z.string().optional(),
        userid: z.string().optional(),
        purchasedprice: z.number().default(0).optional(),
        mrp: z.number().default(0).optional(),
        discount: z.number().default(0).optional(),
        stock: z.number().default(0).optional(),
        image: z.string().optional(),
    }))
        .mutation(async ({ ctx: { db }, input: {
            discount,
            id,
            mrp,
            productname,
            purchasedprice,
            stock,
            userid,
            image
        } }) => {
            if (id) {
                const date = new Date(Date.now())
                let ptabup: { id: string }[]
                if (!image) {
                    ptabup = await db.update(ProductTable).set({ updatedat: date, productname })
                        .where(eq(ProductTable.id, id)).returning({ id: ProductTable.id });
                } else {
                    ptabup = await db.update(ProductTable).set({ updatedat: date, productname, image })
                        .where(eq(ProductTable.id, id)).returning({ id: ProductTable.id });
                }
                if (!ptabup) throw new Error('failed to update')

                const prtabup = await db.update(PriceTable).set({ updatedat: date, purchasedprice, mrp, discount })
                    .where(eq(PriceTable.productid, id)).returning({ id: PriceTable.id });
                if (!prtabup) throw new Error('failed to update')


                const stablep = await db.query.StocksTable.findFirst({ where: eq(StocksTable.productid, id) })
                if (!stablep) throw new Error('failed to update')

                const historystring: stockhistory = JSON.parse(stablep.history)

                if (stock && stock > 0) {
                    const historyar: stockhistory = [...historystring, { date, quantity: stock, userid: userid as string }]
                    const history = JSON.stringify(historyar)
                    const stabup = await db.update(StocksTable).set({ history, updatedat: date, totalstock: stablep.totalstock + stock }).where(eq(StocksTable.productid, id))
                        .returning({ id: StocksTable.id });
                    if (!stabup) throw new Error('failed to update')
                    return stabup
                }
                return prtabup
            }
            return
        }),
    deleteProduct: protectedProcedure.input(z.string().optional()).mutation(async ({ ctx: { db }, input: id }) => {
        if (id) {
            const date = new Date(Date.now())
            return db.update(ProductTable).set({ updatedat: date, isDeleted: true }).where(eq(ProductTable.id, id))
        }
        return
    })
})