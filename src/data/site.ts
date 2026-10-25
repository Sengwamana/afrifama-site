/**
 * Verified business information for Afrifama.
 *
 * Every value below was taken from Afrifama's published website
 * (https://www.afrifama.com) or from company-supplied information.
 * Do not add contact details, social profiles or claims that have not been
 * verified — the site intentionally avoids invented data.
 */

export interface SocialProfile {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  /** Short descriptor used in the header lockup, footer and metadata. */
  tagline: string;
  /** Used for the default meta description and Open Graph description. */
  description: string;
  /** Absolute origin used for canonical URLs, sitemaps and structured data. */
  url: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  address: {
    street: string;
    locality: string;
    region: string;
    country: string;
    /** Line breaks for display, e.g. in the footer and contact page. */
    display: string[];
  };
  socials: SocialProfile[];
  /**
   * Hero background video. Override at build time with
   * NEXT_PUBLIC_HERO_VIDEO_URL when a final cut is supplied.
   * The bundled file is a short, muted MP4 of a farmer inspecting a flock.
   */
  heroVideoUrl: string;
  /** Poster/fallback image for the hero video. */
  heroPosterUrl: string;
  /** Set to false until a delivery service is configured and tested. */
  contactFormEnabled: boolean;
}

export const site: SiteConfig = {
  name: 'Afrifama',
  legalName: 'Afrifama',
  tagline: 'Quality poultry inputs. Practical farmer support.',
  description:
    'Affordable, high-quality day-old chicks and poultry feeds, plus farmer support programmes designed to help poultry farmers build profitable businesses — from Mariakani, Kilifi.',
  url: 'https://www.afrifama.com',
  phoneDisplay: '+254 716 438 604',
  phoneHref: 'tel:+254716438604',
  email: 'info@afrifama.com',
  address: {
    street: 'Kaloleni Road',
    locality: 'Mariakani',
    region: 'Kilifi County',
    country: 'Kenya',
    display: ['Kaloleni Road', 'Mariakani – Kilifi, Kenya'],
  },
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/afrifama/' },
    { label: 'Facebook', href: 'https://web.facebook.com/afrifamapoultry' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Afrifama' },
  ],
  heroVideoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/video/afrifama-hero.mp4',
  heroPosterUrl: '/images/hero-poster.jpg',
  contactFormEnabled: true,
};
