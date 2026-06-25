import { betterFetch } from "@better-fetch/fetch";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", 
      },
    }
  );

  const isPrivateRoute = pathname.startsWith("/dashboard") || 
                         pathname.startsWith("/seller") || 
                         pathname.startsWith("/admin");

  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (!session && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/seller/:path*", 
    "/admin/:path*", 
    "/login", 
    "/register"
  ],
};