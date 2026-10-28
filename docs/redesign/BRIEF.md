# Modes Power Services: redesign brief (source of truth)

## 0. Ways of working
- Roles per phase: the UI/UX designer decides and specifies, the front-end developer builds, QA tests real behaviour. Never claim something works unless you ran it. Report tests as passed, failed or not run.
- Inspect the repo before changing it. Keep the existing stack (expected: Next.js App Router, TypeScript, Tailwind, Framer Motion, Supabase). Do not rewrite working logic without a stated reason. Do not add a dependency without saying why in one line.
- Work on one phase at a time and stay inside its scope. At the end of every phase: run npx tsc --noEmit (must be clean), update docs/redesign/PROGRESS.md, then report.
- CMS parity: the Supabase admin manages Gallery, Projects and Team only. Any change to a project or gallery field, or to how it is displayed, must update types, queries, the admin form and the empty-value fallbacks together. Home, Services and legal pages stay static content in code.
- Content integrity: never invent facts, clients, numbers or testimonials. Keep existing values. Mark anything unverifiable with a code comment TODO(owner-confirm) and list it in PROGRESS.md. Hide fields that are empty; never render "TBD", "N/A" or placeholder text.

## 1. Goal and audience
Audience: plant managers, facility heads, procurement staff and engineering consultants in Ghana, often on a phone over mobile data. The site must prove competence quickly and make it effortless to request a quote or call the 24/7 emergency line. Tone: calm, precise, plain. "Modern and simple" means fewer sections, more whitespace, real photography, plain words.

## 2. Design tokens
Colour (define once as theme tokens or CSS variables; no raw hex inside components):
- paper #F6F7F9: page background
- surface #FFFFFF: forms and raised areas
- ink #0B1E3D: text, dark sections, footer (brand navy)
- slate #5B6779: secondary text
- hairline #DDE2EA: borders and dividers
- signal #C8102E: brand red. Allowed only for primary buttons, the emergency phone line, the signature line and focus accents. Nothing else is red.
No decorative gradients, glows or coloured icon tiles. One bottom scrim on the hero photo for text legibility is allowed.
Type: one family loaded with next/font: Schibsted Grotesk, weights 400, 500, 600. If it is unavailable, use the system sans stack and tell me. Fluid scale with clamp: display 44 to 72px, h2 28 to 40, h3 20 to 24, body 17, small 14. Line-height 1.1 for headings, 1.6 for body. Maximum line length 68ch. Sentence case everywhere. No all-caps labels. Tabular numerals for stats and specs. text-wrap: balance on headings.
Spacing: 8px base. Section padding 96 to 128px on desktop, 64 to 80px on mobile. Container max 1200px, side gutter 20px on mobile and 32px on desktop.
Shape: buttons 8px radius, images and media 12px, nothing else rounded by default. No shadows except a hairline under the sticky header and the lightbox.
Buttons: Primary (signal background, white text), Secondary (ink outline), TextLink (underline on hover). Minimum height 44px.
Layout: left-aligned text. Lists use hairline divider rows, not identical rounded cards. Project tiles are the only cards. No numbered markers (content is not a sequence). No label above every heading.

## 3. The one memorable thing
A thin signal-red SVG "single-line diagram" (busbar line with a breaker, a transformer symbol and a few nodes, like a power single-line diagram) that draws itself down the left margin of the home page as the user scrolls, with nodes aligned to section headings. Desktop 1024px and wider only. Static and fully drawn when prefers-reduced-motion is set. aria-hidden. It is built in Phase 10.
No other scroll-triggered animation: no fade-up on every section, no hover-lift on cards. Allowed motion: menu open and close, accordions, lightbox transitions, hover colour changes. Use 150 to 250ms, animate only transform and opacity.

