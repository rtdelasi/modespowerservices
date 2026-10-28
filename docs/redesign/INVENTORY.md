# Modes Power Services: Repository Architecture & Inventory

**Generated**: October 2026  
**Baseline TypeScript Compilation**: Clean (`npx tsc --noEmit` exited with code 0, 0 errors).

---

## 1. Framework & Exact Dependency Versions

Information extracted directly from `package.json` and package locks:

### Core Framework & Runtimes
- **Next.js**: `14.2.15` (App Router)
- **React**: `^18.3.1`
- **React DOM**: `^18.3.1`
- **TypeScript**: `^5.5.0`
- **Node Type Definitions**: `@types/node: ^20.14.0`
- **React Type Definitions**: `@types/react: ^18.3.3`, `@types/react-dom: ^18.3.0`

### Styling & CSS
- **Tailwind CSS**: `^3.4.14`
- **PostCSS**: `^8.4.47`
- **Autoprefixer**: `^10.4.20`
- **clsx**: `^2.1.1`
- **tailwind-merge**: `^2.5.4`

### UI & Motion
- **Framer Motion**: `^11.11.9`
- **Lucide Icons**: `lucide-react: ^0.453.0`
- **dnd-kit (Drag and drop for Admin CMS sorting)**:
  - `@dnd-kit/core`: `^6.3.1`
  - `@dnd-kit/sortable`: `^10.0.0`
  - `@dnd-kit/utilities`: `^3.2.2`

### Backend & Data Integration
- **Supabase SSR**: `@supabase/ssr: ^0.12.7`
- **Supabase JavaScript Client**: `@supabase/supabase-js: ^2.116.0`
- **Validation**: `zod: ^4.6.2`

### Linting & Tooling
- **ESLint**: `^8.57.1`
- **eslint-config-next**: `^14.2.15`

---

## 2. Router Paradigm

- **App Router**: Exclusively built using Next.js App Router (`app/` directory).
- **No Pages Router**: No `pages/` directory exists in the codebase (the tailwind config content paths mention `./pages/**/*.{...}` as standard boilerplate, but all routes live inside `app/`).

---

## 3. Repository Folder Structure

```
modespowerservices/
├── .env.example
├── .eslintrc.json
├── .gitignore
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── actions/
│   │   ├── auth.ts
│   │   ├── gallery.ts
│   │   ├── projects.ts
│   │   ├── settings.ts
│   │   └── team.ts
│   ├── admin/
│   │   ├── gallery/
│   │   │   ├── [id]/
│   │   │   ├── new/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   ├── [id]/
│   │   │   ├── new/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── team/
│   │       ├── [id]/
│   │       ├── new/
│   │       └── page.tsx
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   ├── contact/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── maintenance/
│   │   └── page.tsx
│   ├── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── robots.ts
│   ├── services/
│   │   └── page.tsx
│   ├── sitemap/
│   │   └── page.tsx
│   ├── sitemap.ts
│   └── terms-of-service/
│       └── page.tsx
├── components/
│   ├── admin/
│   │   ├── AdminHeader.tsx
│   │   ├── AdminNav.tsx
│   │   ├── ConfirmDeleteDialog.tsx
│   │   ├── DraftPublishToggle.tsx
│   │   ├── GalleryForm.tsx
│   │   ├── GalleryTable.tsx
│   │   ├── ImageUploadField.tsx
│   │   ├── MaintenanceModeCard.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectsTable.tsx
│   │   ├── SiteSettingsForm.tsx
│   │   ├── SortableRow.tsx
│   │   ├── SortableTable.tsx
│   │   ├── TeamForm.tsx
│   │   └── TeamTable.tsx
│   ├── gallery/
│   │   └── GalleryClient.tsx
│   ├── home/
│   │   ├── AboutPreview.tsx
│   │   ├── Hero.tsx
│   │   ├── LogoMarquee.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── Testimonials.tsx
│   │   └── WhyChooseUs.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── SectionContainer.tsx
│   ├── projects/
│   │   └── ProjectsClient.tsx
│   ├── shared/
│   │   ├── CTASection.tsx
│   │   ├── GradientInterstitial.tsx
│   │   ├── Lightbox.tsx
│   │   ├── ProjectCarousel.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── StatCounter.tsx
│   │   └── TeamCard.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── DottedDivider.tsx
│       ├── EyebrowTag.tsx
│       ├── ImageWithFallback.tsx
│       ├── Logo.tsx
│       ├── OverlappingPill.tsx
│       ├── PairedButton.tsx
│       └── SectionHeader.tsx
├── data/
│   ├── accordion.ts
│   ├── clients.ts
│   ├── company.ts
│   ├── gallery.ts
│   ├── projects.ts
│   ├── services.ts
│   ├── team.ts
│   └── testimonials.ts
├── docs/
│   └── redesign/
│       ├── BRIEF.md
│       ├── INVENTORY.md
│       └── PROGRESS.md
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── middleware.ts
│   │   ├── queries.ts
│   │   ├── server.ts
│   │   └── storage.ts
│   ├── utils.ts
│   └── validations/
│       ├── gallery.ts
│       ├── project.ts
│       └── team.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── public/
│   └── logos/
│       ├── modes-logo-with-tagline.png
│       └── modes-logo.png
├── supabase/
│   ├── migrations/
│   │   ├── 20260911000000_initial_cms_schema.sql
│   │   ├── 20260914000000_site_settings_and_storage.sql
│   │   └── 20260923000000_maintenance_mode.sql
│   └── seed.sql
├── tailwind.config.ts
├── tsconfig.json
└── types/
    └── index.ts
```

