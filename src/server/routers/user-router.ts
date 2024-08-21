import { getUserByEmail } from '@/lib/utils/actions';
import { createTRPCRouter, publicProcedure } from '@/trpc/trpc';
import { z } from 'zod';
import { UserTable } from '../schema';
import { hash } from 'bcryptjs'

export const userRouter = createTRPCRouter({
    createUser: publicProcedure.input(z.object({
        name: z.string({ message: 'Please fill up all the fields' }),
        email: z.string({ message: 'Please fill up all the fields.' }),
        password: z.string({ message: 'Please fill up all the fields.' })
            .min(6, { message: 'password must be 6 character.' })
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
    getUser: publicProcedure.input(z.object({
        email: z.string({ message: 'Please fill up all the fields.' }),
        password: z.string({ message: 'Please fill up all the fields.' })
            .min(6, { message: 'password must be 6 character.' })
    })).mutation(async ({ ctx: { db }, input: { email, password } }) => {

    })
})