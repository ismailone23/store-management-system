import { getUserByEmail } from '@/lib/utils/actions';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/trpc/trpc';
import { z } from 'zod';
import { UserTable } from '../schema';
import { hash } from 'bcryptjs'
import { desc } from 'drizzle-orm';

export const userRouter = createTRPCRouter({
    createUser: publicProcedure.input(z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
            .min(6)
    })).mutation(async ({ ctx: { db }, input: {
        email,
        name,
        password
    } }) => {
        const isexists = await getUserByEmail(email)
        if (isexists) throw new Error('User already Exits');
        const hashedpasss = await hash(password, 10);
        if (!hashedpasss) throw new Error('Unable to ereate user');
        const newUser = await db.insert(UserTable).values({ email, name, password: hashedpasss }).returning()
        if (!newUser) throw new Error('Unable to ereate user');
        return newUser
    }),
    getUsers: protectedProcedure.query(async ({ ctx: { db } }) => {
        const users = await db.query.UserTable.findMany({ orderBy: desc(UserTable.createdat) })
        if (!users) throw new Error('Unable to find all the users')
        return users
    })
})