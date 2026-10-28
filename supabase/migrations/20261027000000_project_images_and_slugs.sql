-- ==============================================================================
-- Migration: Add project_images table, projects.slug, backfill & RLS policies
-- Migration File: supabase/migrations/20261027000000_project_images_and_slugs.sql
-- ==============================================================================

-- 1. Ensure projects columns accommodate optional fields and slug
ALTER TABLE public.projects ALTER COLUMN cover_image_path DROP NOT NULL;
ALTER TABLE public.projects ALTER COLUMN client_name DROP NOT NULL;
ALTER TABLE public.projects ALTER COLUMN description DROP NOT NULL;

-- 2. Add slug column to projects (temporary nullable for backfill)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS slug TEXT;

-- 3. Backfill slug for all existing projects from title
-- Converts to lowercase, substitutes non-alphanumeric sequences with hyphens, trims dashes,
-- and handles collision resolution with numeric suffixes (-2, -3, etc.)
DO $$
DECLARE
    proj RECORD;
    base_slug TEXT;
    candidate_slug TEXT;
    collision_counter INT;
BEGIN
    FOR proj IN 
        SELECT id, title 
        FROM public.projects 
        WHERE slug IS NULL OR trim(slug) = '' 
        ORDER BY created_at ASC 
    LOOP
        -- Normalize title: lowercase, replace non-alphanumerics with hyphens, trim hyphens
        base_slug := lower(regexp_replace(COALESCE(proj.title, 'project'), '[^a-zA-Z0-9]+', '-', 'g'));
        base_slug := trim(both '-' from base_slug);
        
        IF base_slug = '' THEN
            base_slug := 'project';
        END IF;

        candidate_slug := base_slug;
        collision_counter := 1;

        -- Check for uniqueness across existing rows in projects
        WHILE EXISTS (
            SELECT 1 
            FROM public.projects 
            WHERE slug = candidate_slug 
              AND id <> proj.id
        ) LOOP
            collision_counter := collision_counter + 1;
            candidate_slug := base_slug || '-' || collision_counter;
        END LOOP;

        UPDATE public.projects 
        SET slug = candidate_slug 
        WHERE id = proj.id;
    END LOOP;
END $$;

-- Enforce NOT NULL and UNIQUE constraint on projects.slug
ALTER TABLE public.projects ALTER COLUMN slug SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'projects_slug_key'
    ) THEN
        ALTER TABLE public.projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);

-- ------------------------------------------------------------------------------
-- 4. Table: project_images
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT NOT NULL DEFAULT '',
    caption TEXT,
    kind TEXT NOT NULL DEFAULT 'gallery' CHECK (kind IN ('gallery', 'before', 'after')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    width INTEGER,
    height INTEGER,
    blur_data_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for ordering images per project
CREATE INDEX IF NOT EXISTS idx_project_images_project_sort 
    ON public.project_images (project_id, sort_order ASC);

-- ------------------------------------------------------------------------------
-- 5. Backfill: 1 project_images row per existing project from its current image
-- ------------------------------------------------------------------------------
INSERT INTO public.project_images (
    project_id,
    url,
    alt,
    caption,
    kind,
    sort_order,
    created_at
)
SELECT 
    p.id AS project_id,
    p.cover_image_path AS url,
    COALESCE(NULLIF(p.title, ''), 'Project image') AS alt,
    NULL AS caption,
    'gallery' AS kind,
    0 AS sort_order,
    now() AS created_at
FROM public.projects p
WHERE p.cover_image_path IS NOT NULL 
  AND trim(p.cover_image_path) <> ''
  AND NOT EXISTS (
      SELECT 1 FROM public.project_images pi WHERE pi.project_id = p.id
  );

-- ------------------------------------------------------------------------------
-- 6. Row-Level Security (RLS) for project_images
-- ------------------------------------------------------------------------------
-- Follows the exact security pattern used for public.projects:
-- - Public (anon & authenticated) can SELECT images only when the parent project is published
-- - Authenticated users (admin) have full ALL permissions (SELECT, INSERT, UPDATE, DELETE)
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published project images" ON public.project_images;
CREATE POLICY "Public can view published project images"
    ON public.project_images
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 
            FROM public.projects p
            WHERE p.id = project_images.project_id
              AND p.published = true
        )
    );

DROP POLICY IF EXISTS "Authenticated users can manage all project images" ON public.project_images;
CREATE POLICY "Authenticated users can manage all project images"
    ON public.project_images
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
