'use client';

import { useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
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

const InteractiveRdcMap = dynamic(
  () => import('@/components/home/InteractiveRdcMap').then((m) => m.InteractiveRdcMap),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[var(--oe-bg)]" /> },
);

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
  const [activeTechTab, setActiveTechTab] = useState<(typeof TECH_TABS)[number]['id']>('rust');
  const [b2bFormData, setB2bFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: '',
  });
  const [b2bSubmitted, setB2bSubmitted] = useState(false);

  const activeTech = TECH_TABS.find((tab) => tab.id === activeTechTab) ?? TECH_TABS[0];
  const ActiveIcon = activeTech.icon;

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
      alert(result.error ?? 'Envoi impossible');
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
      {/* Hero — headline + CTA over full-bleed map */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden border-b border-[var(--oe-border)]">
        <InteractiveRdcMap />
        <div className="absolute inset-0 oe-hero-veil pointer-events-none" />
        <div className="absolute inset-0 oe-grid-fade pointer-events-none opacity-40" />

        <Container className="relative z-10 w-full py-24 sm:py-28 md:py-32">
          <div className="mx-auto max-w-3xl text-center px-1">
            <h1 className="oe-fade-up font-heading text-[1.875rem] leading-[1.12] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-tight text-[var(--oe-text)] text-balance drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)]">
              {t('hero_title_part1')}
              <span className="block mt-2 oe-gradient-text">{t('hero_title_part2')}</span>
            </h1>

            <p className="oe-fade-up-delay mx-auto mt-5 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-[var(--oe-text-secondary)] leading-relaxed drop-shadow-[0_1px_16px_rgba(0,0,0,0.45)]">
              {t('hero_subtitle')}
            </p>

            <div className="oe-fade-up-delay-2 mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
              <ButtonLink href="/ecosystem" size="lg" className="w-full sm:w-auto">
                {t('hero_cta_ecosystem')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-[var(--oe-surface)]/70 backdrop-blur-md border-[var(--oe-border-strong)]"
              >
                {t('hero_cta_contact')}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Engineering */}
      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <SectionHeading
            eyebrow="Architecture"
            title={t('tech_core_title')}
            description={t('tech_core_subtitle')}
          />

          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-10">
            <div className="oe-scroll-x sm:flex-wrap sm:overflow-visible sm:justify-center">
              {TECH_TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTechTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTechTab(tab.id)}
                    className={`oe-tap inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-200 border whitespace-nowrap ${
                      active
                        ? 'border-[var(--oe-accent)]/40 bg-[var(--oe-accent-soft)] text-[var(--oe-accent-strong)]'
                        : 'border-[var(--oe-border)] text-[var(--oe-text-secondary)] hover:text-[var(--oe-text)] hover:border-[var(--oe-border-strong)]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-medium">{t(tab.titleKey)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-8 md:p-10">
            <div>
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--oe-accent-soft)] text-[var(--oe-accent)]">
                <ActiveIcon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                {t(activeTech.titleKey)}
              </h3>
              <p className="text-sm sm:text-base text-[var(--oe-text-secondary)] leading-relaxed">
                {t(activeTech.descKey)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {(
                {
                  rust: [
                    ['< 2 ms', 'Temps de réponse'],
                    ['99.999%', 'Disponibilité'],
                    ['−65%', 'Empreinte système'],
                    ['Multi-OS', 'Compatibilité'],
                  ],
                  crdt: [
                    ['0%', 'Pertes de données'],
                    ['Illimitée', 'Autonomie offline'],
                    ['−90%', 'Bande passante'],
                    ['Distribuée', 'Architecture'],
                  ],
                  zerotrust: [
                    ['AES-256', 'Chiffrement'],
                    ['100%', 'Conformité'],
                    ['Enclave', 'Isolation'],
                    ['Zero-Trust', 'Accès'],
                  ],
                  ai: [
                    ['< 15 ms', 'Décision'],
                    ['In-situ', 'Confidentialité'],
                    ['98.4%', 'Précision'],
                    ['Locale', 'Inférence'],
                  ],
                } as const
              )[activeTechTab].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg)]/60 p-3 sm:p-4"
                >
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--oe-text-muted)]">
                    {label}
                  </div>
                  <div className="mt-1.5 sm:mt-2 font-heading text-lg sm:text-xl font-semibold text-[var(--oe-text)]">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Products */}
      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <SectionHeading
            eyebrow="Plateformes"
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
            eyebrow="Démonstration"
            title="Plateformes en action"
            description="Explorez les interfaces métier conçues pour la vitesse, la résilience et la conformité."
          />
          <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] overflow-x-auto">
            <div className="min-w-[20rem]">
              <SaasInteractiveDemo />
            </div>
          </div>
        </Container>
      </Section>

      {/* About strip */}
      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-4">
                Groupe
              </p>
              <blockquote className="font-heading text-2xl md:text-3xl font-medium text-[var(--oe-text)] leading-snug tracking-tight">
                {t('about_quote')}
              </blockquote>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-semibold text-[var(--oe-text)] tracking-tight mb-4">
                {t('about_title')}
              </h2>
              <p className="text-[var(--oe-text-secondary)] leading-relaxed mb-8">{t('about_desc')}</p>
              <ButtonLink href="/about" variant="secondary">
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
            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-4">
                {t('careers_badge')}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                {t('careers_title')}
              </h2>
              <p className="text-[var(--oe-text-secondary)] leading-relaxed mb-8">{t('careers_desc')}</p>
              <ButtonLink href="/careers" variant="secondary">
                {t('careers_cta')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-warning)] mb-4">
                Investisseurs
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                Partenaires stratégiques
              </h2>
              <p className="text-[var(--oe-text-secondary)] leading-relaxed mb-8">
                Accédez à l’espace confidentiel sous NDA pour le dossier d’investissement Okapi Edge.
              </p>
              {onOpenInvestorsModal ? (
                <Button variant="secondary" onClick={onOpenInvestorsModal}>
                  <Lock className="h-4 w-4" />
                  {t('nav_investors')}
                </Button>
              ) : (
                <ButtonLink href="/investors" variant="secondary">
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Contact"
                title={t('b2b_title')}
                description={t('b2b_subtitle')}
              />
            </div>

            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-6 md:p-8">
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
              Solutions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/tech-sovereignty" className="oe-link inline-flex items-center gap-1">
              Ingénierie <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="inline-flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-[var(--oe-accent)]" />
              Edge infrastructure
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
