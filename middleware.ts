import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If the user is not signed in and trying to access a protected route, redirect them to the login page
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If the user is signed in and trying to access the login or register page, redirect them to the dashboard
  if (
    session &&
    (req.nextUrl.pathname.startsWith("/auth/login") ||
      req.nextUrl.pathname.startsWith("/auth/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
