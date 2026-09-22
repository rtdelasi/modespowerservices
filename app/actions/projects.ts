'use server';

import { createClient } from '@/lib/supabase/server';
import { projectSchema, ProjectInput } from '@/lib/validations/project';
import { deleteStorageFile } from '@/lib/supabase/storage';
import { clearQueryCache } from '@/lib/supabase/queries';
import { revalidatePath } from 'next/cache';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

export async function createProject(rawData: ProjectInput) {
  const parseResult = projectSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { success: false, error: parseResult.error.issues[0]?.message || 'Validation failed' };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .insert(parseResult.data)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  clearQueryCache('projects');
  revalidatePath('/projects');
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
  let result;

  if (isValidUUID(id)) {
    result = await supabase
      .from('projects')
      .update(parseResult.data)
      .eq('id', id)
      .select()
      .single();

    if (result.error && (result.error.code === 'PGRST116' || result.error.message.includes('0 rows'))) {
      result = await supabase
        .from('projects')
        .insert(parseResult.data)
        .select()
        .single();
    }
  } else {
    // Non-UUID ID (e.g. 'proj-1'): find matching row by title or insert
    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .eq('title', parseResult.data.title)
      .single();

    if (existing?.id) {
      result = await supabase
        .from('projects')
        .update(parseResult.data)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('projects')
        .insert(parseResult.data)
        .select()
        .single();
    }
  }

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  clearQueryCache('projects');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true, data: result.data };
}

export async function deleteProject(id: string, imagePath?: string | null) {
  const supabase = createClient();

  if (imagePath && imagePath.trim() !== '') {
    await deleteStorageFile('projects', imagePath);
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

  clearQueryCache('projects');
  revalidatePath('/projects');
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

  clearQueryCache('projects');
  revalidatePath('/projects');
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

  clearQueryCache('projects');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}
