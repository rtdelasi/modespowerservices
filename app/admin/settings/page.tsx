import React from 'react';
import { Metadata } from 'next';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MaintenanceModeCard } from '@/components/admin/MaintenanceModeCard';
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm';
import { getSiteSettings } from '@/app/actions/settings';

export const metadata: Metadata = {
  title: 'Site Controls & Settings — Modes CMS',
};

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Site Controls & Settings"
        description="Manage website maintenance mode, site-wide banners, homepage hero background, and global CTA imagery."
        backHref="/admin"
        backLabel="Dashboard"
      />

      {/* 1. Maintenance Mode Master Switch */}
      <MaintenanceModeCard initialStatus={settings.maintenance_mode} />

      {/* 2. Site Photography & Banners Form */}
      <SiteSettingsForm initialSettings={settings} />
    </div>
  );
}
