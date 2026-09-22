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
          cream: '#F7F3EC',
          'cream-dark': '#EFE9DE',
        },
        surface: {
          white: '#FFFFFF',
          card: '#FFFFFF',
          muted: '#F8F9FA',
          subtle: '#F1F3F5',
        },
        content: {
          primary: '#111827',
          secondary: '#4B5563',
          tertiary: '#9CA3AF',
        },
      },
      borderRadius: {
        'card-lg': '32px',
        'card-md': '24px',
        'card-sm': '16px',
        pill: '9999px',
      },
      boxShadow: {
        'soft-card': '0 10px 30px -10px rgba(11, 30, 61, 0.07)',
        'elevated-card': '0 20px 40px -15px rgba(11, 30, 61, 0.12)',
        'glow-red': '0 0 35px rgba(200, 16, 46, 0.35)',
        'glow-navy': '0 0 35px rgba(11, 30, 61, 0.35)',
        'nav-pill': '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'sans-serif'],
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
