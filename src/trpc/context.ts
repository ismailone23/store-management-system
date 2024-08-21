import { auth } from "@/server/auth/auth"
import { db } from "@/server/db"
import { NextRequest } from "next/server"

interface CreateContextProps {
    req: NextRequest
}

export const createContext = async ({ req }: CreateContextProps) => {
    const session = await auth()
    return {
        req,
        session,
        db,
    }
}
export type Context = typeof createContext