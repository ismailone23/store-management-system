import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";
import { z } from "zod";

export const invoiceRouter = createTRPCRouter({
    createInvoice: protectedProcedure.input(z.object({
        dealerid: z.number(),
        purchasedlist: z.array(z.object({
            quantity: z.number(),
            productid: z.string(),
            mrp: z.number()
        })),
        createdby: z.string(),
        paymentmethod: z.string()
    })).mutation(async ({ ctx: { db }, input: { } }) => {

    })
})