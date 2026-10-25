/**
 * Afrifama's three business pillars, as published by the company:
 * "We operate across three key pillars: Vaccinated day-old chicks,
 * Feed manufacturing, Farmers Partnership."
 *
 * Each pillar also carries a layout hint so the homepage can give every
 * pillar its own visual composition instead of repeating one card design.
 */

export type PillarVariant = 'photo' | 'panel' | 'split';

export interface PillarImage {
  src: string;
  alt: string;
}

export interface Pillar {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  image: PillarImage;
  /** Where "learn more" points — the relevant detail page. */
  href: string;
  linkLabel: string;
  /** Where "request a quote" points (contact form, pre-filled). */
  quoteHref: string;
  variant: PillarVariant;
}

export const pillars: Pillar[] = [
  {
    slug: 'day-old-chicks',
    index: '01',
    eyebrow: 'Hatchery',
    title: 'Day-old chicks',
    summary:
      'Strong, vaccinated day-old chicks hatched in-house in Kilifi and delivered to help your poultry farm thrive from day one.',
    points: ['Vaccinated for protection', 'Hatched in-house in Kilifi', 'Strong chicks from day one'],
    image: {
      src: '/images/operations-hatchery.jpg',
      alt: 'Day-old chicks from the Afrifama hatchery in Kilifi',
    },
    href: '/products/day-old-chicks',
    linkLabel: 'View day-old chicks',
    quoteHref: '/contact?product=day-old-chicks',
    variant: 'photo',
  },
  {
    slug: 'poultry-feeds',
    index: '02',
    eyebrow: 'Feed manufacturing',
    title: 'Poultry feeds',
    summary:
      'Nutritious, affordable poultry feed formulated by certified nutritionists for every stage of growth.',
    points: [
      'Formulated by certified nutritionists',
      'Balanced nutrition for every stage of growth',
      'Developed with Kenya’s leading animal nutrition experts',
    ],
    image: {
      src: '/images/operations-feed-milling.jpg',
      alt: 'Afrifama feed production and milling operation',
    },
    href: '/products/poultry-feeds',
    linkLabel: 'View poultry feeds',
    quoteHref: '/contact?product=poultry-feeds',
    variant: 'panel',
  },
  {
    slug: 'farmer-support',
    index: '03',
    eyebrow: 'Kukuza programme',
    title: 'Farmer support & partnerships',
    summary:
      'Training, technical advice and guaranteed market access through Afrifama’s Kukuza farmer partnership.',
    points: [
      'Training and technical advice to cut chick mortality',
      'Mentorship that builds confident farmers',
      'Guaranteed market access at fair prices — no brokers',
    ],
    image: {
      src: '/images/film-frame-01.jpg',
      alt: 'Afrifama farmer checking the flock inside the poultry house',
    },
    href: '/farmer-support',
    linkLabel: 'Explore farmer support',
    quoteHref: '/contact?type=Partnership',
    variant: 'split',
  },
];
