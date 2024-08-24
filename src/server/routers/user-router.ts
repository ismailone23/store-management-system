import { getUserByEmail } from '@/lib/utils/actions';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/trpc/trpc';
import { z } from 'zod';
import { UserTable } from '../schema';
import { hash } from 'bcryptjs'
import { desc, eq } from 'drizzle-orm';
import { roletype } from '@/types';

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
    }),
    updateUser: protectedProcedure.input(
        z.object({
            id: z.string(),
            email: z.string().email().optional(),
            name: z.string().optional(),
            password: z.string().min(6, { message: 'must be a 6 charecter' }).optional(),
            isapproved: z.boolean().optional(),
            role: z.string().optional(),
        })).mutation(async ({ ctx: { db }, input: { id, isapproved, role, name, email, password } }) => {
            let updateduser;
            if (role) {
                updateduser = await db.update(UserTable)
                    .set({
                        isapproved,
                        role: role as roletype,
                        updatedat: new Date(Date.now())
                    }).where(eq(UserTable.id, id)).returning()
            } else {
                if (password) {
                    const hashedpasss = await hash(password, 10);
                    if (!hashedpasss) throw new Error('Unable to ereate user');
                    updateduser = await db.update(UserTable)
                        .set({
                            name,
                            email,
                            password: hashedpasss,
                            updatedat: new Date(Date.now())
                        }).where(eq(UserTable.id, id)).returning()
                }
                updateduser = await db.update(UserTable)
                    .set({
                        name,
                        email,
                        updatedat: new Date(Date.now())
                    }).where(eq(UserTable.id, id)).returning()
            }
            if (!updateduser) throw new Error('failed to update')
            return updateduser
        }),
    deleteUser: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx: { db }, input: { id } }) => {
        const deleteuser = await db.delete(UserTable).where(eq(UserTable.id, id)).returning()
        if (!deleteuser) throw new Error('failed to delete')
        return deleteuser
    })
})