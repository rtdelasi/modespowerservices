'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, CheckCircle2, AlertCircle, LayoutTemplate, Image as ImageIcon, Sparkles, Share2 } from 'lucide-react';
import { SiteSettings } from '@/types';
import { updateSiteSettings } from '@/app/actions/settings';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface SiteSettingsFormProps {
  initialSettings: SiteSettings;
}

export function SiteSettingsForm({ initialSettings }: SiteSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [heroImage, setHeroImage] = useState<string>(initialSettings.hero_image_url || '');
  const [aboutImage, setAboutImage] = useState<string>(initialSettings.about_image_url || '');
  const [ctaImage, setCtaImage] = useState<string>(initialSettings.cta_image_url || '');
  const [ogImage, setOgImage] = useState<string>(initialSettings.og_image_url || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('hero_image_url', heroImage);
    formData.append('about_image_url', aboutImage);
    formData.append('cta_image_url', ctaImage);
    formData.append('og_image_url', ogImage);

    startTransition(async () => {
      const res = await updateSiteSettings(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 4000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alerts */}
      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 flex items-center gap-3 text-red-600 text-xs font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 text-emerald-700 text-xs font-medium animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <p>Site banners successfully saved and published across public pages.</p>
        </div>
      )}

      {/* Hero Section Banner */}
      <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E5EA]">
          <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] text-[#1D1D1F] flex items-center justify-center shadow-xs">
            <LayoutTemplate className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-base text-[#1D1D1F]">
              Home Page Hero Banner
            </h2>
            <p className="text-xs text-[#86868B]">
              High-resolution full-bleed background image for the main hero card on the homepage.
            </p>
          </div>
        </div>

        <ImageUploadField
          label="Hero Background Image"
          value={heroImage}
          onChange={setHeroImage}
          bucket="settings"
        />
        <p className="text-[11px] text-[#86868B]">
          Recommended: 2000x1200px or larger. If left empty, the site renders the dark engineering circuit background.
        </p>
      </div>

      {/* About Section Feature Image */}
      <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E5EA]">
          <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] text-[#1D1D1F] flex items-center justify-center shadow-xs">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-base text-[#1D1D1F]">
              About Section / Company Story Photo
            </h2>
            <p className="text-xs text-[#86868B]">
              Displayed on the Homepage About Preview card and the About Us company story section.
            </p>
          </div>
        </div>

        <ImageUploadField
          label="About Section Image"
          value={aboutImage}
          onChange={setAboutImage}
          bucket="settings"
        />
        <p className="text-[11px] text-[#86868B]">
          Recommended: 1200x900px photo of switchgear, substations, or field engineers.
        </p>
      </div>

      {/* CTA Banner Background */}
      <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E5EA]">
          <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] text-[#1D1D1F] flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-[#C8102E]" />
          </div>
          <div>
            <h2 className="font-semibold text-base text-[#1D1D1F]">
              CTA Banner Background Image
            </h2>
            <p className="text-xs text-[#86868B]">
              Background photo across bottom full-bleed call-to-action sections across the site.
            </p>
          </div>
        </div>

        <ImageUploadField
          label="CTA Background Image"
          value={ctaImage}
          onChange={setCtaImage}
          bucket="settings"
        />
        <p className="text-[11px] text-[#86868B]">
          Recommended: 1600x900px dark industrial or power grid photo with subtle gradient.
        </p>
      </div>

      {/* Social Media Share / OpenGraph Image */}
      <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E5EA]">
          <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] text-[#1D1D1F] flex items-center justify-center shadow-xs">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-base text-[#1D1D1F]">
              Social Share & OpenGraph Image
            </h2>
            <p className="text-xs text-[#86868B]">
              Default preview image when links to the website are shared on LinkedIn, WhatsApp, and social media.
            </p>
          </div>
        </div>

        <ImageUploadField
          label="Social Share Image (OG)"
          value={ogImage}
          onChange={setOgImage}
          bucket="settings"
        />
        <p className="text-[11px] text-[#86868B]">
          Recommended: 1200x630px. If empty, the official company logo is used automatically.
        </p>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 z-30 bg-white/95 backdrop-blur-md border border-[#E5E5EA] rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4">
        <div className="text-xs text-[#86868B]">
          Updates save immediately to CDN and revalidate public routes.
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#C8102E] hover:bg-[#A60D25] text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Banners...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All Banners</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
