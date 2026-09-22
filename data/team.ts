import { TeamMember } from '@/types';

export const TEAM_DATA: TeamMember[] = [
  {
    name: 'Ing. Emmanuel Modes Mensah',
    role: 'Managing Director & Lead Power Systems Engineer',
    tagline: '“True engineering excellence lies in building power systems that operate with zero compromise on safety and longevity.”',
    image: null,
    linkedinUrl: 'https://linkedin.com/in/modes-power-lead',
    credentials: [
      'BSc & MSc Electrical & Electronic Engineering (KNUST)',
      'Fellow, Ghana Institution of Engineering (GhIE)',
      'Energy Commission Certified Lead Electrical Inspector',
      'Over 20 years leading high-voltage substation and industrial grid projects',
    ],
  },
  {
    name: 'Ing. Kwabena Osei-Tutu',
    role: 'Head of Industrial Projects & Substation Engineering',
    tagline: '“Precision in substation protection and switchgear timing is what prevents single-point failure across industrial plants.”',
    image: null,
    linkedinUrl: 'https://linkedin.com/in/modes-substation-head',
    credentials: [
      'BSc Electrical Engineering (University of Mines & Technology, Tarkwa)',
      'Professional Member, GhIE & IEEE Power & Energy Society',
      'Specialist in 33kV/11kV Protection Relay Coordination and Vacuum Switchgear',
      '14+ years in heavy industrial and mining electrification',
    ],
  },
  {
    name: 'Abena Serwaa Boateng',
    role: 'Director of Renewable Energy & Microgrids',
    tagline: '“Integrating solar PV and battery storage isn’t just green — it is the single best hedge against industrial power costs in Africa.”',
    image: null,
    linkedinUrl: 'https://linkedin.com/in/modes-renewables-lead',
    credentials: [
      'BSc Mechanical & Energy Engineering, MSc Renewable Power Systems',
      'Certified Energy Manager (CEM®) & NABCEP PV Installation Professional',
      'Pioneered 15+ commercial solar microgrid projects across West Africa',
      'Expert in closed-transition ATS and BESS battery chemistry management',
    ],
  },
  {
    name: 'Ing. Michael Kofi Addo',
    role: 'Director of Safety, Quality Assurance & 24/7 Operations',
    tagline: '“In high-voltage engineering, safety isn’t a checklist — it is our culture, our duty, and our core promise to every client.”',
    image: null,
    linkedinUrl: 'https://linkedin.com/in/modes-safety-ops',
    credentials: [
      'BSc Electrical Engineering (KNUST), NEBOSH International Diploma in HSE',
      'Lead Auditor ISO 45001 (Occupational Health & Safety) & ISO 9001',
      'Commander of Modes 24/7 Rapid Emergency Response Unit',
      '12+ years zero-loss-time safety management in high-voltage environments',
    ],
  },
];

export const TEAM_MEMBERS = TEAM_DATA.map((m, idx) => ({
  id: `team-${idx + 1}`,
  name: m.name,
  role: m.role,
  tagline: m.tagline,
  photoUrl: m.image,
  linkedinUrl: m.linkedinUrl,
  bioBullets: m.credentials,
  published: true,
}));
