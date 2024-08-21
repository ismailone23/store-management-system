'use server'

import { signIn } from "@/server/auth/auth"
import { db } from "@/server/db"
import { UserTable } from "@/server/schema"
import { logintype } from "@/types"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import { AuthError } from "next-auth"
import { MutableRefObject } from "react"

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.query.UserTable.findFirst({ where: eq(UserTable.email, email) })
        return user
    } catch {
        return null
    }
}
export const getUserById = async (id: string) => {
    try {
        const user = await db.query.UserTable.findFirst({ where: eq(UserTable.id, id) })
        return user
    } catch {
        return null
    }
}