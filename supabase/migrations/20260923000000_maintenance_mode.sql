-- ==============================================================================
-- Modes Power Services CMS — Maintenance Mode Migration
-- ==============================================================================

-- 1. Add maintenance_mode boolean column to site_settings
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS maintenance_mode BOOLEAN NOT NULL DEFAULT false;

-- 2. Ensure default record exists with maintenance_mode set
INSERT INTO public.site_settings (id, maintenance_mode)
VALUES ('default', false)
ON CONFLICT (id) DO UPDATE 
SET maintenance_mode = COALESCE(public.site_settings.maintenance_mode, false);
