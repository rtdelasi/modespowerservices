'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Images,
  Briefcase,
  Users,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  LayoutTemplate,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Gallery', href: '/admin/gallery', icon: Images },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Banners & Settings', href: '/admin/settings', icon: LayoutTemplate },
];

export function AdminNav({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderNavLinks = (onItemClick?: () => void) => (
    <nav className="space-y-1">
      {ADMIN_LINKS.map((link) => {
        const Icon = link.icon;
        const isActive =
          link.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className={cn(
              'group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150',
              isActive
                ? 'bg-red-50/80 text-[#1D1D1F] font-semibold border-l-[3px] border-[#C8102E] pl-3 shadow-[0_1px_2px_rgba(200,16,46,0.06)]'
                : 'text-[#515154] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
            )}
          >
            <div className="flex items-center gap-2.5">
              <Icon
                className={cn(
                  'w-4 h-4 transition-colors',
                  isActive ? 'text-[#C8102E]' : 'text-[#86868B] group-hover:text-[#1D1D1F]'
                )}
              />
              <span>{link.label}</span>
            </div>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 1. Mobile Top Header Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5EA] px-4 py-3 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center p-0.5">
            <Logo variant="default" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-[#1D1D1F]">
              MODES CMS
            </span>
            <span className="text-[9px] font-semibold text-[#86868B] uppercase tracking-wider">
              Console
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-[#515154] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex">
          <div className="w-72 max-w-[80vw] bg-white h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5EA]">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center p-0.5">
                    <Logo variant="default" size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-tight text-[#1D1D1F]">
                      MODES CMS
                    </span>
                    <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">
                      Admin Studio
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider px-2">
                Navigation
              </div>
              {renderNavLinks(() => setMobileMenuOpen(false))}
            </div>

            <div className="pt-4 border-t border-[#E5E5EA] space-y-3">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#515154] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#86868B]" />
                  <span>View Live Site</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B]" />
              </Link>

              {userEmail && (
                <div className="px-3 py-1.5 text-[11px] text-[#86868B] truncate font-mono bg-[#F5F5F7] rounded-lg">
                  {userEmail}
                </div>
              )}

              <form action={logout}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </form>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* 2. Desktop Persistent Left Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 shrink-0 bg-white border-r border-[#E5E5EA] p-5 sticky top-0 h-screen overflow-y-auto">
        {/* Top: Branding & Nav Links */}
        <div className="space-y-6">
          {/* Brand Header */}
          <Link href="/admin" className="flex items-center gap-3 px-1.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)] group-hover:border-[#C8102E]/30 transition-colors">
              <Logo variant="default" size={30} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[14px] tracking-tight text-[#1D1D1F] leading-tight">
                MODES CMS
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#86868B] uppercase">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Navigation Section */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider px-3.5 mb-2">
              Content Sections
            </div>
            {renderNavLinks()}
          </div>
        </div>

        {/* Bottom: Account Info & Sign Out */}
        <div className="pt-4 border-t border-[#E5E5EA] space-y-2.5">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#515154] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors group"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#1D1D1F]" />
              <span>Public Live Site</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#86868B]" />
          </Link>

          {userEmail && (
            <div className="px-3 py-2 rounded-xl bg-[#F5F5F7] text-[11px] text-[#86868B] truncate font-mono border border-[#E5E5EA]/60">
              <span className="text-[10px] uppercase block text-[#86868B] font-semibold mb-0.5">Signed in as</span>
              <span className="text-[#1D1D1F] truncate block">{userEmail}</span>
            </div>
          )}

          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#515154] hover:text-red-600 hover:bg-red-50/80 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
