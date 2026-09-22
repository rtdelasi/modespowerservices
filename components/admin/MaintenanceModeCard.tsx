'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  ShieldCheck,
  Power,
  Loader2,
  AlertTriangle,
  Key,
  Copy,
  Check,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { toggleMaintenanceMode } from '@/app/actions/settings';

interface MaintenanceModeCardProps {
  initialStatus: boolean;
}

export function MaintenanceModeCard({ initialStatus }: MaintenanceModeCardProps) {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Derive origin for bypass URL safely in browser
  const [origin, setOrigin] = useState('');
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const bypassUrl = `${origin}/?preview_token=modes_preview_secure_token_2026`;

  const handleToggleClick = () => {
    setError(null);
    if (!isEnabled) {
      // Prompt confirmation before turning ON
      setShowConfirmModal(true);
    } else {
      // Directly turn OFF
      executeToggle(false);
    }
  };

  const executeToggle = (targetState: boolean) => {
    setShowConfirmModal(false);
    startTransition(async () => {
      const res = await toggleMaintenanceMode(targetState);
      if (res?.error) {
        setError(res.error);
      } else {
        setIsEnabled(targetState);
        router.refresh();
      }
    });
  };

  const handleCopyBypass = async () => {
    try {
      await navigator.clipboard.writeText(bypassUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      <div
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${
          isEnabled
            ? 'bg-amber-500/[0.04] border-amber-300/80 shadow-amber-500/5'
            : 'bg-white border-[#E5E5EA]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Left: Icon, Title & Explanation */}
          <div className="flex items-start gap-4">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                isEnabled
                  ? 'bg-amber-500 text-white'
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              }`}
            >
              {isEnabled ? (
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-semibold text-base text-[#1D1D1F]">
                  Website Maintenance Mode
                </h2>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    isEnabled
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isEnabled ? 'bg-amber-600 animate-ping' : 'bg-emerald-600'
                    }`}
                  />
                  <span>{isEnabled ? 'Active (Site Offline to Public)' : 'Inactive (Live & Public)'}</span>
                </span>
              </div>

              <p className="text-xs text-[#86868B] leading-relaxed max-w-xl">
                {isEnabled
                  ? 'All public visitors are currently shown the Maintenance Notice. Logged-in administrators and visitors with the preview token can browse the live site normally.'
                  : 'The public website is fully accessible to all visitors. Turn this on when executing database migrations, infrastructure reconfigurations, or major site updates.'}
              </p>
            </div>
          </div>

          {/* Right: Master Toggle Switch */}
          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={handleToggleClick}
              disabled={isPending}
              aria-label="Toggle Maintenance Mode"
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:ring-offset-2 disabled:opacity-50 ${
                isEnabled ? 'bg-[#C8102E]' : 'bg-[#E5E5EA]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                  isEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                {isPending ? (
                  <Loader2 className="w-3.5 h-3.5 text-[#86868B] animate-spin" />
                ) : (
                  <Power
                    className={`w-3.5 h-3.5 ${
                      isEnabled ? 'text-[#C8102E]' : 'text-[#86868B]'
                    }`}
                  />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Error message if any */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Bypass / Preview Token Section (shown when active or expandable) */}
        <div className="mt-5 pt-4 border-t border-[#E5E5EA]/70 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-8 flex items-start gap-2.5">
            <Key className="w-4 h-4 text-[#86868B] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-[#1D1D1F] block">
                Emergency Preview Bypass Link
              </span>
              <p className="text-[11px] text-[#86868B] leading-relaxed">
                Share this link with stakeholders or client reviewers to grant temporary 24-hour bypass without needing admin login credentials.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center gap-2 justify-start lg:justify-end">
            <button
              type="button"
              onClick={handleCopyBypass}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E5E5EA] hover:bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F] shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#86868B]" />
                  <span>Copy Bypass Link</span>
                </>
              )}
            </button>

            <a
              href="/maintenance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5F5F7] hover:bg-[#E5E5EA] text-xs font-medium text-[#1D1D1F] transition-colors"
              title="Preview Maintenance Screen"
            >
              <Eye className="w-3.5 h-3.5 text-[#86868B]" />
              <span>Preview Page</span>
            </a>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E5E5EA] max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#1D1D1F]">
                  Enable Maintenance Mode?
                </h3>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  Enabling maintenance mode will immediately rewrite all public traffic to the maintenance page.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA]/60 text-xs text-[#515154] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#1D1D1F]">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>You can still browse and test the site as an admin.</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#1D1D1F]">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>The Admin Portal (/admin) remains fully reachable.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isPending}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => executeToggle(true)}
                disabled={isPending}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Enabling...</span>
                  </>
                ) : (
                  <span>Confirm & Turn ON</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
