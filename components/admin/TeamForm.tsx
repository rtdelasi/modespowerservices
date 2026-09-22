'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { DbTeamMember, TeamMemberInput } from '@/lib/validations/team';
import { createTeamMember, updateTeamMember } from '@/app/actions/team';

interface TeamFormProps {
  initialData?: DbTeamMember | null;
}

export function TeamForm({ initialData }: TeamFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [photoPath, setPhotoPath] = useState(initialData?.photo_path || '');
  const [linkedinUrl, setLinkedinUrl] = useState(initialData?.linkedin_url || '');
  const [published, setPublished] = useState(initialData?.published ?? true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const payload: TeamMemberInput = {
      name,
      role,
      tagline: tagline || undefined,
      bio_bullets: [],
      photo_path: photoPath || null,
      linkedin_url: linkedinUrl ? linkedinUrl : undefined,
      sort_order: initialData?.sort_order ?? 0,
      published,
    };

    startTransition(async () => {
      let res;
      if (initialData?.id) {
        res = await updateTeamMember(initialData.id, payload);
      } else {
        res = await createTeamMember(payload);
      }

      if (!res.success) {
        setError(res.error || 'An error occurred while saving.');
      } else {
        router.push('/admin/team');
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

      {/* Profile Photo */}
      <ImageUploadField
        label="Profile Photo"
        value={photoPath}
        onChange={setPhotoPath}
        bucket="team"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
          >
            Full Name & Credentials <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ing. Kwame Mensah, PE"
            className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
          />
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label
            htmlFor="role"
            className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
          >
            Role / Job Title <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="role"
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Lead Substation Engineer"
            className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
          />
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-1.5">
        <label
          htmlFor="tagline"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
        >
          Tagline / Specialty Focus
        </label>
        <input
          id="tagline"
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="e.g. 15+ years in high-voltage substation commissioning"
          className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
        />
      </div>

      {/* LinkedIn URL */}
      <div className="space-y-1.5">
        <label
          htmlFor="linkedinUrl"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
        >
          LinkedIn Profile URL
        </label>
        <input
          id="linkedinUrl"
          type="url"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder="https://linkedin.com/in/username"
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
            When enabled, this member profile is displayed on the public About page.
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
          href="/admin/team"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#515154] hover:text-[#1D1D1F] bg-white border border-[#E5E5EA] hover:bg-[#F5F5F7] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </Link>

        <button
          type="submit"
          disabled={isPending || !name || !role}
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
              <span>{initialData ? 'Update Team Member' : 'Create Team Member'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
