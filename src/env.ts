import { createEnv } from "@t3-oss/env-nextjs";
import { z } from 'zod'
export const env = createEnv({
    client: {
        NEXT_PUBLIC_BASE_URL: z.string(),
        NEXT_PUBLIC_API_KEY: z.string(),
        NEXT_PUBLIC_AUTH_DOMAIN: z.string(),
        NEXT_PUBLIC_PROJECT_ID: z.string(),
        NEXT_PUBLIC_STORAGE_BUCKET: z.string(),
        NEXT_PUBLIC_MESSAGING_SENDERID: z.string(),
        NEXT_PUBLIC_APP_ID: z.string(),

    },
    server: {
        DATABASE_URL: z.string().url(),
        AUTH_SECRET: process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),
    },
    shared: {
        NODE_ENV: z.enum(["development", "test", "production"]),
    },
    runtimeEnv: {
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
        NEXT_PUBLIC_AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
        NEXT_PUBLIC_STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        NEXT_PUBLIC_MESSAGING_SENDERID: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
        NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        AUTH_SECRET: process.env.AUTH_SECRET,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
})