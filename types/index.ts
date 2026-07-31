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
