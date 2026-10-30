-- ==============================================================================
-- Migration: Add location column to projects & backfill seed projects
-- Migration File: supabase/migrations/20261031000000_add_location_to_projects.sql
-- ==============================================================================

-- 1. Add location column to public.projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS location TEXT;

-- 2. Backfill existing seed projects with their accurate geographical locations
UPDATE public.projects 
SET location = 'Tema Heavy Industrial Area, Greater Accra'
WHERE (title ILIKE '%33kV/11kV%' OR title ILIKE '%Heavy Industrial Substation%' OR slug = 'tema-industrial-substation')
  AND (location IS NULL OR trim(location) = '');

UPDATE public.projects 
SET location = 'Airport Residential / City Area, Accra'
WHERE (title ILIKE '%750kWp%' OR title ILIKE '%BESS Microgrid%' OR slug = 'accra-financial-center-hybrid')
  AND (location IS NULL OR trim(location) = '');

UPDATE public.projects 
SET location = 'Obuasi / Kumasi Corridor, Ashanti Region'
WHERE (title ILIKE '%Power Quality Audit%' OR title ILIKE '%Harmonic Filtering%' OR slug = 'ashanti-gold-refinery-audit')
  AND (location IS NULL OR trim(location) = '');

UPDATE public.projects 
SET location = 'Ridge / Central Accra'
WHERE (title ILIKE '%Critical Medical Center%' OR title ILIKE '%Dual Redundancy%' OR slug = 'ridge-hospital-emergency-power')
  AND (location IS NULL OR trim(location) = '');

UPDATE public.projects 
SET location = 'Takoradi Port Industrial Enclave, Western Region'
WHERE (title ILIKE '%Port Cold Storage%' OR title ILIKE '%High-Mast Electrification%' OR slug = 'takoradi-harbor-logistics-electrification')
  AND (location IS NULL OR trim(location) = '');

UPDATE public.projects 
SET location = 'Cantonments, Accra'
WHERE (title ILIKE '%Cantonments%' OR title ILIKE '%Luxury Estate%' OR slug = 'cantonments-luxury-residential-estate')
  AND (location IS NULL OR trim(location) = '');

