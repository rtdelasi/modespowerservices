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
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://modespowerservices.vercel.app').replace(/\/$/, ''),
  tagline: 'Precision Electrical Engineering & Power Infrastructure',
  description:
    'Ghana’s trusted partner for high, medium, and low voltage electrical installations, 24/7 industrial maintenance, power quality audits, and custom hybrid power systems.',
  // The phone number is defined in exactly ONE place in the code here.
  phone: '+233 (0) 20 843 8618',
  // WhatsApp is not configured in current communication channels
  whatsapp: null as string | null,
  email: 'modespower@gmail.com',
  address: 'Bortianor Redtop-Selasi, Hs. No. E119, Accra, Ghana',
  city: 'Accra',
  country: 'Ghana',
  mapUrl: 'https://maps.google.com/?cid=7850399820826106569',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.3124434091806!2d-0.3521246260167516!3d5.520569894459542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfbd860320060f%3A0x6cf2390b39215ac9!2sModes%20Power%20Services!5e0!3m2!1sen!2sgh!4v1793214507088!5m2!1sen!2sgh',
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
