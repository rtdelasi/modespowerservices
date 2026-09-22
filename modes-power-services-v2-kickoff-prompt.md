# Modes Power Services — Website Redesign Kickoff Prompt

> Paste this whole prompt into your AI coding tool (Antigravity / Windsurf / Claude Code) to begin the project. It is written as a single self-contained brief.

---

## 0. Role

You are acting as a **Senior Fullstack Developer at Apple** paired with a **Senior UI/UX Designer at Apple**, jointly responsible for shipping a marketing website. Hold the work to that bar: restrained typography, generous whitespace, physically-believable motion, pixel-precise spacing, and zero visual noise. Every screen should look like it could ship on apple.com — nothing "template-y," nothing default-Bootstrap, nothing that looks AI-generated.

## 1. Project Summary

Rebuild **Modes Power Services** (an electrical engineering company in Ghana — industrial, commercial, and residential electrical solutions) as a modern, multipage, motion-rich website. This replaces the current live site at `modespowerservices.vercel.app`. Keep the same information architecture and content categories as the current site, but elevate the visual design and interaction quality to match the reference direction described in Section 3.

## 2. Tech Stack

1. **Framework:** Next.js 14+ (App Router, TypeScript)
2. **Styling:** Tailwind CSS
3. **Motion:** Framer Motion (scroll-triggered reveals, count-up numbers, auto-cycling accordion, marquee, carousel)
4. **Icons:** lucide-react
5. **Fonts:** A clean geometric sans (e.g. Inter or General Sans) via `next/font`
6. **Forms:** Contact form should POST to an API route (stub it with a clear TODO for real email/CRM integration)
7. **Deployment target:** Vercel
8. **Images:** Use `next/image` throughout; placeholder images allowed where I haven't supplied real photography (mark clearly with a `TODO: replace image` comment)

## 3. Design Direction (reference: attached video, a family-office site)

The reference video shows a premium, "Apple product page" scroll experience. Translate its **structural and motion patterns** (not its literal content or color palette) to an electrical engineering brand. Specifically borrow:

1. **Stacked rounded-card sections** — the page sits on a soft off-white/cream page background; each major section is its own container with large rounded corners (~24–32px) that appears to slide up and "stack" over the previous section as you scroll.
2. **Floating pill navbar** — logo left, centered pill-shaped nav links (active link gets a filled pill background), a filled "Get a Free Quote" pill button on the right, sitting on top of the hero image/video with a subtle frosted/glass background.
3. **Full-bleed hero** — hero fills the rounded card edge-to-edge with a background video or high-quality photo (electrical work, substations, engineers on site, control panels), a bold two-line headline, one short supporting sentence, a primary filled pill CTA + secondary outline pill CTA, a floating glassmorphic stat badge (e.g. "500+ Projects Completed"), and a "Scroll to Explore" indicator bottom-right.
4. **Stats/about split section** — image left (with a floating glass stat card overlapping its bottom edge), heading + copy + underlined text link right, followed by a row of large **count-up animated numbers** (e.g. Years of Experience, Projects Completed, Clients Served) that animate when scrolled into view.
5. **Auto-scrolling logo marquee** — infinite horizontal scroll of client/partner logos, pausing on hover.
6. **Auto-cycling numbered accordion** — a "Why Choose Us" style list (01–04) where each row expands with a sliding highlight; the active row auto-advances every few seconds and pauses on user interaction.
7. **Horizontal case-study/project carousel** — 3 visible cards at a time (mix of logo/text cards and photo cards), a thin progress bar bottom-left, circular prev/next arrow buttons bottom-right.
8. **Full-bleed textured/gradient interstitial** — a dark, animated gradient-wave section used as a visual palate-cleanser between major sections (e.g. before "Our Approach" or "Key Strengths"), with a small eyebrow label + large centered heading.
9. **Team/leadership cards** — photo, name, title, a short italic-style tagline with a left accent border, a "LinkedIn" pill badge, and a bullet list of credentials/experience below.
10. **Full-bleed CTA banner** — a photo section with a centered heading ("Let's Power Your Next Project") and a single pill CTA.
11. **Dark rounded footer** — big rounded-top black section: tagline + CTA left, multi-column nav links + legal links + contact info center/right, logo bottom-left, "Back to top" link bottom-right.

## 4. Brand & Visual System

1. **Primary accent:** Red `#C8102E` (existing Modes Power Services brand red)
2. **Secondary/dark:** Deep navy `#0B1E3D` (existing brand navy) — use for dark sections/footer instead of pure black, to keep brand continuity
3. **Base/background:** Warm off-white/cream (e.g. `#F7F3EC`) for the page background behind the stacked cards, with pure white (`#FFFFFF`) for content-card backgrounds
4. **Typography scale:** One display weight (bold, tight tracking) for H1/H2, one regular weight for body. Keep line lengths short in hero copy.
5. **Corner radius system:** Large radius (24–32px) for section cards, medium (16px) for content cards, full/pill for buttons and nav.
6. **Iconography:** Electrical/industrial motifs (circuit lines, voltage/spark glyphs, subtle line-drawing overlays) used sparingly as background texture on dark sections — echo the "wave" texture from the reference but reinterpreted as circuit-board/energy-line patterns.

