'use client';

import { useState, type FormEvent } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { OkapiLogo } from '@/components/brand/OkapiLogo';
import { PRODUCT_ROUTES } from '@/lib/constants';
import { Mail, CheckCircle2, ArrowUpRight, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenInvestorsModal: () => void;
}

export function Footer({ onOpenInvestorsModal }: FooterProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const { subscribeNewsletterAction } = await import('@/lib/newsletter/actions');
      const result = await subscribeNewsletterAction({
        email: newsletterEmail,
        locale: locale === 'en' ? 'en' : 'fr',
      });
      if (!result.ok) {
        setError(result.error ?? 'Inscription impossible');
        return;
      }
      setPendingConfirm(Boolean(result.pending));
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => {
        setSubscribed(false);
        setPendingConfirm(false);
      }, 8000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative border-t border-[var(--oe-border)] bg-[var(--oe-bg)] text-[var(--oe-text-secondary)] pb-[var(--oe-safe-bottom)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--oe-accent)]/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[var(--oe-accent)]/[0.06] blur-3xl"
      />

      <div className="oe-container relative pt-14 sm:pt-16 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 pb-12 mb-10 border-b border-[var(--oe-border)]">
          <div>
            <OkapiLogo size="md" showTagline={false} className="sm:hidden" />
            <OkapiLogo size="lg" showTagline={false} className="hidden sm:inline-flex" />
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--oe-text-muted)]">
              {t('footer_tagline')}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <a
                href={`mailto:${t('footer_contact_email')}`}
                className="oe-tap inline-flex min-h-10 items-center gap-2 text-[var(--oe-text-secondary)] hover:text-[var(--oe-text)] transition-colors"
              >
                <Mail className="h-4 w-4 text-[var(--oe-accent)]" />
                {t('footer_contact_email')}
              </a>
              <span className="inline-flex items-center gap-2 text-xs font-mono text-[var(--oe-text-muted)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--oe-accent)]" />
                Kinshasa · Africa / Global
              </span>
            </div>
          </div>

          <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)]/60 p-5 sm:p-6">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--oe-text-muted)]">
              {t('footer_newsletter_title')}
            </h4>
            <p className="mt-2 text-sm text-[var(--oe-text-muted)] leading-relaxed">
              {t('footer_newsletter_desc')}
            </p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--oe-success)]">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {pendingConfirm && t.has('footer_newsletter_pending')
                  ? t('footer_newsletter_pending')
                  : t('footer_newsletter_success')}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
                <label className="sr-only" htmlFor="footer-newsletter-email">
                  {t('footer_newsletter_placeholder')}
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('footer_newsletter_placeholder')}
                  className="oe-field min-h-11 flex-1 text-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="oe-tap shrink-0 min-h-11 rounded-lg bg-[var(--oe-accent)] px-5 text-sm font-semibold text-[var(--oe-accent-ink)] disabled:opacity-60"
                >
                  {t('footer_newsletter_cta')}
                </button>
              </form>
            )}
            {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <FooterCol title={t('footer_col_company')}>
            <FooterLink href="/vision">{t('nav_vision')}</FooterLink>
            <FooterLink href="/about">{t('nav_about')}</FooterLink>
            <FooterLink href="/tech-sovereignty">{t('nav_tech')}</FooterLink>
            <FooterLink href="/careers">{t('nav_careers')}</FooterLink>
            <FooterLink href="/press">{t('nav_press')}</FooterLink>
            <button
              type="button"
              onClick={onOpenInvestorsModal}
              className="oe-tap group flex min-h-10 items-center gap-1.5 text-sm text-[var(--oe-accent)] hover:text-[var(--oe-accent-strong)] transition-colors text-left"
            >
              {t('nav_investors')}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </FooterCol>

          <FooterCol title={t('footer_col_platforms')}>
            <FooterLink href={PRODUCT_ROUTES['okapi-edu']}>Okapi Edu</FooterLink>
            <FooterLink href={PRODUCT_ROUTES['syntix-pharma']}>Syntix Pharma</FooterLink>
            <FooterLink href={PRODUCT_ROUTES['okapi-pos']}>Okapi POS</FooterLink>
            <FooterLink href={PRODUCT_ROUTES['okapi-hospitals']}>Okapi Hospitals</FooterLink>
            <FooterLink href={PRODUCT_ROUTES['okapi-fueloils']}>Okapi FuelOils</FooterLink>
          </FooterCol>

          <FooterCol title={t('footer_resources')}>
            <FooterLink href="/blog">{t('nav_blog')}</FooterLink>
            <FooterLink href="/contact">{t('nav_contact')}</FooterLink>
            <FooterLink href="/legal">{t('footer_legal')}</FooterLink>
          </FooterCol>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--oe-text-muted)] mb-3 sm:mb-4">
              {t.has('footer_status') ? t('footer_status') : 'Statut'}
            </h4>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--oe-border)] bg-[var(--oe-surface)] px-3 py-2 text-xs font-mono text-[var(--oe-text-muted)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--oe-success)] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--oe-success)]" />
              </span>
              {t('footer_nodes_status')}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[var(--oe-text-muted)]">
              {t.has('footer_b2b_hint') ? t('footer_b2b_hint') : 'Canal partenariats & B2B via'}{' '}
              <Link href="/contact" className="text-[var(--oe-accent)] hover:underline">
                {t('nav_contact')}
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-[var(--oe-border)] text-xs text-[var(--oe-text-muted)]">
          <span>
            © {new Date().getFullYear()} {t('footer_rights')}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="oe-tap min-h-10 inline-flex items-center hover:text-[var(--oe-text)] transition-colors">
              {t('nav_contact')}
            </Link>
            <Link href="/legal" className="oe-tap min-h-10 inline-flex items-center hover:text-[var(--oe-text)] transition-colors">
              {t('footer_legal')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--oe-text-muted)] mb-3 sm:mb-4">
        {title}
      </h4>
      <div className="space-y-0.5 sm:space-y-1">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="oe-tap flex min-h-10 items-center text-sm oe-link">
      {children}
    </Link>
  );
}
