import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { isDbConfigured } from '@/lib/db/client';
import { AdminShell } from '@/components/admin/AdminShell';

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <AdminShell email={session.email} role={session.role} dbOk={isDbConfigured()}>
      {children}
    </AdminShell>
  );
}
