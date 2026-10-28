'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Camera } from 'lucide-react';
import { GalleryItem } from '@/types';

// Lazy load lightbox on first open per Phase 6 specifications
const GalleryLightboxModal = dynamic(
  () => import('./GalleryLightboxModal'),
  { ssr: false }
);

interface GalleryDirectoryProps {
  items: GalleryItem[];
}

const DEFAULT_CATEGORIES = [
  'All',
  'Installations',
  'Maintenance',
  'Audits',
  'Solar/Custom',
] as const;

function normalizeCategory(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * GalleryDirectory per Phase 9b:
 * - Category filter tabs (linkable with ?category=)
 * - Responsive image grid: 2 columns on mobile, 3 columns on desktop
 * - Uniform 4:3 crops using next/image with responsive sizes
 * - Shows category once, title, and distinct caption only when different from title
 * - Tile click/keyboard Enter opens Phase 6 Lightbox with preloading
 * - Clean empty state when no items match category
 */
export function GalleryDirectory({ items }: GalleryDirectoryProps) {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('category') || 'All';

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fallback image error state map
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Compute available categories from items + standard categories
  const categoriesList: string[] = ['All'];
  const known = new Set<string>(['all']);

  // Add standard categories
  DEFAULT_CATEGORIES.forEach((cat) => {
    const key = normalizeCategory(cat);
    if (!known.has(key)) {
      known.add(key);
      categoriesList.push(cat);
    }
  });

  // Add any custom categories present in database items
  items.forEach((item) => {
    if (item.category && item.category.trim()) {
      const key = normalizeCategory(item.category);
      if (!known.has(key)) {
        known.add(key);
        categoriesList.push(item.category.trim());
      }
    }
  });

  // Find active category label matching searchParam
  const matchedCategory =
    categoriesList.find(
      (cat) => normalizeCategory(cat) === normalizeCategory(rawCategory)
    ) || 'All';

  // Filter items by category
  const filteredItems =
    matchedCategory === 'All'
      ? items
      : items.filter(
          (item) =>
            normalizeCategory(item.category) === normalizeCategory(matchedCategory)
        );

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <nav
        aria-label="Filter gallery by category"
        className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-hairline mb-8 md:mb-12 pb-3"
      >
        {categoriesList.map((cat) => {
          const isActive =
            normalizeCategory(matchedCategory) === normalizeCategory(cat);
          const href =
            cat === 'All' ? '/gallery' : `/gallery?category=${encodeURIComponent(cat)}`;

          return (
            <Link
              key={cat}
              href={href}
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

      {/* Empty State */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center border border-hairline rounded-media bg-surface p-8 max-w-xl mx-auto my-8">
          <p className="text-body text-slate">
            {matchedCategory !== 'All'
              ? `No photographs found in the “${matchedCategory}” category.`
              : 'No engineering photographs published yet.'}
          </p>
          {matchedCategory !== 'All' && (
            <Link
              href="/gallery"
              scroll={false}
              className="text-signal hover:underline text-small font-medium mt-4 inline-block"
            >
              View all photographs
            </Link>
          )}
        </div>
      ) : (
        /* Responsive Grid: 2 columns on mobile, 3 columns on desktop, uniform 4:3 crops */
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item, index) => {
            const hasDistinctCaption = Boolean(
              item.description &&
                item.description.trim().length > 0 &&
                item.description.trim().toLowerCase() !== item.title.trim().toLowerCase()
            );

            const hasError = imageErrors[item.id];
            const hasImage = Boolean(item.image) && !hasError;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleOpenLightbox(index)}
                aria-label={`Open photo ${index + 1}: ${item.title}`}
                className="group flex flex-col text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-4 rounded-media select-none"
              >
                {/* Uniform 4:3 Crop Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-media bg-paper border border-hairline">
                  {hasImage ? (
                    <Image
                      src={item.image!}
                      alt={item.description || item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [item.id]: true }))
                      }
                    />
                  ) : (
                    /* Fallback / Error State for Missing Image */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-hairline/30 text-slate p-4 text-center">
                      <Camera
                        className="w-8 h-8 text-slate/50 mb-1.5"
                        aria-hidden="true"
                      />
                      <span className="text-caption text-slate/80">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tile Meta: Category once, Title, and Caption if distinct */}
                <div className="mt-2.5 sm:mt-3 flex flex-col">
                  {/* Category shown once */}
                  <span className="text-caption uppercase tracking-wider text-slate font-medium">
                    {item.category}
                  </span>

                  {/* Title */}
                  <span className="text-small font-semibold text-ink group-hover:text-signal transition-colors line-clamp-2 mt-0.5 leading-snug">
                    {item.title}
                  </span>

                  {/* Distinct Caption (shown only when it differs from title) */}
                  {hasDistinctCaption && (
                    <p className="text-caption text-slate line-clamp-2 mt-1 leading-[1.5]">
                      {item.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <GalleryLightboxModal
          open={lightboxOpen}
          index={lightboxIndex}
          items={filteredItems}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}

export default GalleryDirectory;
