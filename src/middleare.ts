// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get the JWT token from cookies
  const token = req.cookies.get("jwtToken")?.value;

  // Define protected routes
  const protectedRoutes = ["/", "/home", "/dashboard"]; // Specify the protected pages
  const currentPath = req.nextUrl.pathname;

  // If accessing a protected route without a token, redirect to login
  if (protectedRoutes.includes(currentPath) && !token) {
    const loginUrl = new URL("/api/login", req.url); // Redirect to login page
    return NextResponse.redirect(loginUrl);
  }

  // Allow request to proceed if not protected
  return NextResponse.next();
}
