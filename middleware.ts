import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is not signed in and trying to access protected routes
  if (!session) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/guide/") ||
      req.nextUrl.pathname.startsWith("/bookings/")
    ) {
      const redirectUrl = new URL("/auth/login", req.url);
      redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return res;
  }

  // Get user profile to check role and verification status
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, is_verified")
    .eq("id", session.user.id)
    .single();

  // Handling guide-specific routes
  if (req.nextUrl.pathname.startsWith("/guide/")) {
    // If user is not a guide, redirect to regular dashboard
    if (profile?.role !== "guide") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If guide is not verified and trying to access anything but onboarding
    if (
      !profile.is_verified &&
      !req.nextUrl.pathname.startsWith("/guide/onboarding")
    ) {
      return NextResponse.redirect(new URL("/guide/onboarding", req.url));
    }

    // If guide is verified and trying to access onboarding
    if (
      profile.is_verified &&
      req.nextUrl.pathname.startsWith("/guide/onboarding")
    ) {
      return NextResponse.redirect(new URL("/guide/dashboard", req.url));
    }
  }

  // If regular user tries to access guide routes
  if (profile?.role === "user" && req.nextUrl.pathname.startsWith("/guide/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Handle auth pages when already logged in
  if (
    session &&
    (req.nextUrl.pathname.startsWith("/auth/login") ||
      req.nextUrl.pathname.startsWith("/auth/register"))
  ) {
    if (profile?.role === "guide") {
      return NextResponse.redirect(
        new URL(
          profile.is_verified ? "/guide/dashboard" : "/guide/onboarding",
          req.url
        )
      );
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}
