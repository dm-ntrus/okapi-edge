import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Section';

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--oe-border)] pt-10 pb-10 sm:pt-16 sm:pb-14 md:pt-24 md:pb-20">
      <div className="absolute inset-0 oe-grid-fade pointer-events-none opacity-70" />
      <div className="absolute inset-0 oe-hero-veil-strong pointer-events-none" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center px-0.5">
          {eyebrow ? (
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-3 sm:mb-5 oe-fade-up">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-heading text-[1.75rem] leading-[1.15] sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--oe-text)] text-balance oe-fade-up">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-3 sm:mt-5 max-w-2xl text-[0.9375rem] sm:text-lg text-[var(--oe-text-secondary)] leading-relaxed oe-fade-up-delay">
              {description}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 oe-fade-up-delay-2 [&_a]:w-full sm:[&_a]:w-auto [&_button]:w-full sm:[&_button]:w-auto">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
