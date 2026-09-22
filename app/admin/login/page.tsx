'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { login } from '@/app/actions/auth';
import { Logo } from '@/components/ui/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('redirectTo', redirectTo);

    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-7 bg-white border border-[#E5E5EA] shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl p-8 sm:p-10 relative">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center p-2 shadow-xs mb-3">
            <Logo variant="with-tagline" size={56} priority />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
            Modes CMS Console
          </h2>
          <p className="text-xs text-[#86868B] font-medium">
            Sign in to manage website case studies, gallery, and site banners.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 flex items-start gap-2.5 text-red-600 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B]">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@modespowerservices.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B]">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#E5E5EA]">
          <Link
            href="/"
            className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            ← Return to Modes Power Services Website
          </Link>
        </div>
      </div>
    </div>
  );
}
