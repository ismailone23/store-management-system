import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import { transformer } from "./shared";

const t = initTRPC.context<Context>().create({
    transformer,
    errorFormatter({ shape }) {
        return shape
    }
})

const isAuthed = t.middleware(async ({ ctx, next }) => {
    if (!ctx.session?.user?.id) throw new TRPCError({ code: "UNAUTHORIZED", message: "not authenticated" })
    return next({
        ctx: {
            session: { ...ctx.session, user: ctx.session.user }
        },
    })
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)