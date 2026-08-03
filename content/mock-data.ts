import { SaasProduct, TeamMember, JobOpening, BlogPost, PressRelease } from '@/types';

export const SAAS_PRODUCTS: SaasProduct[] = [
  {
    id: 'okapi-edu',
    name: 'Okapi Edu',
    subtitle: 'Global Next-Gen Learning Operating System',
    tagline: 'Le SaaS d’infrastructure mondiale pour institutions scolaires et universitaires.',
    category: 'Éducation & Formation Globale',
    description: 'Une plateforme unifiée réunissant administration, pédagogie, finance, IA décisionnelle et portails étudiants dans plus de 45 pays.',
    fullDescription: 'Okapi Edu est la plateforme de gestion éducative mondiale développée par Okapi Edge. Elle orchestre le cycle complet d’apprentissage, de l’inscription multi-devises au bulletin certifié par signature cryptographique, tout en intégrant des passerelles financières internationales et locales (Stripe, SWIFT, Mobile Money).',
    tags: ['IA Détection & Suivi Académique', 'Multi-Campus International', 'Paiements Multi-Devises', 'Edge Synchronisation Offline'],
    metrics: [
      { label: 'Satisfaction Utilisateurs', value: '98.5%' },
      { label: 'Rendement Administratif', value: '+42%' },
      { label: 'Étudiants & Élevés Gérés', value: '2.8M+' },
      { label: 'Disponibilité Edge Global', value: '99.99%' }
    ],
    features: [
      { title: 'IA Analytics Académique', desc: 'Analyse comportementale et académique en temps réel pour optimiser le parcours de chaque apprenant.', icon: 'BrainCircuit' },
      { title: 'Moteur Financier Multi-Devises', desc: 'Gestion automatisée des frais, réconciliation bancaire instantanée et conformité fiscale locale.', icon: 'Wallet' },
      { title: 'Gestion Multi-Campus Mondial', desc: 'Supervision globale pour réseaux d’écoles et universités avec règles de souveraineté territoriales.', icon: 'Building2' },
      { title: 'Espace Étudiant & App PWA Native', desc: 'Accès fluide, notifications multilingues et suivi en temps réel sur mobile, web et desktop.', icon: 'Smartphone' }
    ],
    subdomainUrl: 'https://edu.okapiedge.com',
    badge: 'Enterprise Education Suite',
    color: '#7B2FFF',
    bgGradient: 'from-purple-900/30 via-slate-900 to-slate-950'
  },
  {
    id: 'syntix-pharma',
    name: 'Syntix Pharma',
    subtitle: 'Global Intelligent Healthcare ERP',
    tagline: 'L’ERP pharmaceutique international qui sécurise la chaîne logistique et anticipe la demande.',
    category: 'Santé & Logistique Médicale',
    description: 'Pilotez vos officines, réseaux de distribution et stocks de santé avec modélisation prédictive, traçabilité Datamatrix et conformité e-DGI / fiscale globale.',
    fullDescription: 'Syntix Pharma par Okapi Edge est l’ERP de santé de référence internationale. Il sécurise la supply chain des médicaments, assure la traçabilité contre la contrefaçon, anticipe les ruptures de stock grâce à l’IA contextuelle et garantit la conformité fiscale automatisée en temps réel.',
    tags: ['Traçabilité Datamatrix / GS1', 'Facturation Normalisée Temps Réel', 'IA Réapprovisionnement', 'Offline Edge Synchro'],
    metrics: [
      { label: 'Conformité Fiscale Temps Réel', value: '100%' },
      { label: 'Réduction des Ruptures', value: '-35%' },
      { label: 'Produits Traqués', value: '84M+' },
      { label: 'Pertes Périmés Évitées', value: '-92%' }
    ],
    features: [
      { title: 'Facturation & Conformité Instantanée', desc: 'Signature cryptographique et télétransmission aux autorités fiscales en moins de 100ms.', icon: 'Receipt' },
      { title: 'Traçabilité FEFO & Lots Sensibles', desc: 'Gestion First-Expired, First-Out rigoureuse pour bloquer les produits échus et sécuriser la chaîne du froid.', icon: 'ShieldAlert' },
      { title: 'Intelligence Prédictive de Stock', desc: 'Modèles IA prédisant les pics de demande épidémiques ou saisonniers à l’échelle globale et régionale.', icon: 'TrendingUp' },
      { title: 'Anti-Contrefaçon Scan GS1', desc: 'Validation instantanée du Datamatrix des produits pharmaceutiques à la réception et à la vente.', icon: 'Scan' }
    ],
    subdomainUrl: 'https://syntix.okapiedge.com',
    badge: 'Global Health Standard',
    color: '#38BDF8',
    bgGradient: 'from-sky-900/30 via-slate-900 to-slate-950'
  },
  {
    id: 'okapi-pos',
    name: 'Okapi POS',
    subtitle: 'Universal Retail Edge Infrastructure',
    tagline: 'Encaissez, synchronisez et gérez votre commerce mondial sans aucune interruption.',
    category: 'Retail & Global Commerce',
    description: 'Une plateforme de point de vente ultra-rapide bâtie en Rust & Tauri, fonctionnant à 100% hors-ligne et synchronisée sur des nœuds cloud mondiaux.',
    fullDescription: 'Okapi POS redéfinit les systèmes de caisse modernes à l’échelle internationale. Conçu pour résister aux pannes réseau grâce à son moteur Offline-First et sa vitesse d’exécution sub-milliseconde, Okapi POS accepte cartes bancaires, paiements sans contact, crypto-actifs et passerelles mobiles.',
    tags: ['Moteur Rust / Tauri Ultra-Léger', 'Synchro Multi-Nœuds Offline', 'Facturation Globale Unifiée', 'Multi-Boutiques & Entrepôts'],
    metrics: [
      { label: 'SLA Edge Availability', value: '99.999%' },
      { label: 'Vitesse de Transaction', value: '<800ms' },
      { label: 'Points de Vente Actifs', value: '18,500+' },
      { label: 'Volume Annuel Traité', value: '$680M+' }
    ],
    features: [
      { title: 'Exécutable Natif High-Speed', desc: 'Architecture Tauri / Rust légère offrant une fluidité maximale sur tablette, caisse enregistreuse et mobile.', icon: 'Zap' },
      { title: 'Synchronisation Offline-First CRDT', desc: 'Les ventes continuent sans Internet. La resynchronisation s’effectue automatiquement dès reconnexion.', icon: 'WifiOff' },
      { title: 'Gestion Multi-Boutiques & Entrepôts', desc: 'Supervision globale des stocks, transferts inter-sites et bilans financiers en temps réel.', icon: 'Store' },
      { title: 'Facturation & Contexte Fiscal Dynamic', desc: 'Adaptation automatique aux taxes locales, TVA, e-DGI et normes comptables internationales.', icon: 'FileText' }
    ],
    subdomainUrl: 'https://pos.okapiedge.com',
    badge: 'High-Performance POS',
    color: '#00F2FE',
    bgGradient: 'from-cyan-900/30 via-slate-900 to-slate-950'
  },
  {
    id: 'okapi-hospitals',
    name: 'Okapi Hospitals (SIH)',
    subtitle: 'Système d’Information Hospitalier Intégré',
    tagline: 'Gérez l’ensemble de vos centres hospitaliers, urgences et dossiers patients informatisés.',
    category: 'Santé & Ingénierie Hospitalière',
    description: 'Une solution clé en main pour hôpitaux, cliniques et centres de santé : dossier médical partagé (DMP), gestion des lits, pharmacie hospitalière, imagerie PACS et facturation médicale.',
    fullDescription: 'Okapi Hospitals (SIH) est la plateforme logicielle de gestion hospitalière conçue pour fluidifier le parcours patient et optimiser les ressources médicales. Du tri aux urgences à la gestion du bloc opératoire et de la pharmacie, Okapi Hospitals garantit un suivi médical précis et la confidentialité absolue des données de santé.',
    tags: ['Dossier Médical Partagé (DMP)', 'Gestion Hôpital & Lits', 'Imagerie & PACS', 'Conformité Données de Santé'],
    metrics: [
      { label: 'Temps d’Attente Réduit', value: '-45%' },
      { label: 'Efficacité Administrative', value: '+60%' },
      { label: 'Dossiers Patients Sécurisés', value: '1.2M+' },
      { label: 'Disponibilité Système', value: '99.99%' }
    ],
    features: [
      { title: 'Dossier Patient Informatisé (DPI)', desc: 'Centralisation de l’historique médical, ordonnances, constantes et comptes-rendus en temps réel.', icon: 'Stethoscope' },
      { title: 'Gestion des Admissions & Lits', desc: 'Suivi dynamique de l’occupation des chambres, plannings de garde et transferts inter-services.', icon: 'Building2' },
      { title: 'Pharmacie Hospitalière & Stocks', desc: 'Gestion précise du stock de médicaments, traçabilité des consommables et alertes de péremption.', icon: 'Pill' },
      { title: 'Facturation & Prise en Charge', desc: 'Intégration directe avec les assurances, mutuelles et passerelles fiscales pour une facturation simplifiée.', icon: 'Receipt' }
    ],
    subdomainUrl: 'https://hospitals.okapiedge.com',
    badge: 'Hospital Suite SIH',
    color: '#10B981',
    bgGradient: 'from-emerald-900/30 via-slate-900 to-slate-950'
  },
  {
    id: 'okapi-fueloils',
    name: 'Okapi FuelOils',
    subtitle: 'Downstream Oil & Fuel Management Platform',
    tagline: 'Pilotez vos réseaux de stations-services, volucompteurs et dépôts pétroliers.',
    category: 'Énergie & Distribution Pétrolière',
    description: 'Solution globale pour la distribution de carburants : télémesure des cuves en temps réel, gestion des cartes carburant, automatisation des pompes et contrôle anti-fraude.',
    fullDescription: 'Okapi FuelOils est la plateforme dédiée aux distributeurs de produits pétroliers et réseaux de stations-services. Elle interconnecte les pistolets de distribution, les jauges de cuves et les systèmes d’encaissement pour offrir une visibilité totale sur les flux de carburant, prévenir les coullages et simplifier la comptabilité.',
    tags: ['Télémesure Cuves', 'Cartes Flotte & Prépayé', 'Automatisation Pompes', 'Contrôle Douanier & Fiscal'],
    metrics: [
      { label: 'Réduction des Pertes/Coullages', value: '-85%' },
      { label: 'Stations Connectées', value: '3,200+' },
      { label: 'Volume Carburant Suivi', value: '1.4B Litres' },
      { label: 'Précision Téléjaugeage', value: '99.8%' }
    ],
    features: [
      { title: 'Télémesure & Jaugeage des Cuves', desc: 'Surveillance continue des niveaux de carburant et détection automatique des fuites ou anomalies.', icon: 'Fuel' },
      { title: 'Gestion de Cartes Flotte & Prépayé', desc: 'SaaS de gestion des cartes d’entreprise avec plafonds, restrictions horaires et géofencing.', icon: 'CreditCard' },
      { title: 'Automatisation des Volucompteurs', desc: 'Connexion directe aux pompes pour un enregistrement automatique de chaque transaction sans saisie manuelle.', icon: 'Zap' },
      { title: 'Supervision Multi-Stations', desc: 'Tableau de bord centralisé pour analyser les ventes, stocks et marges de l’ensemble du réseau.', icon: 'TrendingUp' }
    ],
    subdomainUrl: 'https://fueloils.okapiedge.com',
    badge: 'Energy Distribution OS',
    color: '#F59E0B',
    bgGradient: 'from-amber-900/30 via-slate-900 to-slate-950'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'patrick-mwamba',
    name: 'Patrick Mwamba',
    role: 'Founder & Chief Executive Officer (CEO)',
    bio: 'Ancien Lead Architect chez un géant mondial des télécoms, fondateur d’Okapi Edge pour concevoir les plateformes d’infrastructure de nouvelle génération.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    linkedin: 'https://www.linkedin.com/company/okapi-edge',
  },
  {
    id: 'chantal-kalala',
    name: 'Dr. Chantal Kalala',
    role: 'Chief Technology Officer (CTO)',
    bio: 'Docteure en Systèmes Distribués et IA (Sorbonne), pionnière des architectures edge résilientes et des moteurs de synchronisation locale.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    linkedin: 'https://www.linkedin.com/company/okapi-edge',
  },
  {
    id: 'kabila-tshilenge',
    name: 'Kabila Tshilenge',
    role: 'VP Global Product & Healthcare Lead',
    bio: '15 ans d’expérience internationale dans la gestion de supply chains critiques et de logiciels de santé haute disponibilité.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    linkedin: 'https://www.linkedin.com/company/okapi-edge',
  },
  {
    id: 'grace-bopamu',
    name: 'Grâce Bopamu',
    role: 'VP Infrastructure & Sovereign Cloud',
    bio: 'Expert international en cybersécurité offensive et clusters bare-metal distribués. Supervisant le réseau mondial de nœuds Okapi Edge.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400',
    linkedin: 'https://www.linkedin.com/company/okapi-edge',
  },
];

