import { NextRequest, NextResponse } from 'next/server';
import { safeAdminNextPath } from '@/lib/auth/redirect';
import { sealSsoPending } from '@/lib/auth/token';
import { assertSsoConfigured, getSsoConfig } from '@/lib/auth/sso/config';
import {
  buildAuthorizeUrl,
  fetchOidcDiscovery,
  pkceChallenge,
  randomUrlSafe,
} from '@/lib/auth/sso/oidc';
import { SSO_PENDING_COOKIE } from '@/lib/auth/sso/pending';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function loginErrorRedirect(request: NextRequest, code: string) {
  const url = new URL('/admin/login', request.url);
  url.searchParams.set('error', code);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  try {
    const config = assertSsoConfigured(getSsoConfig());
    const discovery = await fetchOidcDiscovery(config.issuer);

    const state = randomUrlSafe(24);
    const nonce = randomUrlSafe(24);
    const codeVerifier = randomUrlSafe(48);
    const next = safeAdminNextPath(request.nextUrl.searchParams.get('next'));

    const pendingToken = await sealSsoPending({
      state,
      nonce,
      codeVerifier,
      next,
    });

    const authorizeUrl = buildAuthorizeUrl(discovery, config, {
      state,
      nonce,
      codeChallenge: pkceChallenge(codeVerifier),
    });

    const response = NextResponse.redirect(authorizeUrl);
    response.cookies.set(SSO_PENDING_COOKIE, pendingToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 600,
    });
    return response;
  } catch (error) {
    console.error('[sso/start]', error);
    return loginErrorRedirect(request, 'sso_start_failed');
  }
}
