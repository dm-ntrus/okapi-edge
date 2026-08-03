'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const PILLAR_IDS = ['resilience', 'sovereignty', 'intelligence', 'ergonomics'] as const;
type PillarId = (typeof PILLAR_IDS)[number];

export const VisionImpactPage: React.FC = () => {
  const t = useTranslations('vision');

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-6">
              {t('manifesto.excerptLabel')}
            </p>
            <blockquote className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--oe-text)] leading-snug tracking-tight mb-8">
              « {t('manifesto.quote')} »
            </blockquote>
            <p className="text-base md:text-lg text-[var(--oe-text-secondary)] leading-relaxed font-body">
              {t('manifesto.body')}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <SectionHeading
            eyebrow={t('manifesto.principles.eyebrow')}
            title={t('manifesto.principles.title')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILLAR_IDS.map((id: PillarId, idx) => (
              <div
                key={id}
                className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7 md:p-8"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)] mb-3">
                  {t('manifesto.principles.pillarLabel', { index: idx + 1 })}
                </p>
                <h3 className="font-heading text-xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                  {t(`manifesto.principles.items.${id}.title`)}
                </h3>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  {t(`manifesto.principles.items.${id}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-8 md:p-10">
            <div className="max-w-xl min-w-0">
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--oe-text)] tracking-tight">
                {t('solutionsBanner.title')}
              </h3>
              <p className="mt-2 text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                {t('solutionsBanner.description')}
              </p>
            </div>
            <ButtonLink href="/ecosystem" className="w-full md:w-auto shrink-0">
              {t('solutionsBanner.cta')}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </div>
  );
};
