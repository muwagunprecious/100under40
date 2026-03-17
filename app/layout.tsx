import LayoutWrapper from '@/components/layout/LayoutWrapper';
import StructuredData from '@/components/SEO/StructuredData';
import './globals.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://100under40.org'),
  title: {
    default: '100 Under 40 Awards | Honoring Africa\'s Leaders',
    template: '%s | 100 Under 40 Awards'
  },
  description: 'The 100 Under 40 Award is Africa\'s premier recognition platform, identifying top young Africans driving sustainable impact. An Initiative of Emmanuel Agida International.',
  keywords: [
    '100 Under 40',
    '100Under40',
    'Africa Leadership Awards',
    'Emmanuel Agida International',
    'African Achievers',
    'Youth Empowerment Africa',
    '100 Under 40 Nominations',
    'African Leaders 2026'
  ],
  authors: [{ name: 'Emmanuel Agida International' }],
  creator: 'Emmanuel Agida International',
  publisher: 'Emmanuel Agida International',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://100under40.org',
    siteName: '100 Under 40 Awards',
    title: '100 Under 40 Awards | Identifying Africa\'s Consequential Leaders',
    description: 'Recognizing 100 outstanding young Africans under 40 across 10 strategic sectors of influence.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '100 Under 40 Awards - Class of 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '100 Under 40 Awards | Honoring Africa\'s Leaders',
    description: 'The continent\'s premier recognition platform for young achievers.',
    images: ['/og-image.png'],
    creator: '@emmanuelagida', // Assuming this based on branding
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)]"
        suppressHydrationWarning
      >
        <StructuredData />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
