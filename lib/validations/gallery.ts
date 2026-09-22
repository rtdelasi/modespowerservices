import { z } from 'zod';

export const galleryCategoryEnum = z.enum([
  'installations',
  'maintenance',
  'audits',
  'solar_custom',
]);

export const galleryItemSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(150, 'Title too long'),
  category: galleryCategoryEnum,
  image_path: z.string().nullable().optional(),
  alt_text: z.string().default(''),
  sort_order: z.coerce.number().int().default(0),
  published: z.boolean().default(false),
});

export type GalleryItemInput = z.infer<typeof galleryItemSchema>;

export interface DbGalleryItem extends GalleryItemInput {
  id: string;
  created_at: string;
  updated_at: string;
}
