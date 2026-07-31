'use client';

import React from 'react';
import { TEAM_MEMBERS } from '@/content/mock-data';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Linkedin, ArrowRight } from 'lucide-react';

const TIMELINE = [
  {
    year: '2024',
    label: "Fondation d'Okapi Edge et R&D Architecture Distribuée",
  },
  {
    year: '2025',
    label: 'Déploiement des premières plateformes Okapi Edu & Syntix Pharma',
  },
  {
    year: '2026',
    label: 'Lancement du Réseau Edge Multi-Régions & Expansion Internationale',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow="Histoire, Équipe & ADN Global"
        title="À Propos d'Okapi Edge"
        description="Un groupe technologique international développant des plateformes SaaS d'entreprise et une infrastructure Edge distribuée."
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-4">
                L&apos;Histoire Fondatrice
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--oe-text)] leading-[1.15] mb-6">
                L&apos;Excellence logicielle et la vitesse Edge.
              </h2>
              <div className="space-y-4 text-[var(--oe-text-secondary)] text-base leading-relaxed font-body">
                <p>
                  Fondé par des chercheurs et ingénieurs issus de centres de recherche et
                  d&apos;entreprises technologiques de premier plan, Okapi Edge a été conçu pour
                  résoudre la complexité des systèmes d&apos;information distribués.
                </p>
                <p>
                  Nous combinons le calcul en bordure de réseau (Edge Computing), la
                  synchronisation CRDT temps réel et une architecture sécurisée Zero-Trust pour
                  éditer des SaaS d&apos;entreprise ultra-performants.
                </p>
              </div>
            </div>

            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-7 md:p-8 space-y-6">
              {TIMELINE.map((item) => (
                <div
                  key={item.year}
                  className="border-l border-[var(--oe-accent)]/40 pl-5"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)] mb-1">
                    {item.year}
                  </p>
                  <p className="text-sm font-medium text-[var(--oe-text)] leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <SectionHeading
            eyebrow="Gouvernance Exécutive"
            title="L'Équipe Dirigeante"
            description="Un collectif de stratèges, chercheurs et bâtisseurs engagés pour l'excellence."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="flex flex-col justify-between rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-6 transition-colors hover:border-[var(--oe-border-strong)]"
              >
                <div>
                  <div className="mb-5 h-16 w-16 overflow-hidden rounded-xl border border-[var(--oe-border)] bg-[var(--oe-bg)]">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[var(--oe-accent)]">
                        {member.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[var(--oe-text)] tracking-tight">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--oe-accent)]">
                    {member.role}
                  </p>
                  <p className="mt-3 text-xs text-[var(--oe-text-secondary)] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--oe-border)] pt-4 text-xs text-[var(--oe-text-muted)]">
                  <span>Global HQ</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--oe-radius)] border border-[var(--oe-border)] text-[var(--oe-text-muted)]">
                    <Linkedin className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-8 md:p-12 text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--oe-text)] tracking-tight">
              Vous partagez notre ambition ?
            </h3>
            <p className="mt-3 mx-auto max-w-xl text-sm text-[var(--oe-text-secondary)] leading-relaxed">
              Nous recrutons continuellement des ingénieurs systèmes, UX designers et product
              managers de classe mondiale.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/careers">
                Découvrir nos Opportunités
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
