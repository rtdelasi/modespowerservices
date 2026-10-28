'use server';

import { createClient } from '@/lib/supabase/server';
import { projectSchema, ProjectInput } from '@/lib/validations/project';
import { deleteStorageFile } from '@/lib/supabase/storage';
import { clearQueryCache, slugify } from '@/lib/supabase/queries';
import { revalidatePath } from 'next/cache';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

async function getUniqueSlug(supabase: any, baseTitle: string, excludeId?: string): Promise<string> {
  const baseSlug = slugify(baseTitle);
  let candidateSlug = baseSlug;
  let counter = 1;

  while (true) {
    try {
      let query = supabase
        .from('projects')
        .select('id')
        .eq('slug', candidateSlug);

      if (excludeId && isValidUUID(excludeId)) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query.maybeSingle();
      if (error || !data) {
        break;
      }

      counter++;
      candidateSlug = `${baseSlug}-${counter}`;
    } catch {
      break;
    }
  }

  return candidateSlug;
}

export async function createProject(rawData: ProjectInput) {
  const parseResult = projectSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { success: false, error: parseResult.error.issues[0]?.message || 'Validation failed' };
  }

  const supabase = createClient();
  const slug = await getUniqueSlug(supabase, parseResult.data.title);

  const images = parseResult.data.images || [];
  const coverUrl = images.length > 0 ? images[0].url : (parseResult.data.cover_image_path || null);

  const projectPayload: any = {
    title: parseResult.data.title,
    client_name: parseResult.data.client_name || '',
    category: parseResult.data.category,
    description: parseResult.data.description || '',
    outcome: parseResult.data.outcome || null,
    cover_image_path: coverUrl,
    sort_order: parseResult.data.sort_order ?? 0,
    published: parseResult.data.published,
    slug,
  };

  if (parseResult.data.id && isValidUUID(parseResult.data.id)) {
    projectPayload.id = parseResult.data.id;
  }

  let data: any = null;
  const insertRes = await supabase
    .from('projects')
    .insert(projectPayload)
    .select()
    .single();

  data = insertRes.data;
  const error = insertRes.error;

  if (error) {
    // If slug column does not exist yet in DB, retry without slug
    if (error.message?.includes('slug')) {
      delete projectPayload.slug;
      const retry = await supabase.from('projects').insert(projectPayload).select().single();
      if (retry.error) {
        return { success: false, error: retry.error.message };
      }
      data = retry.data;
    } else {
      return { success: false, error: error.message };
    }
  }

  const savedProjectId = data?.id;

  // Sync images to project_images table if present
  if (savedProjectId && images.length > 0) {
    try {
      const imagesToInsert = images.map((img, idx) => ({
        project_id: savedProjectId,
        url: img.url,
        alt: img.alt || '',
        caption: img.caption || null,
        kind: img.kind || 'gallery',
        sort_order: idx,
        width: img.width ?? null,
        height: img.height ?? null,
        blur_data_url: img.blur_data_url ?? null,
      }));
      await supabase.from('project_images').insert(imagesToInsert);
    } catch (imgErr) {
      console.warn('project_images table insert skipped (schema might not be migrated yet):', imgErr);
    }
  }

  clearQueryCache();
  revalidatePath('/projects');
  revalidatePath('/projects/[slug]', 'page');
  if (slug) {
    revalidatePath(`/projects/${slug}`);
  }
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true, data };
}

