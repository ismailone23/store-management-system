import { type AppRouter } from "@/server/routers";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>

export const transformer = superjson;
