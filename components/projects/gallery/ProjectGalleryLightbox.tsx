'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useOptionalProjectGallery } from './ProjectGalleryProvider';
import { ProjectGalleryLightboxProps } from './types';

// Dynamically load LightboxModal only when needed, avoiding lightbox code in the initial bundle
const DynamicLightboxModal = dynamic(
  () => import('./LightboxModal').then((mod) => mod.LightboxModal),
  {
    ssr: false,
  }
);

export function ProjectGalleryLightbox({
  images: propImages,
  projectTitle: propTitle,
}: ProjectGalleryLightboxProps = {}) {
  const context = useOptionalProjectGallery();

  const isOpen = context?.state.isOpen ?? false;
  const activeIndex = context?.state.activeIndex ?? 0;
  const images = propImages || context?.state.images || [];
  const projectTitle = propTitle || context?.projectTitle || 'Project';
  const close = context?.actions.close || (() => {});

  // Track if lightbox has ever been opened to defer chunk loading until first open
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);

  // If never opened or no images, do not render dynamic modal
  if (!hasBeenOpened || images.length === 0) {
    return null;
  }

  return (
    <DynamicLightboxModal
      open={isOpen}
      index={activeIndex}
      images={images}
      projectTitle={projectTitle}
      onClose={close}
      onIndexChange={(newIndex) => {
        // Keep active index in sync with user swipe / arrows
        if (context && context.state.activeIndex !== newIndex) {
          // Context keeps track of the currently viewed index
        }
      }}
    />
  );
}
