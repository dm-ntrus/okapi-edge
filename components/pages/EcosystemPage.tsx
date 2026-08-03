'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { SAAS_PRODUCTS } from '@/content/mock-data';
import { PRODUCT_ROUTES } from '@/lib/constants';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ProductTile } from '@/components/ui/ProductTile';
import {
  GraduationCap,
  Pill,
  ShoppingCart,
  Stethoscope,
  Fuel,
} from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  'okapi-edu': <GraduationCap className="h-5 w-5" />,
  'syntix-pharma': <Pill className="h-5 w-5" />,
  'okapi-pos': <ShoppingCart className="h-5 w-5" />,
  'okapi-hospitals': <Stethoscope className="h-5 w-5" />,
  'okapi-fueloils': <Fuel className="h-5 w-5" />,
};

/**
 * Position-based i18n key mapping per product id.
 * Order matches the arrays declared in `SAAS_PRODUCTS` mock-data.
 */
const PRODUCT_KEYS: Record<
  string,
  { productKey: 'edu' | 'syntix' | 'pos' | 'hospitals' | 'fueloils'; features: string[]; metrics: string[] }
> = {
  'okapi-edu': {
    productKey: 'edu',
    features: ['aiAnalytics', 'financial', 'multiCampus', 'studentApp'],
    metrics: ['satisfaction', 'efficiency', 'learners', 'availability'],
  },
  'syntix-pharma': {
    productKey: 'syntix',
    features: ['invoicing', 'fefo', 'predictive', 'antiCounterfeit'],
    metrics: ['compliance', 'stockouts', 'trackedProducts', 'expiryLoss'],
  },
  'okapi-pos': {
    productKey: 'pos',
    features: ['native', 'syncCrdt', 'multiStore', 'dynamicFiscal'],
    metrics: ['sla', 'txSpeed', 'activePos', 'volume'],
  },
  'okapi-hospitals': {
    productKey: 'hospitals',
    features: ['emr', 'beds', 'pharmacy', 'billing'],
    metrics: ['waitTime', 'adminEfficiency', 'patients', 'availability'],
  },
  'okapi-fueloils': {
    productKey: 'fueloils',
    features: ['telemetry', 'fleet', 'pumps', 'multiStation'],
    metrics: ['lossReduction', 'stations', 'volume', 'gaugingPrecision'],
  },
};

const RD_PROJECT_IDS = ['aiEngine', 'govOs', 'quantum'] as const;

export const EcosystemPage: React.FC<{ products?: typeof SAAS_PRODUCTS }> = ({
  products = SAAS_PRODUCTS,
}) => {
  const t = useTranslations('ecosystem');
  const tp = useTranslations('products');

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <SectionHeading
            align="left"
            eyebrow={t('verticals.eyebrow')}
            title={t('verticals.title')}
            description={t('verticals.description')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((product) => {
              const mapping = PRODUCT_KEYS[product.id];
              const name = mapping ? tp(`${mapping.productKey}.name`) : product.name;
              const subtitle = mapping ? tp(`${mapping.productKey}.subtitle`) : product.subtitle;
              const description = mapping
                ? tp(`${mapping.productKey}.tagline`)
                : product.tagline;
              return (
                <ProductTile
                  key={product.id}
                  href={PRODUCT_ROUTES[product.id] ?? '/ecosystem'}
                  name={name}
                  subtitle={subtitle}
                  description={description}
                  accent={product.color}
                  icon={ICONS[product.id] ?? <ShoppingCart className="h-5 w-5" />}
                />
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <SectionHeading
            align="left"
            eyebrow={t('details.eyebrow')}
            title={t('details.title')}
            description={t('details.description')}
          />
          <div className="space-y-5">
            {products.map((product) => {
              const mapping = PRODUCT_KEYS[product.id];
              const productName = mapping ? tp(`${mapping.productKey}.name`) : product.name;
              return (
                <div
                  key={product.id}
                  className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7 md:p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-text-muted)] mb-2">
                        {mapping ? tp(`${mapping.productKey}.badge`) : product.badge}
                      </p>
                      <h3 className="font-heading text-2xl font-semibold text-[var(--oe-text)] tracking-tight mb-2">
                        {productName}
                      </h3>
                      <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed mb-5">
                        {mapping
                          ? tp(`${mapping.productKey}.fullDescription`)
                          : product.fullDescription}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {product.features.map((f, i) => {
                          const featureKey = mapping?.features[i];
                          const title = featureKey
                            ? tp(`${mapping.productKey}.features.${featureKey}.title`)
                            : f.title;
                          const desc = featureKey
                            ? tp(`${mapping.productKey}.features.${featureKey}.desc`)
                            : f.desc;
                          return (
                            <li key={i} className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                              <span className="text-[var(--oe-text)] font-medium">{title}</span>
                              <span className="text-[var(--oe-text-muted)]"> — {desc}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          href={PRODUCT_ROUTES[product.id] ?? '/ecosystem'}
                          className="oe-link inline-flex items-center gap-1 text-sm font-medium"
                        >
                          {t('details.productSheetLink', { name: productName })}
                        </Link>
                        <a
                          href={product.subdomainUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[var(--oe-text-muted)] hover:text-[var(--oe-text-secondary)] transition-colors break-all min-w-0"
                        >
                          {product.subdomainUrl}
                        </a>
                      </div>
                    </div>

                    <div className="w-full lg:w-56 shrink-0 space-y-4 rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg)]/60 p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-text-muted)] border-b border-[var(--oe-border)] pb-3">
                        {t('details.impactLabel')}
                      </p>
                      {product.metrics.map((m, idx) => {
                        const metricKey = mapping?.metrics[idx];
                        const label = metricKey
                          ? tp(`${mapping.productKey}.metrics.${metricKey}`)
                          : m.label;
                        return (
                          <div key={idx} className="flex items-baseline justify-between gap-3">
                            <span className="text-xs text-[var(--oe-text-muted)]">{label}</span>
                            <span className="font-mono text-lg font-semibold text-[var(--oe-text)]">
                              {m.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <SectionHeading
            eyebrow={t('rd.eyebrow')}
            title={t('rd.title')}
            description={t('rd.description')}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RD_PROJECT_IDS.map((projectId) => (
              <div
                key={projectId}
                className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)] mb-4">
                  {t(`rd.projects.${projectId}.status`)}
                </p>
                <h4 className="font-heading text-lg font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                  {t(`rd.projects.${projectId}.title`)}
                </h4>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  {t(`rd.projects.${projectId}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
