import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

/**
 * ProjectCard per BRIEF Section 6 & TASK 1:
 * - Cover image 4:3
 * - Category as small plain text
 * - Title (hover changes title colour only)
 * - Outcome clamped to two lines (omitted if empty)
 * - Location (omitted if empty)
 * - "+N photos" label when there is more than 1 image
 * - Entire card is one link to /projects/[slug]
 * - No shadow; hover changes title colour only
 */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const images = project.images || [];
  const extraPhotosCount = images.length > 1 ? images.length - 1 : 0;

  // Resolve cover image
  const coverImage =
    images.find((img) => img.sort_order === 0) ||
    images[0] ||
    (project.cover_image_path
      ? {
          url: project.cover_image_path,
          alt: project.title,
          blur_data_url: null,
        }
      : null);

  const coverUrl = coverImage?.url || project.image || '/images/hero-substation.jpg';
  const coverAlt = coverImage?.alt || `${project.title} cover photo`;
  const blurUrl = coverImage?.blur_data_url || undefined;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col text-left focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-media"
    >
      {/* 4:3 Cover Image with reserved aspect ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-media bg-hairline/60 border border-hairline/40">
        <Image
          src={coverUrl}
          alt={coverAlt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
          placeholder={blurUrl ? 'blur' : 'empty'}
          blurDataURL={blurUrl}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
        />

        {/* "+N photos" label when more than 1 image is available */}
        {extraPhotosCount > 0 && (
          <span
            aria-label={`${extraPhotosCount} additional photos available`}
            className="absolute bottom-3 right-3 px-2 py-0.5 rounded-[6px] bg-ink/80 text-surface text-small font-mono font-medium backdrop-blur-sm pointer-events-none select-none"
          >
            +{extraPhotosCount} photos
          </span>
        )}
      </div>

      {/* Card Content Stack (No shadow, left-aligned) */}
      <div className="pt-4 flex flex-col flex-1">
        {/* Category as small plain text */}
        {project.category && (
          <span className="text-small text-slate block mb-1">
            {project.category}
          </span>
        )}

        {/* Title: hover changes colour to signal red */}
        <h3 className="text-h3 font-semibold text-ink group-hover:text-signal transition-colors duration-150 leading-[1.2] line-clamp-2">
          {project.title}
        </h3>

        {/* Outcome clamped to two lines */}
        {project.outcome && (
          <p className="text-small text-slate line-clamp-2 mt-2 leading-[1.6]">
            {project.outcome}
          </p>
        )}

        {/* Location */}
        {project.location && (
          <div className="mt-3 pt-2 text-small text-slate/80 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate/70 shrink-0" aria-hidden="true" />
            <span className="truncate">{project.location}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
