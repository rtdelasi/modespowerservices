'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig, getTelHref } from '@/lib/site-config';
import { Container } from '@/components/ui/Container';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Logo } from '@/components/ui/Logo';
import { Nav, useNavContext } from './nav';

/**
 * Inner header content rendered within Nav.Root
 * Reads scroll and page state from NavContext
 */
function HeaderContent() {
  const { state } = useNavContext();
  const isSolid = !state.isHome || state.isScrolled;

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-colors duration-200',
        isSolid
          ? 'bg-paper/95 backdrop-blur-md border-b border-hairline shadow-hairline text-ink'
          : 'bg-transparent border-b border-transparent text-white'
      )}
    >
      <Container className="h-18 md:h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 rounded-button focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 py-1 pr-2"
          aria-label={`${siteConfig.name} - Home`}
        >
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-button bg-white flex items-center justify-center p-1 border border-hairline shadow-sm shrink-0">
            <Logo variant="default" size={32} priority alt={siteConfig.name} />
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                'font-display font-semibold text-base md:text-lg tracking-tight leading-none',
                isSolid ? 'text-ink' : 'text-white'
              )}
            >
              {siteConfig.shortName}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-signal uppercase leading-none mt-1">
              Power Services
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Main Navigation"
        >
          {siteConfig.navLinks.map((link) => (
            <Nav.Link key={link.href} href={link.href} variant="desktop">
              {link.label}
            </Nav.Link>
          ))}
        </nav>

        {/* Right: Emergency Phone + Quote Button + Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Emergency Phone (Desktop / Tablet >= 768px) */}
          <a
            href={getTelHref(siteConfig.phone)}
            className={cn(
              'hidden md:inline-flex items-center gap-2 px-3 py-2 text-xs md:text-sm font-medium rounded-button transition-colors min-h-[44px]',
              'focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2',
              isSolid
                ? 'text-signal hover:bg-signal/10'
                : 'text-white hover:bg-white/10'
            )}
            aria-label={`Call 24/7 emergency line: ${siteConfig.phone}`}
          >
            <PhoneCall className="w-4 h-4 text-signal shrink-0" aria-hidden="true" />
            <span className="tabular-nums font-medium">{siteConfig.phone}</span>
          </a>

          {/* Primary CTA Button: Request a quote (>= 640px) */}
          <PrimaryButton
            href="/contact"
            className="hidden sm:inline-flex min-h-[44px] text-xs md:text-sm px-4 md:px-5 font-semibold"
          >
            Request a quote
          </PrimaryButton>

          {/* Mobile Menu Trigger (< 1024px) */}
          <Nav.Trigger />
        </div>
      </Container>
    </header>
  );
}

/**
 * Global Header / Navbar per BRIEF Section 4 & Phase 2
 * - Transparent over home hero, solid paper with hairline divider after scrolling or on other pages
 * - Scroll detected via IntersectionObserver sentinel in Nav.Root
 * - Responsive across 320, 375, 768, 1024, 1440px
 * - Built with compound components (Nav.Root, Nav.Trigger, Nav.Sheet, Nav.Link)
 */
export function Navbar() {
  const pathname = usePathname();

  // Suppress marketing navbar on admin dashboard pages and maintenance screen
  if (pathname === '/maintenance' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <Nav.Root>
      <HeaderContent />
      <Nav.Sheet />
    </Nav.Root>
  );
}
