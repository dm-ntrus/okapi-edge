'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upsertAboutSettingAction } from '@/lib/admin/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
import { Field } from '@/components/admin/ui/field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';

export type AboutSettingValues = {
  heroEyebrowFr: string;
  heroEyebrowEn: string;
  heroTitleFr: string;
  heroTitleEn: string;
  heroDescriptionFr: string;
  heroDescriptionEn: string;
  historyEyebrowFr: string;
  historyEyebrowEn: string;
  historyTitleFr: string;
  historyTitleEn: string;
  historyBody1Fr: string;
  historyBody1En: string;
  historyBody2Fr: string;
  historyBody2En: string;
  timeline: { year: string; fr: string; en: string }[];
  governanceEyebrowFr: string;
  governanceEyebrowEn: string;
  governanceTitleFr: string;
  governanceTitleEn: string;
  governanceDescriptionFr: string;
  governanceDescriptionEn: string;
  governanceHqLabelFr: string;
  governanceHqLabelEn: string;
  ambitionTitleFr: string;
  ambitionTitleEn: string;
  ambitionDescriptionFr: string;
  ambitionDescriptionEn: string;
  ambitionCtaFr: string;
  ambitionCtaEn: string;
};

export function AboutSettingsForm({
  values,
  dbOk,
}: {
  values: AboutSettingValues;
  dbOk: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <AdminPageHeader
        title="Page À propos"
        description="Hero, histoire fondatrice, timeline, titres de gouvernance et bloc ambition — bilingue FR/EN."
        dbOk={dbOk}
      />

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!dbOk) return;
          const formData = new FormData(e.currentTarget);
          startTransition(async () => {
            await upsertAboutSettingAction(formData);
            router.refresh();
          });
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Hero</CardTitle>
            <CardDescription>Histoire, Équipe & ADN Global</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Eyebrow FR">
              <Input name="hero_eyebrow_fr" defaultValue={values.heroEyebrowFr} />
            </Field>
            <Field label="Eyebrow EN">
              <Input name="hero_eyebrow_en" defaultValue={values.heroEyebrowEn} />
            </Field>
            <Field label="Titre FR">
              <Input name="hero_title_fr" defaultValue={values.heroTitleFr} />
            </Field>
            <Field label="Titre EN">
              <Input name="hero_title_en" defaultValue={values.heroTitleEn} />
            </Field>
            <Field label="Description FR">
              <Textarea name="hero_description_fr" rows={3} defaultValue={values.heroDescriptionFr} />
            </Field>
            <Field label="Description EN">
              <Textarea name="hero_description_en" rows={3} defaultValue={values.heroDescriptionEn} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histoire fondatrice</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Eyebrow FR">
              <Input name="history_eyebrow_fr" defaultValue={values.historyEyebrowFr} />
            </Field>
            <Field label="Eyebrow EN">
              <Input name="history_eyebrow_en" defaultValue={values.historyEyebrowEn} />
            </Field>
            <Field label="Titre FR">
              <Input name="history_title_fr" defaultValue={values.historyTitleFr} />
            </Field>
            <Field label="Titre EN">
              <Input name="history_title_en" defaultValue={values.historyTitleEn} />
            </Field>
            <Field label="Paragraphe 1 FR">
              <Textarea name="history_body1_fr" rows={4} defaultValue={values.historyBody1Fr} />
            </Field>
            <Field label="Paragraphe 1 EN">
              <Textarea name="history_body1_en" rows={4} defaultValue={values.historyBody1En} />
            </Field>
            <Field label="Paragraphe 2 FR">
              <Textarea name="history_body2_fr" rows={4} defaultValue={values.historyBody2Fr} />
            </Field>
            <Field label="Paragraphe 2 EN">
              <Textarea name="history_body2_en" rows={4} defaultValue={values.historyBody2En} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Jusqu’à 6 jalons (année + libellé FR/EN).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => {
              const item = values.timeline[i] ?? { year: '', fr: '', en: '' };
              return (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-[7rem_1fr_1fr] gap-3">
                  <Field label={`Année ${i + 1}`}>
                    <Input name={`timeline_year_${i}`} defaultValue={item.year} placeholder="2024" />
                  </Field>
                  <Field label="Libellé FR">
                    <Input name={`timeline_fr_${i}`} defaultValue={item.fr} />
                  </Field>
                  <Field label="Libellé EN">
                    <Input name={`timeline_en_${i}`} defaultValue={item.en} />
                  </Field>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gouvernance (titres section équipe)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Eyebrow FR">
              <Input name="governance_eyebrow_fr" defaultValue={values.governanceEyebrowFr} />
            </Field>
            <Field label="Eyebrow EN">
              <Input name="governance_eyebrow_en" defaultValue={values.governanceEyebrowEn} />
            </Field>
            <Field label="Titre FR">
              <Input name="governance_title_fr" defaultValue={values.governanceTitleFr} />
            </Field>
            <Field label="Titre EN">
              <Input name="governance_title_en" defaultValue={values.governanceTitleEn} />
            </Field>
            <Field label="Description FR">
              <Textarea
                name="governance_description_fr"
                rows={2}
                defaultValue={values.governanceDescriptionFr}
              />
            </Field>
            <Field label="Description EN">
              <Textarea
                name="governance_description_en"
                rows={2}
                defaultValue={values.governanceDescriptionEn}
              />
            </Field>
            <Field label="Label HQ FR">
              <Input name="governance_hq_label_fr" defaultValue={values.governanceHqLabelFr} />
            </Field>
            <Field label="Label HQ EN">
              <Input name="governance_hq_label_en" defaultValue={values.governanceHqLabelEn} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bloc ambition</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Titre FR">
              <Input name="ambition_title_fr" defaultValue={values.ambitionTitleFr} />
            </Field>
            <Field label="Titre EN">
              <Input name="ambition_title_en" defaultValue={values.ambitionTitleEn} />
            </Field>
            <Field label="Description FR">
              <Textarea
                name="ambition_description_fr"
                rows={3}
                defaultValue={values.ambitionDescriptionFr}
              />
            </Field>
            <Field label="Description EN">
              <Textarea
                name="ambition_description_en"
                rows={3}
                defaultValue={values.ambitionDescriptionEn}
              />
            </Field>
            <Field label="CTA FR">
              <Input name="ambition_cta_fr" defaultValue={values.ambitionCtaFr} />
            </Field>
            <Field label="CTA EN">
              <Input name="ambition_cta_en" defaultValue={values.ambitionCtaEn} />
            </Field>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={!dbOk || pending}>
            {pending ? 'Enregistrement…' : 'Enregistrer la page À propos'}
          </Button>
        </div>
      </form>
    </div>
  );
}
