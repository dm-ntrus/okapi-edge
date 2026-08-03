'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const t = useTranslations('notFound');

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
        actions={
          <ButtonLink href="/" className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" />
            {t('hero.cta')}
          </ButtonLink>
        }
      />

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="max-w-lg rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-3">
              {t('navigation.eyebrow')}
            </p>
            <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
              {t('navigation.description')}
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
};
