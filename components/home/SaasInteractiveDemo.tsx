'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { formatNumber } from '@/lib/i18n/format';
import {
  GraduationCap,
  Pill,
  ShoppingCart,
  BrainCircuit,
  Receipt,
  WifiOff,
  CheckCircle2,
  QrCode,
  Zap,
  Plus,
} from 'lucide-react';

type StudentRow = {
  key: '0' | '1' | '2';
  riskScore: number;
  tuitionPaid: boolean;
};

type PharmaLine = {
  nameKey: '0' | '1' | '2';
  qty: number;
  price: number;
  lot: string;
  expiry: string;
  eDgiSigned: boolean;
};

type PosLine = {
  id: number;
  nameKey: '0' | '1';
  price: number;
  qty: number;
};

export const SaasInteractiveDemo: React.FC = () => {
  const t = useTranslations('home.demo');
  const locale = useLocale();
  const fmt = (n: number) => formatNumber(n, locale);
  const cdf = (n: number) => `${fmt(n)} CDF`;

  const [activeTab, setActiveTab] = useState<'edu' | 'pharma' | 'pos'>('edu');

  // State for Edu Simulator
  const [students] = useState<StudentRow[]>([
    { key: '0', riskScore: 12, tuitionPaid: true },
    { key: '1', riskScore: 78, tuitionPaid: false },
    { key: '2', riskScore: 24, tuitionPaid: true },
  ]);
  const [eduAiRun, setEduAiRun] = useState(false);

  // State for Pharma Simulator
  const [pharmaCart, setPharmaCart] = useState<PharmaLine[]>([
    { nameKey: '0', qty: 2, price: 12500, lot: 'LOT-2026-X89', expiry: '12/2027', eDgiSigned: true },
    { nameKey: '1', qty: 5, price: 4200, lot: 'LOT-2026-A12', expiry: '09/2028', eDgiSigned: true },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const [eDgiGenerated, setEDgiGenerated] = useState(false);

  // State for POS Simulator
  const [posOffline, setPosOffline] = useState(false);
  const [posCart] = useState<PosLine[]>([
    { id: 1, nameKey: '0', price: 2000, qty: 2 },
    { id: 2, nameKey: '1', price: 45000, qty: 1 },
  ]);
  const [posPaid, setPosPaid] = useState(false);

  const runEduAiAnalysis = () => {
    setEduAiRun(true);
    setTimeout(() => {
      setEduAiRun(false);
    }, 1500);
  };

  const addPharmaItem = () => {
    setIsScanning(true);
    setTimeout(() => {
      setPharmaCart((prev) => [
        ...prev,
        { nameKey: '2', qty: 1, price: 8500, lot: 'LOT-2026-Z44', expiry: '11/2027', eDgiSigned: true },
      ]);
      setIsScanning(false);
    }, 800);
  };

  const generatePharmaEDgi = () => {
    setEDgiGenerated(true);
  };

  const calculatePosTotal = () => {
    return posCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <div className="w-full bg-[var(--oe-surface)] overflow-hidden my-0">
      <div className="bg-[var(--oe-bg-elevated)] px-4 sm:px-6 py-4 border-b border-[var(--oe-border)] flex flex-col gap-4">
        <div>
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[var(--oe-accent)] font-semibold">
            {t('interactive.header.eyebrow')}
          </div>
          <div className="text-base sm:text-lg font-heading font-semibold text-[var(--oe-text)] mt-1">
            {t('interactive.header.title')}
          </div>
        </div>

        <div className="oe-scroll-x sm:overflow-visible">
          <div className="inline-flex p-1 rounded-xl bg-[var(--oe-bg)] border border-[var(--oe-border)]">
            {(
              [
                { id: 'edu' as const, icon: GraduationCap, label: 'Okapi Edu', active: 'bg-violet-600 text-[var(--oe-text)]' },
                { id: 'pharma' as const, icon: Pill, label: 'Syntix Pharma', active: 'bg-sky-600 text-[var(--oe-text)]' },
                { id: 'pos' as const, icon: ShoppingCart, label: 'Okapi POS', active: 'bg-cyan-600 text-[var(--oe-text)]' },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const selected = activeTab === tab.id;
              return (
                <span key={tab.id} className="contents">
                  <input
                    type="radio"
                    name="oe-demo-tab"
                    id={`oe-demo-${tab.id}`}
                    checked={selected}
                    onChange={() => setActiveTab(tab.id)}
                    className="oe-native-toggle"
                  />
                  <label
                    htmlFor={`oe-demo-${tab.id}`}
                    className={`oe-tap min-h-10 cursor-pointer px-3.5 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-2 transition-all whitespace-nowrap ${
                      selected ? tab.active : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)]'
                    }`}
                  >
                    <Icon className="w-4 h-4 pointer-events-none" />
                    <span>{tab.label}</span>
                  </label>
                </span>
              );
            })}
          </div>
        </div>
      </div>


      {/* Interactive Canvas Area */}
      <div className="p-4 sm:p-6">

        {/* OKAPI EDU TAB DEMO */}
        {activeTab === 'edu' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[var(--oe-border)]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg sm:text-xl font-heading font-bold text-[var(--oe-text)]">
                    {t('interactive.edu.title')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {t('interactive.edu.badge')}
                  </span>
                </div>
                <p className="text-xs text-[var(--oe-text-secondary)] mt-1">
                  {t('interactive.edu.description')}
                </p>
              </div>

              <button
                onClick={runEduAiAnalysis}
                disabled={eduAiRun}
                className="w-full sm:w-auto min-h-11 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-70 text-[var(--oe-text)] text-xs font-medium flex items-center justify-center gap-2 transition-colors shrink-0 shadow-lg shadow-purple-900/40"
              >
                <BrainCircuit className={`w-4 h-4 ${eduAiRun ? 'animate-spin' : ''}`} />
                <span>{eduAiRun ? t('interactive.edu.runningButton') : t('interactive.edu.runButton')}</span>
              </button>
            </div>

            {/* Students Table Simulator */}
            <div className="oe-table-wrap">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[var(--oe-text-secondary)] border-b border-[var(--oe-border)] font-mono">
                    <th className="pb-3 pr-3 font-medium whitespace-nowrap">{t('interactive.edu.columns.student')}</th>
                    <th className="pb-3 pr-3 font-medium whitespace-nowrap">{t('interactive.edu.columns.grade')}</th>
                    <th className="pb-3 pr-3 font-medium whitespace-nowrap">{t('interactive.edu.columns.risk')}</th>
                    <th className="pb-3 pr-3 font-medium whitespace-nowrap">{t('interactive.edu.columns.diagnosis')}</th>
                    <th className="pb-3 font-medium whitespace-nowrap">{t('interactive.edu.columns.tuition')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--oe-border)]">
                  {students.map((st) => (
                    <tr key={st.key} className="hover:bg-[var(--oe-surface-hover)] transition-colors">
                      <td className="py-3 pr-3 font-medium text-[var(--oe-text)] whitespace-nowrap">
                        {t(`interactive.edu.students.${st.key}.name`)}
                      </td>
                      <td className="py-3 pr-3 text-[var(--oe-text-secondary)] whitespace-nowrap">
                        {t(`interactive.edu.students.${st.key}.grade`)}
                      </td>
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[var(--oe-bg-muted)] h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${st.riskScore > 50 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                              style={{ width: `${st.riskScore}%` }}
                            />
                          </div>
                          <span className={`font-mono ${st.riskScore > 50 ? 'text-rose-400 font-bold' : 'text-[var(--oe-text-secondary)]'}`}>
                            {st.riskScore}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-3 text-[var(--oe-text-secondary)] whitespace-nowrap">
                        {t(`interactive.edu.students.${st.key}.status`)}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        {st.tuitionPaid ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t('interactive.edu.tuition.paid')}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                            <span>{t('interactive.edu.tuition.pending')}</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{t('interactive.edu.aiFooter.message')}</span>
              </div>
              <span className="font-mono text-[10px] text-purple-400">
                {t('interactive.edu.aiFooter.model')}
              </span>
            </div>
          </div>
        )}

        {/* SYNTIX PHARMA TAB DEMO */}
        {activeTab === 'pharma' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[var(--oe-border)]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg sm:text-xl font-heading font-bold text-[var(--oe-text)]">
                    {t('interactive.pharma.title')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {t('interactive.pharma.badge')}
                  </span>
                </div>
                <p className="text-xs text-[var(--oe-text-secondary)] mt-1">
                  {t('interactive.pharma.description')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={addPharmaItem}
                  disabled={isScanning}
                  className="w-full sm:w-auto min-h-11 px-3.5 py-2 rounded-xl bg-[var(--oe-bg-muted)] hover:bg-[var(--oe-surface-hover)] disabled:opacity-70 text-[var(--oe-text)] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isScanning ? t('interactive.pharma.scanningButton') : t('interactive.pharma.scanButton')}</span>
                </button>

                <button
                  onClick={generatePharmaEDgi}
                  className="w-full sm:w-auto min-h-11 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-[var(--oe-text)] text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-sky-900/40"
                >
                  <Receipt className="w-4 h-4" />
                  <span>{t('interactive.pharma.signButton')}</span>
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-2">
              {pharmaCart.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[var(--oe-bg-muted)] border border-[var(--oe-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="font-semibold text-[var(--oe-text)]">
                      {t(`interactive.pharma.items.${item.nameKey}.name`)}
                    </div>
                    <div className="text-[11px] text-[var(--oe-text-secondary)] flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                      <span className="font-mono">{t('interactive.pharma.lot', { lot: item.lot })}</span>
                      <span>{t('interactive.pharma.expiry', { expiry: item.expiry })}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-mono text-[var(--oe-text)]">{cdf(item.price)}</div>
                    <div className="text-[10px] text-sky-400 font-mono">
                      {t('interactive.pharma.signed')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* e-DGI Signature Output */}
            {eDgiGenerated && (
              <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-lg shrink-0">
                    <QrCode className="w-10 h-10 text-slate-950" />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-sky-300 break-all">
                      {t('interactive.pharma.ticket.title')}
                    </div>
                    <div className="text-[var(--oe-text-secondary)]">
                      {t('interactive.pharma.ticket.amounts', { ht: fmt(29400), tva: fmt(4704) })}
                    </div>
                    <div className="text-[11px] text-[var(--oe-text-secondary)] font-mono mt-1 break-all">
                      {t('interactive.pharma.ticket.hash')}
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-sky-500/20 text-sky-300 border border-sky-400/30 rounded-lg font-mono text-[11px] whitespace-nowrap">
                  {t('interactive.pharma.ticket.transmitted')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* OKAPI POS TAB DEMO */}
        {activeTab === 'pos' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[var(--oe-border)]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg sm:text-xl font-heading font-bold text-[var(--oe-text)]">
                    {t('interactive.pos.title')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {t('interactive.pos.badge')}
                  </span>
                </div>
                <p className="text-xs text-[var(--oe-text-secondary)] mt-1">
                  {t('interactive.pos.description')}
                </p>
              </div>

              {/* Toggle Network Mode */}
              <button
                onClick={() => setPosOffline(!posOffline)}
                className={`w-full sm:w-auto min-h-11 px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors border ${
                  posOffline
                    ? 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                    : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                }`}
              >
                <WifiOff className="w-4 h-4" />
                <span>{posOffline ? t('interactive.pos.networkOffline') : t('interactive.pos.networkOnline')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Items List */}
              <div className="md:col-span-2 space-y-2">
                <div className="text-xs font-mono uppercase text-[var(--oe-text-secondary)] mb-2">
                  {t('interactive.pos.cartLabel')}
                </div>
                {posCart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[var(--oe-bg-muted)] border border-[var(--oe-border)] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-[var(--oe-text)] truncate">
                        {t(`interactive.pos.items.${item.nameKey}.name`)}
                      </div>
                      <div className="text-[var(--oe-text-secondary)]">
                        {item.qty} × {cdf(item.price)}
                      </div>
                    </div>
                    <div className="font-mono text-amber-400 font-bold whitespace-nowrap">
                      {cdf(item.qty * item.price)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Terminal Widget */}
              <div className="p-4 rounded-xl bg-[var(--oe-bg-muted)] border border-[var(--oe-border)] flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-[var(--oe-text-secondary)]">
                    {t('interactive.pos.total')}
                  </div>
                  <div className="text-2xl font-heading font-bold text-[var(--oe-text)] my-1">
                    {cdf(calculatePosTotal())}
                  </div>
                  <div className="text-[11px] text-[var(--oe-text-secondary)]">
                    {t('interactive.pos.paymentMode')}{' '}
                    <strong className="text-[var(--oe-text)]">{t('interactive.pos.paymentModeValue')}</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPosPaid(true);
                    setTimeout(() => setPosPaid(false), 4000);
                  }}
                  className="w-full min-h-11 py-3 rounded-xl bg-[#E6A817] hover:bg-[#d49911] text-slate-950 font-heading font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-950/40"
                >
                  <Zap className="w-4 h-4" />
                  <span>{t('interactive.pos.payButton')}</span>
                </button>

                {posPaid && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in zoom-in-95">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      {posOffline
                        ? t('interactive.pos.paymentSuccessOffline')
                        : t('interactive.pos.paymentSuccessCloud')}
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
