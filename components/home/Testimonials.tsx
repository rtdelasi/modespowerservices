'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TESTIMONIALS_DATA } from '@/data/testimonials';

export function Testimonials() {
  return (
    <SectionContainer theme="white">
      {/* Header: Section 4a.7 Outlined Pill Eyebrow & Section 4a.8 Dotted Divider */}
      <div className="mb-12">
        <SectionHeader
          eyebrow="Client Commendations"
          eyebrowIcon={<Star className="w-3.5 h-3.5 fill-current" />}
          title="Trusted When The Stakes Are High."
          subtitle="Read what plant managers, engineering directors, and facility heads across Ghana say about our performance."
          theme="light"
        />
      </div>

      {/* Testimonial Cards: Section 4a.13 Lighter Card Treatment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.author}
            className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.05] hover:border-brand-red/20 shadow-soft-card hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-red/5 flex items-center justify-center text-brand-red">
                  <Quote className="w-4 h-4" />
                </div>
              </div>

              {/* Quote Text */}
              <p className="text-sm sm:text-base text-brand-navy font-normal leading-relaxed italic">
                “{t.quote}”
              </p>
            </div>

            {/* Author Info: Section 4a.9 Circular Avatar Badge */}
            <div className="pt-4 border-t border-black/[0.05] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                {t.author
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-brand-navy">
                  {t.author}
                </span>
                <span className="text-xs text-content-secondary">
                  {t.role} • <strong className="text-brand-navy">{t.company}</strong>
                </span>
                <span className="text-[11px] text-content-tertiary">
                  {t.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
