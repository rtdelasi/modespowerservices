import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { GalleryForm } from '@/components/admin/GalleryForm';

export default function NewGalleryItemPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="New Gallery Photo"
        description="Upload a high-resolution engineering or project photo to the gallery showcase."
        backHref="/admin/gallery"
        backLabel="Gallery"
      />

      <GalleryForm />
    </div>
  );
}
