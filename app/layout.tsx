import type { Metadata } from 'next';
import { Schibsted_Grotesk } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COMPANY_INFO } from '@/data/company';

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  weight: ['400', '500', '600'],
  display: 'swap',
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
  const headersList = headers();
  const isMaintenance = headersList.get('x-maintenance-mode') === 'true';

  return (
    <html lang="en" className={schibsted.variable}>
      <body className="bg-paper text-ink font-sans antialiased selection:bg-signal selection:text-white">
        {/* Skip to content link as first focusable element */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] px-4 py-2.5 bg-signal text-white font-medium text-sm rounded-button shadow-lg outline-none ring-2 ring-white"
        >
          Skip to content
        </a>
        {!isMaintenance && <Navbar />}
        <main
          id="main-content"
          tabIndex={-1}
          className="relative min-h-screen flex flex-col focus:outline-none"
        >
          {children}
        </main>
        {!isMaintenance && <Footer />}
      </body>
    </html>
  );
}
