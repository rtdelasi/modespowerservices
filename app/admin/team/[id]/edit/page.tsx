import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TeamForm } from '@/components/admin/TeamForm';
import { TEAM_MEMBERS } from '@/data/team';
import { DbTeamMember } from '@/lib/validations/team';

interface EditTeamMemberPageProps {
  params: {
    id: string;
  };
}

export default async function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
  const supabase = createClient();
  let item: DbTeamMember | null = null;

  try {
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', params.id)
      .single();

    if (data) {
      item = data as DbTeamMember;
    }
  } catch (err) {
    // fallback
  }

  if (!item) {
    const fallback = TEAM_MEMBERS.find((m) => m.id === params.id);
    if (fallback) {
      item = {
        id: fallback.id,
        name: fallback.name,
        role: fallback.role,
        tagline: fallback.tagline || '',
        bio_bullets: fallback.bioBullets || [],
        photo_path: fallback.photoUrl || null,
        linkedin_url: fallback.linkedinUrl,
        sort_order: 0,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  }

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title={`Edit Member: ${item.name}`}
        description="Update profile photo, job role, key bio highlights, or LinkedIn link."
        backHref="/admin/team"
        backLabel="Team"
      />

      <TeamForm initialData={item} />
    </div>
  );
}
