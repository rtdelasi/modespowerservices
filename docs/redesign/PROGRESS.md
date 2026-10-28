# Redesign Progress Tracker

## Checklist of Phases

- [x] **Phase 0**: Project setup, repo baseline audit & design tokens / architecture inventory
- [x] **Phase 1**: Primitives & typography foundation (tokens, Schibsted Grotesk font, components/ui primitives)
- [x] **Phase 2**: Navigation, header & footer redesign (single sources `lib/site-config.ts`, sticky header, mobile sheet)
- [x] **Phase 3**: Home page hero & stats row (photographic hero 100svh, site-content.ts, paper stats row, marquee removed)
- [x] **Phase 4**: Home page static half completed (`lib/services.ts`, 3 service divider rows, Why Modes, quote & emergency band)
- [x] **Phase 5**: Project multi-image schema, query helpers & Admin Projects form (`project_images` table, `slug` column & backfill, `ProjectImage` types, browser WebP/canvas resize & 16px blur placeholder, dnd-kit reordering + keyboard accessible Move up/down, cover sync, publish validation)
- [x] **Phase 6**: Project gallery building blocks (`components/projects/gallery/*`, compound `ProjectGallery.Root`/`Item`/`Mosaic`/`BeforeAfter`/`Lightbox`, adaptive layouts 1-9 images, native range input comparison, lazy lightbox dynamic import on first open, `/design-check` extension)
- [x] **Phase 7**: Projects page & `/projects/[slug]` individual case study pages (`ProjectCard`, adaptive grid 1/2/3 cols, linkable `?category=` URL-query filtering with threshold >= 4 projects and >= 2 categories, legacy `#<uuid>` hash redirect component, dynamic `/projects/[slug]` with `generateStaticParams`, Open Graph metadata, facts list omitting empty values, 2-column description/outcome blocks, site photos mosaic, adjacent project navigation, and quote band)
- [x] **Phase 8**: Home page completion (Recent projects CMS 3-card grid with "All projects" TextLink, Client words section with 3 plain quote blocks on hairline top border, strict BRIEF Section 4 section sequence, phone numbers capped at 3, logo marquee removed)
- [x] **Phase 9a**: About & Services redesign (`app/about`, `app/services`, `components/services/*`: tightened company story, single source stats, certifications list, plain team grid hiding missing fields, 5 large divider sections from `lib/services.ts` with anchor IDs, scroll-margin-top for 80px sticky header, desktop sticky index with active section tracker and keyboard operability, and quote bands)
- [x] **Phase 9b**: Gallery & Contact redesign (`app/gallery`, `app/contact`, `components/gallery/*`: responsive 2-col/3-col uniform 4:3 crop gallery, linkable `?category=` filter tabs, Phase 6 LightboxModal with non-duplicated captions, empty/error fallbacks; desktop 2-col contact layout with preserved `POST /api/contact` submission, visible labels, mobile `inputMode`, inline validation, disabled-while-sending spinner button, clear success/error/retry states, honeypot, and `lib/site-config.ts` details with "Get directions" map link)
- [ ] **Phase 10**: Reserved for subsequent phase
- [ ] **Phase 13**: The Single-Line Diagram SVG animation (desktop 1024px+, scroll-tied, reduced-motion aware)
- [ ] **Phase 14**: QA audit, accessibility compliance, performance verification, cross-breakpoint testing & final sign-off

---

