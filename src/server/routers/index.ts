import { publicProcedure, createTRPCRouter } from "@/trpc/trpc";
import { userRouter } from "./user-router";

export const appRouter = createTRPCRouter({
    hello: publicProcedure.query(async () => {
        return { message: "Hello world" }
    }),
    userRouter
})
export type AppRouter = typeof appRouter