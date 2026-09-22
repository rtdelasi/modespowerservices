import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import {
  Images,
  Briefcase,
  Users,
  Plus,
  ArrowRight,
  ExternalLink,
  LayoutTemplate,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/gallery';
import { PROJECTS } from '@/data/projects';
import { TEAM_MEMBERS } from '@/data/team';

export default async function AdminDashboardPage() {
  const supabase = createClient();

  let galleryCount = GALLERY_ITEMS.length;
  let galleryPublished = GALLERY_ITEMS.length;
  let galleryDrafts = 0;

  let projectsCount = PROJECTS.length;
  let projectsPublished = PROJECTS.length;
  let projectsDrafts = 0;

  let teamCount = TEAM_MEMBERS.length;
  let teamPublished = TEAM_MEMBERS.length;
  let teamDrafts = 0;

  try {
    const [galleryRes, projectsRes, teamRes] = await Promise.all([
      supabase.from('gallery_items').select('id, published'),
      supabase.from('projects').select('id, published'),
      supabase.from('team_members').select('id, published'),
    ]);

    if (galleryRes.data && !galleryRes.error) {
      galleryCount = galleryRes.data.length;
      galleryPublished = galleryRes.data.filter((i) => i.published).length;
      galleryDrafts = galleryCount - galleryPublished;
    }

    if (projectsRes.data && !projectsRes.error) {
      projectsCount = projectsRes.data.length;
      projectsPublished = projectsRes.data.filter((i) => i.published).length;
      projectsDrafts = projectsCount - projectsPublished;
    }

    if (teamRes.data && !teamRes.error) {
      teamCount = teamRes.data.length;
      teamPublished = teamRes.data.filter((i) => i.published).length;
      teamDrafts = teamCount - teamPublished;
    }
  } catch (err) {
    // Fallback to static counts
  }

  const contentSections = [
    {
      title: 'Gallery Showcase',
      description: 'Completed field installations, power plants, and industrial wiring photos.',
      href: '/admin/gallery',
      newHref: '/admin/gallery/new',
      icon: Images,
      total: galleryCount,
      published: galleryPublished,
      drafts: galleryDrafts,
      publicUrl: '/gallery',
    },
    {
      title: 'Projects & Case Studies',
      description: 'Engineering project portfolios with client details, scopes, and outcomes.',
      href: '/admin/projects',
      newHref: '/admin/projects/new',
      icon: Briefcase,
      total: projectsCount,
      published: projectsPublished,
      drafts: projectsDrafts,
      publicUrl: '/projects',
    },
    {
      title: 'Team & Leadership',
      description: 'Engineers, project directors, and field leadership profiles shown on About page.',
      href: '/admin/team',
      newHref: '/admin/team/new',
      icon: Users,
      total: teamCount,
      published: teamPublished,
      drafts: teamDrafts,
      publicUrl: '/about',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Apple-Style Clean Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5EA]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-[28px] font-semibold text-[#1D1D1F] tracking-tight">
              Welcome to Modes CMS
            </h1>
          </div>
          <p className="text-sm text-[#86868B] font-normal leading-relaxed max-w-2xl">
            Manage your public website content effortlessly. Add recent electrical installations, publish new engineering case studies, or update site banners.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E5E5EA] hover:bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors self-start sm:self-auto shrink-0"
        >
          <span>View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#86868B]" />
        </Link>
      </div>

      {/* 2. 3-Column Content Stats Card Grid */}
      <div>
        <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-4 px-1">
          Core Content Managers
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top: Icon + Live Link */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center text-[#1D1D1F]">
                      <Icon className="w-5 h-5 text-[#1D1D1F]" />
                    </div>

                    <Link
                      href={sec.publicUrl}
                      target="_blank"
                      className="text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] flex items-center gap-1 transition-colors"
                      title="View public page"
                    >
                      <span>Public view</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Title & Desc */}
                  <h2 className="text-base font-semibold text-[#1D1D1F]">
                    {sec.title}
                  </h2>
                  <p className="mt-1 text-xs text-[#86868B] leading-relaxed min-h-[36px]">
                    {sec.description}
                  </p>

                  {/* Clean Stat Metric Box */}
                  <div className="mt-5 p-3.5 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA]/60 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="block text-2xl font-bold text-[#1D1D1F] tracking-tight">
                        {sec.total}
                      </span>
                      <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">
                        Total
                      </span>
                    </div>

                    <div className="border-x border-[#E5E5EA]">
                      <span className="block text-2xl font-bold text-emerald-600 tracking-tight">
                        {sec.published}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 inline" /> Live
                      </span>
                    </div>

                    <div>
                      <span className="block text-2xl font-bold text-amber-600 tracking-tight">
                        {sec.drafts}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider flex items-center justify-center gap-1">
                        <Clock className="w-2.5 h-2.5 inline" /> Draft
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-[#E5E5EA] flex items-center gap-2.5">
                  <Link
                    href={sec.href}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-[#E5E5EA] text-[#1D1D1F] hover:bg-[#F5F5F7] text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Manage</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#86868B]" />
                  </Link>

                  <Link
                    href={sec.newHref}
                    className="inline-flex items-center justify-center gap-1 py-2 px-3.5 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-semibold shadow-xs transition-colors"
                    title={`Add new ${sec.title}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Site Banners & Settings Card */}
      <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#C8102E] shrink-0 mt-0.5">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold text-[#1D1D1F]">
              Site-Wide Banners & OpenGraph Images
            </h3>
            <p className="text-xs text-[#86868B] max-w-2xl leading-relaxed">
              Upload custom photography for the Home Hero background, About story section, global CTA banners, and social share previews.
            </p>
          </div>
        </div>

        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1D1D1F] hover:bg-[#333336] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <span>Configure Banners</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4. Publishing Guide & Workflow Tips */}
      <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#86868B]">
          <HelpCircle className="w-4 h-4 text-[#86868B]" />
          <span>Quick Publishing Guide</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA]/60 space-y-1">
            <span className="text-xs font-semibold text-[#1D1D1F] block">1. Drag to Reorder</span>
            <p className="text-[12px] text-[#86868B] leading-relaxed">
              Grab the handle on the left of any table row to immediately reorder items on the live public site.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA]/60 space-y-1">
            <span className="text-xs font-semibold text-[#1D1D1F] block">2. Drafts & Live Status</span>
            <p className="text-[12px] text-[#86868B] leading-relaxed">
              Toggle items between Live and Draft mode at any time without deleting existing descriptions or photos.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA]/60 space-y-1">
            <span className="text-xs font-semibold text-[#1D1D1F] block">3. Cloud Media Storage</span>
            <p className="text-[12px] text-[#86868B] leading-relaxed">
              Uploaded project and gallery photos are served via Supabase CDN with automated fallback circuit protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
