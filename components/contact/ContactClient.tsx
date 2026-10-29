'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { siteConfig, getTelHref, getMailtoHref } from '@/lib/site-config';
import { ServiceCategorySelect } from './ServiceCategorySelect';

const SERVICE_OPTIONS = [
  'High, Medium & Low Voltage Installations',
  'Preventative Maintenance & Thermography',
  'Power Quality & Harmonic Audits',
  'Commercial Solar PV & BESS Microgrids',
  '24/7 Rapid Emergency Response',
  'General Technical Consultation',
];

const SERVICE_PARAM_MAP: Record<string, string> = {
  installations: 'High, Medium & Low Voltage Installations',
  maintenance: 'Preventative Maintenance & Thermography',
  audits: 'Power Quality & Harmonic Audits',
  solutions: 'Commercial Solar PV & BESS Microgrids',
  emergency: '24/7 Rapid Emergency Response',
  consultation: 'General Technical Consultation',
};

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  projectDetails?: string;
}

/**
 * ContactClient per Phase 9b & 11:
 * - Two columns on desktop: Form left (lg:col-span-7), Details right (lg:col-span-5)
 * - Submission mechanism & fields preserved exactly: POST /api/contact
 * - Visible labels, correct input types, inputMode & autocompletes (mobile keyboards)
 * - Inline validation near each field with role="alert"
 * - Disabled-while-sending button with spinner label
 * - Success message explaining what happens next + reference number
 * - Clear error message with retry button
 * - Hidden honeypot field (website_url)
 * - Details sourced from lib/site-config.ts with "Get directions" link
 * - Hides any contact detail that is empty
 */
