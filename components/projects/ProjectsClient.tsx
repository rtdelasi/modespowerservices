'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Briefcase, MapPin, Zap, ArrowUpRight } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';
import { ProjectCarousel } from '@/components/shared/ProjectCarousel';
import { ProjectModal } from '@/components/shared/ProjectModal';
import { CTASection } from '@/components/shared/CTASection';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ProjectCaseStudy } from '@/types';

const CATEGORIES = ['All', 'Industrial', 'Commercial', 'Infrastructure', 'Solar & Hybrid'] as const;

interface ProjectsClientProps {
  initialProjects: ProjectCaseStudy[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-24 sm:pt-28 md:pt-32 pb-6">
      {/* 1. Hero */}
      <SectionContainer theme="navy" className="text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          <EyebrowTag theme="white" icon={<Briefcase className="w-3.5 h-3.5" />}>
            Documented Engineering Case Studies
          </EyebrowTag>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-white">
            Powering Ghana’s Most Demanding Facilities.
          </h1>

          <DottedDivider theme="red" align="left" count={8} className="py-1" />

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Detailed engineering breakdowns of our high-voltage substation overhauls, medical center electrical redundancies, and commercial solar microgrids.
          </p>
        </div>
      </SectionContainer>

      {/* 2. Featured Horizontal Carousel */}
      <ProjectCarousel
        title="Featured Infrastructure Highlights"
        subtitle="Swipe through major industrial installations energized with zero downtime."
        badge="Key Deliveries"
        projects={initialProjects}
      />

      {/* 3. Comprehensive Filterable Project Grid */}
      <SectionContainer theme="white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="Portfolio Directory"
            eyebrowIcon={<Zap className="w-3.5 h-3.5" />}
            title="All Engineering Case Studies"
            subtitle="Click any project card to view the detailed engineering scope, timeline, and measurable outcome."
            theme="light"
          />

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-surface-muted text-content-secondary hover:bg-black/[0.05] hover:text-brand-navy'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 bg-surface-muted rounded-[24px] border border-black/[0.05]">
            <p className="text-sm font-medium text-content-secondary">
              No project case studies available in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-white rounded-[24px] overflow-hidden border border-black/[0.05] hover:border-brand-red/30 shadow-soft-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative w-full h-52 overflow-hidden bg-brand-navy">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    fallbackCategory={project.category}
                    fallbackTitle={project.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent pointer-events-none" />

                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-brand-navy text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {project.category}
                  </div>

                  {/* Capacity Pill */}
                  <div className="absolute bottom-3.5 left-3.5 bg-brand-navy/90 backdrop-blur-md text-white text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border border-white/10">
                    {project.capacity}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-content-tertiary">
                      <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-brand-navy group-hover:text-brand-red transition-colors line-clamp-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-content-secondary line-clamp-2 leading-relaxed">
                      {project.scope}
                    </p>
                  </div>

                  {/* Key Outcome Highlight */}
                  <div className="p-3.5 bg-surface-muted rounded-xl border border-black/[0.04] text-xs font-semibold text-brand-navy">
                    <span className="text-brand-red font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                      Operational Result:
                    </span>
                    {project.highlight}
                  </div>

                  {/* Footer Details */}
                  <div className="pt-2 border-t border-black/[0.05] flex items-center justify-between">
                    <span className="text-[11px] text-content-tertiary truncate max-w-[180px]">
                      Client: {project.client}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red group-hover:underline">
                      <span>View Scope</span>
                      <span className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionContainer>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 4. Full-Bleed CTA */}
      <CTASection
        title="Planning An Electrical Infrastructure Upgrade?"
        subtitle="Let our certified engineers perform a comprehensive feasibility study and power audit for your facility."
        buttonText="Request Feasibility Study"
        buttonHref="/contact"
      />
    </div>
  );
}
