'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavContext } from './NavContext';

export interface NavTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

/**
 * Nav.Trigger compound component
 * - Hamburger / close toggle button with 44px minimum touch target
 * - Maintains ref connection to NavContext for returning keyboard focus
 * - Accessible aria-expanded, aria-controls, and aria-label attributes
 */
export function NavTrigger({ className, ...props }: NavTriggerProps) {
  const { state, actions, meta } = useNavContext();
  const isSolid = !state.isHome || state.isScrolled;

  return (
    <button
      ref={meta.triggerRef}
      type="button"
      onClick={actions.toggle}
      aria-label={state.isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={state.isOpen}
      aria-controls="mobile-nav-sheet"
      className={cn(
        'lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-button flex items-center justify-center transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2',
        isSolid
          ? 'text-ink hover:bg-black/5 active:bg-black/10'
          : 'text-white hover:bg-white/10 active:bg-white/20',
        className
      )}
      {...props}
    >
      {state.isOpen ? (
        <X className="w-6 h-6" aria-hidden="true" />
      ) : (
        <Menu className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
}
