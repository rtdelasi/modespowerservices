'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';

interface GradientInterstitialProps {
  eyebrow?: string;
  headline?: string;
  highlightText?: string;
  subtext?: string;
}

export function GradientInterstitial({
  eyebrow = 'Engineered For Uninterrupted Power',
  headline = 'Precision Engineering That Protects Capital, Personnel & Continuous Uptime.',
  highlightText = 'Zero Compromise.',
  subtext = 'We adhere strictly to IEEE, BS 7671, and Energy Commission of Ghana engineering standards across every phase of design, commissioning, and maintenance.',
}: GradientInterstitialProps) {
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 max-w-[1440px] mx-auto">
      {/* Section 4a.10: Asymmetric section radius for color-block interstitial */}
      <div className="relative w-full rounded-t-[32px] sm:rounded-t-[44px] rounded-b-none overflow-hidden bg-brand-navy text-white p-8 sm:p-12 md:p-16 lg:p-20 text-center border border-white/10 shadow-2xl">
        {/* Animated Gradient Glow & Wave Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,16,46,0.35),rgba(11,30,61,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(18,43,85,0.8),rgba(11,30,61,0))]" />
        <div className="absolute inset-0 circuit-pattern opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          {/* Section 4a.7 Outlined Pill Eyebrow */}
          <EyebrowTag theme="white" icon={<Zap className="w-3.5 h-3.5 text-brand-red" />}>
            {eyebrow}
          </EyebrowTag>

          {/* Display Heading */}
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-white">
            {headline}{' '}
            <span className="text-brand-red underline decoration-brand-red/40 underline-offset-8">
              {highlightText}
            </span>
          </h2>

          {/* Section 4a.8 Dotted Divider Motif */}
          <DottedDivider theme="red" align="center" count={8} className="py-2" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {subtext}
          </p>
        </div>
      </div>
    </div>
  );
}
