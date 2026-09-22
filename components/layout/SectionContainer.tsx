'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  theme?: 'white' | 'navy' | 'cream' | 'transparent';
  radius?: 'all' | 'top-only' | 'none';
  noPadding?: boolean;
  className?: string;
  innerClassName?: string;
  id?: string;
  animate?: boolean;
}

export function SectionContainer({
  children,
  theme = 'white',
  radius = 'all',
  noPadding = false,
  className,
  innerClassName,
  id,
  animate,
  ...props
}: SectionContainerProps) {
  const themeStyles = {
    white: 'bg-white text-content-primary shadow-soft-card border border-black/[0.04]',
    navy: 'bg-brand-navy text-white shadow-soft-card border border-white/[0.08]',
    cream: 'bg-canvas-cream text-content-primary',
    transparent: 'bg-transparent text-content-primary',
  };

  const radiusStyles = {
    all: 'rounded-[28px] sm:rounded-[36px]',
    'top-only': 'rounded-t-[28px] sm:rounded-t-[36px] rounded-b-none',
    none: 'rounded-none',
  };

  return (
    <div id={id} className={cn('w-full px-3 sm:px-4 md:px-6 lg:px-8 py-2 md:py-3 max-w-[1440px] mx-auto', className)}>
      <section
        {...props}
        className={cn(
          'relative w-full transition-all duration-300',
          themeStyles[theme],
          radiusStyles[radius],
          !noPadding && 'p-6 sm:p-8 md:p-12 lg:p-16',
          innerClassName
        )}
      >
        {children}
      </section>
    </div>
  );
}
