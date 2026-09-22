'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, ArrowLeft } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  backHref?: string;
  backLabel?: string;
}

export function AdminHeader({
  title,
  description,
  actionLabel,
  actionHref,
  backHref,
  backLabel = 'Back',
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5E5EA]">
      <div className="space-y-1 max-w-2xl">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86868B] hover:text-[#1D1D1F] mb-1.5 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>{backLabel}</span>
          </Link>
        )}
        <h1 className="text-2xl sm:text-[28px] font-semibold text-[#1D1D1F] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[#86868B] font-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{actionLabel}</span>
        </Link>
      )}
    </div>
  );
}
