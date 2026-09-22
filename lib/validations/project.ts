import { z } from 'zod';

export const projectCategoryEnum = z.enum([
  'Industrial',
  'Commercial',
  'Infrastructure',
  'Solar & Hybrid',
]);

export const projectSchema = z.object({
  client_name: z.string().min(2, 'Client name must be at least 2 characters'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(180, 'Title too long'),
  category: projectCategoryEnum.default('Industrial'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  outcome: z.string().optional().nullable(),
  cover_image_path: z.string().nullable().optional(),
  sort_order: z.coerce.number().int().default(0),
  published: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export interface DbProject extends ProjectInput {
  id: string;
  location?: string;
  capacity?: string;
  scope?: string;
  timeline?: string;
  highlight?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}
