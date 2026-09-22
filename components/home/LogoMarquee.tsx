'use client';

import React from 'react';
import { CLIENTS_DATA } from '@/data/clients';
import { ShieldCheck, Cpu } from 'lucide-react';

export function LogoMarquee() {
  // Duplicate array 3 times for completely seamless looping
  const marqueeItems = [...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA];

  return (
    <div className="w-full py-8 md:py-12 overflow-hidden select-none">
      <div className="max-w-[1240px] mx-auto px-4 text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-content-tertiary">
          Trusted By Leading Industrial, Commercial & Mining Institutions Across Ghana
        </p>
      </div>

      <div className="relative w-full overflow-hidden group">
        {/* Gradient fade on edges for smooth visual transition */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-canvas-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-canvas-cream to-transparent z-10 pointer-events-none" />

        {/* Scrolling flex track */}
        <div className="flex w-max animate-marquee-horizontal group-hover:[animation-play-state:paused] items-center gap-6 sm:gap-8">
          {marqueeItems.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-black/[0.05] hover:border-brand-red/30 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 shrink-0 cursor-default group/item"
            >
              <div className="w-7 h-7 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy group-hover/item:bg-brand-red-light group-hover/item:text-brand-red transition-colors">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-brand-navy group-hover/item:text-brand-red transition-colors">
                  {client.logoText}
                </span>
                <span className="text-[10px] text-content-tertiary font-medium">
                  {client.sector}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
