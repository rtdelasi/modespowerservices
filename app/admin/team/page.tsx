import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TeamTable } from '@/components/admin/TeamTable';
import { TEAM_MEMBERS } from '@/data/team';
import { DbTeamMember } from '@/lib/validations/team';

export default async function AdminTeamPage() {
  const supabase = createClient();
  let items: DbTeamMember[] = [];

  try {
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      items = data as DbTeamMember[];
    } else {
      items = TEAM_MEMBERS.map((m, idx) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        tagline: m.tagline || '',
        bio_bullets: m.bioBullets || [],
        photo_path: m.photoUrl,
        linkedin_url: m.linkedinUrl,
        sort_order: idx,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }
  } catch (err) {
    items = TEAM_MEMBERS.map((m, idx) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      tagline: m.tagline || '',
      bio_bullets: m.bioBullets || [],
      photo_path: m.photoUrl,
      linkedin_url: m.linkedinUrl,
      sort_order: idx,
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Team & Leadership"
        description="Manage leadership staff profiles, job roles, bios, and LinkedIn links shown on the About page."
        actionLabel="Add Member"
        actionHref="/admin/team/new"
        backHref="/admin"
        backLabel="Dashboard"
      />

      <div className="text-xs text-[#86868B] flex items-center gap-2 px-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        <span>Drag the handle on the left to reorder team profiles displayed on the public site.</span>
      </div>

      <TeamTable initialItems={items} />
    </div>
  );
}
