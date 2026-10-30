import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProjectsTable } from '@/components/admin/ProjectsTable';
import { PROJECTS } from '@/data/projects';
import { DbProject } from '@/lib/validations/project';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminProjectsPage() {
  const supabase = createClient();
  let items: DbProject[] = [];

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (data && !error && data.length > 0) {
      items = data.map((row: any) => {
        const fallback = PROJECTS.find((p) => p.id === row.id || (p as any).slug === row.slug || p.title === row.title);
        return {
          ...row,
          location: row.location || fallback?.location || '',
        } as DbProject;
      });
    } else if (data && !error && data.length === 0) {
      items = [];
    } else {
      items = PROJECTS.map((p, idx) => ({
        id: p.id,
        slug: (p as any).slug || p.id,
        title: p.title,
        client_name: p.client || '',
        location: p.location || '',
        category: (p.category as any) || 'Industrial',
        description: p.description || '',
        outcome: p.outcome || null,
        cover_image_path: p.image || null,
        images: (p as any).images || [],
        sort_order: idx,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }
  } catch (err) {
    items = [];
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Project Management"
        description="Manage engineering case studies, technical scopes, client names, and portfolio entries."
        actionLabel="Add Project"
        actionHref="/admin/projects/new"
        backHref="/admin"
        backLabel="Dashboard"
      />

      <div className="text-xs text-[#86868B] flex items-center gap-2 px-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        <span>Drag the handle on the left to adjust the sequence of case studies on the live site.</span>
      </div>

      <ProjectsTable initialItems={items} />
    </div>
  );
}
