import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COMPANY_INFO } from '@/data/company';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://modespowerservices.com'),
  title: {
    default: `${COMPANY_INFO.name} — Precision Electrical Engineering & Infrastructure`,
    template: `%s | ${COMPANY_INFO.name}`,
  },
  description:
    'Ghana’s certified Class-A electrical engineering contractor for high-voltage substations, predictive industrial maintenance, power quality audits, and custom solar microgrids.',
  keywords: [
    'Modes Power Services',
    'Electrical Engineering Ghana',
    'Substation Installation Accra',
    'Industrial Maintenance Ghana',
    'Power Quality Audit',
    'Energy Commission Certified Contractor',
    'Commercial Solar Microgrid',
    'Emergency Electrician Accra',
    'Transformer Servicing Ghana',
  ],
  authors: [{ name: 'Modes Power Services Ltd.' }],
  creator: 'Modes Power Services',
  publisher: 'Modes Power Services',
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://modespowerservices.com',
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} — Precision Electrical Engineering`,
    description: COMPANY_INFO.description,
    images: [
      {
        url: '/logos/modes-logo-with-tagline.png',
        width: 1024,
        height: 1024,
        alt: 'Modes Power Services Ltd. — Your Power Solution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY_INFO.name,
    description: COMPANY_INFO.description,
    images: ['/logos/modes-logo-with-tagline.png'],
  },
  icons: {
    icon: '/logos/modes-logo.png',
    shortcut: '/logos/modes-logo.png',
    apple: '/logos/modes-logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-canvas-cream text-content-primary antialiased selection:bg-brand-red selection:text-white">
        <Navbar />
        <main className="relative min-h-screen flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
