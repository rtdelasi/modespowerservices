'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ServiceItem } from '@/lib/services';

interface ServicesStickyNavProps {
  services: ServiceItem[];
  className?: string;
}

/**
 * Desktop sticky navigation index for the Services page per Phase 9a.
 * - Sticky on desktop (hidden on mobile to prevent overflow)
 * - Highlights current section based on IntersectionObserver and scroll position
 * - Fully keyboard operable with standard focus rings and native anchor navigation
 */
export function ServicesStickyNav({ services, className }: ServicesStickyNavProps) {
  const [activeId, setActiveId] = useState<string>(services[0]?.id || 'installations');

  // Handle URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && services.some((s) => s.id === hash)) {
      setActiveId(hash);
    }
  }, [services]);

  // Set up IntersectionObserver for the five service sections
  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      const intersecting = entries.filter((entry) => entry.isIntersecting);
      if (intersecting.length > 0) {
        // Pick the intersecting section closest to the top offset
        const best = intersecting.reduce((prev, curr) => {
          return Math.abs(curr.boundingClientRect.top - 96) <
            Math.abs(prev.boundingClientRect.top - 96)
            ? curr
            : prev;
        });
        setActiveId(best.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-80px 0px -50% 0px',
      threshold: [0, 0.1, 0.4],
    });

    services.forEach((service) => {
      const el = document.getElementById(service.id);
      if (el) observer.observe(el);
    });

    // Fallback scroll listener for top and bottom of page
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollY >= docHeight - 100) {
        setActiveId(services[services.length - 1].id);
      } else if (scrollY < 200) {
        setActiveId(services[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [services]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setActiveId(id);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
      }
    },
    []
  );

  return (
    <nav
      aria-label="Services index"
      className={cn('sticky top-28 space-y-3', className)}
    >
      <p className="text-small font-semibold text-slate uppercase tracking-wider">
        Services index
      </p>
      <ul className="space-y-1 border-l border-hairline" role="list">
        {services.map((service) => {
          const isActive = activeId === service.id;
          return (
            <li key={service.id}>
              <a
                href={`#${service.id}`}
                onClick={(e) => handleNavClick(e, service.id)}
                className={cn(
                  'block py-2.5 pl-4 -ml-[2px] text-small transition-colors border-l-2',
                  'focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-sm',
                  isActive
                    ? 'border-ink text-ink font-semibold'
                    : 'border-transparent text-slate hover:text-ink hover:border-hairline font-medium'
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                {service.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
