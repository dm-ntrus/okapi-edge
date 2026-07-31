'use client';

import React, { useState } from 'react';
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

export const SaasInteractiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'edu' | 'pharma' | 'pos'>('edu');

  // State for Edu Simulator
  const [students] = useState([
    { name: 'Evoloko Mpasi', grade: '3ème LMD Informatique', riskScore: 12, status: 'Excellente progression', tuitionPaid: true },
    { name: 'Kambale Vianney', grade: '1ère Lic. Médecine', riskScore: 78, status: 'Risque décrochage (Absences)', tuitionPaid: false },
    { name: 'Ngalula Beatrice', grade: '2ème BAC Économie', riskScore: 24, status: 'Régulier', tuitionPaid: true },
  ]);
  const [eduAiRun, setEduAiRun] = useState(false);

  // State for Pharma Simulator
  const [pharmaCart, setPharmaCart] = useState([
    { name: 'Artemether + Lumefantrine 80mg', qty: 2, price: 12500, lot: 'LOT-2026-X89', expiry: '12/2027', eDgiSigned: true },
    { name: 'Paracétamol Injectable 100ml', qty: 5, price: 4200, lot: 'LOT-2026-A12', expiry: '09/2028', eDgiSigned: true },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const [eDgiGenerated, setEDgiGenerated] = useState(false);

  // State for POS Simulator
  const [posOffline, setPosOffline] = useState(false);
  const [posCart] = useState([
    { id: 1, name: 'Bouteille d’eau 1.5L', price: 2000, qty: 2 },
    { id: 2, name: 'Sac de Riz 25kg Premium', price: 45000, qty: 1 }
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
      setPharmaCart([
        ...pharmaCart,
        { name: 'Amoxicilline 500mg Sirop', qty: 1, price: 8500, lot: 'LOT-2026-Z44', expiry: '11/2027', eDgiSigned: true }
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
            Démo interactive
          </div>
          <div className="text-base sm:text-lg font-heading font-semibold text-[var(--oe-text)] mt-1">
            Expérimentez nos plateformes
          </div>
        </div>

        <div className="oe-scroll-x sm:overflow-visible">
          <div className="inline-flex p-1 rounded-xl bg-[var(--oe-bg)] border border-[var(--oe-border)]">
            <button
              type="button"
              onClick={() => setActiveTab('edu')}
              className={`oe-tap min-h-10 px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'edu'
                  ? 'bg-violet-600 text-[var(--oe-text)]'
                  : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Okapi Edu</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pharma')}
              className={`oe-tap min-h-10 px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'pharma'
                  ? 'bg-sky-600 text-[var(--oe-text)]'
                  : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)]'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Syntix Pharma</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pos')}
              className={`oe-tap min-h-10 px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'pos'
                  ? 'bg-cyan-600 text-[var(--oe-text)]'
                  : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)]'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Okapi POS</span>
            </button>
          </div>
        </div>
      </div>


      {/* Interactive Canvas Area */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        
        {/* OKAPI EDU TAB DEMO */}
        {activeTab === 'edu' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[var(--oe-border)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-heading font-bold text-[var(--oe-text)]">Okapi Edu • Tableau de Bord Prédictif</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">Mode Direct</span>
                </div>
                <p className="text-xs text-[var(--oe-text-secondary)] mt-1">
                  IA Contextuelle de détection de risque de décrochage & Suivi des frais de scolarité.
                </p>
              </div>

              <button
                onClick={runEduAiAnalysis}
                disabled={eduAiRun}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-[var(--oe-text)] text-xs font-medium flex items-center gap-2 transition-colors shrink-0 shadow-lg shadow-purple-900/40"
              >
                <BrainCircuit className={`w-4 h-4 ${eduAiRun ? 'animate-spin' : ''}`} />
                <span>{eduAiRun ? 'Analyse IA en cours...' : 'Exécuter Modèle IA Prédictif'}</span>
              </button>
            </div>

            {/* Students Table Simulator */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[var(--oe-text-secondary)] border-b border-[var(--oe-border)] font-mono">
                    <th className="pb-3 font-medium">Étudiant / Élève</th>
                    <th className="pb-3 font-medium">Promotion / Niveau</th>
                    <th className="pb-3 font-medium">Score Risque IA</th>
                    <th className="pb-3 font-medium">Diagnostic IA Contextuel</th>
                    <th className="pb-3 font-medium">Frais Scolaires (M-Pesa)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--oe-border)]">
                  {students.map((st, idx) => (
                    <tr key={idx} className="hover:bg-[var(--oe-surface-hover)] transition-colors">
                      <td className="py-3 font-medium text-[var(--oe-text)]">{st.name}</td>
                      <td className="py-3 text-[var(--oe-text-secondary)]">{st.grade}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[var(--oe-bg-muted)] h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${st.riskScore > 50 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                              style={{ width: `${st.riskScore}%` }}
                            ></div>
                          </div>
                          <span className={`font-mono ${st.riskScore > 50 ? 'text-rose-400 font-bold' : 'text-[var(--oe-text-secondary)]'}`}>
                            {st.riskScore}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-[var(--oe-text-secondary)]">
                        {st.status}
                      </td>
                      <td className="py-3">
                        {st.tuitionPaid ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Réglé (Quittance #8841)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                            <span>En attente (Relance SMS)</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Le modèle IA local prédit 1 élève nécessitant un soutien pédagogique immédiat.</span>
              </div>
              <span className="font-mono text-[10px] text-purple-400">Modèle Local ONNX v2.4</span>
            </div>
          </div>
        )}

        {/* SYNTIX PHARMA TAB DEMO */}
        {activeTab === 'pharma' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[var(--oe-border)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-heading font-bold text-[var(--oe-text)]">Syntix Pharma • Caisse Officine & e-DGI</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">Facture Normalisée</span>
                </div>
                <p className="text-xs text-[var(--oe-text-secondary)] mt-1">
                  Scannage Datamatrix, contrôle automatique des péremptions et signature fiscale e-DGI.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={addPharmaItem}
                  disabled={isScanning}
                  className="px-3.5 py-2 rounded-xl bg-[var(--oe-bg-muted)] hover:bg-[var(--oe-surface-hover)] text-[var(--oe-text)] text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isScanning ? 'Scannage...' : 'Scanner Boîte GS1'}</span>
                </button>

                <button
                  onClick={generatePharmaEDgi}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-[var(--oe-text)] text-xs font-medium flex items-center gap-2 transition-colors shadow-lg shadow-sky-900/40"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Signer Facture e-DGI</span>
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-2">
              {pharmaCart.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[var(--oe-bg-muted)] border border-[var(--oe-border)] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-[var(--oe-text)]">{item.name}</div>
                    <div className="text-[11px] text-[var(--oe-text-secondary)] flex items-center gap-3 mt-0.5">
                      <span className="font-mono">N° Lot : {item.lot}</span>
                      <span>Péremption : {item.expiry}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[var(--oe-text)]">{item.price.toLocaleString()} CDF</div>
                    <div className="text-[10px] text-sky-400 font-mono">Signé cryptographiquement</div>
                  </div>
                </div>
              ))}
            </div>

            {/* e-DGI Signature Output */}
            {eDgiGenerated && (
              <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-lg">
                    <QrCode className="w-10 h-10 text-slate-950" />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-sky-300">TICKET NORMALISÉ e-DGI #RDC-2026-99042</div>
                    <div className="text-[var(--oe-text-secondary)]">Montant HT : 29 400 CDF | TVA 16% : 4 704 CDF</div>
                    <div className="text-[11px] text-[var(--oe-text-secondary)] font-mono mt-1">Hash SHA-256 : 9f8a7b...c3d2e1</div>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-sky-500/20 text-sky-300 border border-sky-400/30 rounded-lg font-mono text-[11px]">
                  Transmis à la DGI Kinshasa (200ms)
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
                <div className="flex items-center gap-2">
                  <span className="text-xl font-heading font-bold text-[var(--oe-text)]">Okapi POS • Moteur Tauri / Offline-First</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">Caisse Rapide</span>
                </div>
                <p className="text-xs text-[var(--oe-text-secondary)] mt-1">
                  Fonctionnement ininterrompu même en cas de panne réseau générale.
                </p>
              </div>

              {/* Toggle Network Mode */}
              <button
                onClick={() => setPosOffline(!posOffline)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-colors border ${
                  posOffline 
                    ? 'bg-rose-950/60 border-rose-500/50 text-rose-300' 
                    : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                }`}
              >
                <WifiOff className="w-4 h-4" />
                <span>{posOffline ? 'RÉSEAU COUPÉ (Mode Offline Actif)' : 'RÉSEAU EN LIGNE (Synchro Cloud)'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Items List */}
              <div className="md:col-span-2 space-y-2">
                <div className="text-xs font-mono uppercase text-[var(--oe-text-secondary)] mb-2">Panier Client en cours</div>
                {posCart.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-[var(--oe-bg-muted)] border border-[var(--oe-border)] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-[var(--oe-text)]">{item.name}</div>
                      <div className="text-[var(--oe-text-secondary)]">{item.qty} x {item.price.toLocaleString()} CDF</div>
                    </div>
                    <div className="font-mono text-amber-400 font-bold">
                      {(item.qty * item.price).toLocaleString()} CDF
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Terminal Widget */}
              <div className="p-4 rounded-xl bg-[var(--oe-bg-muted)] border border-[var(--oe-border)] flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-[var(--oe-text-secondary)]">Total à Payer</div>
                  <div className="text-2xl font-heading font-bold text-[var(--oe-text)] my-1">
                    {calculatePosTotal().toLocaleString()} CDF
                  </div>
                  <div className="text-[11px] text-[var(--oe-text-secondary)]">
                    Mode d'encaissement : <strong className="text-[var(--oe-text)]">Mobile Money / Cash</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPosPaid(true);
                    setTimeout(() => setPosPaid(false), 4000);
                  }}
                  className="w-full py-3 rounded-xl bg-[#E6A817] hover:bg-[#d49911] text-slate-950 font-heading font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-950/40"
                >
                  <Zap className="w-4 h-4" />
                  <span>Encaisser Instantanément</span>
                </button>

                {posPaid && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in zoom-in-95">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Paiement validé ! Ticket scellé {posOffline ? 'en local (CRDT)' : 'sur le cloud'}.</span>
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
