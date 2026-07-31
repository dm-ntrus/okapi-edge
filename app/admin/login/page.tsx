'use client';

import { useActionState } from 'react';
import { loginAction, type AuthState } from '@/lib/auth/actions';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Field } from '@/components/admin/ui/field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';

const initial: AuthState = {};

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-[var(--oe-bg)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Okapi Edge</CardTitle>
          <CardDescription>Connexion à la console d’administration</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
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

            {state.error ? (
              <p className="text-sm text-rose-300 rounded-md border border-rose-500/25 bg-rose-500/10 px-3 py-2" role="alert">
                {state.error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Connexion en cours…' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
