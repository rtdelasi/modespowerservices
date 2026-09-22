'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2, Linkedin } from 'lucide-react';
import { DbTeamMember } from '@/lib/validations/team';
import { SortableTable } from '@/components/admin/SortableTable';
import { DraftPublishToggle } from '@/components/admin/DraftPublishToggle';
import { ConfirmDeleteDialog } from '@/components/admin/ConfirmDeleteDialog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import {
  deleteTeamMember,
  toggleTeamPublish,
  reorderTeamMembers,
} from '@/app/actions/team';

export function TeamTable({ initialItems }: { initialItems: DbTeamMember[] }) {
  const [items, setItems] = useState<DbTeamMember[]>(initialItems);

  const handleReorder = async (newItems: DbTeamMember[]) => {
    setItems(newItems);
    const payload = newItems.map((item, index) => ({
      id: item.id,
      sort_order: index,
    }));
    await reorderTeamMembers(payload);
  };

  const handleDeleteSuccess = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const columns = [
    { header: 'Photo', className: 'w-20' },
    { header: 'Name & Role' },
    { header: 'LinkedIn', className: 'w-24 text-center' },
    { header: 'Status', className: 'w-28 text-center' },
    { header: 'Actions', className: 'w-24 text-right' },
  ];

  return (
    <div className="space-y-4">
      <SortableTable
        items={items}
        columns={columns}
        onReorder={handleReorder}
        emptyMessage="No team members added yet. Click 'Add Member' above to create a profile."
        renderRow={(item) => (
          <>
            {/* Photo */}
            <td className="px-4 py-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#1D1D1F] border border-[#E5E5EA] shrink-0">
                <ImageWithFallback
                  src={item.photo_path}
                  alt={item.name}
                  fill
                  className="object-cover"
                  fallbackCategory={item.name}
                />
              </div>
            </td>

            {/* Name & Role */}
            <td className="px-4 py-3">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#1D1D1F] text-sm block">
                  {item.name}
                </span>
                <span className="text-xs text-[#86868B] block font-medium">
                  {item.role}
                </span>
                {item.tagline && (
                  <span className="text-[11px] text-[#86868B]/80 italic block truncate max-w-sm">
                    &ldquo;{item.tagline}&rdquo;
                  </span>
                )}
              </div>
            </td>

            {/* LinkedIn */}
            <td className="px-4 py-3 text-center">
              {item.linkedin_url ? (
                <a
                  href={item.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center transition-colors"
                  title="View LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-[#86868B]/40 text-xs">—</span>
              )}
            </td>

            {/* Status Toggle */}
            <td className="px-4 py-3 text-center">
              <DraftPublishToggle
                id={item.id}
                initialStatus={item.published}
                onToggle={toggleTeamPublish}
              />
            </td>

            {/* Actions */}
            <td className="px-4 py-3 text-right">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/admin/team/${item.id}/edit`}
                  className="p-1.5 rounded-lg text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors inline-flex items-center justify-center"
                  title="Edit member"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <ConfirmDeleteDialog
                  id={item.id}
                  itemTitle={item.name}
                  imagePath={item.photo_path}
                  onDelete={deleteTeamMember}
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
