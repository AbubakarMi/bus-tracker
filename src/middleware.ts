import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Get user data from cookies if available (for server-side rendering)
  // Since we're using localStorage, we'll handle this on the client side
  // This middleware mainly handles basic route protection

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password'
  ];

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected route patterns
  const protectedRoutes = {
    admin: ['/dashboard/admin', '/admin'],
    driver: ['/dashboard/driver', '/driver'],
    student: ['/student'],
    staff: ['/staff']
  };

  // For protected routes, we'll let the client-side handle the redirect
  // since we're using localStorage for auth state
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};