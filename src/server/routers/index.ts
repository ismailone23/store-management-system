import { publicProcedure, createTRPCRouter } from "@/trpc/trpc";
import { userRouter } from "./user-router";
import { productRouter } from "./product-router";

export const appRouter = createTRPCRouter({
    hello: publicProcedure.query(async () => {
        return { message: "Hello world" }
    }),
    userRouter,
    productRouter
})
export type AppRouter = typeof appRouter