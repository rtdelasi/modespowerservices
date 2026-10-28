import React from 'react';
import { HOME_SERVICES } from '@/lib/services';
import { siteContent } from '@/lib/site-content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { DividerRow } from '@/components/ui/DividerRow';
import { TextLink } from '@/components/ui/TextLink';

/**
 * Home Services section per BRIEF Section 4 & Phase 4
 * - Three DividerRows (installations, maintenance, solar and hybrid solutions)
 * - Each row: title, one-sentence summary, key spec with tabular numbers, and TextLink "Technical scope"
 * - Clean mobile stacking at 375px without horizontal overflow
 * - Includes a TextLink "All services" linking to /services
 */
export function HomeServices() {
  return (
    <Section tone="surface" id="services" className="py-16 md:py-24 border-b border-hairline">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 pb-8">
          <h2 data-diagram-node className="text-h2 font-semibold text-ink tracking-tight leading-[1.1]">
            {siteContent.servicesSection.heading}
          </h2>
          <TextLink
            href={siteContent.servicesSection.allServicesLink.href}
            className="text-small font-medium text-ink hover:text-ink/80 self-start sm:self-auto"
          >
            {siteContent.servicesSection.allServicesLink.label}
          </TextLink>
        </div>

        {/* Three Service Divider Rows */}
        <div className="flex flex-col" role="list">
          {HOME_SERVICES.map((service) => (
            <DividerRow
              key={service.id}
              tone="surface"
              className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-4 lg:gap-8 py-8 first:border-t border-hairline"
              role="listitem"
            >
              {/* Left Column: Title and Summary */}
              <div className="flex-1 max-w-2xl text-left">
                <h3 className="text-h3 font-semibold text-ink tracking-tight leading-[1.2]">
                  {service.title}
                </h3>
                <p className="text-body text-slate mt-2 leading-[1.6]">
                  {service.summary}
                </p>
              </div>

              {/* Right Column: Key Spec (Tabular Numbers) + Technical Scope Link */}
              <div className="shrink-0 flex flex-col items-start lg:items-end justify-between gap-2.5 mt-2 lg:mt-0 text-left lg:text-right">
                <span className="text-small font-medium text-ink tabular-nums max-w-xs">
                  {service.keySpec}
                </span>
                <TextLink
                  href={`/services#${service.id}`}
                  className="text-small font-medium text-ink hover:text-ink/80"
                  aria-label={`View technical scope for ${service.title}`}
                >
                  Technical scope
                </TextLink>
              </div>
            </DividerRow>
          ))}
        </div>
      </Container>
    </Section>
  );
}
