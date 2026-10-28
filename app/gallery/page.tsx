import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPublishedGalleryItems } from '@/lib/supabase/queries';
import { Container, Section } from '@/components/ui';
import { GalleryDirectory } from '@/components/gallery';
import { QuoteBand } from '@/components/home/QuoteBand';

export const metadata: Metadata = {
  title: 'Gallery | Modes Power Services',
  description:
    'Verified field photography of high-voltage substation overhauls, transformer installations, thermographic scans, and commercial solar microgrids across Ghana.',
  openGraph: {
    title: 'Gallery | Modes Power Services',
    description:
      'Verified field photography of high-voltage substation overhauls, transformer installations, thermographic scans, and commercial solar microgrids across Ghana.',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Main Gallery Section */}
      <Section tone="paper" className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <Container>
          {/* Page Header in Sentence Case */}
          <header className="mb-10 md:mb-14">
            <h1 className="text-display font-semibold text-ink tracking-tight leading-[1.1]">
              Gallery
            </h1>
            <p className="text-body text-slate max-w-prose mt-3 leading-[1.6]">
              Verified field photography of high-voltage installations, predictive maintenance, power quality audits, and commercial solar projects across Ghana.
            </p>
          </header>

          {/* Gallery Directory with Linkable Category Tabs & 2-col/3-col Grid */}
          <Suspense
            fallback={
              <div className="py-20 text-center text-slate">
                Loading gallery...
              </div>
            }
          >
            <GalleryDirectory items={items} />
          </Suspense>
        </Container>
      </Section>

      {/* Quote and Emergency Band */}
      <QuoteBand />
    </div>
  );
}
