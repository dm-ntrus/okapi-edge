import { z } from 'zod';

export const SSO_PENDING_COOKIE = 'oe_sso_pending';

export const ssoPendingSchema = z.object({
  state: z.string().min(16),
  nonce: z.string().min(16),
  codeVerifier: z.string().min(43),
  next: z.string(),
});

export type SsoPending = z.infer<typeof ssoPendingSchema>;
