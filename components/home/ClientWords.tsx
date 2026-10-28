import React from 'react';
import { Container, Section } from '@/components/ui';
import { siteContent } from '@/lib/site-content';

/**
 * ClientWords section per BRIEF Section 4 & TASK 2:
 * - Up to three quote blocks with hairline top border
 * - Quote text, then name, role, and company
 * - No cards, no avatars with initials, no quote-mark decorations
 * - Minimum font size 14px floor
 */
export function ClientWords() {
  const { heading, quotes } = siteContent.testimonialsSection;

  if (!quotes || (quotes as readonly unknown[]).length === 0) {
    return null;
  }


  return (
    <Section tone="paper" id="client-words" className="scroll-mt-20 md:scroll-mt-24 py-16 md:py-24 border-t border-hairline">
      <Container>
        {/* Section Heading */}
        <h2 data-diagram-node className="text-h2 font-semibold text-ink tracking-tight leading-[1.1] mb-10 md:mb-14">
          {heading}
        </h2>

        {/* Quote Blocks Grid (Stacked mobile, 3-col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {quotes.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="border-t border-hairline pt-6 flex flex-col justify-between"
            >
              <blockquote className="text-body text-ink leading-[1.6]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <footer className="mt-6 pt-4 border-t border-hairline/60">
                <cite className="not-italic block">
                  <span className="text-body font-semibold text-ink block">
                    {item.author}
                  </span>
                  <span className="text-small text-slate block mt-1 leading-[1.4]">
                    {item.role}, {item.company}
                  </span>
                </cite>
              </footer>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
