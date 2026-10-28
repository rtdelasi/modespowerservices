import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Container, Section, SectionHeading, Stat } from '@/components/ui';
import { siteConfig } from '@/lib/site-config';
import { siteContent } from '@/lib/site-content';
import { getPublishedTeamMembers, getSiteSettingsQuery } from '@/lib/supabase/queries';
import { QuoteBand } from '@/components/home/QuoteBand';

export const metadata: Metadata = {
  title: 'About | Modes Power Services',
  description:
    'Energy Commission of Ghana certified Class A electrical contractor for industrial substations, preventative maintenance, and solar microgrids.',
  openGraph: {
    title: 'About | Modes Power Services',
    description:
      'Energy Commission of Ghana certified Class A electrical contractor for industrial substations, preventative maintenance, and solar microgrids.',
    type: 'website',
  },
};

export const revalidate = 60;

const CERTIFICATIONS = [
  {
    name: 'Energy Commission of Ghana',
    detail: `Class A Electrical Contractor (License: ${siteConfig.licenseNo})`,
  },
  {
    name: 'Ghana Institution of Engineering (GhIE)',
    detail: 'Corporate membership and licensed engineering practice',
  },
  {
    name: 'IEEE Power & Energy Society',
    detail: 'Substation design, protection coordination, and power quality standards',
  },
  {
    name: 'BS 7671 (IET Wiring Regulations)',
    detail: 'Requirements for electrical installations and low-voltage distribution',
  },
  {
    name: 'ISO 45001',
    detail: 'Occupational health and safety management systems on all project sites',
  },
  {
    name: 'ISO 9001',
    detail: 'Quality management systems for electrical procurement and commissioning',
  },
];

/**
 * About Page (Redesign per BRIEF & Phase 9a)
 * - Page header in sentence case
 * - Company story tightened to plain language
 * - Stats reusing Stat primitive and siteContent.stats (no duplicate numbers)
 * - Certifications and standards as a simple list with hairline divider rows
 * - Team from CMS as a plain grid (photo, name, role; hides missing fields)
 * - Quote and emergency band at bottom
 */
export default async function AboutPage() {
  const [teamMembers, settings] = await Promise.all([
    getPublishedTeamMembers(),
    getSiteSettingsQuery(),
  ]);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Section tone="paper" className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <Container>
          {/* 1. Page Header */}
          <header className="mb-12 md:mb-16">
            <h1 className="text-display font-semibold text-ink tracking-tight leading-[1.1]">
              About Modes Power Services
            </h1>
            <p className="text-body text-slate max-w-[68ch] mt-3 leading-[1.6]">
              Class A electrical contractor for high-voltage substations, preventative maintenance, and industrial power engineering in Ghana since {siteConfig.foundingYear}.
            </p>
          </header>

          {/* 2. Company Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start my-10 md:my-14">
            <div className={settings.about_image_url ? 'lg:col-span-7' : 'lg:col-span-12'}>
              <div className="space-y-4 text-body text-slate leading-[1.6] max-w-[68ch]">
                <p>
                  Modes Power Services was founded in Accra to provide Ghanaian industry with dependable, rigorously engineered electrical infrastructure. Unstable power quality and substandard installations cause chronic downtime and costly equipment failures across commercial and industrial facilities.
                </p>
                <p>
                  As an Energy Commission of Ghana Class A certified electrical contractor, we design and install turnkey 11 kV and 33 kV substations, perform predictive maintenance with calibrated diagnostic tools, and deploy commercial solar microgrids to safeguard operations and control energy costs.
                </p>
              </div>
            </div>

            {settings.about_image_url && (
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] w-full rounded-media overflow-hidden border border-hairline bg-hairline/30">
                  <Image
                    src={settings.about_image_url}
                    alt="Modes Power Services electrical engineering site"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. Stats Row (Reuses Stat primitive and siteContent.stats single source) */}
          <div className="border-y border-hairline py-12 md:py-16 my-12 md:my-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {siteContent.stats.map((stat) => (
                <Stat
                  key={stat.id}
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                  tone="paper"
                />
              ))}
            </div>
          </div>

          {/* 4. Certifications and Standards as a Simple List */}
          <div className="my-12 md:my-16">
            <SectionHeading
              title="Certifications and standards"
              description="All electrical installations, switchgear commissioning, and maintenance procedures strictly adhere to statutory Ghanaian regulations and international engineering standards."
              as="h2"
            />
            <div className="flex flex-col border-t border-hairline" role="list">
              {CERTIFICATIONS.map((item) => (
                <div
                  key={item.name}
                  className="py-5 md:py-6 border-b border-hairline flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6"
                  role="listitem"
                >
                  <span className="text-body font-semibold text-ink">{item.name}</span>
                  <span className="text-small text-slate">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Team from CMS as a Plain Grid (hides missing fields) */}
          <div className="mt-16 md:mt-24">
            <SectionHeading
              title="Engineering leadership"
              description="Senior power systems engineers leading substation overhauls, protection testing, and microgrid commissioning."
              as="h2"
            />

            {teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {teamMembers.map((member) => (
                  <div
                    key={member.id || member.name}
                    className="flex flex-col border-t border-hairline pt-4"
                  >
                    {member.image && (
                      <div className="relative aspect-[4/5] w-full rounded-media overflow-hidden mb-4 bg-hairline/30 border border-hairline/40">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      {member.name && (
                        <h3 className="text-body font-semibold text-ink leading-snug">
                          {member.name}
                        </h3>
                      )}
                      {member.role && (
                        <p className="text-small text-slate leading-relaxed">
                          {member.role}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-small text-slate">Team profiles will appear here once published.</p>
            )}
          </div>
        </Container>
      </Section>

      {/* 6. Quote and Emergency Band */}
      <QuoteBand />
    </div>
  );
}
