'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Zap, Activity, Cpu, Shield, Sparkles, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackCategory?: 'Installations' | 'Maintenance' | 'Audits' | 'Solar & Hybrid' | 'Industrial' | 'Engineering' | 'Team' | string;
  fallbackTitle?: string;
  fallbackIcon?: React.ReactNode;
  containerClassName?: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Installations: <Zap className="w-8 h-8 text-brand-red" />,
  Maintenance: <Wrench className="w-8 h-8 text-amber-500" />,
  Audits: <Activity className="w-8 h-8 text-blue-500" />,
  'Solar & Hybrid': <Sparkles className="w-8 h-8 text-emerald-500" />,
  'Solar/Custom': <Sparkles className="w-8 h-8 text-emerald-500" />,
  Industrial: <Cpu className="w-8 h-8 text-brand-red" />,
  Team: <Shield className="w-8 h-8 text-brand-red" />,
  Engineering: <Zap className="w-8 h-8 text-brand-red" />,
};

export function ImageWithFallback({
  src,
  alt = 'Modes Power Services',
  fallbackCategory = 'Engineering',
  fallbackTitle,
  fallbackIcon,
  className,
  containerClassName,
  priority = false,
  fill = true,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const icon = fallbackIcon || CATEGORY_ICONS[fallbackCategory] || <Zap className="w-8 h-8 text-brand-red" />;

  const isInvalidSrc = !src || src.trim() === '' || src.includes('unsplash.com') || hasError;

  if (isInvalidSrc) {
    return (
      <div
        className={cn(
          'relative w-full h-full bg-gradient-to-br from-[#0B1E3D] via-[#0D254C] to-[#08152B] flex flex-col items-center justify-center p-6 text-center overflow-hidden select-none border border-white/10',
          containerClassName
        )}
      >
        {/* Subtle decorative energy background */}
        <div className="absolute inset-0 circuit-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-3 max-w-[85%]">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 flex items-center justify-center shadow-lg shadow-black/20">
            {icon}
          </div>

          <div className="space-y-1">
            <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-widest text-brand-red bg-brand-red/10 border border-brand-red/20 px-2.5 py-0.5 rounded-full">
              {fallbackCategory}
            </span>
            {fallbackTitle && (
              <p className="font-display font-bold text-xs text-white/90 line-clamp-2 leading-snug">
                {fallbackTitle}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full overflow-hidden', containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        onError={() => setHasError(true)}
        className={className}
        {...props}
      />
    </div>
  );
}