/** Fallback contact when Surreal settings are unavailable. */
export const DEFAULT_SITE_CONTACT = {
  email: 'contact@okapiedge.com',
  phone: '+243 81 900 0000',
  salesEmail: 'partnerships@okapiedge.com',
  pressEmail: 'press@okapiedge.com',
  securityEmail: 'security@okapiedge.com',
  locationShort: {
    fr: 'Kinshasa · Afrique / Monde',
    en: 'Kinshasa · Africa / Global',
  },
  hq: {
    fr: {
      title: 'Quartier Général Kinshasa',
      addressLine1: 'Boulevard du 30 Juin, Immeuble Okapi, 4ème étage',
      addressLine2: 'Commune de la Gombe, Kinshasa, RDC',
    },
    en: {
      title: 'Kinshasa Headquarters',
      addressLine1: 'Boulevard du 30 Juin, Immeuble Okapi, 4th floor',
      addressLine2: 'Commune de la Gombe, Kinshasa, DRC',
    },
  },
} as const;

/** Fallback legal notice when Surreal settings are unavailable. */
export const DEFAULT_SITE_LEGAL = {
  entityType: 'etablissement',
  entityLabel: {
    fr: 'établissement',
    en: 'establishment',
  },
  registration: 'CD/KIN/RCCM/24-B-01492',
  legalName: 'Okapi Edge',
  header: {
    fr: {
      badge: 'Cadre Légal & Conformité',
      title: 'Mentions Légales & Politique de Confidentialité',
      updatedAt: 'Dernière mise à jour : Juillet 2026 • République Démocratique du Congo',
    },
    en: {
      badge: 'Legal Framework & Compliance',
      title: 'Legal Notice & Privacy Policy',
      updatedAt: 'Last updated: July 2026 • Democratic Republic of the Congo',
    },
  },
  sections: {
    publisher: {
      fr: {
        title: '1. Éditeur du Site',
        body: 'Le site okapiedge.com est édité par Okapi Edge, établissement d’ingénierie logicielle immatriculé sous le numéro CD/KIN/RCCM/24-B-01492.',
        footer:
          'Siège : Boulevard du 30 Juin, Immeuble Okapi, Gombe, Kinshasa, RDC.\nDirecteur de la Publication : Patrick Mwamba, Président-Directeur Général.',
      },
      en: {
        title: '1. Site Publisher',
        body: 'The okapiedge.com website is published by Okapi Edge, a software engineering establishment registered under number CD/KIN/RCCM/24-B-01492.',
        footer:
          'Registered seat: Boulevard du 30 Juin, Immeuble Okapi, Gombe, Kinshasa, DRC.\nPublication Director: Patrick Mwamba, Chief Executive Officer.',
      },
    },
    hosting: {
      fr: {
        title: '2. Hébergement & Cloud Souverain',
        body: 'L’intégralité des données du site et des plateformes SaaS associées (Okapi Edu, Syntix Pharma, Okapi POS, Okapi Hospitals, Okapi FuelOils) est hébergée sur l’infrastructure de cloud souverain opérée par Okapi Edge au sein de datacenters sécurisés.',
      },
      en: {
        title: '2. Hosting & Sovereign Cloud',
        body: 'All website data and associated SaaS platforms (Okapi Edu, Syntix Pharma, Okapi POS, Okapi Hospitals, Okapi FuelOils) are hosted on the sovereign cloud infrastructure operated by Okapi Edge in secure datacenters.',
      },
    },
    data: {
      fr: {
        title: '3. Protection des Données Personnelles & e-DGI',
        body: 'Conformément à la réglementation sur la protection des données à caractère personnel et aux exigences de conformité, Okapi Edge garantit le chiffrement AES-256 de toutes les données sensibles.',
      },
      en: {
        title: '3. Personal Data Protection & e-DGI',
        body: 'In compliance with personal data protection regulations and applicable compliance requirements, Okapi Edge guarantees AES-256 encryption of all sensitive data.',
      },
    },
    ip: {
      fr: {
        title: '4. Propriété Intellectuelle',
        body: 'L’ensemble des contenus, marques, logos, visuels et architectures logicielles est la propriété exclusive de l’établissement Okapi Edge. Toute reproduction non autorisée constitue une contrefaçon sanctionnée par la loi.',
      },
      en: {
        title: '4. Intellectual Property',
        body: 'All content, trademarks, logos, visuals, and software architectures are the exclusive property of the Okapi Edge establishment. Any unauthorized reproduction constitutes an infringement punishable by law.',
      },
    },
  },
} as const;

