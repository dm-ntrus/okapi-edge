'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { SiteContact } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Phone, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

const FIELD_CLASS = 'oe-field';

const INTEREST_OPTIONS = ['edu', 'syntix', 'pos', 'sovereign'] as const;
type InterestId = (typeof INTEREST_OPTIONS)[number];

export function ContactB2bPage({ contact }: { contact: SiteContact }) {
  const t = useTranslations('contact');
  const tc = useTranslations('common');

  const [formData, setFormData] = useState<{
    name: string;
    organization: string;
    email: string;
    phone: string;
    serviceInterest: InterestId;
    message: string;
  }>({
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceInterest: 'edu',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { submitPublicInquiryAction } = await import('@/lib/admin/actions');
    const result = await submitPublicInquiryAction({
      kind: 'contact',
      full_name: formData.name,
      organization: formData.organization,
      email: formData.email,
      phone: formData.phone || undefined,
      interest: t(`form.interestOptions.${formData.serviceInterest}`),
      message: formData.message,
    });
    if (!result.ok) {
      alert(result.error ?? tc('errors.sendFailed'));
      return;
    }
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      serviceInterest: 'edu',
      message: '',
    });
  };

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7 md:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-[var(--oe-success)]" />
                  <h3 className="font-heading text-xl font-semibold text-[var(--oe-text)] mb-2">
                    {t('success.title')}
                  </h3>
                  <p className="mx-auto max-w-md text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                    {t('success.description')}
                  </p>
                  <div className="mt-6">
                    <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={resetForm}>
                      {t('success.resetCta')}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field
                    label={t('form.nameLabel')}
                    required
                    placeholder={t('form.namePlaceholder')}
                    value={formData.name}
                    onChange={(v) => setFormData((s) => ({ ...s, name: v }))}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label={t('form.organizationLabel')}
                      required
                      placeholder={t('form.organizationPlaceholder')}
                      value={formData.organization}
                      onChange={(v) => setFormData((s) => ({ ...s, organization: v }))}
                    />
                    <div>
                      <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                        {t('form.interestLabel')}
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) =>
                          setFormData((s) => ({
                            ...s,
                            serviceInterest: e.target.value as InterestId,
                          }))
                        }
                        className={FIELD_CLASS}
                      >
                        {INTEREST_OPTIONS.map((id) => (
                          <option key={id} value={id}>
                            {t(`form.interestOptions.${id}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label={t('form.emailLabel')}
                      type="email"
                      required
                      placeholder={t('form.emailPlaceholder')}
                      value={formData.email}
                      onChange={(v) => setFormData((s) => ({ ...s, email: v }))}
                    />
                    <Field
                      label={t('form.phoneLabel')}
                      type="tel"
                      placeholder={t('form.phonePlaceholder')}
                      value={formData.phone}
                      onChange={(v) => setFormData((s) => ({ ...s, phone: v }))}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                      {t('form.messageLabel')}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={t('form.messagePlaceholder')}
                      value={formData.message}
                      onChange={(e) => setFormData((s) => ({ ...s, message: e.target.value }))}
                      className={`${FIELD_CLASS} resize-none`}
                    />
                  </div>

                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    {t('form.submitCta')}
                  </Button>

                  <p className="text-[11px] text-[var(--oe-text-muted)] pt-1">
                    {t('form.footnote')}
                  </p>
                </form>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7 md:p-8 space-y-6">
                <h3 className="font-heading text-xl font-semibold text-[var(--oe-text)] tracking-tight">
                  {contact.hqTitle || t('hq.title')}
                </h3>

                <div className="space-y-5 text-sm text-[var(--oe-text-secondary)]">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--oe-accent)]" />
                    <div>
                      <p className="font-medium text-[var(--oe-text)] mb-1">
                        {t('hq.addressLabel')}
                      </p>
                      {contact.addressLine1}
                      <br />
                      {contact.addressLine2}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--oe-accent)]" />
                    <div>
                      <p className="font-medium text-[var(--oe-text)] mb-1">
                        {t('hq.emailLabel')}
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-mono text-[var(--oe-accent)] break-all hover:underline"
                      >
                        {contact.email}
                      </a>
                      {contact.salesEmail && contact.salesEmail !== contact.email ? (
                        <p className="mt-1.5 text-xs text-[var(--oe-text-muted)]">
                          <a
                            href={`mailto:${contact.salesEmail}`}
                            className="font-mono text-[var(--oe-accent)] hover:underline"
                          >
                            {contact.salesEmail}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--oe-accent)]" />
                    <div>
                      <p className="font-medium text-[var(--oe-text)] mb-1">
                        {t('hq.phoneLabel')}
                      </p>
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="font-mono text-[var(--oe-accent)] hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-6">
                <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{t('security.badge')}</span>
                </div>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  {t('security.description')}
                </p>
                {contact.securityEmail ? (
                  <a
                    href={`mailto:${contact.securityEmail}`}
                    className="mt-3 inline-flex font-mono text-xs text-[var(--oe-accent)] hover:underline"
                  >
                    {contact.securityEmail}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={FIELD_CLASS}
      />
    </div>
  );
}
