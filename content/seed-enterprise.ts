/**
 * Enterprise-grade bilingual seed catalog (FR / EN).
 * Used by scripts/seed.ts — production-ready CMS content.
 */

export type Locale = 'fr' | 'en';

export type SeedPost = {
  locale: Locale;
  title: string;
  slug: string;
  category: string;
  author: string;
  date_label: string;
  read_time: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
  seo_title?: string;
  seo_description?: string;
  published: boolean;
};

export type SeedJob = {
  locale: Locale;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  published: boolean;
};

export type SeedPress = {
  locale: Locale;
  title: string;
  date_label: string;
  category: string;
  summary: string;
  download_url?: string;
  published: boolean;
};

export type SeedProduct = {
  locale: Locale;
  key: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: string;
  description: string;
  full_description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: { title: string; desc: string; icon: string }[];
  subdomain_url: string;
  badge: string;
  color: string;
  bg_gradient: string;
  published: boolean;
  sort_order: number;
};

const PRODUCT_META: Record<
  string,
  { color: string; bg_gradient: string; subdomain_url: string; sort_order: number }
> = {
  'okapi-edu': {
    color: '#7B2FFF',
    bg_gradient: 'from-purple-900/30 via-slate-900 to-slate-950',
    subdomain_url: 'https://edu.okapiedge.com',
    sort_order: 0,
  },
  'syntix-pharma': {
    color: '#38BDF8',
    bg_gradient: 'from-sky-900/30 via-slate-900 to-slate-950',
    subdomain_url: 'https://syntix.okapiedge.com',
    sort_order: 1,
  },
  'okapi-pos': {
    color: '#00F2FE',
    bg_gradient: 'from-cyan-900/30 via-slate-900 to-slate-950',
    subdomain_url: 'https://pos.okapiedge.com',
    sort_order: 2,
  },
  'okapi-hospitals': {
    color: '#34D399',
    bg_gradient: 'from-emerald-900/30 via-slate-900 to-slate-950',
    subdomain_url: 'https://hospitals.okapiedge.com',
    sort_order: 3,
  },
  'okapi-fueloils': {
    color: '#FBBF24',
    bg_gradient: 'from-amber-900/30 via-slate-900 to-slate-950',
    subdomain_url: 'https://fueloils.okapiedge.com',
    sort_order: 4,
  },
};

