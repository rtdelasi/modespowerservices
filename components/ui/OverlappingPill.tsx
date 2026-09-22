'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface OverlappingPillProps {
  icon: React.ReactNode;
  text: string;
  subtext?: string;
  href?: string;
  theme?: 'white' | 'navy' | 'red';
  className?: string;
}

export function OverlappingPill({
  icon,
  text,
  subtext,
  href,
  theme = 'white',
  className,
}: OverlappingPillProps) {
  const themeStyles = {
    white: 'bg-white/95 text-brand-navy border border-black/10 shadow-2xl backdrop-blur-xl',
    navy: 'bg-brand-navy/95 text-white border border-white/20 shadow-2xl backdrop-blur-xl',
    red: 'bg-brand-red text-white border border-brand-red-hover shadow-2xl shadow-brand-red/30',
  };

  const iconStyles = {
    white: 'bg-brand-red text-white',
    navy: 'bg-white/10 text-white border border-white/20',
    red: 'bg-white text-brand-red',
  };

  const content = (
    <div
      className={cn(
        'inline-flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full z-20 transition-transform duration-300 hover:scale-[1.02] select-none',
        themeStyles[theme],
        className
      )}
    >
      {/* Strictly Circular Icon Badge (Section 4a.9) */}
      <div
        className={cn(
          'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm',
          iconStyles[theme]
        )}
      >
        {icon}
      </div>

      {/* One-line Reassurance Text */}
      <div className="flex flex-col text-left">
        <span className="text-xs sm:text-sm font-bold tracking-tight leading-tight">
          {text}
        </span>
        {subtext && (
          <span className="text-[10px] text-content-tertiary leading-tight">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block focus:outline-none">
        {content}
      </a>
    );
  }

  return content;
}
