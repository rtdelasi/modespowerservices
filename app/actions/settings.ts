'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { clearQueryCache } from '@/lib/supabase/queries';
import { SiteSettings } from '@/types';

const DEFAULT_SETTINGS: SiteSettings = {
  id: 'default',
  maintenance_mode: false,
  hero_image_url: null,
  about_image_url: null,
  cta_image_url: null,
  og_image_url: null,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
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
  } catch (err) {
    console.error('getSiteSettings error:', err);
    return DEFAULT_SETTINGS;
  }
}

export async function toggleMaintenanceMode(enabled: boolean): Promise<{ success?: boolean; error?: string; maintenance_mode?: boolean }> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized. Please sign in to update maintenance mode.' };
    }

    const { error } = await supabase
      .from('site_settings')
      .upsert(
        {
          id: 'default',
          maintenance_mode: enabled,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      return { error: error.message };
    }

    clearQueryCache('site_settings');
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/admin/settings');
    revalidatePath('/admin');
    revalidatePath('/maintenance');

    return { success: true, maintenance_mode: enabled };
  } catch (err: any) {
    console.error('toggleMaintenanceMode error:', err);
    return { error: err.message || 'Failed to toggle maintenance mode' };
  }
}

export async function updateSiteSettings(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized. Please sign in to save settings.' };
    }

    const hero_image_url = (formData.get('hero_image_url') as string) || null;
    const about_image_url = (formData.get('about_image_url') as string) || null;
    const cta_image_url = (formData.get('cta_image_url') as string) || null;
    const og_image_url = (formData.get('og_image_url') as string) || null;

    const payload: Record<string, any> = {
      id: 'default',
      hero_image_url: hero_image_url ? hero_image_url.trim() : null,
      about_image_url: about_image_url ? about_image_url.trim() : null,
      cta_image_url: cta_image_url ? cta_image_url.trim() : null,
      og_image_url: og_image_url ? og_image_url.trim() : null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('site_settings')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      return { error: error.message };
    }

    clearQueryCache('site_settings');
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/settings');
    revalidatePath('/admin');

    return { success: true };
  } catch (err: any) {
    console.error('updateSiteSettings error:', err);
    return { error: err.message || 'Failed to update site settings' };
  }
}
