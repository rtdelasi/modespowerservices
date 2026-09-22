'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface EyebrowTagProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  theme?: 'red' | 'navy' | 'white' | 'dark-outline';
  className?: string;
}

export function EyebrowTag({
  children,
  icon,
  theme = 'red',
  className,
}: EyebrowTagProps) {
  const themeStyles = {
    red: 'border border-brand-red/40 text-brand-red bg-transparent',
    navy: 'border border-brand-navy/30 text-brand-navy bg-transparent',
    white: 'border border-white/30 text-white bg-transparent',
    'dark-outline': 'border border-white/20 text-neutral-300 bg-transparent',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1 rounded-pill text-[11px] font-bold uppercase tracking-widest transition-colors',
        themeStyles[theme],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
