'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';
import {
  ProjectGalleryContextValue,
  ProjectGalleryRootProps,
} from './types';

const ProjectGalleryContext = createContext<ProjectGalleryContextValue | null>(null);

/**
 * Access the project gallery context. Throws if called outside ProjectGalleryProvider.
 */
export function useProjectGallery(): ProjectGalleryContextValue {
  const ctx = useContext(ProjectGalleryContext);
  if (!ctx) {
    throw new Error('useProjectGallery must be used within a <ProjectGallery.Root> or <ProjectGalleryProvider>');
  }
  return ctx;
}

/**
 * Safe accessor that returns null if used outside a provider.
 */
export function useOptionalProjectGallery(): ProjectGalleryContextValue | null {
  return useContext(ProjectGalleryContext);
}

export function ProjectGalleryProvider({
  images,
  projectTitle = 'Project',
  children,
  initialIndex = 0,
}: ProjectGalleryRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Focus return tracking
  const tileRefs = useRef<Map<number, HTMLElement>>(new Map());
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const registerTileRef = useCallback((index: number, el: HTMLElement | null) => {
    if (el) {
      tileRefs.current.set(index, el);
    } else {
      tileRefs.current.delete(index);
    }
  }, []);

  const getTileRef = useCallback((index: number) => {
    return tileRefs.current.get(index) || null;
  }, []);

  const open = useCallback((index: number) => {
    if (images.length === 0) return;
    lastActiveElementRef.current = (document.activeElement as HTMLElement) || null;
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
    setActiveIndex(clampedIndex);
    setIsOpen(true);
  }, [images.length]);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to the tile of the active image, or the element that triggered the open
    requestAnimationFrame(() => {
      const tileEl = tileRefs.current.get(activeIndex);
      if (tileEl && typeof tileEl.focus === 'function') {
        tileEl.focus();
      } else if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus();
      }
    });
  }, [activeIndex]);

  const next = useCallback(() => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const value = useMemo<ProjectGalleryContextValue>(
    () => ({
      state: {
        images,
        activeIndex,
        isOpen,
      },
      actions: {
        open,
        close,
        next,
        prev,
      },
      meta: {
        count: images.length,
      },
      projectTitle,
      registerTileRef,
      getTileRef,
    }),
    [images, activeIndex, isOpen, open, close, next, prev, projectTitle, registerTileRef, getTileRef]
  );

  return (
    <ProjectGalleryContext.Provider value={value}>
      {children}
    </ProjectGalleryContext.Provider>
  );
}

export const ProjectGalleryRoot = ProjectGalleryProvider;
