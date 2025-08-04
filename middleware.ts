import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/middleware/auth";

export async function middleware(Request: NextRequest) {
  if (Request.nextUrl.pathname.startsWith("/protected-route")) {
    if (Request.cookies.has("token")) {
      const token = Request.cookies.get("token")?.value;
      const tokenPayload = await verifyAccessToken(token!);
      if (tokenPayload) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", Request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", Request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/protected-route/:path*",
};
