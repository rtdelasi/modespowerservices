import React from 'react';
import { cn } from '@/lib/utils';
import { SectionTone } from './Section';

export interface DividerRowProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * DividerRow primitive per BRIEF Section 2 & 4:
 * Lists use hairline divider rows, not identical rounded cards.
 * Left-aligned text, border-t border-hairline.
 */
export function DividerRow({
  tone = 'paper',
  as: Component = 'div',
  children,
  className,
  ...props
}: DividerRowProps) {
  const isDark = tone === 'ink';

  return (
    <Component
      className={cn(
        'w-full py-6 md:py-8 border-t transition-colors',
        isDark ? 'border-white/15 text-surface' : 'border-hairline text-ink',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
