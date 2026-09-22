import { AccordionReason } from '@/types';

export const WHY_CHOOSE_US_DATA: AccordionReason[] = [
  {
    id: 'emergency-24-7',
    number: '01',
    title: '24/7 Rapid Response & Real-Time Emergency Fleet',
    summary: 'Dedicated mobile engineering units stationed across Greater Accra for rapid fault triage.',
    details:
      'Power outages and equipment failures don’t conform to business hours. Our rapid dispatch crews are equipped with specialized TDR cable fault locators, portable generation, and critical switchgear spares to ensure immediate restoration and minimal downtime for critical facilities.',
    iconName: 'Clock',
    highlightTag: 'Average <60 Min Mobilization',
  },
  {
    id: 'certified-compliance',
    number: '02',
    title: 'Class-A Energy Commission & GhIE Certified Engineers',
    summary: 'Fully licensed electrical engineers executing to stringent IEEE, BS 7671, and ISO standards.',
    details:
      'Every project is directed by certified professional engineers registered with the Ghana Institution of Engineering (GhIE) and licensed by the Energy Commission of Ghana. We guarantee 100% compliance with statutory building codes and electrical safety mandates.',
    iconName: 'Award',
    highlightTag: 'Energy Commission Class A',
  },
  {
    id: 'precision-safety',
    number: '03',
    title: 'Zero-Harm Safety Culture & Advanced Diagnostic Tech',
    summary: 'FLIR infrared thermal scanning, transformer BDV testing, and sub-Ohm earthing grids.',
    details:
      'We combine unyielding NEBOSH-certified safety protocols with military-grade diagnostic tools. From calibrated thermographic cameras to 10kV insulation testers, we eliminate hidden hazards before they trigger fire, equipment loss, or personnel injury.',
    iconName: 'Shield',
    highlightTag: 'Zero Lost-Time Incidents',
  },
  {
    id: 'transparent-pricing',
    number: '04',
    title: 'Transparent Pricing & ROI-Driven Engineering',
    summary: 'Clear bill of quantities (BOQ), verified equipment sourcing, and quantifiable energy ROI.',
    details:
      'No surprise change-orders, no counterfeit switchgear. We provide transparent, itemized engineering quotations with genuine Tier-1 components (ABB, Schneider Electric, Siemens) alongside measurable ROI calculations for solar and power factor optimization.',
    iconName: 'TrendingUp',
    highlightTag: 'Tier-1 Guaranteed Sourcing',
  },
];
