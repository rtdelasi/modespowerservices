'use client';

import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import './lightbox-overrides.css';

import { ProjectImage } from '@/types';

export interface LightboxModalProps {
  open: boolean;
  index: number;
  images: ProjectImage[];
  projectTitle: string;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function LightboxModal({
  open,
  index,
  images,
  projectTitle,
  onClose,
  onIndexChange,
}: LightboxModalProps) {
  if (!images || images.length === 0) {
    return null;
  }

  // Map ProjectImage items into yet-another-react-lightbox slide format
  const slides = images.map((img, i) => {
    const slideTitle = img.caption || `${projectTitle} — Photo ${i + 1}`;
    const slideDescription = img.caption ? img.alt : undefined;
    return {
      src: img.url,
      alt: img.alt || `${projectTitle}, photo ${i + 1}`,
      title: slideTitle,
      description: slideDescription,
      width: img.width || 1920,
      height: img.height || 1080,
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
        preload: 2, // Preload neighbours per BRIEF Section 6
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
