'use server';

import { createClient } from '@/lib/supabase/server';
import { galleryItemSchema, GalleryItemInput } from '@/lib/validations/gallery';
import { deleteStorageFile } from '@/lib/supabase/storage';
import { clearQueryCache } from '@/lib/supabase/queries';
import { revalidatePath } from 'next/cache';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

export async function createGalleryItem(rawData: GalleryItemInput) {
  const parseResult = galleryItemSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { success: false, error: parseResult.error.issues[0]?.message || 'Validation failed' };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('gallery_items')
    .insert(parseResult.data)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  clearQueryCache('gallery_items');
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  revalidatePath('/');
  return { success: true, data };
}

export async function updateGalleryItem(id: string, rawData: GalleryItemInput) {
  const parseResult = galleryItemSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { success: false, error: parseResult.error.issues[0]?.message || 'Validation failed' };
  }

  const supabase = createClient();
  let result;

  if (isValidUUID(id)) {
    result = await supabase
      .from('gallery_items')
      .update(parseResult.data)
      .eq('id', id)
      .select()
      .single();

    if (result.error && (result.error.code === 'PGRST116' || result.error.message.includes('0 rows'))) {
      result = await supabase
        .from('gallery_items')
        .insert(parseResult.data)
        .select()
        .single();
    }
  } else {
    // Non-UUID ID (e.g. 'gal-1'): find matching row by title or insert
    const { data: existing } = await supabase
      .from('gallery_items')
      .select('id')
      .eq('title', parseResult.data.title)
      .single();

    if (existing?.id) {
      result = await supabase
        .from('gallery_items')
        .update(parseResult.data)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('gallery_items')
        .insert(parseResult.data)
        .select()
        .single();
    }
  }

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  clearQueryCache('gallery_items');
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  revalidatePath('/');
  return { success: true, data: result.data };
}

export async function deleteGalleryItem(id: string, imagePath?: string | null) {
  const supabase = createClient();

  if (imagePath && imagePath.trim() !== '') {
    await deleteStorageFile('gallery', imagePath);
  }

  try {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (error && isValidUUID(id)) {
      return { success: false, error: error.message };
    }
  } catch (err: any) {
    if (isValidUUID(id)) {
      return { success: false, error: err?.message || 'Delete failed' };
    }
  }

  clearQueryCache('gallery_items');
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function toggleGalleryPublish(id: string, currentStatus: boolean) {
  const supabase = createClient();

  if (!isValidUUID(id)) {
    return { success: true, published: !currentStatus };
  }

  const { data, error } = await supabase
    .from('gallery_items')
    .update({ published: !currentStatus })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  clearQueryCache('gallery_items');
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  revalidatePath('/');
  return { success: true, published: data.published };
}

export async function reorderGalleryItems(items: { id: string; sort_order: number }[]) {
  const supabase = createClient();

  for (const item of items) {
    if (isValidUUID(item.id)) {
      await supabase
        .from('gallery_items')
        .update({ sort_order: item.sort_order })
        .eq('id', item.id);
    }
  }

  clearQueryCache('gallery_items');
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  return { success: true };
}
