'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { GalleryItem } from '@/types';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface LightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  items,
  selectedIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length;
  const currentItem = isOpen ? items[selectedIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((selectedIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((selectedIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((selectedIndex - 1 + items.length) % items.length);
            }}
            aria-label="Previous Image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer hidden sm:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((selectedIndex + 1) % items.length);
            }}
            aria-label="Next Image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer hidden sm:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-brand-navy rounded-[28px] overflow-hidden border border-white/15 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image View */}
            <div className="relative w-full h-[45vh] sm:h-[60vh] bg-black">
              <ImageWithFallback
                src={currentItem.image}
                alt={currentItem.title}
                fallbackCategory={currentItem.category}
                fallbackTitle={currentItem.title}
                priority
                className="object-contain"
              />
            </div>

            {/* Bottom Caption & Meta Details */}
            <div className="p-6 sm:p-8 bg-brand-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold bg-brand-red text-white px-3 py-0.5 rounded-pill uppercase">
                    {currentItem.category}
                  </span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    {currentItem.location}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300">
                  {currentItem.description}
                </p>
                {currentItem.specs && (
                  <p className="text-xs font-mono text-brand-red font-semibold pt-1">
                    Technical Spec: {currentItem.specs}
                  </p>
                )}
              </div>

              {/* Index counter */}
              <div className="text-xs font-mono text-neutral-400 shrink-0">
                {selectedIndex + 1} / {items.length}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
