import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Redesign Tokens (BRIEF Section 2)
        paper: '#F6F7F9',
        surface: {
          DEFAULT: '#FFFFFF',
          white: '#FFFFFF',
          card: '#FFFFFF',
          muted: '#F8F9FA',
          subtle: '#F1F3F5',
        },
        ink: '#0B1E3D',
        slate: '#5B6779',
        hairline: '#DDE2EA',
        signal: {
          DEFAULT: '#C8102E',
          hover: '#A80D26',
        },

        // Legacy compatibility tokens for unredesigned pages
        brand: {
          red: '#C8102E',
          'red-hover': '#A80D26',
          'red-light': '#FDF2F4',
          navy: '#0B1E3D',
          'navy-light': '#122B55',
          'navy-surface': '#0F254A',
          'navy-card': '#142E59',
        },
        canvas: {
          cream: '#F6F7F9', // Aligned with paper token
          'cream-dark': '#EFE9DE',
        },
        content: {
          primary: '#0B1E3D', // Aligned with ink token
          secondary: '#5B6779', // Aligned with slate token
          tertiary: '#9CA3AF',
        },
      },
      borderRadius: {
        // Redesign shape tokens (BRIEF Section 2: buttons 8px, media 12px)
        button: '8px',
        media: '12px',
        sm: '8px',
        md: '12px',

        // Legacy compatibility
        'card-lg': '32px',
        'card-md': '24px',
        'card-sm': '16px',
        pill: '9999px',
      },
      maxWidth: {
        container: '1200px',
        prose: '68ch',
        'content-prose': '68ch',
      },
      spacing: {
        'section-desktop': '112px',
        'section-mobile': '72px',
        'gutter-desktop': '32px',
        'gutter-mobile': '20px',
      },
      fontSize: {
        display: ['clamp(2.75rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.1' }],
        h2: ['clamp(1.75rem, 2.5vw + 1rem, 2.5rem)', { lineHeight: '1.1' }],
        h3: ['clamp(1.25rem, 1vw + 1rem, 1.5rem)', { lineHeight: '1.1' }],
        body: ['17px', { lineHeight: '1.6' }],
        small: ['14px', { lineHeight: '1.6' }],
      },
      fontFamily: {
        sans: ['var(--font-schibsted)', 'var(--font-sans)', 'sans-serif'],
        display: ['var(--font-schibsted)', 'var(--font-display)', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 10px 30px -10px rgba(11, 30, 61, 0.07)',
        'elevated-card': '0 20px 40px -15px rgba(11, 30, 61, 0.12)',
        'glow-red': '0 0 35px rgba(200, 16, 46, 0.35)',
        'glow-navy': '0 0 35px rgba(11, 30, 61, 0.35)',
        'nav-pill': '0 8px 32px rgba(0, 0, 0, 0.08)',
        hairline: '0 1px 0 0 #DDE2EA',
        lightbox: '0 24px 48px -12px rgba(11, 30, 61, 0.25)',
      },
      animation: {
        'marquee-horizontal': 'marquee 30s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
