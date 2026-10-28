import React from 'react';
import { siteConfig, getTelHref } from '@/lib/site-config';
import { siteContent } from '@/lib/site-content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

/**
 * Quote and Emergency Band per BRIEF Section 4 & Phase 4
 * - Section tone: ink (#0B1E3D)
 * - Heading: "Need a site assessment or power restored?"
 * - PrimaryButton: "Request a quote"
 * - Emergency phone line link with number in signal red
 */
export function QuoteBand() {
  return (
    <Section tone="ink" id="quote-band" className="py-16 md:py-24">
      <Container className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
        {/* Left Column: Heading & Context */}
        <div className="max-w-2xl text-left">
          <h2 className="text-h2 font-semibold text-white tracking-tight leading-[1.1] text-balance">
            {siteContent.quoteBand.heading}
          </h2>
          <p className="text-body text-hairline/85 mt-3 leading-[1.6] text-balance">
            {siteContent.quoteBand.subtext}
          </p>
        </div>

        {/* Right Column: Actions (Request a Quote + Call Emergency Line) */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0">
          <PrimaryButton href={siteContent.quoteBand.primaryCta.href}>
            {siteContent.quoteBand.primaryCta.label}
          </PrimaryButton>

          <a
            href={getTelHref(siteConfig.phone)}
            className="text-signal hover:underline text-small sm:text-body font-mono font-medium focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-sm inline-flex items-center gap-1.5"
            aria-label={`Call emergency line: ${siteConfig.phone}`}
          >
            <span>{siteContent.quoteBand.emergencyCallLabel}:</span>
            <span className="font-semibold">{siteConfig.phone}</span>
          </a>
        </div>
      </Container>
    </Section>
  );
}
