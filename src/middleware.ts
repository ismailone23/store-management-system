import authConfig from "@/server/auth/auth.config";
import NextAuth from "next-auth";

export const { auth } = NextAuth(authConfig);

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from './routes'

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return
    }
    if (!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL('/auth/signin', nextUrl));
    }
    return
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};