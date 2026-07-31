'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Mail,
  Building2,
  Phone,
  MessageSquare,
  ExternalLink,
  Users,
  Handshake,
  Briefcase,
} from 'lucide-react';
import { updateInquiryStatusAction, deleteInquiryAction } from '@/lib/admin/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Badge } from '@/components/admin/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { Separator } from '@/components/admin/ui/separator';
import { cn } from '@/lib/utils';

export type AdminInquiry = {
  id: string;
  kind: string;
  locale?: string | null;
  full_name: string;
  email: string;
  organization?: string | null;
  phone?: string | null;
  interest?: string | null;
  message?: string | null;
  status: string;
  created_at?: string;
};

export type InquiryChannel = 'all' | 'contact' | 'b2b' | 'investor' | 'career';

const STATUS_LABEL: Record<string, string> = {
  new: 'Nouveau',
  in_progress: 'En cours',
  closed: 'Traité',
};

const CHANNELS: {
  id: InquiryChannel;
  label: string;
  description: string;
  icon: typeof Mail;
  kinds: string[];
}[] = [
  {
    id: 'contact',
    label: 'Contact',
    description: 'Messages du formulaire Contact — voir et répondre.',
    icon: MessageSquare,
    kinds: ['contact'],
  },
  {
    id: 'b2b',
    label: 'Partenariats & B2B',
    description: 'Demandes canal partenariats et formulaires B2B.',
    icon: Handshake,
    kinds: ['b2b'],
  },
  {
    id: 'investor',
    label: 'Investisseurs',
    description: 'Demandes d’accès Espace investisseurs.',
    icon: Users,
    kinds: ['investor'],
  },
  {
    id: 'career',
    label: 'Candidatures',
    description: 'Candidatures reçues via Carrières.',
    icon: Briefcase,
    kinds: ['career'],
  },
  {
    id: 'all',
    label: 'Tout',
    description: 'Toutes les demandes entrantes (hors newsletter — module dédié).',
    icon: Mail,
    kinds: ['contact', 'b2b', 'investor', 'career'],
  },
];

const KIND_LABEL: Record<string, string> = {
  contact: 'Contact',
  b2b: 'Partenariat B2B',
  investor: 'Investisseur',
  newsletter: 'Newsletter',
  career: 'Candidature',
};

