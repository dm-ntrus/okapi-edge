'use client';

import React from 'react';

export const LegalPage: React.FC = () => {
  return (
    <div className="w-full py-16 bg-[var(--oe-bg)] text-[var(--oe-text)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--oe-bg-muted)] text-[var(--oe-text-secondary)]">
            Cadre Légal & Conformité
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[var(--oe-text)] mt-4">
            Mentions Légales & Politique de Confidentialité
          </h1>
          <p className="text-xs text-[var(--oe-text-secondary)] mt-2 font-mono">Dernière mise à jour : Juillet 2026 • République Démocratique du Congo</p>
        </div>

        <div className="space-y-8 bg-[var(--oe-surface)] p-8 rounded-3xl border border-[var(--oe-border)] text-[var(--oe-text-secondary)] text-sm leading-relaxed">

          <div>
            <h2 className="text-xl font-heading font-bold text-[var(--oe-text)] mb-2">1. Éditeur du Site</h2>
            <p>
              Le site <strong>okapiedge.com</strong> est édité par la société <strong>OKAPI EDGE INC.</strong>, société d&apos;ingénierie logicielle au capital de $500,000 USD, immatriculée sous le numéro CD/KIN/RCCM/24-B-01492.
            </p>
            <p className="mt-2 text-xs font-mono text-purple-300">
              Siège social : Boulevard du 30 Juin, Immeuble Okapi, Gombe, Kinshasa, RDC.<br />
              Directeur de la Publication : Patrick Mwamba, Président-Directeur Général.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-[var(--oe-text)] mb-2">2. Hébergement & Cloud Souverain</h2>
            <p>
              L&apos;intégralité des données du site et des plateformes SaaS associées (Okapi Edu, Syntix Pharma, Okapi POS, Okapi Hospitals, Okapi FuelOils) est hébergée sur l&apos;infrastructure de cloud souverain opérée par Okapi Edge au sein de datacenters sécurisés.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-[var(--oe-text)] mb-2">3. Protection des Données Personnelles & e-DGI</h2>
            <p>
              Conformément à la réglementation sur la protection des données à caractère personnel et aux exigences de conformité, Okapi Edge garantit le chiffrement AES-256 de toutes les données sensibles.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-[var(--oe-text)] mb-2">4. Propriété Intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus, marques, logos, visuels et architectures logicielles est la propriété exclusive d&apos;Okapi Edge Inc. Toute reproduction non autorisée constitue une contrefaçon sanctionnée par la loi.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
