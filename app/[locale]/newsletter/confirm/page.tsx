import { setRequestLocale } from 'next-intl/server';
import { confirmNewsletterAction } from '@/lib/newsletter/actions';
import { Link } from '@/lib/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function NewsletterConfirmPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);

  const result = token
    ? await confirmNewsletterAction(token)
    : { ok: false as const, error: 'TOKEN_MISSING' };

  const isEn = locale === 'en';

  return (
    <div className="oe-container py-24 sm:py-32">
      <div className="mx-auto max-w-lg text-center">
        {result.ok ? (
          <>
            <h1 className="font-heading text-3xl font-semibold text-[var(--oe-text)] tracking-tight">
              {isEn ? 'Subscription confirmed' : 'Abonnement confirmé'}
            </h1>
            <p className="mt-4 text-[var(--oe-text-muted)] leading-relaxed">
              {isEn
                ? 'You are now subscribed to the Okapi Edge newsletter.'
                : 'Vous êtes maintenant abonné à la newsletter Okapi Edge.'}
            </p>
          </>
        ) : (
          <>
            <h1 className="font-heading text-3xl font-semibold text-[var(--oe-text)] tracking-tight">
              {isEn ? 'Confirmation failed' : 'Confirmation impossible'}
            </h1>
            <p className="mt-4 text-[var(--oe-text-muted)] leading-relaxed">
              {isEn
                ? 'This link is invalid or has expired.'
                : 'Ce lien est invalide ou a expiré.'}
            </p>
          </>
        )}
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-[var(--oe-accent)] px-5 text-sm font-semibold text-[var(--oe-accent-ink)]"
        >
          {isEn ? 'Back to home' : 'Retour à l’accueil'}
        </Link>
      </div>
    </div>
  );
}
