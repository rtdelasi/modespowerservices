'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { DbGalleryItem, GalleryItemInput } from '@/lib/validations/gallery';
import { createGalleryItem, updateGalleryItem } from '@/app/actions/gallery';

interface GalleryFormProps {
  initialData?: DbGalleryItem | null;
}

const CATEGORIES = [
  { value: 'installations', label: 'Installations' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'audits', label: 'Audits & Compliance' },
  { value: 'solar_custom', label: 'Solar & Custom' },
] as const;

export function GalleryForm({ initialData }: GalleryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]['value']>(
    (initialData?.category as any) || 'installations'
  );
  const [imagePath, setImagePath] = useState(initialData?.image_path || '');
  const [altText, setAltText] = useState(initialData?.alt_text || '');
  const [published, setPublished] = useState(initialData?.published ?? true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const payload: GalleryItemInput = {
      title,
      category,
      image_path: imagePath || null,
      alt_text: altText || title,
      sort_order: initialData?.sort_order ?? 0,
      published,
    };

    startTransition(async () => {
      let res;
      if (initialData?.id) {
        res = await updateGalleryItem(initialData.id, payload);
      } else {
        res = await createGalleryItem(payload);
      }

      if (!res.success) {
        setError(res.error || 'An error occurred while saving.');
      } else {
        router.push('/admin/gallery');
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white border border-[#E5E5EA] p-6 sm:p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Image Upload */}
      <ImageUploadField
        label="Gallery Image"
        value={imagePath}
        onChange={setImagePath}
        bucket="gallery"
        required
      />

      {/* Title */}
      <div className="space-y-1.5">
        <label
          htmlFor="title"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
        >
          Photo Title <span className="text-[#C8102E]">*</span>
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 11kV Substation Switchgear Commissioning"
          className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label
          htmlFor="category"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
        >
          Category <span className="text-[#C8102E]">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Alt Text */}
      <div className="space-y-1.5">
        <label
          htmlFor="altText"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
        >
          Accessibility Alt Text
        </label>
        <input
          id="altText"
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Descriptive text for accessibility and search indexing"
          className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
        />
      </div>

      {/* Published Toggle */}
      <div className="pt-3 border-t border-[#E5E5EA] flex items-center justify-between">
        <div>
          <label
            htmlFor="published"
            className="text-sm font-semibold text-[#1D1D1F] block cursor-pointer"
          >
            Live Visibility Status
          </label>
          <p className="text-xs text-[#86868B]">
            When enabled, this photo is immediately visible on the public Gallery page.
          </p>
        </div>
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-5 h-5 rounded border-[#D1D1D6] text-[#C8102E] focus:ring-[#C8102E]/30 cursor-pointer accent-[#C8102E]"
        />
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-[#E5E5EA] flex items-center justify-between gap-4">
        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#515154] hover:text-[#1D1D1F] bg-white border border-[#E5E5EA] hover:bg-[#F5F5F7] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </Link>

        <button
          type="submit"
          disabled={isPending || !title}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>{initialData ? 'Update Gallery Item' : 'Create Gallery Item'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
