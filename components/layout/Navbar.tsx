'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMPANY_INFO } from '@/data/company';
import { Logo } from '@/components/ui/Logo';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Do not render marketing navbar on admin dashboard pages or maintenance view
  if (pathname === '/maintenance' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-5 pointer-events-none transition-all duration-300">
        <div
          className={cn(
            'pointer-events-auto w-full max-w-[1240px] rounded-pill transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between',
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-lg shadow-black/10'
              : 'bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-sm'
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-full pr-2"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm border border-black/[0.08] group-hover:scale-105 transition-transform duration-200">
              <Logo variant="default" size={32} priority />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-brand-navy leading-none">
                MODES
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-brand-red uppercase leading-none mt-0.5">
                Power Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/[0.04] p-1 rounded-full border border-black/[0.03]">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative text-xs sm:text-[13px] font-medium transition-all duration-200 ease-out select-none',
                    isActive
                      ? 'bg-brand-navy text-white rounded-full px-5 py-2 font-semibold shadow-sm'
                      : 'text-brand-navy/70 hover:text-brand-navy hover:bg-black/[0.04] rounded-full px-4 py-2'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <span>Get a Free Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/[0.05] hover:bg-black/[0.1] flex items-center justify-center text-brand-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-navy/60 backdrop-blur-md lg:hidden flex flex-col justify-start pt-24 px-4 pb-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-md mx-auto bg-white rounded-[28px] p-6 shadow-2xl border border-black/[0.06] flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center p-1 border border-black/[0.06] shadow-sm">
                    <Logo variant="default" size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-sm text-brand-navy leading-none">Modes Power Services</span>
                    <span className="text-[10px] text-brand-red font-semibold uppercase tracking-wider mt-0.5">Your Power Solution</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-brand-red bg-brand-red-light px-2.5 py-0.5 rounded-pill">
                  Ghana EC Certified
                </span>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-1.5 py-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={true}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-pill text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-brand-navy text-white font-semibold'
                          : 'text-content-primary hover:bg-black/[0.04]'
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className={cn('w-4 h-4', isActive ? 'text-white' : 'text-content-tertiary')} />
                    </Link>
                  );
                })}
              </nav>

              {/* Emergency Callout in Mobile Menu */}
              <div className="bg-brand-red-light/60 border border-brand-red/20 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-brand-red uppercase tracking-wider">24/7 Rapid Emergency Hotline</p>
                  <p className="text-xs font-mono font-bold text-brand-navy">{COMPANY_INFO.emergencyPhone}</p>
                </div>
                <a
                  href={`tel:${COMPANY_INFO.emergencyPhone.replace(/\s+/g, '')}`}
                  className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md shadow-brand-red/30"
                  aria-label="Call emergency hotline"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>

              {/* Mobile CTA */}
              <Link
                href="/contact"
                className="w-full bg-brand-red text-white text-center py-3.5 rounded-pill font-medium text-sm shadow-md hover:bg-brand-red-hover transition-colors"
              >
                Get a Free Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
