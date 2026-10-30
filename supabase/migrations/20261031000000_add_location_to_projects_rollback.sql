-- ==============================================================================
-- Rollback Migration: Revert location column from projects table
-- Migration File: supabase/migrations/20261031000000_add_location_to_projects_rollback.sql
-- ==============================================================================

ALTER TABLE public.projects DROP COLUMN IF EXISTS location;

