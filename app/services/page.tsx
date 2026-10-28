import React from 'react';
import { Metadata } from 'next';
import { Container, Section, TextLink } from '@/components/ui';
import { SERVICES } from '@/lib/services';
import { ServicesStickyNav } from '@/components/services';
import { QuoteBand } from '@/components/home/QuoteBand';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Turnkey electrical engineering across 415 V to 33 kV infrastructure, preventative maintenance, power quality logging, and commercial solar microgrids.',
  openGraph: {
    title: 'Services | Modes Power Services',
    description:
      'Turnkey electrical engineering across 415 V to 33 kV infrastructure, preventative maintenance, power quality logging, and commercial solar microgrids.',
    type: 'website',
  },
};

export const revalidate = 60;

/**
 * Services Page (Redesign per BRIEF & Phase 9a)
 * - Page header with fluid typography
 * - Five services from lib/services.ts as large divider sections
 * - Anchor IDs: installations, maintenance, audits, solutions, emergency
 * - scroll-margin-top equal to header height (scroll-mt-20 md:scroll-mt-24)
 * - Desktop sticky list on the left with active section highlighting & keyboard operability
 * - Each section: title, summary, key spec with tabular numbers, longer scope list, and TextLink "Request a quote for this"
 * - Quote and emergency band at bottom
 */
export default function ServicesPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Section tone="paper" className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <Container>
          {/* 1. Page Header */}
          <header className="mb-12 md:mb-16">
            <h1 className="text-display font-semibold text-ink tracking-tight leading-[1.1]">
              Engineering services
            </h1>
            <p className="text-body text-slate max-w-[68ch] mt-3 leading-[1.6]">
              Turnkey electrical engineering across 415 V to 33 kV infrastructure, preventative maintenance, power quality logging, and commercial solar microgrids.
            </p>
          </header>

          {/* 2. Main Content: Desktop Sticky Nav on Left, Divider Sections on Right */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            {/* Desktop Sticky List on the Left */}
            <aside className="hidden lg:block lg:w-72 lg:shrink-0">
              <ServicesStickyNav services={SERVICES} />
            </aside>

            {/* Five Services Large Divider Sections */}
            <div className="flex-1 min-w-0 flex flex-col">
              {SERVICES.map((service, index) => (
                <article
                  key={service.id}
                  id={service.id}
                  className={cn(
                    'scroll-mt-20 md:scroll-mt-24 py-12 md:py-16 border-t border-hairline first:border-t-0 first:pt-0',
                    index === SERVICES.length - 1 ? 'pb-0' : ''
                  )}
                >
                  {/* Title */}
                  <h2 className="text-h2 font-semibold text-ink tracking-tight leading-[1.1] text-balance">
                    {service.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-body text-slate mt-3 leading-[1.6] max-w-[68ch]">
                    {service.summary}
                  </p>

                  {/* Key Specification */}
                  <div className="my-6 py-3.5 border-y border-hairline flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 max-w-[68ch]">
                    <span className="text-small font-medium text-slate">Key specification</span>
                    <span className="text-small font-semibold text-ink tabular-nums text-left sm:text-right">
                      {service.keySpec}
                    </span>
                  </div>

                  {/* Longer Scope as a Short List */}
                  <div className="my-6 max-w-[68ch]">
                    <h3 className="text-small font-semibold text-ink uppercase tracking-wider mb-3">
                      Scope of work
                    </h3>
                    <ul className="space-y-2 text-body text-slate" role="list">
                      {service.longerScope.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-slate/50 mt-2.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="leading-[1.6]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* TextLink "Request a quote for this" */}
                  <div className="pt-2">
                    <TextLink
                      href={`/contact?service=${service.id}`}
                      aria-label={`Request a quote for ${service.title}`}
                    >
                      Request a quote for this
                    </TextLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Quote and Emergency Band */}
      <QuoteBand />
    </div>
  );
}
