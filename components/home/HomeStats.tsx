import React from 'react';
import { siteContent } from '@/lib/site-content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Stat } from '@/components/ui/Stat';

/**
 * Stats Row component below Hero per BRIEF Section 2 & 4 and Phase 3
 * - Tone: paper (#F6F7F9) with subtle hairline divider
 * - Exactly four stat items using single source of truth in lib/site-content.ts
 * - Static tabular numerals, no count-up animation
 * - Shown once on the home page (no duplicates)
 */
export function HomeStats() {
  return (
    <Section tone="paper" id="home-stats" className="py-16 md:py-24 border-b border-hairline">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {siteContent.stats.map((stat) => (
            <Stat
              key={stat.id}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              tone="paper"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
