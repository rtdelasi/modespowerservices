'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, ArrowUp, Phone, Mail, MapPin, Shield, Clock } from 'lucide-react';
import { PairedButton } from '@/components/ui/PairedButton';
import { COMPANY_INFO } from '@/data/company';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const pathname = usePathname();

  // Do not render marketing footer on admin dashboard pages or maintenance view
  if (pathname === '/maintenance' || pathname.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full pt-8 pb-0 px-3 sm:px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Section 4a.10: Asymmetric section radius (rounded-t-[36px] md:rounded-t-[48px] rounded-b-none) */}
      <div className="w-full bg-brand-navy text-white rounded-t-[36px] md:rounded-t-[48px] rounded-b-none p-8 sm:p-10 md:p-14 lg:p-16 border border-white/[0.08] shadow-2xl relative overflow-hidden">
        {/* Subtle background circuit pattern & ambient energy glow */}
        <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-navy-light/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column & Quote CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3.5 group">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-1.5 shadow-lg shadow-black/20 group-hover:scale-105 transition-transform duration-300">
                  <Logo variant="with-tagline" size={48} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-xl tracking-tight text-white leading-none">
                    MODES
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider text-brand-red uppercase leading-tight mt-1">
                    Power Services Ltd.
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mt-0.5">
                    Your Power Solution
                  </span>
                </div>
              </Link>
              <p className="text-sm text-neutral-300 max-w-sm leading-relaxed">
                Ghana’s certified engineering partner for high-voltage industrial substations, predictive maintenance, power quality optimization, and commercial solar microgrids.
              </p>
            </div>

            {/* Regulatory Accreditation pill with Circular Icon */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/10 px-4 py-2 rounded-full max-w-fit">
              <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-neutral-200 font-medium">
                {COMPANY_INFO.certification}
              </span>
            </div>

            {/* Section 4a.12: Paired Circular CTA Button */}
            <div>
              <PairedButton
                label="Request Technical Consultation"
                href="/contact"
                variant="primary"
                size="md"
              />
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Services Links */}
            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-4 font-mono">
                Engineering Services
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/services#installations" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>HV/MV/LV Installations</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#maintenance" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Predictive Maintenance & BDV</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#audits" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Power Quality & Harmonics</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#solutions" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Solar Microgrids & BESS</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#emergency" className="text-brand-red hover:text-white font-medium transition-colors flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span>24/7 Rapid Emergency Triage</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company & Quick Links */}
            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-4 font-mono">
                Company & Work
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/about" className="text-neutral-300 hover:text-white transition-colors">
                    About Modes Power
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-neutral-300 hover:text-white transition-colors">
                    Featured Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-neutral-300 hover:text-white transition-colors">
                    Project Work Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                    Contact & Head Office
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-neutral-300 hover:text-white transition-colors">
                    Visual Sitemap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ghana Headquarters & Contact info (Section 4a.9 Circular Badges) */}
            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-4 font-mono">
                Ghana Headquarters
              </h3>
              <div className="space-y-3.5 text-sm text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors font-mono text-xs">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 shadow-md">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-brand-red font-semibold uppercase tracking-wider">24/7 Rapid Dispatch</span>
                    <a href={`tel:${COMPANY_INFO.emergencyPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors font-mono text-xs font-bold text-white">
                      {COMPANY_INFO.emergencyPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors text-xs">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Modes Power Services Ltd. All rights reserved.</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] px-4 py-2 rounded-full transition-all duration-300 cursor-pointer group"
          >
            <span>Back to top</span>
            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
