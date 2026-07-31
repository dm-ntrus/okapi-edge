'use client';

import React from 'react';
import { Link } from '@/lib/i18n/navigation';
import { SAAS_PRODUCTS } from '@/content/mock-data';
import type { SaasProduct } from '@/types';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export const OkapiPosDetailPage: React.FC<{ product?: SaasProduct }> = ({
  product = SAAS_PRODUCTS.find((p) => p.id === 'okapi-pos')!,
}) => {

  return (
    <div className="w-full py-16 bg-[var(--oe-bg)] text-[var(--oe-text)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          href="/ecosystem"
          className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l&apos;Écosystème</span>
        </Link>

        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--oe-surface)] border border-amber-500/30 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-amber-500/20 text-amber-300">
                {product.badge}
              </span>
              <h1 className="text-4xl font-heading font-bold text-[var(--oe-text)] mt-1">{product.name}</h1>
            </div>
          </div>

          <p className="text-xl text-[var(--oe-text-secondary)] font-semibold mb-6">{product.subtitle} — {product.tagline}</p>
          <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed font-body mb-8">{product.fullDescription}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[var(--oe-bg-muted)] border border-[var(--oe-border)]">
            {product.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-heading font-bold text-amber-400 font-mono">{m.value}</div>
                <div className="text-xs text-[var(--oe-text-secondary)] mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-heading font-bold text-[var(--oe-text)] mb-6">Moteur de Caisse & Synchro Okapi POS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {product.features.map((f, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[var(--oe-surface)] border border-[var(--oe-border)]">
              <h3 className="text-lg font-heading font-bold text-amber-300 mb-2">{f.title}</h3>
              <p className="text-xs text-[var(--oe-text-secondary)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={product.subdomainUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-sm shadow-xl"
          >
            <span>Accéder à Okapi POS</span>
          </a>
        </div>

      </div>
    </div>
  );
};