/** Fallback About page copy when Surreal settings are unavailable. */
export const DEFAULT_SITE_ABOUT = {
  hero: {
    fr: {
      eyebrow: 'Histoire, Équipe & ADN Global',
      title: 'À Propos d’Okapi Edge',
      description:
        'Un groupe technologique international développant des plateformes SaaS d’entreprise et une infrastructure Edge distribuée.',
    },
    en: {
      eyebrow: 'History, Team & Global DNA',
      title: 'About Okapi Edge',
      description:
        'An international technology group building enterprise SaaS platforms and distributed Edge infrastructure.',
    },
  },
  history: {
    fr: {
      eyebrow: 'L’Histoire Fondatrice',
      title: 'L’Excellence logicielle et la vitesse Edge.',
      body1:
        'Fondé par des chercheurs et ingénieurs issus de centres de recherche et d’entreprises technologiques de premier plan, Okapi Edge a été conçu pour résoudre la complexité des systèmes d’information distribués.',
      body2:
        'Nous combinons le calcul en bordure de réseau (Edge Computing), la synchronisation CRDT temps réel et une architecture sécurisée Zero-Trust pour éditer des SaaS d’entreprise ultra-performants.',
    },
    en: {
      eyebrow: 'The Founding Story',
      title: 'Software excellence at Edge speed.',
      body1:
        'Founded by researchers and engineers from leading research centers and technology companies, Okapi Edge was created to tackle the complexity of distributed information systems.',
      body2:
        'We combine Edge Computing, real-time CRDT synchronization, and a Zero-Trust security architecture to ship ultra-performant enterprise SaaS.',
    },
  },
  timeline: [
    {
      year: '2024',
      fr: 'Fondation d’Okapi Edge et R&D Architecture Distribuée',
      en: 'Founding of Okapi Edge and R&D on distributed architecture',
    },
    {
      year: '2025',
      fr: 'Déploiement des premières plateformes Okapi Edu & Syntix Pharma',
      en: 'Rollout of the first Okapi Edu and Syntix Pharma platforms',
    },
    {
      year: '2026',
      fr: 'Lancement du Réseau Edge Multi-Régions & Expansion Internationale',
      en: 'Launch of the multi-region Edge network and international expansion',
    },
  ],
  governance: {
    fr: {
      eyebrow: 'Gouvernance Exécutive',
      title: 'L’Équipe Dirigeante',
      description:
        'Un collectif de stratèges, chercheurs et bâtisseurs engagés pour l’excellence.',
      hqLabel: 'Siège mondial',
    },
    en: {
      eyebrow: 'Executive Governance',
      title: 'Leadership Team',
      description: 'A collective of strategists, researchers, and builders committed to excellence.',
      hqLabel: 'Global HQ',
    },
  },
  ambition: {
    fr: {
      title: 'Vous partagez notre ambition ?',
      description:
        'Nous recrutons continuellement des ingénieurs systèmes, UX designers et product managers de classe mondiale.',
      cta: 'Découvrir nos Opportunités',
    },
    en: {
      title: 'Do you share our ambition?',
      description:
        'We are continuously hiring world-class systems engineers, UX designers, and product managers.',
      cta: 'Explore Opportunities',
    },
  },
} as const;

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Rust & Systems Engineer (Edge Sync Engine)',
    department: 'Ingénierie Systems',
    location: 'Distribué / Remote International',
    type: 'CDI / Full-time',
    summary: 'Rejoignez l’équipe Core Infrastructure pour concevoir nos moteurs de synchronisation temps réel haute vitesse en Rust & Tauri.',
    responsibilities: [
      'Développer des algorithmes CRDT (Conflict-free Replicated Data Types) pour les déploiements edge.',
      'Optimiser la consommation mémoire et CPU pour des environnements distribués.',
      'Assurer le chiffrement zéro-confiance (Zero-Trust) des enclaves de données.'
    ],
    requirements: [
      '5+ ans d’expérience en Rust, C++ ou Go pour systèmes distribués.',
      'Maîtrise des bases de données embarquées (SQLite / DuckDB / RocksDB).',
      'Excellente compréhension des réseaux tolérants aux pannes.'
    ]
  },
  {
    id: 'job-[#2]',
    title: 'Staff Full-Stack Engineer (TypeScript / React / Go)',
    department: 'Ingénierie SaaS',
    location: 'Remote ou Hubs Okapi Edge',
    type: 'CDI / Full-time',
    summary: 'Concevez les interfaces et microservices critiques de la suite de produits Okapi Edge.',
    responsibilities: [
      'Architecture de microservices gRPC et REST distribués.',
      'Implémentation de dashboards d’entreprise ultra-réactifs avec React et Tailwind CSS.',
      'Revue de code rigoureuse et optimisation des temps de rendu.'
    ],
    requirements: [
      'Excellente maîtrise de React, TypeScript, Next.js / Vite, Tailwind et Go ou Node.',
      'Expérience confirmée sur des SaaS B2B à fort trafic international.'
    ]
  },
  {
    id: 'job-[#3]',
    title: 'Lead AI & Machine Learning Engineer',
    department: 'IA & Research',
    location: 'Remote International',
    type: 'CDI / Full-time',
    summary: 'Déployez des modèles prédictifs haute précision sur données distribuées pour la santé et l’éducation.',
    responsibilities: [
      'Fine-tuning et déploiement de modèles LLM légers et algorithmes prédictifs.',
      'Optimisation ONNX / Edge AI pour l’exécution sur nœuds locaux.',
      'Garantir l’anonymisation et la confidentialité stricte des données.'
    ],
    requirements: [
      'Master ou PhD en Machine Learning, Computer Science ou discipline quantitative.',
      'Expérience pratique avec PyTorch, ONNX, TensorRT et architectures LLM.'
    ]
  },
  {
    id: 'job-[#4]',
    title: 'Senior Product Manager - Enterprise SaaS',
    department: 'Produit',
    location: 'Remote International',
    type: 'CDI / Full-time',
    summary: 'Pilotez la vision et l’exécution des solutions verticales Syntix Pharma et Okapi POS.',
    responsibilities: [
      'Définir la feuille de route produit globale en interaction avec les clients grands comptes.',
      'Prioriser les exigences d’interopérabilité et de conformité réglementaire.',
      'Collaborer étroitement avec les équipes Design et Engineering.'
    ],
    requirements: [
      '5+ ans d’expérience en Product Management B2B SaaS d’envergure mondiale.',
      'Excellentes capacités analytiques et leadership produit.'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'La Révolution de l’Edge Computing & Offline-First dans le SaaS d’Entreprise Global',
    slug: 'edge-computing-offline-first-enterprise-saas',
    category: 'Tech & Edge Architecture',
    author: 'Dr. Chantal Kalala',
    date: '28 Juillet 2026',
    readTime: '6 min de lecture',
    excerpt: 'Pourquoi les entreprises modernes exigent des applications capables de fonctionner instantanément, même en cas de rupture réseau globale.',
    content: `Dans un monde où la continuité opérationnelle est critique, s’appuyer uniquement sur une connexion Cloud centralisée crée une vulnérabilité systémique.

Les micro-coupures réseau, les pannes de câbles sous-marins ou les surcharges d’infrastructures peuvent stopper la vente au détail, bloquer la délivrance de soins ou interrompre les examens universitaires.

### L’Approche Okapi Edge

Avec la suite **Okapi Edge**, nous avons inversé le paradigme :
1. **Exécution Locale Native** : Chaque instance fonctionne de manière autonome en local avec Rust & Tauri.
2. **Synchronisation CRDT** : Les données se réconcilient mathématiquement en tâche de fond dès qu'un réseau est disponible.
3. **Chiffrement Zéro-Confiance** : Les données restent scellées au repos avec des clés détenues exclusivement par l’entreprise.`,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    tags: ['Edge Computing', 'Offline-First', 'CRDT', 'Performance']
  },
  {
    id: 'post-2',
    title: 'Conformité Fiscale & Facturation Normalisée e-DGI : Le Guide d’Intégration d’Okapi Edge',
    slug: 'conformite-fiscale-facturation-normalisee-edgi-okapi-edge',
    category: 'Guides Métiers',
    author: 'Kabila Tshilenge',
    date: '12 Juillet 2026',
    readTime: '7 min de lecture',
    excerpt: 'Comment Syntix Pharma et Okapi POS exécutent les signatures cryptographiques fiscales en moins de 100ms avec télétransmission automatique.',
    content: `La conformité fiscale en temps réel est devenue un impératif réglementaire majeur. Pour les commerces et officines, le principal défi réside dans le maintien de la vitesse d'encaissement sans créer de goulot d'étranglement.

Grâce à nos connecteurs certifiés e-DGI et API fiscales, Okapi Edge génère la facture normalisée avec QR Code scellé de façon instantanée, offrant une conformité totale aux exigences étatiques tout en préservant la fluidité client.`,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    tags: ['e-DGI', 'Conformité', 'Facturation', 'Enterprise']
  },
  {
    id: 'post-3',
    title: 'Digitalisation des Grands Réseaux Universitaires : Retour sur la Déploiement d’Okapi Edu',
    slug: 'digitalisation-reseaux-universitaires-okapi-edu',
    category: 'Études de Cas',
    author: 'Patrick Mwamba',
    date: '02 Juin 2026',
    readTime: '5 min de lecture',
    excerpt: 'Analyse d’un déploiement sur 12 000+ étudiants : réduction de 85% des délais administratifs et automatisation complète des frais d’études.',
    content: `La gestion des inscriptions, du suivi académique et du contrôle des frais d'études pour un campus de grande envergure nécessite une plateforme ultra-fiable.

En déployant **Okapi Edu**, l’établissement a unifié le portail étudiant, la comptabilité et le carnet pédagogique en un seul espace sécurisé accessible en PWA, réduisant le temps d'attente administratif de 85%.`,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    tags: ['Okapi Edu', 'Éducation', 'SaaS', 'Efficacité']
  }
];

