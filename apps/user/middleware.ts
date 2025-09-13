import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    console.log("🔑 Middleware token:", token);

    // If no token, force login
    if (!token) {
      return NextResponse.redirect(new URL("/secure/login", req.url));
    }

    // Otherwise, continue
    return NextResponse.next();
  },
  {
    callbacks: {
      // Always run middleware, then decide inside
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transfer/:path*",
    "/send-receive/:path*",
    "/transactions/:path*",
  ],
};
