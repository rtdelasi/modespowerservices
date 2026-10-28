'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, ArrowUp, Shield } from 'lucide-react';
import { siteConfig, getTelHref, getMailtoHref } from '@/lib/site-config';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

/**
 * Footer per BRIEF Section 4 & Phase 2
 * - Set on the brand 'ink' tone (#0B1E3D)
 * - Preserves existing service anchor links (#installations, #maintenance, #audits, #solutions, #emergency)
 * - Company links, legal links, and computed current-year copyright
 * - Displays exactly ONE phone number (from siteConfig.phone)
 * - Accessible high-contrast typography (text-hairline on ink > 12:1 ratio)
 */
export function Footer() {
  const pathname = usePathname();

  // Suppress marketing footer on admin console and maintenance screen
  if (pathname === '/maintenance' || pathname.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="w-full bg-ink text-surface border-t border-hairline/15 select-none">
      <Container className="py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-hairline/15">
          {/* Brand & Accreditation Column */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-button focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 max-w-fit"
              aria-label={`${siteConfig.name} - Home`}
            >
              <div className="w-11 h-11 rounded-button bg-white flex items-center justify-center p-1 border border-hairline shadow-sm shrink-0">
                <Logo variant="default" size={36} alt={siteConfig.name} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-lg tracking-tight text-surface leading-none">
                  {siteConfig.shortName}
                </span>
                <span className="text-[11px] font-medium tracking-wider text-signal uppercase leading-tight mt-1">
                  Power Services Ltd.
                </span>
              </div>
            </Link>

            <p className="text-sm text-hairline max-w-sm leading-relaxed">
              Ghana’s certified engineering contractor for high-voltage industrial substations,
              predictive maintenance, power quality optimization, and commercial solar microgrids.
            </p>

            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-button bg-white/[0.06] border border-white/10 max-w-fit">
              <Shield className="w-4 h-4 text-signal shrink-0" aria-hidden="true" />
              <span className="text-xs text-hairline font-medium leading-tight">
                {siteConfig.certification}
              </span>
            </div>

            <p className="text-xs text-hairline/70">
              Energy Commission License: <span className="font-mono">{siteConfig.licenseNo}</span>
            </p>
          </div>

          {/* Services Links Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-hairline/80 mb-4 font-mono">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              {siteConfig.servicesLinks.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-hairline hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-sm"
                  >
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Work Links Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-hairline/80 mb-4 font-mono">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              {siteConfig.companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-hairline hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Coordinates Column (Exactly One Phone Defined Here) */}
          <div className="lg:col-span-3 space-y-3.5 text-sm">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-hairline/80 mb-4 font-mono">
              Contact
            </h3>

            {/* Address */}
            <div className="flex items-start gap-2.5 text-hairline">
              <MapPin className="w-4 h-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />
              <span className="leading-snug text-xs md:text-sm">{siteConfig.address}</span>
            </div>

            {/* Exactly One Phone Number */}
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-signal shrink-0" aria-hidden="true" />
              <a
                href={getTelHref(siteConfig.phone)}
                className="text-hairline hover:text-white transition-colors font-mono text-xs md:text-sm tabular-nums focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-sm"
                aria-label={`Call ${siteConfig.phone}`}
              >
                {siteConfig.phone}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-signal shrink-0" aria-hidden="true" />
              <a
                href={getMailtoHref(siteConfig.email)}
                className="text-hairline hover:text-white transition-colors text-xs md:text-sm focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-sm"
                aria-label={`Email ${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </div>

            {/* Operating Hours Notice */}
            <div className="pt-2 text-xs text-hairline/80 border-t border-hairline/10 space-y-1">
              <p>Office: {siteConfig.hours.office}</p>
              <p className="text-signal font-medium">Emergency: {siteConfig.hours.emergency}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links, Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-hairline">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              © {currentYear} {siteConfig.legalName}. All rights reserved.
            </span>
            {siteConfig.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-button bg-white/[0.06] hover:bg-white/[0.12] text-hairline hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
