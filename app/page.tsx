import React from 'react';
import { Hero } from '@/components/home/Hero';
import { HomeStats } from '@/components/home/HomeStats';
import { HomeServices } from '@/components/home/HomeServices';
import { WhyModes } from '@/components/home/WhyModes';
import { RecentProjects } from '@/components/home/RecentProjects';
import { ClientWords } from '@/components/home/ClientWords';
import { QuoteBand } from '@/components/home/QuoteBand';
import { SingleLineDiagram } from '@/components/home/SingleLineDiagram';
import { getSiteSettingsQuery, getPublishedProjects } from '@/lib/supabase/queries';

export const revalidate = 60;

/**
 * Home Page (Complete Redesign per BRIEF Section 4 & Phase 8)
 *
 * Sequence of sections exactly in this order:
 * 1. Hero (full viewport photo)
 * 2. Stats (4, shown once)
 * 3. Services (3 divider rows, each with one key spec)
 * 4. Why Modes (statement plus 4 short points)
 * 5. Selected projects (Recent projects: 3 from CMS)
 * 6. Client words (2 to 3 quotes)
 * 7. Quote and emergency band (ink background)
 * 8. Footer (rendered globally in layout)
 */
export default async function HomePage() {
  const [settings, projects] = await Promise.all([
    getSiteSettingsQuery(),
    getPublishedProjects(),
  ]);

  return (
    <div id="home-page-root" className="relative flex flex-col w-full overflow-x-clip">
      {/* Signature Single-Line Diagram per BRIEF Section 3 & Phase 10 */}
      <SingleLineDiagram />

      {/* 1. Full-Viewport Photographic Hero */}
      <Hero heroImage={settings.hero_image_url} />

      {/* 2. Stats Row (4 metrics on paper tone) */}
      <HomeStats />

      {/* 3. Core Services (3 divider rows with specs on surface tone) */}
      <HomeServices />

      {/* 4. Why Modes (statement plus 4 short points on paper tone) */}
      <WhyModes />

      {/* 5. Selected projects (up to 3 from CMS on surface tone) */}
      <RecentProjects projects={projects} />

      {/* 6. Client words (up to 3 plain quote blocks on paper tone) */}
      <ClientWords />

      {/* 7. Quote and Emergency Band (ink background tone) */}
      <QuoteBand />
    </div>
  );
}
