/**
 * Site Configuration (Single Source of Truth)
 * Defined per BRIEF Section 4 & Phase 2 specifications.
 * All company details, contact channels, operating hours, and primary navigation
 * are declared once here and imported across the application.
 */

export const siteConfig = {
  name: 'Modes Power Services',
  shortName: 'Modes',
  legalName: 'Modes Power Services Ltd.',
  tagline: 'Precision Electrical Engineering & Power Infrastructure',
  description:
    'Ghana’s trusted partner for high, medium, and low voltage electrical installations, 24/7 industrial maintenance, power quality audits, and custom hybrid power systems.',
  // The phone number is defined in exactly ONE place in the code here.
  phone: '+233 (0) 20 843 8618',
  // WhatsApp is not configured in current communication channels
  whatsapp: null as string | null,
  email: 'modespower@gmail.com',
  address: 'Plot 14, Spintex Industrial Area, Accra, Ghana',
  city: 'Accra',
  country: 'Ghana',
  hours: {
    office: 'Monday – Friday: 8:00 AM – 6:00 PM GMT',
    emergency: '24/7 / 365 Rapid Response Dispatch',
  },
  foundingYear: 2011,
  certification: 'Energy Commission Ghana Certified Class A Electrical Contractor',
  licenseNo: 'EC/EC-IND/2021/0488',
  socials: {
    linkedin: 'https://linkedin.com/company/modes-power-services',
    twitter: 'https://twitter.com/modespower',
    facebook: 'https://facebook.com/modespowerservices',
  },
  navLinks: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
  servicesLinks: [
    { label: 'HV/MV/LV installations', href: '/services#installations' },
    { label: 'Predictive maintenance & BDV', href: '/services#maintenance' },
    { label: 'Power quality & harmonics', href: '/services#audits' },
    { label: 'Solar microgrids & BESS', href: '/services#solutions' },
    { label: '24/7 Rapid emergency triage', href: '/services#emergency' },
  ],
  companyLinks: [
    { label: 'About Modes Power', href: '/about' },
    { label: 'Featured case studies', href: '/projects' },
    { label: 'Project work gallery', href: '/gallery' },
    { label: 'Contact & head office', href: '/contact' },
    { label: 'Visual sitemap', href: '/sitemap' },
  ],
  legalLinks: [
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Terms of service', href: '/terms-of-service' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Format raw phone number into a sanitized tel: URI string
 */
export function getTelHref(phone: string = siteConfig.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/**
 * Format email into a mailto: URI string
 */
export function getMailtoHref(email: string = siteConfig.email): string {
  return `mailto:${email}`;
}
