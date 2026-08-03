'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { InteractiveRdcMap } from '@/components/home/InteractiveRdcMap';
import { SaasInteractiveDemo } from '@/components/home/SaasInteractiveDemo';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ProductTile } from '@/components/ui/ProductTile';
import { PRODUCT_ROUTES } from '@/lib/constants';
import type { SaasProduct } from '@/types';
import {
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Pill,
  ShoppingCart,
  Stethoscope,
  Fuel,
  Send,
  CheckCircle2,
  Server,
  Cpu,
  Lock,
  Zap,
  Database,
} from 'lucide-react';

interface HomePageProps {
  onOpenInvestorsModal?: () => void;
  products?: SaasProduct[];
}

const TECH_TABS = [
  { id: 'rust' as const, icon: Zap, titleKey: 'tech_rust_title', descKey: 'tech_rust_desc' },
  { id: 'crdt' as const, icon: Database, titleKey: 'tech_crdt_title', descKey: 'tech_crdt_desc' },
  { id: 'zerotrust' as const, icon: ShieldCheck, titleKey: 'tech_zerotrust_title', descKey: 'tech_zerotrust_desc' },
  { id: 'ai' as const, icon: Cpu, titleKey: 'tech_ai_title', descKey: 'tech_ai_desc' },
];

const PRODUCT_ICONS: Record<string, ReactNode> = {
  'okapi-edu': <GraduationCap className="h-5 w-5" />,
  'syntix-pharma': <Pill className="h-5 w-5" />,
  'okapi-pos': <ShoppingCart className="h-5 w-5" />,
  'okapi-hospitals': <Stethoscope className="h-5 w-5" />,
  'okapi-fueloils': <Fuel className="h-5 w-5" />,
};

