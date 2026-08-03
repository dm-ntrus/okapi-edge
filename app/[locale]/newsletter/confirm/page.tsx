import { setRequestLocale, getTranslations } from 'next-intl/server';
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

  const t = await getTranslations({ locale, namespace: 'newsletter' });

  return (
    <div className="oe-container py-12 sm:py-24 md:py-32">
      <div className="mx-auto max-w-lg text-center">
        {result.ok ? (
          <>
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--oe-text)] tracking-tight">
              {t('confirm.success.title')}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[var(--oe-text-muted)] leading-relaxed">
              {t('confirm.success.description')}
            </p>
          </>
        ) : (
          <>
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--oe-text)] tracking-tight">
              {t('confirm.failure.title')}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[var(--oe-text-muted)] leading-relaxed">
              {t('confirm.failure.description')}
            </p>
          </>
        )}
        <Link
          href="/"
          className="oe-tap mt-8 inline-flex w-full sm:w-auto min-h-11 items-center justify-center rounded-lg bg-[var(--oe-accent)] px-5 text-sm font-semibold text-[var(--oe-accent-ink)]"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
