'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface ServiceCategorySelectProps {
  id?: string;
  name?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  'aria-describedby'?: string;
}

export function ServiceCategorySelect({
  id = 'serviceType',
  name = 'serviceType',
  value,
  options,
  onChange,
  onBlur,
  error,
  placeholder = 'Select a service category…',
  'aria-describedby': ariaDescribedBy,
}: ServiceCategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(() => {
    const idx = options.indexOf(value);
    return idx >= 0 ? idx : 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  // Keep highlighted index in sync when value changes externally
  useEffect(() => {
    const idx = options.indexOf(value);
    if (idx >= 0) {
      setHighlightedIndex(idx);
    }
  }, [value, options]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen, onBlur]);

  // Ensure highlighted item is scrolled into view when navigating via keyboard
  useEffect(() => {
    if (!isOpen || !listboxRef.current) return;
    const activeItem = listboxRef.current.children[highlightedIndex] as HTMLElement | undefined;
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) => (prev + 1) % options.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
      }
    } else if (e.key === 'Home') {
      if (isOpen) {
        e.preventDefault();
        setHighlightedIndex(0);
      }
    } else if (e.key === 'End') {
      if (isOpen) {
        e.preventDefault();
        setHighlightedIndex(options.length - 1);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) {
        if (options[highlightedIndex]) {
          handleSelect(options[highlightedIndex]);
        }
      } else {
        setIsOpen(true);
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    } else if (e.key === 'Tab') {
      if (isOpen) {
        setIsOpen(false);
        onBlur?.();
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden input for standard form serialization */}
      <input type="hidden" name={name} value={value} />

      {/* Dropdown Trigger Button */}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && options[highlightedIndex]
            ? `${listboxId}-opt-${highlightedIndex}`
            : undefined
        }
        aria-invalid={Boolean(error)}
        aria-describedby={ariaDescribedBy}
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (isOpen) {
            onBlur?.();
          }
        }}
        onKeyDown={handleKeyDown}
        className={`w-full px-3.5 py-2.5 rounded-button bg-surface border text-body text-left flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer select-none focus:outline-none ${
          error
            ? 'border-signal ring-2 ring-signal/15'
            : isOpen
            ? 'border-signal ring-2 ring-signal/20'
            : 'border-hairline hover:border-slate/40 focus:ring-2 focus:ring-signal focus:border-signal'
        }`}
      >
        <span
          className={`truncate transition-colors ${
            value ? 'text-ink font-medium' : 'text-slate/50'
          }`}
        >
          {value || placeholder}
        </span>

        {/* Animated Chevron */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`shrink-0 transition-colors ${
            isOpen ? 'text-signal' : 'text-slate/70 group-hover:text-ink'
          }`}
          aria-hidden="true"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      {/* Animated Dropdown Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            aria-label="Service category options"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-surface rounded-button border border-hairline shadow-elevated-card max-h-64 overflow-y-auto py-1.5 focus:outline-none"
          >
            {options.map((opt, index) => {
              const isSelected = value === opt;
              const isHighlighted = highlightedIndex === index;

              return (
                <motion.li
                  key={opt}
                  id={`${listboxId}-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.16,
                    delay: Math.min(index * 0.02, 0.15),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => handleSelect(opt)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`relative flex items-center justify-between gap-3 px-3.5 py-2.5 text-small sm:text-body cursor-pointer transition-colors duration-150 select-none ${
                    isSelected
                      ? 'bg-signal/8 text-signal font-medium'
                      : isHighlighted
                      ? 'bg-paper text-ink'
                      : 'text-ink hover:bg-paper'
                  }`}
                >
                  <span className="truncate">{opt}</span>

                  {/* Animated Checkmark for Selected State */}
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="text-signal shrink-0"
                    >
                      <Check className="w-4 h-4" aria-hidden="true" />
                    </motion.span>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