---

## 4. List of Pages, API Endpoints & Components

### Public Routes
1. **Home (`/`)**: `app/page.tsx` — Server component fetching `site_settings` and `projects`, rendering `Hero`, `LogoMarquee`, `AboutPreview`, `ServicesPreview`, `WhyChooseUs`, `GradientInterstitial`, `ProjectCarousel`, `Testimonials`, and `CTASection`.
2. **About (`/about`)**: `app/about/page.tsx` — Static company story, leadership team, certifications, equipment capabilities.
3. **Services (`/services`)**: `app/services/page.tsx` — Electrical services breakdown with anchor targets (`#substations`, `#maintenance`, `#audits`, `#solar`), specs, deliverables.
4. **Projects (`/projects`)**: `app/projects/page.tsx` — Server component fetching projects, rendering `ProjectsClient.tsx` with category filters and click-to-open `ProjectModal.tsx`.
5. **Gallery (`/gallery`)**: `app/gallery/page.tsx` — Server component fetching gallery items, rendering `GalleryClient.tsx` with filter tabs and `Lightbox.tsx`.
6. **Contact (`/contact`)**: `app/contact/page.tsx` — Interactive quote request form, 24/7 emergency dispatch details, Google maps placeholder, FAQ.
7. **Privacy Policy (`/privacy-policy`)**: `app/privacy-policy/page.tsx` — Legal privacy terms.
8. **Terms of Service (`/terms-of-service`)**: `app/terms-of-service/page.tsx` — Legal service terms.
9. **Maintenance (`/maintenance`)**: `app/maintenance/page.tsx` — Maintenance mode landing screen shown when site maintenance is enabled.
10. **Sitemap (`/sitemap`, `/sitemap.ts`) & Robots (`/robots.ts`)**: SEO endpoints.

### Admin Routes
1. **Admin Console (`/admin`)**: `app/admin/page.tsx` — Dashboard overview with quick stats and quick actions.
2. **Admin Login (`/admin/login`)**: `app/admin/login/page.tsx` — Email/password login with redirect support.
3. **Admin Projects (`/admin/projects`)**:
   - List & reorder: `app/admin/projects/page.tsx` (using `ProjectsTable.tsx`)
   - Create: `app/admin/projects/new/page.tsx` (using `ProjectForm.tsx`)
   - Edit: `app/admin/projects/[id]/page.tsx` (using `ProjectForm.tsx`)
4. **Admin Gallery (`/admin/gallery`)**:
   - List & reorder: `app/admin/gallery/page.tsx` (using `GalleryTable.tsx`)
   - Create: `app/admin/gallery/new/page.tsx` (using `GalleryForm.tsx`)
   - Edit: `app/admin/gallery/[id]/page.tsx` (using `GalleryForm.tsx`)
5. **Admin Team (`/admin/team`)**:
   - List & reorder: `app/admin/team/page.tsx` (using `TeamTable.tsx`)
   - Create: `app/admin/team/new/page.tsx` (using `TeamForm.tsx`)
   - Edit: `app/admin/team/[id]/page.tsx` (using `TeamForm.tsx`)
6. **Admin Site Settings (`/admin/settings`)**: `app/admin/settings/page.tsx` — Hero, about, CTA banner URLs and maintenance mode controls.