State clearly in your output if you deviate from these colors — otherwise use them exactly as specified.

## 5. Site Architecture (pages)

Match the current site's IA, restructured for the new design system:

1. **Home (`/`)** — Hero, "Why Choose Modes Power Services" (24/7 Emergency, Certified Electricians, Competitive Pricing) as the numbered auto-cycling accordion, Services preview (3 cards → link to full Services page), animated stats row, testimonials carousel, client logo marquee, full-bleed CTA banner
2. **About Us (`/about`)** — Company story, mission/values, animated stats, leadership/team cards, the dark gradient interstitial section ("Our Approach" / "Key Strengths and Principles" reframed for an EE company — e.g. Safety, Precision, Reliability, Innovation)
3. **Services (`/services`)** — Full breakdown of: Electrical Installations, Maintenance & Repairs, Power Audits, Custom Solutions, 24/7 Emergency Service. Each service gets its own anchor section (`#installations`, `#maintenance`, `#audits`, `#solutions`, `#emergency`) with icon, description, and a relevant image
4. **Gallery (`/gallery`)** — Filterable image grid of completed work (categories: Installations, Maintenance, Audits, Solar/Custom). Lightbox on click.
5. **Projects (`/projects`)** — Case-study style, using the horizontal carousel pattern from Section 3.7 — each project card links to a detail view (client, scope, outcome)
6. **Contact Us (`/contact`)** — Contact form, office address, phone numbers, email, embedded map, hours of operation
7. **Privacy Policy (`/privacy-policy`)** and **Terms of Service (`/terms-of-service`)** — simple long-form legal content pages using a clean text template
8. **Sitemap (`/sitemap`)** — simple linked list page (or generate `sitemap.xml` instead if you prefer — flag which you chose)

Shared: floating pill navbar (all pages) + dark rounded footer (all pages), matching Section 3.2 and 3.11.

## 6. Motion Rules

1. Use scroll-triggered fade/slide-up reveals (Framer Motion `whileInView`) for section content — subtle, ~400–600ms, no bounce
2. Count-up numbers animate once, when first scrolled into view
3. Logo marquee runs continuously, pauses on hover, seamless loop (duplicate the logo set, no visible seam)
4. Accordion auto-advances every ~4–5 seconds, resets its timer on manual interaction
5. Carousel is draggable/swipeable on touch, arrow-button controlled on desktop, with the progress bar reflecting position
6. Respect `prefers-reduced-motion` — disable non-essential animation for users who request it
7. No motion should block interaction or delay perceived load — content must be usable even before animations resolve

## 7. Responsiveness & Accessibility

1. Fully responsive: mobile (< 640px), tablet (640–1024px), desktop (> 1024px) — test all breakpoints
2. Mobile nav collapses to a hamburger → full-screen or slide-in menu, keeping the pill aesthetic
3. All interactive elements keyboard-navigable, visible focus states
4. Sufficient color contrast, especially white text over hero imagery (use gradient overlays where needed)
5. Semantic HTML, proper heading hierarchy, alt text on all images

## 8. Deliverables

1. Complete Next.js project structure (`app/` directory, one route per page above)
2. Shared components: `Navbar`, `Footer`, `Hero`, `StatCounter`, `LogoMarquee`, `AccordionList`, `Carousel`, `TeamCard`, `CTASection`, `Lightbox`
3. Output **complete files**, not diffs or partial snippets, for every file you touch
4. After generating each batch of files, list them explicitly so I can track what's been created

## 9. Verification Gate

Before handing anything back to me:

1. Run `npx tsc --noEmit` and resolve all type errors
2. Confirm the project builds with `next build` cleanly
3. Confirm no console errors on any route in dev mode

## 10. Manual Test Checklist (hand back to me alongside the code)

- [ ] Nav pill active-state updates correctly per route, mobile menu opens/closes
- [ ] Hero CTA buttons link to correct routes/anchors
- [ ] Stat counters animate once on scroll into view, don't re-trigger on scroll-up/down
- [ ] Logo marquee loops seamlessly with no jump/seam, pauses on hover
- [ ] Accordion auto-advances, pauses on manual click, resumes correctly
- [ ] Carousel arrows, drag/swipe, and progress bar all stay in sync
- [ ] Gallery filters and lightbox open/close correctly, keyboard-dismissible
- [ ] Contact form validates required fields and shows success/error state
- [ ] All pages responsive at 375px, 768px, 1440px widths
- [ ] `prefers-reduced-motion` disables animation correctly
- [ ] Lighthouse: performance, accessibility, SEO all green/near-green

---

**Start by scaffolding the Next.js project, the design tokens (Tailwind config: colors, radii, font), and the shared `Navbar`/`Footer` components first, then build pages in the order listed in Section 5.**
