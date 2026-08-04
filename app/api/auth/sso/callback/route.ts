import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  openSsoPending,
  type SessionPayload,
} from '@/lib/auth/token';
import { SsoAccountError, resolveSsoAdmin } from '@/lib/auth/sso/account';
import { assertSsoConfigured, getSsoConfig } from '@/lib/auth/sso/config';
import {
  exchangeAuthorizationCode,
  fetchOidcDiscovery,
  verifyIdToken,
} from '@/lib/auth/sso/oidc';
import { SSO_PENDING_COOKIE, ssoPendingSchema } from '@/lib/auth/sso/pending';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function loginRedirect(request: NextRequest, error: string) {
  const url = new URL('/admin/login', request.url);
  url.searchParams.set('error', error);
  const response = NextResponse.redirect(url);
  response.cookies.delete(SSO_PENDING_COOKIE);
  return response;
}

async function redirectWithSession(
  request: NextRequest,
  destination: string,
  payload: SessionPayload,
) {
  const token = await createSessionToken(payload);
  const response = NextResponse.redirect(new URL(destination, request.url));
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  response.cookies.delete(SSO_PENDING_COOKIE);
  return response;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const oauthError = url.searchParams.get('error');
  if (oauthError) {
    return loginRedirect(request, `sso_${oauthError}`);
  }

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state) {
    return loginRedirect(request, 'sso_missing_code');
  }

  const pendingRaw = request.cookies.get(SSO_PENDING_COOKIE)?.value;
  if (!pendingRaw) {
    return loginRedirect(request, 'sso_session_expired');
  }

  const pending = await openSsoPending(pendingRaw, ssoPendingSchema);
  if (!pending || pending.state !== state) {
    return loginRedirect(request, 'sso_state_mismatch');
  }

  try {
    const config = assertSsoConfigured(getSsoConfig());
    const discovery = await fetchOidcDiscovery(config.issuer);
    const tokens = await exchangeAuthorizationCode(discovery, config, {
      code,
      codeVerifier: pending.codeVerifier,
    });
    const claims = await verifyIdToken(discovery, config, tokens.id_token, pending.nonce);
    const session = await resolveSsoAdmin(claims, config);
    return redirectWithSession(request, pending.next || '/admin', session);
  } catch (error) {
    console.error('[sso/callback]', error);
    if (error instanceof SsoAccountError) {
      return loginRedirect(request, `sso_${error.code.toLowerCase()}`);
    }
    return loginRedirect(request, 'sso_callback_failed');
  }
}
