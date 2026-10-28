'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useOptionalProjectGallery, ProjectGalleryProvider } from './ProjectGalleryProvider';
import { ProjectGalleryLightbox } from './ProjectGalleryLightbox';
import { ProjectGalleryMosaicProps } from './types';
import { ProjectImage } from '@/types';
import { SecondaryButton } from '@/components/ui';

interface MosaicTileProps {
  image: ProjectImage;
  index: number;
  totalImages: number;
  projectTitle: string;
  sizes: string;
  className?: string;
  isLastTile?: boolean;
  extraCount?: number;
  onClick: (index: number) => void;
  registerRef?: (index: number, el: HTMLElement | null) => void;
}

function MosaicTile({
  image,
  index,
  totalImages,
  projectTitle,
  sizes,
  className = '',
  isLastTile = false,
  extraCount = 0,
  onClick,
  registerRef,
}: MosaicTileProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (registerRef) {
      registerRef(index, buttonRef.current);
      return () => {
        registerRef(index, null);
      };
    }
  }, [index, registerRef]);

  const altText = image.alt || `${projectTitle}, photo ${index + 1}`;
  const ariaLabel =
    isLastTile && extraCount > 0
      ? `View photo ${index + 1} of ${totalImages}, plus ${extraCount} more photos`
      : `Photo ${index + 1} of ${totalImages}: ${altText}`;

  const hasBlur = Boolean(image.blur_data_url);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onClick(index)}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      className={`group relative overflow-hidden rounded-media bg-hairline/60 border border-hairline/40 text-left cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 ${className}`}
    >
      <Image
        src={image.url}
        alt={altText}
        fill
        sizes={sizes}
        placeholder={hasBlur ? 'blur' : 'empty'}
        blurDataURL={image.blur_data_url || undefined}
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none"
      />

      {/* Optional +N overlay on the last tile when extra photos exist */}
      {isLastTile && extraCount > 0 && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-colors duration-200 group-hover:bg-ink/85 p-3 text-center"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tabular-nums tracking-tight">
            +{extraCount}
          </span>
          <span className="text-xs sm:text-small font-medium text-hairline mt-0.5">
            more photos
          </span>
        </div>
      )}
    </button>
  );
}

