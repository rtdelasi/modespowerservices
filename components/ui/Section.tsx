import React from 'react';
import { cn } from '@/lib/utils';

export type SectionTone = 'paper' | 'surface' | 'ink';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

/**
 * Section primitive per BRIEF Section 2 & 7:
 * Tone: paper (#F6F7F9), surface (#FFFFFF), or ink (#0B1E3D).
 * Section padding: 96 to 128px on desktop, 64 to 80px on mobile (py-16 md:py-28).
 */
export function Section({
  tone = 'paper',
  as: Component = 'section',
  children,
  className,
  id,
  ...props
}: SectionProps) {
  const toneStyles: Record<SectionTone, string> = {
    paper: 'bg-paper text-ink',
    surface: 'bg-surface text-ink',
    ink: 'bg-ink text-surface',
  };

  return (
    <Component
      id={id}
      className={cn('w-full py-16 md:py-28 transition-colors', toneStyles[tone], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
