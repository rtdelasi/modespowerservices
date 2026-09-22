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
    <div className="min-h-screen w-full bg-[#070A12] text-white flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden selection:bg-[#C8102E] selection:text-white font-sans">
      {/* 1. Rich Dynamic Background Animations */}
      {/* Floating Deep Brand Red Orb */}
      <div className="absolute top-1/6 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-[#C8102E]/25 rounded-full blur-[140px] pointer-events-none animate-float-orb1" />

      {/* Floating Electric Navy / Azure Orb */}
      <div className="absolute bottom-1/6 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-[#00529B]/30 rounded-full blur-[150px] pointer-events-none animate-float-orb2" />

      {/* Floating Center Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[#C8102E]/15 rounded-full blur-[110px] pointer-events-none animate-float-orb3" />

      {/* Geometric Electrical Circuit Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />

      {/* Animated Light Sweep / Scan Beam */}
      <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#C8102E]/10 to-transparent pointer-events-none animate-scanline" />

      {/* 2. Central Standalone Card */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-auto bg-[#0B1426]/75 backdrop-blur-2xl border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.6)] text-center space-y-7 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Brand Logo & Animated Ripple Rings */}
        <div className="relative flex justify-center items-center py-2">
          {/* Animated Electrical Ripple Rings */}
          <div className="absolute w-20 h-20 rounded-full border border-[#C8102E]/40 pointer-events-none animate-ripple" />
          <div className="absolute w-28 h-28 rounded-full border border-[#C8102E]/20 pointer-events-none animate-ripple [animation-delay:1.2s]" />

          {/* Glowing Center Logo Box */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-2xl animate-pulse-glow">
            <Logo variant="default" size={48} priority />
          </div>
        </div>

        {/* Company Title & Live Status Pill */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Scheduled Platform Maintenance</span>
          </div>
          <div className="pt-1">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
              Modes Power Services Ltd.
            </span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight text-white leading-[1.15]">
            Website Maintenance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-neutral-400">
              Currently Ongoing.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
            We are performing scheduled system upgrades. Our website will be back online shortly. All on-site substation operations, 24/7 industrial emergency repair units, and client projects continue without interruption.
          </p>
        </div>

        {/* Operational Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md space-y-1.5 hover:bg-white/[0.06] transition-colors">
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center text-[#C8102E]">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-semibold text-xs text-white">24/7 Emergency</h2>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Rapid dispatch lines remain open 24/7.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md space-y-1.5 hover:bg-white/[0.06] transition-colors">
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-semibold text-xs text-white">Active Works</h2>
            <p className="text-[11px] text-neutral-400 leading-snug">
              33kV & microgrid field operations on schedule.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md space-y-1.5 hover:bg-white/[0.06] transition-colors">
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center text-amber-400">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-semibold text-xs text-white">Temporary</h2>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Service will be restored upon verification.
            </p>
          </div>
        </div>

        {/* Emergency Assistance Direct Contacts */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8102E] block">
              Urgent Technical Inquiries
            </span>
            <p className="text-xs text-neutral-300">
              Speak directly with an on-duty electrical engineer:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="tel:0208438618"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+233 (0) 20 843 8618</span>
            </a>

            <a
              href="mailto:modespower@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>modespower@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Accreditation Footer Note */}
        <div className="pt-1 text-[11px] text-neutral-400 flex items-center justify-center gap-2">
          <span>Energy Commission Ghana Class-A Certified Contractor</span>
          <span>•</span>
          <span className="font-mono">Status: Operational Standby</span>
        </div>
      </div>
    </div>
  );
}
