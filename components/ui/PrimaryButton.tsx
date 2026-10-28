import React from 'react';
import { cn } from '@/lib/utils';
import { BaseButton, BaseButtonProps } from './button-base';

export interface PrimaryButtonProps extends BaseButtonProps {}

/**
 * PrimaryButton primitive per BRIEF Section 2:
 * Signal red (#C8102E) background, white text.
 * 8px border radius, minimum height 44px.
 * No decorative gradients, glows or shadows.
 */
export const PrimaryButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PrimaryButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <BaseButton
      ref={ref}
      className={cn(
        'px-6 py-2.5 bg-signal hover:bg-signal-hover text-white active:bg-[#900B20]',
        className
      )}
      {...props}
    >
      {children}
    </BaseButton>
  );
});

PrimaryButton.displayName = 'PrimaryButton';
