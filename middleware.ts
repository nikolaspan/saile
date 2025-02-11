import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value; // Access the value of the authToken cookie
  const role = req.cookies.get("userRole")?.value;   // Access the value of the userRole cookie

  const { pathname } = req.nextUrl;

  // Redirect unauthenticated users to the login page
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Optional: Add role-specific access control
  if (pathname.startsWith("/dashboard/b2b") && role !== "B2B") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith("/dashboard/concierge") && role !== "Concierge") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith("/dashboard/admin") && role !== "Admin") {
    return NextResponse.redirect(new URL("/logi", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect all dashboard routes
};
