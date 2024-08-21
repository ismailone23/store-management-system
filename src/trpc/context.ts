import { NextRequest } from "next/server"

interface CreateContextProps {
    req: NextRequest
}

export const createContext = async ({ req }: CreateContextProps) => {
    // const session = await auth
    return {
        req
    }
}
export type Context = typeof createContext