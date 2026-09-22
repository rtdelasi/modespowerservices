import { ServiceItem } from '@/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'installations',
    anchor: 'installations',
    title: 'High, Medium & Low Voltage Installations',
    shortDesc:
      'Turnkey electrical infrastructure engineered to international IEEE standards for heavy industrial plants, high-rise commercial facilities, and utility substations.',
    fullDesc:
      'From 33kV/11kV primary substations to precision busbar trunking and low-voltage distribution boards, Modes Power Services executes complex industrial and commercial electrical installations with uncompromising safety, reliability, and regulatory compliance.',
    badge: 'Core Infrastructure',
    iconName: 'Zap',
    image: null,
    features: [
      'Substation design, civil coordination, transformer installation up to 5MVA',
      'High and Medium Voltage switchgear commissioning (11kV / 33kV)',
      'Underground HV cabling, termination, and high-pot testing',
      'Main Distribution Boards (MDB), Sub-Distribution Boards (SDB), and Motor Control Centers (MCC)',
      'Certified lightning protection, earthing grids (< 1 Ohm), and surge mitigation systems',
    ],
    specs: [
      { label: 'Voltage Range', value: '415V – 33kV' },
      { label: 'Transformer Capacity', value: 'Up to 5,000 kVA' },
      { label: 'Standards', value: 'IEEE, BS 7671, Ghana Energy Commission' },
      { label: 'Earthing Resistance', value: '< 1.0 Ω Target' },
    ],
    deliverables: [
      'Full CAD Single-Line Diagrams (SLD) & As-Built Schematics',
      'Factory Acceptance Testing (FAT) & Site Acceptance Testing (SAT) Reports',
      'Energy Commission Ghana Regulatory Certification Sign-Off',
      '12-Month Comprehensive Installation Warranty & Handover Documentation',
    ],
  },
  {
    id: 'maintenance',
    anchor: 'maintenance',
    title: 'Preventative Maintenance & Diagnostic Repairs',
    shortDesc:
      'Proactive condition monitoring, FLIR thermal imaging, and scheduled transformer servicing to prevent catastrophic outages and extend equipment lifespan.',
    fullDesc:
      'Unplanned downtime is costly. Our predictive and preventative maintenance programs utilize advanced thermographic scanning, transformer oil breakdown voltage (BDV) testing, and vibration analysis to pinpoint vulnerabilities before they trigger critical system failures.',
    badge: 'Reliability & Uptime',
    iconName: 'Activity',
    image: null,
    features: [
      'Calibrated FLIR infrared thermography to identify hot spots and loose terminations',
      'Transformer oil dielectric breakdown voltage (BDV) testing & filtration',
      'Circuit breaker timing tests, contact resistance (Ductor), and relay calibration',
      'Insulation resistance (Megger) testing up to 10kV',
      'Scheduled cleaning, torque audits, and contact lubrication of MCCs & switchboards',
    ],
    specs: [
      { label: 'Inspection Tech', value: 'Calibrated FLIR Thermography' },
      { label: 'Insulation Testing', value: 'Up to 10 kV DC' },
      { label: 'Reporting SLA', value: 'Within 24 Hours' },
      { label: 'Maintenance Model', value: 'SLA / On-Demand / Annual' },
    ],
    deliverables: [
      'Thermal Heat Map Anomaly Report with Severity Grading',
      'Transformer Dielectric & Moisture Content Lab Analysis',
      'Component Degradation & Replacement Roadmap',
      'Maintenance Logbooks for Regulatory Insurance Audits',
    ],
  },
  {
    id: 'audits',
    anchor: 'audits',
    title: 'Power Quality & Energy Efficiency Audits',
    shortDesc:
      'Comprehensive grid harmonic analysis, power factor correction (PFC), and load balancing to slash tariff penalties and optimize facility power efficiency.',
    fullDesc:
      'Poor power quality causes equipment overheating, premature motor failure, and inflated utility bills. We deploy Class-A power quality analyzers to log harmonics, sags, swells, transients, and power factor—delivering actionable ROI-backed engineering remedies.',
    badge: 'Efficiency & Cost Reduction',
    iconName: 'ShieldCheck',
    image: null,
    features: [
      '7-day Class-A power quality logging (THD, voltage transients, frequency drift)',
      'Power Factor Correction (PFC) capacitor bank design and retrofitting (Target PF > 0.98)',
      'Active harmonic filtering for non-linear VFD and data center loads',
      'Phase load balancing to eliminate neutral overheating and transformer losses',
      'Energy Commission Energy Management Compliance Audits',
    ],
    specs: [
      { label: 'Analyzer Standard', value: 'IEC 61000-4-30 Class A' },
      { label: 'Target Power Factor', value: '0.98 – 1.00' },
      { label: 'Typical Bill Savings', value: '12% – 28%' },
      { label: 'Harmonic Compliance', value: 'IEEE 519 Standard' },
    ],
    deliverables: [
      'Comprehensive 7-Day Power Waveform & Harmonic Profile',
      'PFC Sizing & Payback Calculation Model (ROI < 14 Months)',
      'Actionable Phase Rebalancing Schedule',
      'Energy Commission Energy Efficiency Endorsement',
    ],
  },
  {
    id: 'solutions',
    anchor: 'solutions',
    title: 'Custom Hybrid Solutions & Solar Microgrids',
    shortDesc:
      'Engineered commercial solar PV, BESS lithium battery energy storage, and automatic synchronizing generator systems for uninterrupted zero-downtime operation.',
    fullDesc:
      'When grid stability is unpredictable, Modes Power Services engineers resilient microgrids combining Tier-1 solar arrays, high-cycle LFP battery banks, and intelligent generator synchronization to ensure 100% continuous uptime with optimal levelized cost of energy (LCOE).',
    badge: 'Next-Gen Energy',
    iconName: 'Cpu',
    image: null,
    features: [
      'Commercial rooftop & ground-mount Solar PV systems (50kWp to 2MWp)',
      'Battery Energy Storage Systems (BESS) with Tier-1 LiFePO4 cells',
      'Automatic Transfer Switches (ATS) with closed-transition synchronization',
      'Custom PLC/SCADA automation panels for remote monitoring & telemetry',
      'Peak shaving and generator fuel optimization algorithms',
    ],
    specs: [
      { label: 'Solar Scale', value: '50 kWp – 2.5 MWp' },
      { label: 'Storage Chemistry', value: 'Tier-1 LiFePO4 / BESS' },
      { label: 'Transfer Time', value: '< 10ms (Seamless)' },
      { label: 'Monitoring', value: 'Cloud SCADA & IoT Telemetry' },
    ],
    deliverables: [
      'PVSyst Solar Yield Simulation & Feasibility Study',
      'Custom Control Panel Wiring Schematics & PLC Logic Code',
      'Remote Cloud Dashboard Setup with Real-Time Alerts',
      'Comprehensive O&M Manuals & Staff Training Sessions',
    ],
  },
  {
    id: 'emergency',
    anchor: 'emergency',
    title: '24/7 Rapid Emergency Response & Fault Recovery',
    shortDesc:
      'Dedicated emergency engineering crews on 24/7 standby across Greater Accra to rapidly triage cable faults, switchgear failures, and catastrophic outages.',
    fullDesc:
      'Electrical emergencies strike without warning. Our 24/7 Rapid Dispatch team is equipped with time-domain reflectometry (TDR) cable fault locators, portable generation units, and critical replacement components to safely isolate faults and restore power in record time.',
    badge: '24/7 / 365 Hotline',
    iconName: 'Clock',
    image: null,
    features: [
      'Guaranteed rapid mobilization across Greater Accra & industrial zones',
      'Underground cable fault pin-pointing using acoustic & TDR surge wave generators',
      'Emergency temporary bypass cabling and mobile transformer deployment',
      'Post-incident root cause failure analysis (RCFA)',
      'Emergency fuel and generator synchronization restoration',
    ],
    specs: [
      { label: 'Response SLA', value: '< 60 Mins (Accra Core)' },
      { label: 'Hotline Availability', value: '24/7 / 365 Uninterrupted' },
      { label: 'Dispatch Fleet', value: 'Fully Equipped Mobile Labs' },
      { label: 'Priority Support', value: 'Contract SLA Clients' },
    ],
    deliverables: [
      'Immediate Emergency Power Restoration & System Stabilization',
      'Post-Incident Engineering Root Cause Analysis (RCFA)',
      'Safety Integrity Re-Certification Before Re-Energization',
      'Preventative Corrective Action Plan',
    ],
  },
];
