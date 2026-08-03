'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upsertContactSettingAction } from '@/lib/admin/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Field } from '@/components/admin/ui/field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';

export type ContactSettingValues = {
  email: string;
  phone: string;
  salesEmail: string;
  pressEmail: string;
  securityEmail: string;
  locationShortFr: string;
  locationShortEn: string;
  hqTitleFr: string;
  hqTitleEn: string;
  addressLine1Fr: string;
  addressLine1En: string;
  addressLine2Fr: string;
  addressLine2En: string;
};

export function ContactSettingsForm({
  values,
  dbOk,
}: {
  values: ContactSettingValues;
  dbOk: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <AdminPageHeader
        title="Adresses & contacts"
        description="Coordonnées dynamiques affichées dans le footer, la page Contact B2B et les emails publics."
        dbOk={dbOk}
      />

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!dbOk) return;
          const formData = new FormData(e.currentTarget);
          startTransition(async () => {
            await upsertContactSettingAction(formData);
            router.refresh();
          });
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Coordonnées globales</CardTitle>
            <CardDescription>Email principal, téléphone et canaux spécialisés.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email principal">
              <Input name="email" type="email" required defaultValue={values.email} />
            </Field>
            <Field label="Téléphone B2B">
              <Input name="phone" required defaultValue={values.phone} />
            </Field>
            <Field label="Email partenariats">
              <Input name="sales_email" type="email" defaultValue={values.salesEmail} />
            </Field>
            <Field label="Email presse">
              <Input name="press_email" type="email" defaultValue={values.pressEmail} />
            </Field>
            <Field label="Email sécurité">
              <Input name="security_email" type="email" defaultValue={values.securityEmail} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Localisation courte (footer)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="FR">
              <Input name="location_short_fr" defaultValue={values.locationShortFr} />
            </Field>
            <Field label="EN">
              <Input name="location_short_en" defaultValue={values.locationShortEn} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quartier général (page Contact)</CardTitle>
            <CardDescription>Titre et adresse physique, bilingues.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Titre HQ (FR)">
                <Input name="hq_title_fr" defaultValue={values.hqTitleFr} />
              </Field>
              <Field label="Titre HQ (EN)">
                <Input name="hq_title_en" defaultValue={values.hqTitleEn} />
              </Field>
              <Field label="Adresse ligne 1 (FR)">
                <Input name="address_line1_fr" defaultValue={values.addressLine1Fr} />
              </Field>
              <Field label="Adresse ligne 1 (EN)">
                <Input name="address_line1_en" defaultValue={values.addressLine1En} />
              </Field>
              <Field label="Adresse ligne 2 (FR)">
                <Input name="address_line2_fr" defaultValue={values.addressLine2Fr} />
              </Field>
              <Field label="Adresse ligne 2 (EN)">
                <Input name="address_line2_en" defaultValue={values.addressLine2En} />
              </Field>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={!dbOk || pending}>
            {pending ? 'Enregistrement…' : 'Enregistrer les contacts'}
          </Button>
        </div>
      </form>
    </div>
  );
}
