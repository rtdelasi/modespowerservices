import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getPublishedProjects,
  getProjectBySlug,
  getProjectSlugs,
} from '@/lib/supabase/queries';
import { Container, Section } from '@/components/ui';
import {
  ProjectGallery,
  ProjectGalleryBeforeAfter,
} from '@/components/projects/gallery';
import { QuoteBand } from '@/components/home/QuoteBand';

export const revalidate = 60;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project || !project.published) {
    return {
      title: 'Project Not Found | Modes Power Services',
      robots: { index: false, follow: false },
    };
  }

  const coverUrl =
    project.cover_image_path ||
    (project.images && project.images[0]?.url) ||
    '/images/hero-substation.jpg';

  const description =
    project.outcome ||
    project.description ||
    `${project.title} — Electrical engineering case study delivered by Modes Power Services in Ghana.`;

  return {
    title: `${project.title} | Modes Power Services`,
    description,
    openGraph: {
      title: `${project.title} | Modes Power Services`,
      description,
      type: 'article',
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Modes Power Services`,
      description,
      images: [coverUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(params.slug),
    getPublishedProjects(),
  ]);

  if (!project || !project.published) {
    notFound();
  }

  // Cover image resolution
  const coverImage =
    project.images?.find((img) => img.sort_order === 0) ||
    project.images?.[0] ||
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

  // Facts list: omit empty values strictly per BRIEF Section 0 line 8
  const facts: { label: string; value: string }[] = [];
  const clientVal = project.client_name || project.client;
  if (clientVal && clientVal.trim()) {
    facts.push({ label: 'Client', value: clientVal.trim() });
  }
  if (project.location && project.location.trim()) {
    facts.push({ label: 'Location', value: project.location.trim() });
  }
  if (project.category && project.category.trim()) {
    facts.push({ label: 'Category', value: project.category.trim() });
  }
  const scopeVal = project.scope || project.capacity;
  if (scopeVal && scopeVal.trim()) {
    facts.push({ label: 'System / Scope', value: scopeVal.trim() });
  }

  // Text blocks: hide when empty
  const hasDescription = Boolean(project.description && project.description.trim());
  const hasOutcome = Boolean(project.outcome && project.outcome.trim());

  // Before & After pair check
  const beforeImage = project.images?.find((img) => img.kind === 'before');
  const afterImage = project.images?.find((img) => img.kind === 'after');
  const hasBeforeAfter = Boolean(beforeImage && afterImage);

  // Mosaic images: exclude before/after pair to avoid duplication per BRIEF Section 6 line 48
  const galleryImages = hasBeforeAfter
    ? (project.images || []).filter((img) => img.kind === 'gallery')
    : project.images || [];

  // If there is only 1 image and it's already shown as cover, do not duplicate in mosaic
  const showMosaic = galleryImages.length > 1;

  // Adjacent project links (Previous / Next)
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Section tone="paper" className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <Container>
          {/* 1. Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-small text-slate flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-ink hover:underline">
              Home
            </Link>
            <span className="text-hairline" aria-hidden="true">/</span>
            <Link href="/projects" className="hover:text-ink hover:underline">
              Projects
            </Link>
            <span className="text-hairline" aria-hidden="true">/</span>
            <span className="text-ink font-medium truncate max-w-[280px] sm:max-w-md">
              {project.title}
            </span>
          </nav>

          {/* 2. Heading, Category & Location */}
          <header className="max-w-4xl">
            <h1 className="text-display font-semibold text-ink tracking-tight leading-[1.1] text-balance">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-small text-slate">
              {project.category && <span>{project.category}</span>}
              {project.category && project.location && (
                <span className="text-hairline" aria-hidden="true">•</span>
              )}
              {project.location && <span>{project.location}</span>}
            </div>
          </header>

          {/* 3. Facts List (Omits empty values) */}
          {facts.length > 0 && (
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-hairline my-8 md:my-10">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-small text-slate font-medium">{fact.label}</dt>
                  <dd className="text-body font-semibold text-ink mt-1">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* 4. Full-width Cover Image with priority */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-media bg-hairline/60 border border-hairline/40 my-8 md:my-12">
            <Image
              src={coverUrl}
              alt={coverAlt}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              placeholder={blurUrl ? 'blur' : 'empty'}
              blurDataURL={blurUrl}
              className="object-cover"
            />
          </div>

          {/* 5. "What we did" & "Outcome" two-column text blocks (hide when empty) */}
          {(hasDescription || hasOutcome) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 my-10 md:my-14">
              {hasDescription && (
                <div className="space-y-3">
                  <h2 className="text-h3 font-semibold text-ink">What we did</h2>
                  <div className="text-body text-slate leading-[1.6] space-y-4 whitespace-pre-line">
                    {project.description}
                  </div>
                </div>
              )}
              {hasOutcome && (
                <div className="space-y-3">
                  <h2 className="text-h3 font-semibold text-ink">Outcome</h2>
                  <div className="text-body text-slate leading-[1.6] space-y-4 whitespace-pre-line">
                    {project.outcome}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. Before / After slider (rendered when a pair exists) */}
          {hasBeforeAfter && beforeImage && afterImage && (
            <div className="my-10 md:my-14 space-y-4">
              <h2 className="text-h3 font-semibold text-ink">Before & after overhaul</h2>
              <ProjectGalleryBeforeAfter
                beforeImage={beforeImage}
                afterImage={afterImage}
                projectTitle={project.title}
              />
            </div>
          )}

          {/* 7. "Site photos" with Phase 6 adaptive mosaic & lightbox */}
          {showMosaic && (
            <div className="my-10 md:my-14 space-y-4">
              <h2 className="text-h3 font-semibold text-ink">Site photos</h2>
              <ProjectGallery.Root images={galleryImages} projectTitle={project.title}>
                <ProjectGallery.Mosaic />
                <ProjectGallery.Lightbox />
              </ProjectGallery.Root>
            </div>
          )}

          {/* 8. Previous and Next Project Links */}
          <nav
            aria-label="Adjacent projects navigation"
            className="flex items-center justify-between border-t border-hairline pt-8 mt-16 gap-6"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col text-left focus-visible:outline-2 focus-visible:outline-signal rounded-sm max-w-[45%]"
              >
                <span className="text-small text-slate">← Previous project</span>
                <span className="text-body font-semibold text-ink group-hover:text-signal transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col text-right ml-auto focus-visible:outline-2 focus-visible:outline-signal rounded-sm max-w-[45%]"
              >
                <span className="text-small text-slate">Next project →</span>
                <span className="text-body font-semibold text-ink group-hover:text-signal transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </Container>
      </Section>

      {/* 9. Quote Band */}
      <QuoteBand />
    </div>
  );
}
