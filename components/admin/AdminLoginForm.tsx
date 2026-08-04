'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { loginAction, type AuthState } from '@/lib/auth/actions';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Field } from '@/components/admin/ui/field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';

const initial: AuthState = {};

const SSO_ERRORS: Record<string, string> = {
  sso_start_failed: 'Impossible de démarrer le SSO. Vérifiez la configuration OIDC.',
  sso_callback_failed: 'Échec de la connexion SSO.',
  sso_missing_code: 'Réponse SSO incomplète (code manquant).',
  sso_session_expired: 'La session SSO a expiré. Réessayez.',
  sso_state_mismatch: 'État SSO invalide (possible attaque CSRF). Réessayez.',
  sso_email_required: 'Le fournisseur SSO n’a pas fourni d’e-mail.',
  sso_email_domain: 'Domaine e-mail non autorisé pour l’administration.',
  sso_email_unverified: 'E-mail SSO non vérifié.',
  sso_not_provisioned: 'Aucun compte admin n’existe pour cet utilisateur SSO.',
  sso_lookup_failed: 'Impossible de résoudre le compte SSO.',
  sso_access_denied: 'Accès SSO refusé.',
};

function ssoErrorMessage(code: string | undefined) {
  if (!code) return null;
  return SSO_ERRORS[code] ?? SSO_ERRORS[`sso_${code}`] ?? `Erreur SSO (${code}).`;
}

export function AdminLoginForm({
  nextPath,
  errorCode,
  ssoEnabled,
  passwordEnabled,
  ssoLabel,
}: {
  nextPath: string;
  errorCode?: string;
  ssoEnabled: boolean;
  passwordEnabled: boolean;
  ssoLabel: string;
}) {
  const [state, action, pending] = useActionState(loginAction, initial);
  const ssoHref = `/api/auth/sso/start?next=${encodeURIComponent(nextPath)}`;
  const alert = state.error || ssoErrorMessage(errorCode);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-[var(--oe-bg)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Okapi Edge</CardTitle>
          <CardDescription>Connexion à la console d’administration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alert ? (
            <p
              className="text-sm text-rose-300 rounded-md border border-rose-500/25 bg-rose-500/10 px-3 py-2"
              role="alert"
            >
              {alert}
            </p>
          ) : null}

          {ssoEnabled ? (
            <Button asChild className="w-full" variant="secondary">
              <Link href={ssoHref}>{ssoLabel}</Link>
            </Button>
          ) : null}

          {ssoEnabled && passwordEnabled ? (
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-[var(--oe-border)]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[var(--oe-surface)] px-2 text-[var(--oe-text-muted)]">ou</span>
              </div>
            </div>
          ) : null}

          {passwordEnabled ? (
            <form action={action} className="space-y-4">
              <input type="hidden" name="next" value={nextPath} />
              <Field label="Adresse e-mail" htmlFor="email" required>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="admin@okapiedge.com"
                />
              </Field>
              <Field label="Mot de passe" htmlFor="password" required hint="Minimum 8 caractères.">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  minLength={8}
                  placeholder="••••••••"
                />
              </Field>

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? 'Connexion en cours…' : 'Se connecter'}
              </Button>
            </form>
          ) : null}

          {!passwordEnabled && !ssoEnabled ? (
            <p className="text-sm text-[var(--oe-text-muted)] text-center">
              Aucune méthode d’authentification n’est configurée.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
