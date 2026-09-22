'use client';

import React, { useState, useTransition } from 'react';
import { Trash2, AlertTriangle, Loader2, X } from 'lucide-react';

interface ConfirmDeleteDialogProps {
  id: string;
  itemTitle: string;
  imagePath?: string | null;
  onDelete: (id: string, imagePath?: string | null) => Promise<{ success: boolean; error?: string }>;
  onSuccess?: () => void;
}

export function ConfirmDeleteDialog({
  id,
  itemTitle,
  imagePath,
  onDelete,
  onSuccess,
}: ConfirmDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await onDelete(id, imagePath);
      if (res.success) {
        setIsOpen(false);
        onSuccess?.();
      } else {
        alert(res.error || 'Failed to delete item');
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-1.5 rounded-lg text-[#86868B] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer inline-flex items-center justify-center"
        title="Delete item"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#E5E5EA] space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#F5F5F7] hover:bg-[#E5E5EA] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-base text-[#1D1D1F]">
                Delete Item Permanently?
              </h3>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Are you sure you want to delete <strong className="text-[#1D1D1F] font-semibold">&ldquo;{itemTitle}&rdquo;</strong>? This action cannot be undone and will also remove associated files from media storage.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#E5E5EA]">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1D1D1F] bg-white border border-[#E5E5EA] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
