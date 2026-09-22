'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Check, Award, ArrowUpRight } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { StatCounter } from '@/components/shared/StatCounter';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';
import { OverlappingPill } from '@/components/ui/OverlappingPill';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { KEY_STATS, COMPANY_INFO } from '@/data/company';

interface AboutPreviewProps {
  aboutImage?: string | null;
}

export function AboutPreview({ aboutImage }: AboutPreviewProps = {}) {
  return (
    <SectionContainer id="about-preview" theme="white" className="relative pt-6">
      {/* Top Split Area: Image Left + Copy Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Image Left with Overlapping Floating Pill Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg border border-black/[0.04]">
            <ImageWithFallback
              src={aboutImage}
              alt="Modes Power Services Engineers inspecting industrial electrical switchgear"
              fallbackCategory="Engineering"
              fallbackTitle="Modes Power Services — Field Operations"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Section 4a.11: Overlapping Straddling Pill Card with Circular Icon (Section 4a.9) */}
          <div className="absolute -bottom-5 -right-2 sm:right-4 z-20">
            <OverlappingPill
              icon={<Award className="w-4 h-4" />}
              text="Class-A Certified Contractor"
              subtext="Energy Commission Ghana & GhIE Licensed"
              theme="white"
            />
          </div>
        </div>

        {/* Copy Right */}
        <div className="lg:col-span-6 space-y-4 pt-6 lg:pt-0">
          {/* Section 4a.7: Outlined Pill Eyebrow Tag */}
          <EyebrowTag theme="red" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Built on Engineering Rigor & Safety
          </EyebrowTag>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] tracking-tight text-brand-navy leading-tight">
            Setting the Benchmark for Electrical Reliability in Ghana.
          </h2>

          {/* Section 4a.8: Dotted Divider Line */}
          <DottedDivider theme="red" align="left" count={7} className="pb-1" />

          <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
            Since 2011, Modes Power Services has engineered high-uptime power solutions for critical industrial facilities, commercial complexes, and national infrastructure. We combine senior electrical engineering competence with real-time diagnostic testing to ensure your operations never miss a beat.
          </p>

          {/* Feature List: Section 4a.9 Circular Icon Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-medium text-brand-navy">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>Substation EPC & Upgrades</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>FLIR Infrared Thermography</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>Power Quality & Harmonics</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>24/7 Rapid Emergency Crews</span>
            </div>
          </div>

          {/* Underlined Text Link with Arrow */}
          <div className="pt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm hover:text-brand-red-hover group underline underline-offset-8 decoration-brand-red/30 hover:decoration-brand-red transition-all"
            >
              <span>Learn more about our company, history & values</span>
              <span className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Row of Large Count-Up Animated Numbers with Dotted Separators */}
      <div className="mt-14 sm:mt-16 pt-8 border-t border-black/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {KEY_STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col space-y-1.5">
            <div className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-brand-navy tracking-tight">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-brand-red uppercase tracking-wider">
              {stat.label}
            </span>
            <p className="text-xs text-content-secondary leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
