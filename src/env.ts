import { createEnv } from "@t3-oss/env-nextjs";
import { z } from 'zod'
export const env = createEnv({
    client: {
        NEXT_PUBLIC_BASE_URL: z.string(),
    },
    server: {
        // DATABASE_URL: z.string().url(),
    },
    shared: {
        NODE_ENV: z.enum(["development", "test", "production"]),
    },
    runtimeEnv: {
        // DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
})