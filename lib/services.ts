/**
 * Single source of truth for Modes Power Services technical capabilities.
 * Defined per BRIEF Section 4 & 5 and Phase 4.
 * Plain, active engineering language with tightened promotional copy.
 */

export interface ServiceItem {
  id: 'installations' | 'maintenance' | 'audits' | 'solutions' | 'emergency';
  title: string;
  summary: string;
  keySpec: string;
  longerScope: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'installations',
    title: 'High, medium and low-voltage installations',
    summary: 'Turnkey electrical infrastructure from 415 V distribution boards to 33 kV primary substations.',
    keySpec: '415 V to 33 kV, transformers up to 5,000 kVA',
    longerScope: [
      'Substation civil coordination, design, and transformer installation up to 5 MVA',
      'High and medium-voltage switchgear commissioning (11 kV and 33 kV)',
      'Underground HV cabling, termination, and high-pot dielectric testing',
      'Main distribution boards (MDB), sub-distribution boards, and motor control centers (MCC)',
      'Lightning protection, earthing grids (< 1.0 Ω target), and surge mitigation systems',
    ],
  },
  {
    id: 'maintenance',
    title: 'Preventative maintenance and diagnostic testing',
    summary: 'Scheduled transformer servicing, FLIR thermal imaging, and condition monitoring to prevent outages.',
    keySpec: 'Calibrated FLIR thermography, insulation testing up to 10 kV DC',
    longerScope: [
      'Calibrated FLIR infrared thermography to identify high-resistance terminations',
      'Transformer oil dielectric breakdown voltage (BDV) testing and filtration',
      'Circuit breaker timing tests, contact resistance (Ductor), and protection relay calibration',
      'Insulation resistance testing (Megger) up to 10 kV DC',
      'Scheduled cleaning, torque audits, and contact lubrication of switchboards',
    ],
  },
  {
    id: 'audits',
    title: 'Power quality and energy efficiency audits',
    summary: 'Harmonic analysis, power factor correction, and load balancing to eliminate utility penalties.',
    keySpec: 'IEC 61000-4-30 Class A logging, target PF 0.98 to 1.00',
    longerScope: [
      '7-day Class A power quality logging for harmonic distortion, transients, and voltage sags',
      'Power factor correction (PFC) capacitor bank design, sizing, and retrofitting',
      'Active harmonic filter installation for non-linear industrial and VFD loads',
      'Phase load balancing to eliminate neutral overheating and transformer losses',
      'Energy Commission compliance documentation and utility tariff penalty mitigation',
    ],
  },
  {
    id: 'solutions',
    title: 'Solar microgrids and hybrid power systems',
    summary: 'Commercial solar PV, lithium battery storage (BESS), and generator synchronization for continuous power.',
    keySpec: '50 kWp to 2.5 MWp solar, Tier-1 LiFePO4 storage, < 10 ms transfer',
    longerScope: [
      'Commercial rooftop and ground-mount solar PV arrays from 50 kWp to 2.5 MWp',
      'Battery energy storage systems (BESS) with Tier-1 lithium iron phosphate (LiFePO4) cells',
      'Automatic transfer switches (ATS) with closed-transition synchronization',
      'Custom PLC and SCADA automation panels for remote telemetry and monitoring',
      'Peak shaving and generator fuel optimization algorithms',
    ],
  },
  {
    id: 'emergency',
    title: '24/7 emergency response and fault recovery',
    summary: 'Rapid-response engineering crews on call across Greater Accra for cable faults, transformer trips, and power outages.',
    keySpec: '24/7 rapid dispatch, average mobilization under 60 minutes',
    longerScope: [
      '24/7 rapid dispatch across Greater Accra and primary industrial hubs',
      'Underground cable fault location using acoustic and time-domain reflectometry (TDR)',
      'Emergency temporary bypass cabling and mobile transformer deployment',
      'Post-incident root cause failure analysis (RCFA)',
      'Safety integrity re-certification before re-energization',
    ],
  },
];

/**
 * Core services shown on the home page (Installations, Maintenance, Solar solutions)
 */
export const HOME_SERVICES = SERVICES.filter((s) =>
  ['installations', 'maintenance', 'solutions'].includes(s.id)
);
