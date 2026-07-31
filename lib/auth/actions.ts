'use server';

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getDb, isDbConfigured, withDb } from '@/lib/db/client';
import { createIn, q } from '@/lib/db/ops';
import type { AdminRecord } from '@/lib/db/types';
import { recordId } from '@/lib/db/types';
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  getSession,
} from '@/lib/auth/session';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthState = { error?: string; ok?: boolean };

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isDbConfigured()) {
    return { error: 'Base de données non configurée (SURREAL_URL).' };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: 'Email ou mot de passe invalide.' };
  }

  const { email, password } = parsed.data;

  try {
    const db = await getDb();
    const [rows] = await q<[AdminRecord[]]>(
      db,
      'SELECT * FROM admin WHERE email = $email LIMIT 1',
      { email: email.toLowerCase() },
    );
    const admin = rows?.[0];
    if (!admin?.password_hash) {
      return { error: 'Identifiants incorrects.' };
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return { error: 'Identifiants incorrects.' };
    }

    const token = await createSessionToken({
      sub: recordId(admin.id),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const jar = await cookies();
    jar.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_TTL_SECONDS,
    });

    redirect('/admin');
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error;
    }
    console.error(error);
    return { error: 'Connexion impossible. Vérifiez SurrealDB.' };
  }
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
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
    });

    return { created: true, email };
  });
}
