import { z } from 'zod';

export const projectCategoryEnum = z.enum([
  'Industrial',
  'Commercial',
  'Infrastructure',
  'Solar & Hybrid',
]);

export const projectImageSchema = z.object({
  id: z.string().optional(),
  project_id: z.string().optional(),
  url: z.string().min(1, 'Image URL is required'),
  alt: z.string().default(''),
  caption: z.string().nullable().optional(),
  kind: z.enum(['gallery', 'before', 'after']).default('gallery'),
  sort_order: z.number().int().default(0),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  blur_data_url: z.string().nullable().optional(),
});

export type ProjectImageInput = z.infer<typeof projectImageSchema>;

export const projectSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().min(2, 'Title must be at least 2 characters').max(180, 'Title too long'),
    client_name: z.string().optional().nullable().default(''),
    category: projectCategoryEnum.default('Industrial'),
    description: z.string().optional().nullable().default(''),
    outcome: z.string().optional().nullable(),
    cover_image_path: z.string().nullable().optional(),
    sort_order: z.coerce.number().int().default(0),
    published: z.boolean().default(false),
    images: z.array(projectImageSchema).max(12, 'Maximum 12 images allowed').default([]),
  })
  .superRefine((data, ctx) => {
    if (data.published) {
      if (!data.outcome || data.outcome.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Outcome is required before publishing',
          path: ['outcome'],
        });
      }
      if (!data.images || data.images.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one image is required before publishing',
          path: ['images'],
        });
      } else {
        data.images.forEach((img, idx) => {
          if (!img.alt || img.alt.trim().length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Alt text is required for every image before publishing',
              path: ['images', idx, 'alt'],
            });
          }
        });
      }
    }
  });

export type ProjectInput = z.infer<typeof projectSchema>;

export interface DbProject extends Omit<ProjectInput, 'images'> {
  id: string;
  slug?: string;
  images?: ProjectImageInput[];
  client?: string;
  location?: string;
  capacity?: string;
  scope?: string;
  timeline?: string;
  highlight?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}
