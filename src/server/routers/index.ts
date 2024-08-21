import { publicProcedure, router } from "@/trpc/trpc";

export const appRouter = router({
    hello: publicProcedure.query(async () => {
        return { message: "Hello world" }
    })
})
export type AppRouter = typeof appRouter