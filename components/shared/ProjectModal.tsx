'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building, Calendar, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectCaseStudy } from '@/types';
import { Button } from '@/components/ui/Button';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-brand-navy/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-black/[0.08] my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Header */}
            <div className="relative w-full h-64 sm:h-80 bg-brand-navy">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                fallbackCategory={project.category}
                fallbackTitle={project.title}
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent pointer-events-none" />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close Project Details"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold bg-brand-red text-white px-3 py-0.5 rounded-pill uppercase">
                  {project.category}
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-surface-muted border border-black/[0.05]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-content-tertiary block">Client</span>
                  <span className="text-xs font-semibold text-brand-navy">{project.client}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-content-tertiary block">Location</span>
                  <span className="text-xs font-semibold text-brand-navy">{project.location}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-content-tertiary block">Capacity</span>
                  <span className="text-xs font-mono font-bold text-brand-red">{project.capacity}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-content-tertiary block">Timeline</span>
                  <span className="text-xs font-semibold text-brand-navy">{project.timeline}</span>
                </div>
              </div>

              {/* Scope & Outcome */}
              <div className="space-y-4 text-sm text-content-secondary leading-relaxed">
                <div>
                  <h3 className="font-display font-bold text-base text-brand-navy mb-1.5">
                    Engineering Scope & Execution
                  </h3>
                  <p>{project.scope}</p>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-brand-navy mb-1.5">
                    Measurable Result & Operational Outcome
                  </h3>
                  <div className="p-4 bg-brand-red-light/50 border border-brand-red/20 rounded-2xl">
                    <p className="font-medium text-brand-navy">{project.outcome}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-black/[0.04] text-content-secondary px-3 py-1 rounded-pill font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Close
                </Button>
                <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Request Similar Project Solution
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
