import React from 'react';
import { Hero } from '@/components/home/Hero';
import { LogoMarquee } from '@/components/home/LogoMarquee';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ProjectCarousel } from '@/components/shared/ProjectCarousel';
import { Testimonials } from '@/components/home/Testimonials';
import { GradientInterstitial } from '@/components/shared/GradientInterstitial';
import { CTASection } from '@/components/shared/CTASection';
import { getSiteSettingsQuery } from '@/lib/supabase/queries';

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getSiteSettingsQuery();

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pb-6">
      {/* 1. Full-Bleed Hero */}
      <Hero heroImage={settings.hero_image_url} />

      {/* 2. Client Logo Marquee */}
      <LogoMarquee />

      {/* 3. Stats & About Split Section */}
      <AboutPreview aboutImage={settings.about_image_url} />

      {/* 4. Services Preview (3 Cards) */}
      <ServicesPreview />

      {/* 5. Why Choose Modes (Auto-cycling Numbered Accordion 01-04) */}
      <WhyChooseUs />

      {/* 6. Interstitial Palate Cleanser */}
      <GradientInterstitial
        eyebrow="Proven Industrial Engineering"
        headline="Power Systems Engineered For Extreme Reliability."
        highlightText="Zero Downtime."
        subtext="From 33kV substations to high-efficiency solar microgrids, we deliver end-to-end turnkey electrical infrastructure across Ghana."
      />

      {/* 7. Horizontal Case Study Carousel */}
      <ProjectCarousel />

      {/* 8. Client Testimonials */}
      <Testimonials />

      {/* 9. Full-Bleed CTA Banner */}
      <CTASection
        title="Ready To Power Your Facility With Flawless Reliability?"
        subtitle="Consult directly with our Class-A certified senior electrical engineers for a comprehensive site assessment, power quality audit, or substation quote."
        buttonText="Request a Technical Consultation"
        buttonHref="/contact"
        image={settings.cta_image_url}
      />
    </div>
  );
}
