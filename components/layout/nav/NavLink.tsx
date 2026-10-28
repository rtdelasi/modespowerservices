'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useNavContext } from './NavContext';

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'desktop' | 'mobile';
  className?: string;
  onClick?: () => void;
}

/**
 * Nav.Link compound component
 * - Marks active route with aria-current="page"
 * - Automatically computes active state based on current pathname
 * - Ensures 44px accessible touch target size
 * - Closes mobile sheet on click when open
 */
export function NavLink({
  href,
  children,
  variant = 'desktop',
  className,
  onClick,
}: NavLinkProps) {
  const { state, actions } = useNavContext();
  const isActive = state.pathname === href || (href !== '/' && state.pathname.startsWith(href));
  const isSolid = !state.isHome || state.isScrolled;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (state.isOpen) {
      actions.close();
    }
    onClick?.();
  };

  if (variant === 'mobile') {
    return (
      <Link
        href={href}
        prefetch={true}
        aria-current={isActive ? 'page' : undefined}
        onClick={handleClick}
        className={cn(
          'w-full min-h-[48px] px-4 py-3 rounded-button flex items-center justify-between text-base transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2',
          isActive
            ? 'bg-ink text-surface font-semibold shadow-sm'
            : 'text-ink hover:bg-black/5 active:bg-black/10 font-normal',
          className
        )}
      >
        <span>{children}</span>
        {isActive && (
          <span
            className="w-2 h-2 rounded-full bg-signal shrink-0"
            aria-hidden="true"
          />
        )}
      </Link>
    );
  }

  // Desktop variant
  return (
    <Link
      href={href}
      prefetch={true}
      aria-current={isActive ? 'page' : undefined}
      onClick={handleClick}
      className={cn(
        'relative min-h-[44px] px-3.5 py-2.5 rounded-button inline-flex items-center text-sm transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2',
        isSolid
          ? isActive
            ? 'text-ink font-semibold'
            : 'text-slate hover:text-ink font-normal'
          : isActive
          ? 'text-white font-semibold'
          : 'text-white/80 hover:text-white font-normal',
        className
      )}
    >
      <span>{children}</span>
      {isActive && (
        <span
          className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-signal rounded-full"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
