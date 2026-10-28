'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SectionTone } from './Section';

export interface StatProps {
  value: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  tone?: SectionTone;
  className?: string;
  animate?: boolean;
}

interface ParsedNumber {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  isNumeric: boolean;
}

/**
 * Parses numeric strings like "140+ MW", "520+", "100%", "15+" into
 * prefix, target number, suffix, and decimal precision.
 */
function parseNumericValue(val: React.ReactNode): ParsedNumber {
  if (typeof val === 'number') {
    const dec = val.toString().split('.')[1]?.length || 0;
    return { prefix: '', target: val, suffix: '', decimals: dec, isNumeric: true };
  }
  if (typeof val !== 'string') {
    return { prefix: '', target: 0, suffix: '', decimals: 0, isNumeric: false };
  }

  const trimmed = val.trim();
  const match = trimmed.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: '', target: 0, suffix: '', decimals: 0, isNumeric: false };
  }

  const prefix = match[1] || '';
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3] || '';
  const target = parseFloat(numStr);

  if (isNaN(target)) {
    return { prefix: '', target: 0, suffix: '', decimals: 0, isNumeric: false };
  }

  const decMatch = numStr.split('.')[1];
  const decimals = decMatch ? decMatch.length : 0;

  return { prefix, target, suffix, decimals, isNumeric: true };
}

/**
 * Animated counter that counts up from 0 to the target number
 * when it scrolls into view, using smooth easeOutExpo curve.
 */
function AnimatedStatValue({
  value,
  shouldAnimate,
}: {
  value: React.ReactNode;
  shouldAnimate: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px 0px' });
  const prefersReduced = useReducedMotion();

  const parsed = parseNumericValue(value);
  const [displayNumber, setDisplayNumber] = useState<number>(() => {
    if (!parsed.isNumeric || prefersReduced || !shouldAnimate) {
      return parsed.target;
    }
    return 0;
  });

  useEffect(() => {
    if (!parsed.isNumeric || prefersReduced || !shouldAnimate || !isInView) {
      return;
    }

    let startTimestamp: number | null = null;
    let rafId: number;
    const duration = 1600; // 1.6s smooth duration

    // Ease out exponential curve
    const easeOutExpo = (x: number): number =>
      x === 1 ? 1 : 1 - Math.pow(2, -10 * x);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutExpo(progress);

      const current = easedProgress * parsed.target;
      setDisplayNumber(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplayNumber(parsed.target);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isInView, parsed.isNumeric, parsed.target, prefersReduced, shouldAnimate]);

  if (!parsed.isNumeric) {
    return <span ref={containerRef}>{value}</span>;
  }

  if (prefersReduced || !shouldAnimate) {
    return (
      <span ref={containerRef}>
        {parsed.prefix}
        {parsed.decimals > 0
          ? parsed.target.toFixed(parsed.decimals)
          : Math.round(parsed.target).toLocaleString()}
        {parsed.suffix}
      </span>
    );
  }

  const formattedNum =
    parsed.decimals > 0
      ? displayNumber.toFixed(parsed.decimals)
      : Math.round(displayNumber).toLocaleString();

  return (
    <span ref={containerRef}>
      {parsed.prefix}
      {formattedNum}
      {parsed.suffix}
    </span>
  );
}

/**
 * Stat primitive with animated increasing figures count-up
 * and tabular numerals formatting.
 */
export function Stat({
  value,
  label,
  description,
  tone = 'paper',
  className,
  animate = true,
}: StatProps) {
  const isDark = tone === 'ink';

  return (
    <div className={cn('flex flex-col space-y-1.5 text-left', className)}>
      <div
        className={cn(
          'tabular-nums text-h2 md:text-display font-semibold tracking-tight leading-[1.1]',
          isDark ? 'text-surface' : 'text-ink'
        )}
      >
        <AnimatedStatValue value={value} shouldAnimate={animate} />
      </div>
      <div
        className={cn(
          'text-body font-medium leading-[1.4]',
          isDark ? 'text-surface/90' : 'text-ink'
        )}
      >
        {label}
      </div>
      {description && (
        <div
          className={cn(
            'text-small leading-[1.6] max-w-[40ch]',
            isDark ? 'text-hairline/75' : 'text-slate'
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export default Stat;
