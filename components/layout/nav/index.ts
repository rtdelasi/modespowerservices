import { NavRoot } from './NavRoot';
import { NavTrigger } from './NavTrigger';
import { NavSheet } from './NavSheet';
import { NavLink } from './NavLink';

/**
 * Compound Navigation Components per BRIEF Section 7 & Phase 2
 * Nav.Root, Nav.Trigger, Nav.Sheet, Nav.Link
 */
export const Nav = {
  Root: NavRoot,
  Trigger: NavTrigger,
  Sheet: NavSheet,
  Link: NavLink,
};

export { useNavContext } from './NavContext';
export type { NavContextValue, NavState, NavActions, NavMeta } from './NavContext';
export { NavRoot } from './NavRoot';
export { NavTrigger } from './NavTrigger';
export { NavSheet } from './NavSheet';
export { NavLink } from './NavLink';
