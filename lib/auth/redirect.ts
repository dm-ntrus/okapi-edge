import { z } from 'zod';

/** Absolute path inside the admin app only — blocks open redirects. */
export function safeAdminNextPath(value: unknown, fallback = '/admin'): string {
  if (typeof value !== 'string') return fallback;
  const raw = value.trim();
  if (!raw.startsWith('/')) return fallback;
  if (raw.startsWith('//')) return fallback;
  if (raw.includes('\\') || raw.includes('\n') || raw.includes('\r')) return fallback;
  // Stay inside admin; never bounce SSO callbacks into a loop
  if (!raw.startsWith('/admin')) return fallback;
  if (raw.startsWith('/admin/login')) return fallback;
  if (raw.startsWith('/api/')) return fallback;
  return raw;
}

export function appBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  return 'http://localhost:3000';
}

export const adminRoleSchema = z.enum(['owner', 'editor', 'viewer']);