export const SEED_PRODUCTS: SeedProduct[] = [
  // ——— FR ———
  {
    locale: 'fr',
    key: 'okapi-edu',
    name: 'Okapi Edu',
    subtitle: 'Système d’exploitation éducatif nouvelle génération',
    tagline: 'Infrastructure SaaS mondiale pour institutions scolaires et universitaires.',
    category: 'Éducation & Formation',
    description:
      'Plateforme unifiée : administration, pédagogie, finance, IA décisionnelle et portails étudiants dans plus de 45 pays.',
    full_description:
      'Okapi Edu orchestre le cycle complet d’apprentissage — inscription multi-devises, bulletins signés cryptographiquement, passerelles Stripe / SWIFT / Mobile Money — avec synchronisation Edge offline pour campuses à connectivité intermittente. Conçu pour réseaux multi-campus, conformité RGPD et souveraineté des données régionales.',
    tags: ['IA académique', 'Multi-campus', 'Paiements multi-devises', 'Edge offline'],
    metrics: [
      { label: 'Satisfaction', value: '98.5%' },
      { label: 'Gain admin', value: '+42%' },
      { label: 'Apprenants', value: '2.8M+' },
      { label: 'Disponibilité', value: '99.99%' },
    ],
    features: [
      {
        title: 'Analytics académique IA',
        desc: 'Suivi comportemental et prédiction de réussite en temps réel.',
        icon: 'BrainCircuit',
      },
      {
        title: 'Moteur financier multi-devises',
        desc: 'Frais, réconciliation et conformité fiscale locale automatisés.',
        icon: 'Wallet',
      },
      {
        title: 'Gouvernance multi-campus',
        desc: 'Règles territoriales et isolation des données par juridiction.',
        icon: 'Building2',
      },
      {
        title: 'Portail étudiant PWA',
        desc: 'Notifications multilingues et suivi mobile / web / desktop.',
        icon: 'Smartphone',
      },
    ],
    badge: 'Suite Éducation Entreprise',
    published: true,
    ...PRODUCT_META['okapi-edu'],
  },
  {
    locale: 'fr',
    key: 'syntix-pharma',
    name: 'Syntix Pharma',
    subtitle: 'ERP santé intelligent mondial',
    tagline: 'Sécurisez la chaîne pharmaceutique et anticipez la demande.',
    category: 'Santé & Logistique médicale',
    description:
      'Officines, distribution et stocks avec traçabilité Datamatrix, IA de réapprovisionnement et conformité fiscale temps réel.',
    full_description:
      'Syntix Pharma sécurise la supply chain médicaments, bloque la contrefaçon via GS1/Datamatrix, prédit les ruptures et automatise la télétransmission fiscale. Architecture Edge pour pharmacies sans lien réseau permanent.',
    tags: ['Datamatrix / GS1', 'e-facturation', 'IA stock', 'Offline Edge'],
    metrics: [
      { label: 'Conformité fiscale', value: '100%' },
      { label: 'Ruptures évitées', value: '-35%' },
      { label: 'Produits traqués', value: '84M+' },
      { label: 'Périmés évités', value: '-92%' },
    ],
    features: [
      {
        title: 'Facturation & conformité',
        desc: 'Signature et télétransmission aux autorités en <100 ms.',
        icon: 'Receipt',
      },
      {
        title: 'FEFO & lots sensibles',
        desc: 'First-Expired-First-Out et chaîne du froid contrôlée.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Stock prédictif',
        desc: 'Modèles IA pour pics épidémiques et saisonniers.',
        icon: 'TrendingUp',
      },
      {
        title: 'Anti-contrefaçon GS1',
        desc: 'Validation Datamatrix à la réception et à la vente.',
        icon: 'Scan',
      },
    ],
    badge: 'Standard Santé Global',
    published: true,
    ...PRODUCT_META['syntix-pharma'],
  },
  {
    locale: 'fr',
    key: 'okapi-pos',
    name: 'Okapi POS',
    subtitle: 'Infrastructure retail Edge universelle',
    tagline: 'Encaissez et synchronisez sans interruption, partout.',
    category: 'Retail & Commerce',
    description:
      'Caisse Rust/Tauri ultra-rapide, 100 % offline-first, synchronisée sur nœuds cloud mondiaux.',
    full_description:
      'Okapi POS combine exécutable natif sub-milliseconde, CRDT offline, multi-boutiques et fiscalité dynamique (TVA, e-DGI). Cartes, contactless, mobile money et crypto selon le marché.',
    tags: ['Rust / Tauri', 'CRDT offline', 'Multi-boutiques', 'Fiscalité dynamique'],
    metrics: [
      { label: 'SLA Edge', value: '99.999%' },
      { label: 'Transaction', value: '<800 ms' },
      { label: 'Points de vente', value: '18 500+' },
      { label: 'Volume annuel', value: '680 M$' },
    ],
    features: [
      {
        title: 'Exécutable haute vitesse',
        desc: 'Fluidité native tablette, caisse et mobile.',
        icon: 'Zap',
      },
      {
        title: 'Offline-first CRDT',
        desc: 'Ventes continues ; resynchro automatique.',
        icon: 'WifiOff',
      },
      {
        title: 'Multi-sites & entrepôts',
        desc: 'Stocks, transferts et bilans temps réel.',
        icon: 'Store',
      },
      {
        title: 'Fiscalité contextuelle',
        desc: 'Adaptation automatique aux normes locales.',
        icon: 'FileText',
      },
    ],
    badge: 'POS Haute Performance',
    published: true,
    ...PRODUCT_META['okapi-pos'],
  },
  {
    locale: 'fr',
    key: 'okapi-hospitals',
    name: 'Okapi Hospitals',
    subtitle: 'Plateforme hospitalière souveraine',
    tagline: 'SIH moderne : soins, blocs, labos et facturation unifiés.',
    category: 'Santé hospitalière',
    description:
      'Dossier patient, planification des lits, blocs opératoires, laboratoires et télétransmission assureurs.',
    full_description:
      'Okapi Hospitals centralise le parcours patient avec auditabilité clinique, intégrations HL7/FHIR, et hébergement Edge pour établissements exigeant la souveraineté des données de santé.',
    tags: ['HL7 / FHIR', 'DPI', 'Blocs & lits', 'Edge santé'],
    metrics: [
      { label: 'Temps d’admission', value: '-38%' },
      { label: 'Occup. lits', value: '+21%' },
      { label: 'Établissements', value: '420+' },
      { label: 'Uptime clinique', value: '99.98%' },
    ],
    features: [
      {
        title: 'Dossier patient unifié',
        desc: 'Historique clinique sécurisé et partage contrôlé.',
        icon: 'FileHeart',
      },
      {
        title: 'Orchestration des lits',
        desc: 'Prédiction d’occupation et flux urgences.',
        icon: 'BedDouble',
      },
      {
        title: 'Interop FHIR',
        desc: 'Échanges standards avec labos et assureurs.',
        icon: 'Network',
      },
      {
        title: 'Edge souverain',
        desc: 'Données critiques au plus près de l’établissement.',
        icon: 'Shield',
      },
    ],
    badge: 'SIH Entreprise',
    published: true,
    ...PRODUCT_META['okapi-hospitals'],
  },
  {
    locale: 'fr',
    key: 'okapi-fueloils',
    name: 'Okapi FuelOils',
    subtitle: 'Contrôle énergétique & stations',
    tagline: 'Pilotez stocks, pompes, flottes et conformité en temps réel.',
    category: 'Énergie & Distribution',
    description:
      'Télémétrie cuves, réconciliation pompistes, flottes B2B et reporting réglementaire.',
    full_description:
      'Okapi FuelOils connecte stations-service et dépôts : IoT cuves, anti-fraude pompes, facturation flottes et tableaux de bord multi-pays pour opérateurs pétroliers et réseaux indépendants.',
    tags: ['IoT cuves', 'Anti-fraude', 'Flottes B2B', 'Reporting'],
    metrics: [
      { label: 'Stations connectées', value: '3 200+' },
      { label: 'Écarts stock', value: '-47%' },
      { label: 'Fraudes détectées', value: '+63%' },
      { label: 'Synchro Edge', value: '<2 s' },
    ],
    features: [
      {
        title: 'Télémétrie cuves',
        desc: 'Niveaux, température et alertes fuites.',
        icon: 'Gauge',
      },
      {
        title: 'Réconciliation pompes',
        desc: 'Écarts literie / caisse automatisés.',
        icon: 'Scale',
      },
      {
        title: 'Flottes & cartes carburant',
        desc: 'Limites, géofencing et facturation B2B.',
        icon: 'Truck',
      },
      {
        title: 'Conformité multi-pays',
        desc: 'Exports réglementaires et audit trail.',
        icon: 'ClipboardCheck',
      },
    ],
    badge: 'Énergie Connectée',
    published: true,
    ...PRODUCT_META['okapi-fueloils'],
  },

  // ——— EN ———
  {
    locale: 'en',
    key: 'okapi-edu',
    name: 'Okapi Edu',
    subtitle: 'Next-gen global learning operating system',
    tagline: 'Worldwide SaaS infrastructure for schools and universities.',
    category: 'Education & Training',
    description:
      'Unified platform for administration, pedagogy, finance, decision AI and student portals across 45+ countries.',
    full_description:
      'Okapi Edu runs the full learning lifecycle — multi-currency enrollment, cryptographically signed transcripts, Stripe / SWIFT / Mobile Money gateways — with Edge offline sync for campuses with intermittent connectivity. Built for multi-campus networks, GDPR and regional data sovereignty.',
    tags: ['Academic AI', 'Multi-campus', 'Multi-currency payments', 'Edge offline'],
    metrics: [
      { label: 'Satisfaction', value: '98.5%' },
      { label: 'Admin efficiency', value: '+42%' },
      { label: 'Learners', value: '2.8M+' },
      { label: 'Availability', value: '99.99%' },
    ],
    features: [
      {
        title: 'Academic AI analytics',
        desc: 'Behavioral tracking and success prediction in real time.',
        icon: 'BrainCircuit',
      },
      {
        title: 'Multi-currency finance engine',
        desc: 'Automated fees, reconciliation and local tax compliance.',
        icon: 'Wallet',
      },
      {
        title: 'Multi-campus governance',
        desc: 'Territorial rules and jurisdiction-aware data isolation.',
        icon: 'Building2',
      },
      {
        title: 'Student PWA portal',
        desc: 'Multilingual notifications across mobile, web and desktop.',
        icon: 'Smartphone',
      },
    ],
    badge: 'Enterprise Education Suite',
    published: true,
    ...PRODUCT_META['okapi-edu'],
  },
  {
    locale: 'en',
    key: 'syntix-pharma',
    name: 'Syntix Pharma',
    subtitle: 'Global intelligent healthcare ERP',
    tagline: 'Secure the pharma supply chain and anticipate demand.',
    category: 'Healthcare & Medical Logistics',
    description:
      'Pharmacies, distribution and inventory with Datamatrix traceability, replenishment AI and real-time fiscal compliance.',
    full_description:
      'Syntix Pharma secures medicine supply chains, blocks counterfeits via GS1/Datamatrix, predicts stockouts and automates fiscal reporting. Edge architecture for pharmacies without permanent network links.',
    tags: ['Datamatrix / GS1', 'e-Invoicing', 'Inventory AI', 'Offline Edge'],
    metrics: [
      { label: 'Fiscal compliance', value: '100%' },
      { label: 'Stockouts avoided', value: '-35%' },
      { label: 'Tracked products', value: '84M+' },
      { label: 'Expiry waste cut', value: '-92%' },
    ],
    features: [
      {
        title: 'Billing & compliance',
        desc: 'Signed transmission to authorities in <100 ms.',
        icon: 'Receipt',
      },
      {
        title: 'FEFO & sensitive lots',
        desc: 'First-Expired-First-Out with cold-chain control.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Predictive inventory',
        desc: 'AI models for epidemic and seasonal demand spikes.',
        icon: 'TrendingUp',
      },
      {
        title: 'GS1 anti-counterfeit',
        desc: 'Datamatrix validation on receipt and sale.',
        icon: 'Scan',
      },
    ],
    badge: 'Global Health Standard',
    published: true,
    ...PRODUCT_META['syntix-pharma'],
  },
  {
    locale: 'en',
    key: 'okapi-pos',
    name: 'Okapi POS',
    subtitle: 'Universal retail Edge infrastructure',
    tagline: 'Checkout and sync without interruption, worldwide.',
    category: 'Retail & Commerce',
    description:
      'Ultra-fast Rust/Tauri POS, fully offline-first, synced across global cloud nodes.',
    full_description:
      'Okapi POS combines a sub-millisecond native executable, offline CRDTs, multi-store ops and dynamic tax (VAT, e-invoicing). Cards, contactless, mobile money and crypto by market.',
    tags: ['Rust / Tauri', 'Offline CRDT', 'Multi-store', 'Dynamic tax'],
    metrics: [
      { label: 'Edge SLA', value: '99.999%' },
      { label: 'Transaction', value: '<800 ms' },
      { label: 'Active POS', value: '18,500+' },
      { label: 'Annual volume', value: '$680M+' },
    ],
    features: [
      {
        title: 'High-speed native runtime',
        desc: 'Smooth UX on tablet, register and mobile.',
        icon: 'Zap',
      },
      {
        title: 'Offline-first CRDT',
        desc: 'Keep selling; auto-resync when online.',
        icon: 'WifiOff',
      },
      {
        title: 'Multi-site & warehouses',
        desc: 'Stock, transfers and live P&L.',
        icon: 'Store',
      },
      {
        title: 'Contextual fiscal engine',
        desc: 'Automatic adaptation to local norms.',
        icon: 'FileText',
      },
    ],
    badge: 'High-Performance POS',
    published: true,
    ...PRODUCT_META['okapi-pos'],
  },
  {
    locale: 'en',
    key: 'okapi-hospitals',
    name: 'Okapi Hospitals',
    subtitle: 'Sovereign hospital platform',
    tagline: 'Modern HIS: care, theatres, labs and billing unified.',
    category: 'Hospital Healthcare',
    description:
      'Patient records, bed planning, operating theatres, laboratories and insurer transmission.',
    full_description:
      'Okapi Hospitals centralizes the patient journey with clinical auditability, HL7/FHIR integrations, and Edge hosting for facilities requiring health-data sovereignty.',
    tags: ['HL7 / FHIR', 'EHR', 'Beds & theatres', 'Health Edge'],
    metrics: [
      { label: 'Admission time', value: '-38%' },
      { label: 'Bed utilization', value: '+21%' },
      { label: 'Facilities', value: '420+' },
      { label: 'Clinical uptime', value: '99.98%' },
    ],
    features: [
      {
        title: 'Unified patient record',
        desc: 'Secure clinical history with controlled sharing.',
        icon: 'FileHeart',
      },
      {
        title: 'Bed orchestration',
        desc: 'Occupancy prediction and ER flow.',
        icon: 'BedDouble',
      },
      {
        title: 'FHIR interoperability',
        desc: 'Standard exchanges with labs and payers.',
        icon: 'Network',
      },
      {
        title: 'Sovereign Edge',
        desc: 'Critical data close to the facility.',
        icon: 'Shield',
      },
    ],
    badge: 'Enterprise HIS',
    published: true,
    ...PRODUCT_META['okapi-hospitals'],
  },
  {
    locale: 'en',
    key: 'okapi-fueloils',
    name: 'Okapi FuelOils',
    subtitle: 'Energy & station control',
    tagline: 'Run tanks, pumps, fleets and compliance in real time.',
    category: 'Energy & Distribution',
    description:
      'Tank telemetry, attendant reconciliation, B2B fleets and regulatory reporting.',
    full_description:
      'Okapi FuelOils connects fuel stations and depots: tank IoT, pump anti-fraud, fleet billing and multi-country dashboards for oil operators and independent networks.',
    tags: ['Tank IoT', 'Anti-fraud', 'B2B fleets', 'Reporting'],
    metrics: [
      { label: 'Connected stations', value: '3,200+' },
      { label: 'Stock variance', value: '-47%' },
      { label: 'Fraud detection', value: '+63%' },
      { label: 'Edge sync', value: '<2 s' },
    ],
    features: [
      {
        title: 'Tank telemetry',
        desc: 'Levels, temperature and leak alerts.',
        icon: 'Gauge',
      },
      {
        title: 'Pump reconciliation',
        desc: 'Automated liter vs. cash variance.',
        icon: 'Scale',
      },
      {
        title: 'Fleets & fuel cards',
        desc: 'Limits, geofencing and B2B invoicing.',
        icon: 'Truck',
      },
      {
        title: 'Multi-country compliance',
        desc: 'Regulatory exports and audit trail.',
        icon: 'ClipboardCheck',
      },
    ],
    badge: 'Connected Energy',
    published: true,
    ...PRODUCT_META['okapi-fueloils'],
  },
];

