'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableRowProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SortableRow({ id, children, className = '' }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    opacity: isDragging ? 0.6 : 1,
    position: 'relative',
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`border-b border-[#F0F0F2] transition-colors hover:bg-[#F9F9FA] ${
        isDragging ? 'bg-[#F5F5F7] shadow-lg' : ''
      } ${className}`}
    >
      <td className="w-10 px-3 py-3.5 text-center">
        <button
          type="button"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1.5 text-[#86868B]/60 hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg transition-colors inline-flex items-center justify-center focus:outline-none"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </td>
      {children}
    </tr>
  );
}
