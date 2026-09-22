import { createClient } from '@supabase/supabase-js';
import { GALLERY_DATA } from '@/data/gallery';
import { PROJECTS_DATA } from '@/data/projects';
import { TEAM_DATA } from '@/data/team';
import { GalleryItem, ProjectCaseStudy, TeamMember, SiteSettings } from '@/types';

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
    delete queryCache[key];
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

      if (error || !data || data.length === 0) {
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

export async function getPublishedProjects(): Promise<ProjectCaseStudy[]> {
  const cached = getFromCache<ProjectCaseStudy[]>('projects');
  if (cached) return cached;

  const fetchProjects = async (): Promise<ProjectCaseStudy[]> => {
    try {
      const supabase = getPublicSupabaseClient();
      if (!supabase) return PROJECTS_DATA;

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return PROJECTS_DATA;
      }

      return data.map((row: any) => ({
        id: row.id,
        title: row.title,
        category: row.category || 'Industrial',
        client: row.client_name,
        location: 'Greater Accra / Regional Hubs',
        capacity: 'Class-A Industrial Grid',
        scope: row.description,
        timeline: 'Completed On-Schedule',
        outcome: row.outcome || 'Zero-loss operational uptime achieved.',
        image: row.cover_image_path || null,
        highlight: row.outcome || 'High-Efficiency Infrastructure Delivery',
        tags: [row.category || 'Industrial', 'Energy Commission Certified', 'Modes Power Services'],
      }));
    } catch {
      return PROJECTS_DATA;
    }
  };

  const result = await withTimeout(fetchProjects(), 3000, PROJECTS_DATA);
  return saveToCache('projects', result);
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

      if (error || !data || data.length === 0) {
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
