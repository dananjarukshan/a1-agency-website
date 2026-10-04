import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass public static assets, api routes, and the login screen
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/login" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check administrative session token (mock or Supabase token)
  // In development, allow access; when Supabase is connected, enforce token check
  const token = request.cookies.get("sb-access-token")?.value;
  const isDev = process.env.NODE_ENV === "development";

  if (!token && !isDev) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
