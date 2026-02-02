import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 🔴 Not logged in → login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔒 ADMIN ROUTE PROTECTION
  if (pathname.startsWith("/admin")) {
    if (token.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ✅ Allowed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/profile/:path*",
    "/admin/:path*", // 👈 added
  ],
};
