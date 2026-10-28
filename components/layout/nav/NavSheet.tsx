'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, PhoneCall } from 'lucide-react';
import { siteConfig, getTelHref } from '@/lib/site-config';
import { Logo } from '@/components/ui/Logo';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useNavContext } from './NavContext';
import { NavLink } from './NavLink';

export interface NavSheetProps {
  className?: string;
}

/**
 * Nav.Sheet compound component
 * - Full-screen mobile menu sheet
 * - Accessible dialog with role="dialog", aria-modal="true"
 * - Robust focus trap (Tab / Shift+Tab cycling)
 * - Escape key support returning focus to trigger
 * - 44px minimum touch targets on all interactive items
 * - Emergency phone and "Request a quote" button pinned to the bottom
 */
export function NavSheet({ className }: NavSheetProps) {
  const { state, actions, meta } = useNavContext();

  // Focus trap: set initial focus on mount
  useEffect(() => {
    if (!state.isOpen) return;

    // Small timeout ensures DOM elements are rendered and ready for focus
    const timer = setTimeout(() => {
      const container = meta.sheetRef.current;
      if (!container) return;

      const focusables = container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length > 0) {
        focusables[0].focus();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [state.isOpen, meta.sheetRef]);

  // Trap focus keydown inside sheet container
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;

    const container = meta.sheetRef.current;
    if (!container) return;

    const focusables = container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!state.isOpen) {
    return null;
  }

  return (
    <div
      ref={meta.sheetRef}
      id="mobile-nav-sheet"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 bg-paper text-ink flex flex-col h-[100dvh] w-full overflow-hidden select-none"
    >
      {/* Sheet Top Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-hairline bg-surface/80 backdrop-blur-sm">
        <Link
          href="/"
          onClick={actions.close}
          className="flex items-center gap-3 rounded-button focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 py-1 pr-2"
          aria-label={`${siteConfig.name} - Home`}
        >
          <div className="w-10 h-10 rounded-button bg-white flex items-center justify-center p-1 border border-hairline shadow-sm shrink-0">
            <Logo variant="default" size={32} alt={siteConfig.name} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-base tracking-tight text-ink leading-none">
              {siteConfig.shortName}
            </span>
            <span className="text-[11px] font-medium tracking-wider text-signal uppercase leading-none mt-1">
              Power Services
            </span>
          </div>
        </Link>

        {/* Close Button with 44px min touch target */}
        <button
          type="button"
          onClick={actions.close}
          aria-label="Close navigation menu"
          className="min-w-[44px] min-h-[44px] p-2.5 rounded-button flex items-center justify-center text-ink hover:bg-black/5 active:bg-black/10 transition-colors focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Middle Navigation Links (Scrollable if viewport is short) */}
      <nav
        aria-label="Mobile Navigation"
        className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-2"
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-slate px-4 pb-2">
          Navigation
        </div>
        {siteConfig.navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} variant="mobile">
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Pinned Bottom Area: Emergency Phone + Request a Quote */}
      <div className="mt-auto p-5 border-t border-hairline bg-surface shadow-lg space-y-3">
        {/* Emergency Hotline Button (44px target) */}
        <a
          href={getTelHref(siteConfig.phone)}
          onClick={actions.close}
          aria-label={`Call emergency line: ${siteConfig.phone}`}
          className="w-full min-h-[44px] px-4 py-2.5 rounded-button bg-signal/10 border border-signal/30 hover:bg-signal/15 active:bg-signal/20 transition-colors flex items-center justify-between text-ink font-medium text-sm focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-signal text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-semibold text-signal uppercase tracking-wider leading-none">
                24/7 Emergency Line
              </span>
              <span className="text-xs font-mono font-bold text-ink mt-0.5">
                {siteConfig.phone}
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-signal underline">Call</span>
        </a>

        {/* Primary Action Button: Request a quote (44px target) */}
        <PrimaryButton
          href="/contact"
          onClick={actions.close}
          className="w-full min-h-[44px] justify-center text-sm font-semibold shadow-sm"
        >
          Request a quote
        </PrimaryButton>
      </div>
    </div>
  );
}
