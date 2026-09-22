import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Zap, Phone, Mail, Clock } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export const metadata: Metadata = {
  title: 'Website Maintenance Ongoing — Modes Power Services',
  description:
    'Modes Power Services is currently performing scheduled system upgrades. Our 24/7 high-voltage emergency response and field engineering teams remain fully operational.',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-static';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#C8102E] selection:text-white font-sans">
      {/* Subtle Background Radial Gradients & Circuit Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8102E]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#002B49]/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Standalone Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-sm">
            <Logo variant="default" size={32} />
          </div>
          <div className="pl-3 border-l border-white/15">
            <span className="text-xs font-semibold text-white/90 tracking-wide block">
              MODES POWER SERVICES
            </span>
            <span className="text-[10px] text-white/50 tracking-wider uppercase block font-mono">
              High-Voltage Infrastructure & Engineering
            </span>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="hidden sm:inline">Scheduled Maintenance</span>
          <span className="sm:hidden">Maintenance</span>
        </div>
      </header>

      {/* Main Standalone Hero Section */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 sm:py-16 my-auto text-center space-y-8">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/80 text-xs font-medium backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-[#C8102E]" />
          <span>Scheduled Platform Maintenance in Progress</span>
        </div>

        {/* Headline */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.1]">
            Website Maintenance <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-neutral-400">
              Currently Ongoing.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
            We are performing scheduled system and infrastructure upgrades. Our web services will be restored shortly. All on-site substation operations, 24/7 industrial emergency repair units, and client contracts continue without interruption.
          </p>
        </div>

        {/* Operational Highlights Cards (Isolated & Informative) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C8102E]">
              <Phone className="w-4 h-4" />
            </div>
            <h2 className="font-semibold text-sm text-white">24/7 Rapid Emergency</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Industrial emergency power lines and on-call engineering dispatchers remain active 24/7.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="font-semibold text-sm text-white">Active Field Works</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Ongoing 33kV substation overhauls, audits, and microgrid installations continue on schedule.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <h2 className="font-semibold text-sm text-white">Temporary Maintenance</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Full public website access will be automatically restored once verified by engineers.
            </p>
          </div>
        </div>

        {/* Direct Emergency Contacts (No internal app routes) */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.05] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] block">
              Urgent Technical Assistance
            </span>
            <p className="text-xs text-neutral-300">
              Speak directly with an on-duty senior electrical engineer or dispatch team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+233548312345"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+233 (0) 54 831 2345</span>
            </a>

            <a
              href="mailto:emergency@modespower.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>emergency@modespower.com</span>
            </a>
          </div>
        </div>
      </main>

      {/* Standalone Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Modes Power Services Ltd.</span>
          <span>•</span>
          <span>Energy Commission Ghana Class-A Certified Contractor</span>
        </div>
        <div className="text-[11px] text-neutral-500 font-mono">
          Status: Operational Standby
        </div>
      </footer>
    </div>
  );
}
