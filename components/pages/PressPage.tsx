'use client';

import React from 'react';
import { PRESS_RELEASES } from '@/content/mock-data';
import type { PressRelease } from '@/types';
import { Download } from 'lucide-react';

export const PressPage: React.FC<{ items?: PressRelease[] }> = ({ items = PRESS_RELEASES }) => {
  return (
    <div className="w-full py-16 bg-[var(--oe-bg)] text-[var(--oe-text)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--oe-accent-soft)] text-[var(--oe-accent)] border border-[var(--oe-accent)]/30">
            Espace Presse & Média
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-bold text-[var(--oe-text)] mt-4 tracking-tight">
            Salle de Presse Okapi Edge
          </h1>
          <p className="text-lg text-[var(--oe-text-secondary)] mt-4 max-w-2xl mx-auto font-body">
            Communiqués officiels, kits médias, logos haute résolution et contacts pour la presse technologique et économique.
          </p>
        </div>

        {/* Press Releases List */}
        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-heading font-bold text-[var(--oe-text)] mb-6">Derniers Communiqués Officiels</h2>

          {items.map((pr) => (
            <div key={pr.id} className="p-6 rounded-2xl bg-[var(--oe-surface)] border border-[var(--oe-border)] hover:border-[var(--oe-accent)]/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
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
                  <span>Télécharger le Communiqué PDF</span>
                </a>
              ) : (
                <span className="text-xs font-mono text-[var(--oe-text-muted)] inline-flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  PDF bientôt disponible
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Media Kit Download Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[var(--oe-bg-muted)] to-[var(--oe-accent-soft)] border border-[var(--oe-border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-heading font-bold text-[var(--oe-text)]">Kit Média Officiel (Brand Assets)</h3>
            <p className="text-xs text-[var(--oe-text-secondary)] mt-1">
              Téléchargez les logos vectoriels SVG/PNG d&apos;Okapi Edge, les chartes graphiques et les portraits officiels de la direction.
            </p>
          </div>
          <button
            onClick={() => alert('Téléchargement du Kit Média Okapi Edge ZIP (Logos, Charte, Photos HD)')}
            className="px-6 py-3 rounded-xl bg-[var(--oe-accent)] hover:bg-[var(--oe-accent-strong)] text-[var(--oe-accent-ink)] font-heading font-bold text-xs shrink-0 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger Kit Média (ZIP)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
