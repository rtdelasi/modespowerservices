'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableRow } from './SortableRow';

interface Column {
  header: string;
  className?: string;
}

interface Identifiable {
  id: string;
}

interface SortableTableProps<T extends Identifiable> {
  items: T[];
  columns: Column[];
  renderRow: (item: T, index: number) => React.ReactNode;
  onReorder: (newItems: T[]) => void | Promise<void>;
  emptyMessage?: string;
  className?: string;
}

export function SortableTable<T extends Identifiable>({
  items: initialItems,
  columns,
  renderRow,
  onReorder,
  emptyMessage = 'No items found.',
  className = '',
}: SortableTableProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag begins
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(items, oldIndex, newIndex);
        setItems(reordered);
        await onReorder(reordered);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E5E5EA] bg-white p-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <p className="text-[#86868B] text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-2xl border border-[#E5E5EA] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E5E5EA] bg-[#FAFAFA] text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
            <tr>
              <th className="w-10 px-3 py-3.5 text-center">
                <span className="sr-only">Order</span>
              </th>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-4 py-3.5 ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F2]">
            <SortableContext
              items={items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item, index) => (
                <SortableRow key={item.id} id={item.id}>
                  {renderRow(item, index)}
                </SortableRow>
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
}
