'use client';

import React, { useRef, useEffect } from 'react';
import { useProjectGallery } from './ProjectGalleryProvider';
import { ProjectGalleryItemProps } from './types';

export function ProjectGalleryItem({
  index,
  children,
  className = '',
  onClick,
  ...props
}: ProjectGalleryItemProps) {
  const { state, actions, registerTileRef } = useProjectGallery();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    registerTileRef(index, buttonRef.current);
    return () => {
      registerTileRef(index, null);
    };
  }, [index, registerTileRef]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (!e.defaultPrevented) {
      actions.open(index);
    }
  };

  const isCurrentActive = state.isOpen && state.activeIndex === index;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-haspopup="dialog"
      aria-expanded={isCurrentActive}
      className={`group relative overflow-hidden text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
