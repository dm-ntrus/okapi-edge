'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { SAAS_PRODUCTS } from '@/content/mock-data';
import type { SaasProduct } from '@/types';
import { Stethoscope, ArrowLeft } from 'lucide-react';

const METRIC_KEYS = ['waitTime', 'adminEfficiency', 'patients', 'availability'] as const;
const FEATURE_KEYS = ['emr', 'beds', 'pharmacy', 'billing'] as const;

export const OkapiHospitalsDetailPage: React.FC<{ product?: SaasProduct }> = ({
  product = SAAS_PRODUCTS.find((p) => p.id === 'okapi-hospitals') || SAAS_PRODUCTS[0],
}) => {
  const t = useTranslations('products.hospitals');
  const tc = useTranslations('common');

  return (
    <div className="w-full py-10 sm:py-16 bg-[var(--oe-bg)] text-[var(--oe-text)]">
      <div className="oe-container max-w-5xl">

        <Link
          href="/ecosystem"
          className="oe-tap inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tc('backToEcosystem')}</span>
        </Link>

        <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[var(--oe-surface)] border border-emerald-500/30 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 self-start">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {t('badge')}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--oe-text)] mt-1">
                {t('name')}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-[var(--oe-text-secondary)] font-semibold mb-4 sm:mb-6">
            {t('subtitle')} — {t('tagline')}
          </p>
          <p className="text-sm sm:text-base text-[var(--oe-text-secondary)] leading-relaxed font-body mb-6 sm:mb-8">
            {t('fullDescription')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-[var(--oe-bg-muted)] border border-[var(--oe-border)]">
            {product.metrics.map((m, i) => (
              <div key={i} className="text-center py-1">
                <div className="text-xl sm:text-2xl font-heading font-bold text-emerald-400 font-mono">{m.value}</div>
                <div className="text-xs text-[var(--oe-text-secondary)] mt-1">
                  {METRIC_KEYS[i] ? t(`metrics.${METRIC_KEYS[i]}`) : m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-heading font-bold text-[var(--oe-text)] mb-4 sm:mb-6">
          {t('detail.featuresTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {product.features.map((f, idx) => {
            const key = FEATURE_KEYS[idx];
            return (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[var(--oe-surface)] border border-[var(--oe-border)]">
                <h3 className="text-base sm:text-lg font-heading font-bold text-emerald-300 mb-2">
                  {key ? t(`features.${key}.title`) : f.title}
                </h3>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  {key ? t(`features.${key}.desc`) : f.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href={product.subdomainUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="oe-tap inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-bold text-sm shadow-xl min-h-12"
          >
            <span>{t('detail.portalCta')}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
