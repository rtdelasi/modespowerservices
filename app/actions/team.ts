'use server';

import { createClient } from '@/lib/supabase/server';
import { teamMemberSchema, TeamMemberInput } from '@/lib/validations/team';
import { deleteStorageFile } from '@/lib/supabase/storage';
import { clearQueryCache } from '@/lib/supabase/queries';
import { revalidatePath } from 'next/cache';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

export async function createTeamMember(rawData: TeamMemberInput) {
  const parseResult = teamMemberSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { success: false, error: parseResult.error.issues[0]?.message || 'Validation failed' };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('team_members')
    .insert(parseResult.data)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  clearQueryCache('team_members');
  revalidatePath('/about');
  revalidatePath('/admin/team');
  return { success: true, data };
}

export async function updateTeamMember(id: string, rawData: TeamMemberInput) {
  const parseResult = teamMemberSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { success: false, error: parseResult.error.issues[0]?.message || 'Validation failed' };
  }

  const supabase = createClient();
  let result;

  if (isValidUUID(id)) {
    result = await supabase
      .from('team_members')
      .update(parseResult.data)
      .eq('id', id)
      .select()
      .single();

    if (result.error && (result.error.code === 'PGRST116' || result.error.message.includes('0 rows'))) {
      result = await supabase
        .from('team_members')
        .insert(parseResult.data)
        .select()
        .single();
    }
  } else {
    // Non-UUID ID: find matching row by name or insert
    const { data: existing } = await supabase
      .from('team_members')
      .select('id')
      .eq('name', parseResult.data.name)
      .single();

    if (existing?.id) {
      result = await supabase
        .from('team_members')
        .update(parseResult.data)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('team_members')
        .insert(parseResult.data)
        .select()
        .single();
    }
  }

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  clearQueryCache('team_members');
  revalidatePath('/about');
  revalidatePath('/admin/team');
  return { success: true, data: result.data };
}

export async function deleteTeamMember(id: string, photoPath?: string | null) {
  const supabase = createClient();

  if (photoPath && photoPath.trim() !== '') {
    await deleteStorageFile('team', photoPath);
  }

  if (isValidUUID(id)) {
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) {
      return { success: false, error: error.message };
    }
  }

  clearQueryCache('team_members');
  revalidatePath('/about');
  revalidatePath('/admin/team');
  return { success: true };
}

export async function toggleTeamPublish(id: string, currentStatus: boolean) {
  const supabase = createClient();

  if (!isValidUUID(id)) {
    return { success: true, published: !currentStatus };
  }

  const { data, error } = await supabase
    .from('team_members')
    .update({ published: !currentStatus })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  clearQueryCache('team_members');
  revalidatePath('/about');
  revalidatePath('/admin/team');
  return { success: true, published: data.published };
}

export async function reorderTeamMembers(items: { id: string; sort_order: number }[]) {
  const supabase = createClient();

  for (const item of items) {
    if (isValidUUID(item.id)) {
      await supabase
        .from('team_members')
        .update({ sort_order: item.sort_order })
        .eq('id', item.id);
    }
  }

  clearQueryCache('team_members');
  revalidatePath('/about');
  revalidatePath('/admin/team');
  return { success: true };
}
