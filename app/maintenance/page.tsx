import React from 'react';
import { Metadata } from 'next';
import { Phone, Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export const metadata: Metadata = {
  title: 'This Site is Under Maintenance — Modes Power Services',
  description:
    'We are preparing to serve you better. Modes Power Services 24/7 high-voltage emergency response and field engineering teams remain fully operational.',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-static';

export default function MaintenancePage() {
  return (
    <div className="maintenance-screen fixed inset-0 z-[99999] w-screen h-screen min-h-screen bg-[#FFFFFF] text-[#0B1E3D] flex flex-col items-center justify-between overflow-y-auto font-sans select-none px-4 py-8">
      {/* Central Illustration Container with Large Circular Aura */}
      <div className="relative w-full max-w-3xl flex flex-col items-center justify-center my-auto">
        
        {/* Soft Circular Backdrop (Matches Reference Layout with Brand Cream/Tint) */}
        <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] rounded-full bg-[#F7F3EC] -z-10 transition-transform duration-700 pointer-events-none" />

        {/* Company Header Tag */}
        <div className="flex items-center gap-2 mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="w-7 h-7 rounded-lg bg-white p-0.5 shadow-sm border border-black/[0.06] flex items-center justify-center">
            <Logo variant="default" size={24} priority />
          </div>
          <span className="text-xs font-bold tracking-widest text-[#0B1E3D] uppercase font-mono">
            Modes Power Services
          </span>
        </div>

        {/* Centered Typography (Matching Reference Text Hierarchy) */}
        <div className="text-center space-y-2.5 max-w-lg mx-auto z-10 px-4 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl md:text-[42px] tracking-tight text-[#0B1E3D] leading-[1.15]">
            This site is under <br className="hidden sm:inline" />
            maintenance
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563] font-medium leading-relaxed">
            We’re preparing to serve you better.
          </p>
        </div>

        {/* Center Vector: Disconnected Power Plug & Socket with Electric Sparks */}
        <div className="relative w-full max-w-[680px] my-6 sm:my-8 flex items-center justify-center">
          <svg
            viewBox="0 0 760 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-xs"
          >
            {/* Left Wire extending to left edge */}
            <line
              x1="0"
              y1="80"
              x2="240"
              y2="80"
              stroke="#0B1E3D"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="0"
              y1="80"
              x2="240"
              y2="80"
              stroke="#FFFFFF"
              strokeWidth="11"
              strokeLinecap="square"
            />
            <line
              x1="0"
              y1="80"
              x2="240"
              y2="80"
              stroke="#0B1E3D"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Left Male Plug Assembly */}
            <g className="animate-[pulse_3s_ease-in-out_infinite]">
              {/* Strain Relief Boot */}
              <rect
                x="240"
                y="67"
                width="24"
                height="26"
                rx="4"
                fill="#C8102E"
                stroke="#0B1E3D"
                strokeWidth="4"
              />

              {/* Main Plug Body */}
              <path
                d="M 264 56 C 285 56 315 62 334 67 L 334 93 C 315 98 285 104 264 104 Z"
                fill="#0B1E3D"
                stroke="#0B1E3D"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Decorative Brand Red Body Band */}
              <path
                d="M 282 59 C 298 61 312 64 322 67 L 322 93 C 312 96 298 99 282 101 Z"
                fill="#C8102E"
                opacity="0.9"
              />

              {/* Plug Face Collar */}
              <rect
                x="334"
                y="52"
                width="16"
                height="56"
                rx="5"
                fill="#0B1E3D"
                stroke="#0B1E3D"
                strokeWidth="4"
              />

              {/* Metal Prongs */}
              {/* Top Prong */}
              <rect
                x="350"
                y="61"
                width="34"
                height="12"
                rx="6"
                fill="#E2E8F0"
                stroke="#0B1E3D"
                strokeWidth="4"
              />
              {/* Bottom Prong */}
              <rect
                x="350"
                y="87"
                width="34"
                height="12"
                rx="6"
                fill="#E2E8F0"
                stroke="#0B1E3D"
                strokeWidth="4"
              />
            </g>

            {/* Central Electrical Sparks / Arc Pulse */}
            <g className="animate-[pulse_1.5s_ease-in-out_infinite]">
              {/* Upper Spark */}
              <path
                d="M 390 64 L 398 69 L 393 72 L 404 77"
                stroke="#C8102E"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lower Spark */}
              <path
                d="M 392 92 L 401 87 L 396 84 L 406 80"
                stroke="#C8102E"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Center Glow Node */}
              <circle cx="398" cy="80" r="3" fill="#C8102E" className="animate-ping" />
            </g>

            {/* Right Female Connector Assembly */}
            <g className="animate-[pulse_3s_ease-in-out_infinite_0.5s]">
              {/* Socket Front Collar */}
              <rect
                x="414"
                y="50"
                width="18"
                height="60"
                rx="5"
                fill="#0B1E3D"
                stroke="#0B1E3D"
                strokeWidth="4"
              />

              {/* Socket Aperture Slot */}
              <line
                x1="418"
                y1="58"
                x2="418"
                y2="102"
                stroke="#C8102E"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Main Socket Body */}
              <path
                d="M 432 56 C 452 56 480 62 498 67 L 498 93 C 480 98 452 104 432 104 Z"
                fill="#0B1E3D"
                stroke="#0B1E3D"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Decorative Brand Red Body Band */}
              <path
                d="M 444 59 C 460 61 476 64 488 67 L 488 93 C 476 96 460 99 444 101 Z"
                fill="#C8102E"
                opacity="0.9"
              />

              {/* Strain Relief Boot */}
              <rect
                x="498"
                y="67"
                width="24"
                height="26"
                rx="4"
                fill="#C8102E"
                stroke="#0B1E3D"
                strokeWidth="4"
              />
            </g>

            {/* Right Wire extending to right edge */}
            <line
              x1="522"
              y1="80"
              x2="760"
              y2="80"
              stroke="#0B1E3D"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="522"
              y1="80"
              x2="760"
              y2="80"
              stroke="#FFFFFF"
              strokeWidth="11"
              strokeLinecap="square"
            />
            <line
              x1="522"
              y1="80"
              x2="760"
              y2="80"
              stroke="#0B1E3D"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Operational Notice */}
        <p className="text-xs text-[#6B7280] max-w-md text-center leading-relaxed mb-6 px-4">
          All high-voltage industrial substations, 24/7 emergency dispatch, and field operations continue normally.
        </p>

        {/* Urgent Contact Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 z-10">
          <a
            href="tel:0208438618"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C8102E] hover:bg-[#A80D26] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+233 (0) 20 843 8618</span>
          </a>

          <a
            href="mailto:modespower@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1E3D] hover:bg-[#122B55] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>modespower@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Subtle Accreditation Footer */}
      <footer className="w-full text-center pt-8 text-[11px] text-[#9CA3AF] font-medium flex items-center justify-center gap-2">
        <span>Energy Commission Ghana Certified Class A Contractor</span>
        <span>•</span>
        <span className="font-mono">Modes Power Services Ltd.</span>
      </footer>
    </div>
  );
}
