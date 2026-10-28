import React from 'react';
import { ProjectImage } from '@/types';

export interface GalleryState {
  images: ProjectImage[];
  activeIndex: number;
  isOpen: boolean;
}

export interface GalleryActions {
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export interface GalleryMeta {
  count: number;
}

export interface ProjectGalleryContextValue {
  state: GalleryState;
  actions: GalleryActions;
  meta: GalleryMeta;
  projectTitle: string;
  registerTileRef: (index: number, el: HTMLElement | null) => void;
  getTileRef: (index: number) => HTMLElement | null;
}

export interface ProjectGalleryRootProps {
  images: ProjectImage[];
  projectTitle?: string;
  children: React.ReactNode;
  initialIndex?: number;
}

export interface ProjectGalleryItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index: number;
  children: React.ReactNode;
  className?: string;
}

export interface ProjectGalleryMosaicProps {
  /**
   * Optional override images. If not provided, reads from ProjectGalleryContext.
   */
  images?: ProjectImage[];
  /**
   * Optional override project title. If not provided, reads from ProjectGalleryContext.
   */
  projectTitle?: string;
  className?: string;
}

export interface ProjectGalleryBeforeAfterProps {
  /**
   * Images array to extract first 'before' and first 'after' images from.
   */
  images?: ProjectImage[];
  /**
   * Explicit before image override.
   */
  beforeImage?: ProjectImage;
  /**
   * Explicit after image override.
   */
  afterImage?: ProjectImage;
  /**
   * Project title used for fallback alt text.
   */
  projectTitle?: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

export interface ProjectGalleryLightboxProps {
  /**
   * Optional images override. If not provided, reads from ProjectGalleryContext.
   */
  images?: ProjectImage[];
  /**
   * Optional project title override for captions and alts.
   */
  projectTitle?: string;
}
