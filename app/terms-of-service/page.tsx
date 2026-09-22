import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, FileText } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and Conditions governing electrical engineering services provided by Modes Power Services Ltd.',
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-24 sm:pt-28 md:pt-32 pb-12 max-w-[1440px] mx-auto">
      <SectionContainer theme="navy" className="text-white">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-red/20 text-brand-red border border-brand-red/30 px-3.5 py-1.5 rounded-pill text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Engineering Service Terms</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-neutral-300">
            Last Updated: September 2026 • Modes Power Services Ltd. (Ghana)
          </p>
        </div>
      </SectionContainer>

      <SectionContainer theme="white">
        <div className="max-w-3xl mx-auto space-y-8 text-content-secondary leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-brand-navy">
              1. Engineering Scope & Compliance
            </h2>
            <p>
              All electrical installations, substation construction, diagnostic audits, and preventative maintenance executed by Modes Power Services Ltd. adhere to the statutory regulations set forth by the Energy Commission of Ghana, the Ghana Institution of Engineering (GhIE), IEEE, and British Standard BS 7671.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-brand-navy">
              2. Quotations, Estimates & Bill of Quantities
            </h2>
            <p>
              Preliminary proposals generated via this website or phone consultations are estimates based on provided site parameters. Final contracts and warranties are governed by signed formal contracts following an on-site engineering survey and single-line schematic review.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-brand-navy">
              3. 24/7 Rapid Emergency Response SLAs
            </h2>
            <p>
              Emergency mobilization response times are subject to geographic location within Greater Accra, traffic conditions, and site accessibility. Standard contracted SLA clients receive priority dispatch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-brand-navy">
              4. Safety & Site Access Protocols
            </h2>
            <p>
              To maintain our zero-loss-time safety record, clients must ensure authorized access to electrical rooms, main distribution boards, and transformer enclosures, adhering to all Lockout/Tagout (LOTO) procedures specified by our lead site engineer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-brand-navy">
              5. Governing Law
            </h2>
            <p>
              These terms and all engineering engagements are governed by and construed in accordance with the laws of the Republic of Ghana.
            </p>
          </section>
        </div>
      </SectionContainer>
    </div>
  );
}