export const SEED_POSTS: SeedPost[] = [
  {
    locale: 'fr',
    slug: 'edge-sovereignty-playbook-2026',
    title: 'Playbook de souveraineté Edge 2026',
    category: 'Tech & Souveraineté',
    author: 'Direction Engineering',
    date_label: '12 Mars 2026',
    read_time: '9 min',
    excerpt:
      'Comment déployer des nœuds Edge conformes RGPD, data residency et continuité métier hors cloud public.',
    content:
      'La souveraineté numérique n’est plus un slogan : c’est une architecture. Ce playbook détaille les patterns Okapi Edge — isolation des tenants, chiffrement au repos, réplication contrôlée et runbooks d’incident multi-région — validés sur des déploiements éducation, santé et retail en Afrique, Europe et Moyen-Orient.',
    tags: ['Edge', 'RGPD', 'Architecture', 'Souveraineté'],
    seo_title: 'Souveraineté Edge — Playbook Okapi 2026',
    seo_description: 'Patterns production pour nœuds Edge souverains et conformité multi-juridiction.',
    published: true,
  },
  {
    locale: 'en',
    slug: 'edge-sovereignty-playbook-2026',
    title: 'Edge sovereignty playbook 2026',
    category: 'Tech & Sovereignty',
    author: 'Engineering Leadership',
    date_label: 'March 12, 2026',
    read_time: '9 min',
    excerpt:
      'How to ship Edge nodes that meet GDPR, data residency and business continuity outside the public cloud.',
    content:
      'Digital sovereignty is architecture, not marketing. This playbook covers Okapi Edge patterns — tenant isolation, encryption at rest, controlled replication and multi-region incident runbooks — proven across education, healthcare and retail deployments in Africa, Europe and the Middle East.',
    tags: ['Edge', 'GDPR', 'Architecture', 'Sovereignty'],
    seo_title: 'Edge Sovereignty — Okapi Playbook 2026',
    seo_description: 'Production patterns for sovereign Edge nodes and multi-jurisdiction compliance.',
    published: true,
  },
  {
    locale: 'fr',
    slug: 'offline-first-pos-crdt',
    title: 'POS offline-first : CRDT en production',
    category: 'Tech & Edge Architecture',
    author: 'Platform Team',
    date_label: '28 Février 2026',
    read_time: '11 min',
    excerpt:
      'Retour d’expérience sur la résolution de conflits de caisse multi-appareils sans perte de tickets.',
    content:
      'Okapi POS s’appuie sur des structures CRDT pour fusionner ventes, stocks et remises hors-ligne. Nous partageons les invariants métier, les tests de chaos réseau et les métriques de réconciliation observées sur 18 500 points de vente.',
    tags: ['POS', 'CRDT', 'Offline', 'Retail'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'offline-first-pos-crdt',
    title: 'Offline-first POS: CRDTs in production',
    category: 'Tech & Edge Architecture',
    author: 'Platform Team',
    date_label: 'February 28, 2026',
    read_time: '11 min',
    excerpt:
      'Field notes on multi-device checkout conflict resolution without dropping tickets.',
    content:
      'Okapi POS uses CRDT structures to merge offline sales, stock and discounts. We share business invariants, network chaos tests and reconciliation metrics observed across 18,500 active registers.',
    tags: ['POS', 'CRDT', 'Offline', 'Retail'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'syntix-traceability-gs1',
    title: 'Traçabilité GS1 : de la réception à la caisse',
    category: 'Guides métiers',
    author: 'Syntix Product',
    date_label: '4 Janvier 2026',
    read_time: '7 min',
    excerpt:
      'Mettre en place le scan Datamatrix bout-en-bout pour neutraliser la contrefaçon pharmaceutique.',
    content:
      'Guide opérationnel : paramétrage GS1, contrôles FEFO, alertes lots rappelés et indicateurs KPI pour directions d’officines et grossistes régionaux.',
    tags: ['Pharma', 'GS1', 'Conformité', 'Supply chain'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'syntix-traceability-gs1',
    title: 'GS1 traceability: from receiving to checkout',
    category: 'Industry Guides',
    author: 'Syntix Product',
    date_label: 'January 4, 2026',
    read_time: '7 min',
    excerpt:
      'Roll out end-to-end Datamatrix scanning to neutralize pharmaceutical counterfeiting.',
    content:
      'Operational guide: GS1 setup, FEFO controls, recall-lot alerts and KPIs for pharmacy networks and regional wholesalers.',
    tags: ['Pharma', 'GS1', 'Compliance', 'Supply chain'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'case-study-multi-campus-edu',
    title: 'Étude de cas : 120 campus, une seule vérité données',
    category: 'Études de cas',
    author: 'Customer Success',
    date_label: '18 Décembre 2025',
    read_time: '8 min',
    excerpt:
      'Comment un réseau universitaire a unifié finances, scolarité et analytics sans casser les règles locales.',
    content:
      'Déploiement Okapi Edu : migration progressive, formation des registrars, bascule paiements multi-devises et tableau de bord exécutif groupé. Résultats : −31 % de délais administratifs, +19 % de recouvrement des frais.',
    tags: ['Éducation', 'Migration', 'Multi-campus', 'ROI'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'case-study-multi-campus-edu',
    title: 'Case study: 120 campuses, one data truth',
    category: 'Case Studies',
    author: 'Customer Success',
    date_label: 'December 18, 2025',
    read_time: '8 min',
    excerpt:
      'How a university network unified finance, registrar ops and analytics without breaking local rules.',
    content:
      'Okapi Edu rollout: phased migration, registrar enablement, multi-currency payments cutover and group executive dashboards. Outcomes: −31% admin cycle time, +19% tuition recovery.',
    tags: ['Education', 'Migration', 'Multi-campus', 'ROI'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'hospital-fhir-edge',
    title: 'FHIR au bord du réseau hospitalier',
    category: 'Tech & Souveraineté',
    author: 'Health Engineering',
    date_label: '9 Novembre 2025',
    read_time: '10 min',
    excerpt:
      'Interopérabilité clinique sans exposer le DPI sur Internet public.',
    content:
      'Architecture de référence Okapi Hospitals : passerelles FHIR Edge, files d’événements cliniques et politiques d’accès basées sur les rôles soignants.',
    tags: ['FHIR', 'Hôpital', 'Edge', 'Interop'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'hospital-fhir-edge',
    title: 'FHIR at the hospital network edge',
    category: 'Tech & Sovereignty',
    author: 'Health Engineering',
    date_label: 'November 9, 2025',
    read_time: '10 min',
    excerpt:
      'Clinical interoperability without exposing the EHR on the public internet.',
    content:
      'Okapi Hospitals reference architecture: Edge FHIR gateways, clinical event queues and role-based access for care teams.',
    tags: ['FHIR', 'Hospital', 'Edge', 'Interop'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'inside-okapi-sre-culture',
    title: 'Inside Okapi : culture SRE et SLO client',
    category: 'Inside Okapi',
    author: 'SRE Guild',
    date_label: '22 Octobre 2025',
    read_time: '6 min',
    excerpt:
      'Comment nous définissons les SLO produit et les error budgets avec nos clients enterprise.',
    content:
      'Processus trimestriels, revues d’incidents blameless et automatisation des runbooks. Transparence des SLI Edge vers les comités IT des grands comptes.',
    tags: ['SRE', 'SLO', 'Culture', 'Enterprise'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'inside-okapi-sre-culture',
    title: 'Inside Okapi: SRE culture and customer SLOs',
    category: 'Inside Okapi',
    author: 'SRE Guild',
    date_label: 'October 22, 2025',
    read_time: '6 min',
    excerpt:
      'How we define product SLOs and error budgets with enterprise customers.',
    content:
      'Quarterly rituals, blameless incident reviews and runbook automation. Edge SLI transparency for enterprise IT steering committees.',
    tags: ['SRE', 'SLO', 'Culture', 'Enterprise'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'fuel-iot-anti-fraud',
    title: 'IoT stations : détecter la fraude carburant',
    category: 'Guides métiers',
    author: 'FuelOils Product',
    date_label: '3 Septembre 2025',
    read_time: '8 min',
    excerpt:
      'Corréler télémétrie cuves, tickets pompe et caisse pour réduire les écarts.',
    content:
      'Méthodologie Okapi FuelOils : seuils d’alerte, modèles d’anomalie et workflows d’investigation pour réseaux multi-pays.',
    tags: ['Fuel', 'IoT', 'Fraude', 'Ops'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'fuel-iot-anti-fraud',
    title: 'Station IoT: detecting fuel fraud',
    category: 'Industry Guides',
    author: 'FuelOils Product',
    date_label: 'September 3, 2025',
    read_time: '8 min',
    excerpt:
      'Correlate tank telemetry, pump tickets and POS to shrink variance.',
    content:
      'Okapi FuelOils methodology: alert thresholds, anomaly models and investigation workflows for multi-country networks.',
    tags: ['Fuel', 'IoT', 'Fraud', 'Ops'],
    published: true,
  },
];

export const SEED_JOBS: SeedJob[] = [
  {
    locale: 'fr',
    title: 'Staff Engineer — Plateforme Edge',
    department: 'Ingénierie Systems',
    location: 'Remote EU / Afrique (CET)',
    type: 'CDI',
    summary:
      'Concevoir les runtimes Edge multi-tenant, la synchro CRDT et les garde-fous de souveraineté données.',
    responsibilities: [
      'Architecturer les services Edge Rust / TypeScript',
      'Définir SLOs et chaos engineering multi-région',
      'Mentorer les squads produit verticales',
      'Piloter les revues de sécurité et de capacité',
    ],
    requirements: [
      '8+ ans systèmes distribués',
      'Expérience offline-first / CRDT ou equivalent',
      'Excellence en Rust ou Go + TypeScript',
      'Anglais professionnel ; français un plus',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Staff Engineer — Edge Platform',
    department: 'Systems Engineering',
    location: 'Remote EU / Africa (CET)',
    type: 'Full-time',
    summary:
      'Design multi-tenant Edge runtimes, CRDT sync and data-sovereignty guardrails.',
    responsibilities: [
      'Architect Edge services in Rust / TypeScript',
      'Own multi-region SLOs and chaos engineering',
      'Mentor vertical product squads',
      'Drive security and capacity reviews',
    ],
    requirements: [
      '8+ years distributed systems',
      'Offline-first / CRDT experience or equivalent',
      'Strong Rust or Go + TypeScript',
      'Professional English; French is a plus',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'Product Manager — Syntix Pharma',
    department: 'Produit',
    location: 'Paris / Hybrid',
    type: 'CDI',
    summary:
      'Porter la roadmap conformité, traçabilité GS1 et expérience officine pour Syntix.',
    responsibilities: [
      'Découvrir les besoins pharmacies & grossistes',
      'Prioriser backlog conformité fiscale / GS1',
      'Mesurer adoption et NPS segment santé',
      'Collaborer avec Engineering et Customer Success',
    ],
    requirements: [
      '5+ ans Product B2B SaaS',
      'Culture réglementaire santé ou retail pharma',
      'Maîtrise discovery continue et analytics',
      'FR / EN bilingue',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Product Manager — Syntix Pharma',
    department: 'Product',
    location: 'Paris / Hybrid',
    type: 'Full-time',
    summary:
      'Own the compliance, GS1 traceability and pharmacy UX roadmap for Syntix.',
    responsibilities: [
      'Discover pharmacy & wholesaler needs',
      'Prioritize fiscal / GS1 compliance backlog',
      'Measure adoption and healthcare NPS',
      'Partner with Engineering and Customer Success',
    ],
    requirements: [
      '5+ years B2B SaaS product',
      'Healthcare or pharma retail regulatory literacy',
      'Strong continuous discovery & analytics',
      'Bilingual FR / EN',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'Solutions Architect — Secteur public & éducation',
    department: 'Opérations',
    location: 'Dakar / Remote Afrique de l’Ouest',
    type: 'CDI',
    summary:
      'Concevoir des architectures Okapi Edu multi-campus pour ministères et groupes scolaires.',
    responsibilities: [
      'Workshops techniques et cartographie intégrations',
      'Rédiger HLD / LLD et plans de migration',
      'Accompagner les PoC et go-lives',
      'Remonter la voix terrain au Product',
    ],
    requirements: [
      'Expérience SI éducation ou ERP campus',
      'Aisance stakeholders institutionnels',
      'Bases sécurité et data residency',
      'FR courant ; EN professionnel',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Solutions Architect — Public sector & education',
    department: 'Operations',
    location: 'Dakar / Remote West Africa',
    type: 'Full-time',
    summary:
      'Design multi-campus Okapi Edu architectures for ministries and school groups.',
    responsibilities: [
      'Technical workshops and integration mapping',
      'Author HLD / LLD and migration plans',
      'Support PoCs and go-lives',
      'Feed field insights back to Product',
    ],
    requirements: [
      'Education SI or campus ERP experience',
      'Comfort with institutional stakeholders',
      'Security and data-residency fundamentals',
      'Fluent French; professional English',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'Security Engineer — AppSec & Edge',
    department: 'Sécurité & Infra',
    location: 'Remote Worldwide',
    type: 'CDI',
    summary:
      'Renforcer le SDLC, les revues threat modeling et le hardening des nœuds Edge.',
    responsibilities: [
      'Threat modeling des produits verticaux',
      'Automatiser SAST/DAST et policies supply chain',
      'Auditer configurations cloud / Edge',
      'Gérer le programme bug bounty',
    ],
    requirements: [
      '5+ ans AppSec ou Security Engineering',
      'Connaissance OWASP ASVS / CIS',
      'Expérience conteneurs et secrets management',
      'EN professionnel requis',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Security Engineer — AppSec & Edge',
    department: 'Security & Infra',
    location: 'Remote Worldwide',
    type: 'Full-time',
    summary:
      'Strengthen the SDLC, threat-modeling reviews and Edge node hardening.',
    responsibilities: [
      'Threat-model vertical products',
      'Automate SAST/DAST and supply-chain policies',
      'Audit cloud / Edge configurations',
      'Run the bug-bounty program',
    ],
    requirements: [
      '5+ years AppSec or Security Engineering',
      'OWASP ASVS / CIS literacy',
      'Containers and secrets management experience',
      'Professional English required',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'ML Engineer — Demande & stock santé',
    department: 'IA & Research',
    location: 'Remote EU',
    type: 'CDI',
    summary:
      'Industrialiser les modèles de prévision de demande pour Syntix et Hospitals.',
    responsibilities: [
      'Feature stores et pipelines d’entraînement',
      'Évaluation biais et drift en production',
      'Collaboration data product & cliniciens',
      'Documentation MLOps reproducible',
    ],
    requirements: [
      'Expérience forecasting / time series',
      'Python, SQL, orchestration (Airflow/Prefect)',
      'Sensibilité données de santé',
      'EN technique ; FR un plus',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'ML Engineer — Healthcare demand & inventory',
    department: 'AI & Research',
    location: 'Remote EU',
    type: 'Full-time',
    summary:
      'Industrialize demand-forecasting models for Syntix and Hospitals.',
    responsibilities: [
      'Feature stores and training pipelines',
      'Bias and drift evaluation in production',
      'Partner with data product and clinicians',
      'Reproducible MLOps documentation',
    ],
    requirements: [
      'Forecasting / time-series experience',
      'Python, SQL, orchestration (Airflow/Prefect)',
      'Healthcare data sensitivity',
      'Technical English; French is a plus',
    ],
    published: true,
  },
];

export const SEED_PRESS: SeedPress[] = [
  {
    locale: 'fr',
    title: 'Okapi Edge lève une extension Series B pour accélérer l’Edge souverain',
    date_label: '15 Janvier 2026',
    category: 'Corporate',
    summary:
      'Financement destiné à renforcer les nœuds régionaux Afrique–Europe–Golfe et à industrialiser Okapi Edu & Syntix.',
    download_url: 'https://okapiedge.com/press/series-b-extension-2026-fr.pdf',
    published: true,
  },
  {
    locale: 'en',
    title: 'Okapi Edge raises Series B extension to accelerate sovereign Edge',
    date_label: 'January 15, 2026',
    category: 'Corporate',
    summary:
      'Proceeds expand Africa–Europe–Gulf regional nodes and industrialize Okapi Edu & Syntix.',
    download_url: 'https://okapiedge.com/press/series-b-extension-2026-en.pdf',
    published: true,
  },
  {
    locale: 'fr',
    title: 'Partenariat stratégique : déploiement Okapi Hospitals dans 40 établissements',
    date_label: '2 Mars 2026',
    category: 'Partenariats',
    summary:
      'Signature d’un contrat cadre multi-années pour moderniser les SIH avec Edge souverain et interop FHIR.',
    published: true,
  },
  {
    locale: 'en',
    title: 'Strategic partnership: Okapi Hospitals across 40 facilities',
    date_label: 'March 2, 2026',
    category: 'Partnerships',
    summary:
      'Multi-year framework to modernize hospital information systems with sovereign Edge and FHIR interop.',
    published: true,
  },
  {
    locale: 'fr',
    title: 'Certification ISO 27001 & contrôles SOC 2 Type II renouvelés',
    date_label: '20 Novembre 2025',
    category: 'Sécurité & Conformité',
    summary:
      'Renouvellement des audits indépendants couvrant plateforme cloud, nœuds Edge et SDLC.',
    download_url: 'https://okapiedge.com/press/iso27001-soc2-2025-fr.pdf',
    published: true,
  },
  {
    locale: 'en',
    title: 'ISO 27001 certification & SOC 2 Type II controls renewed',
    date_label: 'November 20, 2025',
    category: 'Security & Compliance',
    summary:
      'Independent audits renewed covering cloud platform, Edge nodes and SDLC.',
    download_url: 'https://okapiedge.com/press/iso27001-soc2-2025-en.pdf',
    published: true,
  },
  {
    locale: 'fr',
    title: 'Okapi POS franchit 18 500 points de vente actifs mondiaux',
    date_label: '8 Juillet 2025',
    category: 'Produit',
    summary:
      'Milestone retail : disponibilité Edge 99.999 % et volume annuel traité supérieur à 680 M$.',
    published: true,
  },
  {
    locale: 'en',
    title: 'Okapi POS surpasses 18,500 active registers worldwide',
    date_label: 'July 8, 2025',
    category: 'Product',
    summary:
      'Retail milestone: 99.999% Edge availability and $680M+ annual processed volume.',
    published: true,
  },
];

export const SEED_INQUIRIES = [
  {
    kind: 'b2b' as const,
    locale: 'fr',
    full_name: 'Aïcha Diop',
    organization: 'Groupe Éducatif Horizon',
    email: 'a.diop@horizon-edu.sn',
    phone: '+221 77 000 00 00',
    interest: 'Okapi Edu',
    message: 'Demande de démonstration multi-campus (45 établissements).',
    status: 'new' as const,
  },
  {
    kind: 'b2b' as const,
    locale: 'en',
    full_name: 'James Okonkwo',
    organization: 'Lagos Retail Collective',
    email: 'j.okonkwo@lrc.ng',
    phone: '+234 801 000 0000',
    interest: 'Okapi POS',
    message: 'Pilot for 120 stores with offline-first requirements.',
    status: 'in_progress' as const,
  },
  {
    kind: 'investor' as const,
    locale: 'en',
    full_name: 'Elena Vargas',
    organization: 'Atlas Growth Partners',
    email: 'elena@atlasgp.com',
    interest: 'Series B follow-on',
    message: 'Requesting data room access under NDA.',
    status: 'new' as const,
  },
  {
    kind: 'newsletter' as const,
    locale: 'fr',
    full_name: 'Subscriber',
    email: 'cto@healthnet.ci',
    interest: 'newsletter',
    message: 'Inscription insights santé & Edge',
    status: 'closed' as const,
  },
];

export const SEED_SETTINGS = [
  {
    key: 'site.brand',
    value: {
      name: 'Okapi Edge',
      tagline_fr: 'Infrastructure logicielle souveraine pour l’économie réelle',
      tagline_en: 'Sovereign software infrastructure for the real economy',
      locales: ['fr', 'en'],
      default_locale: 'fr',
    },
  },
  {
    key: 'site.contact',
    value: {
      sales_email: 'partnerships@okapiedge.com',
      press_email: 'press@okapiedge.com',
      security_email: 'security@okapiedge.com',
      hq: 'Global — Edge nodes EU / AF / ME',
    },
  },
  {
    key: 'cms.flags',
    value: {
      blog_enabled: true,
      careers_enabled: true,
      press_enabled: true,
      investors_modal: true,
      i18n: true,
    },
  },
];