## Assumptions
- Schibsted Grotesk (weights 400, 500, 600) is loaded globally with `next/font/google` and mapped as both primary `--font-sans` and `--font-display` to ensure consistent single-family typography across the site.
- Secondary text on the dark `ink` section uses `text-hairline` (#DDE2EA) or `text-surface/85` rather than `slate` (#5B6779) so that contrast ratio exceeds 12:1 (well above the 4.5:1 floor).
- Legacy component files in `components/ui/` (`Button.tsx`, `SectionHeader.tsx`, `DottedDivider.tsx`, `EyebrowTag.tsx`, `OverlappingPill.tsx`, `PairedButton.tsx`) remain in place alongside new redesign primitives to keep unredesigned pages rendering until their respective redesign phases.
- The dev-only `/design-check` route is strictly restricted to development environments and invokes `notFound()` in production.
- Phase 2: WhatsApp is not currently configured as an active communications line in the codebase, so `siteConfig.whatsapp` is declared as `null` with type `string | null` for future extension without schema breaking.
- Phase 2: Navigation state uses an IntersectionObserver sentinel (`#nav-scroll-sentinel`) anchored at the top of the document to switch header opacity on the home hero without scroll listeners. On non-home pages, the header is solid paper by default.
- Phase 3: The hero background uses the CMS-provided `hero_image_url` if set; otherwise, it falls back to a high-resolution authentic local engineering photograph (`public/images/hero-substation.jpg`).
- Phase 3: In `next.config.mjs`, image `deviceSizes` is explicitly capped at `[640, 750, 828, 1080, 1200, 1920]` to ensure no image is ever requested above 1920px.
- Phase 4: `lib/services.ts` serves as the single source of truth for the 5 engineering services with tightened non-promotional technical copy, reused on the home page and in the future Services page redesign.
- Phase 4: The home page static half renders the five primary sections: Hero, Stats row, Services divider rows, Why Modes statement and 4 points, and Quote & Emergency band.
- Phase 5: Database schema migration applied to Supabase from `supabase/migrations/20261027000000_project_images_and_slugs.sql`. Slugs generated and unique constraints enforced; `project_images` table active with RLS policies.
- Phase 6: `yet-another-react-lightbox` (~14kB gzipped) dynamically loaded on first open via `next/dynamic` (`ssr: false`), keeping initial page bundles completely free of lightbox code.
- Phase 7: `/projects` displays category filter tabs only when there are at least 4 published projects and at least 2 distinct categories. Filter state is driven by `?category=` search params for shareable URLs.
- Phase 7: Old links using `/projects#<uuid>` are resolved client-side via `ProjectHashRedirect`, replacing the URL with `/projects/[slug]` without full page reload.
- Phase 7: In `/projects/[slug]`, empty fields (e.g. client, description, outcome) are strictly omitted to maintain design integrity. Single-image projects feature a prominent cover image without redundant mosaic duplication.
- Phase 8: Home page strictly follows BRIEF Section 4 section sequence (Hero -> Stats -> Services -> Why Modes -> Selected Projects -> Client Words -> Quote & Emergency Band). Exactly 3 visible phone numbers on the entire page (header, emergency band, footer). Testimonials use plain typographic quote blocks with hairline top borders, no cards, and no decorative avatars.
- Phase 9a: About page strictly reuses `Stat` primitive with `siteContent.stats` to avoid duplicate hard-coded values; story copy is tightened to active voice; team grid omits photos or roles gracefully with top hairline alignment when missing in CMS; certifications rendered as clean hairline divider list.
- Phase 9a: Services page uses `SERVICES` from `lib/services.ts` with anchor IDs `installations`, `maintenance`, `audits`, `solutions`, `emergency`, configured with `scroll-mt-20 md:scroll-mt-24` to ensure headings clear the fixed header; desktop sticky sidebar provides keyboard-operable section index with intersection-observed active tracking.
- Phase 9b: Gallery page implements responsive 2-column mobile and 3-column desktop grid with uniform 4:3 crops; category filter tabs link seamlessly with `?category=` search params; captions are displayed only when distinct from the title (both on grid tiles and inside Phase 6 lightbox slides); `gallery_items` schema lacks blur/dimension columns so `next/image` uses responsive `sizes` with aspect ratio containment.
- Phase 9b: Contact page strictly preserves existing `POST /api/contact` JSON payload (`fullName`, `email`, `phone`, `company`, `serviceType`, `projectDetails`) and backend routing; adds visible labels, mobile `inputMode`, honeypot bot trap, inline field validation with `role="alert"`, disabled-while-sending state, clear success/error/retry messaging, and renders contact details directly from `lib/site-config.ts` while omitting any empty attributes.

---

## Open questions
- None for Phase 8.

---

## Known issues
- Playwright browser driver download returns HTTP 404 from external CDNs in this container environment, preventing automated browser subagent test runner execution. Local server HTTP compilation and rendering were validated via direct server request benchmarks (`/design-check`, `/`, `/about`, `/projects` returning 200 OK) and Next.js full static build generation (29/29 pages).

---

## Owner-confirm items
- **Home Stat (140+ MW)**: `TODO(owner-confirm)`: Confirm the "140+ MW commissioned" metric against current utility-scale and industrial commissioning logs in `lib/site-content.ts:43`.
- **Home Stat (100% Safety)**: `TODO(owner-confirm)`: Confirm the "100% safety and compliance rate" metric with internal HSE safety records in `lib/site-content.ts:50`.
- **Why Modes (Mobilization Time)**: `TODO(owner-confirm)`: Confirm the "average mobilization under 60 minutes" emergency SLA against dispatch logs in `lib/site-content.ts:70`.
- **Testimonial 1 (Nana Kwame Mensah-Bonsu)**: `TODO(owner-confirm)`: Confirm testimonial attribution and wording with Nana Kwame Mensah-Bonsu (CTO, Tema Heavy Steel Mills & Processing) in `lib/site-content.ts:106`.
- **Testimonial 2 (Victoria Afriyie-Kwarteng)**: `TODO(owner-confirm)`: Confirm testimonial attribution and metric ($4,200/mo ECG savings) with Victoria Afriyie-Kwarteng (Director of Plant Operations, Ashanti Beverage & Bottling Industries) in `lib/site-content.ts:117`.
- **Testimonial 3 (Dr. Joseph Adjei-Larbi)**: `TODO(owner-confirm)`: Confirm testimonial attribution and emergency response time (45 min) with Dr. Joseph Adjei-Larbi (Head of Facilities & Infrastructure, Ridge Specialized Healthcare Center) in `lib/site-content.ts:128`.

