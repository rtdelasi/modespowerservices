import { z } from 'zod';

export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role/Title is required'),
  tagline: z.string().optional().nullable(),
  bio_bullets: z.array(z.string()).default([]),
  photo_path: z.string().nullable().optional(),
  linkedin_url: z.string().url('Must be a valid URL').optional().or(z.literal('')).nullable(),
  sort_order: z.coerce.number().int().default(0),
  published: z.boolean().default(false),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;

export interface DbTeamMember extends TeamMemberInput {
  id: string;
  created_at: string;
  updated_at: string;
}
