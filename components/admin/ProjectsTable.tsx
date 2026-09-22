'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2 } from 'lucide-react';
import { DbProject } from '@/lib/validations/project';
import { SortableTable } from '@/components/admin/SortableTable';
import { DraftPublishToggle } from '@/components/admin/DraftPublishToggle';
import { ConfirmDeleteDialog } from '@/components/admin/ConfirmDeleteDialog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import {
  deleteProject,
  toggleProjectPublish,
  reorderProjects,
} from '@/app/actions/projects';

export function ProjectsTable({ initialItems }: { initialItems: DbProject[] }) {
  const [items, setItems] = useState<DbProject[]>(initialItems);

  const handleReorder = async (newItems: DbProject[]) => {
    setItems(newItems);
    const payload = newItems.map((item, index) => ({
      id: item.id,
      sort_order: index,
    }));
    await reorderProjects(payload);
  };

  const handleDeleteSuccess = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const columns = [
    { header: 'Cover', className: 'w-24' },
    { header: 'Project & Client' },
    { header: 'Category', className: 'w-36' },
    { header: 'Status', className: 'w-28 text-center' },
    { header: 'Actions', className: 'w-24 text-right' },
  ];

  return (
    <div className="space-y-4">
      <SortableTable
        items={items}
        columns={columns}
        onReorder={handleReorder}
        emptyMessage="No project case studies created yet. Click 'Add Project' above to add one."
        renderRow={(item) => (
          <>
            {/* Thumbnail */}
            <td className="px-4 py-3">
              <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-[#1D1D1F] border border-[#E5E5EA] shrink-0">
                <ImageWithFallback
                  src={item.cover_image_path}
                  alt={item.title}
                  fill
                  className="object-cover"
                  fallbackCategory={item.category}
                />
              </div>
            </td>

            {/* Title & Client */}
            <td className="px-4 py-3">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#1D1D1F] text-sm block">
                  {item.title}
                </span>
                <span className="text-xs text-[#86868B] block">
                  Client: <strong className="text-[#1D1D1F]/80 font-medium">{item.client_name}</strong>
                </span>
              </div>
            </td>

            {/* Category */}
            <td className="px-4 py-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F5F5F7] text-[#515154] border border-[#E5E5EA]">
                {item.category}
              </span>
            </td>

            {/* Status Toggle */}
            <td className="px-4 py-3 text-center">
              <DraftPublishToggle
                id={item.id}
                initialStatus={item.published}
                onToggle={toggleProjectPublish}
              />
            </td>

            {/* Actions */}
            <td className="px-4 py-3 text-right">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/admin/projects/${item.id}/edit`}
                  className="p-1.5 rounded-lg text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors inline-flex items-center justify-center"
                  title="Edit project"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <ConfirmDeleteDialog
                  id={item.id}
                  itemTitle={item.title}
                  imagePath={item.cover_image_path}
                  onDelete={deleteProject}
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
