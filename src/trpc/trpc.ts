import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import { transformer } from "./shared";

const t = initTRPC.context<Context>().create({
    transformer,
    errorFormatter({ shape }) {
        return shape
    }
})

export const router = t.router
export const publicProcedure = t.procedure