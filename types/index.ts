export interface SaasProduct {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: string;
  description: string;
  fullDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: { title: string; desc: string; icon: string }[];
  subdomainUrl: string;
  badge: string;
  color: string;
  bgGradient: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  hqLabel?: string;
}

export interface SiteContact {
  email: string;
  phone: string;
  locationShort: string;
  salesEmail: string;
  pressEmail: string;
  securityEmail: string;
  hqTitle: string;
  addressLine1: string;
  addressLine2: string;
}

export type LegalSectionId = 'publisher' | 'hosting' | 'data' | 'ip';

export interface LegalSection {
  id: LegalSectionId;
  title: string;
  body: string;
  footer?: string;
}

export interface SiteLegal {
  entityType: string;
  entityLabel: string;
  registration: string;
  legalName: string;
  badge: string;
  title: string;
  updatedAt: string;
  sections: LegalSection[];
}

export interface AboutTimelineItem {
  year: string;
  label: string;
}

export interface SiteAbout {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  history: {
    eyebrow: string;
    title: string;
    body1: string;
    body2: string;
  };
  timeline: AboutTimelineItem[];
  governance: {
    eyebrow: string;
    title: string;
    description: string;
    hqLabel: string;
  };
  ambition: {
    title: string;
    description: string;
    cta: string;
  };
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
}

export interface PressRelease {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  downloadUrl?: string;
}

export interface InvestorInquiry {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  investorType: string;
  ticketSize: string;
  message: string;
  ndaAccepted: boolean;
}

export interface B2bContactInquiry {
  fullName: string;
  organization: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  message: string;
}
