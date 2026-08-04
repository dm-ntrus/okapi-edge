import { getDb } from '@/lib/db/client';
import { createIn, mergeId, q } from '@/lib/db/ops';
import { recordId, type AdminRecord, type AdminRole } from '@/lib/db/types';
import { emailAllowed, type SsoConfig } from '@/lib/auth/sso/config';
import {
  displayNameFromClaims,
  emailFromClaims,
  type IdTokenClaims,
} from '@/lib/auth/sso/oidc';
import type { SessionPayload } from '@/lib/auth/token';

export class SsoAccountError extends Error {
  constructor(
    message: string,
    public code:
      | 'EMAIL_REQUIRED'
      | 'EMAIL_DOMAIN'
      | 'EMAIL_UNVERIFIED'
      | 'NOT_PROVISIONED'
      | 'LOOKUP_FAILED',
  ) {
    super(message);
    this.name = 'SsoAccountError';
  }
}

export async function resolveSsoAdmin(
  claims: IdTokenClaims,
  config: SsoConfig,
): Promise<SessionPayload> {
  const email = emailFromClaims(claims);
  if (!email) {
    throw new SsoAccountError(
      'Le fournisseur SSO n’a pas renvoyé d’adresse e-mail.',
      'EMAIL_REQUIRED',
    );
  }

  if (!emailAllowed(email, config.allowedEmailDomains)) {
    throw new SsoAccountError(
      'Cette adresse e-mail n’est pas autorisée pour l’administration.',
      'EMAIL_DOMAIN',
    );
  }

  // Enforce verified email when the IdP provides the claim
  if (claims.email_verified === false) {
    throw new SsoAccountError(
      'L’adresse e-mail SSO n’est pas vérifiée.',
      'EMAIL_UNVERIFIED',
    );
  }

  const issuer = config.issuer.replace(/\/$/, '');
  const subject = claims.sub;
  const name = displayNameFromClaims(claims);

  try {
    const db = await getDb();

    // 1) Exact SSO subject match
    const [bySubject] = await q<[AdminRecord[]]>(
      db,
      'SELECT * FROM admin WHERE sso_issuer = $issuer AND sso_subject = $subject LIMIT 1',
      { issuer, subject },
    );
    let admin = bySubject?.[0];

    // 2) Link existing password account by email
    if (!admin) {
      const [byEmail] = await q<[AdminRecord[]]>(
        db,
        'SELECT * FROM admin WHERE email = $email LIMIT 1',
        { email },
      );
      admin = byEmail?.[0];
      if (admin) {
        await mergeId(db, recordId(admin.id), {
          sso_issuer: issuer,
          sso_subject: subject,
          name: admin.name || name,
          updated_at: new Date().toISOString(),
        });
        admin = {
          ...admin,
          sso_issuer: issuer,
          sso_subject: subject,
          name: admin.name || name,
        };
      }
    }

    // 3) Auto-provision
    if (!admin) {
      if (!config.autoProvision) {
        throw new SsoAccountError(
          'Aucun compte admin n’est provisionné pour cet utilisateur SSO.',
          'NOT_PROVISIONED',
        );
      }
      const role: AdminRole = config.defaultRole;
      const created = await createIn(db, 'admin', {
        email,
        name,
        role,
        sso_issuer: issuer,
        sso_subject: subject,
        password_hash: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      admin = created as unknown as AdminRecord;
    }

    return {
      sub: recordId(admin.id),
      email: admin.email,
      name: admin.name || name,
      role: admin.role,
    };
  } catch (error) {
    if (error instanceof SsoAccountError) throw error;
    console.error('[sso] account resolve failed', error);
    throw new SsoAccountError('Impossible de résoudre le compte SSO.', 'LOOKUP_FAILED');
  }
}
