'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getDb, isDbConfigured, withDb } from '@/lib/db/client';
import { createIn, q } from '@/lib/db/ops';
import type { AdminRecord } from '@/lib/db/types';
import { recordId } from '@/lib/db/types';
import { clearSessionCookie, establishSession } from '@/lib/auth/establish';
import { safeAdminNextPath } from '@/lib/auth/redirect';
import { getSession } from '@/lib/auth/session';
import { getSsoConfig } from '@/lib/auth/sso/config';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  next: z.string().optional(),
});

export type AuthState = { error?: string; ok?: boolean };

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const sso = getSsoConfig();
  if (sso.enabled && !sso.passwordLoginEnabled) {
    return { error: 'La connexion par mot de passe est désactivée. Utilisez le SSO.' };
  }

  if (!isDbConfigured()) {
    return { error: 'Base de données non configurée (SURREAL_URL).' };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    next: formData.get('next') || undefined,
  });

  if (!parsed.success) {
    return { error: 'Email ou mot de passe invalide.' };
  }

  const { email, password } = parsed.data;
  const next = safeAdminNextPath(parsed.data.next);

  try {
    const db = await getDb();
    const [rows] = await q<[AdminRecord[]]>(
      db,
      'SELECT * FROM admin WHERE email = $email LIMIT 1',
      { email: email.toLowerCase() },
    );
    const admin = rows?.[0];
    if (!admin?.password_hash) {
      return {
        error: admin?.sso_subject
          ? 'Ce compte utilise le SSO. Connectez-vous via votre fournisseur d’identité.'
          : 'Identifiants incorrects.',
      };
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return { error: 'Identifiants incorrects.' };
    }

    await establishSession({
      sub: recordId(admin.id),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    redirect(next);
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error;
    }
    console.error(error);
    return { error: 'Connexion impossible. Vérifiez SurrealDB.' };
  }
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect('/admin/login');
}

export async function getCurrentAdmin() {
  return getSession();
}

export async function ensureOwnerExists() {
  return withDb(async (db) => {
    const [rows] = await q<[AdminRecord[]]>(db, 'SELECT * FROM admin LIMIT 1');
    if (rows?.length) return { created: false };

    const email = (process.env.ADMIN_EMAIL ?? 'admin@okapiedge.com').toLowerCase();
    const password = process.env.ADMIN_PASSWORD ?? 'ChangeMeNow!2026';
    const name = process.env.ADMIN_NAME ?? 'Okapi Owner';
    const password_hash = await bcrypt.hash(password, 12);

    await createIn(db, 'admin', {
      email,
      name,
      password_hash,
      role: 'owner',
      sso_issuer: null,
      sso_subject: null,
    });

    return { created: true, email };
  });
}
