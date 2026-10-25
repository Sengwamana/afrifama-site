import type { Metadata } from 'next';
import { site } from '@/data';

/** Absolute origin, used for canonical URLs and Open Graph links. */
export const SITE_URL = site.url;

/** Default social share image (1200×630). */
export const DEFAULT_OG_IMAGE = '/images/og-afrifama.jpg';

export interface PageMetadataInput {
  /** Page title — the layout appends " | Afrifama". */
  title: string;
  description: string;
  /** Path relative to the site root, e.g. '/products'. Used for canonical + OG. */
  path: string;
  /** Optional override for the social share image. */
  image?: string;
  ogType?: 'website' | 'article';
}

/**
 * Per-page metadata: unique title and description, canonical URL,
 * Open Graph and Twitter cards.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  ogType = 'website',
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: ogType,
      locale: 'en_KE',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}
