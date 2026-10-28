'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';

interface ProjectHashRedirectProps {
  projects: Project[];
}

/**
 * Old link support per BRIEF Section 6 & TASK 3:
 * Reads a #<uuid> or #<id> hash from the window location on /projects,
 * finds the corresponding project, and replaces the URL with /projects/[slug].
 */
export function ProjectHashRedirect({ projects }: ProjectHashRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rawHash = window.location.hash;
    if (!rawHash) return;

    const hash = rawHash.replace(/^#/, '').trim();
    if (!hash) return;

    // Look for matching project by ID or slug
    const matched = projects.find(
      (p) => p.id.toLowerCase() === hash.toLowerCase() || p.slug.toLowerCase() === hash.toLowerCase()
    );

    if (matched && matched.slug) {
      router.replace(`/projects/${matched.slug}`);
    }
  }, [projects, router]);

  return null;
}