### API Routes
1. **`POST /api/contact`**: `app/api/contact/route.ts` — Receives contact form submissions, validates payload, and handles notification dispatch.
2. **`POST /api/upload`**: `app/api/upload/route.ts` — File upload route saving to Supabase Storage (if configured) or local `public/uploads/<bucket>/` fallback.

### Component Inventory
- **Layout (`components/layout/`)**:
  - `Navbar.tsx`: Sticky navbar with glass styling, dropdowns, quote CTA, emergency phone button, mobile toggle.
  - `Footer.tsx`: Comprehensive footer with service links, accreditation badges, contact info, legal links.
  - `SectionContainer.tsx`: Standard wrapper supporting `navy`, `white`, `cream` background themes.
- **UI Primitives (`components/ui/`)**:
  - `Button.tsx`: Generic button with variants (`primary`, `secondary`, `outline`, `ghost`, `emergency`).
  - `PairedButton.tsx`: Dual button group for hero CTAs.
  - `EyebrowTag.tsx`: Pill badge with icons.
  - `OverlappingPill.tsx`: Floating highlight badges.
  - `SectionHeader.tsx`: Centered or left-aligned section title with eyebrow and subtitle.
  - `DottedDivider.tsx`: Dotted accent line in red or navy.
  - `Logo.tsx`: SVG/PNG logo renderer.
  - `ImageWithFallback.tsx`: Image wrapper falling back to placeholder graphics on error.
- **Home (`components/home/`)**:
  - `Hero.tsx`: Full-bleed hero banner with stats and paired CTA.
  - `LogoMarquee.tsx`: Infinite scrolling ticker of industrial client names.
  - `AboutPreview.tsx`: Split stats + engineering philosophy section.
  - `ServicesPreview.tsx`: 3-card overview of core service pillars.
  - `WhyChooseUs.tsx`: 4-step accordion explaining engineering differentiators.
  - `Testimonials.tsx`: Client quotes and satisfaction ratings.
- **Projects & Gallery (`components/projects/`, `components/gallery/`)**:
  - `ProjectsClient.tsx`: Filterable card grid with modal trigger.
  - `GalleryClient.tsx`: Category tabbed photo grid with lightbox trigger.
- **Shared (`components/shared/`)**:
  - `CTASection.tsx`: Pre-footer banner inviting inquiries.
  - `GradientInterstitial.tsx`: High-impact text break section.
  - `Lightbox.tsx`: Full-screen image lightbox modal.
  - `ProjectCarousel.tsx`: Horizontal scrolling showcase of projects.
  - `ProjectModal.tsx`: Detailed modal showing project scope, client, outcome, and tags.
  - `StatCounter.tsx`: Animated or formatted stat number.
  - `TeamCard.tsx`: Profile card with photo, role, and credentials.
- **Admin (`components/admin/`)**:
  - `AdminHeader.tsx`, `AdminNav.tsx`, `ConfirmDeleteDialog.tsx`, `DraftPublishToggle.tsx`, `GalleryForm.tsx`, `GalleryTable.tsx`, `ImageUploadField.tsx`, `MaintenanceModeCard.tsx`, `ProjectForm.tsx`, `ProjectsTable.tsx`, `SiteSettingsForm.tsx`, `SortableRow.tsx`, `SortableTable.tsx`, `TeamForm.tsx`, `TeamTable.tsx`.

---

## 5. Supabase Integration & Data Layer

### Client Files
- `lib/supabase/client.ts`: Instantiates browser client via `@supabase/ssr` `createBrowserClient()`. Includes dummy client fallback if environment variables are not set.
- `lib/supabase/server.ts`: Instantiates server client via `@supabase/ssr` `createServerClient()` with cookie getters/setters via `next/headers`.
- `lib/supabase/middleware.ts`: Refreshes auth sessions on incoming HTTP requests, enforces route authentication for `/admin/*`, and checks database maintenance mode status.
- `lib/supabase/queries.ts`: Public data access layer with 60-second in-memory caching and fallback to static `data/*` files upon database timeout (3s) or error:
  - `getSiteSettingsQuery()`
  - `getPublishedGalleryItems()`
  - `getPublishedProjects()`
  - `getPublishedTeamMembers()`
- `lib/supabase/storage.ts`: Client upload and delete utilities:
  - `uploadImage(file, bucket, folder)`
  - `deleteStorageFile(bucket, path)`

