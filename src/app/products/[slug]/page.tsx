import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductPage } from '@/components/Pages';
import { productBySlug, products } from '@/data';
import { pageMetadata, DEFAULT_OG_IMAGE } from '@/lib/metadata';
import { productJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = productBySlug(params.slug);
  if (!product) return pageMetadata({ title: 'Product', description: 'Afrifama poultry products.', path: '/products' });

  return pageMetadata({
    title: product.name,
    description: `${product.summary} ${product.description}`,
    path: `/products/${product.slug}`,
    image: DEFAULT_OG_IMAGE,
  });
}

export default function ProductRoute({ params }: ProductPageProps) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  const structuredData = [
    productJsonLd({
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image.src,
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: product.name, path: `/products/${product.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductPage slug={params.slug} />
    </>
  );
}
