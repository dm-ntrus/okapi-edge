'use client';

import type { SiteAbout, TeamMember } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Linkedin, ArrowRight } from 'lucide-react';

export function AboutPage({ about, team }: { about: SiteAbout; team: TeamMember[] }) {
  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        description={about.hero.description}
      />

      <Section className="bg-[var(--oe-bg)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-4">
                {about.history.eyebrow}
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--oe-text)] leading-[1.15] mb-5 sm:mb-6">
                {about.history.title}
              </h2>
              <div className="space-y-4 text-[var(--oe-text-secondary)] text-base leading-relaxed font-body">
                <p>{about.history.body1}</p>
                <p>{about.history.body2}</p>
              </div>
            </div>

            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7 md:p-8 space-y-5 sm:space-y-6">
              {about.timeline.map((item) => (
                <div key={`${item.year}-${item.label}`} className="border-l border-[var(--oe-accent)]/40 pl-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)] mb-1">
                    {item.year}
                  </p>
                  <p className="text-sm font-medium text-[var(--oe-text)] leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg-elevated)]">
        <Container>
          <SectionHeading
            eyebrow={about.governance.eyebrow}
            title={about.governance.title}
            description={about.governance.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div
                key={member.id}
                className="flex flex-col justify-between rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-6 transition-colors hover:border-[var(--oe-border-strong)]"
              >
                <div>
                  <div className="mb-5 h-16 w-16 overflow-hidden rounded-xl border border-[var(--oe-border)] bg-[var(--oe-bg)]">
                    {member.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
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
                  <span>{about.governance.hqLabel}</span>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="oe-tap inline-flex h-8 w-8 items-center justify-center rounded-[var(--oe-radius)] border border-[var(--oe-border)] text-[var(--oe-text-muted)] hover:text-[var(--oe-accent)] hover:border-[var(--oe-accent)]/40 transition-colors"
                      aria-label={`LinkedIn — ${member.name}`}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--oe-radius)] border border-[var(--oe-border)] text-[var(--oe-text-muted)]">
                      <Linkedin className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--oe-text)] mb-4">
              {about.ambition.title}
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-[var(--oe-text-secondary)] leading-relaxed mb-6 sm:mb-8">
              {about.ambition.description}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <ButtonLink href="/careers" className="w-full sm:w-auto">
                {about.ambition.cta}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
