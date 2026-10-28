-- ==============================================================================
-- Rollback Migration: Revert project_images table, projects.slug & RLS policies
-- Migration File: supabase/migrations/20261027000000_project_images_and_slugs_rollback.sql
-- ==============================================================================

-- 1. Remove RLS policies on project_images
DROP POLICY IF EXISTS "Public can view published project images" ON public.project_images;
DROP POLICY IF EXISTS "Authenticated users can manage all project images" ON public.project_images;

-- 2. Drop table project_images
DROP TABLE IF EXISTS public.project_images CASCADE;

-- 3. Remove constraints, index, and slug column from projects
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_slug_key;
DROP INDEX IF EXISTS idx_projects_slug;
ALTER TABLE public.projects DROP COLUMN IF EXISTS slug;
