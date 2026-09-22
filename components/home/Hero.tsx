'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Zap, ShieldCheck, ChevronDown, CheckCircle2, PhoneCall } from 'lucide-react';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';
import { PairedButton } from '@/components/ui/PairedButton';
import { OverlappingPill } from '@/components/ui/OverlappingPill';
import { Button } from '@/components/ui/Button';
import { COMPANY_INFO } from '@/data/company';

interface HeroProps {
  heroImage?: string | null;
}

export function Hero({ heroImage }: HeroProps = {}) {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about-preview');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hasValidImage = heroImage && heroImage.trim() !== '' && !heroImage.includes('unsplash.com');

  return (
    <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-6 max-w-[1440px] mx-auto">
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-brand-navy shadow-elevated-card border border-white/10 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 text-white">
        {/* Full Bleed Background Image with Gradients */}
        <div className="absolute inset-0 z-0">
          {hasValidImage ? (
            <Image
              src={heroImage}
              alt="Modes Power Services - High Voltage Substation Engineering"
              fill
              priority
              className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
            />
          ) : (
            <div className="absolute inset-0 energy-glow opacity-60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
          <div className="absolute inset-0 circuit-pattern opacity-25 pointer-events-none" />
        </div>

        {/* Top Eyebrow: Section 4a.7 Outlined Pill Eyebrow */}
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <EyebrowTag theme="white" icon={<span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />}>
            Energy Commission Ghana Class A Contractor
          </EyebrowTag>
          <span className="text-white/40 text-xs hidden sm:inline">•</span>
          <span className="text-neutral-300 font-mono text-[11px] hidden sm:inline">Accra, Ghana</span>
        </div>

        {/* Center Content: Bold Two-Line Headline & CTAs */}
        <div className="relative z-10 max-w-3xl my-auto py-6 sm:py-8 space-y-4">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight leading-[1.08] text-white">
            ENGINEERING <span className="text-brand-red">RESILIENT</span> POWER.
            <br />
            UNINTERRUPTED PERFORMANCE.
          </h1>

          {/* Section 4a.8 Dotted Divider motif under hero title */}
          <DottedDivider theme="red" align="left" count={8} className="pt-1 pb-2" />

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal max-w-2xl leading-relaxed">
            Ghana’s premier engineering partner for high-voltage substations, industrial power reliability, commercial solar microgrids, and 24/7 rapid emergency response.
          </p>

          {/* Action CTAs: Section 4a.12 Paired Circular Icon Button */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <PairedButton
              label="Request a Free Quote"
              href="/contact"
              variant="primary"
              size="lg"
            />

            <Button
              href="/projects"
              variant="outline-white"
              size="lg"
              className="text-sm sm:text-base font-semibold"
            >
              Explore Case Studies
            </Button>
          </div>

          {/* Quick trust badges: Section 4a.9 Circular bare/round icons */}
          <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
              <span>Zero-Harm Safety Record</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
              <span>IEEE & GhIE Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
              <span>24/7 Rapid Mobilization</span>
            </div>
          </div>
        </div>

        {/* Bottom Area: Floating Glass Stat Badge + Scroll to Explore */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-white/10">
          {/* Floating Glassmorphic Stat Badge with Section 4a.9 Circular Icon */}
          <div className="glass-card-dark rounded-full px-5 py-3 flex items-center gap-3.5 shadow-xl max-w-sm">
            <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-bold text-base text-white">520+</span>
                <span className="text-xs text-neutral-300 font-medium">Projects Delivered</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-tight">
                140+ Megawatts energized with 99.98% reliability
              </p>
            </div>
          </div>

          {/* Scroll to Explore Indicator */}
          <button
            onClick={scrollToNextSection}
            className="group flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer self-end sm:self-auto"
            aria-label="Scroll to explore next section"
          >
            <span>Scroll to Explore</span>
            <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Section 4a.11: Overlapping Straddling Pill Callout */}
      <div className="absolute -bottom-2 left-8 sm:left-16 z-30 hidden md:block">
        <OverlappingPill
          icon={<PhoneCall className="w-4 h-4" />}
          text="24/7 Rapid Emergency Dispatch Line"
          subtext={`Direct Line: ${COMPANY_INFO.emergencyPhone} • Accra & Industrial Hubs`}
          href={`tel:${COMPANY_INFO.emergencyPhone.replace(/\s+/g, '')}`}
          theme="white"
        />
      </div>
    </div>
  );
}
