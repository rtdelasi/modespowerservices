import React from 'react';
import { cn } from '@/lib/utils';
import { BaseButton, BaseButtonProps } from './button-base';

export interface SecondaryButtonProps extends BaseButtonProps {
  onDark?: boolean;
}

/**
 * SecondaryButton primitive per BRIEF Section 2:
 * Ink outline (or hairline outline on dark sections), 8px radius.
 * Minimum height 44px. No decorative gradients or glows.
 */
export const SecondaryButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  SecondaryButtonProps
>(({ onDark = false, className, children, ...props }, ref) => {
  return (
    <BaseButton
      ref={ref}
      className={cn(
        'px-6 py-2.5 bg-transparent border',
        onDark
          ? 'border-hairline text-surface hover:bg-surface hover:text-ink active:bg-hairline'
          : 'border-ink text-ink hover:bg-ink hover:text-surface active:bg-ink/90',
        className
      )}
      {...props}
    >
      {children}
    </BaseButton>
  );
});

SecondaryButton.displayName = 'SecondaryButton';
