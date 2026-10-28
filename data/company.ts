import { siteConfig } from '@/lib/site-config';
import { StatItem } from '@/types';

export const COMPANY_INFO = {
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  address: siteConfig.address,
  city: siteConfig.city,
  country: siteConfig.country,
  phone: siteConfig.phone,
  emergencyPhone: siteConfig.phone,
  email: siteConfig.email,
  supportEmail: siteConfig.email,
  operatingHours: siteConfig.hours,
  certification: siteConfig.certification,
  licenseNo: siteConfig.licenseNo,
  socials: siteConfig.socials,
};

export const KEY_STATS: StatItem[] = [
  {
    value: 15,
    suffix: '+',
    label: 'Years of Excellence',
    description: `Delivering uncompromised power solutions across Ghana & West Africa since ${siteConfig.foundingYear}.`,
  },
  {
    value: 520,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Industrial substations, commercial facilities, and high-uptime power grids.',
  },
  {
    value: 140,
    suffix: '+',
    label: 'Megawatts Commissioned',
    description: 'Robust power infrastructure energized with 99.98% documented reliability.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Safety & Compliance Rate',
    description: 'Strict adherence to Energy Commission Ghana and IEEE safety standards.',
  },
];
