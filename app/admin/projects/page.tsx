import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProjectsTable } from '@/components/admin/ProjectsTable';
import { PROJECTS } from '@/data/projects';
import { DbProject } from '@/lib/validations/project';

export default async function AdminProjectsPage() {
  const supabase = createClient();
  let items: DbProject[] = [];

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (data && !error) {
      items = data as DbProject[];
    } else {
      items = PROJECTS.map((p, idx) => ({
        id: p.id,
        title: p.title,
        client_name: p.client,
        category: (p.category as any) || 'Industrial',
        description: p.description,
        outcome: p.outcome,
        cover_image_path: p.image,
        sort_order: idx,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }
  } catch (err) {
    items = PROJECTS.map((p, idx) => ({
      id: p.id,
      title: p.title,
      client_name: p.client,
      category: (p.category as any) || 'Industrial',
      description: p.description,
      outcome: p.outcome,
      cover_image_path: p.image,
      sort_order: idx,
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
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
