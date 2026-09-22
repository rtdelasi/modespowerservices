'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PairedButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'white' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export function PairedButton({
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className,
}: PairedButtonProps) {
  const iconNode = icon || <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />;

  const sizeStyles = {
    sm: {
      pill: 'text-xs px-4 py-2',
      circle: 'w-8 h-8 text-xs',
    },
    md: {
      pill: 'text-sm px-5 py-2.5 sm:px-6 sm:py-3 font-semibold',
      circle: 'w-10 h-10 sm:w-11 sm:h-11 text-sm',
    },
    lg: {
      pill: 'text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 font-semibold',
      circle: 'w-11 h-11 sm:w-12 sm:h-12 text-base',
    },
  };

  const variantStyles = {
    primary: {
      pill: 'bg-brand-red text-white hover:bg-brand-red-hover shadow-md hover:shadow-glow-red',
      circle: 'bg-brand-red text-white hover:bg-brand-red-hover shadow-md hover:shadow-glow-red',
    },
    secondary: {
      pill: 'bg-brand-navy text-white hover:bg-brand-navy-light shadow-md hover:shadow-glow-navy',
      circle: 'bg-brand-navy text-white hover:bg-brand-navy-light shadow-md hover:shadow-glow-navy',
    },
    white: {
      pill: 'bg-white text-brand-navy hover:bg-neutral-100 shadow-md',
      circle: 'bg-white text-brand-navy hover:bg-neutral-100 shadow-md',
    },
    'outline-white': {
      pill: 'border-2 border-white/40 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm',
      circle: 'border-2 border-white/40 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm',
    },
  };

  const content = (
    <div className={cn('inline-flex items-center gap-2 group', className)}>
      {/* 1. Main Pill Button */}
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-pill transition-all duration-300 select-none hover:-translate-y-0.5',
          sizeStyles[size].pill,
          variantStyles[variant].pill
        )}
      >
        {label}
      </span>

      {/* 2. Separate Companion Circular Icon Button (Section 4a.12) */}
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-300 select-none shrink-0 hover:scale-105 hover:-translate-y-0.5',
          sizeStyles[size].circle,
          variantStyles[variant].circle
        )}
        aria-hidden="true"
      >
        {iconNode}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block focus:outline-none cursor-pointer">
      {content}
    </button>
  );
}
