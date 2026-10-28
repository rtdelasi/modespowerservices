import React from 'react';
import { notFound } from 'next/navigation';
import {
  Container,
  Section,
  SectionHeading,
  PrimaryButton,
  SecondaryButton,
  TextLink,
  Stat,
  DividerRow,
} from '@/components/ui';
import {
  ProjectGallery,
  ProjectGalleryBeforeAfter,
} from '@/components/projects/gallery';
import {
  SAMPLES_COUNT_1,
  SAMPLES_COUNT_2,
  SAMPLES_COUNT_3,
  SAMPLES_COUNT_4,
  SAMPLES_COUNT_5,
  SAMPLES_COUNT_9,
  SAMPLE_BEFORE_AFTER_IMAGES,
  SAMPLE_ZERO_IMAGES,
} from './gallery-samples';

export const metadata = {
  title: 'Design System Primitives Check | Modes Power Services',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignCheckPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div className="w-full flex flex-col">
      {/* 1. PAPER SECTION (Default page background #F6F7F9) */}
      <Section tone="paper" id="check-paper">
        <Container>
          <div className="inline-block px-3 py-1 mb-6 text-small font-medium bg-hairline text-slate rounded-[8px]">
            Tone: Paper (#F6F7F9)
          </div>

          <SectionHeading
            as="h1"
            tone="paper"
            title="Design system primitives on paper tone"
            description="Testing font fluid scaling, Schibsted Grotesk weights 400/500/600, tabular numerals, line length capped at 68ch, and 1.1 line-height for headings."
          />

          {/* Buttons & Links on Paper */}
          <div className="space-y-4 mb-14">
            <h3 className="text-h3 font-semibold text-ink">Action primitives</h3>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton>Primary button</PrimaryButton>
              <PrimaryButton href="#check-surface">Primary link (href)</PrimaryButton>
              <SecondaryButton>Secondary button</SecondaryButton>
              <SecondaryButton href="#check-ink">Secondary link (href)</SecondaryButton>
              <TextLink href="#check-paper">Text link with underline</TextLink>
              <PrimaryButton disabled>Disabled primary</PrimaryButton>
              <SecondaryButton disabled>Disabled secondary</SecondaryButton>
            </div>
          </div>

          {/* Stats on Paper */}
          <div className="space-y-4 mb-14">
            <h3 className="text-h3 font-semibold text-ink">Stats with tabular numerals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <Stat
                tone="paper"
                value="15+"
                label="Years of excellence"
                description="Power infrastructure energized across West Africa since 2011."
              />
              <Stat
                tone="paper"
                value="520+"
                label="Projects delivered"
                description="Substations, solar microgrids, and industrial facilities."
              />
              <Stat
                tone="paper"
                value="140+"
                label="Megawatts commissioned"
                description="Documented 99.98% reliability under utility fluctuation."
              />
              <Stat
                tone="paper"
                value="100%"
                label="Safety compliance"
                description="Zero loss-time injury on high-voltage engineering sites."
              />
            </div>
          </div>

          {/* Divider Rows on Paper */}
          <div className="space-y-4">
            <h3 className="text-h3 font-semibold text-ink">Divider rows (lists instead of cards)</h3>
            <div className="space-y-0">
              <DividerRow tone="paper">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-body font-semibold text-ink">High-voltage substation engineering</h4>
                    <p className="text-small text-slate">Turnkey 33kV/11kV transformer installation, vacuum switchgear, and protection relays.</p>
                  </div>
                  <div className="tabular-nums text-small font-medium text-slate">Up to 33,000 V</div>
                </div>
              </DividerRow>
              <DividerRow tone="paper">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-body font-semibold text-ink">Power quality & harmonic compliance audits</h4>
                    <p className="text-small text-slate">7-day continuous logging to IEEE 519 standards and detuned power factor correction.</p>
                  </div>
                  <div className="tabular-nums text-small font-medium text-slate">Class-A IEC 61000-4-30</div>
                </div>
              </DividerRow>
              <DividerRow tone="paper">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-body font-semibold text-ink">24/7 emergency response & cable fault location</h4>
                    <p className="text-small text-slate">Time-domain reflectometry (TDR) and underground cable jointing within 2 hours.</p>
                  </div>
                  <div className="tabular-nums text-small font-medium text-slate">Sub-120 min dispatch</div>
                </div>
              </DividerRow>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. SURFACE SECTION (#FFFFFF raised / white background) */}
      <Section tone="surface" id="check-surface">
        <Container>
          <div className="inline-block px-3 py-1 mb-6 text-small font-medium bg-paper border border-hairline text-slate rounded-[8px]">
            Tone: Surface (#FFFFFF)
          </div>

          <SectionHeading
            as="h2"
            tone="surface"
            title="Primitives on pure surface background"
            description="Testing contrast against clean white forms and cards, 8px radius buttons, 44px min touch targets, and input focus rings."
          />

          {/* Form & Focus ring check */}
          <div className="max-w-[68ch] space-y-4 mb-12 p-6 md:p-8 rounded-[12px] border border-hairline bg-surface">
            <h3 className="text-h3 font-semibold text-ink">Accessible form input focus check</h3>
            <p className="text-small text-slate">
              Press Tab to verify the 2px signal red (#C8102E) outline with 2px offset on all interactive elements.
            </p>
            <div className="space-y-3">
              <label htmlFor="test-input" className="block text-small font-medium text-ink">
                Test input field
              </label>
              <input
                id="test-input"
                type="text"
                placeholder="Click or Tab here to test :focus-visible ring"
                className="w-full px-4 py-2.5 rounded-[8px] border border-hairline bg-paper text-body text-ink placeholder:text-slate/60 min-h-[44px]"
              />
            </div>
            <div className="pt-2 flex flex-wrap gap-4">
              <PrimaryButton type="button">Submit test</PrimaryButton>
              <SecondaryButton type="button">Cancel</SecondaryButton>
            </div>
          </div>

          {/* Divider rows on Surface */}
          <div className="space-y-0">
            <DividerRow tone="surface">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="text-body font-medium text-ink">Commercial rooftop solar PV arrays</span>
                <span className="tabular-nums text-small text-slate">100 kWp to 2.5 MWp</span>
              </div>
            </DividerRow>
            <DividerRow tone="surface">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="text-body font-medium text-ink">Battery energy storage systems (BESS)</span>
                <span className="tabular-nums text-small text-slate">500 kWh to 4 MWh</span>
              </div>
            </DividerRow>
          </div>
        </Container>
      </Section>

      {/* 3. INK SECTION (#0B1E3D brand navy / dark background) */}
      <Section tone="ink" id="check-ink">
        <Container>
          <div className="inline-block px-3 py-1 mb-6 text-small font-medium bg-white/10 text-hairline rounded-[8px]">
            Tone: Ink (#0B1E3D)
          </div>

          <SectionHeading
            as="h2"
            tone="ink"
            title="Primitives on dark ink background"
            description="Testing dark section typography contrast, hairline borders, and buttons with onDark styling for guaranteed 4.5:1 WCAG compliance."
          />

          {/* Buttons on Dark */}
          <div className="space-y-4 mb-14">
            <h3 className="text-h3 font-semibold text-surface">Action primitives on dark</h3>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton>Request a quote</PrimaryButton>
              <SecondaryButton onDark>Call emergency line</SecondaryButton>
              <TextLink onDark href="#check-paper">Return to top</TextLink>
              <SecondaryButton onDark disabled>Disabled on dark</SecondaryButton>
            </div>
          </div>

          {/* Stats on Dark */}
          <div className="space-y-4 mb-14">
            <h3 className="text-h3 font-semibold text-surface">Stats on dark tone</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <Stat
                tone="ink"
                value="24/7"
                label="Rapid emergency line"
                description="Immediate response dispatch for industrial grid dropouts."
              />
              <Stat
                tone="ink"
                value="Class A"
                label="Energy Commission certified"
                description="Highest electrical contractor grading under Ghana law."
              />
              <Stat
                tone="ink"
                value="< 0.1"
                label="Layout shift target"
                description="Reserved aspect ratios across all technical imagery."
              />
              <Stat
                tone="ink"
                value="4.5 : 1"
                label="Accessible contrast floor"
                description="Full WCAG AA text compliance across all viewport sizes."
              />
            </div>
          </div>

          {/* Divider Rows on Dark */}
          <div className="space-y-0">
            <DividerRow tone="ink">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="text-body font-medium text-surface">ISO 45001 Occupational health & safety</span>
                <span className="tabular-nums text-small text-hairline/80">Certified auditor grade</span>
              </div>
            </DividerRow>
            <DividerRow tone="ink">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="text-body font-medium text-surface">Ghana Institution of Engineering (GhIE)</span>
                <span className="tabular-nums text-small text-hairline/80">Fellow & Corporate Member</span>
              </div>
            </DividerRow>
          </div>
        </Container>
      </Section>

      {/* 4. PROJECT GALLERY BUILDING BLOCKS (Phase 6) */}
      <Section tone="paper" id="check-gallery">
        <Container>
          <div className="inline-block px-3 py-1 mb-6 text-small font-medium bg-hairline text-slate rounded-[8px]">
            Phase 6: Project Gallery Building Blocks
          </div>

          <SectionHeading
            as="h2"
            tone="paper"
            title="Adaptive mosaic layouts & accessible controls"
            description="Testing dynamic bento mosaics (1, 2, 3, 4, 5, 9 images), interactive before/after range comparison, lazy lightbox loading, and zero-image state."
          />

          {/* Before & After Slider */}
          <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-2">
              <h3 className="text-h3 font-semibold text-ink">
                ProjectGalleryBeforeAfter component
              </h3>
              <span className="text-small text-slate">
                Native range input, keyboard Left/Right arrows, 44px handle target
              </span>
            </div>
            <p className="text-small text-slate max-w-[68ch]">
              Pairs the first &apos;before&apos; image with the first &apos;after&apos; image. Drag the slider or focus and use keyboard arrows to adjust comparison split.
            </p>
            <div className="max-w-4xl">
              <ProjectGalleryBeforeAfter
                images={SAMPLE_BEFORE_AFTER_IMAGES}
                projectTitle="Tema Industrial 33kV Substation Overhaul"
              />
            </div>
          </div>

          {/* 1 Image Layout */}
          <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-2">
              <h3 className="text-h3 font-semibold text-ink">
                1 image: Full width 16:9
              </h3>
              <span className="text-small text-slate">Desktop & mobile 16:9 ratio</span>
            </div>
            <div className="max-w-4xl">
              <ProjectGallery.Root images={SAMPLES_COUNT_1} projectTitle="Substation Overhaul">
                <ProjectGallery.Mosaic />
                <ProjectGallery.Lightbox />
              </ProjectGallery.Root>
            </div>
          </div>

          {/* 2 Images Layout */}
          <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-2">
              <h3 className="text-h3 font-semibold text-ink">
                2 images: Two equal columns 4:3
              </h3>
              <span className="text-small text-slate">Two columns 4:3 desktop, stacked mobile</span>
            </div>
            <div className="max-w-4xl">
              <ProjectGallery.Root images={SAMPLES_COUNT_2} projectTitle="Switchgear Lineup">
                <ProjectGallery.Mosaic />
                <ProjectGallery.Lightbox />
              </ProjectGallery.Root>
            </div>
          </div>

          {/* 3 Images Layout */}
          <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-2">
              <h3 className="text-h3 font-semibold text-ink">
                3 images: One large spans two rows + two stacked
              </h3>
              <span className="text-small text-slate">Desktop 3-column bento, mobile 1 full + 2-col</span>
            </div>
            <div className="max-w-4xl">
              <ProjectGallery.Root images={SAMPLES_COUNT_3} projectTitle="Cable Reticulation & Jointing">
                <ProjectGallery.Mosaic />
                <ProjectGallery.Lightbox />
              </ProjectGallery.Root>
            </div>
          </div>

          {/* 4 Images Layout */}
          <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-2">
              <h3 className="text-h3 font-semibold text-ink">
                4 images: 2x2 grid
              </h3>
              <span className="text-small text-slate">Desktop 2x2 equal grid</span>
            </div>
            <div className="max-w-4xl">
              <ProjectGallery.Root images={SAMPLES_COUNT_4} projectTitle="Capacitor Bank Installation">
                <ProjectGallery.Mosaic />
                <ProjectGallery.Lightbox />
              </ProjectGallery.Root>
            </div>
          </div>

          {/* 5 Images Layout */}
          <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-2">
              <h3 className="text-h3 font-semibold text-ink">
                5 images: Four-column bento (1 large 2x2 + 4 small 1x1)
              </h3>
              <span className="text-small text-slate">Desktop 4-column bento layout</span>
            </div>
            <div className="max-w-4xl">
              <ProjectGallery.Root images={SAMPLES_COUNT_5} projectTitle="Thermal Busbar Audit">
                <ProjectGallery.Mosaic />
                <ProjectGallery.Lightbox />
              </ProjectGallery.Root>
            </div>
          </div>

          {/* 9 Images Layout with +N */}
          <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-2">
              <h3 className="text-h3 font-semibold text-ink">
                9 images: Bento with &quot;+4&quot; overlay on last tile
              </h3>
              <span className="text-small text-slate">5 tiles visible, &quot;+4 photos&quot; overlay, mobile view all button</span>
            </div>
            <div className="max-w-4xl">
              <ProjectGallery.Root images={SAMPLES_COUNT_9} projectTitle="Turnkey Substation Commissioning">
                <ProjectGallery.Mosaic />
                <ProjectGallery.Lightbox />
              </ProjectGallery.Root>
            </div>
          </div>

          {/* Zero-Image State Verification */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-2">
              <h3 className="text-h3 font-semibold text-ink">
                Zero-image state verification
              </h3>
              <span className="text-small text-slate">Renders null (strictly nothing, not an empty box)</span>
            </div>
            <p className="text-small text-slate max-w-[68ch]">
              Both ProjectGallery.Mosaic and ProjectGalleryBeforeAfter return null when images array is empty. The dashed container below contains both components rendered with empty arrays:
            </p>
            <div className="p-4 rounded-[8px] border border-dashed border-slate/30 bg-white/40">
              <span className="text-xs font-mono text-slate block mb-2">
                [Container start]
              </span>
              {/* Zero-state components should produce 0 DOM elements */}
              <ProjectGallery.Root images={SAMPLE_ZERO_IMAGES} projectTitle="Zero Image Project">
                <ProjectGallery.Mosaic />
                <ProjectGallery.Lightbox />
              </ProjectGallery.Root>
              <ProjectGalleryBeforeAfter images={SAMPLE_ZERO_IMAGES} />
              <span className="text-xs font-mono text-slate block mt-2">
                [Container end - cleanly empty between markers]
              </span>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

