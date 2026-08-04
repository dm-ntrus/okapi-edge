import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { safeAdminNextPath } from '@/lib/auth/redirect';
import { getSsoConfig } from '@/lib/auth/sso/config';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const sso = getSsoConfig();
  const nextPath = safeAdminNextPath(params.next);

  return (
    <AdminLoginForm
      nextPath={nextPath}
      errorCode={params.error}
      ssoEnabled={sso.enabled}
      passwordEnabled={sso.passwordLoginEnabled || !sso.enabled}
      ssoLabel={sso.buttonLabel}
    />
  );
}
