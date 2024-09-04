// middleware.ts or middleware.js
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define paths that you want to protect
  const protectedPaths = ['/dashboard', '/profile'];

  // Check if the requested path is protected
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // Example: Check if user is authenticated
    const isAuthenticated = !!request.cookies.get('authToken'); // Replace with your actual auth logic

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Define which routes this middleware applies to
};
