'use server'
import { db } from "@/server/db"
import { UserTable } from "@/server/schema"
import { eq } from "drizzle-orm"

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