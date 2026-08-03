'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Send, Save, ArrowLeft } from 'lucide-react';
import { upsertCampaignAction, sendCampaignAction } from '@/lib/newsletter/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
import { Field } from '@/components/admin/ui/field';
import { Badge } from '@/components/admin/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';

export type CampaignEditorData = {
  id?: string;
  locale: string;
  subject: string;
  preheader?: string | null;
  html_body: string;
  audience: string;
  audience_locale?: string | null;
  audience_tags?: string[];
  status?: string;
  stats?: { recipients?: number; sent?: number; failed?: number };
};

export function CampaignEditor({
  campaign,
  dbOk,
  emailOk,
  activeCount,
}: {
  campaign?: CampaignEditorData | null;
  dbOk: boolean;
  emailOk: boolean;
  activeCount: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [subject, setSubject] = useState(campaign?.subject ?? '');
  const [preheader, setPreheader] = useState(campaign?.preheader ?? '');
  const [htmlBody, setHtmlBody] = useState(
    campaign?.html_body ??
      '<p>Bonjour,</p>\n<p>Voici les actualités Okapi Edge de ce trimestre.</p>\n<p>L’équipe Okapi Edge</p>',
  );
  const [locale, setLocale] = useState(campaign?.locale ?? 'fr');
  const [audience, setAudience] = useState(campaign?.audience ?? 'all_active');
  const [audienceLocale, setAudienceLocale] = useState(campaign?.audience_locale ?? 'fr');
  const [audienceTags, setAudienceTags] = useState((campaign?.audience_tags ?? []).join(', '));
  const [message, setMessage] = useState<string | null>(null);

  const isSent = campaign?.status === 'sent' || campaign?.status === 'sending';

  const previewHtml = useMemo(() => htmlBody, [htmlBody]);

  function save() {
    const fd = new FormData();
    if (campaign?.id) fd.set('id', campaign.id);
    fd.set('subject', subject);
    fd.set('preheader', preheader);
    fd.set('html_body', htmlBody);
    fd.set('locale', locale);
    fd.set('audience', audience);
    fd.set('audience_locale', audienceLocale);
    fd.set('audience_tags', audienceTags);

    startTransition(async () => {
      try {
        const res = await upsertCampaignAction(fd);
        setMessage('Brouillon enregistré.');
        if (!campaign?.id && res.id) {
          router.replace(`/admin/newsletter/campaigns/${encodeURIComponent(res.id)}`);
        } else {
          router.refresh();
        }
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Erreur sauvegarde');
      }
    });
  }

  function send() {
    if (!campaign?.id) {
      setMessage('Enregistrez d’abord la campagne.');
      return;
    }
    if (!confirm(`Envoyer à jusqu’à ${activeCount} abonnés actifs (selon audience) ?`)) return;
    startTransition(async () => {
      const res = await sendCampaignAction(campaign.id!);
      if (!res.ok) {
        setMessage(res.error ?? 'Échec envoi');
        return;
      }
      setMessage(`Envoyé : ${res.sent} ok, ${res.failed} échecs.`);
      router.refresh();
    });
  }

  return (
    <div>
      <AdminPageHeader
        title={campaign?.id ? 'Éditer la campagne' : 'Nouvelle campagne'}
        description="Rédigez le sujet, le corps HTML et choisissez l’audience avant l’envoi Resend."
        dbOk={dbOk}
        actions={
          <Button asChild variant="outline">
            <Link href="/admin/newsletter/campaigns">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
          </Button>
        }
      />

      {campaign?.status ? (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <Badge variant={campaign.status === 'sent' ? 'success' : 'secondary'}>
            {campaign.status}
          </Badge>
          {campaign.stats ? (
            <span className="text-xs text-[var(--oe-text-muted)]">
              {campaign.stats.sent}/{campaign.stats.recipients} envoyés
              {campaign.stats.failed ? ` · ${campaign.stats.failed} échecs` : ''}
            </span>
          ) : null}
          {!emailOk ? (
            <Badge variant="warning">Resend offline — envoi bloqué</Badge>
          ) : null}
        </div>
      ) : null}

      {message ? <p className="mb-4 text-sm text-[var(--oe-accent)]">{message}</p> : null}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Sujet" htmlFor="subject">
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSent}
              placeholder="Analyses Q3 — Edge & conformité"
            />
          </Field>
          <Field label="Preheader" htmlFor="preheader" hint="Texte d’aperçu dans la boîte mail.">
            <Input
              id="preheader"
              value={preheader}
              onChange={(e) => setPreheader(e.target.value)}
              disabled={isSent}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Langue contenu" htmlFor="locale">
              <select
                id="locale"
                value={locale}
                disabled={isSent}
                onChange={(e) => setLocale(e.target.value)}
                className="oe-admin-input"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
            </Field>
            <Field label="Audience" htmlFor="audience">
              <select
                id="audience"
                value={audience}
                disabled={isSent}
                onChange={(e) => setAudience(e.target.value)}
                className="oe-admin-input"
              >
                <option value="all_active">Tous les actifs</option>
                <option value="locale">Par langue</option>
                <option value="tags">Par tags</option>
              </select>
            </Field>
          </div>
          {audience === 'locale' ? (
            <Field label="Langue audience" htmlFor="audience_locale">
              <select
                id="audience_locale"
                value={audienceLocale}
                disabled={isSent}
                onChange={(e) => setAudienceLocale(e.target.value)}
                className="oe-admin-input"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
            </Field>
          ) : null}
          {audience === 'tags' ? (
            <Field label="Tags audience (virgules)" htmlFor="audience_tags">
              <Input
                id="audience_tags"
                value={audienceTags}
                disabled={isSent}
                onChange={(e) => setAudienceTags(e.target.value)}
                placeholder="investors, b2b"
              />
            </Field>
          ) : null}
          <Field label="Corps HTML" htmlFor="html_body">
            <Textarea
              id="html_body"
              value={htmlBody}
              disabled={isSent}
              onChange={(e) => setHtmlBody(e.target.value)}
              className="min-h-[280px] font-mono text-xs"
            />
          </Field>

          {!isSent ? (
            <div className="flex flex-wrap gap-2">
              <Button onClick={save} disabled={pending || !dbOk}>
                <Save className="h-4 w-4" />
                Enregistrer
              </Button>
              <Button
                onClick={send}
                disabled={pending || !dbOk || !campaign?.id || !emailOk}
                variant="default"
              >
                <Send className="h-4 w-4" />
                Envoyer maintenant
              </Button>
            </div>
          ) : null}
        </div>

        <Card className="h-fit xl:sticky xl:top-6">
          <CardHeader>
            <CardTitle className="text-base">Aperçu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-[var(--oe-border)] bg-[var(--oe-bg)] p-4">
              <p className="text-xs text-[var(--oe-text-muted)] mb-1">{preheader || '—'}</p>
              <p className="font-semibold text-[var(--oe-text)] mb-4">{subject || '(Sans sujet)'}</p>
              <div
                className="prose prose-invert prose-sm max-w-none text-[var(--oe-text-secondary)]"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
