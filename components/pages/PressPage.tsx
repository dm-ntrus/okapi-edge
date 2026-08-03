'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PRESS_RELEASES } from '@/content/mock-data';
import type { PressRelease } from '@/types';
import { Download } from 'lucide-react';

export const PressPage: React.FC<{ items?: PressRelease[] }> = ({ items = PRESS_RELEASES }) => {
  const t = useTranslations('press');

  return (
    <div className="w-full py-10 sm:py-16 bg-[var(--oe-bg)] text-[var(--oe-text)]">
      <div className="oe-container max-w-5xl">

        <div className="text-center mb-10 sm:mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--oe-accent-soft)] text-[var(--oe-accent)] border border-[var(--oe-accent)]/30">
            {t('header.eyebrow')}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-heading font-bold text-[var(--oe-text)] mt-4 tracking-tight text-balance">
            {t('header.title')}
          </h1>
          <p className="text-base sm:text-lg text-[var(--oe-text-secondary)] mt-4 max-w-2xl mx-auto font-body">
            {t('header.description')}
          </p>
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-heading font-bold text-[var(--oe-text)] mb-6">
            {t('releases.title')}
          </h2>

          {items.map((pr) => (
            <div
              key={pr.id}
              className="p-5 sm:p-6 rounded-2xl bg-[var(--oe-surface)] border border-[var(--oe-border)] hover:border-[var(--oe-accent)]/40 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--oe-accent-soft)] text-[var(--oe-accent)]">
                  {pr.category}
                </span>
                <span className="text-xs text-[var(--oe-text-secondary)] font-mono">{pr.date}</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-[var(--oe-text)] mb-2">{pr.title}</h3>
              <p className="text-xs text-[var(--oe-text-secondary)] leading-relaxed mb-4">{pr.summary}</p>
              {pr.downloadUrl ? (
                <a
                  href={pr.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--oe-accent)] hover:text-[var(--oe-accent)] inline-flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('releases.downloadPdf')}</span>
                </a>
              ) : (
                <span className="text-xs font-mono text-[var(--oe-text-muted)] inline-flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  {t('releases.pdfComingSoon')}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--oe-bg-muted)] to-[var(--oe-accent-soft)] border border-[var(--oe-border)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-[var(--oe-text)]">
              {t('mediaKit.title')}
            </h3>
            <p className="text-sm text-[var(--oe-text-secondary)] mt-1">
              {t('mediaKit.description')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert(t('mediaKit.downloadAlert'))}
            className="oe-tap w-full md:w-auto px-6 py-3 rounded-xl bg-[var(--oe-accent)] hover:bg-[var(--oe-accent-strong)] text-[var(--oe-accent-ink)] font-heading font-bold text-sm shrink-0 inline-flex items-center justify-center gap-2 min-h-12"
          >
            <Download className="w-4 h-4" />
            <span>{t('mediaKit.downloadCta')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
