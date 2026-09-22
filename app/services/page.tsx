import React from 'react';
import { Metadata } from 'next';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import { Zap, Activity, ShieldCheck, Cpu, Clock, CheckCircle2, Check, PhoneCall } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';
import { PairedButton } from '@/components/ui/PairedButton';
import { OverlappingPill } from '@/components/ui/OverlappingPill';
import { CTASection } from '@/components/shared/CTASection';
import { SERVICES_DATA } from '@/data/services';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'Engineering Services — HV Substations, Maintenance, Audits & Solar',
  description:
    'Explore Modes Power Services full suite of electrical engineering: Substation Installations, Predictive Maintenance, Power Quality Audits, Solar Microgrids, and 24/7 Rapid Emergency Response.',
};

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'Activity':
        return <Activity className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Clock':
        return <Clock className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-24 sm:pt-28 md:pt-32 pb-6">
      {/* 1. Services Hero */}
      <SectionContainer theme="navy" className="text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          <EyebrowTag theme="white" icon={<Zap className="w-3.5 h-3.5" />}>
            Turnkey Engineering Solutions
          </EyebrowTag>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-white">
            Comprehensive Electrical Capabilities. Zero Compromise.
          </h1>

          <DottedDivider theme="red" align="left" count={8} className="py-1" />

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            From utility-grade 33kV substations to high-efficiency solar microgrids and 24/7 emergency dispatch, we deliver end-to-end electrical solutions engineered for extreme reliability.
          </p>
        </div>
      </SectionContainer>

      {/* 2. Quick-Nav Sticky Pills */}
      <div className="sticky top-20 z-30 max-w-[1240px] mx-auto px-4 w-full pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-black/[0.08] shadow-lg rounded-full p-1.5 flex items-center justify-start sm:justify-center gap-1 overflow-x-auto no-scrollbar">
          {SERVICES_DATA.map((srv) => (
            <a
              key={srv.anchor}
              href={`#${srv.anchor}`}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>{srv.title.split(' ')[0]}</span>
              <span className="hidden md:inline">{srv.title.split(' ').slice(1, 3).join(' ')}</span>
            </a>
          ))}
        </div>
      </div>

      {/* 3. Detailed Service Anchor Sections */}
      {SERVICES_DATA.map((service, index) => {
        const isEven = index % 2 === 0;
        const isEmergency = service.id === 'emergency';

        return (
          <SectionContainer
            key={service.id}
            id={service.anchor}
            theme={isEmergency ? 'navy' : 'white'}
            radius={isEmergency ? 'top-only' : 'all'}
            className="scroll-mt-32 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Content Column */}
              <div className={`lg:col-span-7 space-y-5 ${!isEven && 'lg:order-2'}`}>
                {/* Header: Section 4a.7 Outlined Pill Eyebrow + Section 4a.8 Dotted Divider */}
                <div className="space-y-3">
                  <EyebrowTag
                    theme={isEmergency ? 'white' : 'red'}
                    icon={
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          isEmergency ? 'bg-brand-red text-white' : 'bg-brand-red/10 text-brand-red'
                        }`}
                      >
                        {getIcon(service.iconName)}
                      </div>
                    }
                  >
                    {service.badge}
                  </EyebrowTag>

                  <h2
                    className={`font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight ${
                      isEmergency ? 'text-white' : 'text-brand-navy'
                    }`}
                  >
                    {service.title}
                  </h2>

                  <DottedDivider theme="red" align="left" count={7} className="pb-1" />
                </div>

                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    isEmergency ? 'text-neutral-300' : 'text-content-secondary'
                  }`}
                >
                  {service.fullDesc}
                </p>

                {/* Key Technical Specs Grid: Section 4a.13 Lighter Treatment */}
                <div
                  className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border ${
                    isEmergency
                      ? 'bg-white/[0.04] border-white/10'
                      : 'bg-surface-muted border-black/[0.04]'
                  }`}
                >
                  {service.specs.map((spec) => (
                    <div key={spec.label}>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider block ${
                          isEmergency ? 'text-neutral-400' : 'text-content-tertiary'
                        }`}
                      >
                        {spec.label}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isEmergency ? 'text-white' : 'text-brand-navy'
                        }`}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Scope & Capabilities List with Section 4a.9 Circular Check Icons */}
                <div className="space-y-2.5 pt-1">
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isEmergency ? 'text-brand-red' : 'text-brand-navy'
                    }`}
                  >
                    Core Scope & Capabilities:
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {service.features.map((feat, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2.5 ${
                          isEmergency ? 'text-neutral-200' : 'text-content-secondary'
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Box */}
                <div
                  className={`p-4 rounded-2xl border ${
                    isEmergency
                      ? 'bg-brand-red/10 border-brand-red/30 text-neutral-200'
                      : 'bg-brand-red-light/40 border-brand-red/20 text-brand-navy'
                  }`}
                >
                  <span className="text-xs font-bold text-brand-red uppercase tracking-wider block mb-2">
                    Client Handover Deliverables:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-medium">
                    {service.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA: Section 4a.12 Paired Circular Button */}
                <div className="pt-3">
                  <PairedButton
                    label={isEmergency ? 'Call Emergency Dispatch' : 'Request Technical Proposal'}
                    href={isEmergency ? `tel:${COMPANY_INFO.emergencyPhone.replace(/\s+/g, '')}` : '/contact'}
                    variant={isEmergency ? 'primary' : 'primary'}
                    size="md"
                  />
                </div>
              </div>

              {/* Image Column */}
              <div className={`lg:col-span-5 relative ${!isEven && 'lg:order-1'}`}>
                <div className="relative w-full h-[380px] sm:h-[480px] rounded-[28px] overflow-hidden shadow-xl border border-black/[0.06]">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    fallbackCategory={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                </div>

                {/* Section 4a.11: Overlapping Straddling Pill on Emergency Service */}
                {isEmergency && (
                  <div className="absolute -bottom-4 -right-2 sm:right-4 z-20">
                    <OverlappingPill
                      icon={<PhoneCall className="w-4 h-4" />}
                      text="24/7 Rapid Response"
                      subtext="Guaranteed <60 min triage"
                      theme="white"
                    />
                  </div>
                )}
              </div>
            </div>
          </SectionContainer>
        );
      })}

      {/* 4. Full-Bleed CTA Banner */}
      <CTASection
        title="Need A Customized Power Engineering Solution?"
        subtitle="Our master engineers provide comprehensive turnkey proposals, single-line schematics, and Energy Commission compliance certifications."
        buttonText="Request a Technical Consultation"
        buttonHref="/contact"
      />
    </div>
  );
}
