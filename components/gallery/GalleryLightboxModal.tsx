'use client';

import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import '@/components/projects/gallery/lightbox-overrides.css';

import { GalleryItem } from '@/types';

export interface GalleryLightboxModalProps {
  open: boolean;
  index: number;
  items: GalleryItem[];
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

/**
 * GalleryLightboxModal per Phase 6 & Phase 9b:
 * - Uses yet-another-react-lightbox with Captions and Counter plugins
 * - Token-compliant styling via lightbox-overrides.css
 * - Slide description is included ONLY when distinct from slide title
 * - Preloads neighbours (2) for instant sliding
 */
export function GalleryLightboxModal({
  open,
  index,
  items,
  onClose,
  onIndexChange,
}: GalleryLightboxModalProps) {
  if (!items || items.length === 0) {
    return null;
  }

  // Map GalleryItem into lightbox slide format
  // Show caption only when it differs from the title
  const slides = items.map((item) => {
    const hasDistinctCaption = Boolean(
      item.description &&
        item.description.trim().length > 0 &&
        item.description.trim().toLowerCase() !== item.title.trim().toLowerCase()
    );

    return {
      src: item.image || '',
      alt: item.description || item.title,
      title: item.title,
      description: hasDistinctCaption ? item.description : undefined,
    };
  });

  return (
    <Lightbox
      open={open}
      index={index}
      close={onClose}
      slides={slides}
      plugins={[Captions, Counter]}
      carousel={{
        preload: 2,
        finite: false,
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      captions={{
        descriptionMaxLines: 3,
        showToggle: false,
      }}
      counter={{
        container: {
          style: {
            top: 20,
            left: 20,
            bottom: 'unset',
          },
        },
      }}
      on={{
        view: ({ index: newIndex }) => {
          if (onIndexChange) {
            onIndexChange(newIndex);
          }
        },
      }}
      animation={{
        fade: 200,
        swipe: 250,
      }}
    />
  );
}

export default GalleryLightboxModal;
