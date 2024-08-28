import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";
import { z } from "zod";
import { CustomerTable } from "../schema";
import { desc, eq } from "drizzle-orm";
import { customerhistory } from "@/types";

export const customerRouter = createTRPCRouter({
    createCustomer: protectedProcedure.input(z.object({
        name: z.string(),
        number: z.string()
    }))
        .mutation(async ({
            ctx: {
                db
            },
            input: {
                name,
                number
            } }) => {
            const dealerid = '24' + String(Math.random()).split('.')[1].slice(0, 4)
            const history = JSON.stringify([{ date: new Date(Date.now()), amount: 0, type: 'debit' }])
            const newCs = await db.insert(CustomerTable).values({ name, number, dealerid: Number(dealerid), history }).returning()
            if (!newCs) throw new Error('Unable to create')
            return newCs
        }),
    getCustomers: protectedProcedure.query(async ({ ctx: { db } }) => {
        return await db.select().from(CustomerTable).orderBy(desc(CustomerTable.createdat))
    }),
    updateCustomer: protectedProcedure.input(z.object({
        dealerid: z.number(),
        debit: z.number().default(0),
        credit: z.number().default(0),
    })).mutation(async ({ ctx: { db },
        input: {
            dealerid,
            debit,
            credit
        } }) => {
        const date = new Date(Date.now())
        const cs = await db.query.CustomerTable.findFirst({ where: eq(CustomerTable.dealerid, dealerid) })
        if (!cs) throw new Error('Unable to find customer for update')
        const cshistortjson: customerhistory[] = JSON.parse(cs.history)
        let totalcredit: number = cs.totalcredit;
        let totaldebit: number = cs.totaldebit;
        if (debit > 0 && credit == 0) {
            cshistortjson.push({ amount: debit, date, type: 'debit' })
            totaldebit = totaldebit + debit
        } else if (credit > 0 && debit == 0) {
            cshistortjson.push({ amount: credit, date, type: 'credit' })
            totaldebit = totaldebit - credit
            totalcredit = totalcredit + credit
        } else {
            cshistortjson.push({ amount: debit, date, type: 'debit' }, { amount: credit, date, type: 'credit' })
            totalcredit = totalcredit + credit
            totaldebit = totaldebit - credit + debit
        }
        const history = JSON.stringify(cshistortjson)
        return await db.update(CustomerTable).set({ totaldebit, totalcredit, history, updatedat: date }).where(eq(CustomerTable.dealerid, dealerid))
    }),
    deleteCustomer: protectedProcedure.input(z.number()).mutation(async ({ ctx: { db }, input: dealerid }) => {
        const csr = await db.query.CustomerTable.findFirst({ where: eq(CustomerTable.dealerid, dealerid) })
        if (!csr) throw new Error('Customer not found')
        if (csr.totaldebit > 0) throw new Error('Sorry Customer with Debit cannot delete')
        return await db.delete(CustomerTable).where(eq(CustomerTable.dealerid, dealerid))
    })
})