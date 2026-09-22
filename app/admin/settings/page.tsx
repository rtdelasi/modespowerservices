import React from 'react';
import { Metadata } from 'next';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm';
import { getSiteSettings } from '@/app/actions/settings';

export const metadata: Metadata = {
  title: 'Site Banners & Settings — Modes CMS',
};

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Site Banners & Settings"
        description="Manage site-wide media, homepage hero background, about section photo, and global CTA imagery."
        backHref="/admin"
        backLabel="Dashboard"
      />

      <SiteSettingsForm initialSettings={settings} />
    </div>
  );
}
