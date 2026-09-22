'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-pill transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-center cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-brand-red text-white hover:bg-brand-red-hover shadow-md hover:shadow-glow-red hover:-translate-y-0.5',
    secondary:
      'bg-brand-navy text-white hover:bg-brand-navy-light shadow-md hover:shadow-glow-navy hover:-translate-y-0.5',
    outline:
      'border-2 border-brand-navy/20 text-brand-navy hover:border-brand-navy hover:bg-brand-navy/5',
    'outline-white':
      'border-2 border-white/40 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm',
    ghost:
      'text-brand-navy hover:bg-brand-navy/5',
    white:
      'bg-white text-brand-navy hover:bg-neutral-100 shadow-md hover:-translate-y-0.5',
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0 transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(combinedClasses, 'group')}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(combinedClasses, 'group')} {...props}>
      {content}
    </button>
  );
}
