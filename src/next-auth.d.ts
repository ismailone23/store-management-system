
import type { User } from "next-auth";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: Omit<User, "id", role> & { id: string, role: "ADMIN" | "BASIC" | "OWNER" };
    }
}