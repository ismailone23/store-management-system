import { publicProcedure, createTRPCRouter } from "@/trpc/trpc";
import { userRouter } from "./user-router";
import { productRouter } from "./product-router";
import { customerRouter } from "./customers";
import { invoiceRouter } from "./invoices";

export const appRouter = createTRPCRouter({
    hello: publicProcedure.query(async () => {
        return { message: "Hello world" }
    }),
    userRouter,
    productRouter,
    customerRoute: customerRouter,
    invoiceRoute: invoiceRouter
})
export type AppRouter = typeof appRouter