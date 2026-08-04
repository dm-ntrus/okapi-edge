import { SignJWT, jwtVerify } from 'jose';
import { z } from 'zod';

export const SESSION_COOKIE = 'oe_admin_session';
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export const sessionPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['owner', 'editor', 'viewer']),
});

export type SessionPayload = z.infer<typeof sessionPayloadSchema>;

function getSecretKey() {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('AUTH_SECRET is required in production');
    }
    // Dev-only fallback — never use ADMIN_PASSWORD as signing key
    return new TextEncoder().encode('dev-only-insecure-secret'.padEnd(32, '0'));
  }
  if (secret.length < 32) {
    throw new Error('AUTH_SECRET must be at least 32 characters');
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return sessionPayloadSchema.parse(payload);
  } catch {
    return null;
  }
}

export function canWrite(role: SessionPayload['role']) {
  return role === 'owner' || role === 'editor';
}

/** Sign short-lived SSO handshake payload (state / PKCE / next). */
export async function sealSsoPending(
  payload: { state: string; nonce: string; codeVerifier: string; next: string },
  ttlSeconds = 600,
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${ttlSeconds}s`)
    .sign(getSecretKey());
}

export async function openSsoPending<T>(token: string, schema: z.ZodType<T>): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return schema.parse(payload);
  } catch {
    return null;
  }
}
