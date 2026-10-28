'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface ProjectsDirectoryProps {
  projects: Project[];
}

/**
 * ProjectsDirectory per TASK 2:
 * - 1 column on mobile, 2 on tablet (md), 3 on 1280px+ (xl)
 * - Show category filter tabs only when at least 4 projects AND at least 2 categories
 * - Linkable filtering with ?category= query param
 * - Empty state when no projects match
 */
export function ProjectsDirectory({ projects }: ProjectsDirectoryProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  // Compute unique non-empty categories
  const categoriesSet = new Set<string>();
  projects.forEach((p) => {
    if (p.category && p.category.trim()) {
      categoriesSet.add(p.category.trim());
    }
  });
  const uniqueCategories = Array.from(categoriesSet);

  // Condition: Show category filter tabs only when at least 4 projects and at least 2 categories
  const showFilterTabs = projects.length >= 4 && uniqueCategories.length >= 2;

  // Filter projects by active category
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(
          (p) => p.category && p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      {showFilterTabs && (
        <nav
          aria-label="Filter projects by category"
          className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-hairline mb-10 pb-3"
        >
          <Link
            href="/projects"
            scroll={false}
            className={`text-small pb-2 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 ${
              activeCategory === 'All'
                ? 'text-ink font-semibold border-b-2 border-signal -mb-[13px]'
                : 'text-slate hover:text-ink font-normal'
            }`}
          >
            All
          </Link>
          {uniqueCategories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <Link
                key={cat}
                href={`/projects?category=${encodeURIComponent(cat)}`}
                scroll={false}
                className={`text-small pb-2 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 ${
                  isActive
                    ? 'text-ink font-semibold border-b-2 border-signal -mb-[13px]'
                    : 'text-slate hover:text-ink font-normal'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center border border-hairline rounded-media bg-surface p-8 max-w-xl mx-auto my-8">
          <p className="text-body text-slate">
            {activeCategory !== 'All'
              ? `No projects found in the “${activeCategory}” category.`
              : 'No engineering projects published yet.'}
          </p>
          {activeCategory !== 'All' && (
            <Link
              href="/projects"
              scroll={false}
              className="text-signal hover:underline text-small font-medium mt-4 inline-block"
            >
              View all projects
            </Link>
          )}
        </div>
      ) : (
        /* Project Cards Grid (1 col mobile, 2 cols tablet, 3 cols 1280px+) */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id || project.slug}
              project={project}
              priority={idx === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
