import { env } from "@/env";
import { appRouter } from "@/server/routers";
import { createContext } from "@/trpc/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => createContext({ req }),
        onError:
            env.NODE_ENV === "development"
                ? ({ path, error }) => {
                    console.error(
                        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
                    );
                }
                : undefined,
    });

export { handler as GET, handler as POST };