export async function updateProject(id: string, rawData: ProjectInput) {
  const parseResult = projectSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { success: false, error: parseResult.error.issues[0]?.message || 'Validation failed' };
  }

  const supabase = createClient();
  const images = parseResult.data.images || [];
  const coverUrl = images.length > 0 ? images[0].url : (parseResult.data.cover_image_path || null);

  // Check existing project to preserve slug once published
  let existingProject: any = null;
  if (isValidUUID(id)) {
    try {
      const { data } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();
      existingProject = data;
    } catch {
      // ignore
    }
  }

  let slugToSave = existingProject?.slug;
  // Slug rule: generated on first save, locked / does not change once published
  if (!slugToSave) {
    slugToSave = await getUniqueSlug(supabase, parseResult.data.title, id);
  }

  const projectPayload: any = {
    title: parseResult.data.title,
    client_name: parseResult.data.client_name || '',
    category: parseResult.data.category,
    description: parseResult.data.description || '',
    outcome: parseResult.data.outcome || null,
    cover_image_path: coverUrl,
    sort_order: parseResult.data.sort_order ?? 0,
    published: parseResult.data.published,
  };

  if (slugToSave) {
    projectPayload.slug = slugToSave;
  }

  let result;
  if (isValidUUID(id)) {
    result = await supabase
      .from('projects')
      .update(projectPayload)
      .eq('id', id)
      .select()
      .single();

    if (result.error && result.error.message?.includes('slug')) {
      delete projectPayload.slug;
      result = await supabase.from('projects').update(projectPayload).eq('id', id).select().single();
    }

    if (result.error && (result.error.code === 'PGRST116' || result.error.message.includes('0 rows'))) {
      result = await supabase
        .from('projects')
        .insert({ id, ...projectPayload })
        .select()
        .single();
    }
  } else {
    // Non-UUID ID (e.g. 'proj-1'): find matching row by title or insert
    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .eq('title', parseResult.data.title)
      .maybeSingle();

    if (existing?.id) {
      result = await supabase
        .from('projects')
        .update(projectPayload)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('projects')
        .insert(projectPayload)
        .select()
        .single();
    }
  }

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  const savedProjectId = result.data?.id || id;

  // Sync project_images table
  if (savedProjectId && isValidUUID(savedProjectId)) {
    try {
      // Delete previous image entries
      await supabase.from('project_images').delete().eq('project_id', savedProjectId);

      // Re-insert current images
      if (images.length > 0) {
        const imagesToInsert = images.map((img, idx) => ({
          project_id: savedProjectId,
          url: img.url,
          alt: img.alt || '',
          caption: img.caption || null,
          kind: img.kind || 'gallery',
          sort_order: idx,
          width: img.width ?? null,
          height: img.height ?? null,
          blur_data_url: img.blur_data_url ?? null,
        }));
        await supabase.from('project_images').insert(imagesToInsert);
      }
    } catch (imgErr) {
      console.warn('project_images sync skipped or errored:', imgErr);
    }
  }

  clearQueryCache();
  revalidatePath('/projects');
  revalidatePath('/projects/[slug]', 'page');
  if (slugToSave) {
    revalidatePath(`/projects/${slugToSave}`);
  }
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true, data: result.data };
}

export async function deleteProjectStorageImage(url: string) {
  if (!url) return { success: true };
  try {
    await deleteStorageFile('projects', url);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Delete failed' };
  }
}

export async function deleteProject(id: string, imagePath?: string | null) {
  const supabase = createClient();

  if (imagePath && imagePath.trim() !== '') {
    await deleteStorageFile('projects', imagePath);
  }

  // Also remove all associated images from storage if project_images exist
  if (isValidUUID(id)) {
    try {
      const { data: dbImages } = await supabase
        .from('project_images')
        .select('url')
        .eq('project_id', id);

      if (dbImages && dbImages.length > 0) {
        for (const img of dbImages) {
          if (img.url && img.url !== imagePath) {
            await deleteStorageFile('projects', img.url);
          }
        }
      }
    } catch {
      // ignore
    }
  }

  try {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error && isValidUUID(id)) {
      return { success: false, error: error.message };
    }
  } catch (err: any) {
    if (isValidUUID(id)) {
      return { success: false, error: err?.message || 'Delete failed' };
    }
  }

  clearQueryCache();
  revalidatePath('/projects');
  revalidatePath('/projects/[slug]', 'page');
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function toggleProjectPublish(id: string, currentStatus: boolean) {
  const supabase = createClient();

  if (!isValidUUID(id)) {
    return { success: true, published: !currentStatus };
  }

  const { data, error } = await supabase
    .from('projects')
    .update({ published: !currentStatus })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  clearQueryCache();
  revalidatePath('/projects');
  revalidatePath('/projects/[slug]', 'page');
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true, published: data.published };
}

export async function reorderProjects(items: { id: string; sort_order: number }[]) {
  const supabase = createClient();

  for (const item of items) {
    if (isValidUUID(item.id)) {
      await supabase
        .from('projects')
        .update({ sort_order: item.sort_order })
        .eq('id', item.id);
    }
  }

  clearQueryCache();
  revalidatePath('/projects');
  revalidatePath('/projects/[slug]', 'page');
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}
