'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Award, Shield, TrendingUp, ChevronRight, Sparkles, CheckCircle } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WHY_CHOOSE_US_DATA } from '@/data/accordion';
import { cn } from '@/lib/utils';

export function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const CYCLE_INTERVAL = 4500; // 4.5 seconds

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WHY_CHOOSE_US_DATA.length);
    }, CYCLE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-4 h-4" />;
      case 'Award':
        return <Award className="w-4 h-4" />;
      case 'Shield':
        return <Shield className="w-4 h-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <SectionContainer
      theme="navy"
      radius="top-only"
      className="text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section 4a.7 Outlined Pill Eyebrow & Section 4a.8 Dotted Divider */}
          <SectionHeader
            eyebrow="The Modes Advantage"
            eyebrowIcon={<Sparkles className="w-3.5 h-3.5 text-brand-red" />}
            title="Why Critical Industries Rely on Modes Power."
            subtitle="Electrical engineering is unforgiving. A single subpar termination or missed fault can halt an entire production line. We combine certified engineering talent, advanced diagnostic technology, and transparent pricing to protect your operations."
            theme="navy"
          />

          {/* Mini active summary badge with Section 4a.9 Circular Icon */}
          <div className="p-4 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center text-white shrink-0 shadow-md">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Energy Commission Class A
              </p>
              <p className="text-[11px] text-neutral-300">
                100% statutory safety adherence across all electrical classes
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Auto-cycling Numbered Accordion */}
        <div
          className="lg:col-span-7 space-y-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {WHY_CHOOSE_US_DATA.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(index)}
                className={cn(
                  'relative rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer border',
                  isActive
                    ? 'bg-white/[0.08] border-brand-red/50 shadow-xl'
                    : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10'
                )}
              >
                {/* Active Sliding Progress Bar Line */}
                {isActive && !isPaused && (
                  <motion.div
                    key={`progress-${index}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: CYCLE_INTERVAL / 1000, ease: 'linear' }}
                    className="absolute top-0 left-0 h-[2px] bg-brand-red z-10"
                  />
                )}

                {/* Accordion Row Header with Section 4a.9 Circular Number Badge */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Number Badge: Circular */}
                    <span
                      className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors shrink-0',
                        isActive
                          ? 'bg-brand-red text-white shadow-md'
                          : 'bg-white/10 text-neutral-400'
                      )}
                    >
                      {item.number}
                    </span>

                    {/* Title */}
                    <div>
                      <h3
                        className={cn(
                          'font-display font-bold text-base sm:text-lg transition-colors',
                          isActive ? 'text-white' : 'text-neutral-300'
                        )}
                      >
                        {item.title}
                      </h3>
                      {!isActive && (
                        <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                          {item.summary}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Circular Chevron Arrow (Section 4a.9) */}
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300',
                      isActive
                        ? 'bg-brand-red text-white rotate-90 shadow-sm'
                        : 'bg-white/5 text-neutral-400'
                    )}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Expanded Content Body */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-white/10 space-y-3">
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {item.details}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[11px] font-semibold bg-brand-red/20 text-brand-red border border-brand-red/30 px-3 py-1 rounded-pill">
                            {item.highlightTag}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
