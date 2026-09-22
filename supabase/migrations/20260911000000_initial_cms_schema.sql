-- ==============================================================================
-- Modes Power Services CMS — Initial Schema, RLS, Triggers & Storage Setup
-- ==============================================================================

-- 1. Helper trigger function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 2. Table: gallery_items
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('installations', 'maintenance', 'audits', 'solar_custom')),
    image_path TEXT NOT NULL,
    alt_text TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast public sorting & filtering
CREATE INDEX IF NOT EXISTS idx_gallery_items_published_sort ON public.gallery_items (published, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON public.gallery_items (category);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS tr_gallery_items_updated_at ON public.gallery_items;
CREATE TRIGGER tr_gallery_items_updated_at
    BEFORE UPDATE ON public.gallery_items
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Gallery RLS Policies
-- Public (anon) can only view published items
CREATE POLICY "Public can view published gallery items"
    ON public.gallery_items
    FOR SELECT
    TO anon, authenticated
    USING (published = true);

-- Authenticated admins can manage all gallery items
CREATE POLICY "Authenticated users can manage all gallery items"
    ON public.gallery_items
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 3. Table: projects
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Industrial',
    description TEXT NOT NULL,
    outcome TEXT,
    cover_image_path TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast public sorting & filtering
CREATE INDEX IF NOT EXISTS idx_projects_published_sort ON public.projects (published, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS tr_projects_updated_at ON public.projects;
CREATE TRIGGER tr_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects RLS Policies
-- Public (anon) can only view published projects
CREATE POLICY "Public can view published projects"
    ON public.projects
    FOR SELECT
    TO anon, authenticated
    USING (published = true);

-- Authenticated admins can manage all projects
CREATE POLICY "Authenticated users can manage all projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 4. Table: team_members
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    tagline TEXT,
    bio_bullets TEXT[] NOT NULL DEFAULT '{}',
    photo_path TEXT NOT NULL,
    linkedin_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast public sorting
CREATE INDEX IF NOT EXISTS idx_team_members_published_sort ON public.team_members (published, sort_order ASC);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS tr_team_members_updated_at ON public.team_members;
CREATE TRIGGER tr_team_members_updated_at
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Team Members RLS Policies
-- Public (anon) can only view published team members
CREATE POLICY "Public can view published team members"
    ON public.team_members
    FOR SELECT
    TO anon, authenticated
    USING (published = true);

-- Authenticated admins can manage all team members
CREATE POLICY "Authenticated users can manage all team members"
    ON public.team_members
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 5. Storage Buckets Setup & Storage Policies
-- ------------------------------------------------------------------------------
-- Create storage buckets for gallery, projects, and team
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('gallery', 'gallery', true),
    ('projects', 'projects', true),
    ('team', 'team', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies: Public read access
CREATE POLICY "Public Access for Gallery Bucket"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'gallery');

CREATE POLICY "Public Access for Projects Bucket"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'projects');

CREATE POLICY "Public Access for Team Bucket"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'team');

-- Storage RLS Policies: Authenticated Admin full access (Insert, Update, Delete)
CREATE POLICY "Admin Upload for Gallery Bucket"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Admin Update for Gallery Bucket"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'gallery');

CREATE POLICY "Admin Delete for Gallery Bucket"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'gallery');

CREATE POLICY "Admin Upload for Projects Bucket"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'projects');

CREATE POLICY "Admin Update for Projects Bucket"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'projects');

CREATE POLICY "Admin Delete for Projects Bucket"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'projects');

CREATE POLICY "Admin Upload for Team Bucket"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'team');

CREATE POLICY "Admin Update for Team Bucket"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'team');

CREATE POLICY "Admin Delete for Team Bucket"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'team');
