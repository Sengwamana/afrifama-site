/**
 * Editorial resource library.
 *
 * `articles` is intentionally EMPTY: Afrifama has no verified articles, so the
 * resources pages render an honest empty state rather than fabricated posts or
 * fake publication dates.
 *
 * To publish a guide, add an entry with verified content, for example:
 *
 * {
 *   slug: 'brooding-the-first-14-days',
 *   title: 'Brooding the first 14 days',
 *   excerpt: 'One-paragraph summary shown on cards and in meta descriptions.',
 *   category: 'Brooding',
 *   publishedAt: '2026-01-15', // ISO date, only once the article is live
 *   readingMinutes: 5,
 *   body: ['Paragraph one.', 'Paragraph two.'],
 * }
 *
 * Cards, listing pages and the article template will pick it up automatically.
 */

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date (YYYY-MM-DD). Only set this for genuinely published articles. */
  publishedAt: string;
  readingMinutes: number;
  body: string[];
}

export const articles: Article[] = [];

export function articleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Subject areas the resource library will cover — shown while `articles`
 * is empty so visitors still know where to send their questions.
 */
export const resourceTopics: string[] = [
  'Brooding & chick care',
  'Feed planning & nutrition',
  'Flock health & biosecurity',
  'Farm business & market access',
];
