import type { MetadataRoute } from 'next';
import { articles, products } from '@/data';
import { SITE_URL } from '@/lib/metadata';

const staticRoutes = [
  '',
  '/about',
  '/products',
  '/farmer-support',
  '/operations',
  '/stories',
  '/resources',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : route === '/products' ? 0.9 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/resources/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
