'use client';

import React from 'react';
import { EyebrowTag } from './EyebrowTag';
import { DottedDivider } from './DottedDivider';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  theme?: 'navy' | 'light';
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  theme = 'light',
  align = 'left',
  className,
}: SectionHeaderProps) {
  const isDark = theme === 'navy';

  return (
    <div
      className={cn(
        'space-y-3.5',
        align === 'center' ? 'text-center max-w-3xl mx-auto flex flex-col items-center' : 'max-w-2xl',
        className
      )}
    >
      {/* 1. Outlined Pill Eyebrow Tag (Section 4a.7) */}
      <EyebrowTag
        theme={isDark ? 'white' : 'red'}
        icon={eyebrowIcon}
      >
        {eyebrow}
      </EyebrowTag>

      {/* 2. Main Heading */}
      <h2
        className={cn(
          'font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight',
          isDark ? 'text-white' : 'text-brand-navy'
        )}
      >
        {title}
      </h2>

      {/* 3. Dotted Divider Underline Motif (Section 4a.8) */}
      <DottedDivider
        theme={isDark ? 'red' : 'red'}
        align={align}
        count={7}
      />

      {/* 4. Subtitle */}
      {subtitle && (
        <p
          className={cn(
            'text-sm sm:text-base leading-relaxed pt-1',
            isDark ? 'text-neutral-300' : 'text-content-secondary'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
