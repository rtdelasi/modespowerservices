import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and client data protection practices for Modes Power Services Ltd.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-24 sm:pt-28 md:pt-32 pb-12 max-w-[1440px] mx-auto">
      <SectionContainer theme="navy" className="text-white">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-red/20 text-brand-red border border-brand-red/30 px-3.5 py-1.5 rounded-pill text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white">
            Privacy Policy
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
              1. Information We Collect
            </h2>
            <p>
              Modes Power Services Ltd. (&quot;Modes&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy. When you request a technical consultation, site power audit, or emergency dispatch via our website, we may collect the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Full name, job title, and company/organization name.</li>
              <li>Work email address and direct telephone contact numbers.</li>
              <li>Facility address, electrical load specifications, single-line diagrams, and project scope details provided voluntarily.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-brand-navy">
              2. How We Use Your Data
            </h2>
            <p>
              All technical data and contact details submitted through our platform are utilized exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Prepare and deliver engineering proposals, bill of quantities (BOQ), and power audit reports.</li>
              <li>Coordinate rapid emergency engineering dispatch to client facilities.</li>
              <li>Comply with Energy Commission Ghana statutory regulatory documentation requirements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-brand-navy">
              3. Data Protection & Confidentiality
            </h2>
            <p>
              We treat all industrial electrical single-line diagrams, factory power telemetry, and commercial terms with strict confidentiality. We do not sell, rent, or lease client information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-brand-navy">
              4. Contact Our Data Protection Officer
            </h2>
            <p>
              For inquiries regarding data protection, please contact us at:
            </p>
            <div className="p-4 rounded-2xl bg-surface-muted border border-black/[0.06] text-xs sm:text-sm font-medium text-brand-navy">
              <p>Modes Power Services Ltd. — Data Protection</p>
              <p>{COMPANY_INFO.address}</p>
              <p>Email: {COMPANY_INFO.email}</p>
              <p>Phone: {COMPANY_INFO.phone}</p>
            </div>
          </section>
        </div>
      </SectionContainer>
    </div>
  );
}
