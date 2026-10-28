export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  id: string;
  maintenance_mode: boolean;
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

export type ProjectImageKind = 'gallery' | 'before' | 'after';

export interface ProjectImage {
  id?: string;
  project_id?: string;
  url: string;
  alt: string;
  caption?: string | null;
  kind: ProjectImageKind;
  sort_order: number;
  width?: number | null;
  height?: number | null;
  blur_data_url?: string | null;
  created_at?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Industrial' | 'Commercial' | 'Infrastructure' | 'Solar & Hybrid' | string;
  client?: string;
  client_name?: string;
  description?: string;
  scope?: string;
  outcome?: string;
  cover_image_path?: string | null;
  image?: string | null;
  images: ProjectImage[];
  sort_order?: number;
  published?: boolean;
  location?: string;
  capacity?: string;
  timeline?: string;
  highlight?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export type ProjectCaseStudy = Project;

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
