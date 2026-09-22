export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  id: string;
  hero_image_url: string | null;
  about_image_url: string | null;
  cta_image_url: string | null;
  og_image_url: string | null;
  updated_at?: string;
}

export interface ServiceItem {
  id: string;
  anchor: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  iconName: string;
  image?: string | null;
  features: string[];
  specs: { label: string; value: string }[];
  deliverables: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export interface AccordionReason {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string;
  iconName: string;
  highlightTag: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: 'Industrial' | 'Commercial' | 'Infrastructure' | 'Solar & Hybrid';
  client: string;
  location: string;
  capacity: string;
  scope: string;
  timeline: string;
  outcome: string;
  image?: string | null;
  highlight: string;
  tags: string[];
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  tagline: string;
  image?: string | null;
  linkedinUrl: string;
  credentials: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Installations' | 'Maintenance' | 'Audits' | 'Solar/Custom';
  location: string;
  description: string;
  image?: string | null;
  specs?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  avatar?: string | null;
}

export interface ClientLogo {
  name: string;
  sector: string;
  logoText: string;
}
