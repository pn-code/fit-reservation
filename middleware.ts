import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    // "/" will be accessible to all users
    publicRoutes: ["/", "/login", "/register"],

    afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            const landing = new URL('/', req.url)
            return NextResponse.redirect(landing)
        }

        // redirect logged in users to dashboard
        if (auth.userId && auth.isPublicRoute) {
          const dashboard = new URL('/dashboard', req.url)
          return NextResponse.redirect(dashboard)
        }
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
