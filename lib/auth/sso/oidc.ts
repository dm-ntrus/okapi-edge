import { createHash, randomBytes } from 'crypto';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { z } from 'zod';
import type { SsoConfig } from '@/lib/auth/sso/config';

const discoverySchema = z.object({
  issuer: z.string().url(),
  authorization_endpoint: z.string().url(),
  token_endpoint: z.string().url(),
  jwks_uri: z.string().url(),
  end_session_endpoint: z.string().url().optional(),
});

export type OidcDiscovery = z.infer<typeof discoverySchema>;

const discoveryCache = new Map<string, { at: number; doc: OidcDiscovery }>();
const DISCOVERY_TTL_MS = 1000 * 60 * 30;

export async function fetchOidcDiscovery(issuer: string): Promise<OidcDiscovery> {
  const key = issuer.replace(/\/$/, '');
  const cached = discoveryCache.get(key);
  if (cached && Date.now() - cached.at < DISCOVERY_TTL_MS) return cached.doc;

  const url = `${key}/.well-known/openid-configuration`;
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error(`OIDC discovery failed (${res.status}) for ${url}`);
  }
  const doc = discoverySchema.parse(await res.json());
  discoveryCache.set(key, { at: Date.now(), doc });
  return doc;
}

export function randomUrlSafe(bytes = 32) {
  return randomBytes(bytes).toString('base64url');
}

export function pkceChallenge(verifier: string) {
  return createHash('sha256').update(verifier).digest('base64url');
}

export function buildAuthorizeUrl(
  discovery: OidcDiscovery,
  config: SsoConfig,
  params: { state: string; nonce: string; codeChallenge: string },
) {
  const url = new URL(discovery.authorization_endpoint);
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('redirect_uri', config.redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', config.scopes.join(' '));
  url.searchParams.set('state', params.state);
  url.searchParams.set('nonce', params.nonce);
  url.searchParams.set('code_challenge', params.codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  return url.toString();
}

const tokenResponseSchema = z.object({
  access_token: z.string().optional(),
  id_token: z.string(),
  token_type: z.string().optional(),
  expires_in: z.number().optional(),
  refresh_token: z.string().optional(),
});

export async function exchangeAuthorizationCode(
  discovery: OidcDiscovery,
  config: SsoConfig,
  params: { code: string; codeVerifier: string },
) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: params.code,
    redirect_uri: config.redirectUri,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code_verifier: params.codeVerifier,
  });

  const res = await fetch(discovery.token_endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body,
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Token exchange failed (${res.status}): ${text.slice(0, 200)}`);
  }

  return tokenResponseSchema.parse(await res.json());
}

const idTokenClaimsSchema = z.object({
  sub: z.string().min(1),
  email: z.string().email().optional(),
  email_verified: z.boolean().optional(),
  name: z.string().optional(),
  preferred_username: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  nonce: z.string().optional(),
});

export type IdTokenClaims = z.infer<typeof idTokenClaimsSchema>;

export async function verifyIdToken(
  discovery: OidcDiscovery,
  config: SsoConfig,
  idToken: string,
  expectedNonce: string,
): Promise<IdTokenClaims> {
  const jwks = createRemoteJWKSet(new URL(discovery.jwks_uri));
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: discovery.issuer,
    audience: config.clientId,
    clockTolerance: 30,
  });

  const claims = idTokenClaimsSchema.parse(payload);
  if (!claims.nonce || claims.nonce !== expectedNonce) {
    throw new Error('Invalid OIDC nonce');
  }
  return claims;
}

export function displayNameFromClaims(claims: IdTokenClaims): string {
  if (claims.name?.trim()) return claims.name.trim();
  const parts = [claims.given_name, claims.family_name].filter(Boolean).join(' ').trim();
  if (parts) return parts;
  if (claims.preferred_username?.trim()) return claims.preferred_username.trim();
  return claims.email?.split('@')[0] || 'SSO User';
}

export function emailFromClaims(claims: IdTokenClaims): string | null {
  const email = claims.email?.trim().toLowerCase();
  if (email) return email;
  const preferred = claims.preferred_username?.trim().toLowerCase();
  if (preferred?.includes('@')) return preferred;
  return null;
}