export const PRESS_RELEASES: PressRelease[] = [
  {
    id: 'press-1',
    title: 'Okapi Edge déploie son nouveau réseau de nœuds edge internationaux pour une latence sous les 10ms',
    date: '25 Juillet 2026',
    category: 'Annonce Corporate',
    summary: 'Okapi Edge renforce ses infrastructures distribuées mondiales pour offrir une disponibilité de 99.999% à sa suite de SaaS d’entreprise.'
  },
  {
    id: 'press-2',
    title: 'Certification de conformité e-DGI & Fiscale Globale obtenue pour Syntix Pharma & Okapi POS',
    date: '15 Juin 2026',
    category: 'Conformité & Partenariat',
    summary: 'Les moteurs d’encaissement d’Okapi Edge valident les normes de signature cryptographique en temps réel pour la distribution et la santé.'
  },
  {
    id: 'press-3',
    title: 'Okapi Edu dépasse le cap des 2.8 millions d’apprenants gérés sur sa plateforme',
    date: '10 Mai 2026',
    category: 'Croissance Produit',
    summary: 'Une adoption record pour le système d’exploitation éducatif d’Okapi Edge auprès des institutions scolaires et universitaires internationales.'
  }
];

export const MANIFESTO_TEXT = {
  quote: "Bâtir des logiciels d’infrastructure d’une fiabilité absolue, là où la performance et la résilience comptent le plus.",
  body: "Okapi Edge est un groupe technologique mondial éditant des plateformes SaaS d’entreprise à fort impact. Notre philosophie repose sur l’ingénierie de pointe, les architectures Edge Offline-First, le chiffrement zéro-confiance et une recherche constante de simplicité et d’élégance pour nos utilisateurs.",
  principles: [
    {
      title: "Résilience Edge & Offline-First",
      description: "Nos applications continuent de fonctionner à la vitesse maximale, même en cas d'interruption totale de la connectivité réseau."
    },
    {
      title: "Chiffrement & Souveraineté des Données",
      description: "Architecture zéro-confiance (Zero-Trust) garantissant la protection absolue et la gouvernance exclusive de vos données d'entreprise."
    },
    {
      title: "Intelligence Contextuelle Embarquée",
      description: "Algorithmes prédictifs intégrés au plus près du terrain pour anticiper la demande, la santé et les besoins éducatifs."
    },
    {
      title: "Ergonomie & Vitesse Sub-Milliseconde",
      description: "Des interfaces modernes et épurées qui éliminent toute friction et décuplent la productivité au quotidien."
    }
  ]
};

