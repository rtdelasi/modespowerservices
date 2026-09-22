import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { GalleryTable } from '@/components/admin/GalleryTable';
import { GALLERY_ITEMS } from '@/data/gallery';
import { DbGalleryItem } from '@/lib/validations/gallery';

export default async function AdminGalleryPage() {
  const supabase = createClient();
  let items: DbGalleryItem[] = [];

  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (data && !error) {
      items = data as DbGalleryItem[];
    } else {
      items = GALLERY_ITEMS.map((item, idx) => ({
        id: item.id,
        title: item.title,
        category: (item.category as any) || 'installations',
        image_path: item.imageUrl,
        alt_text: item.title,
        sort_order: idx,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }
  } catch (err) {
    items = GALLERY_ITEMS.map((item, idx) => ({
      id: item.id,
      title: item.title,
      category: (item.category as any) || 'installations',
      image_path: item.imageUrl,
      alt_text: item.title,
      sort_order: idx,
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Gallery Management"
        description="Organize and showcase field photos, installations, and audit work on the public gallery."
        actionLabel="Add Photo"
        actionHref="/admin/gallery/new"
        backHref="/admin"
        backLabel="Dashboard"
      />

      <div className="text-xs text-[#86868B] flex items-center gap-2 px-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        <span>Drag the handle on the left of any row to reorder items on the live website.</span>
      </div>

      <GalleryTable initialItems={items} />
    </div>
  );
}
