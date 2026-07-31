'use client';

import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Server, Lock, Cpu, WifiOff, FileCode, Receipt, ArrowRight } from 'lucide-react';

const PILLARS = [
  {
    icon: Server,
    title: 'Datacenters Multi-Régions Edge',
    description:
      'Vos données restent stockées de façon sécurisée au sein de nos enclaves de serveurs multi-régions avec réplication chiffrée sub-milliseconde.',
  },
  {
    icon: Lock,
    title: 'Chiffrement AES-256 / Ed25519',
    description:
      'Données chiffrées au repos et en transit. Les clés de déchiffrement sont sous la gouvernance exclusive du client ou du tenant institutionnel.',
  },
  {
    icon: Receipt,
    title: 'Conformité e-DGI Native',
    description:
      'Génération directe de la facture électronique normalisée RDC avec signature cryptographique en 200ms et transmission sécurisée.',
  },
  {
    icon: WifiOff,
    title: 'Moteur Offline-First & CRDT',
    description:
      'Fonctionnement complet hors-ligne grâce aux structures de données CRDT (Conflict-free Replicated Data Types) pour une resynchronisation sans heurt.',
  },
  {
    icon: Cpu,
    title: 'IA Contextuelle Locale',
    description:
      'Modèles de Machine Learning entraînés sur des données locales et anonymisées, garantissant la pertinence sans modèle aveuglément importé.',
  },
  {
    icon: FileCode,
    title: 'Architecture Multi-Tenant & API-First',
    description:
      'Chaque établissement ou entreprise possède un environnement cloisonné avec accès complet aux webhooks et API REST/gRPC.',
  },
];

export const TechSovereigntyPage: React.FC = () => {
  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow="Forteresse Numérique & Edge Security"
        title="La tech n'est pas un outil. C'est un territoire."
        description="Explications détaillées de notre architecture multi-tenant, chiffrement Zero-Trust, clusters Edge multi-régions et moteur de conformité globale."
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <SectionHeading
            eyebrow="Architecture"
            title="Six piliers de souveraineté technique"
            description="Infrastructure, cryptographie, conformité et résilience opérationnelle."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-7 transition-colors hover:border-[var(--oe-border-strong)]"
                >
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--oe-border)] bg-[var(--oe-accent-soft)] text-[var(--oe-accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)] border-b-0">
        <Container>
          <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-8 md:p-12 text-center">
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--oe-text)] tracking-tight">
              Besoin d&apos;un audit de souveraineté pour votre infrastructure ?
            </h3>
            <p className="mt-3 mx-auto max-w-md text-sm text-[var(--oe-text-secondary)] leading-relaxed">
              Nos équipes d&apos;ingénieurs accompagnent les ministères, universités et grands
              groupes dans leur transition souveraine.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact">
                Contacter nos Architectes
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
