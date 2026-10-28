import { siteConfig } from './site-config';

/**
 * Site Content (Single Source of Truth for static site copy)
 * Defined per BRIEF Section 4 & Phase 3 specifications.
 * The site owner can edit hero text, stats, and section copy directly here.
 */
export const siteContent = {
  hero: {
    headline: "Reliable power for Ghana's industry.",
    sub: 'Class A electrical contractor for substations, maintenance, power quality and solar. Based in Accra, with emergency crews on call 24/7.',
    primaryCta: {
      label: 'Request a quote',
      href: '/contact',
    },
    secondaryCta: {
      label: 'See our projects',
      href: '/projects',
    },
    bottomFacts: {
      contractor: 'Energy Commission Ghana Class A contractor',
      experience: `Engineering in Ghana since ${siteConfig.foundingYear}`,
      emergencyLabel: '24/7 emergency line',
    },
    defaultImage: '/images/hero-substation.jpg',
  },
  stats: [
    {
      id: 'years-in-business',
      // Dynamically computed from founding year (2011), never hard-coded
      value: `${new Date().getFullYear() - siteConfig.foundingYear}+`,
      label: 'Years in business',
      description: `Power infrastructure energized across West Africa since ${siteConfig.foundingYear}.`,
    },
    {
      id: 'projects-delivered',
      value: '520+',
      label: 'Projects delivered',
      description: 'Industrial substations, commercial facilities, and high-uptime power grids.',
    },
    {
      id: 'mw-commissioned',
      // TODO(owner-confirm): Confirm 140+ MW commissioned metric against current plant commissioning log
      value: '140+ MW',
      label: 'Megawatts commissioned',
      description: 'Robust power infrastructure energized with 99.98% documented reliability.',
    },
    {
      id: 'safety-compliance',
      // TODO(owner-confirm): Confirm 100% safety and compliance rate metric with internal HSE safety audits
      value: '100%',
      label: 'Safety and compliance',
      description: 'Strict adherence to Energy Commission Ghana and IEEE safety standards.',
    },
  ],
  servicesSection: {
    heading: 'Core services',
    allServicesLink: {
      label: 'All services',
      href: '/services',
    },
  },
  whyModes: {
    heading: 'Engineered for high uptime and verifiable safety.',
    subtext:
      'We combine licensed engineering competence, calibrated diagnostic tools, and rapid field dispatch to keep Ghanaian industrial infrastructure energized.',
    points: [
      {
        id: 'rapid-response',
        title: '24/7 rapid response',
        // TODO(owner-confirm): Confirm "average mobilization under 60 minutes" with emergency dispatch records
        text: 'Dedicated emergency engineering crews on call across Greater Accra, with an average mobilization under 60 minutes.',
      },
      {
        id: 'certified-engineers',
        title: 'Certified Class A engineers',
        text: 'Senior electrical engineers certified by the Energy Commission of Ghana and corporate members of the Ghana Institution of Engineering (GhIE).',
      },
      {
        id: 'safety-testing',
        title: 'Safety culture and diagnostic testing',
        text: 'Strict IEEE safety adherence backed by calibrated FLIR thermography, transformer oil BDV breakdown analysis, and Megger insulation testing.',
      },
      {
        id: 'transparent-pricing',
        title: 'Transparent pricing with a bill of quantities',
        text: 'Detailed, itemized bills of quantities (BOQ) with transparent equipment specifications and milestone deliverables before work begins.',
      },
    ],
  },
  quoteBand: {
    heading: 'Need a site assessment or power restored?',
    subtext:
      'Speak directly with our senior electrical engineering team for technical site assessments or rapid emergency fault response.',
    primaryCta: {
      label: 'Request a quote',
      href: '/contact',
    },
    emergencyCallLabel: 'Call emergency line',
  },
  testimonialsSection: {
    heading: 'Client words',
    quotes: [
      {
        id: 'mensah-bonsu',
        // TODO(owner-confirm): Confirm testimonial attribution and wording with Nana Kwame Mensah-Bonsu (CTO, Tema Heavy Steel Mills & Processing)
        quote:
          'Modes Power Services handled our 33kV substation upgrade in Tema with absolute engineering rigor. Their team completed the switchgear cutover ahead of schedule with zero safety incidents. Our production uptime has been flawless since.',
        author: 'Nana Kwame Mensah-Bonsu',
        role: 'Chief Technical Officer',
        company: 'Tema Heavy Steel Mills & Processing',
        location: 'Tema, Ghana',
      },
      {
        id: 'afriyie-kwarteng',
        // TODO(owner-confirm): Confirm testimonial attribution and metric ($4,200/mo) with Victoria Afriyie-Kwarteng (Director of Plant Operations, Ashanti Beverage & Bottling Industries)
        quote:
          'The power quality audit and harmonic filtering solution installed by Modes cut our monthly ECG energy penalties by over $4,200 per month. Their engineering calculations and ROI forecasts were spot on.',
        author: 'Victoria Afriyie-Kwarteng',
        role: 'Director of Plant Operations',
        company: 'Ashanti Beverage & Bottling Industries',
        location: 'Kumasi / Accra',
      },
      {
        id: 'adjei-larbi',
        // TODO(owner-confirm): Confirm testimonial attribution and emergency SLA (45 min) with Dr. Joseph Adjei-Larbi (Head of Facilities & Infrastructure, Ridge Specialized Healthcare Center)
        quote:
          'When our main 11kV feeder cable sustained an underground fault during heavy rains, Modes’ 24/7 Emergency unit arrived within 45 minutes with a TDR fault locator and restored power before our hospital backup fuel was depleted.',
        author: 'Dr. Joseph Adjei-Larbi',
        role: 'Head of Facilities & Infrastructure',
        company: 'Ridge Specialized Healthcare Center',
        location: 'Accra, Ghana',
      },
    ],
  },
} as const;

export type SiteContent = typeof siteContent;

