'use client';

import React, { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Phone, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

const FIELD_CLASS =
  'w-full rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg)] px-3.5 py-2.5 text-sm text-[var(--oe-text)] placeholder:text-[var(--oe-text-muted)] focus:border-[var(--oe-accent)]/50 focus:outline-none';

export const ContactB2bPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceInterest: 'Okapi Edu (Scolaire)',
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
      interest: formData.serviceInterest,
      message: formData.message,
    });
    if (!result.ok) {
      alert(result.error ?? 'Envoi impossible');
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
      serviceInterest: 'Okapi Edu (Scolaire)',
      message: '',
    });
  };

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow="Canal Partenariats & B2B"
        title="Initier un Partenariat d'Infrastructure"
        description="Échangez directement avec les stratèges d'Okapi Edge pour déployer nos plateformes applicatives dans votre institution."
      />

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-6 md:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-[var(--oe-success)]" />
                  <h3 className="font-heading text-xl font-semibold text-[var(--oe-text)] mb-2">
                    Signal reçu par le Quartier Général.
                  </h3>
                  <p className="mx-auto max-w-md text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                    Votre message est important. Un stratège vous répond dans les 48h. Ce n&apos;est
                    pas une réponse automatique, c&apos;est le début d&apos;une conversation.
                  </p>
                  <div className="mt-6">
                    <Button type="button" variant="secondary" onClick={resetForm}>
                      Envoyer une autre demande
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field
                    label="Nom complet *"
                    required
                    placeholder="Nom & Prénom"
                    value={formData.name}
                    onChange={(v) => setFormData((s) => ({ ...s, name: v }))}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Organisation / Institution *"
                      required
                      placeholder="Ministère, Université, Pharmacie..."
                      value={formData.organization}
                      onChange={(v) => setFormData((s) => ({ ...s, organization: v }))}
                    />
                    <div>
                      <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                        Domaine d&apos;Intérêt
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) =>
                          setFormData((s) => ({ ...s, serviceInterest: e.target.value }))
                        }
                        className={FIELD_CLASS}
                      >
                        <option value="Okapi Edu (Scolaire)">Okapi Edu (Scolaire & Univ)</option>
                        <option value="Syntix Pharma (Pharmacie & e-DGI)">
                          Syntix Pharma (Pharmacie & e-DGI)
                        </option>
                        <option value="Okapi POS (Commerce & Caisse)">
                          Okapi POS (Commerce & Caisse)
                        </option>
                        <option value="Cloud Souverain & Sur-mesure">
                          Cloud Souverain & Sur-mesure
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Email professionnel *"
                      type="email"
                      required
                      placeholder="nom@institution.cd"
                      value={formData.email}
                      onChange={(v) => setFormData((s) => ({ ...s, email: v }))}
                    />
                    <Field
                      label="Téléphone / WhatsApp"
                      type="tel"
                      placeholder="+243..."
                      value={formData.phone}
                      onChange={(v) => setFormData((s) => ({ ...s, phone: v }))}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[var(--oe-text-secondary)]">
                      Message ou projet *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Précisez la taille de votre réseau ou vos objectifs d'intégration..."
                      value={formData.message}
                      onChange={(e) => setFormData((s) => ({ ...s, message: e.target.value }))}
                      className={`${FIELD_CLASS} resize-none`}
                    />
                  </div>

                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    Entrer en Contact
                  </Button>

                  <p className="text-[11px] text-[var(--oe-text-muted)] pt-1">
                    Communications confidentielles. Données scellées à Kinshasa.
                  </p>
                </form>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-7 md:p-8 space-y-6">
                <h3 className="font-heading text-xl font-semibold text-[var(--oe-text)] tracking-tight">
                  Quartier Général Kinshasa
                </h3>

                <div className="space-y-5 text-sm text-[var(--oe-text-secondary)]">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--oe-accent)]" />
                    <div>
                      <p className="font-medium text-[var(--oe-text)] mb-1">Adresse Physique</p>
                      Boulevard du 30 Juin, Immeuble Okapi, 4ème étage
                      <br />
                      Commune de la Gombe, Kinshasa, RDC
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--oe-accent)]" />
                    <div>
                      <p className="font-medium text-[var(--oe-text)] mb-1">Email Général</p>
                      <span className="font-mono text-[var(--oe-accent)]">
                        contact@okapi-group.cd
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--oe-accent)]" />
                    <div>
                      <p className="font-medium text-[var(--oe-text)] mb-1">Ligne Directe B2B</p>
                      <span className="font-mono text-[var(--oe-accent)]">+243 81 900 0000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-6">
                <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-accent)]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Standard de Sécurité ISO & e-DGI</span>
                </div>
                <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">
                  Tous les échanges d&apos;information entre votre institution et Okapi Edge sont
                  régis par nos protocoles de confidentialité stricte.
                </p>
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
