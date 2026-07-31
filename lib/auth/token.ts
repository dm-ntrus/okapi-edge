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

function getSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.ADMIN_PASSWORD ?? 'dev-only-insecure-secret';
  return new TextEncoder().encode(secret.padEnd(32, '0').slice(0, 64));
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return sessionPayloadSchema.parse(payload);
  } catch {
    return null;
  }
}

export function canWrite(role: SessionPayload['role']) {
  return role === 'owner' || role === 'editor';
}
