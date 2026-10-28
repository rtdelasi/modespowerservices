import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

/**
 * Container primitive per BRIEF Section 2:
 * Container max 1200px, side gutter 20px on mobile (px-5) and 32px on desktop (md:px-8).
 */
export function Container({
  as: Component = 'div',
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('w-full max-w-[1200px] mx-auto px-5 md:px-8', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
