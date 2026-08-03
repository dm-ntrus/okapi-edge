'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upsertLegalSettingAction } from '@/lib/admin/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
import { Field } from '@/components/admin/ui/field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';

export type LegalSettingValues = {
  legalName: string;
  entityType: string;
  entityLabelFr: string;
  entityLabelEn: string;
  registration: string;
  badgeFr: string;
  badgeEn: string;
  titleFr: string;
  titleEn: string;
  updatedAtFr: string;
  updatedAtEn: string;
  publisherTitleFr: string;
  publisherTitleEn: string;
  publisherBodyFr: string;
  publisherBodyEn: string;
  publisherFooterFr: string;
  publisherFooterEn: string;
  hostingTitleFr: string;
  hostingTitleEn: string;
  hostingBodyFr: string;
  hostingBodyEn: string;
  dataTitleFr: string;
  dataTitleEn: string;
  dataBodyFr: string;
  dataBodyEn: string;
  ipTitleFr: string;
  ipTitleEn: string;
  ipBodyFr: string;
  ipBodyEn: string;
};

export function LegalSettingsForm({
  values,
  dbOk,
}: {
  values: LegalSettingValues;
  dbOk: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <AdminPageHeader
        title="Mentions légales"
        description="Cadre légal & conformité affiché sur /legal. L’entité est un établissement (pas une Inc.)."
        dbOk={dbOk}
      />

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!dbOk) return;
          const formData = new FormData(e.currentTarget);
          startTransition(async () => {
            await upsertLegalSettingAction(formData);
            router.refresh();
          });
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Identité juridique</CardTitle>
            <CardDescription>Statut d’établissement et immatriculation.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field label="Raison sociale">
              <Input name="legal_name" required defaultValue={values.legalName} />
            </Field>
            <Field label="Type d’entité (clé)">
              <Input name="entity_type" required defaultValue={values.entityType} placeholder="etablissement" />
            </Field>
            <Field label="Libellé FR">
              <Input name="entity_label_fr" defaultValue={values.entityLabelFr} placeholder="établissement" />
            </Field>
            <Field label="Libellé EN">
              <Input name="entity_label_en" defaultValue={values.entityLabelEn} placeholder="establishment" />
            </Field>
            <Field label="N° RCCM / immatriculation">
              <Input name="registration" required defaultValue={values.registration} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>En-tête de page</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Badge FR">
              <Input name="badge_fr" defaultValue={values.badgeFr} />
            </Field>
            <Field label="Badge EN">
              <Input name="badge_en" defaultValue={values.badgeEn} />
            </Field>
            <Field label="Titre FR">
              <Input name="title_fr" defaultValue={values.titleFr} />
            </Field>
            <Field label="Titre EN">
              <Input name="title_en" defaultValue={values.titleEn} />
            </Field>
            <Field label="Date de mise à jour FR">
              <Input name="updated_at_fr" defaultValue={values.updatedAtFr} />
            </Field>
            <Field label="Date de mise à jour EN">
              <Input name="updated_at_en" defaultValue={values.updatedAtEn} />
            </Field>
          </CardContent>
        </Card>

        {(
          [
            ['publisher', 'Éditeur', values.publisherTitleFr, values.publisherTitleEn, values.publisherBodyFr, values.publisherBodyEn, values.publisherFooterFr, values.publisherFooterEn],
            ['hosting', 'Hébergement', values.hostingTitleFr, values.hostingTitleEn, values.hostingBodyFr, values.hostingBodyEn, '', ''],
            ['data', 'Données', values.dataTitleFr, values.dataTitleEn, values.dataBodyFr, values.dataBodyEn, '', ''],
            ['ip', 'PI', values.ipTitleFr, values.ipTitleEn, values.ipBodyFr, values.ipBodyEn, '', ''],
          ] as const
        ).map(([id, label, titleFr, titleEn, bodyFr, bodyEn, footerFr, footerEn]) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle>Section — {label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={`Titre FR`}>
                  <Input name={`${id}_title_fr`} defaultValue={titleFr} />
                </Field>
                <Field label={`Titre EN`}>
                  <Input name={`${id}_title_en`} defaultValue={titleEn} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Corps FR">
                  <Textarea name={`${id}_body_fr`} rows={4} defaultValue={bodyFr} />
                </Field>
                <Field label="Corps EN">
                  <Textarea name={`${id}_body_en`} rows={4} defaultValue={bodyEn} />
                </Field>
              </div>
              {id === 'publisher' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Pied FR (siège / directeur)">
                    <Textarea name={`${id}_footer_fr`} rows={3} defaultValue={footerFr} />
                  </Field>
                  <Field label="Pied EN">
                    <Textarea name={`${id}_footer_en`} rows={3} defaultValue={footerEn} />
                  </Field>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end">
          <Button type="submit" disabled={!dbOk || pending}>
            {pending ? 'Enregistrement…' : 'Enregistrer les mentions légales'}
          </Button>
        </div>
      </form>
    </div>
  );
}
