import React from 'react';
import { Metadata } from 'next';
import { getPublishedGalleryItems } from '@/lib/supabase/queries';
import { GalleryClient } from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery — Verified Field Photography & Installations',
  description:
    'Explore completed electrical engineering projects, substation construction, power quality audits, and commercial solar installations across Ghana by Modes Power Services.',
};

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();

  return <GalleryClient initialItems={items} />;
}
