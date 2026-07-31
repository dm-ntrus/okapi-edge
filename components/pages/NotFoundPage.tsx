'use client';

import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow="Erreur 404 · Hors Sentier"
        title="Sentier Inexploré."
        description="Même un Okapi s'aventure parfois hors des pistes. Cette page n'existe pas encore. Retournez au hub."
        actions={
          <ButtonLink href="/">
            <ArrowLeft className="h-4 w-4" />
            Retourner au Hub Corporate
          </ButtonLink>
        }
      />

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="max-w-lg rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-3">
              Navigation
            </p>
            <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
              Vérifiez l&apos;URL ou utilisez le menu pour rejoindre Vision, Écosystème, ou Contact
              B2B.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
};
