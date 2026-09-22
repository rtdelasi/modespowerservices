'use client';

import React, { useState, useTransition } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraftPublishToggleProps {
  id: string;
  initialStatus: boolean;
  onToggle: (id: string, currentStatus: boolean) => Promise<{ success: boolean; error?: string; published?: boolean }>;
}

export function DraftPublishToggle({
  id,
  initialStatus,
  onToggle,
}: DraftPublishToggleProps) {
  const [published, setPublished] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      // Optimistic update
      const newStatus = !published;
      setPublished(newStatus);

      const res = await onToggle(id, published);
      if (!res.success) {
        // Revert on error
        setPublished(published);
        alert(res.error || 'Failed to update publication status');
      } else if (res.published !== undefined) {
        setPublished(res.published);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all select-none cursor-pointer disabled:opacity-60',
        published
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/80'
          : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100/80'
      )}
      title={published ? 'Click to unpublish (move to draft)' : 'Click to publish to live website'}
    >
      {isPending ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : published ? (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
      )}
      <span>{published ? 'Live' : 'Draft'}</span>
    </button>
  );
}
