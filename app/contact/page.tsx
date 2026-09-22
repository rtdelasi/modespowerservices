'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Send,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Loader2,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EyebrowTag } from '@/components/ui/EyebrowTag';
import { DottedDivider } from '@/components/ui/DottedDivider';
import { OverlappingPill } from '@/components/ui/OverlappingPill';
import { COMPANY_INFO } from '@/data/company';
import { Logo } from '@/components/ui/Logo';

const SERVICE_OPTIONS = [
  'High, Medium & Low Voltage Installations',
  'Preventative Maintenance & Thermography',
  'Power Quality & Harmonic Audits',
  'Commercial Solar PV & BESS Microgrids',
  '24/7 Rapid Emergency Response',
  'General Technical Consultation',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: SERVICE_OPTIONS[0],
    projectDetails: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    refNo?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: data.message,
          refNo: data.referenceNo,
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          serviceType: SERVICE_OPTIONS[0],
          projectDetails: '',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to submit form. Please check your entries or call our office.',
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Network error. Please verify your connection or contact us directly by phone.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-24 sm:pt-28 md:pt-32 pb-6">
      {/* 1. Hero */}
      <SectionContainer theme="navy" className="text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          <EyebrowTag theme="white" icon={<Zap className="w-3.5 h-3.5" />}>
            Consult With Master Electrical Engineers
          </EyebrowTag>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-white">
            Let’s Power Your Next Project.
          </h1>

          <DottedDivider theme="red" align="left" count={8} className="py-1" />

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Whether you require an industrial substation overhaul, power quality audit, commercial solar microgrid, or immediate 24/7 emergency dispatch in Greater Accra, we are ready to assist.
          </p>
        </div>
      </SectionContainer>

      {/* 2. Contact Split Section */}
      <SectionContainer theme="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Form Left */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader
              eyebrow="Direct Technical Inquiry"
              eyebrowIcon={<Mail className="w-3.5 h-3.5" />}
              title="Request a Technical Consultation or Quote"
              subtitle="Fill in the details below. A senior power systems engineer will review your project parameters and respond within 24 hours."
              theme="light"
            />

            {/* Status Messages */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{statusMessage.text}</p>
                  {statusMessage.refNo && (
                    <p className="text-xs font-mono text-emerald-700">
                      Tracking Reference Number: <strong>{statusMessage.refNo}</strong>
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold text-brand-navy uppercase tracking-wider block">
                    Full Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ing. Kwame Mensah"
                    className="w-full px-4 py-3 rounded-xl bg-surface-muted border border-black/[0.06] focus:border-brand-red focus:bg-white focus:outline-none text-sm text-brand-navy transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-brand-navy uppercase tracking-wider block">
                    Work Email <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-muted border border-black/[0.06] focus:border-brand-red focus:bg-white focus:outline-none text-sm text-brand-navy transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-brand-navy uppercase tracking-wider block">
                    Phone Number <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+233 (0) 24 123 4567"
                    className="w-full px-4 py-3 rounded-xl bg-surface-muted border border-black/[0.06] focus:border-brand-red focus:bg-white focus:outline-none text-sm text-brand-navy transition-all font-mono"
                  />
                </div>

                {/* Company / Institution */}
                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-xs font-bold text-brand-navy uppercase tracking-wider block">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Accra Logistics Ltd."
                    className="w-full px-4 py-3 rounded-xl bg-surface-muted border border-black/[0.06] focus:border-brand-red focus:bg-white focus:outline-none text-sm text-brand-navy transition-all"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className="space-y-1.5">
                <label htmlFor="serviceType" className="text-xs font-bold text-brand-navy uppercase tracking-wider block">
                  Service Category <span className="text-brand-red">*</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-surface-muted border border-black/[0.06] focus:border-brand-red focus:bg-white focus:outline-none text-sm text-brand-navy transition-all"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Details */}
              <div className="space-y-1.5">
                <label htmlFor="projectDetails" className="text-xs font-bold text-brand-navy uppercase tracking-wider block">
                  Project Scope & Technical Details <span className="text-brand-red">*</span>
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  required
                  rows={4}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Describe your site location, connected load (kVA/MW), current voltage level, project timeline, and specific engineering requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-muted border border-black/[0.06] focus:border-brand-red focus:bg-white focus:outline-none text-sm text-brand-navy transition-all"
                />
              </div>

              {/* Submit Button: Section 4a.12 Paired circular shape */}
              <div className="inline-flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-brand-red hover:bg-brand-red-hover text-white px-7 py-3 rounded-full font-semibold text-sm shadow-md hover:shadow-glow-red transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 select-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Technical Request...</span>
                    </>
                  ) : (
                    <span>Submit Consultation Request</span>
                  )}
                </button>
                <span className="w-11 h-11 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md shrink-0">
                  <Send className="w-4 h-4" />
                </span>
              </div>
            </form>
          </div>

          {/* Direct Office Info Right */}
          <div className="lg:col-span-5 space-y-6">
            {/* 24/7 Emergency Card */}
            <div className="p-6 sm:p-7 rounded-[28px] bg-brand-navy text-white border border-brand-red/30 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
                </span>
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                  24/7 Rapid Emergency Dispatch
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                For active power outages, cable explosions, transformer faults, or catastrophic industrial trip-outs in Greater Accra:
              </p>

              <div className="pt-1">
                <a
                  href={`tel:${COMPANY_INFO.emergencyPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-5 py-3 rounded-full text-sm font-mono font-bold transition-all shadow-md shadow-brand-red/40 select-none group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                  <span>{COMPANY_INFO.emergencyPhone}</span>
                </a>
              </div>
            </div>

            {/* Office Coordinates: Section 4a.9 Circular Badges */}
            <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-black/[0.05] shadow-soft-card space-y-5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display font-bold text-base text-brand-navy">
                  Accra Head Office & Workshop
                </h3>
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-1 border border-black/[0.06] shadow-sm shrink-0">
                  <Logo variant="with-tagline" size={40} />
                </div>
              </div>

              <div className="space-y-3.5 text-content-secondary">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-brand-navy block font-medium">Head Office:</strong>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-brand-navy block font-medium">Main Office Line:</strong>
                    <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="font-mono text-brand-navy hover:underline">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-brand-navy block font-medium">Email Address:</strong>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-brand-navy hover:underline">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-brand-navy block font-medium">Operating Hours:</strong>
                    <span>{COMPANY_INFO.operatingHours.office}</span>
                    <span className="block text-brand-red font-semibold text-xs mt-0.5">
                      Emergency Crews: {COMPANY_INFO.operatingHours.emergency}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Official Location View */}
            <div className="p-5 sm:p-6 rounded-[28px] bg-white border border-black/[0.05] shadow-soft-card space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  Modes Power Services Map
                </span>
                <a
                  href="https://maps.google.com/?q=Modes+Power+Services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-brand-red hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Interactive Google Map */}
              <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-black/[0.08] shadow-inner bg-surface-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d648.4652701638811!2d-0.34948209296961247!3d5.520363949389057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfbd860320060f%3A0x6cf2390b39215ac9!2sModes%20Power%20Services!5e1!3m2!1sen!2sgh!4v1789421643619!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full"
                  title="Modes Power Services Google Maps Location"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
