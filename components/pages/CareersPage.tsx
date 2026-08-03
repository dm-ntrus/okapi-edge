'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { JOB_OPENINGS } from '@/content/mock-data';
import { JobOpening } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { MapPin, CheckCircle2, X } from 'lucide-react';

const FIELD_CLASS = 'oe-field';

type ValueId = 'impact' | 'autonomy' | 'remote';
const VALUE_IDS: ValueId[] = ['impact', 'autonomy', 'remote'];

type DepartmentId = 'all' | 'engineering' | 'product' | 'operations';
const DEPARTMENT_FILTERS: { id: DepartmentId; match?: string }[] = [
  { id: 'all' },
  { id: 'engineering', match: 'Ingénierie' },
  { id: 'product', match: 'Produit' },
  { id: 'operations', match: 'Opérations' },
];

export const CareersPage: React.FC<{ jobs?: JobOpening[] }> = ({ jobs = JOB_OPENINGS }) => {
  const t = useTranslations('careers');
  const tc = useTranslations('common');
  const ta = useTranslations('a11y');
  const [selectedDept, setSelectedDept] = useState<DepartmentId>('all');
  const [activeJobModal, setActiveJobModal] = useState<JobOpening | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateResume, setCandidateResume] = useState('');

  const filteredJobs =
    selectedDept === 'all'
      ? jobs
      : jobs.filter((j) => {
          const filter = DEPARTMENT_FILTERS.find((d) => d.id === selectedDept);
          return filter?.match ? j.department === filter.match : true;
        });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobModal) return;
    const { submitPublicInquiryAction } = await import('@/lib/admin/actions');
    const result = await submitPublicInquiryAction({
      kind: 'career',
      full_name: candidateName,
      email: candidateEmail,
      interest: activeJobModal.title,
      message:
        candidateResume || t('apply.fallbackMessage', { title: activeJobModal.title }),
    });
    if (!result.ok) {
      alert(result.error ?? tc('errors.sendFailed'));
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
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <SectionHeading
            eyebrow={t('culture.eyebrow')}
            title={t('culture.title')}
            description={t('culture.description')}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUE_IDS.map((id) => (
              <div
                key={id}
                className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)] mb-3">
                  {t(`culture.values.${id}.label`)}
                </p>
                <h3 className="font-heading text-lg font-semibold text-[var(--oe-text)] tracking-tight mb-2">
                  {t(`culture.values.${id}.title`)}
                </h3>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  {t(`culture.values.${id}.description`)}
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
              {t('openings.title', { count: filteredJobs.length })}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5">
              {DEPARTMENT_FILTERS.map((dept) => {
                const selected = selectedDept === dept.id;
                return (
                  <span key={dept.id} className="contents">
                    <input
                      type="radio"
                      name="oe-careers-dept"
                      id={`oe-careers-dept-${dept.id}`}
                      checked={selected}
                      onChange={() => setSelectedDept(dept.id)}
                      className="oe-native-toggle"
                    />
                    <label
                      htmlFor={`oe-careers-dept-${dept.id}`}
                      className={`oe-tap cursor-pointer rounded-[var(--oe-radius)] px-3 py-1.5 text-xs font-mono transition-colors min-h-11 inline-flex items-center ${
                        selected
                          ? 'bg-[var(--oe-accent-soft)] text-[var(--oe-accent)] border border-[var(--oe-accent)]/30'
                          : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)] border border-transparent'
                      }`}
                    >
                      {t(`openings.departments.${dept.id}`)}
                    </label>
                  </span>
                );
              })}
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
                  className="w-full md:w-auto shrink-0"
                  onClick={() => setActiveJobModal(job)}
                >
                  {t('openings.applyCta')}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {activeJobModal ? (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto bg-[var(--oe-bg)]/80 backdrop-blur-md sm:p-4"
          onClick={() => setActiveJobModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative my-0 sm:my-8 w-full max-w-2xl max-h-[94dvh] overflow-y-auto rounded-t-2xl sm:rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-6 md:p-8 pb-[max(1.25rem,var(--oe-safe-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/15 sm:hidden" />
            <button
              type="button"
              onClick={() => setActiveJobModal(null)}
              className="oe-tap oe-touch absolute top-3 end-3 sm:top-4 sm:end-4 inline-flex items-center justify-center rounded-lg text-[var(--oe-text-muted)] hover:text-[var(--oe-text)]"
              aria-label={ta('close')}
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
                  {t('apply.successTitle')}
                </h4>
                <p className="text-sm text-[var(--oe-text-secondary)]">
                  {t('apply.successDescription', { name: candidateName })}
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                    {t('apply.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('apply.namePlaceholder')}
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                    {t('apply.emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t('apply.emailPlaceholder')}
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                    {t('apply.resumeLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('apply.resumePlaceholder')}
                    value={candidateResume}
                    onChange={(e) => setCandidateResume(e.target.value)}
                    className={FIELD_CLASS}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t('apply.submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
