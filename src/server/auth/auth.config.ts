import { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { UserTableType } from '@/server/schema'

export default {
    providers: [
        Credentials({
            name: 'Credentials',
            async authorize(credentials, req) {
                const user = credentials as UserTableType
                return user
            }
        })
    ]
} satisfies NextAuthConfig