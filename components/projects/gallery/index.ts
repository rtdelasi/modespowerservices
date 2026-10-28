import {
  ProjectGalleryProvider,
  ProjectGalleryRoot,
  useProjectGallery,
  useOptionalProjectGallery,
} from './ProjectGalleryProvider';
import { ProjectGalleryItem } from './ProjectGalleryItem';
import { ProjectGalleryMosaic } from './ProjectGalleryMosaic';
import { ProjectGalleryBeforeAfter } from './ProjectGalleryBeforeAfter';
import { ProjectGalleryLightbox } from './ProjectGalleryLightbox';

/**
 * Compound ProjectGallery component per TASK 1 & BRIEF Section 7:
 * ProjectGallery.Root, ProjectGallery.Item, ProjectGallery.Lightbox,
 * ProjectGallery.Mosaic, and ProjectGallery.BeforeAfter.
 */
export const ProjectGallery = {
  Root: ProjectGalleryRoot,
  Item: ProjectGalleryItem,
  Mosaic: ProjectGalleryMosaic,
  BeforeAfter: ProjectGalleryBeforeAfter,
  Lightbox: ProjectGalleryLightbox,
};

export {
  ProjectGalleryProvider,
  ProjectGalleryRoot,
  ProjectGalleryItem,
  ProjectGalleryMosaic,
  ProjectGalleryBeforeAfter,
  ProjectGalleryLightbox,
  useProjectGallery,
  useOptionalProjectGallery,
};

export * from './types';
