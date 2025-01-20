import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwtToken")?.value;

  const protectedRoutes = [
    /^\/$/, // Root path
    /^\/pages\/addItem$/, // Exact match for "/pages/addItem"
    /^\/pages\/editProduct\/\d+$/, // Matches "/pages/editProduct/{id}"
    /^\/pages\/productInfo\/\d+$/, // Matches "/pages/productInfo/{id}"
  ];
  const authPages = [/^\/pages\/login$/, /^\/pages\/register$/];

  const currentPath = req.nextUrl.pathname;

  // Check if the current path matches any protected routes
  if (protectedRoutes.some((route) => route.test(currentPath)) && !token) {
    const loginUrl = new URL("/pages/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check if the current path matches any auth pages
  if (authPages.some((route) => route.test(currentPath)) && token) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
