'use client';

import React from 'react';
import Image from 'next/image';
import { Zap, PhoneCall } from 'lucide-react';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';
import { PairedButton } from '@/components/ui/PairedButton';
import { COMPANY_INFO } from '@/data/company';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  image?: string | null;
}

export function CTASection({
  title = "Let's Power Your Next Project.",
  subtitle = 'Schedule a site inspection, power quality audit, or technical consultation with Ghana’s premier electrical engineering team.',
  buttonText = 'Request a Free Consultation',
  buttonHref = '/contact',
  image = null,
}: CTASectionProps) {
  const hasValidImage = image && image.trim() !== '' && !image.includes('unsplash.com');

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-2 md:py-3 max-w-[1440px] mx-auto">
      <div className="relative w-full rounded-t-[32px] sm:rounded-t-[44px] rounded-b-none overflow-hidden bg-brand-navy text-white p-8 sm:p-12 md:p-16 lg:p-20 text-center border border-white/10 shadow-2xl">
        {/* Background photo & overlays */}
        <div className="absolute inset-0 z-0">
          {hasValidImage ? (
            <Image
              src={image}
              alt="Power engineering infrastructure"
              fill
              className="object-cover object-center opacity-25 mix-blend-luminosity"
            />
          ) : (
            <div className="absolute inset-0 energy-glow opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/60" />
          <div className="absolute inset-0 circuit-pattern opacity-20 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          {/* Section 4a.7 Outlined Pill Eyebrow */}
          <EyebrowTag theme="white" icon={<Zap className="w-3.5 h-3.5 text-brand-red" />}>
            Ready To Elevate Your Power Infrastructure?
          </EyebrowTag>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight">
            {title}
          </h2>

          {/* Section 4a.8 Dotted Divider */}
          <DottedDivider theme="red" align="center" count={8} className="py-2" />

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {subtitle}
          </p>

          {/* Section 4a.12: Paired Circular CTA Button */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <PairedButton
              label={buttonText}
              href={buttonHref}
              variant="primary"
              size="lg"
            />

            <a
              href={`tel:${COMPANY_INFO.emergencyPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 select-none"
            >
              {/* Section 4a.9 Circular Icon Badge */}
              <div className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <span>24/7 Hotline: {COMPANY_INFO.emergencyPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
