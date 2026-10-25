import { site } from '@/data';
import { SITE_URL } from '@/lib/metadata';

/**
 * Structured data (JSON-LD) built only from verified business information.
 * Prices, ratings, availability and stock are deliberately omitted because
 * they have not been confirmed by the company.
 */

const address = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  addressCountry: site.address.country === 'Kenya' ? 'KE' : site.address.country,
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: site.name,
      alternateName: 'Afrifama Poultry',
      url: SITE_URL,
      logo: `${SITE_URL}/images/afrifama-logo.png`,
      description: site.description,
      email: site.email,
      telephone: '+254716438604',
      address,
      sameAs: site.socials.map((social) => social.href),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+254716438604',
          email: site.email,
          contactType: 'Customer enquiries',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export interface ProductJsonLdInput {
  name: string;
  description: string;
  category: string;
  image: string;
}

/** Product schema — no offers/price/availability, since those are unverified. */
export function productJsonLd(product: ProductJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    image: [`${SITE_URL}${product.image}`],
    brand: {
      '@type': 'Brand',
      name: site.name,
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: site.name,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}
