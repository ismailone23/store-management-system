import { env } from '@/env'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

import * as schema from '@/server/schema'

export type DB = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as {
    db: DB | undefined;
};

export const client = postgres(env.DATABASE_URL, { max: 1 })

export const db = globalForDb.db ?? drizzle(client, { schema });

if (env.NODE_ENV !== "production") {
    globalForDb.db = db;
}