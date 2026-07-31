'use client';

import React from 'react';
import { MANIFESTO_TEXT } from '@/content/mock-data';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const VisionImpactPage: React.FC = () => {
  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow="Vision & Impact International"
        title="Forger l'Avenir Technologique des Logiciels d'Entreprise"
        description="Comment Okapi Edge construit des infrastructures hautement résilientes pour pérenniser l'éducation, la santé et le commerce à l'échelle mondiale."
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-6">
              Extrait du Manifeste Fondateur
            </p>
            <blockquote className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--oe-text)] leading-snug tracking-tight mb-8">
              « {MANIFESTO_TEXT.quote} »
            </blockquote>
            <p className="text-base md:text-lg text-[var(--oe-text-secondary)] leading-relaxed font-body">
              {MANIFESTO_TEXT.body}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <SectionHeading
            eyebrow="Principes"
            title="Les 4 Piliers Cardinaux de Notre Action"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MANIFESTO_TEXT.principles.map((p, idx) => (
              <div
                key={idx}
                className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-7 md:p-8"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)] mb-3">
                  0{idx + 1} · Pilier stratégique
                </p>
                <h3 className="font-heading text-xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-8 md:p-10">
            <div className="max-w-xl">
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--oe-text)] tracking-tight">
                Consulter nos Fiches Solutions
              </h3>
              <p className="mt-2 text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                Découvrez la déclinaison opérationnelle de cette vision dans Okapi Edu, Syntix Pharma et Okapi POS.
              </p>
            </div>
            <ButtonLink href="/ecosystem">
              Explorer l&apos;Écosystème
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </div>
  );
};
