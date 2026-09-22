'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type LogoVariant = 'default' | 'with-tagline';

export interface LogoProps {
  variant?: LogoVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  priority?: boolean;
  alt?: string;
}

const SIZE_MAP = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
};

export function Logo({
  variant = 'default',
  size = 'md',
  className,
  priority = false,
  alt = 'Modes Power Services Ltd. — Your Power Solution',
}: LogoProps) {
  const dimension = typeof size === 'number' ? size : SIZE_MAP[size] || 48;
  const src =
    variant === 'with-tagline'
      ? '/logos/modes-logo-with-tagline.png'
      : '/logos/modes-logo.png';

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 select-none',
        className
      )}
      style={{ width: dimension, height: dimension }}
    >
      <Image
        src={src}
        alt={alt}
        width={dimension}
        height={dimension}
        priority={priority}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