## 4. Site structure
Pages: /, /about, /services, /projects, /projects/[slug] (new), /gallery, /contact, privacy and terms.
Header: logo on the left; links About, Services, Projects, Gallery, Contact; emergency phone number; primary button "Request a quote". Transparent over the home hero, solid paper with a hairline after scrolling. Mobile: full-screen menu sheet, 44px targets, phone and quote button pinned at the bottom.
Home sections in this order: Hero (full viewport photo) then Stats (4, shown once) then Services (3 divider rows, each with one key spec) then Why Modes (statement plus 4 short points) then Selected projects (3 from the CMS) then Client words (2 to 3 quotes) then Quote and emergency band (ink background) then Footer.
Removed from the home page: the client-name marquee, duplicated stats, repeated phone numbers (at most 3 per page: header, emergency band, footer), repeated small labels, repeated "Explore technical scope" links.
Single sources: lib/site-config.ts (name, phone, email, address, hours, founding year 2011) and lib/site-content.ts (home copy, stats, testimonials). No hard-coded duplicates elsewhere.

## 5. Copy rules
Plain, specific, active voice. No superlatives ("premier", "flawless", "extreme"). Numbers only where the client already supplied them. Button labels: "Request a quote", "Call emergency line", "See our projects". Headings are sentences or plain noun phrases in sentence case. Errors say what happened and what to do. Empty states invite an action.

## 6. Projects and images
- Each project has its own page at /projects/[slug]. Old links of the form /projects#<uuid> must redirect to the slug page.
- Table project_images: id, project_id, url, alt, caption, kind (gallery, before or after), sort_order, width, height, blur_data_url, created_at. The cover is the image with the lowest sort_order. Keep the legacy single image column on projects in sync with the cover.
- Maximum 12 images per project. Alt text is required before a project can be published.
- Project list cards show only the cover plus a "+N photos" label.
- Project page gallery is an adaptive mosaic that opens a lightbox. Desktop layout by count: 1 image full width 16:9; 2 images two equal columns 4:3; 3 images one large (spans two rows) plus two stacked; 4 images a 2x2 grid; 5 or more images a four-column bento with one large tile (2x2) and four small tiles, the last carrying a "+N" overlay when there are more than 5. Mobile: first image full width, then a two-column grid of up to 4 more, then a "View all N photos" button.
- If a project has at least one before image and one after image, show a before/after slider (native range input, keyboard accessible, labels "Before" and "After") above the mosaic. Before and after images are not duplicated in the mosaic.
- Lightbox: keyboard arrows and Escape, focus trap and focus return, swipe on touch, caption and counter ("3 / 8"), preload neighbours, body scroll lock, load with dynamic import on first open.
- Images: next/image with correct sizes, blur placeholder, reserved aspect ratio. priority only for the first visible hero or cover image. Never request widths above 1920.

## 7. Component architecture (vercel-composition-patterns)
- Compound components with shared context for Gallery, Accordion and Nav. No boolean-prop switches: use explicit variant components (ProjectGalleryMosaic, ProjectGalleryBeforeAfter) and explicit button components.
- Context interface has state, actions and meta. The provider is the only place that knows how state is managed. Prefer children over render props. If the repo is on React 19, do not use forwardRef.
- Primitives in components/ui: Container, Section (tone: paper, surface or ink), SectionHeading, Button variants, Stat, DividerRow. Pages assemble primitives; no one-off CSS.
- Server components by default; "use client" only on interactive leaf components.

## 8. Quality floor (ui-ux-pro-max and web-design-guidelines)
- Accessibility first: contrast at least 4.5:1; visible focus ring on every interactive element (2px signal outline, 2px offset), never remove outlines; skip-to-content link; semantic landmarks; one h1 per page; links are anchors and actions are buttons; icon-only buttons have aria-label; every image has alt (decorative images use alt=""); forms have visible labels, inline errors and correct input types and autocomplete; touch targets at least 44px with at least 8px between; prefers-reduced-motion respected; no horizontal scroll at 320px; zoom never disabled.
- Performance: next/image everywhere, reserved space so layout shift stays under 0.1, fonts via next/font, AVIF and WebP, lazy loading below the fold.
- Responsive: mobile first. Test 320, 375, 768, 1024 and 1440px wide.
- Every data-driven view and form has loading, empty, error and success states.

## 9. Definition of done for a phase
Meets its goals; works at all test widths; keyboard operable; empty and error states handled; npx tsc --noEmit clean; no console errors; existing features not broken; PROGRESS.md updated; the report states what was verified and what was not.
