import React from 'react';
import { siteContent } from '@/lib/site-content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

/**
 * Why Modes section per BRIEF Section 4 & Phase 4
 * - Left column: short statement heading and introductory context
 * - Right column: four short points (rapid response, certified Class A, safety testing, transparent BOQ pricing)
 * - Prohibitions strictly enforced: no icons in coloured tiles, no numbering (BRIEF Section 2 & Task 3)
 */
export function WhyModes() {
  return (
    <Section tone="paper" id="why-modes" className="py-16 md:py-24 border-b border-hairline">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Short Statement Heading */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-h2 font-semibold text-ink tracking-tight leading-[1.1] text-balance">
              {siteContent.whyModes.heading}
            </h2>
            <p className="text-body text-slate mt-4 leading-[1.6] text-balance">
              {siteContent.whyModes.subtext}
            </p>
          </div>

          {/* Right Column: Four Short Points (No colored tiles, no numbering) */}
          <div className="lg:col-span-7 flex flex-col" role="list">
            {siteContent.whyModes.points.map((point) => (
              <div
                key={point.id}
                className="py-6 first:pt-0 last:pb-0 border-b last:border-b-0 border-hairline text-left"
                role="listitem"
              >
                <h3 className="text-body md:text-lg font-semibold text-ink leading-[1.3]">
                  {point.title}
                </h3>
                <p className="text-small md:text-body text-slate mt-2 leading-[1.6]">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
