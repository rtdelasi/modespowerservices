'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { DbProject, ProjectInput, projectCategoryEnum } from '@/lib/validations/project';
import { createProject, updateProject } from '@/app/actions/projects';

interface ProjectFormProps {
  initialData?: DbProject | null;
}

const CATEGORIES = [
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Solar & Hybrid', label: 'Solar & Hybrid' },
] as const;

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title || '');
  const [clientName, setClientName] = useState(initialData?.client_name || '');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]['value']>(
    (initialData?.category as any) || 'Industrial'
  );
  const [description, setDescription] = useState(initialData?.description || '');
  const [outcome, setOutcome] = useState(initialData?.outcome || '');
  const [coverImagePath, setCoverImagePath] = useState(initialData?.cover_image_path || '');
  const [published, setPublished] = useState(initialData?.published ?? true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const payload: ProjectInput = {
      title,
      client_name: clientName,
      category,
      description,
      outcome: outcome || undefined,
      cover_image_path: coverImagePath || null,
      sort_order: initialData?.sort_order ?? 0,
      published,
    };

    startTransition(async () => {
      let res;
      if (initialData?.id) {
        res = await updateProject(initialData.id, payload);
      } else {
        res = await createProject(payload);
      }

      if (!res.success) {
        setError(res.error || 'An error occurred while saving.');
      } else {
        router.push('/admin/projects');
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white border border-[#E5E5EA] p-6 sm:p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Cover Image */}
      <ImageUploadField
        label="Project Cover Image"
        value={coverImagePath}
        onChange={setCoverImagePath}
        bucket="projects"
      />

      {/* Project Title */}
      <div className="space-y-1.5">
        <label
          htmlFor="title"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
        >
          Project Title <span className="text-[#C8102E]">*</span>
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 33kV Substation Retrofit & Automation"
          className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Client Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="clientName"
            className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
          >
            Client / Facility Name <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="clientName"
            type="text"
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Gold Fields Ghana / Ridge Hospital"
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
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label
          htmlFor="description"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
        >
          Project Scope & Description <span className="text-[#C8102E]">*</span>
        </label>
        <textarea
          id="description"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe engineering scope, challenges resolved, equipment installed, and technical execution..."
          className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all resize-y"
        />
      </div>

      {/* Outcome / Result */}
      <div className="space-y-1.5">
        <label
          htmlFor="outcome"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
        >
          Measured Outcome / Impact
        </label>
        <textarea
          id="outcome"
          rows={2}
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          placeholder="e.g. 99.98% operational uptime, 35% reduction in grid power losses."
          className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all resize-y"
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
            When enabled, this project case study is visible on the public Projects portfolio.
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
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#515154] hover:text-[#1D1D1F] bg-white border border-[#E5E5EA] hover:bg-[#F5F5F7] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </Link>

        <button
          type="submit"
          disabled={isPending || !title || !clientName || !description}
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
              <span>{initialData ? 'Update Project' : 'Create Project'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
