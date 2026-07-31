'use client';

import React, { useState } from 'react';
import { JOB_OPENINGS } from '@/content/mock-data';
import { JobOpening } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { MapPin, CheckCircle2, X } from 'lucide-react';

const FIELD_CLASS =
  'w-full rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg)] px-3.5 py-2.5 text-sm text-[var(--oe-text)] placeholder:text-[var(--oe-text-muted)] focus:border-[var(--oe-accent)]/50 focus:outline-none';

const VALUES = [
  {
    label: 'Valeur #1',
    title: 'Impact Direct',
    description:
      "Vos systèmes soutiennent quotidiennement des milliers d'écoles, de pharmacies et de réseaux de distribution.",
  },
  {
    label: 'Valeur #2',
    title: 'Autonomie & Exigence',
    description:
      'Nous privilégions les profils capables de concevoir des architectures résilientes avec une rigueur absolue.',
  },
  {
    label: 'Valeur #3',
    title: 'Organisation Remote-First',
    description:
      'Travaillez de manière flexible avec nos équipes distribuées à travers les principaux hubs mondiaux.',
  },
];

export const CareersPage: React.FC<{ jobs?: JobOpening[] }> = ({ jobs = JOB_OPENINGS }) => {
  const [selectedDept, setSelectedDept] = useState<string>('Tous');
  const [activeJobModal, setActiveJobModal] = useState<JobOpening | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateResume, setCandidateResume] = useState('');

  const departments = ['Tous', 'Ingénierie', 'Produit', 'Opérations'];

  const filteredJobs =
    selectedDept === 'Tous'
      ? jobs
      : jobs.filter((j) => j.department === selectedDept);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobModal) return;
    const { submitPublicInquiryAction } = await import('@/lib/admin/actions');
    const result = await submitPublicInquiryAction({
      kind: 'career',
      full_name: candidateName,
      email: candidateEmail,
      interest: activeJobModal.title,
      message: candidateResume || `Candidature — ${activeJobModal.title}`,
    });
    if (!result.ok) {
      alert(result.error ?? 'Envoi impossible');
      return;
    }
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setActiveJobModal(null);
      setCandidateName('');
      setCandidateEmail('');
      setCandidateResume('');
    }, 4000);
  };

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow="Rejoignez nos Ingénieurs"
        title="Concevez des logiciels à fort impact mondial."
        description="Rejoignez une équipe d'ingénieurs passionnés par les architectures distribuées, le Edge Computing et l'excellence logicielle."
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <SectionHeading
            eyebrow="Culture"
            title="Ce qui nous anime"
            description="Impact terrain, exigence technique et flexibilité remote-first."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-7"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)] mb-3">
                  {value.label}
                </p>
                <h3 className="font-heading text-lg font-semibold text-[var(--oe-text)] tracking-tight mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)] border-b-0">
        <Container>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--oe-border)] pb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--oe-text)] tracking-tight">
              Postes Ouverts ({filteredJobs.length})
            </h2>
            <div className="flex flex-wrap items-center gap-1.5">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-[var(--oe-radius)] px-3 py-1.5 text-xs font-mono transition-colors ${
                    selectedDept === dept
                      ? 'bg-[var(--oe-accent-soft)] text-[var(--oe-accent)] border border-[var(--oe-accent)]/30'
                      : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)] border border-transparent'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-6 transition-colors hover:border-[var(--oe-border-strong)]"
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--oe-accent)]">
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--oe-text-muted)]">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[var(--oe-text)] tracking-tight">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--oe-text-secondary)]">{job.summary}</p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="shrink-0"
                  onClick={() => setActiveJobModal(job)}
                >
                  Postuler à l&apos;offre →
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {activeJobModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[var(--oe-bg)]/80 backdrop-blur-md p-4">
          <div className="relative my-8 w-full max-w-2xl rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-6 md:p-8">
            <button
              type="button"
              onClick={() => setActiveJobModal(null)}
              className="absolute top-4 right-4 text-[var(--oe-text-muted)] hover:text-[var(--oe-text)] transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-heading text-2xl font-semibold text-[var(--oe-text)] tracking-tight mb-1 pr-8">
              {activeJobModal.title}
            </h3>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)]">
              {activeJobModal.department} · {activeJobModal.location}
            </p>

            {applySuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-[var(--oe-success)]" />
                <h4 className="font-heading text-lg font-semibold text-[var(--oe-text)] mb-2">
                  Candidature transmise avec succès
                </h4>
                <p className="text-sm text-[var(--oe-text-secondary)]">
                  Merci {candidateName}. Notre équipe d&apos;ingénierie étudiera votre profil sous 5
                  jours ouvrés.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="votre nom"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                    Lien CV / GitHub / LinkedIn *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://github.com/votre-compte ou LinkedIn"
                    value={candidateResume}
                    onChange={(e) => setCandidateResume(e.target.value)}
                    className={FIELD_CLASS}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Envoyer ma Candidature
                </Button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
