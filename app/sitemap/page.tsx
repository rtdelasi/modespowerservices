import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Network, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';

export const metadata: Metadata = {
  title: 'Visual Sitemap',
  description: 'Complete visual index and page directory for Modes Power Services Ltd.',
};

const SITEMAP_SECTIONS = [
  {
    title: 'Main Navigation Pages',
    links: [
      { name: 'Home Page', href: '/', desc: 'Overview, hero, stats, interactive accordion, and featured carousel' },
      { name: 'About Us', href: '/about', desc: 'Company story, mission, leadership team, and compliance credentials' },
      { name: 'Engineering Services', href: '/services', desc: 'Comprehensive breakdown of all technical capabilities and anchor sections' },
      { name: 'Featured Projects', href: '/projects', desc: 'Industrial and commercial case studies with scope and outcomes' },
      { name: 'Work Gallery', href: '/gallery', desc: 'Filterable photo gallery of completed works with interactive lightbox' },
      { name: 'Contact & Headquarters', href: '/contact', desc: 'Consultation request form, emergency hotline, and Accra office coordinates' },
    ],
  },
  {
    title: 'Specialized Service Anchors',
    links: [
      { name: 'HV, MV & LV Installations', href: '/services#installations', desc: '33kV/11kV substations, switchgears, and power distribution' },
      { name: 'Predictive Maintenance & Repairs', href: '/services#maintenance', desc: 'FLIR thermography, transformer BDV testing, and scheduled servicing' },
      { name: 'Power Quality & Energy Audits', href: '/services#audits', desc: 'Harmonic analysis, power factor correction, and load balancing' },
      { name: 'Custom Hybrid Solutions & Solar', href: '/services#solutions', desc: 'Commercial solar PV, BESS storage, and generator synchronization' },
      { name: '24/7 Rapid Emergency Response', href: '/services#emergency', desc: 'Underground cable fault finding and immediate restoration' },
    ],
  },
  {
    title: 'Legal & Meta Documents',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy', desc: 'Client information handling and data security standards' },
      { name: 'Terms of Service', href: '/terms-of-service', desc: 'Contractual terms and safety compliance protocols' },
      { name: 'XML Machine Sitemap', href: '/sitemap.xml', desc: 'Search engine crawler index (sitemap.xml)' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-24 sm:pt-28 md:pt-32 pb-12 max-w-[1440px] mx-auto">
      <SectionContainer theme="navy" className="text-white">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-red/20 text-brand-red border border-brand-red/30 px-3.5 py-1.5 rounded-pill text-xs font-semibold">
            <Network className="w-3.5 h-3.5" />
            <span>Site Directory & Index</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white">
            Visual Sitemap
          </h1>
          <p className="text-sm text-neutral-300">
            Easily navigate across all public pages, service anchors, and resources of Modes Power Services Ltd.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer theme="white">
        <div className="space-y-12">
          {SITEMAP_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-6">
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-brand-navy border-b border-black/[0.08] pb-3 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                <span>{section.title}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-5 rounded-2xl bg-surface-muted hover:bg-white border border-black/[0.06] hover:border-brand-red/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-base text-brand-navy group-hover:text-brand-red transition-colors">
                          {link.name}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-content-tertiary group-hover:text-brand-red transition-colors" />
                      </div>
                      <p className="text-xs text-content-secondary leading-relaxed">
                        {link.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/[0.05]">
                      <span className="text-[11px] font-mono text-content-tertiary">
                        {link.href}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
