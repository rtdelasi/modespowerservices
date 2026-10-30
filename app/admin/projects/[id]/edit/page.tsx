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
    // 1. Try fetching with project_images joined
    let { data, error } = await supabase
      .from('projects')
      .select('*, project_images(*)')
      .eq('id', params.id)
      .single();

    if (error) {
      const fallbackRes = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single();
      data = fallbackRes.data;
    }

    if (data) {
      let images: any[] = [];
      if (Array.isArray(data.project_images) && data.project_images.length > 0) {
        images = [...data.project_images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      } else if (data.cover_image_path) {
        images = [
          {
            url: data.cover_image_path,
            alt: data.title || '',
            caption: null,
            kind: 'gallery',
            sort_order: 0,
          },
        ];
      }

      item = {
        ...data,
        location: data.location || (PROJECTS.find((p) => p.id === data.id || (p as any).slug === data.slug || p.title === data.title)?.location || ''),
        images,
      } as DbProject;
    }
  } catch (err) {
    // fallback
  }

  if (!item) {
    const fallback = PROJECTS.find((p) => p.id === params.id || (p as any).slug === params.id);
    if (fallback) {
      item = {
        id: fallback.id,
        slug: (fallback as any).slug || fallback.id,
        title: fallback.title,
        client_name: fallback.client || '',
        location: fallback.location || '',
        category: (fallback.category as any) || 'Industrial',
        description: fallback.description || '',
        outcome: fallback.outcome || null,
        cover_image_path: fallback.image || null,
        images: (fallback as any).images || [],
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
