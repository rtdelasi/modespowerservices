import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

/**
 * BaseButton primitive:
 * Shared base for PrimaryButton, SecondaryButton, and TextLink.
 * Renders an anchor when given href, otherwise a button.
 * Minimum touch target 44px, visible focus ring with 2px signal outline and 2px offset.
 */
export const BaseButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, BaseButtonProps>(
  ({ href, external, className, children, disabled, type = 'button', ...props }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-[8px] min-h-[44px] min-w-[44px] text-body select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2',
      className
    );

    if (href) {
      const isExternal =
        external ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:');

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={baseClasses}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-disabled={disabled}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          aria-disabled={disabled}
          {...(props as any)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={baseClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BaseButton.displayName = 'BaseButton';
