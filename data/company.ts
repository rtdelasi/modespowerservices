import { StatItem } from '@/types';

export const COMPANY_INFO = {
  name: 'Modes Power Services',
  legalName: 'Modes Power Services Ltd.',
  tagline: 'Precision Electrical Engineering & Power Infrastructure',
  description:
    'Ghana’s trusted partner for high, medium, and low voltage electrical installations, 24/7 industrial maintenance, power quality audits, and custom hybrid power systems.',
  address: 'Plot 14, Spintex Industrial Area, Accra, Ghana',
  city: 'Accra',
  country: 'Ghana',
  phone: '+233 (0) 20 843 8618',
  emergencyPhone: '+233 (0) 20 843 8618',
  email: 'modespower@gmail.com',
  supportEmail: 'modespower@gmail.com',
  operatingHours: {
    office: 'Monday – Friday: 8:00 AM – 6:00 PM GMT',
    emergency: '24/7 / 365 Rapid Response Dispatch',
  },
  certification: 'Energy Commission Ghana Certified Class A Electrical Contractor',
  licenseNo: 'EC/EC-IND/2021/0488',
  socials: {
    linkedin: 'https://linkedin.com/company/modes-power-services',
    twitter: 'https://twitter.com/modespower',
    facebook: 'https://facebook.com/modespowerservices',
  },
};

export const KEY_STATS: StatItem[] = [
  {
    value: 15,
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Delivering uncompromised power solutions across Ghana & West Africa since 2011.',
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