### Tables & Columns
1. **`projects`**:
   - `id`: UUID (PK, `gen_random_uuid()`)
   - `client_name`: TEXT NOT NULL
   - `title`: TEXT NOT NULL
   - `category`: TEXT NOT NULL DEFAULT `'Industrial'`
   - `description`: TEXT NOT NULL
   - `outcome`: TEXT (nullable)
   - `cover_image_path`: TEXT (nullable)
   - `sort_order`: INTEGER NOT NULL DEFAULT 0
   - `published`: BOOLEAN NOT NULL DEFAULT false
   - `created_at`: TIMESTAMPTZ NOT NULL DEFAULT `now()`
   - `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT `now()`
   - *Current Schema Gap*: There is currently **no `slug` column** and **no `project_images` table** in the database.
2. **`gallery_items`**:
   - `id`: UUID (PK, `gen_random_uuid()`)
   - `title`: TEXT NOT NULL
   - `category`: TEXT NOT NULL (`'installations'`, `'maintenance'`, `'audits'`, `'solar_custom'`)
   - `image_path`: TEXT (nullable)
   - `alt_text`: TEXT NOT NULL DEFAULT `''`
   - `sort_order`: INTEGER NOT NULL DEFAULT 0
   - `published`: BOOLEAN NOT NULL DEFAULT false
   - `created_at`: TIMESTAMPTZ NOT NULL DEFAULT `now()`
   - `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT `now()`
3. **`team_members`**:
   - `id`: UUID (PK, `gen_random_uuid()`)
   - `name`: TEXT NOT NULL
   - `role`: TEXT NOT NULL
   - `tagline`: TEXT (nullable)
   - `bio_bullets`: TEXT[] NOT NULL DEFAULT `'{}'`
   - `photo_path`: TEXT (nullable)
   - `linkedin_url`: TEXT (nullable)
   - `sort_order`: INTEGER NOT NULL DEFAULT 0
   - `published`: BOOLEAN NOT NULL DEFAULT false
   - `created_at`: TIMESTAMPTZ NOT NULL DEFAULT `now()`
   - `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT `now()`
4. **`site_settings`** (singleton row with `id = 'default'`):
   - `id`: TEXT PRIMARY KEY DEFAULT `'default'`
   - `maintenance_mode`: BOOLEAN NOT NULL DEFAULT false
   - `hero_image_url`: TEXT (nullable)
   - `about_image_url`: TEXT (nullable)
   - `cta_image_url`: TEXT (nullable)
   - `og_image_url`: TEXT (nullable)
   - `created_at`: TIMESTAMPTZ NOT NULL DEFAULT `now()`
   - `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT `now()`

### Storage Buckets & Path Conventions
- **Configured Buckets**: `gallery`, `projects`, `team`, `media`, `settings`. All set as public buckets.
- **Upload Path Convention**:
  - File naming: `${folder ? folder + '/' : ''}${Date.now()}_${cleanFileName}.${fileExt}`
  - Public Supabase URL structure: `https://<supabase-host>/storage/v1/object/public/<bucket>/<filePath>`
  - Fallback local filesystem path: `public/uploads/<bucket>/<fileName>` served via `/uploads/<bucket>/<fileName>`.

---

## 6. Admin Routes & Authentication Pattern

- **Authentication Mechanism**: Supabase Auth using email + password sessions (`supabase.auth.signInWithPassword`).
- **Middleware Gating**:
  - Centralized in `middleware.ts` calling `updateSession()` in `lib/supabase/middleware.ts`.
  - Any request to `/admin/*` (excluding `/admin/login`) checks `supabase.auth.getUser()`. If missing or invalid, redirects to `/admin/login?redirectTo=<original_path>`.
  - Authenticated visitors navigating to `/admin/login` are automatically forwarded to `/admin`.
- **Server Actions Architecture**:
  - `app/actions/auth.ts`: `login(formData)` and `logout()`.
  - `app/actions/projects.ts`: `createProject`, `updateProject`, `deleteProject`, `toggleProjectPublish`, `reorderProjects`. Validated with Zod schemas from `lib/validations/project.ts`.
  - `app/actions/gallery.ts`: `createGalleryItem`, `updateGalleryItem`, `deleteGalleryItem`, `toggleGalleryPublish`, `reorderGalleryItems`.
  - `app/actions/team.ts`: `createTeamMember`, `updateTeamMember`, `deleteTeamMember`, `toggleTeamPublish`, `reorderTeamMembers`.
  - `app/actions/settings.ts`: `updateSiteSettings`, `toggleMaintenanceMode`.
