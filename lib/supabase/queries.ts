import { createClient } from '@supabase/supabase-js';
import { GALLERY_DATA } from '@/data/gallery';
import { PROJECTS_DATA } from '@/data/projects';
import { TEAM_DATA } from '@/data/team';
import { GalleryItem, Project, ProjectImage, ProjectCaseStudy, TeamMember, SiteSettings } from '@/types';

// Category mapping helper for gallery
const CATEGORY_MAP: Record<string, GalleryItem['category']> = {
  installations: 'Installations',
  maintenance: 'Maintenance',
  audits: 'Audits',
  solar_custom: 'Solar/Custom',
  Installations: 'Installations',
  Maintenance: 'Maintenance',
  Audits: 'Audits',
  'Solar/Custom': 'Solar/Custom',
};

const DEFAULT_SETTINGS: SiteSettings = {
  id: 'default',
  maintenance_mode: false,
  hero_image_url: null,
  about_image_url: null,
  cta_image_url: null,
  og_image_url: null,
};

// In-memory query cache for instant responses
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}
const queryCache: Record<string, CacheEntry<any>> = {};
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

function getFromCache<T>(key: string): T | null {
  const entry = queryCache[key];
  if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) {
    return entry.data as T;
  }
  return null;
}

function saveToCache<T>(key: string, data: T): T {
  queryCache[key] = { data, timestamp: Date.now() };
  return data;
}

export function clearQueryCache(key?: string): void {
  if (key) {
    const search = key.toLowerCase();
    for (const k in queryCache) {
      if (k.toLowerCase().includes(search) || k.toLowerCase().startsWith(search)) {
        delete queryCache[k];
      }
    }
  } else {
    for (const k in queryCache) {
      delete queryCache[k];
    }
  }
}

function getPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('placeholder')) {
    return null;
  }
  return createClient(url, key);
}

// Timeout helper with generous threshold for real database responses
async function withTimeout<T>(promise: Promise<T>, timeoutMs = 3000, fallback: T): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallback), timeoutMs);
  });
  return Promise.race([
    promise.then((res) => {
      clearTimeout(timer);
      return res;
    }).catch(() => {
      clearTimeout(timer);
      return fallback;
    }),
    timeoutPromise,
  ]);
}

