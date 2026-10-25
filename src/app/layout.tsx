import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/Site';
import ScrollProgress from '@/components/ScrollProgress';
import { site } from '@/data';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/metadata';
import { organizationJsonLd } from '@/lib/structured-data';

/** Headline face — Playfair Display, self-hosted via next/font. */
const displayFont = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

/** Body/UI face — Inter, self-hosted via next/font. */
const bodyFont = Inter({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'day-old chicks Kenya',
    'poultry feeds Kilifi',
    'poultry farming Coastal Kenya',
    'kienyeji chicken',
    'farmer support Kenya',
    'Afrifama',
  ],
  openGraph: {
    siteName: site.name,
    locale: 'en_KE',
    type: 'website',
    url: SITE_URL,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased selection:bg-[#EAB943] selection:text-[#0C261C]">
        <ScrollProgress />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
