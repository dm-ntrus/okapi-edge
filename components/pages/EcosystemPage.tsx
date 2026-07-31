'use client';

import React from 'react';
import { Link } from '@/lib/i18n/navigation';
import { SAAS_PRODUCTS } from '@/content/mock-data';
import { PRODUCT_ROUTES } from '@/lib/constants';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ProductTile } from '@/components/ui/ProductTile';
import {
  GraduationCap,
  Pill,
  ShoppingCart,
  Stethoscope,
  Fuel,
} from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  'okapi-edu': <GraduationCap className="h-5 w-5" />,
  'syntix-pharma': <Pill className="h-5 w-5" />,
  'okapi-pos': <ShoppingCart className="h-5 w-5" />,
  'okapi-hospitals': <Stethoscope className="h-5 w-5" />,
  'okapi-fueloils': <Fuel className="h-5 w-5" />,
};

const RD_PROJECTS = [
  {
    status: 'R&D Active',
    title: 'Okapi Edge AI Engine',
    description:
      'Modèles de LLM compacts et inférence ONNX optimisée pour processeurs embarqués et terminaux à faible consommation.',
  },
  {
    status: 'Incubation',
    title: 'Okapi Gov OS',
    description:
      "Système d'interopérabilité ministérielle, registre d'identité souverain et coffre-fort numérique étatique.",
  },
  {
    status: 'Recherche',
    title: 'Quantum Security Enclaves',
    description:
      'Schémas de cryptographie post-quantique (Lattice-based cryptography) pour la protection des données critiques.',
  },
];

export const EcosystemPage: React.FC<{ products?: typeof SAAS_PRODUCTS }> = ({
  products = SAAS_PRODUCTS,
}) => {
  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow="Portfolio Global & Systèmes d'Ingénierie"
        title="Plateformes & Technologies Okapi Edge"
        description="Du moteur de calcul Edge aux architectures d'IA contextuelle et logiciels verticaux critiques. Découvrez notre écosystème global."
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Produits"
            title="Plateformes verticales"
            description="Chaque solution s'appuie sur la même infrastructure Edge souveraine."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductTile
                key={product.id}
                href={PRODUCT_ROUTES[product.id] ?? '/ecosystem'}
                name={product.name}
                subtitle={product.subtitle}
                description={product.tagline}
                accent={product.color}
                icon={ICONS[product.id] ?? <ShoppingCart className="h-5 w-5" />}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Détail"
            title="Indicateurs & capacités"
            description="Aperçu des métriques métier et des fonctionnalités clés par plateforme."
          />
          <div className="space-y-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-7 md:p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-text-muted)] mb-2">
                      {product.badge}
                    </p>
                    <h3 className="font-heading text-2xl font-semibold text-[var(--oe-text)] tracking-tight mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed mb-5">
                      {product.fullDescription}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((f, i) => (
                        <li key={i} className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                          <span className="text-[var(--oe-text)] font-medium">{f.title}</span>
                          <span className="text-[var(--oe-text-muted)]"> — {f.desc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Link
                        href={PRODUCT_ROUTES[product.id] ?? '/ecosystem'}
                        className="oe-link inline-flex items-center gap-1 text-sm font-medium"
                      >
                        Fiche détaillée {product.name} →
                      </Link>
                      <a
                        href={product.subdomainUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[var(--oe-text-muted)] hover:text-[var(--oe-text-secondary)] transition-colors"
                      >
                        {product.subdomainUrl}
                      </a>
                    </div>
                  </div>

                  <div className="w-full lg:w-56 shrink-0 space-y-4 rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg)]/60 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-text-muted)] border-b border-[var(--oe-border)] pb-3">
                      Impact métier
                    </p>
                    {product.metrics.map((m, idx) => (
                      <div key={idx} className="flex items-baseline justify-between gap-3">
                        <span className="text-xs text-[var(--oe-text-muted)]">{m.label}</span>
                        <span className="font-mono text-lg font-semibold text-[var(--oe-text)]">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <SectionHeading
            eyebrow="Laboratoire R&D"
            title="Projets de Recherche & Innovation High-Tech"
            description="IA embarquée, systèmes souverains et cryptographie post-quantique."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RD_PROJECTS.map((project) => (
              <div
                key={project.title}
                className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-7"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)] mb-4">
                  {project.status}
                </p>
                <h4 className="font-heading text-lg font-semibold text-[var(--oe-text)] tracking-tight mb-3">
                  {project.title}
                </h4>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