export async function getSiteSettingsQuery(): Promise<SiteSettings> {
  const cached = getFromCache<SiteSettings>('site_settings');
  if (cached) return cached;

  const fetchSettings = async (): Promise<SiteSettings> => {
    try {
      const supabase = getPublicSupabaseClient();
      if (!supabase) return DEFAULT_SETTINGS;

      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .single();

      if (error || !data) {
        return DEFAULT_SETTINGS;
      }

      return {
        id: data.id,
        maintenance_mode: Boolean(data.maintenance_mode),
        hero_image_url: data.hero_image_url || null,
        about_image_url: data.about_image_url || null,
        cta_image_url: data.cta_image_url || null,
        og_image_url: data.og_image_url || null,
        updated_at: data.updated_at,
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  };

  const result = await withTimeout(fetchSettings(), 3000, DEFAULT_SETTINGS);
  return saveToCache('site_settings', result);
}

export async function getPublishedGalleryItems(): Promise<GalleryItem[]> {
  const cached = getFromCache<GalleryItem[]>('gallery_items');
  if (cached) return cached;

  const fetchItems = async (): Promise<GalleryItem[]> => {
    try {
      const supabase = getPublicSupabaseClient();
      if (!supabase) return GALLERY_DATA;

      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error || !data) {
        return GALLERY_DATA;
      }

      return data.map((row: any) => ({
        id: row.id,
        title: row.title,
        category: CATEGORY_MAP[row.category] || 'Installations',
        location: 'Ghana',
        description: row.alt_text || row.title,
        image: row.image_path || null,
        specs: CATEGORY_MAP[row.category] || 'Engineering Installation',
      }));
    } catch {
      return GALLERY_DATA;
    }
  };

  const result = await withTimeout(fetchItems(), 3000, GALLERY_DATA);
  return saveToCache('gallery_items', result);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project';
}

export function mapDbRowToProject(row: any): Project {
  // Extract images
  let rawImages: any[] = [];
  if (Array.isArray(row.project_images) && row.project_images.length > 0) {
    rawImages = [...row.project_images];
  }

  // Sort images by sort_order ascending
  rawImages.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const images: ProjectImage[] = rawImages.map((img: any) => ({
    id: img.id,
    project_id: img.project_id || row.id,
    url: img.url,
    alt: img.alt || row.title || '',
    caption: img.caption || null,
    kind: (img.kind === 'before' || img.kind === 'after' ? img.kind : 'gallery') as 'gallery' | 'before' | 'after',
    sort_order: img.sort_order ?? 0,
    width: img.width ?? null,
    height: img.height ?? null,
    blur_data_url: img.blur_data_url ?? null,
    created_at: img.created_at,
  }));

  // Fallback: If no image rows, fall back to legacy image
  const legacyImage = row.cover_image_path || (images.length > 0 ? images[0].url : null);
  if (images.length === 0 && legacyImage) {
    images.push({
      url: legacyImage,
      alt: row.title || 'Project image',
      caption: null,
      kind: 'gallery',
      sort_order: 0,
      width: null,
      height: null,
      blur_data_url: null,
    });
  }

  const slug = row.slug || (row.title ? slugify(row.title) : row.id);
  const fallbackProject = PROJECTS_DATA.find((p) => p.slug === slug || p.id === row.id || p.title === row.title);
  const resolvedLocation = row.location && row.location.trim().length > 0 ? row.location.trim() : fallbackProject?.location || undefined;

  return {
    id: row.id,
    slug,
    title: row.title || 'Untitled Project',
    category: row.category || 'Industrial',
    client: row.client_name || undefined,
    client_name: row.client_name || undefined,
    description: row.description || undefined,
    scope: row.description || fallbackProject?.scope || undefined,
    location: resolvedLocation,
    capacity: row.capacity || fallbackProject?.capacity || undefined,
    timeline: row.timeline || fallbackProject?.timeline || undefined,
    outcome: row.outcome || 'Zero-loss operational uptime achieved.',
    image: legacyImage,
    cover_image_path: legacyImage,
    images,
    highlight: row.outcome || fallbackProject?.highlight || undefined,
    tags: Array.isArray(row.tags) && row.tags.length > 0
      ? row.tags
      : [row.category || 'Industrial', 'Energy Commission Certified', 'Modes Power Services'],
    sort_order: row.sort_order ?? 0,
    published: Boolean(row.published),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getProjects(): Promise<Project[]> {
  const cached = getFromCache<Project[]>('projects_all_published');
  if (cached) return cached;

  const fetchProjects = async (): Promise<Project[]> => {
    try {
      const supabase = getPublicSupabaseClient();
      if (!supabase) return PROJECTS_DATA;

      // 1. Try fetching with project_images joined
      let { data, error } = await supabase
        .from('projects')
        .select('*, project_images(*)')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      // 2. Fallback to projects table only if join fails (e.g. migration not run yet)
      if (error) {
        const fallbackRes = await supabase
          .from('projects')
          .select('*')
          .eq('published', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        data = fallbackRes.data;
        error = fallbackRes.error;
      }

      if (error || !data || data.length === 0) {
        return PROJECTS_DATA;
      }

      return data.map(mapDbRowToProject);
    } catch {
      return PROJECTS_DATA;
    }
  };

  const result = await withTimeout(fetchProjects(), 3000, PROJECTS_DATA);
  return saveToCache('projects_all_published', result);
}

export async function getPublishedProjects(): Promise<ProjectCaseStudy[]> {
  return getProjects();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const cacheKey = `project_slug_${slug}`;
  const cached = getFromCache<Project | null>(cacheKey);
  if (cached !== null) return cached;

  const fetchProject = async (): Promise<Project | null> => {
    try {
      const supabase = getPublicSupabaseClient();
      if (!supabase) {
        const foundStatic = PROJECTS_DATA.find((p) => p.slug === slug || p.id === slug);
        return foundStatic || null;
      }

      // Try selecting by slug with project_images
      let { data, error } = await supabase
        .from('projects')
        .select('*, project_images(*)')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      // If error (e.g. slug column or project_images not migrated yet), try fallback queries
      if (error) {
        const resSlugOnly = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        if (resSlugOnly.data) {
          data = resSlugOnly.data;
        } else {
          const resId = await supabase
            .from('projects')
            .select('*')
            .eq('id', slug)
            .eq('published', true)
            .maybeSingle();
          data = resId.data;
        }
      } else if (!data) {
        // Check if slug passed was an id
        const resId = await supabase
          .from('projects')
          .select('*, project_images(*)')
          .eq('id', slug)
          .eq('published', true)
          .maybeSingle();
        data = resId.data;
      }

      if (data) {
        return mapDbRowToProject(data);
      }

      const foundStatic = PROJECTS_DATA.find((p) => p.slug === slug || p.id === slug);
      return foundStatic || null;
    } catch {
      const foundStatic = PROJECTS_DATA.find((p) => p.slug === slug || p.id === slug);
      return foundStatic || null;
    }
  };

  const result = await withTimeout(fetchProject(), 3000, null);
  if (result) {
    saveToCache(cacheKey, result);
  }
  return result;
}

export async function getProjectSlugs(): Promise<string[]> {
  const cached = getFromCache<string[]>('project_slugs');
  if (cached) return cached;

  const fetchSlugs = async (): Promise<string[]> => {
    try {
      const supabase = getPublicSupabaseClient();
      if (!supabase) {
        return PROJECTS_DATA.map((p) => p.slug);
      }

      const { data, error } = await supabase
        .from('projects')
        .select('slug, title, id')
        .eq('published', true);

      if (error || !data) {
        return PROJECTS_DATA.map((p) => p.slug);
      }

      return data.map((r: any) => r.slug || slugify(r.title || r.id));
    } catch {
      return PROJECTS_DATA.map((p) => p.slug);
    }
  };

  const result = await withTimeout(fetchSlugs(), 3000, PROJECTS_DATA.map((p) => p.slug));
  return saveToCache('project_slugs', result);
}

export async function getPublishedTeamMembers(): Promise<TeamMember[]> {
  const cached = getFromCache<TeamMember[]>('team_members');
  if (cached) return cached;

  const fetchTeam = async (): Promise<TeamMember[]> => {
    try {
      const supabase = getPublicSupabaseClient();
      if (!supabase) return TEAM_DATA;

      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error || !data) {
        return TEAM_DATA;
      }

      return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        tagline: row.tagline ? `“${row.tagline.replace(/^“|”$/g, '')}”` : '',
        image: row.photo_path || null,
        linkedinUrl: row.linkedin_url || '',
        credentials: row.bio_bullets && row.bio_bullets.length > 0 ? row.bio_bullets : ['Certified Electrical Engineer'],
      }));
    } catch {
      return TEAM_DATA;
    }
  };

  const result = await withTimeout(fetchTeam(), 3000, TEAM_DATA);
  return saveToCache('team_members', result);
}
