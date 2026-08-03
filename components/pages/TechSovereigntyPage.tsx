'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Server, Lock, Cpu, WifiOff, FileCode, Receipt, ArrowRight, type LucideIcon } from 'lucide-react';

type PillarId =
  | 'datacenters'
  | 'encryption'
  | 'edgi'
  | 'offline'
  | 'ai'
  | 'multiTenant';

const PILLARS: { id: PillarId; icon: LucideIcon }[] = [
  { id: 'datacenters', icon: Server },
  { id: 'encryption', icon: Lock },
  { id: 'edgi', icon: Receipt },
  { id: 'offline', icon: WifiOff },
  { id: 'ai', icon: Cpu },
  { id: 'multiTenant', icon: FileCode },
];

export const TechSovereigntyPage: React.FC = () => {
  const t = useTranslations('tech');

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
            eyebrow={t('architecture.eyebrow')}
            title={t('architecture.title')}
            description={t('architecture.description')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7 transition-colors hover:border-[var(--oe-border-strong)]"
                >
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--oe-border)] bg-[var(--oe-accent-soft)] text-[var(--oe-accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                    {t(`architecture.pillars.${pillar.id}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                    {t(`architecture.pillars.${pillar.id}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)] border-b-0">
        <Container>
          <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-8 md:p-12 text-center">
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--oe-text)] tracking-tight">
              {t('audit.title')}
            </h3>
            <p className="mt-3 mx-auto max-w-md text-sm text-[var(--oe-text-secondary)] leading-relaxed">
              {t('audit.description')}
            </p>
            <div className="mt-6 sm:mt-8 flex justify-center">
              <ButtonLink href="/contact" className="w-full sm:w-auto">
                {t('audit.cta')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
