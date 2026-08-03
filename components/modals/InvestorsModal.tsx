'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { InvestorInquiry } from '@/types';
import { Lock, ShieldCheck, CheckCircle2, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface InvestorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROFILE_OPTIONS = ['vcPe', 'familyOffice', 'institutional', 'businessAngel', 'strategic'] as const;
const TICKET_OPTIONS = ['tier1', 'tier2', 'tier3', 'tier4'] as const;

type ProfileKey = (typeof PROFILE_OPTIONS)[number];
type TicketKey = (typeof TICKET_OPTIONS)[number];

export function InvestorsModal({ isOpen, onClose }: InvestorsModalProps) {
  const t = useTranslations('investorsModal');
  const tA11y = useTranslations('a11y');
  const tCommon = useTranslations('common');
  const [formData, setFormData] = useState<InvestorInquiry>({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    investorType: 'vcPe',
    ticketSize: 'tier2',
    message: '',
    ndaAccepted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ndaAccepted) return;
    const { submitPublicInquiryAction } = await import('@/lib/admin/actions');
    const profileLabel = t(`profileOptions.${formData.investorType as ProfileKey}`);
    const ticketLabel = t(`ticketOptions.${formData.ticketSize as TicketKey}`);
    const result = await submitPublicInquiryAction({
      kind: 'investor',
      full_name: formData.fullName,
      organization: formData.organization,
      email: formData.email,
      phone: formData.phone || undefined,
      interest: `${profileLabel} · ${ticketLabel}`,
      message: formData.message,
    });
    if (!result.ok) {
      alert(result.error ?? tCommon('errors.sendFailed'));
      return;
    }
    setSubmitted(true);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10050] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={tA11y('investorsDialog')}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[94dvh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-amber-500/25 bg-[var(--oe-bg-elevated)] shadow-2xl overflow-hidden pb-[var(--oe-safe-bottom)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/15 sm:hidden shrink-0" />

        <div className="relative shrink-0 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/50 via-[var(--oe-bg-elevated)] to-[var(--oe-bg-elevated)] p-4 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="oe-tap oe-touch absolute top-3 end-3 sm:top-4 sm:end-4 inline-flex items-center justify-center rounded-lg text-[var(--oe-text-muted)] hover:text-[var(--oe-text)] hover:bg-[var(--oe-surface-hover)]"
            aria-label={tA11y('close')}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 pe-10">
            <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
              {t('badge')}
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-heading font-semibold text-[var(--oe-text)] pe-8 text-balance">
            {t('title')}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--oe-text-secondary)] mt-2 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="mx-auto w-10 h-10 text-[var(--oe-success)]" />
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-[var(--oe-text)]">
                {t('success.title')}
              </h3>
              <p className="text-sm text-[var(--oe-text-secondary)] max-w-md mx-auto leading-relaxed">
                {t('success.body', {
                  name: formData.fullName,
                  organization: formData.organization,
                })}
              </p>
              <Button onClick={onClose} className="bg-amber-500 text-slate-950 hover:bg-amber-400">
                {t('success.closeCta')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Field
                  label={t('fields.fullName')}
                  value={formData.fullName}
                  onChange={(v) => setFormData({ ...formData, fullName: v })}
                  required
                  autoComplete="name"
                />
                <Field
                  label={t('fields.organization')}
                  value={formData.organization}
                  onChange={(v) => setFormData({ ...formData, organization: v })}
                  required
                  autoComplete="organization"
                />
                <Field
                  label={t('fields.email')}
                  type="email"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  required
                  autoComplete="email"
                  inputMode="email"
                />
                <Field
                  label={t('fields.phone')}
                  type="tel"
                  value={formData.phone}
                  onChange={(v) => setFormData({ ...formData, phone: v })}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">{t('fields.profile')}</label>
                  <select
                    value={formData.investorType}
                    onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                    className="oe-field"
                  >
                    {PROFILE_OPTIONS.map((key) => (
                      <option key={key} value={key}>
                        {t(`profileOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">{t('fields.ticket')}</label>
                  <select
                    value={formData.ticketSize}
                    onChange={(e) => setFormData({ ...formData, ticketSize: e.target.value })}
                    className="oe-field"
                  >
                    {TICKET_OPTIONS.map((key) => (
                      <option key={key} value={key}>
                        {t(`ticketOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">{t('fields.message')}</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="oe-field min-h-[5.5rem] resize-y"
                />
              </div>

              <label className="oe-tap flex items-start gap-3 p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.ndaAccepted}
                  onChange={(e) => setFormData({ ...formData, ndaAccepted: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-slate-700 bg-[var(--oe-bg)] text-amber-500"
                />
                <span className="text-xs sm:text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  <strong className="text-amber-300">{t('nda.prefix')}</strong> {t('nda.description')}
                </span>
              </label>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-[var(--oe-text-muted)] inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  {t('confidentiality')}
                </span>
                <Button
                  type="submit"
                  disabled={!formData.ndaAccepted}
                  className="w-full sm:w-auto bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {t('submitCta')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">{label}</label>
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="oe-field"
      />
    </div>
  );
}
