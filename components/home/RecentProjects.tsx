import React from 'react';
import { Container, Section, TextLink } from '@/components/ui';
import { ProjectCard } from '@/components/projects';
import { Project } from '@/types';

interface RecentProjectsProps {
  projects: Project[];
}

/**
 * RecentProjects section per BRIEF Section 4 & TASK 1:
 * - Placed between Why Modes and Client Words
 * - Heading: "Recent projects"
 * - Up to three most recently published projects as ProjectCards
 * - Three-column grid on desktop, stacked on mobile
 * - TextLink: "All projects"
 * - If fewer than three are published, shows what exists
 * - If none are published, completely hides the section
 */
export function RecentProjects({ projects }: RecentProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  const recent = projects.slice(0, 3);

  return (
    <Section tone="surface" id="recent-projects" className="py-16 md:py-24 border-t border-hairline">
      <Container>
        {/* Header with Title and "All projects" TextLink */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 md:mb-14">
          <h2 data-diagram-node className="text-h2 font-semibold text-ink tracking-tight leading-[1.1]">
            Recent projects
          </h2>
          <TextLink href="/projects" className="shrink-0 font-medium">
            All projects
          </TextLink>
        </div>

        {/* Three-Column Grid (stacked on mobile, 2-col tablet, 3-col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {recent.map((project) => (
            <ProjectCard
              key={project.id || project.slug}
              project={project}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