export function ContactClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: SERVICE_OPTIONS[0],
    projectDetails: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    referenceNo?: string;
  } | null>(null);

  const searchParams = useSearchParams();

  // Pre-select service from URL query param if present (e.g. from /services#... "Request a quote for this")
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && SERVICE_PARAM_MAP[serviceParam]) {
      setFormData((prev) => ({
        ...prev,
        serviceType: SERVICE_PARAM_MAP[serviceParam],
      }));
    }
  }, [searchParams]);

  // Field validation rules
  const validateField = (name: string, value: string): string | undefined => {
    if (name === 'fullName') {
      if (!value || !value.trim()) return 'Please enter your full name.';
      if (value.trim().length < 2) return 'Full name must be at least 2 characters.';
    }
    if (name === 'email') {
      if (!value || !value.trim()) return 'Please enter your work email.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Please enter a valid email address (e.g. name@company.com).';
      }
    }
    if (name === 'phone') {
      if (!value || !value.trim()) return 'Please enter your phone number.';
      const digits = value.replace(/\D/g, '');
      if (digits.length < 7) {
        return 'Please enter a valid phone number with at least 7 digits.';
      }
    }
    if (name === 'serviceType') {
      if (!value || !value.trim()) return 'Please select a service category.';
    }
    if (name === 'projectDetails') {
      if (!value || !value.trim()) {
        return 'Please describe your project scope or engineering requirements.';
      }
      if (value.trim().length < 10) {
        return 'Please provide at least 10 characters describing your project.';
      }
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleServiceSelect = (val: string) => {
    setFormData((prev) => ({ ...prev, serviceType: val }));
    setTouched((prev) => ({ ...prev, serviceType: true }));
    const error = validateField('serviceType', val);
    setErrors((prev) => ({ ...prev, serviceType: error }));
  };

  const handleServiceBlur = () => {
    setTouched((prev) => ({ ...prev, serviceType: true }));
    const error = validateField('serviceType', formData.serviceType);
    setErrors((prev) => ({ ...prev, serviceType: error }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Bot detection: silent drop if honeypot is filled
    if (honeypot.trim() !== '') {
      setStatus('success');
      setStatusMessage({
        text: 'Thank you. Your consultation request has been routed to our Lead Electrical Engineer.',
        referenceNo: 'MPS-782910',
      });
      return;
    }

    // Validate all required fields
    const newErrors: FormErrors = {};
    const fieldsToValidate = ['fullName', 'email', 'phone', 'serviceType', 'projectDetails'] as const;

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      company: true,
      serviceType: true,
      projectDetails: true,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first error field for screen readers / keyboard accessibility
      const firstField = Object.keys(newErrors)[0];
      const el = document.getElementById(firstField);
      if (el) el.focus();
      return;
    }

    setStatus('submitting');
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage({
          text: data.message || 'Consultation request received.',
          referenceNo: data.referenceNo,
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          serviceType: SERVICE_OPTIONS[0],
          projectDetails: '',
        });
        setErrors({});
        setTouched({});
      } else {
        setStatus('error');
        setStatusMessage({
          text:
            data.error ||
            'Failed to submit form. Please verify your entries or call our office.',
        });
      }
    } catch {
      setStatus('error');
      setStatusMessage({
        text: 'Network error. Please verify your connection or try again. You can also reach our engineering desk directly by phone.',
      });
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setStatusMessage(null);
    setErrors({});
    setTouched({});
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Section tone="paper" className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <Container>
          {/* Page Header in Sentence Case */}
          <header className="mb-10 md:mb-14">
            <h1 className="text-display font-semibold text-ink tracking-tight leading-[1.1]">
              Contact
            </h1>
            <p className="text-body text-slate max-w-prose mt-3 leading-[1.6]">
              Request a technical consultation, detailed project quotation, or emergency engineering dispatch in Ghana.
            </p>
          </header>

          {/* Desktop 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form Left (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-surface border border-hairline rounded-media p-6 sm:p-8 md:p-10">
              {status === 'success' ? (
                /* Success Message: Explains what happens next & reference number */
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-button bg-signal/10 text-signal flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-h3 font-semibold text-ink">
                        Inquiry received
                      </h2>
                      <p className="text-body text-slate mt-2 leading-[1.6]">
                        {statusMessage?.text}
                      </p>
                      {statusMessage?.referenceNo && (
                        <p className="text-small font-mono text-ink mt-3 p-3 bg-paper border border-hairline rounded-button">
                          Tracking reference number:{' '}
                          <strong className="text-signal font-semibold">
                            {statusMessage.referenceNo}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-hairline pt-6">
                    <h3 className="text-small font-semibold text-ink">
                      What happens next?
                    </h3>
                    <p className="text-body text-slate mt-1 leading-[1.6]">
                      A senior power systems engineer will review your project parameters, single-line requirements, and timeline. We will contact you within 24 business hours.
                    </p>
                    {siteConfig.phone && (
                      <p className="text-caption text-slate mt-2">
                        For immediate dispatch on critical outages, please call our 24/7 hotline directly at{' '}
                        <a
                          href={getTelHref(siteConfig.phone)}
                          className="text-signal font-mono font-semibold hover:underline"
                        >
                          {siteConfig.phone}
                        </a>
                        .
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-button bg-ink hover:bg-ink/90 text-surface px-5 py-2.5 text-small font-semibold transition-colors cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h2 className="text-h3 font-semibold text-ink">
                      Request a technical consultation
                    </h2>
                    <p className="text-small text-slate mt-1">
                      Complete the engineering details below. All fields marked with an asterisk (<span className="text-signal">*</span>) are required.
                    </p>
                  </div>

                  {/* Submission Error Banner with Retry */}
                  {status === 'error' && (
                    <div
                      role="alert"
                      className="p-4 rounded-button bg-signal/10 border border-signal/20 text-ink flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-small leading-relaxed">
                          {statusMessage?.text}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSubmit()}
                        className="text-small font-semibold text-signal hover:underline shrink-0 cursor-pointer self-center"
                      >
                        Try again
                      </button>
                    </div>
                  )}

                  {/* Honeypot field (hidden from screen readers & visual users) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="website_url">Do not fill this field</label>
                    <input
                      type="text"
                      id="website_url"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Full Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-small font-medium text-ink mb-1.5"
                      >
                        Full name <span className="text-signal" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        placeholder="e.g. Ing. Kwame Mensah"
                        className={`w-full px-3.5 py-2.5 rounded-button bg-surface border text-ink placeholder:text-slate/50 text-body focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-colors ${
                          errors.fullName ? 'border-signal' : 'border-hairline'
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          id="fullName-error"
                          role="alert"
                          className="text-caption text-signal mt-1 font-medium"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-small font-medium text-ink mb-1.5"
                      >
                        Work email <span className="text-signal" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        placeholder="name@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-button bg-surface border text-ink placeholder:text-slate/50 text-body focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-colors ${
                          errors.email ? 'border-signal' : 'border-hairline'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          role="alert"
                          className="text-caption text-signal mt-1 font-medium"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone Number & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-small font-medium text-ink mb-1.5"
                      >
                        Phone number <span className="text-signal" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        placeholder="+233 (0) 24 123 4567"
                        className={`w-full px-3.5 py-2.5 rounded-button bg-surface border text-ink placeholder:text-slate/50 text-body font-mono focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-colors ${
                          errors.phone ? 'border-signal' : 'border-hairline'
                        }`}
                      />
                      {errors.phone && (
                        <p
                          id="phone-error"
                          role="alert"
                          className="text-caption text-signal mt-1 font-medium"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Company / Institution (Optional) */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-small font-medium text-ink mb-1.5"
                      >
                        Company or organization <span className="text-slate font-normal">(optional)</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Accra Logistics Ltd."
                        className="w-full px-3.5 py-2.5 rounded-button bg-surface border border-hairline text-ink placeholder:text-slate/50 text-body focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Type Selection */}
                  <div>
                    <label
                      htmlFor="serviceType"
                      className="block text-small font-medium text-ink mb-1.5"
                    >
                      Service category <span className="text-signal" aria-hidden="true">*</span>
                    </label>
                    <ServiceCategorySelect
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      options={SERVICE_OPTIONS}
                      onChange={handleServiceSelect}
                      onBlur={handleServiceBlur}
                      error={errors.serviceType}
                      aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
                    />
                    {errors.serviceType && (
                      <p
                        id="serviceType-error"
                        role="alert"
                        className="text-caption text-signal mt-1 font-medium"
                      >
                        {errors.serviceType}
                      </p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="projectDetails"
                      className="block text-small font-medium text-ink mb-1.5"
                    >
                      Project scope and technical details <span className="text-signal" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="projectDetails"
                      name="projectDetails"
                      required
                      rows={5}
                      value={formData.projectDetails}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.projectDetails)}
                      aria-describedby={errors.projectDetails ? 'projectDetails-error' : undefined}
                      placeholder="Describe your site location, connected load (kVA/MW), current voltage level, project timeline, and specific engineering requirements…"
                      className={`w-full px-3.5 py-2.5 rounded-button bg-surface border text-ink placeholder:text-slate/50 text-body focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-colors ${
                        errors.projectDetails ? 'border-signal' : 'border-hairline'
                      }`}
                    />
                    {errors.projectDetails && (
                      <p
                        id="projectDetails-error"
                        role="alert"
                        className="text-caption text-signal mt-1 font-medium"
                      >
                        {errors.projectDetails}
                      </p>
                    )}
                  </div>

                  {/* Submit Button with Disabled-While-Sending Spinner Label */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-button bg-signal hover:bg-signal/90 disabled:opacity-60 text-white px-7 py-3 text-body font-semibold transition-colors cursor-pointer select-none"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
                          <span>Sending consultation request…</span>
                        </>
                      ) : (
                        <span>Submit consultation request</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Details Right (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* 24/7 Emergency Dispatch Card */}
              {siteConfig.phone && (
                <div className="bg-ink text-surface border border-hairline rounded-media p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-signal shrink-0" aria-hidden="true" />
                    <span className="text-caption uppercase tracking-wider text-signal font-semibold">
                      24/7 Emergency Dispatch
                    </span>
                  </div>

                  <p className="text-small text-hairline/90 leading-relaxed">
                    For active industrial power outages, transformer trips, or hazardous high-voltage faults in Greater Accra:
                  </p>

                  <div className="pt-1">
                    <a
                      href={getTelHref(siteConfig.phone)}
                      className="inline-block text-h3 sm:text-h2 font-mono font-bold text-white hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-signal rounded-sm"
                      aria-label={`Call 24/7 emergency hotline: ${siteConfig.phone}`}
                    >
                      {siteConfig.phone}
                    </a>
                  </div>

                  {siteConfig.hours?.emergency && (
                    <p className="text-caption text-hairline/70">
                      {siteConfig.hours.emergency}
                    </p>
                  )}
                </div>
              )}

              {/* Head Office Coordinates Card */}
              <div className="bg-surface border border-hairline rounded-media p-6 sm:p-7 space-y-6">
                <div>
                  <h2 className="text-h3 font-semibold text-ink">
                    Accra head office
                  </h2>
                  <p className="text-caption text-slate mt-0.5">
                    Central engineering office and technical workshop
                  </p>
                </div>

                <div className="space-y-5 text-body">
                  {/* Physical Address + Get Directions Link */}
                  {siteConfig.address && (
                    <div>
                      <span className="text-caption uppercase tracking-wider text-slate font-medium block">
                        Head office address
                      </span>
                      <p className="text-body text-ink mt-0.5">
                        {siteConfig.address}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <a
                          href={siteConfig.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-signal hover:underline text-small font-medium inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-signal rounded-sm"
                        >
                          <span>Get directions</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>

                      {/* Embedded Google Map */}
                      {siteConfig.mapEmbedUrl && (
                        <div className="mt-3.5 w-full aspect-[4/3] sm:aspect-[16/9] rounded-media overflow-hidden border border-hairline bg-surface">
                          <iframe
                            src={siteConfig.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="Modes Power Services head office location"
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Main Office Line */}
                  {siteConfig.phone && (
                    <div>
                      <span className="text-caption uppercase tracking-wider text-slate font-medium block">
                        Main office line
                      </span>
                      <a
                        href={getTelHref(siteConfig.phone)}
                        className="text-body font-mono text-ink hover:text-signal hover:underline mt-0.5 inline-block focus-visible:outline-2 focus-visible:outline-signal rounded-sm"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  )}

                  {/* Email Address */}
                  {siteConfig.email && (
                    <div>
                      <span className="text-caption uppercase tracking-wider text-slate font-medium block">
                        Direct email
                      </span>
                      <a
                        href={getMailtoHref(siteConfig.email)}
                        className="text-body text-ink hover:text-signal hover:underline mt-0.5 inline-block focus-visible:outline-2 focus-visible:outline-signal rounded-sm"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  )}

                  {/* Operating Hours */}
                  {siteConfig.hours?.office && (
                    <div>
                      <span className="text-caption uppercase tracking-wider text-slate font-medium block">
                        Office hours
                      </span>
                      <p className="text-body text-ink mt-0.5">
                        {siteConfig.hours.office}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default ContactClient;
