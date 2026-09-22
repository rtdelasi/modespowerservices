import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { PROJECTS } from '@/data/projects';
import { DbProject } from '@/lib/validations/project';

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const supabase = createClient();
  let item: DbProject | null = null;

  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .single();

    if (data) {
      item = data as DbProject;
    }
  } catch (err) {
    // fallback
  }

  if (!item) {
    const fallback = PROJECTS.find((p) => p.id === params.id);
    if (fallback) {
      item = {
        id: fallback.id,
        title: fallback.title,
        client_name: fallback.client,
        category: (fallback.category as any) || 'Industrial',
        description: fallback.description,
        outcome: fallback.outcome,
        cover_image_path: fallback.image || null,
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
        title={`Edit Project: ${item.title}`}
        description="Update client details, technical description, outcome, or cover image."
        backHref="/admin/projects"
        backLabel="Projects"
      />

      <ProjectForm initialData={item} />
    </div>
  );
}
