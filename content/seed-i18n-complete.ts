/**
 * Complementary bilingual CMS content (FR/EN) — merged into full seed.
 * Covers original mock-data + additional enterprise articles, jobs, press, team, manifesto.
 */
import type { SeedJob, SeedPost, SeedPress } from './seed-enterprise';

export const EXTRA_POSTS: SeedPost[] = [
  {
    locale: 'fr',
    slug: 'edge-computing-offline-first-enterprise-saas',
    title:
      'La Révolution de l’Edge Computing & Offline-First dans le SaaS d’Entreprise Global',
    category: 'Tech & Edge Architecture',
    author: 'Dr. Chantal Kalala',
    date_label: '28 Juillet 2026',
    read_time: '6 min',
    excerpt:
      'Pourquoi les entreprises modernes exigent des applications capables de fonctionner instantanément, même en cas de rupture réseau globale.',
    content: `Dans un monde où la continuité opérationnelle est critique, s’appuyer uniquement sur une connexion Cloud centralisée crée une vulnérabilité systémique.

Les micro-coupures réseau, les pannes de câbles sous-marins ou les surcharges d’infrastructures peuvent stopper la vente au détail, bloquer la délivrance de soins ou interrompre les examens universitaires.

### L’Approche Okapi Edge

Avec la suite **Okapi Edge**, nous avons inversé le paradigme :
1. **Exécution Locale Native** : Chaque instance fonctionne de manière autonome en local avec Rust & Tauri.
2. **Synchronisation CRDT** : Les données se réconcilient mathématiquement en tâche de fond dès qu'un réseau est disponible.
3. **Chiffrement Zéro-Confiance** : Les données restent scellées au repos avec des clés détenues exclusivement par l’entreprise.`,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    tags: ['Edge Computing', 'Offline-First', 'CRDT', 'Performance'],
    seo_title: 'Edge Computing Offline-First — Okapi Edge',
    seo_description: 'Architecture SaaS résiliente pour continuité métier mondiale.',
    published: true,
  },
  {
    locale: 'en',
    slug: 'edge-computing-offline-first-enterprise-saas',
    title: 'The Edge Computing & Offline-First Revolution in Global Enterprise SaaS',
    category: 'Tech & Edge Architecture',
    author: 'Dr. Chantal Kalala',
    date_label: 'July 28, 2026',
    read_time: '6 min',
    excerpt:
      'Why modern enterprises require applications that keep running instantly — even during global network outages.',
    content: `When operational continuity is critical, relying solely on a centralized cloud connection creates systemic risk.

Network micro-outages, undersea cable failures or infrastructure overload can freeze retail checkout, block care delivery or interrupt university exams.

### The Okapi Edge Approach

With the **Okapi Edge** suite, we inverted the paradigm:
1. **Native local execution** — every instance runs autonomously with Rust & Tauri.
2. **CRDT synchronization** — data reconciles mathematically in the background when a network returns.
3. **Zero-trust encryption** — data stays sealed at rest with keys held exclusively by the enterprise.`,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    tags: ['Edge Computing', 'Offline-First', 'CRDT', 'Performance'],
    seo_title: 'Offline-First Edge Computing — Okapi Edge',
    seo_description: 'Resilient SaaS architecture for global business continuity.',
    published: true,
  },
  {
    locale: 'fr',
    slug: 'conformite-fiscale-facturation-normalisee-edgi-okapi-edge',
    title:
      'Conformité Fiscale & Facturation Normalisée e-DGI : Le Guide d’Intégration d’Okapi Edge',
    category: 'Guides Métiers',
    author: 'Kabila Tshilenge',
    date_label: '12 Juillet 2026',
    read_time: '7 min',
    excerpt:
      'Comment Syntix Pharma et Okapi POS exécutent les signatures cryptographiques fiscales en moins de 100ms avec télétransmission automatique.',
    content: `La conformité fiscale en temps réel est devenue un impératif réglementaire majeur. Pour les commerces et officines, le principal défi réside dans le maintien de la vitesse d'encaissement sans créer de goulot d'étranglement.

Grâce à nos connecteurs certifiés e-DGI et API fiscales, Okapi Edge génère la facture normalisée avec QR Code scellé de façon instantanée, offrant une conformité totale aux exigences étatiques tout en préservant la fluidité client.`,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    tags: ['e-DGI', 'Conformité', 'Facturation', 'Enterprise'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'conformite-fiscale-facturation-normalisee-edgi-okapi-edge',
    title: 'Fiscal Compliance & Normalized e-Invoicing: The Okapi Edge Integration Guide',
    category: 'Industry Guides',
    author: 'Kabila Tshilenge',
    date_label: 'July 12, 2026',
    read_time: '7 min',
    excerpt:
      'How Syntix Pharma and Okapi POS execute fiscal cryptographic signatures in under 100ms with automatic transmission.',
    content: `Real-time fiscal compliance is now a hard regulatory requirement. For retailers and pharmacies, the challenge is keeping checkout speed without creating a bottleneck.

With certified e-invoicing connectors and fiscal APIs, Okapi Edge generates a sealed QR invoice instantly — full regulatory compliance without sacrificing customer flow.`,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    tags: ['e-Invoicing', 'Compliance', 'Billing', 'Enterprise'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'digitalisation-reseaux-universitaires-okapi-edu',
    title: 'Digitalisation des Grands Réseaux Universitaires : Retour sur le Déploiement d’Okapi Edu',
    category: 'Études de Cas',
    author: 'Patrick Mwamba',
    date_label: '02 Juin 2026',
    read_time: '5 min',
    excerpt:
      'Analyse d’un déploiement sur 12 000+ étudiants : réduction de 85% des délais administratifs et automatisation complète des frais d’études.',
    content: `La gestion des inscriptions, du suivi académique et du contrôle des frais d'études pour un campus de grande envergure nécessite une plateforme ultra-fiable.

En déployant **Okapi Edu**, l’établissement a unifié le portail étudiant, la comptabilité et le carnet pédagogique en un seul espace sécurisé accessible en PWA, réduisant le temps d'attente administratif de 85%.`,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    tags: ['Okapi Edu', 'Éducation', 'SaaS', 'Efficacité'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'digitalisation-reseaux-universitaires-okapi-edu',
    title: 'Digitizing Large University Networks: Okapi Edu Deployment Retrospective',
    category: 'Case Studies',
    author: 'Patrick Mwamba',
    date_label: 'June 2, 2026',
    read_time: '5 min',
    excerpt:
      'A 12,000+ student rollout: 85% faster admin cycles and fully automated tuition workflows.',
    content: `Managing enrollment, academic tracking and tuition control at large campus scale requires an ultra-reliable platform.

By deploying **Okapi Edu**, the institution unified the student portal, finance and academic records into one secure PWA — cutting administrative wait time by 85%.`,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    tags: ['Okapi Edu', 'Education', 'SaaS', 'Efficiency'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'zero-trust-edge-enclaves',
    title: 'Enclaves Zero-Trust : protéger les données métier au bord du réseau',
    category: 'Tech & Souveraineté',
    author: 'Security Architecture',
    date_label: '14 Août 2026',
    read_time: '8 min',
    excerpt:
      'Modèle de menace, rotation de clés et isolation des tenants sur nœuds Edge Okapi.',
    content: `Les architectures Edge multiplient la surface d’attaque si elles sont mal segmentées. Okapi applique Zero-Trust de bout en bout : mTLS entre nœuds, secrets short-lived, audit immuable et séparation cryptographique des tenants.

Ce guide détaille les contrôles SOC 2 alignés et les runbooks d’incident pour les RSSI enterprise.`,
    tags: ['Zero-Trust', 'Sécurité', 'Edge', 'SOC 2'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'zero-trust-edge-enclaves',
    title: 'Zero-Trust enclaves: protecting business data at the network edge',
    category: 'Tech & Sovereignty',
    author: 'Security Architecture',
    date_label: 'August 14, 2026',
    read_time: '8 min',
    excerpt:
      'Threat model, key rotation and tenant isolation on Okapi Edge nodes.',
    content: `Edge architectures expand the attack surface if poorly segmented. Okapi applies Zero-Trust end to end: mTLS between nodes, short-lived secrets, immutable audit and cryptographic tenant separation.

This guide covers SOC 2-aligned controls and incident runbooks for enterprise CISOs.`,
    tags: ['Zero-Trust', 'Security', 'Edge', 'SOC 2'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'multi-currency-edu-finance',
    title: 'Finance éducative multi-devises : Stripe, SWIFT et Mobile Money',
    category: 'Guides Métiers',
    author: 'Okapi Edu Product',
    date_label: '30 Mai 2026',
    read_time: '9 min',
    excerpt:
      'Orchestrer les frais de scolarité internationaux sans friction pour families et registrars.',
    content: `Okapi Edu unifie les passerelles de paiement : cartes internationales, virements SWIFT et Mobile Money locaux. Les règles de change, les reçus fiscaux et les plans de paiement échelonnés sont gérés dans un même ledger multi-tenant.`,
    tags: ['Finance', 'Éducation', 'Paiements', 'Multi-devises'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'multi-currency-edu-finance',
    title: 'Multi-currency education finance: Stripe, SWIFT and Mobile Money',
    category: 'Industry Guides',
    author: 'Okapi Edu Product',
    date_label: 'May 30, 2026',
    read_time: '9 min',
    excerpt:
      'Orchestrate international tuition without friction for families and registrars.',
    content: `Okapi Edu unifies payment rails: international cards, SWIFT wires and local Mobile Money. FX rules, tax receipts and installment plans live in one multi-tenant ledger.`,
    tags: ['Finance', 'Education', 'Payments', 'Multi-currency'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'retail-inventory-crdt-war-stories',
    title: 'Stocks retail & CRDT : retours terrain sur les conflits résolus',
    category: 'Tech & Edge Architecture',
    author: 'POS Platform',
    date_label: '19 Avril 2026',
    read_time: '10 min',
    excerpt:
      'Cas concrets de double vente, remises offline et inventaires multi-caisse.',
    content: `Nous analysons trois incidents de production (double scan, promotion offline, transfert entrepôts) et les invariants CRDT qui ont empêché la corruption des stocks Okapi POS.`,
    tags: ['Retail', 'CRDT', 'Inventaire', 'POS'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'retail-inventory-crdt-war-stories',
    title: 'Retail inventory & CRDTs: field notes on resolved conflicts',
    category: 'Tech & Edge Architecture',
    author: 'POS Platform',
    date_label: 'April 19, 2026',
    read_time: '10 min',
    excerpt:
      'Real cases of double-sell, offline discounts and multi-register inventory.',
    content: `We break down three production incidents (double scan, offline promotion, warehouse transfer) and the CRDT invariants that prevented Okapi POS stock corruption.`,
    tags: ['Retail', 'CRDT', 'Inventory', 'POS'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'hl7-fhir-migration-playbook',
    title: 'Playbook de migration HL7 → FHIR pour hôpitaux régionaux',
    category: 'Guides Métiers',
    author: 'Health Engineering',
    date_label: '7 Mars 2026',
    read_time: '12 min',
    excerpt:
      'Phases, risques et métriques pour moderniser l’interop clinique avec Okapi Hospitals.',
    content: `Migration progressive : inventaire des interfaces HL7 v2, mapping FHIR R4, dual-run, bascule Edge. Checklists pour DSI hospitalières et critères d’acceptation cliniques.`,
    tags: ['FHIR', 'HL7', 'Hôpital', 'Migration'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'hl7-fhir-migration-playbook',
    title: 'HL7 → FHIR migration playbook for regional hospitals',
    category: 'Industry Guides',
    author: 'Health Engineering',
    date_label: 'March 7, 2026',
    read_time: '12 min',
    excerpt:
      'Phases, risks and metrics to modernize clinical interop with Okapi Hospitals.',
    content: `Phased migration: HL7 v2 interface inventory, FHIR R4 mapping, dual-run, Edge cutover. Checklists for hospital CIOs and clinical acceptance criteria.`,
    tags: ['FHIR', 'HL7', 'Hospital', 'Migration'],
    published: true,
  },
  {
    locale: 'fr',
    slug: 'investor-brief-edge-markets-2026',
    title: 'Brief investisseurs : marchés Edge Afrique–Europe–Golfe 2026',
    category: 'Inside Okapi',
    author: 'Strategy Office',
    date_label: '21 Février 2026',
    read_time: '7 min',
    excerpt:
      'TAM adressable, dynamique concurrentielle et moat technologique Okapi Edge.',
    content: `Synthèse non confidentielle des dynamiques de marché pour plateformes verticales critiques (éducation, santé, retail, énergie) et du positionnement souverain d’Okapi Edge.`,
    tags: ['Investisseurs', 'Marchés', 'Stratégie', 'Edge'],
    published: true,
  },
  {
    locale: 'en',
    slug: 'investor-brief-edge-markets-2026',
    title: 'Investor brief: Africa–Europe–Gulf Edge markets 2026',
    category: 'Inside Okapi',
    author: 'Strategy Office',
    date_label: 'February 21, 2026',
    read_time: '7 min',
    excerpt:
      'Addressable TAM, competitive dynamics and Okapi Edge technology moat.',
    content: `Non-confidential market synopsis for critical vertical platforms (education, health, retail, energy) and Okapi Edge’s sovereign positioning.`,
    tags: ['Investors', 'Markets', 'Strategy', 'Edge'],
    published: true,
  },
];

export const EXTRA_JOBS: SeedJob[] = [
  {
    locale: 'fr',
    title: 'Senior Rust & Systems Engineer (Edge Sync Engine)',
    department: 'Ingénierie Systems',
    location: 'Distribué / Remote International',
    type: 'CDI',
    summary:
      'Concevoir les moteurs de synchronisation temps réel haute vitesse en Rust & Tauri.',
    responsibilities: [
      'Développer des algorithmes CRDT pour déploiements edge',
      'Optimiser mémoire et CPU sur environnements distribués',
      'Assurer le chiffrement Zero-Trust des enclaves de données',
    ],
    requirements: [
      '5+ ans Rust, C++ ou Go systèmes distribués',
      'Bases embarquées (SQLite / DuckDB / RocksDB)',
      'Réseaux tolérants aux pannes',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Senior Rust & Systems Engineer (Edge Sync Engine)',
    department: 'Systems Engineering',
    location: 'Distributed / International Remote',
    type: 'Full-time',
    summary:
      'Build high-speed real-time sync engines in Rust & Tauri.',
    responsibilities: [
      'Develop CRDT algorithms for Edge deployments',
      'Optimize memory and CPU in distributed environments',
      'Enforce Zero-Trust encryption for data enclaves',
    ],
    requirements: [
      '5+ years Rust, C++ or Go in distributed systems',
      'Embedded databases (SQLite / DuckDB / RocksDB)',
      'Fault-tolerant networking expertise',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'Staff Full-Stack Engineer (TypeScript / React / Go)',
    department: 'Ingénierie SaaS',
    location: 'Remote ou Hubs Okapi Edge',
    type: 'CDI',
    summary:
      'Concevoir interfaces et microservices critiques de la suite Okapi Edge.',
    responsibilities: [
      'Architecture microservices gRPC et REST',
      'Dashboards enterprise React / Tailwind',
      'Revue de code et optimisation rendu',
    ],
    requirements: [
      'React, TypeScript, Next.js, Tailwind, Go ou Node',
      'SaaS B2B fort trafic international',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Staff Full-Stack Engineer (TypeScript / React / Go)',
    department: 'SaaS Engineering',
    location: 'Remote or Okapi Edge hubs',
    type: 'Full-time',
    summary:
      'Design critical interfaces and microservices across the Okapi Edge suite.',
    responsibilities: [
      'gRPC and REST microservice architecture',
      'Enterprise React / Tailwind dashboards',
      'Code review and render performance',
    ],
    requirements: [
      'React, TypeScript, Next.js, Tailwind, Go or Node',
      'High-traffic international B2B SaaS experience',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'Lead AI & Machine Learning Engineer',
    department: 'IA & Research',
    location: 'Remote International',
    type: 'CDI',
    summary:
      'Déployer des modèles prédictifs haute précision pour santé et éducation.',
    responsibilities: [
      'Fine-tuning LLM légers et modèles prédictifs',
      'Optimisation ONNX / Edge AI sur nœuds locaux',
      'Anonymisation et confidentialité des données',
    ],
    requirements: [
      'Master/PhD ML ou discipline quantitative',
      'PyTorch, ONNX, TensorRT, architectures LLM',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Lead AI & Machine Learning Engineer',
    department: 'AI & Research',
    location: 'International Remote',
    type: 'Full-time',
    summary:
      'Ship high-precision predictive models for healthcare and education.',
    responsibilities: [
      'Fine-tune compact LLMs and predictive models',
      'Optimize ONNX / Edge AI on local nodes',
      'Enforce anonymization and data privacy',
    ],
    requirements: [
      'Master/PhD in ML or quantitative field',
      'PyTorch, ONNX, TensorRT, LLM architectures',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'Senior Product Manager — Enterprise SaaS',
    department: 'Produit',
    location: 'Remote International',
    type: 'CDI',
    summary:
      'Porter la vision Syntix Pharma et Okapi POS auprès des grands comptes.',
    responsibilities: [
      'Feuille de route produit mondiale',
      'Prioriser interopérabilité et conformité',
      'Collaborer Design et Engineering',
    ],
    requirements: [
      '5+ ans Product Management B2B SaaS mondial',
      'Leadership produit et capacités analytiques',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Senior Product Manager — Enterprise SaaS',
    department: 'Product',
    location: 'International Remote',
    type: 'Full-time',
    summary:
      'Drive Syntix Pharma and Okapi POS vision with enterprise accounts.',
    responsibilities: [
      'Own global product roadmap',
      'Prioritize interoperability and compliance',
      'Partner with Design and Engineering',
    ],
    requirements: [
      '5+ years global B2B SaaS product management',
      'Strong product leadership and analytics',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'Customer Success Manager — Afrique francophone',
    department: 'Opérations',
    location: 'Abidjan / Remote Afrique de l’Ouest',
    type: 'CDI',
    summary:
      'Accompagner adoption Okapi Edu & POS chez clients institutionnels et retail.',
    responsibilities: [
      'Onboarding et health scores clients',
      'QBRs exécutifs et plans de valeur',
      'Escalades produit et formation terrain',
    ],
    requirements: [
      '3+ ans Customer Success B2B',
      'FR courant ; EN professionnel',
      'Aisance stakeholders publics / retail',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'Customer Success Manager — Francophone Africa',
    department: 'Operations',
    location: 'Abidjan / Remote West Africa',
    type: 'Full-time',
    summary:
      'Drive Okapi Edu & POS adoption for institutional and retail customers.',
    responsibilities: [
      'Customer onboarding and health scores',
      'Executive QBRs and value plans',
      'Product escalations and field enablement',
    ],
    requirements: [
      '3+ years B2B Customer Success',
      'Fluent French; professional English',
      'Comfort with public-sector / retail stakeholders',
    ],
    published: true,
  },
  {
    locale: 'fr',
    title: 'DevOps / Platform Engineer — SurrealDB & Edge',
    department: 'Sécurité & Infra',
    location: 'Remote EU',
    type: 'CDI',
    summary:
      'Industrialiser CI/CD, observabilité et déploiement multi-région des nœuds Edge.',
    responsibilities: [
      'Pipelines GitOps et politiques supply chain',
      'Observabilité Prometheus / OpenTelemetry',
      'Hardening Kubernetes / bare-metal Edge',
    ],
    requirements: [
      '5+ ans Platform / SRE',
      'Kubernetes, Terraform, secrets management',
      'EN professionnel',
    ],
    published: true,
  },
  {
    locale: 'en',
    title: 'DevOps / Platform Engineer — SurrealDB & Edge',
    department: 'Security & Infra',
    location: 'Remote EU',
    type: 'Full-time',
    summary:
      'Industrialize CI/CD, observability and multi-region Edge node deployment.',
    responsibilities: [
      'GitOps pipelines and supply-chain policies',
      'Prometheus / OpenTelemetry observability',
      'Harden Kubernetes / bare-metal Edge',
    ],
    requirements: [
      '5+ years Platform / SRE',
      'Kubernetes, Terraform, secrets management',
      'Professional English',
    ],
    published: true,
  },
];

export const EXTRA_PRESS: SeedPress[] = [
  {
    locale: 'fr',
    title:
      'Okapi Edge déploie son nouveau réseau de nœuds edge internationaux pour une latence sous les 10ms',
    date_label: '25 Juillet 2026',
    category: 'Annonce Corporate',
    summary:
      'Renforcement des infrastructures distribuées mondiales pour une disponibilité 99.999% de la suite SaaS enterprise.',
    download_url: 'https://okapiedge.com/press/edge-nodes-10ms-2026-fr.pdf',
    published: true,
  },
  {
    locale: 'en',
    title:
      'Okapi Edge rolls out a new international Edge node network for sub-10ms latency',
    date_label: 'July 25, 2026',
    category: 'Corporate Announcement',
    summary:
      'Expanded global distributed infrastructure targeting 99.999% availability for the enterprise SaaS suite.',
    download_url: 'https://okapiedge.com/press/edge-nodes-10ms-2026-en.pdf',
    published: true,
  },
  {
    locale: 'fr',
    title:
      'Certification de conformité e-DGI & Fiscale Globale obtenue pour Syntix Pharma & Okapi POS',
    date_label: '15 Juin 2026',
    category: 'Conformité & Partenariat',
    summary:
      'Les moteurs d’encaissement valident les normes de signature cryptographique en temps réel pour distribution et santé.',
    published: true,
  },
  {
    locale: 'en',
    title:
      'Global e-invoicing & fiscal compliance certification for Syntix Pharma & Okapi POS',
    date_label: 'June 15, 2026',
    category: 'Compliance & Partnership',
    summary:
      'Checkout engines validate real-time cryptographic signature standards for distribution and healthcare.',
    published: true,
  },
  {
    locale: 'fr',
    title: 'Okapi Edu dépasse le cap des 2,8 millions d’apprenants gérés',
    date_label: '10 Mai 2026',
    category: 'Croissance Produit',
    summary:
      'Adoption record du système d’exploitation éducatif auprès d’institutions scolaires et universitaires internationales.',
    published: true,
  },
  {
    locale: 'en',
    title: 'Okapi Edu surpasses 2.8 million managed learners',
    date_label: 'May 10, 2026',
    category: 'Product Growth',
    summary:
      'Record adoption of the education operating system across international schools and universities.',
    published: true,
  },
  {
    locale: 'fr',
    title: 'Ouverture du hub Edge Moyen-Orient — Dubaï',
    date_label: '3 Avril 2026',
    category: 'Corporate',
    summary:
      'Nouveau point de présence pour latence régionale, data residency et partenariats énergie / santé du Golfe.',
    published: true,
  },
  {
    locale: 'en',
    title: 'Middle East Edge hub opens in Dubai',
    date_label: 'April 3, 2026',
    category: 'Corporate',
    summary:
      'New point of presence for regional latency, data residency and Gulf energy / healthcare partnerships.',
    published: true,
  },
];

export const SEED_TEAM = [
  {
    locale: 'fr' as const,
    key: 'chantal-kalala',
    name: 'Dr. Chantal Kalala',
    role: 'Chief Technology Officer',
    bio: 'Architecte des runtimes Edge et de la stratégie Zero-Trust Okapi. 15 ans en systèmes distribués.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    sort_order: 0,
    published: true,
  },
  {
    locale: 'en' as const,
    key: 'chantal-kalala',
    name: 'Dr. Chantal Kalala',
    role: 'Chief Technology Officer',
    bio: 'Architect of Okapi Edge runtimes and Zero-Trust strategy. 15 years in distributed systems.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    sort_order: 0,
    published: true,
  },
  {
    locale: 'fr' as const,
    key: 'kabika-ruseruka',
    name: 'Kabika Ruseruka',
    role: 'Chief Executive Officer',
    bio: 'Vision produit et expansion internationale des plateformes verticales Okapi Edge.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    sort_order: 1,
    published: true,
  },
  {
    locale: 'en' as const,
    key: 'kabika-ruseruka',
    name: 'Kabika Ruseruka',
    role: 'Chief Executive Officer',
    bio: 'Product vision and international expansion of Okapi Edge vertical platforms.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    sort_order: 1,
    published: true,
  },
  {
    locale: 'fr' as const,
    key: 'amina-benali',
    name: 'Amina Benali',
    role: 'VP Customer Success',
    bio: 'Déploiements enterprise Afrique–Europe, excellence opérationnelle et valeur client.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    sort_order: 2,
    published: true,
  },
  {
    locale: 'en' as const,
    key: 'amina-benali',
    name: 'Amina Benali',
    role: 'VP Customer Success',
    bio: 'Africa–Europe enterprise rollouts, operational excellence and customer value.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    sort_order: 2,
    published: true,
  },
];

export const EXTRA_SETTINGS = [
  {
    key: 'site.manifesto',
    value: {
      fr: {
        quote:
          'Bâtir des logiciels d’infrastructure d’une fiabilité absolue, là où la performance et la résilience comptent le plus.',
        body: 'Okapi Edge est un groupe technologique mondial éditant des plateformes SaaS d’entreprise à fort impact. Notre philosophie repose sur l’ingénierie de pointe, les architectures Edge Offline-First, le chiffrement zéro-confiance et une recherche constante de simplicité pour nos utilisateurs.',
        principles: [
          {
            title: 'Résilience Edge & Offline-First',
            description:
              'Nos applications restent à pleine vitesse même en interruption totale de connectivité.',
          },
          {
            title: 'Chiffrement & souveraineté des données',
            description:
              'Zero-Trust garantissant protection et gouvernance exclusive de vos données.',
          },
          {
            title: 'Intelligence contextuelle embarquée',
            description:
              'Algorithmes prédictifs au plus près du terrain pour anticiper demande, santé et éducation.',
          },
          {
            title: 'Ergonomie & vitesse sub-milliseconde',
            description:
              'Interfaces épurées qui éliminent la friction et décuplent la productivité.',
          },
        ],
      },
      en: {
        quote:
          'Build infrastructure software of absolute reliability — where performance and resilience matter most.',
        body: 'Okapi Edge is a global technology group shipping high-impact enterprise SaaS. Our philosophy: advanced engineering, offline-first Edge architectures, zero-trust encryption, and relentless simplicity for users.',
        principles: [
          {
            title: 'Edge resilience & offline-first',
            description:
              'Applications keep full speed even during total connectivity loss.',
          },
          {
            title: 'Encryption & data sovereignty',
            description:
              'Zero-Trust guaranteeing exclusive protection and governance of your data.',
          },
          {
            title: 'Embedded contextual intelligence',
            description:
              'Predictive algorithms close to the field for demand, health and education.',
          },
          {
            title: 'Ergonomics & sub-millisecond speed',
            description:
              'Clean interfaces that remove friction and multiply daily productivity.',
          },
        ],
      },
    },
  },
  {
    key: 'site.i18n',
    value: {
      locales: ['fr', 'en'],
      default_locale: 'fr',
      locale_labels: { fr: 'Français', en: 'English' },
      content_tables: ['post', 'job', 'press', 'product', 'team'],
    },
  },
];
