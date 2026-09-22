'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DottedDividerProps {
  theme?: 'red' | 'navy' | 'white' | 'muted';
  align?: 'left' | 'center' | 'right';
  count?: number;
  className?: string;
}

export function DottedDivider({
  theme = 'red',
  align = 'left',
  count = 6,
  className,
}: DottedDividerProps) {
  const dotColor = {
    red: 'bg-brand-red',
    navy: 'bg-brand-navy',
    white: 'bg-white/80',
    muted: 'bg-neutral-300',
  };

  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={cn('flex items-center gap-1.5 py-1 select-none', alignStyles[align], className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'rounded-full transition-all duration-300',
            dotColor[theme],
            i === 0 || i === count - 1 ? 'w-1 h-1 opacity-50' : 'w-1.5 h-1.5',
            i === Math.floor(count / 2) && 'w-2 h-2 opacity-100'
          )}
        />
      ))}
    </div>
  );
}
