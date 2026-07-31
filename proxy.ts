import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';
import { SESSION_COOKIE, verifySessionToken } from './lib/auth/token';

const handleI18n = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin zone — outside i18n, auth-gated
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      const login = new URL('/admin/login', request.url);
      login.searchParams.set('next', pathname);
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  // Skip i18n for API
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  return handleI18n(request);
}

export const config = {
  matcher: ['/', '/(fr|en)/:path*', '/admin/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
