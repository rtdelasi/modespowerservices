import React from 'react';
import { cn } from '@/lib/utils';
import { SectionTone } from './Section';

export interface SectionHeadingProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  tone?: SectionTone;
  className?: string;
}

/**
 * SectionHeading primitive per BRIEF Section 2 & 7:
 * Title and optional description. No small label above.
 * Sentence case, line-height 1.1 for headings, 1.6 for body.
 * Max line length 68ch, left-aligned, text-wrap: balance.
 */
export function SectionHeading({
  title,
  description,
  as: HeadingTag = 'h2',
  tone = 'paper',
  className,
}: SectionHeadingProps) {
  const isDark = tone === 'ink';

  const headingSizes = {
    h1: 'text-display',
    h2: 'text-h2',
    h3: 'text-h3',
  };

  return (
    <div className={cn('max-w-[68ch] space-y-3 mb-10 md:mb-14 text-left', className)}>
      <HeadingTag
        className={cn(
          headingSizes[HeadingTag],
          'font-semibold tracking-tight leading-[1.1]',
          isDark ? 'text-surface' : 'text-ink'
        )}
      >
        {title}
      </HeadingTag>
      {description && (
        <p
          className={cn(
            'text-body leading-[1.6]',
            isDark ? 'text-hairline/85' : 'text-slate'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
