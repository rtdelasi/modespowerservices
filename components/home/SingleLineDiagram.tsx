'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';

interface NodeProps {
  y: number;
  startY: number;
  endY: number;
  progress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

/**
 * Node Dot and Horizontal Branch Spur
 * Aligns to section heading marked with data-diagram-node
 */
function DiagramNode({
  y,
  startY,
  endY,
  progress,
  prefersReducedMotion,
}: NodeProps) {
  const threshold = Math.max(0, Math.min(1, (y - startY) / (endY - startY)));
  const opacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.015), threshold],
    [0, 1]
  );
  const scale = useTransform(
    progress,
    [Math.max(0, threshold - 0.015), threshold],
    [0.4, 1]
  );

  return (
    <motion.g
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
        scale: prefersReducedMotion ? 1 : scale,
        originX: '24px',
        originY: `${y}px`,
      }}
    >
      {/* Horizontal tap spur extending towards section heading */}
      <line
        x1={24}
        y1={y}
        x2={32}
        y2={y}
        stroke="#C8102E"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Node junction dot */}
      <circle
        cx={24}
        cy={y}
        r={3.5}
        fill="#C8102E"
        stroke="#C8102E"
        strokeWidth={1}
      />
    </motion.g>
  );
}

/**
 * Circuit Breaker Symbol
 * A standard 12x12px electrical square symbol on the busbar
 */
function BreakerSymbol({
  y,
  startY,
  endY,
  progress,
  prefersReducedMotion,
}: NodeProps) {
  const threshold = Math.max(0, Math.min(1, (y - startY) / (endY - startY)));
  const opacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.015), threshold],
    [0, 1]
  );

  return (
    <motion.g
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
      }}
    >
      {/* Background mask to cleanly interrupt the vertical busbar */}
      <rect
        x={18}
        y={y - 6}
        width={12}
        height={12}
        fill="#F6F7F9"
        stroke="#C8102E"
        strokeWidth={2}
      />
      {/* Breaker internal toggle indicator */}
      <line
        x1={21}
        y1={y - 3}
        x2={27}
        y2={y + 3}
        stroke="#C8102E"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </motion.g>
  );
}

/**
 * Transformer Symbol
 * Two overlapping circles (IEC/IEEE standard single-line diagram symbol)
 */
function TransformerSymbol({
  y,
  startY,
  endY,
  progress,
  prefersReducedMotion,
}: NodeProps) {
  const threshold = Math.max(0, Math.min(1, (y - startY) / (endY - startY)));
  const opacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.015), threshold],
    [0, 1]
  );

  return (
    <motion.g
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
      }}
    >
      {/* Primary winding circle */}
      <circle
        cx={24}
        cy={y - 6}
        r={8}
        fill="#F6F7F9"
        stroke="#C8102E"
        strokeWidth={2}
      />
      {/* Secondary winding circle (overlapping primary by 4px) */}
      <circle
        cx={24}
        cy={y + 6}
        r={8}
        fill="#F6F7F9"
        stroke="#C8102E"
        strokeWidth={2}
      />
    </motion.g>
  );
}

/**
 * SingleLineDiagram per BRIEF Section 3 & Phase 10:
 * - Signal red (#C8102E), 2px stroke
 * - Runs down left margin of the home page at exactly 24px from viewport edge
 * - Shapes: vertical busbar line, breaker square, transformer symbol (2 overlapping circles), node dots
 * - Draws dynamically as the user scrolls using Framer Motion useScroll
 * - Nodes align to elements marked with data-diagram-node on section headings
 * - Measured on load and on resize via ResizeObserver
 * - Visible only at 1024px and wider (hidden lg:block)
 * - aria-hidden="true"
 * - Fully drawn and static when prefers-reduced-motion is active
 * - Positioned at z-10 so it never overlaps text or the sticky header
 */
export function SingleLineDiagram() {
  const prefersReduced = useReducedMotion();
  const prefersReducedMotion = Boolean(prefersReduced);

  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<number[]>([]);
  const [pageHeight, setPageHeight] = useState<number>(0);

  // Measure heading node positions relative to home page container
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measureNodes = () => {
      // Find parent home container
      const homeEl = document.getElementById('home-page-root');
      if (!homeEl) return;

      const homeRect = homeEl.getBoundingClientRect();
      const homeTop = homeRect.top + window.scrollY;

      const nodes = Array.from(
        homeEl.querySelectorAll<HTMLElement>('[data-diagram-node]')
      );

      if (nodes.length === 0) return;

      const coords = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const nodeTop = rect.top + window.scrollY;
        // Center of the heading text
        return nodeTop - homeTop + rect.height / 2;
      });

      setNodePositions(coords);
      setPageHeight(homeEl.offsetHeight);
    };

    measureNodes();

    // ResizeObserver tracks DOM changes, font loading and layout shifts
    const homeEl = document.getElementById('home-page-root');
    const ro = new ResizeObserver(() => {
      measureNodes();
    });

    if (homeEl) {
      ro.observe(homeEl);
    }

    window.addEventListener('resize', measureNodes);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureNodes);
    };
  }, []);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (nodePositions.length === 0 || pageHeight === 0) {
    return null;
  }

  // Diagram vertical boundaries
  const firstNodeY = nodePositions[0];
  const lastNodeY = nodePositions[nodePositions.length - 1];

  // Busbar begins ~180px above first node (transitioning from Stats to Services)
  const startY = Math.max(100, firstNodeY - 180);
  // Busbar ends ~30px below the last node in QuoteBand
  const endY = lastNodeY + 30;

  // Intermediate electrical symbols
  const breakerY = startY + (firstNodeY - startY) * 0.55;
  const txY = (firstNodeY + nodePositions[1]) / 2;

  const busbarPath = `M 24,${startY} L 24,${endY}`;

  return (
    <div
      ref={containerRef}
      className="hidden lg:block absolute top-0 left-0 bottom-0 pointer-events-none z-10 w-16"
      style={{ height: pageHeight }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        width="64"
        height={pageHeight}
      >
        {/* Main Vertical Busbar Line at x=24 */}
        <motion.path
          d={busbarPath}
          fill="none"
          stroke="#C8102E"
          strokeWidth={2}
          strokeLinecap="round"
          style={{
            pathLength: prefersReducedMotion ? 1 : smoothProgress,
          }}
        />

        {/* High-Voltage Circuit Breaker Square */}
        <BreakerSymbol
          y={breakerY}
          startY={startY}
          endY={endY}
          progress={smoothProgress}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Power Transformer Symbol (Two Overlapping Circles) */}
        {nodePositions.length > 1 && (
          <TransformerSymbol
            y={txY}
            startY={startY}
            endY={endY}
            progress={smoothProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}

        {/* Node Junction Dots aligned with Section Headings */}
        {nodePositions.map((y, idx) => (
          <DiagramNode
            key={idx}
            y={y}
            startY={startY}
            endY={endY}
            progress={smoothProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </svg>
    </div>
  );
}

export default SingleLineDiagram;
