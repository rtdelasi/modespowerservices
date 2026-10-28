'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { NavContext, NavContextValue } from './NavContext';

export interface NavRootProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Nav.Root compound component
 * - Single source of truth for navigation state, actions, and refs
 * - Employs an IntersectionObserver sentinel to detect scroll on the home hero
 *   (never uses window scroll listeners per BRIEF & Phase 2 task 2)
 * - Manages body scroll lock when mobile sheet is open
 * - Handles Escape key listener to close menu and return focus to trigger
 */
export function NavRoot({ children, className }: NavRootProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [isOpen, setIsOpen] = useState(false);
  // On non-home pages, the header is ALWAYS solid from the start.
  // On the home page, it is transparent until the top sentinel scrolls out of view.
  const [isScrolled, setIsScrolled] = useState(!isHome);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle Escape key to close mobile menu and return focus to trigger
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Scroll detection using IntersectionObserver sentinel
  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Observe sentinel at the top of the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If sentinel is visible at the very top, header is not scrolled (transparent)
        // If sentinel is out of view, header is scrolled (solid)
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null, // viewport
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [isHome]);

  const actions = useMemo(
    () => ({
      open: () => setIsOpen(true),
      close: () => {
        setIsOpen(false);
        triggerRef.current?.focus();
      },
      toggle: () => {
        setIsOpen((prev) => {
          const next = !prev;
          if (!next) {
            triggerRef.current?.focus();
          }
          return next;
        });
      },
    }),
    []
  );

  const contextValue: NavContextValue = useMemo(
    () => ({
      state: {
        isOpen,
        isScrolled,
        isHome,
        pathname,
      },
      actions,
      meta: {
        triggerRef,
        sheetRef,
        sentinelRef,
      },
    }),
    [isOpen, isScrolled, isHome, pathname, actions]
  );

  return (
    <NavContext.Provider value={contextValue}>
      {/* Scroll detection sentinel element: lives in normal flow at top of page */}
      <div
        ref={sentinelRef}
        id="nav-scroll-sentinel"
        className="absolute top-0 left-0 w-full h-[1px] pointer-events-none opacity-0 -z-50"
        aria-hidden="true"
      />
      <div className={className}>{children}</div>
    </NavContext.Provider>
  );
}
