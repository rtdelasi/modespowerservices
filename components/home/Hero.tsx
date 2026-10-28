'use client';

import React from 'react';
import Image from 'next/image';
import { siteConfig, getTelHref } from '@/lib/site-config';
import { siteContent } from '@/lib/site-content';
import { Container } from '@/components/ui/Container';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { TextLink } from '@/components/ui/TextLink';

export interface HeroProps {
  heroImage?: string | null;
}

/**
 * Photographic Hero per BRIEF Section 2 & 4 and Phase 3
 * - Full-viewport photographic hero (minimum height 100svh, at least 600px)
 * - Photo from existing CMS settings with high-res default fallback
 * - next/image fill with priority, sizes="100vw", object-cover
 * - One bottom-left scrim gradient only for legibility
 * - Left-aligned text: h1, sub, PrimaryButton, TextLink
 * - Bottom edge: three plain facts in a row (no floating cards, no badge pills, no scroll cues, no dots)
 */
export function Hero({ heroImage }: HeroProps = {}) {
  const heroSrc =
    heroImage && heroImage.trim() !== '' && !heroImage.includes('unsplash.com')
      ? heroImage
      : siteContent.hero.defaultImage;

  return (
    <section id="hero" className="relative w-full min-h-[100svh] min-h-[600px] flex flex-col justify-between overflow-hidden bg-ink select-none">
      {/* Photographic background with next/image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroSrc}
          alt="Modes Power Services — High-voltage electrical substation engineering"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Single bottom-left scrim for legibility (BRIEF Section 2 & Task 2) */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent sm:bg-gradient-to-tr sm:from-ink/95 sm:via-ink/45 sm:to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Hero Content Container */}
      <Container className="relative z-20 flex-1 flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8">
        {/* Center / Mid-aligned Main Text Block */}
        <div className="my-auto py-8 sm:py-12 max-w-3xl text-left">
          <h1 className="font-display font-semibold text-display text-white tracking-tight leading-[1.1] text-balance">
            {siteContent.hero.headline}
          </h1>

          <p className="text-body md:text-xl text-surface/90 font-normal leading-[1.6] max-w-2xl mt-4 sm:mt-5 text-balance">
            {siteContent.hero.sub}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <PrimaryButton href={siteContent.hero.primaryCta.href}>
              {siteContent.hero.primaryCta.label}
            </PrimaryButton>

            <TextLink
              href={siteContent.hero.secondaryCta.href}
              onDark
              className="text-surface hover:text-white font-medium"
            >
              {siteContent.hero.secondaryCta.label}
            </TextLink>
          </div>
        </div>

        {/* Bottom edge: Three plain facts in a row (no floating cards, no badge pills, no scroll cues, no dots) */}
        <div className="pt-6 sm:pt-8 border-t border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 text-small text-surface/85">
            <div>{siteContent.hero.bottomFacts.contractor}</div>
            <div>{siteContent.hero.bottomFacts.experience}</div>
            <div>
              <a
                href={getTelHref(siteConfig.phone)}
                className="text-signal hover:underline font-medium focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded-sm"
                aria-label="Call 24/7 emergency line"
              >
                24/7 emergency line
              </a>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
