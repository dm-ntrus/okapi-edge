import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';
import { SESSION_COOKIE, verifySessionToken } from './lib/auth/token';
import { safeAdminNextPath } from './lib/auth/redirect';

const handleI18n = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Machine-readable / SEO endpoints — no i18n rewrite
  if (
    pathname === '/llms.txt' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/opengraph-image' ||
    pathname === '/twitter-image' ||
    pathname.startsWith('/api/auth/sso/')
  ) {
    return NextResponse.next();
  }

  // Admin zone — outside i18n, auth-gated
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;

    if (pathname === '/admin/login') {
      if (session) {
        const next = safeAdminNextPath(request.nextUrl.searchParams.get('next'));
        return NextResponse.redirect(new URL(next, request.url));
      }
      return NextResponse.next();
    }

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
  matcher: ['/', '/(fr|en)/:path*', '/admin/:path*', '/api/auth/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
