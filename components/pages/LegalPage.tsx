'use client';

import type { SiteLegal } from '@/types';

export function LegalPage({ legal }: { legal: SiteLegal }) {
  return (
    <div className="w-full py-12 sm:py-16 bg-[var(--oe-bg)] text-[var(--oe-text)]">
      <div className="oe-container max-w-4xl">
        <div className="text-center mb-10 sm:mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--oe-bg-muted)] text-[var(--oe-text-secondary)]">
            {legal.badge}
          </span>
          <h1 className="text-[1.75rem] sm:text-3xl md:text-5xl font-heading font-bold text-[var(--oe-text)] mt-4 text-balance">
            {legal.title}
          </h1>
          <p className="text-xs text-[var(--oe-text-secondary)] mt-2 font-mono">
            {legal.updatedAt}
          </p>
          <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--oe-accent)] break-words px-1">
            {legal.legalName} · {legal.entityLabel} · {legal.registration}
          </p>
        </div>

        <div className="space-y-8 bg-[var(--oe-surface)] p-5 sm:p-8 rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] text-[var(--oe-text-secondary)] text-sm leading-relaxed oe-prose-mobile">
          {legal.sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-xl font-heading font-bold text-[var(--oe-text)] mb-2">
                {section.title}
              </h2>
              <p className="whitespace-pre-line">{section.body}</p>
              {section.footer ? (
                <p className="mt-2 text-xs font-mono text-[var(--oe-accent)] whitespace-pre-line">
                  {section.footer}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
