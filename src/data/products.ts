/**
 * Product catalogue.
 *
 * Product names, categories and descriptions follow the wording published on
 * Afrifama's website (https://www.afrifama.com). Pack sizes, prices, formulas
 * and stock are deliberately NOT included because they have not been verified —
 * `specs` only lists claims the company publishes itself.
 */

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  eyebrow: string;
  /** Short description used on cards. */
  summary: string;
  /** Longer description used on the catalogue and detail pages. */
  description: string;
  detail: string;
  image: ProductImage;
  /** Transparent product shot, used on dark/tinted panels. */
  cutout?: ProductImage;
  specs: string[];
}

/** Honest, shared disclaimer shown wherever specifications appear. */
export const specificationNote =
  'Pricing, pack sizes and current availability are confirmed by our team — request a quote for the latest details.';

export const products: Product[] = [
  {
    slug: 'day-old-chicks',
    name: 'Day-old chicks',
    category: 'Hatchery',
    eyebrow: 'A stronger start',
    summary: 'Strong, vaccinated day-old chicks hatched locally in Kilifi.',
    description:
      'Hatched in-house for strength, vaccinated for protection, and delivered to help your poultry farm thrive from day one.',
    detail:
      'Afrifama supplies strong, vaccinated day-old chicks hatched in-house in Kilifi. Every chick is vaccinated for protection before it leaves the hatchery, so your next flock can start strong from day one. Get in touch to check current hatch schedules and book your batch.',
    image: {
      src: '/images/chicks.webp',
      alt: 'Close view of healthy Afrifama day-old chicks',
    },
    cutout: { src: '/images/chicks.webp', alt: 'Afrifama day-old chicks' },
    specs: ['Vaccinated for protection', 'Hatched in-house in Kilifi', 'Strong, vigorous chicks from day one'],
  },
  {
    slug: 'poultry-feeds',
    name: 'Afrifama feeds',
    category: 'Feed manufacturing',
    eyebrow: 'Formulated by nutritionists',
    summary: 'High-quality, affordable poultry feeds for every stage of growth.',
    description:
      'Nutritious, affordable poultry feed formulated by certified nutritionists and trusted by farmers across the region.',
    detail:
      'Afrifama Feeds was founded to take pressure off one of the biggest costs in poultry farming: feed. Our rations are developed with Kenya’s leading feed formulation and animal nutrition experts, giving birds balanced, energy-rich nutrition for every stage of growth without over-stretching the farm budget. Ask our team about current feed schedules and the right ration for your flock.',
    image: {
      src: '/images/feeds.webp',
      alt: 'Afrifama poultry feed bags',
    },
    cutout: { src: '/images/feeds.webp', alt: 'Bag of Afrifama poultry feed' },
    specs: [
      'Formulated by certified nutritionists',
      'Balanced nutrition for every stage of growth',
      'Affordable, high-quality nutrition',
    ],
  },
  {
    slug: 'kienyeji-chicken',
    name: 'Kienyeji chicken',
    category: 'Poultry production',
    eyebrow: 'Raised with care',
    summary: 'Naturally raised kienyeji chicken from Afrifama’s production unit.',
    description:
      'Raised in open, spacious environments with natural feed, sunshine and movement — for healthier birds with richer taste and better nutrition.',
    detail:
      'Afrifama raises kienyeji chickens in open, spacious environments with access to natural feed, sunshine and movement, resulting in healthier birds with richer taste and better nutrition. Our production unit also raises healthy broilers for reliable supply. Contact the team to ask about current availability for households and commercial buyers.',
    image: {
      src: '/images/prod.webp',
      alt: 'Kienyeji chickens from Afrifama poultry production',
    },
    cutout: { src: '/images/prod.webp', alt: 'Poultry from the Afrifama production unit' },
    specs: [
      'Raised in open, spacious environments',
      'Natural feed, sunshine and movement',
      'Healthier birds, richer taste and better nutrition',
    ],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Options for the "product of interest" field on the contact form. */
export const productOptions: { value: string; label: string }[] = products.map((product) => ({
  value: product.slug,
  label: product.name,
}));

/** Contact link pre-filled with a product slug. */
export function quoteHref(product: Product | { slug: string }): string {
  return `/contact?product=${product.slug}`;
}
