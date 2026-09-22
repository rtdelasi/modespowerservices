'use client';

import React from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { TeamMember } from '@/types';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div
      className="bg-white rounded-[24px] overflow-hidden border border-black/[0.05] shadow-soft-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Top Section: Photo + Circular LinkedIn Badge (Section 4a.9) */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-brand-navy">
        <ImageWithFallback
          src={member.image}
          alt={member.name}
          fallbackCategory="Team"
          fallbackTitle={member.name}
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent pointer-events-none" />

        {/* Circular LinkedIn Badge (Section 4a.9) */}
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md hover:bg-white text-brand-navy hover:text-[#0077b5] text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1.5"
          aria-label={`${member.name} on LinkedIn`}
        >
          <div className="w-5 h-5 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
            <Linkedin className="w-3 h-3 fill-current" />
          </div>
          <span>LinkedIn</span>
          <ArrowUpRight className="w-3 h-3 opacity-60" />
        </a>
      </div>

      {/* Content Section: Lighter Card Treatment */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-brand-navy group-hover:text-brand-red transition-colors">
              {member.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-brand-red mt-0.5">
              {member.role}
            </p>
          </div>

          {/* Short Italic Tagline with Left Accent Border */}
          {member.tagline && (
            <div className="border-l-2 border-brand-red pl-3 py-1 bg-brand-red-light/30 rounded-r-lg">
              <p className="text-xs sm:text-sm italic text-content-primary leading-relaxed">
                {member.tagline}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
