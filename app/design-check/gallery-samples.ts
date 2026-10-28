import { ProjectImage } from '@/types';

// Valid 4x3 base64 blur PNG placeholder (slate-navy tone)
export const SAMPLE_BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGNgYGDg5eXl5eVtbm4WFBQUFBQUFBQUFBQUFRUVFRQUFBQUFBQUFBQUAAAAHgBNmK+YqgAAAABJRU5ErkJggg==';

const BASE_IMG_URL = '/images/hero-substation.jpg';

export const ALL_SAMPLE_IMAGES: ProjectImage[] = [
  {
    id: 'img-1',
    url: BASE_IMG_URL,
    alt: 'Primary 33kV/11kV oil-immersed step-down power transformer installation',
    caption: '3.5 MVA power transformer rigged and leveled on reinforced plinth',
    kind: 'gallery',
    sort_order: 1,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'img-2',
    url: BASE_IMG_URL,
    alt: 'Vacuum switchgear lineup and microprocessor protection relays',
    caption: 'ABB 11kV vacuum circuit breaker lineup with digital protection',
    kind: 'gallery',
    sort_order: 2,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'img-3',
    url: BASE_IMG_URL,
    alt: 'Underground 33kV XLPE power cable termination and heat-shrink jointing',
    caption: 'Heat-shrinkable transition joints tested with TDR surge analysis',
    kind: 'gallery',
    sort_order: 3,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'img-4',
    url: BASE_IMG_URL,
    alt: 'Automated power factor correction (PFC) detuned capacitor bank',
    caption: '400 kVAR detuned capacitor bank for industrial inductive loads',
    kind: 'gallery',
    sort_order: 4,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'img-5',
    url: BASE_IMG_URL,
    alt: 'FLIR thermographic scan verifying normal busbar temperature gradient',
    caption: 'Thermal imaging scan confirming balanced load across 1600A busbar',
    kind: 'gallery',
    sort_order: 5,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'img-6',
    url: BASE_IMG_URL,
    alt: 'Motor control center (MCC) with variable frequency drives',
    caption: 'Form 4B construction IP54 multi-pump VFD automation panel',
    kind: 'gallery',
    sort_order: 6,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'img-7',
    url: BASE_IMG_URL,
    alt: 'Substation earthing grid copper mesh and perimeter ground rods',
    caption: 'Sub-1-ohm earth ground verified by IEEE 81 fall-of-potential test',
    kind: 'gallery',
    sort_order: 7,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'img-8',
    url: BASE_IMG_URL,
    alt: 'Closed-transition automatic transfer switch (ATS) synchronization',
    caption: '800 kVA generator seamless closed-transition transfer controller',
    kind: 'gallery',
    sort_order: 8,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'img-9',
    url: BASE_IMG_URL,
    alt: 'Factory acceptance and high-voltage energization handover certificate',
    caption: 'Grid compliance and statutory energization documentation sign-off',
    kind: 'gallery',
    sort_order: 9,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
];

export const SAMPLES_COUNT_1 = ALL_SAMPLE_IMAGES.slice(0, 1);
export const SAMPLES_COUNT_2 = ALL_SAMPLE_IMAGES.slice(0, 2);
export const SAMPLES_COUNT_3 = ALL_SAMPLE_IMAGES.slice(0, 3);
export const SAMPLES_COUNT_4 = ALL_SAMPLE_IMAGES.slice(0, 4);
export const SAMPLES_COUNT_5 = ALL_SAMPLE_IMAGES.slice(0, 5);
export const SAMPLES_COUNT_9 = ALL_SAMPLE_IMAGES.slice(0, 9);

export const SAMPLE_BEFORE_AFTER_IMAGES: ProjectImage[] = [
  {
    id: 'ba-before',
    url: BASE_IMG_URL,
    alt: 'Legacy 1980s oil circuit breakers with recurrent insulation breakdown before overhaul',
    caption: 'Before: Aged oil switchgear prone to arc flash and thermal degradation',
    kind: 'before',
    sort_order: 1,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
  {
    id: 'ba-after',
    url: BASE_IMG_URL,
    alt: 'Modernized 33kV vacuum switchgear lineup and digital protection after overhaul',
    caption: 'After: Modernized ABB vacuum breakers with 99.99% uptime reliability',
    kind: 'after',
    sort_order: 2,
    width: 1920,
    height: 1080,
    blur_data_url: SAMPLE_BLUR_DATA_URL,
  },
];

export const SAMPLE_ZERO_IMAGES: ProjectImage[] = [];