export function InquiriesCrud({
  inquiries,
  dbOk,
  initialChannel = 'all',
}: {
  inquiries: AdminInquiry[];
  dbOk: boolean;
  initialChannel?: InquiryChannel;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [channel, setChannel] = useState<InquiryChannel>(initialChannel);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const active = CHANNELS.find((c) => c.id === channel) ?? CHANNELS[CHANNELS.length - 1];

  const channelHref: Record<InquiryChannel, string> = {
    all: '/admin/inquiries',
    contact: '/admin/inquiries/contact',
    b2b: '/admin/inquiries/b2b',
    investor: '/admin/inquiries/investors',
    career: '/admin/inquiries',
  };

  function selectChannel(next: InquiryChannel) {
    setChannel(next);
    setSelectedId(null);
    router.push(channelHref[next]);
  }

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of CHANNELS) {
      map[c.id] = inquiries.filter((i) => c.kinds.includes(i.kind)).length;
    }
    return map;
  }, [inquiries]);

  const filtered = useMemo(
    () => inquiries.filter((i) => active.kinds.includes(i.kind)),
    [inquiries, active],
  );

  const selected = filtered.find((i) => i.id === selectedId) ?? filtered[0] ?? null;

  function setStatus(id: string, status: 'new' | 'in_progress' | 'closed') {
    startTransition(async () => {
      await updateInquiryStatusAction(id, status);
      router.refresh();
    });
  }

  function remove(id: string) {
    if (!confirm('Supprimer cette demande ?')) return;
    startTransition(async () => {
      await deleteInquiryAction(id);
      setSelectedId(null);
      router.refresh();
    });
  }

  function replyMailto(item: AdminInquiry) {
    const subject = encodeURIComponent(
      `Re: ${KIND_LABEL[item.kind] ?? item.kind} — Okapi Edge`,
    );
    const body = encodeURIComponent(
      `Bonjour ${item.full_name},\n\nMerci pour votre message.\n\nCordialement,\nÉquipe Okapi Edge\n`,
    );
    window.open(`mailto:${item.email}?subject=${subject}&body=${body}`, '_blank');
    if (item.status === 'new') setStatus(item.id, 'in_progress');
  }

  return (
    <div>
      <AdminPageHeader
        title={active.label}
        description={active.description}
        dbOk={dbOk}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          const isActive = channel === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => selectChannel(c.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'border-[var(--oe-accent)]/40 bg-[var(--oe-accent-soft)] text-[var(--oe-accent)]'
                  : 'border-[var(--oe-border)] bg-[var(--oe-surface)] text-[var(--oe-text-secondary)] hover:text-[var(--oe-text)] hover:border-[var(--oe-border-strong)]',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {c.label}
              <Badge variant={isActive ? 'default' : 'secondary'} className="ml-0.5">
                {counts[c.id] ?? 0}
              </Badge>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-[var(--oe-text-muted)]">
            Aucune demande dans « {active.label} » pour le moment.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] gap-4">
          <div className="space-y-3">
            {filtered.map((item) => {
              const isSel = selected?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    'w-full text-left rounded-xl border p-4 transition-colors',
                    isSel
                      ? 'border-[var(--oe-accent)]/40 bg-[var(--oe-accent-soft)]'
                      : 'border-[var(--oe-border)] bg-[var(--oe-surface)] hover:border-[var(--oe-border-strong)]',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium text-[var(--oe-text)] truncate">{item.full_name}</div>
                      <div className="mt-1 text-xs text-[var(--oe-text-muted)] truncate">{item.email}</div>
                    </div>
                    <Badge
                      variant={
                        item.status === 'new'
                          ? 'warning'
                          : item.status === 'closed'
                            ? 'secondary'
                            : 'success'
                      }
                    >
                      {STATUS_LABEL[item.status] ?? item.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{KIND_LABEL[item.kind] ?? item.kind}</Badge>
                    {item.organization ? (
                      <span className="text-xs text-[var(--oe-text-muted)] truncate">{item.organization}</span>
                    ) : null}
                  </div>
                  {item.message ? (
                    <p className="mt-2 text-sm text-[var(--oe-text-secondary)] line-clamp-2">{item.message}</p>
                  ) : null}
                </button>
              );
            })}
          </div>

          {selected ? (
            <Card className="h-fit xl:sticky xl:top-6">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{selected.full_name}</CardTitle>
                    <p className="mt-1 text-sm text-[var(--oe-text-secondary)]">{KIND_LABEL[selected.kind]}</p>
                  </div>
                  <Badge
                    variant={
                      selected.status === 'new'
                        ? 'warning'
                        : selected.status === 'closed'
                          ? 'secondary'
                          : 'success'
                    }
                  >
                    {STATUS_LABEL[selected.status] ?? selected.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <Detail icon={Mail} label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                  {selected.organization ? (
                    <Detail icon={Building2} label="Organisation" value={selected.organization} />
                  ) : null}
                  {selected.phone ? (
                    <Detail icon={Phone} label="Téléphone" value={selected.phone} href={`tel:${selected.phone}`} />
                  ) : null}
                  {selected.interest ? (
                    <Detail icon={ExternalLink} label="Intérêt" value={selected.interest} />
                  ) : null}
                  {selected.locale ? (
                    <Detail icon={MessageSquare} label="Langue" value={String(selected.locale).toUpperCase()} />
                  ) : null}
                  {selected.created_at ? (
                    <p className="text-xs text-[var(--oe-text-muted)] pt-1">
                      Reçu le {new Date(selected.created_at).toLocaleString('fr-FR')}
                    </p>
                  ) : null}
                </div>

                {selected.message ? (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--oe-text-muted)] mb-2">Message</p>
                      <p className="text-sm text-[var(--oe-text)] whitespace-pre-wrap leading-relaxed">
                        {selected.message}
                      </p>
                    </div>
                  </>
                ) : null}

                <Separator />

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-[var(--oe-text-muted)]">Actions</p>
                  <Button className="w-full" onClick={() => replyMailto(selected)} disabled={pending}>
                    <Mail className="h-4 w-4" />
                    Répondre par e-mail
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      variant={selected.status === 'new' ? 'default' : 'outline'}
                      disabled={pending || selected.status === 'new'}
                      onClick={() => setStatus(selected.id, 'new')}
                    >
                      Nouveau
                    </Button>
                    <Button
                      size="sm"
                      variant={selected.status === 'in_progress' ? 'default' : 'outline'}
                      disabled={pending || selected.status === 'in_progress'}
                      onClick={() => setStatus(selected.id, 'in_progress')}
                    >
                      En cours
                    </Button>
                    <Button
                      size="sm"
                      variant={selected.status === 'closed' ? 'default' : 'outline'}
                      disabled={pending || selected.status === 'closed'}
                      onClick={() => setStatus(selected.id, 'closed')}
                    >
                      Traité
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full"
                    disabled={pending}
                    onClick={() => remove(selected.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 text-[var(--oe-text-muted)] shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-[var(--oe-text-muted)]">{label}</p>
        {href ? (
          <a href={href} className="text-[var(--oe-accent)] hover:underline break-all">
            {value}
          </a>
        ) : (
          <p className="text-[var(--oe-text)] break-words">{value}</p>
        )}
      </div>
    </div>
  );
}
