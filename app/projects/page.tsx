import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPublishedProjects } from '@/lib/supabase/queries';
import { Container, Section } from '@/components/ui';
import { ProjectsDirectory, ProjectHashRedirect } from '@/components/projects';
import { QuoteBand } from '@/components/home/QuoteBand';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Documented high-voltage substation overhauls, commercial solar installations, and power quality engineering delivered across Ghana.',
  openGraph: {
    title: 'Projects | Modes Power Services',
    description:
      'Documented high-voltage substation overhauls, commercial solar installations, and power quality engineering delivered across Ghana.',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Old hash link redirect support (#<uuid> -> /projects/[slug]) */}
      <ProjectHashRedirect projects={projects} />

      {/* Main Projects Section */}
      <Section tone="paper" className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <Container>
          {/* Simple Page Header per BRIEF & TASK 2 */}
          <header className="mb-10 md:mb-14">
            <h1 className="text-display font-semibold text-ink tracking-tight leading-[1.1]">
              Projects
            </h1>
            <p className="text-body text-slate max-w-prose mt-3 leading-[1.6]">
              Documented high-voltage substation overhauls, commercial solar installations, and power quality engineering delivered across Ghana.
            </p>
          </header>

          {/* Directory with URL-linkable filtering and responsive grid */}
          <Suspense fallback={<div className="py-20 text-center text-slate">Loading projects…</div>}>
            <ProjectsDirectory projects={projects} />
          </Suspense>
        </Container>
      </Section>

      {/* Quote and Emergency Band */}
      <QuoteBand />
    </div>
  );
}
