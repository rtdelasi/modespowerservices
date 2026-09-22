-- ==============================================================================
-- Modes Power Services CMS — Site Settings, Nullable Image Paths & Storage Buckets
-- ==============================================================================

-- 1. Table: site_settings (singleton row for hero, about, cta banners & site-wide media)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    hero_image_url TEXT,
    about_image_url TEXT,
    cta_image_url TEXT,
    og_image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for updated_at on site_settings
DROP TRIGGER IF EXISTS tr_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER tr_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read site_settings
CREATE POLICY "Public can view site_settings"
    ON public.site_settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated admins can update/insert site_settings
CREATE POLICY "Authenticated users can manage site_settings"
    ON public.site_settings
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert initial default settings row if not exists
INSERT INTO public.site_settings (id, hero_image_url, about_image_url, cta_image_url, og_image_url)
VALUES ('default', NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 2. Ensure image columns in content tables are nullable
-- ------------------------------------------------------------------------------
ALTER TABLE public.gallery_items ALTER COLUMN image_path DROP NOT NULL;
ALTER TABLE public.projects ALTER COLUMN cover_image_path DROP NOT NULL;
ALTER TABLE public.team_members ALTER COLUMN photo_path DROP NOT NULL;

-- ------------------------------------------------------------------------------
-- 3. Ensure Storage Buckets for Media & Settings
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('media', 'media', true),
    ('settings', 'settings', true),
    ('gallery', 'gallery', true),
    ('projects', 'projects', true),
    ('team', 'team', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for media and settings buckets
CREATE POLICY "Public Access for Media Bucket"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'media');

CREATE POLICY "Public Access for Settings Bucket"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'settings');

CREATE POLICY "Admin Upload for Media Bucket"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'media');

CREATE POLICY "Admin Update for Media Bucket"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'media');

CREATE POLICY "Admin Delete for Media Bucket"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'media');

CREATE POLICY "Admin Upload for Settings Bucket"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'settings');

CREATE POLICY "Admin Update for Settings Bucket"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'settings');

CREATE POLICY "Admin Delete for Settings Bucket"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'settings');
