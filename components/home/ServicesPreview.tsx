'use client';

import React from 'react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import { Zap, Activity, Cpu, ArrowUpRight } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PairedButton } from '@/components/ui/PairedButton';
import { SERVICES_DATA } from '@/data/services';

export function ServicesPreview() {
  const featuredServices = [
    SERVICES_DATA[0], // High/Medium/Low Voltage Installations
    SERVICES_DATA[1], // Preventative Maintenance & Diagnostic Repairs
    SERVICES_DATA[3], // Custom Hybrid Solutions & Solar Microgrids
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'Activity':
        return <Activity className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <SectionContainer theme="white">
      {/* Header with Section 4a.7 Outlined Pill Eyebrow & Section 4a.8 Dotted Divider */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeader
          eyebrow="Our Engineering Capabilities"
          eyebrowIcon={<Zap className="w-3.5 h-3.5" />}
          title="Specialized Electrical Engineering. Built For High Uptime."
          subtitle="From utility-grade substation infrastructure to advanced thermographic condition monitoring, we deliver precision power solutions across Ghana."
          theme="light"
        />

        {/* Section 4a.12: Paired Circular Button */}
        <div className="self-start md:self-auto shrink-0">
          <PairedButton
            label="View All Services"
            href="/services"
            variant="secondary"
            size="md"
          />
        </div>
      </div>

      {/* 3 Featured Service Cards: Section 4a.13 Lighter Card Treatment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {featuredServices.map((service) => (
          <div
            key={service.id}
            className="group relative bg-white rounded-[24px] overflow-hidden border border-black/[0.05] hover:border-brand-red/30 shadow-soft-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Header */}
            <div className="relative w-full h-52 overflow-hidden">
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                fallbackCategory={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />

              {/* Badge */}
              <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-brand-navy text-[11px] font-bold px-3 py-1 rounded-pill shadow-sm">
                {service.badge}
              </div>

              {/* Section 4a.9: Strictly Circular Icon Badge */}
              <div className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md shadow-brand-red/40">
                {getServiceIcon(service.iconName)}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className="font-display font-bold text-lg text-brand-navy group-hover:text-brand-red transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-content-secondary line-clamp-3 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              {/* Key Specs Pills */}
              <div className="pt-2 border-t border-black/[0.05] flex flex-wrap gap-1.5">
                {service.specs.slice(0, 2).map((spec) => (
                  <span
                    key={spec.label}
                    className="text-[11px] bg-surface-muted border border-black/[0.04] text-content-secondary px-2.5 py-1 rounded-pill font-medium"
                  >
                    <strong className="text-brand-navy">{spec.label}:</strong> {spec.value}
                  </span>
                ))}
              </div>

              {/* Card Action Link with Circular Icon (Section 4a.12) */}
              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/services#${service.anchor}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-red group-hover:text-brand-red-hover"
                >
                  <span>Explore Technical Scope</span>
                  <span className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
