import React from 'react';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { AdminNav } from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Modes CMS — Admin Console',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  let userEmail: string | undefined = undefined;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) {
      userEmail = user.email;
    }
  } catch {
    // fallback
  }

  const headerList = headers();
  const currentPath = headerList.get('x-pathname') || '';
  const isLoginPage = currentPath.includes('/admin/login');

  // Display the admin navigation sidebar on all admin pages except the login screen
  const showNav = !isLoginPage;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col md:flex-row font-sans selection:bg-[#C8102E] selection:text-white antialiased">
      {showNav && <AdminNav userEmail={userEmail || 'admin@modespowerservices.com'} />}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 lg:px-10 py-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
