'use client';

import { useState, type FormEvent } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { OkapiLogo } from '@/components/brand/OkapiLogo';
import { PRODUCT_ROUTES } from '@/lib/constants';
import { Mail, CheckCircle2, ArrowUpRight, MapPin } from 'lucide-react';
import type { SiteContact } from '@/types';

interface FooterProps {
  onOpenInvestorsModal: () => void;
  contact?: SiteContact | null;
}

export function Footer({ onOpenInvestorsModal, contact }: FooterProps) {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tFooter = useTranslations('common.footer');
  const tNewsletter = useTranslations('common.footer.newsletter');
  const locale = useLocale();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contactEmail = contact?.email || tFooter('contactEmail');
  const locationLabel = contact?.locationShort || tFooter('location');

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
        setError(result.error ?? tCommon('errors.sendFailed'));
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
            <span className="block sm:hidden">
              <OkapiLogo size="md" showTagline={false} />
            </span>
            <span className="hidden sm:block">
              <OkapiLogo size="lg" showTagline={false} />
            </span>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--oe-text-muted)]">
              {tFooter('tagline')}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <a
                href={`mailto:${contactEmail}`}
                className="oe-tap inline-flex min-h-10 items-center gap-2 text-[var(--oe-text-secondary)] hover:text-[var(--oe-text)] transition-colors"
              >
                <Mail className="h-4 w-4 text-[var(--oe-accent)]" />
                {contactEmail}
              </a>
              <span className="inline-flex items-center gap-2 text-xs font-mono text-[var(--oe-text-muted)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--oe-accent)]" />
                {locationLabel}
              </span>
            </div>
          </div>

          <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)]/60 p-5 sm:p-6">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--oe-text-muted)]">
              {tNewsletter('title')}
            </h4>
            <p className="mt-2 text-sm text-[var(--oe-text-muted)] leading-relaxed">
              {tNewsletter('description')}
            </p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--oe-success)]">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {pendingConfirm ? tNewsletter('pending') : tNewsletter('success')}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
                <label className="sr-only" htmlFor="footer-newsletter-email">
                  {tNewsletter('placeholder')}
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={tNewsletter('placeholder')}
                  className="oe-field min-h-11 flex-1"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="oe-tap shrink-0 min-h-11 w-full sm:w-auto rounded-lg bg-[var(--oe-accent)] px-5 text-sm font-semibold text-[var(--oe-accent-ink)] disabled:opacity-60"
                >
                  {tNewsletter('cta')}
                </button>
              </form>
            )}
            {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <FooterCol title={tFooter('colCompany')}>
            <FooterLink href="/vision">{tNav('vision')}</FooterLink>
            <FooterLink href="/about">{tNav('about')}</FooterLink>
            <FooterLink href="/tech-sovereignty">{tNav('tech')}</FooterLink>
            <FooterLink href="/careers">{tNav('careers')}</FooterLink>
            <FooterLink href="/press">{tNav('press')}</FooterLink>
            <button
              type="button"
              onClick={onOpenInvestorsModal}
              className="oe-tap group flex min-h-10 items-center gap-1.5 text-sm text-[var(--oe-accent)] hover:text-[var(--oe-accent-strong)] transition-colors text-left"
            >
              {tNav('investors')}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </FooterCol>

          <FooterCol title={tFooter('colPlatforms')}>
            <FooterLink href={PRODUCT_ROUTES['okapi-edu']}>Okapi Edu</FooterLink>
            <FooterLink href={PRODUCT_ROUTES['syntix-pharma']}>Syntix Pharma</FooterLink>
            <FooterLink href={PRODUCT_ROUTES['okapi-pos']}>Okapi POS</FooterLink>
            <FooterLink href={PRODUCT_ROUTES['okapi-hospitals']}>Okapi Hospitals</FooterLink>
            <FooterLink href={PRODUCT_ROUTES['okapi-fueloils']}>Okapi FuelOils</FooterLink>
          </FooterCol>

          <FooterCol title={tFooter('resources')}>
            <FooterLink href="/blog">{tNav('blog')}</FooterLink>
            <FooterLink href="/contact">{tNav('contact')}</FooterLink>
            <FooterLink href="/legal">{tFooter('legal')}</FooterLink>
          </FooterCol>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--oe-text-muted)] mb-3 sm:mb-4">
              {tFooter('status')}
            </h4>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--oe-border)] bg-[var(--oe-surface)] px-3 py-2 text-xs font-mono text-[var(--oe-text-muted)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--oe-success)] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--oe-success)]" />
              </span>
              {tFooter('nodesStatus')}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[var(--oe-text-muted)]">
              {tFooter('b2bHint')}{' '}
              <Link href="/contact" className="text-[var(--oe-accent)] hover:underline">
                {tNav('contact')}
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-[var(--oe-border)] text-xs text-[var(--oe-text-muted)]">
          <span>
            © {new Date().getFullYear()} {tFooter('rights')}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="oe-tap min-h-10 inline-flex items-center hover:text-[var(--oe-text)] transition-colors">
              {tNav('contact')}
            </Link>
            <Link href="/legal" className="oe-tap min-h-10 inline-flex items-center hover:text-[var(--oe-text)] transition-colors">
              {tFooter('legal')}
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
