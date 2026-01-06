import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const isLoggedIn = !!req.nextauth.token;
        const isOnLoginPage = req.nextUrl.pathname.startsWith("/admin/login");

        if (isOnLoginPage && isLoggedIn) {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }

        // Normal `withAuth` logic handles the protection redirect to login if not logged in
        // for matched routes.
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/admin/login',
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};
