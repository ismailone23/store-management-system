import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "../db";
import { accounts, UserTable } from "../schema";
import { getUserById } from "@/lib/utils/actions";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: UserTable,
        accountsTable: accounts
    }),
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, trigger, session }) {
            if (!token.sub) return token
            if (trigger == 'update' && (session?.name && session?.email)) {
                token.name = session.name
                token.email = session.email
            }
            const user = await getUserById(token.sub)
            if (!user) return token
            token.role = user.role
            return token
        },
        async session({ token, session, newSession, trigger }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role
            }
            return session
        }
    },
    ...authConfig
})