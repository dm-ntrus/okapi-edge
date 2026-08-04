import { z } from 'zod';
import { adminRoleSchema, appBaseUrl } from '@/lib/auth/redirect';

const truthy = (v: string | undefined) =>
  v === '1' || v?.toLowerCase() === 'true' || v?.toLowerCase() === 'yes';

export type SsoConfig = {
  enabled: boolean;
  issuer: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  allowedEmailDomains: string[];
  autoProvision: boolean;
  defaultRole: z.infer<typeof adminRoleSchema>;
  passwordLoginEnabled: boolean;
  buttonLabel: string;
};

export function getSsoConfig(): SsoConfig {
  const issuer = (process.env.SSO_ISSUER ?? '').replace(/\/$/, '');
  const clientId = process.env.SSO_CLIENT_ID ?? '';
  const clientSecret = process.env.SSO_CLIENT_SECRET ?? '';
  const explicit = process.env.SSO_ENABLED;
  const enabled =
    explicit !== undefined
      ? truthy(explicit)
      : Boolean(issuer && clientId && clientSecret);

  const redirectUri =
    process.env.SSO_REDIRECT_URI?.trim() ||
    `${appBaseUrl()}/api/auth/sso/callback`;

  const scopes = (process.env.SSO_SCOPES ?? 'openid profile email')
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const allowedEmailDomains = (process.env.SSO_ALLOWED_EMAIL_DOMAINS ?? '')
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);

  const roleParse = adminRoleSchema.safeParse(process.env.SSO_DEFAULT_ROLE ?? 'viewer');

  return {
    enabled,
    issuer,
    clientId,
    clientSecret,
    redirectUri,
    scopes: scopes.length ? scopes : ['openid', 'profile', 'email'],
    allowedEmailDomains,
    autoProvision: process.env.SSO_AUTO_PROVISION === undefined
      ? true
      : truthy(process.env.SSO_AUTO_PROVISION),
    defaultRole: roleParse.success ? roleParse.data : 'viewer',
    passwordLoginEnabled: process.env.SSO_PASSWORD_LOGIN === undefined
      ? true
      : truthy(process.env.SSO_PASSWORD_LOGIN),
    buttonLabel: process.env.SSO_BUTTON_LABEL?.trim() || 'Continuer avec SSO',
  };
}

export function assertSsoConfigured(config: SsoConfig = getSsoConfig()) {
  if (!config.enabled) {
    throw new Error('SSO is not enabled');
  }
  if (!config.issuer || !config.clientId || !config.clientSecret) {
    throw new Error('SSO_ISSUER, SSO_CLIENT_ID and SSO_CLIENT_SECRET are required');
  }
  return config;
}

export function emailAllowed(email: string, domains: string[]) {
  if (!domains.length) return true;
  const domain = email.split('@')[1]?.toLowerCase();
  return Boolean(domain && domains.includes(domain));
}
