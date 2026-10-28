'use client';

import React, { createContext, useContext } from 'react';

export interface NavState {
  isOpen: boolean;
  isScrolled: boolean;
  isHome: boolean;
  pathname: string;
}

export interface NavActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface NavMeta {
  triggerRef: React.RefObject<HTMLButtonElement>;
  sheetRef: React.RefObject<HTMLDivElement>;
  sentinelRef: React.RefObject<HTMLDivElement>;
}

export interface NavContextValue {
  state: NavState;
  actions: NavActions;
  meta: NavMeta;
}

export const NavContext = createContext<NavContextValue | null>(null);

export function useNavContext(): NavContextValue {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useNavContext must be used within a <Nav.Root> compound component.');
  }
  return context;
}
