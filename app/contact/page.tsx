import React from 'react';
import { Metadata } from 'next';
import { ContactClient } from '@/components/contact/ContactClient';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact & Engineering Office',
  description:
    'Request a technical consultation, detailed project quotation, or 24/7 emergency electrical engineering dispatch in Ghana.',
  openGraph: {
    title: 'Contact & Engineering Office | Modes Power Services',
    description:
      'Request a technical consultation, detailed project quotation, or 24/7 emergency electrical engineering dispatch in Ghana.',
    url: `${siteConfig.siteUrl}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
