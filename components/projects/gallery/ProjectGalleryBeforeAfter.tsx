'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProjectGalleryBeforeAfterProps } from './types';
import { ProjectImage } from '@/types';

export function ProjectGalleryBeforeAfter({
  images,
  beforeImage: propBefore,
  afterImage: propAfter,
  projectTitle = 'Project',
  className = '',
  aspectRatio = '16/9',
}: ProjectGalleryBeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  // Pair the first before image with the first after image
  const beforeImage: ProjectImage | undefined =
    propBefore || images?.find((img) => img.kind === 'before');
  const afterImage: ProjectImage | undefined =
    propAfter || images?.find((img) => img.kind === 'after');

  // Task 5 & Task 3: If either image is missing, render nothing (not an empty box)
  if (!beforeImage || !afterImage) {
    return null;
  }

  const beforeAlt = beforeImage.alt || `${projectTitle}, before completion`;
  const afterAlt = afterImage.alt || `${projectTitle}, after completion`;

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : 'aspect-square';

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-media border border-hairline bg-hairline/60 select-none ${aspectClass} ${className}`}
    >
      {/* 1. AFTER Image (Base / background layer) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage.url}
          alt={afterAlt}
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          placeholder={afterImage.blur_data_url ? 'blur' : 'empty'}
          blurDataURL={afterImage.blur_data_url || undefined}
          className="object-cover"
        />
      </div>

      {/* 2. BEFORE Image (Clipped overlay layer) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage.url}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          placeholder={beforeImage.blur_data_url ? 'blur' : 'empty'}
          blurDataURL={beforeImage.blur_data_url || undefined}
          className="object-cover"
        />
      </div>

      {/* 3. Badges: "Before" (left) and "After" (right) */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-[6px] bg-ink/80 backdrop-blur-sm text-surface text-xs font-semibold uppercase tracking-wider shadow-sm pointer-events-none z-10">
        Before
      </div>
      <div className="absolute top-3 right-3 px-3 py-1 rounded-[6px] bg-ink/80 backdrop-blur-sm text-surface text-xs font-semibold uppercase tracking-wider shadow-sm pointer-events-none z-10">
        After
      </div>

      {/* 4. Dividing Bar & Slider Handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none z-10 flex flex-col items-center"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical line */}
        <div className="w-[2px] h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />

        {/* Center Grab Handle (44px min touch target) */}
        <div className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface text-ink border border-hairline shadow-lg flex items-center justify-center transition-transform group-hover:scale-105 peer-focus-visible:ring-2 peer-focus-visible:ring-signal">
          <svg
            className="w-5 h-5 text-ink"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" />
            <polyline points="9 18 15 12 9 6" transform="rotate(180 12 12)" />
          </svg>
        </div>
      </div>

      {/* 5. Native Range Input for Keyboard & Touch Accessibility */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        aria-label={`Comparison slider: ${beforeAlt} versus ${afterAlt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPosition}
        className="peer absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
      />
    </div>
  );
}
