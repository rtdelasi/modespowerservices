'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2 } from 'lucide-react';
import { DbGalleryItem } from '@/lib/validations/gallery';
import { SortableTable } from '@/components/admin/SortableTable';
import { DraftPublishToggle } from '@/components/admin/DraftPublishToggle';
import { ConfirmDeleteDialog } from '@/components/admin/ConfirmDeleteDialog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import {
  deleteGalleryItem,
  toggleGalleryPublish,
  reorderGalleryItems,
} from '@/app/actions/gallery';

const CATEGORY_LABELS: Record<string, string> = {
  installations: 'Installations',
  maintenance: 'Maintenance',
  audits: 'Audits & Compliance',
  solar_custom: 'Solar & Custom',
};

export function GalleryTable({ initialItems }: { initialItems: DbGalleryItem[] }) {
  const [items, setItems] = useState<DbGalleryItem[]>(initialItems);

  const handleReorder = async (newItems: DbGalleryItem[]) => {
    setItems(newItems);
    const payload = newItems.map((item, index) => ({
      id: item.id,
      sort_order: index,
    }));
    await reorderGalleryItems(payload);
  };

  const handleDeleteSuccess = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const columns = [
    { header: 'Image', className: 'w-24' },
    { header: 'Title & Category' },
    { header: 'Status', className: 'w-28 text-center' },
    { header: 'Actions', className: 'w-24 text-right' },
  ];

  return (
    <div className="space-y-4">
      <SortableTable
        items={items}
        columns={columns}
        onReorder={handleReorder}
        emptyMessage="No gallery photos uploaded yet. Click 'Add Photo' above to create one."
        renderRow={(item) => (
          <>
            {/* Thumbnail */}
            <td className="px-4 py-3">
              <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-[#1D1D1F] border border-[#E5E5EA] shrink-0">
                <ImageWithFallback
                  src={item.image_path}
                  alt={item.alt_text || item.title}
                  fill
                  className="object-cover"
                  fallbackCategory={item.category}
                />
              </div>
            </td>

            {/* Title & Category */}
            <td className="px-4 py-3">
              <div className="space-y-1">
                <span className="font-semibold text-[#1D1D1F] text-sm block">
                  {item.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F5F5F7] text-[#515154] border border-[#E5E5EA]">
                    {CATEGORY_LABELS[item.category] || item.category}
                  </span>
                  {item.alt_text && (
                    <span className="text-[11px] text-[#86868B] truncate max-w-xs hidden sm:inline">
                      Alt: {item.alt_text}
                    </span>
                  )}
                </div>
              </div>
            </td>

            {/* Status Toggle */}
            <td className="px-4 py-3 text-center">
              <DraftPublishToggle
                id={item.id}
                initialStatus={item.published}
                onToggle={toggleGalleryPublish}
              />
            </td>

            {/* Actions */}
            <td className="px-4 py-3 text-right">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/admin/gallery/${item.id}/edit`}
                  className="p-1.5 rounded-lg text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors inline-flex items-center justify-center"
                  title="Edit item"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <ConfirmDeleteDialog
                  id={item.id}
                  itemTitle={item.title}
                  imagePath={item.image_path}
                  onDelete={deleteGalleryItem}
                  onSuccess={() => handleDeleteSuccess(item.id)}
                />
              </div>
            </td>
          </>
        )}
      />
    </div>
  );
}
