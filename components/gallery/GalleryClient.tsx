'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, MapPin, Maximize2 } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';
import { Lightbox } from '@/components/shared/Lightbox';
import { CTASection } from '@/components/shared/CTASection';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { GalleryItem } from '@/types';

const CATEGORIES = ['All', 'Installations', 'Maintenance', 'Audits', 'Solar/Custom'] as const;

interface GalleryClientProps {
  initialItems: GalleryItem[];
}

export function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? initialItems
      : initialItems.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-24 sm:pt-28 md:pt-32 pb-6">
      {/* 1. Hero */}
      <SectionContainer theme="navy" className="text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          <EyebrowTag theme="white" icon={<Camera className="w-3.5 h-3.5" />}>
            Field Photography & Completed Works
          </EyebrowTag>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-white">
            Engineering In Action Across Ghana.
          </h1>

          <DottedDivider theme="red" align="left" count={8} className="py-1" />

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Browse our verified installations, thermographic inspection records, high-voltage transformer drops, and commercial solar microgrids.
          </p>
        </div>
      </SectionContainer>

      {/* 2. Filter Tabs & Gallery Grid */}
      <SectionContainer theme="white">
        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none ${
                  isActive
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-surface-muted text-content-secondary hover:bg-black/[0.05] hover:text-brand-navy'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative bg-white rounded-[24px] overflow-hidden border border-black/[0.05] hover:border-brand-red/30 shadow-soft-card hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 overflow-hidden bg-brand-navy">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  fallbackCategory={item.category}
                  fallbackTitle={item.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-brand-navy text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {item.category}
                </div>

                {/* Circular Expand Icon */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Caption Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-content-tertiary">
                    <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-brand-navy group-hover:text-brand-red transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-content-secondary line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {item.specs && (
                  <div className="pt-2 border-t border-black/[0.05]">
                    <span className="text-[11px] font-mono font-medium text-brand-navy bg-surface-muted px-2.5 py-0.5 rounded-full border border-black/[0.05] inline-block">
                      {item.specs}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        selectedIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(index) => setSelectedImageIndex(index)}
      />

      {/* 3. Full-Bleed CTA */}
      <CTASection
        title="Have A Specific Engineering Project In Mind?"
        subtitle="Contact our engineering office in Accra for specialized site assessments, bill of quantities, and technical drawings."
        buttonText="Schedule a Consultation"
        buttonHref="/contact"
      />
    </div>
  );
}