export function HomePage({ onOpenInvestorsModal, products = [] }: HomePageProps) {
  const t = useTranslations();
  const th = useTranslations('home');
  const tc = useTranslations('common');
  const [b2bFormData, setB2bFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: '',
  });
  const [b2bSubmitted, setB2bSubmitted] = useState(false);

  const techMetrics = {
    rust: [
      ['< 2 ms', 'responseTime'],
      ['99.999%', 'availability'],
      ['−65%', 'footprint'],
      ['Multi-OS', 'compatibility'],
    ],
    crdt: [
      ['0%', 'dataLoss'],
      ['Illimitée', 'offlineAutonomy'],
      ['−90%', 'bandwidth'],
      ['Distribuée', 'architecture'],
    ],
    zerotrust: [
      ['AES-256', 'encryption'],
      ['100%', 'compliance'],
      ['Enclave', 'isolation'],
      ['Zero-Trust', 'access'],
    ],
    ai: [
      ['< 15 ms', 'decision'],
      ['In-situ', 'privacy'],
      ['98.4%', 'precision'],
      ['Locale', 'inference'],
    ],
  } as const;

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { submitPublicInquiryAction } = await import('@/lib/admin/actions');
    const result = await submitPublicInquiryAction({
      kind: 'b2b',
      full_name: b2bFormData.name,
      organization: b2bFormData.organization,
      email: b2bFormData.email,
      message: b2bFormData.message,
      interest: 'home-b2b',
    });
    if (!result.ok) {
      alert(result.error ?? tc('errors.sendFailed'));
      return;
    }
    setB2bSubmitted(true);
    setTimeout(() => {
      setB2bSubmitted(false);
      setB2bFormData({ name: '', organization: '', email: '', message: '' });
    }, 6000);
  };

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      {/* Hero */}
      <section className="oe-hero relative isolate flex min-h-[calc(100svh-3.5rem)] items-center justify-center overflow-hidden border-b border-[var(--oe-border)] sm:min-h-[calc(100svh-4.25rem)]">
        <InteractiveRdcMap />
        <div className="oe-hero-veil pointer-events-none absolute inset-0 z-[1]" />

        <Container className="relative z-10 w-full min-w-0 py-16 sm:py-24 md:py-32">
          <div className="mx-auto flex max-w-3xl min-w-0 flex-col items-center gap-6 text-center sm:gap-8">
            <h1 className="oe-fade-up font-heading text-[1.875rem] leading-[1.12] font-semibold tracking-tight text-balance text-[var(--oe-text)] sm:text-5xl sm:leading-[1.08] md:text-6xl lg:text-[4.25rem]">
              <span className="block">{t('hero_title_part1')}</span>
              <span className="mt-2 block oe-gradient-text sm:mt-3">{t('hero_title_part2')}</span>
            </h1>

            <p className="oe-fade-up-delay mx-auto max-w-xl text-[0.9375rem] leading-relaxed text-[var(--oe-text-secondary)] sm:text-base md:text-lg">
              {t('hero_subtitle')}
            </p>

            <div className="oe-fade-up-delay-2 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
              <ButtonLink href="/ecosystem" size="lg" className="w-full sm:w-auto">
                {t('hero_cta_ecosystem')}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full border-[var(--oe-border-strong)] bg-[var(--oe-surface)]/70 backdrop-blur-md sm:w-auto"
              >
                {t('hero_cta_contact')}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Engineering — native radios so mobile taps work without React onClick */}
      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <SectionHeading
            eyebrow={th('techCore.eyebrow')}
            title={t('tech_core_title')}
            description={t('tech_core_subtitle')}
          />

          <div className="oe-tech-tabs">
            {TECH_TABS.map((tab, index) => (
              <input
                key={`input-${tab.id}`}
                type="radio"
                name="oe-tech-core"
                id={`oe-tech-${tab.id}`}
                value={tab.id}
                defaultChecked={index === 0}
                className="oe-native-toggle"
              />
            ))}

            <div className="mb-8 sm:mb-10">
              <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label={t('tech_core_title')}>
                {TECH_TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <label
                      key={tab.id}
                      htmlFor={`oe-tech-${tab.id}`}
                      className="oe-tech-tab oe-tap inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:border-[var(--oe-border-strong)] hover:text-[var(--oe-text)]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 pointer-events-none" />
                      <span className="font-medium">{t(tab.titleKey)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {TECH_TABS.map((tab) => {
              const Icon = tab.icon;
              const metrics = techMetrics[tab.id];
              return (
                <div
                  key={tab.id}
                  data-tech={tab.id}
                  className="oe-tech-panel lg:grid-cols-2 gap-8 lg:gap-16 items-start rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-8 md:p-10"
                >
                  <div>
                    <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--oe-accent-soft)] text-[var(--oe-accent)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                      {t(tab.titleKey)}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--oe-text-secondary)] leading-relaxed">
                      {t(tab.descKey)}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {metrics.map(([value, labelKey]) => (
                      <div
                        key={labelKey}
                        className="rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg)]/60 p-3 sm:p-4"
                      >
                        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--oe-text-muted)]">
                          {th(
                            `techCore.metrics.${tab.id}.${labelKey}` as 'techCore.metrics.rust.responseTime',
                          )}
                        </div>
                        <div className="mt-1.5 sm:mt-2 font-heading text-lg sm:text-xl font-semibold text-[var(--oe-text)]">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Products */}
      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <SectionHeading
            eyebrow={th('products.eyebrow')}
            title={t('products_title')}
            description={t('products_subtitle')}
          />
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {products.map((product) => (
              <ProductTile
                key={product.id}
                href={PRODUCT_ROUTES[product.id] ?? '/ecosystem'}
                name={product.name}
                subtitle={product.subtitle}
                description={product.description}
                accent={product.color}
                icon={PRODUCT_ICONS[product.id] ?? <Server className="h-5 w-5" />}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Interactive demo */}
      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <SectionHeading
            eyebrow={th('demo.eyebrow')}
            title={th('demo.title')}
            description={th('demo.description')}
          />
          <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] overflow-x-auto">
            <div className="min-w-0 w-full overflow-hidden">
              <SaasInteractiveDemo />
            </div>
          </div>
        </Container>
      </Section>

      {/* About strip */}
      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-4">
                {th('about.eyebrow')}
              </p>
              <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl font-medium text-[var(--oe-text)] leading-snug tracking-tight">
                {t('about_quote')}
              </blockquote>
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--oe-text)] tracking-tight mb-4">
                {t('about_title')}
              </h2>
              <p className="text-sm sm:text-base text-[var(--oe-text-secondary)] leading-relaxed mb-6 sm:mb-8">{t('about_desc')}</p>
              <ButtonLink href="/about" variant="secondary" className="w-full sm:w-auto">
                {t('about_cta')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Careers + Investors */}
      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-4">
                {t('careers_badge')}
              </p>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                {t('careers_title')}
              </h2>
              <p className="text-sm sm:text-base text-[var(--oe-text-secondary)] leading-relaxed mb-6 sm:mb-8">{t('careers_desc')}</p>
              <ButtonLink href="/careers" variant="secondary" className="w-full sm:w-auto">
                {t('careers_cta')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-warning)] mb-4">
                {th('investors.eyebrow')}
              </p>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                {th('investors.title')}
              </h2>
              <p className="text-sm sm:text-base text-[var(--oe-text-secondary)] leading-relaxed mb-6 sm:mb-8">
                {th('investors.description')}
              </p>
              {onOpenInvestorsModal ? (
                <Button variant="secondary" className="w-full sm:w-auto" onClick={onOpenInvestorsModal}>
                  <Lock className="h-4 w-4" />
                  {t('nav_investors')}
                </Button>
              ) : (
                <ButtonLink href="/investors" variant="secondary" className="w-full sm:w-auto">
                  <Lock className="h-4 w-4" />
                  {t('nav_investors')}
                </ButtonLink>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* B2B contact */}
      <Section className="bg-[var(--oe-bg-elevated)] border-b-0">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <SectionHeading
                align="left"
                eyebrow={th('contact.eyebrow')}
                title={t('b2b_title')}
                description={t('b2b_subtitle')}
              />
            </div>

            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-6 md:p-8">
              {b2bSubmitted ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-[var(--oe-success)]" />
                  <h3 className="font-heading text-xl font-semibold text-[var(--oe-text)] mb-2">
                    {t('b2b_success_title')}
                  </h3>
                  <p className="text-sm text-[var(--oe-text-secondary)]">{t('b2b_success_desc')}</p>
                </div>
              ) : (
                <form onSubmit={handleB2bSubmit} className="space-y-4">
                  <Field
                    label={t('b2b_name')}
                    value={b2bFormData.name}
                    onChange={(v) => setB2bFormData((s) => ({ ...s, name: v }))}
                    required
                  />
                  <Field
                    label={t('b2b_org')}
                    value={b2bFormData.organization}
                    onChange={(v) => setB2bFormData((s) => ({ ...s, organization: v }))}
                    required
                  />
                  <Field
                    label={t('b2b_email')}
                    type="email"
                    value={b2bFormData.email}
                    onChange={(v) => setB2bFormData((s) => ({ ...s, email: v }))}
                    required
                  />
                  <div>
                    <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                      {t('b2b_message')}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={b2bFormData.message}
                      onChange={(e) => setB2bFormData((s) => ({ ...s, message: e.target.value }))}
                      className="oe-field min-h-[6rem] resize-y"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    {t('b2b_submit')}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-[var(--oe-text-muted)]">
            <Link href="/ecosystem" className="oe-link inline-flex items-center gap-1">
              {th('footerLinks.solutions')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/tech-sovereignty" className="oe-link inline-flex items-center gap-1">
              {th('footerLinks.engineering')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="inline-flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-[var(--oe-accent)]" />
              {th('footerLinks.edgeInfra')}
            </span>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="oe-field"
      />
    </div>
  );
}
