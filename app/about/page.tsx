import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, Award, Zap, CheckCircle2, Compass, Lightbulb, Users, Target, PhoneCall } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';
import { OverlappingPill } from '@/components/ui/OverlappingPill';
import { StatCounter } from '@/components/shared/StatCounter';
import { GradientInterstitial } from '@/components/shared/GradientInterstitial';
import { TeamCard } from '@/components/shared/TeamCard';
import { CTASection } from '@/components/shared/CTASection';
import { KEY_STATS, COMPANY_INFO } from '@/data/company';
import { getPublishedTeamMembers, getSiteSettingsQuery } from '@/lib/supabase/queries';
import { Logo } from '@/components/ui/Logo';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export const metadata: Metadata = {
  title: 'About Us — Leadership, Engineering Rigor & Safety Standards',
  description:
    'Discover Modes Power Services — Ghana’s certified Class-A electrical engineering powerhouse specializing in high-voltage infrastructure, safety compliance, and sustainable microgrids.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const [teamMembers, settings] = await Promise.all([
    getPublishedTeamMembers(),
    getSiteSettingsQuery(),
  ]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-24 sm:pt-28 md:pt-32 pb-6">
      {/* 1. About Hero Section */}
      <SectionContainer theme="navy" radius="all" className="text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          {/* Section 4a.7 Outlined Pill Eyebrow */}
          <EyebrowTag theme="white" icon={<Zap className="w-3.5 h-3.5" />}>
            Over 15 Years of Engineering Excellence
          </EyebrowTag>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-white">
            Engineering Ghana’s Power Backbone With Precision.
          </h1>

          {/* Section 4a.8 Dotted Divider */}
          <DottedDivider theme="red" align="left" count={8} className="py-1" />

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Founded with a vision to eliminate industrial power vulnerability, Modes Power Services delivers world-class electrical engineering, substation construction, and high-uptime energy solutions across West Africa.
          </p>
        </div>
      </SectionContainer>

      {/* 2. Company Story & Origin with Overlapping Straddling Pill (Section 4a.11) */}
      <SectionContainer theme="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-4">
            <SectionHeader
              eyebrow="Our Heritage & Track Record"
              eyebrowIcon={<ShieldCheck className="w-3.5 h-3.5" />}
              title="From Industrial Beginnings to National Infrastructure Leadership."
              theme="light"
            />

            <p className="text-sm sm:text-base text-content-secondary leading-relaxed pt-2">
              Established in Accra, Modes Power Services began with a clear mandate: to provide Ghanaian industries with electrical installations engineered to the highest international standards. We recognized that erratic power quality and substandard wiring cost local enterprises millions annually in lost production.
            </p>

            <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
              Today, as an Energy Commission Class-A certified electrical contractor, we manage critical high-voltage substations, execute 24/7 condition monitoring for continuous-process factories, and lead the deployment of hybrid solar microgrids that hedge against rising utility tariffs.
            </p>

            {/* Quick credentials badge with Official Company Logo & ECG Certification */}
            <div className="p-3.5 pr-6 rounded-2xl sm:rounded-full bg-surface-muted border border-black/[0.05] flex items-center gap-3.5 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1 shrink-0 shadow-sm border border-black/[0.06]">
                <Logo variant="default" size={38} />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-brand-navy block">
                  {COMPANY_INFO.certification}
                </span>
                <span className="text-xs text-content-secondary">
                  License No: {COMPANY_INFO.licenseNo} • Energy Commission of Ghana & ECG Approved
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative w-full h-[380px] sm:h-[460px] rounded-[28px] overflow-hidden shadow-xl border border-black/[0.06]">
              <ImageWithFallback
                src={settings.about_image_url}
                alt="Modes Power Services Engineers working on industrial switchgear"
                fallbackCategory="Engineering"
                fallbackTitle="Modes Power Services — Engineering Infrastructure"
                className="object-cover"
              />
            </div>

            {/* Section 4a.11: Overlapping Straddling Pill Badge */}
            <div className="absolute -bottom-4 -left-3 sm:left-4 z-20">
              <OverlappingPill
                icon={<ShieldCheck className="w-4 h-4" />}
                text="100% Zero-Harm Safety Record"
                subtext="NEBOSH & ISO 45001 Compliance"
                theme="white"
              />
            </div>
          </div>
        </div>

        {/* Animated Key Stats Row */}
        <div className="mt-14 pt-8 border-t border-black/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {KEY_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col space-y-1.5">
              <div className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-brand-navy tracking-tight">
                <StatCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
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

      {/* 3. Mission, Vision & Core Values: Section 4a.9 Circular Icon Badges */}
      <SectionContainer theme="white">
        <div className="mb-10">
          <SectionHeader
            eyebrow="Our Core Values & Principles"
            eyebrowIcon={<Compass className="w-3.5 h-3.5" />}
            title="Our Mission, Vision & Engineering DNA."
            subtitle="The fundamental tenets that govern every single-line schematic, cable pull, and transformer commissioning."
            theme="light"
          />
        </div>

        {/* Section 4a.13 Lighter Card Treatments & Section 4a.9 Strictly Circular Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Safety */}
          <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-black/[0.05] hover:border-brand-red/30 shadow-soft-card hover:shadow-xl transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-red-light flex items-center justify-center text-brand-red shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy">
              Uncompromising Safety
            </h3>
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
              Zero shortcuts. Every engineer adheres strictly to NEBOSH safety procedures, lockout/tagout (LOTO) protocols, and live-circuit precautions.
            </p>
          </div>

          {/* Precision */}
          <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-black/[0.05] hover:border-brand-red/30 shadow-soft-card hover:shadow-xl transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy">
              Technical Precision
            </h3>
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
              We engineer with scientific exactness—using calibrated thermal imagers, micro-ohm meters, and Class-A harmonic power analyzers.
            </p>
          </div>

          {/* Reliability */}
          <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-black/[0.05] hover:border-brand-red/30 shadow-soft-card hover:shadow-xl transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy">
              Proven Reliability
            </h3>
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
              Power systems designed to withstand harsh West African climate conditions, transient spikes, and heavy continuous inductive loads.
            </p>
          </div>

          {/* Innovation */}
          <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-black/[0.05] hover:border-brand-red/30 shadow-soft-card hover:shadow-xl transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-red-light flex items-center justify-center text-brand-red shadow-sm">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy">
              Sustainable Innovation
            </h3>
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
              Pioneering commercial solar PV and lithium battery energy storage (BESS) microgrids that drastically reduce grid tariffs and emissions.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* 4. Dark Gradient Interstitial: Asymmetric top radius */}
      <GradientInterstitial
        eyebrow="Our Engineering Philosophy"
        headline="We Build Infrastructure To Outlast Market Cycles."
        highlightText="Engineered To Last."
        subtext="Every transformer we drop, every cable we terminate, and every protection relay we calibrate is signed off by certified master engineers."
      />

      {/* 5. Leadership & Engineering Team */}
      <SectionContainer theme="white">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Leadership & Senior Engineers"
            eyebrowIcon={<Users className="w-3.5 h-3.5" />}
            title="Led By Industry Veterans & Certified GhIE Fellows."
            subtitle="Our executive engineering team brings over six decades of combined experience in high-voltage utility grids, industrial automation, and microgrid design."
            theme="light"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, idx) => (
            <TeamCard key={member.name} member={member} index={idx} />
          ))}
        </div>
      </SectionContainer>

      {/* 6. Standards & Compliance Section */}
      <SectionContainer theme="white">
        <div className="mb-10 text-center">
          <SectionHeader
            eyebrow="Statutory Compliance & Standards"
            eyebrowIcon={<Award className="w-3.5 h-3.5" />}
            title="Strict Adherence To International Engineering Codes"
            align="center"
            theme="light"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Energy Commission', sub: 'Class A Contractor' },
            { title: 'GhIE', sub: 'Institution of Engineering' },
            { title: 'IEEE Standards', sub: 'Power & Energy Society' },
            { title: 'BS 7671', sub: 'Wiring Regulations' },
            { title: 'ISO 45001', sub: 'Health & Safety' },
            { title: 'ISO 9001', sub: 'Quality Management' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-4 rounded-2xl text-center border border-black/[0.05] shadow-soft-card flex flex-col items-center justify-center space-y-1"
            >
              {/* Section 4a.9 Circular Check Icon */}
              <div className="w-7 h-7 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center mb-1">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xs sm:text-sm text-brand-navy">{item.title}</span>
              <span className="text-[10px] text-content-secondary">{item.sub}</span>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* 6. Full Bleed CTA Banner */}
      <CTASection
        title="Ready To Elevate Your Power Reliability?"
        subtitle="Schedule a technical site assessment or consult directly with our Class-A certified senior electrical engineering team."
        buttonText="Book an Engineering Consultation"
        buttonHref="/contact"
        image={settings.cta_image_url}
      />
    </div>
  );
}