function ProjectGalleryMosaicInner({
  images: propImages,
  projectTitle: propTitle,
  className = '',
}: ProjectGalleryMosaicProps) {
  const context = useOptionalProjectGallery();

  const images = propImages || context?.state.images || [];
  const projectTitle = propTitle || context?.projectTitle || 'Project';
  const open = context?.actions.open || (() => {});
  const registerRef = context?.registerTileRef;

  // Task 5: Zero-image state: render nothing, not an empty box.
  if (!images || images.length === 0) {
    return null;
  }

  const count = images.length;

  // 1 image: full width 16:9 desktop & mobile
  if (count === 1) {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-1">
          <MosaicTile
            image={images[0]}
            index={0}
            totalImages={1}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="aspect-[16/9] w-full"
            onClick={open}
            registerRef={registerRef}
          />
        </div>
      </div>
    );
  }

  // 2 images: two equal columns 4:3 desktop, stacked or two-col mobile
  if (count === 2) {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <MosaicTile
            image={images[0]}
            index={0}
            totalImages={2}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 590px, (min-width: 640px) 50vw, 100vw"
            className="aspect-[16/9] sm:aspect-[4/3] w-full"
            onClick={open}
            registerRef={registerRef}
          />
          <MosaicTile
            image={images[1]}
            index={1}
            totalImages={2}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 590px, (min-width: 640px) 50vw, 100vw"
            className="aspect-[16/9] sm:aspect-[4/3] w-full"
            onClick={open}
            registerRef={registerRef}
          />
        </div>
      </div>
    );
  }

  // 3 images: one large (spans two rows) plus two stacked desktop;
  // mobile: first image full width 16:9, two images 4:3 in two-column grid below
  if (count === 3) {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4">
          <MosaicTile
            image={images[0]}
            index={0}
            totalImages={3}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 780px, (min-width: 768px) 66vw, 100vw"
            className="col-span-2 aspect-[16/9] md:aspect-auto md:row-span-2 w-full"
            onClick={open}
            registerRef={registerRef}
          />
          <MosaicTile
            image={images[1]}
            index={1}
            totalImages={3}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 390px, (min-width: 768px) 33vw, 50vw"
            className="col-span-1 aspect-[4/3] md:row-span-1 w-full"
            onClick={open}
            registerRef={registerRef}
          />
          <MosaicTile
            image={images[2]}
            index={2}
            totalImages={3}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 390px, (min-width: 768px) 33vw, 50vw"
            className="col-span-1 aspect-[4/3] md:row-span-1 w-full"
            onClick={open}
            registerRef={registerRef}
          />
        </div>
      </div>
    );
  }

  // 4 images: 2x2 grid desktop;
  // mobile: first image full width 16:9, remaining 3 in two-column grid
  if (count === 4) {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <MosaicTile
            image={images[0]}
            index={0}
            totalImages={4}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 590px, 50vw"
            className="col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/3] w-full"
            onClick={open}
            registerRef={registerRef}
          />
          <MosaicTile
            image={images[1]}
            index={1}
            totalImages={4}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 590px, 50vw"
            className="col-span-1 aspect-[4/3] w-full"
            onClick={open}
            registerRef={registerRef}
          />
          <MosaicTile
            image={images[2]}
            index={2}
            totalImages={4}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 590px, 50vw"
            className="col-span-1 aspect-[4/3] w-full"
            onClick={open}
            registerRef={registerRef}
          />
          <MosaicTile
            image={images[3]}
            index={3}
            totalImages={4}
            projectTitle={projectTitle}
            sizes="(min-width: 1280px) 590px, 50vw"
            className="col-span-2 sm:col-span-1 aspect-[16/9] sm:aspect-[4/3] md:aspect-[4/3] w-full"
            onClick={open}
            registerRef={registerRef}
          />
        </div>
      </div>
    );
  }

  // 5 or more images: four-column bento desktop (one 2x2 large tile + four 1x1 small tiles);
  // mobile: first image full width, two-column grid of up to 4 more, +N overlay, then "View all N photos" button
  const visibleImages = images.slice(0, 5);
  const extraCount = count - 5;

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4">
        {/* Large Tile (2x2 on desktop, full width on mobile) */}
        <MosaicTile
          image={visibleImages[0]}
          index={0}
          totalImages={count}
          projectTitle={projectTitle}
          sizes="(min-width: 1280px) 590px, (min-width: 768px) 50vw, 100vw"
          className="col-span-2 aspect-[16/9] md:aspect-auto md:row-span-2 w-full"
          onClick={open}
          registerRef={registerRef}
        />

        {/* Small Tile 1 */}
        <MosaicTile
          image={visibleImages[1]}
          index={1}
          totalImages={count}
          projectTitle={projectTitle}
          sizes="(min-width: 1280px) 290px, (min-width: 768px) 25vw, 50vw"
          className="col-span-1 aspect-[4/3] md:row-span-1 w-full"
          onClick={open}
          registerRef={registerRef}
        />

        {/* Small Tile 2 */}
        <MosaicTile
          image={visibleImages[2]}
          index={2}
          totalImages={count}
          projectTitle={projectTitle}
          sizes="(min-width: 1280px) 290px, (min-width: 768px) 25vw, 50vw"
          className="col-span-1 aspect-[4/3] md:row-span-1 w-full"
          onClick={open}
          registerRef={registerRef}
        />

        {/* Small Tile 3 */}
        <MosaicTile
          image={visibleImages[3]}
          index={3}
          totalImages={count}
          projectTitle={projectTitle}
          sizes="(min-width: 1280px) 290px, (min-width: 768px) 25vw, 50vw"
          className="col-span-1 aspect-[4/3] md:row-span-1 w-full"
          onClick={open}
          registerRef={registerRef}
        />

        {/* Small Tile 4 (shows +N overlay if count > 5) */}
        <MosaicTile
          image={visibleImages[4]}
          index={4}
          totalImages={count}
          projectTitle={projectTitle}
          sizes="(min-width: 1280px) 290px, (min-width: 768px) 25vw, 50vw"
          className="col-span-1 aspect-[4/3] md:row-span-1 w-full"
          isLastTile={true}
          extraCount={extraCount}
          onClick={open}
          registerRef={registerRef}
        />
      </div>

      {/* Mobile-only "View all N photos" action button per BRIEF Section 6 */}
      {count > 5 && (
        <div className="mt-3 md:hidden">
          <SecondaryButton
            type="button"
            onClick={() => open(4)}
            className="w-full justify-center min-h-[44px]"
          >
            View all {count} photos
          </SecondaryButton>
        </div>
      )}
    </div>
  );
}

/**
 * ProjectGalleryMosaic component.
 * If used within ProjectGalleryProvider, it integrates with the shared gallery state.
 * If used standalone with `images` prop, it self-wraps with ProjectGalleryProvider and ProjectGalleryLightbox.
 */
export function ProjectGalleryMosaic(props: ProjectGalleryMosaicProps) {
  const context = useOptionalProjectGallery();

  // If already inside provider or zero images, render inner directly
  if (context || !props.images || props.images.length === 0) {
    return <ProjectGalleryMosaicInner {...props} />;
  }

  // Standalone usage: self-wrap with Provider and Lightbox
  return (
    <ProjectGalleryProvider images={props.images} projectTitle={props.projectTitle}>
      <ProjectGalleryMosaicInner {...props} />
      <ProjectGalleryLightbox />
    </ProjectGalleryProvider>
  );
}
