'use client';

import Link from 'next/link';
import { Mail, Users, UserCheck, UserX, Send, ArrowRight } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { Button } from '@/components/admin/ui/button';
import { Badge } from '@/components/admin/ui/badge';

export function NewsletterDashboard({
  stats,
  emailOk,
  dbOk,
  recentCampaigns,
}: {
  stats: {
    active: number;
    pending: number;
    unsubscribed: number;
    campaigns: number;
    sentCampaigns: number;
  };
  emailOk: boolean;
  dbOk: boolean;
  recentCampaigns: {
    id: string;
    subject: string;
    status: string;
    sent_at?: string | null;
    stats?: { recipients?: number; sent?: number; failed?: number };
  }[];
}) {
  return (
    <div>
      <AdminPageHeader
        title="Newsletter"
        description="CRM abonnés, création de campagnes et envoi via Resend. Double opt-in et désabonnement intégrés."
        dbOk={dbOk}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/newsletter/subscribers">Abonnés</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/newsletter/campaigns/new">
                Nouvelle campagne
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        }
      />

      {!emailOk ? (
        <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
          <CardContent className="py-4 text-sm text-amber-200">
            <strong>Envoi désactivé.</strong> Ajoutez <code className="text-amber-100">RESEND_API_KEY</code> et{' '}
            <code className="text-amber-100">NEWSLETTER_FROM</code> dans <code>.env.local</code> pour activer
            l’envoi réel. Les abonnements fonctionnent déjà (activation auto en mode offline).
          </CardContent>
        </Card>
      ) : (
        <div className="mb-6">
          <Badge variant="success" className="gap-1.5">
            <Mail className="h-3 w-3" />
            Resend connecté
          </Badge>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <StatCard icon={UserCheck} label="Actifs" value={stats.active} />
        <StatCard icon={Users} label="En attente" value={stats.pending} />
        <StatCard icon={UserX} label="Désabonnés" value={stats.unsubscribed} />
        <StatCard icon={Send} label="Campagnes envoyées" value={stats.sentCampaigns} />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Campagnes récentes</CardTitle>
            <CardDescription>Dernières newsletters créées ou envoyées.</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/newsletter/campaigns">Tout voir</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentCampaigns.length === 0 ? (
            <p className="text-sm text-[var(--oe-text-muted)] py-6 text-center">Aucune campagne pour le moment.</p>
          ) : (
            recentCampaigns.map((c) => (
              <Link
                key={c.id}
                href={`/admin/newsletter/campaigns/${encodeURIComponent(c.id)}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-[var(--oe-border)] px-4 py-3 hover:border-[var(--oe-accent)]/40 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-medium text-[var(--oe-text)] truncate">{c.subject}</div>
                  <div className="text-xs text-[var(--oe-text-muted)] mt-0.5">
                    {c.stats?.sent != null
                      ? `${c.stats.sent}/${c.stats.recipients ?? 0} envoyés`
                      : c.status}
                  </div>
                </div>
                <Badge
                  variant={
                    c.status === 'sent' ? 'success' : c.status === 'draft' ? 'secondary' : 'warning'
                  }
                >
                  {c.status}
                </Badge>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription>{label}</CardDescription>
          <Icon className="h-4 w-4 text-[var(--oe-text-muted)]" />
        </div>
        <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
