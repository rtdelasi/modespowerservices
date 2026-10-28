import React from 'react';
import { cn } from '@/lib/utils';
import { SectionTone } from './Section';

export interface StatProps {
  value: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  tone?: SectionTone;
  className?: string;
}

/**
 * Stat primitive per BRIEF Section 2 & 4:
 * Tabular numerals for stats and specs.
 * Value with fluid display/h2 clamp, sentence case label.
 */
export function Stat({
  value,
  label,
  description,
  tone = 'paper',
  className,
}: StatProps) {
  const isDark = tone === 'ink';

  return (
    <div className={cn('flex flex-col space-y-1.5 text-left', className)}>
      <div
        className={cn(
          'tabular-nums text-h2 md:text-display font-semibold tracking-tight leading-[1.1]',
          isDark ? 'text-surface' : 'text-ink'
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          'text-body font-medium leading-[1.4]',
          isDark ? 'text-surface/90' : 'text-ink'
        )}
      >
        {label}
      </div>
      {description && (
        <div
          className={cn(
            'text-small leading-[1.6] max-w-[40ch]',
            isDark ? 'text-hairline/75' : 'text-slate'
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
