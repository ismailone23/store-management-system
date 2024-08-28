import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";
import { z } from "zod";
import { CustomerTable, InvoicePricelist, InvoicesTable, StocksTable } from "../schema";
import { and, desc, eq, gt, lt, or } from "drizzle-orm";
import { customerhistory } from "@/types";

export const invoiceRouter = createTRPCRouter({
    createInvoice: protectedProcedure.input(z.object({
        dealerid: z.number(),
        mrp: z.number().default(0),
        tbill: z.number().default(0),
        tax: z.number().default(0),
        exdiscount: z.number().default(0),
        purchasedlist: z.array(z.object({
            quantity: z.number(),
            productid: z.string(),
            mrp: z.number()
        })),
        createdby: z.string(),
    })).mutation(async ({ ctx: { db }, input: {
        dealerid, createdby, exdiscount, mrp, purchasedlist, tax, tbill
    } }) => {
        const inovoiceid = await db.insert(InvoicesTable).values({ dealerid, purchasedlist: JSON.stringify(purchasedlist), createdby }).returning()
        if (!inovoiceid) throw new Error('Failed To create invoice')
        const invoiceprice = await db.insert(InvoicePricelist).values({ invoiceid: inovoiceid[0].id, exdiscount, mrp, tax, tbill }).returning();
        if (!invoiceprice) throw new Error('Failed To create invoice')
        const getCustomerdebit = await db.query.CustomerTable.findFirst({ where: eq(CustomerTable.dealerid, dealerid) })
        if (!getCustomerdebit) throw new Error('Failed To create invoice')
        const jhistory = JSON.parse(getCustomerdebit.history)
        const history: customerhistory[] = [...jhistory, { amount: tbill, date: new Date(Date.now()), type: 'debit' }]
        const updateCustomerDebit = await db.update(CustomerTable).set({ totaldebit: getCustomerdebit.totaldebit + tbill, history: JSON.stringify(history) }).where(eq(CustomerTable.dealerid, dealerid))
        const stockarr = await db.query.StocksTable.findMany()

        for (let i = 0; i < purchasedlist.length; i++) {
            const filterdata = stockarr.filter(sf => sf.productid == purchasedlist[i].productid)[0]
            await db.update(StocksTable).set({ totalstock: filterdata.totalstock - purchasedlist[i].quantity }).where(eq(StocksTable.productid, purchasedlist[i].productid))
        }
        return [...inovoiceid, ...invoiceprice]
    }),
    getInvoices: protectedProcedure.query(async ({ ctx: { db } }) => {
        return await db.select().from(InvoicesTable)
            .innerJoin(InvoicePricelist, eq(InvoicePricelist.invoiceid, InvoicesTable.id))
            .orderBy(desc(InvoicesTable.createdat))
    }),
    searchInvoice: protectedProcedure.input(z.object({ from: z.date(), to: z.date() })).mutation(async ({ ctx: { db }, input: { from, to } }) => {
        if (from.getDate() > to.getDate()) {
            throw new Error('Invalid Search parameter.')
        } else if (from.getDate() < to.getDate()) {
            return await db.select().from(InvoicesTable).where(and(gt(InvoicesTable.createdat, from), lt(InvoicesTable.createdat, to)))
                .innerJoin(InvoicePricelist, eq(InvoicePricelist.invoiceid, InvoicesTable.id))
        } else {
            return await db.select().from(InvoicesTable)
                .innerJoin(InvoicePricelist, eq(InvoicePricelist.invoiceid, InvoicesTable.id))
                .orderBy(desc(InvoicesTable.createdat))
        }
    })
})