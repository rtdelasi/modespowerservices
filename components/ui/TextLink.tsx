import React from 'react';
import { cn } from '@/lib/utils';
import { BaseButton, BaseButtonProps } from './button-base';

export interface TextLinkProps extends BaseButtonProps {
  onDark?: boolean;
}

/**
 * TextLink primitive per BRIEF Section 2:
 * Underline on hover. Minimum height 44px for accessibility.
 * Clean, left-aligned or inline text link.
 */
export const TextLink = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  TextLinkProps
>(({ onDark = false, className, children, ...props }, ref) => {
  return (
    <BaseButton
      ref={ref}
      className={cn(
        'px-0 py-2 min-h-[44px] bg-transparent rounded-none underline-offset-4 hover:underline justify-start',
        onDark ? 'text-surface hover:text-white' : 'text-ink hover:text-ink/80',
        className
      )}
      {...props}
    >
      {children}
    </BaseButton>
  );
});

TextLink.displayName = 'TextLink';
