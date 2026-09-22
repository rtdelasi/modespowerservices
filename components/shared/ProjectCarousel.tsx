'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, MapPin, Zap } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PairedButton } from '@/components/ui/PairedButton';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { PROJECTS_DATA } from '@/data/projects';
import { ProjectCaseStudy } from '@/types';

interface ProjectCarouselProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  projects?: ProjectCaseStudy[];
  onSelectProject?: (project: ProjectCaseStudy) => void;
}

export function ProjectCarousel({
  title = 'Proven Engineering In The Field.',
  subtitle = 'Explore how Modes Power Services engineers resilient infrastructure for industry leaders across Ghana.',
  badge = 'Featured Case Studies',
  projects: customProjects,
  onSelectProject,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardsPerView, setCardsPerView] = useState(3);

  const displayProjects = customProjects ?? PROJECTS_DATA;
  const totalProjects = displayProjects.length;

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, totalProjects - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const progressPercentage =
    maxIndex === 0 ? 100 : Math.min(100, Math.max(10, ((currentIndex + 1) / (maxIndex + 1)) * 100));

  if (totalProjects === 0) {
    return null;
  }

  return (
    <SectionContainer theme="white">
      {/* Header: Section 4a.7 Outlined Pill Eyebrow & Section 4a.8 Dotted Divider */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <SectionHeader
          eyebrow={badge}
          eyebrowIcon={<Zap className="w-3.5 h-3.5" />}
          title={title}
          subtitle={subtitle}
          theme="light"
        />

        {/* Section 4a.12: Paired Circular Button */}
        <div className="self-start md:self-auto shrink-0">
          <PairedButton
            label="All Case Studies"
            href="/projects"
            variant="secondary"
            size="md"
          />
        </div>
      </div>

      {/* Carousel Track */}
      <div className="relative overflow-hidden py-2" ref={containerRef}>
        <motion.div
          className="flex gap-6"
          animate={{
            x: `calc(-${currentIndex * (100 / cardsPerView)}% - ${currentIndex * (24 / cardsPerView)}px)`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 group flex flex-col justify-between bg-white rounded-[24px] overflow-hidden border border-black/[0.05] hover:border-brand-red/30 shadow-soft-card hover:shadow-xl transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative w-full h-52 overflow-hidden bg-brand-navy">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  fallbackCategory={project.category}
                  fallbackTitle={project.title}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent pointer-events-none" />

                {/* Category Pill */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-brand-navy text-[11px] font-bold px-3 py-1 rounded-pill shadow-sm">
                  {project.category}
                </div>

                {/* Capacity Pill */}
                <div className="absolute bottom-3.5 left-3.5 bg-brand-navy/90 backdrop-blur-md text-white text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border border-white/10">
                  {project.capacity}
                </div>
              </div>

              {/* Content Body: Section 4a.13 Lighter Card Treatment */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-content-tertiary">
                    <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-brand-navy group-hover:text-brand-red transition-colors line-clamp-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-content-secondary line-clamp-2 leading-relaxed">
                    {project.scope}
                  </p>
                </div>

                {/* Highlight Quote Box */}
                <div className="bg-surface-muted p-3.5 rounded-xl border border-black/[0.04] text-xs font-semibold text-brand-navy">
                  <span className="text-brand-red font-bold block text-[10px] uppercase tracking-wider mb-0.5">Key Outcome:</span>
                  {project.highlight}
                </div>

                {/* Tags & Action with Section 4a.12 Circular Icon */}
                <div className="pt-2 border-t border-black/[0.05] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-content-tertiary truncate max-w-[180px]">
                    Client: {project.client}
                  </span>

                  <Link
                    href={`/projects#${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:underline"
                  >
                    <span>Details</span>
                    <span className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Controls: Thin Progress Bar Left + Circular Arrows Right */}
      <div className="mt-8 pt-4 flex items-center justify-between gap-6 border-t border-black/[0.06]">
        {/* Progress Bar Container */}
        <div className="flex items-center gap-3 w-48 sm:w-64">
          <span className="text-xs font-mono font-semibold text-content-tertiary">
            0{currentIndex + 1}
          </span>
          <div className="flex-1 h-1.5 bg-black/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-red rounded-full"
              initial={false}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
          <span className="text-xs font-mono font-semibold text-content-tertiary">
            0{totalProjects}
          </span>
        </div>

        {/* Arrow Buttons: Strictly Circular */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-black/[0.08] bg-white hover:bg-black/[0.04] text-brand-navy flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none shadow-sm cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 rounded-full border border-black/[0.08] bg-white hover:bg-black/[0.04] text-brand-navy flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none shadow-sm cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </SectionContainer>
  );
}
