/**
 * Afrifama's operations, mapped from the company's published description of
 * its integrated model: hatchery, feed manufacturing and poultry production.
 */

export interface Operation {
  index: string;
  tag: string;
  title: string;
  summary: string;
  body: string;
  points: string[];
  image: {
    src: string;
    alt: string;
  };
}

export const operations: Operation[] = [
  {
    index: '01',
    tag: '01 / Hatchery',
    title: 'Hatchery',
    summary: 'Vaccinated day-old chicks, hatched in-house for strength.',
    body:
      'Chicks are hatched in-house for strength, vaccinated for protection and supplied to farmers from Mariakani — so a new flock can start strong from day one instead of fighting its first week.',
    points: ['In-house hatching in Kilifi', 'Vaccination for protection at hatch', 'Supplied to farmers across the region'],
    image: {
      src: '/images/operations-hatchery.jpg',
      alt: 'Day-old chicks from the Afrifama hatchery',
    },
  },
  {
    index: '02',
    tag: '02 / Feed manufacturing',
    title: 'Feed manufacturing',
    summary: 'Affordable, nutritionist-formulated poultry feeds.',
    body:
      'Afrifama Feeds was established with Kenya’s leading feed formulation and animal nutrition experts to produce affordable, nutrient-dense rations for coastal farms. The result is simpler: feed costs come down while bird health and growth improve.',
    points: [
      'Formulated with animal nutrition experts',
      'Nutrient-dense rations for coastal farms',
      'Built to bring feed costs down',
    ],
    image: {
      src: '/images/operations-feed-milling.jpg',
      alt: 'Poultry feed being produced by Afrifama',
    },
  },
  {
    index: '03',
    tag: '03 / Poultry production',
    title: 'Poultry production',
    summary: 'Healthy broilers and kienyeji chickens, raised properly.',
    body:
      'Broilers and kienyeji chickens are raised in open, spacious environments with natural feed, sunshine and movement — healthier birds with richer taste and better nutrition, and a reliable supply for the buyers who depend on us.',
    points: [
      'Broilers and kienyeji chickens',
      'Open, spacious growing environments',
      'Reliable supply for households and buyers',
    ],
    image: {
      src: '/images/operations-production.jpg',
      alt: 'Broilers and kienyeji chickens raised by Afrifama',
    },
  },
];
