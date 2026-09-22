import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { GalleryForm } from '@/components/admin/GalleryForm';
import { GALLERY_ITEMS } from '@/data/gallery';
import { DbGalleryItem } from '@/lib/validations/gallery';

interface EditGalleryPageProps {
  params: {
    id: string;
  };
}

export default async function EditGalleryItemPage({ params }: EditGalleryPageProps) {
  const supabase = createClient();
  let item: DbGalleryItem | null = null;

  try {
    const { data } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('id', params.id)
      .single();

    if (data) {
      item = data as DbGalleryItem;
    }
  } catch (err) {
    // try finding in static fallback
  }

  if (!item) {
    const fallback = GALLERY_ITEMS.find((g) => g.id === params.id);
    if (fallback) {
      item = {
        id: fallback.id,
        title: fallback.title,
        category: (fallback.category as any) || 'installations',
        image_path: fallback.imageUrl || null,
        alt_text: fallback.title,
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
        title={`Edit Photo: ${item.title}`}
        description="Update image details, category, or visibility status."
        backHref="/admin/gallery"
        backLabel="Gallery"
      />

      <GalleryForm initialData={item} />
    </div>
  );
}