- **Revalidation & Cache**: Actions call `clearQueryCache(...)` and Next.js `revalidatePath(...)` to purge cached static responses.

---

## 7. Row-Level Security (RLS) Policies

Defined in `supabase/migrations/`:

### Table Policies
- **`gallery_items`**:
  - `Public can view published gallery items`: FOR `SELECT` TO `anon`, `authenticated` USING `(published = true)`.
  - `Authenticated users can manage all gallery items`: FOR `ALL` TO `authenticated` USING `(true)` WITH CHECK `(true)`.
- **`projects`**:
  - `Public can view published projects`: FOR `SELECT` TO `anon`, `authenticated` USING `(published = true)`.
  - `Authenticated users can manage all projects`: FOR `ALL` TO `authenticated` USING `(true)` WITH CHECK `(true)`.
- **`team_members`**:
  - `Public can view published team members`: FOR `SELECT` TO `anon`, `authenticated` USING `(published = true)`.
  - `Authenticated users can manage all team members`: FOR `ALL` TO `authenticated` USING `(true)` WITH CHECK `(true)`.
- **`site_settings`**:
  - `Public can view site_settings`: FOR `SELECT` TO `anon`, `authenticated` USING `(true)`.
  - `Authenticated users can manage site_settings`: FOR `ALL` TO `authenticated` USING `(true)` WITH CHECK `(true)`.

### Storage Policies
- **Public Read Access**: FOR `SELECT` ON `storage.objects` TO `public` where `bucket_id` IN (`'gallery'`, `'projects'`, `'team'`, `'media'`, `'settings'`).
- **Authenticated Admin Access**: FOR `INSERT`, `UPDATE`, `DELETE` ON `storage.objects` TO `authenticated` for each bucket.

---

## 8. Next.js Config Image Settings

From `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jgxdpjkehngjfsowughx.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```
*Note for redesign*: Modern image formats (`formats: ['image/avif', 'image/webp']`) specified in Brief Section 8 are not yet declared here.

---

## 9. Fonts Currently In Use

- **`Inter`**: Loaded via `next/font/google` in `app/layout.tsx` (CSS variable `--font-sans`).
- **`Plus_Jakarta_Sans`**: Loaded via `next/font/google` in `app/layout.tsx` (weights 400, 500, 600, 700, 800; CSS variable `--font-display`).
- **Redesign Target**: Brief specifies replacing these with a single family: **Schibsted Grotesk** (weights 400, 500, 600) via `next/font/google` (`Schibsted_Grotesk`), with fluid clamp scales.

---

## 10. Current Tailwind Theme & Colour Usage

### Color Tokens in `tailwind.config.ts`:
- **`brand`**:
  - `red`: `#C8102E`
  - `red-hover`: `#A80D26`
  - `red-light`: `#FDF2F4`
  - `navy`: `#0B1E3D`
  - `navy-light`: `#122B55`
  - `navy-surface`: `#0F254A`
  - `navy-card`: `#142E59`
- **`canvas`**:
  - `cream`: `#F7F3EC`
  - `cream-dark`: `#EFE9DE`
- **`surface`**:
  - `white`: `#FFFFFF`
  - `card`: `#FFFFFF`
  - `muted`: `#F8F9FA`
  - `subtle`: `#F1F3F5`
- **`content`**:
  - `primary`: `#111827`
  - `secondary`: `#4B5563`
  - `tertiary`: `#9CA3AF`

### Border Radii & Shadows:
- Current custom radii: `card-lg: 32px`, `card-md: 24px`, `card-sm: 16px`, `pill: 9999px`.
- Current shadows: `soft-card`, `elevated-card`, `glow-red`, `glow-navy`, `nav-pill`.
- Redesign token diff: The redesign requires strictly 6 tokens (`paper: #F6F7F9`, `surface: #FFFFFF`, `ink: #0B1E3D`, `slate: #5B6779`, `hairline: #DDE2EA`, `signal: #C8102E`), 8px radius for buttons, 12px for images/media, no other rounding, no shadows except a hairline divider under sticky header and lightbox.

---

## 11. package.json Scripts

- **`dev`**: `next dev`
- **`build`**: `next build`
- **`start`**: `next start`
- **`lint`**: `next lint`

---

## 12. Baseline TypeScript Verification

Executed: `npx tsc --noEmit`  
**Result**: Clean. Zero errors, zero warnings. Exit code 0.
