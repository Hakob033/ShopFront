import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwtToken")?.value;

  const protectedRoutes = ["/", "/home", "/dashboard"];
  const authPages = ["/pages/login", "/pages/register"];

  const currentPath = req.nextUrl.pathname;

  if (protectedRoutes.includes(currentPath) && !token) {
    const loginUrl = new URL("/pages/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (authPages.includes(currentPath) && token) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
