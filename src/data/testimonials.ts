/**
 * Customer testimonials.
 *
 * The quotes below are reproduced verbatim from the testimonials published on
 * Afrifama's own website (https://www.afrifama.com). Never invent quotes,
 * names, statistics or attributions — if a testimonial cannot be verified,
 * remove it rather than inventing a replacement.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** Short descriptor derived from the published quote itself. */
  role: string;
  /** Initials used for the avatar (no stock portraits of real people). */
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We’ve been sourcing chicken from Afrifama for our hotel for over a year now. The quality is excellent, and their deliveries are always on time. Totally reliable.',
    name: 'Chef Brian Kimani',
    role: 'Chef & hotel buyer',
    initials: 'BK',
  },
  {
    quote:
      'Afrifama feeds have really improved the growth and health of my chickens. They’re affordable, easy to access, and I’ve seen better weight gain and fewer losses since I switched.',
    name: 'Sarah Wanjiku',
    role: 'Poultry farmer',
    initials: 'SW',
  },
  {
    quote:
      'I started with just 50 chicks through Afrifama. Today, I run a small poultry farm that feeds my family and pays school fees. Their training and support made it possible.',
    name: 'Peter Otieno',
    role: 'Poultry farmer',
    initials: 'PO',
  },
];
