import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ClosingCta, PageHero } from '@/components/Pages';
import { articleBySlug, articles } from '@/data';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/metadata';

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = articleBySlug(params.slug);
  if (!article) {
    return pageMetadata({
      title: 'Resource',
      description: 'Afrifama poultry farming resources.',
      path: '/resources',
    });
  }

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/resources/${article.slug}`,
    ogType: 'article',
  });
}

export default function ArticleRoute({ params }: ArticlePageProps) {
  const article = articleBySlug(params.slug);
  if (!article) notFound();

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.publishedAt,
      inLanguage: 'en',
      author: { '@type': 'Organization', name: 'Afrifama' },
      publisher: { '@type': 'Organization', name: 'Afrifama', url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/resources/${article.slug}`,
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Resources', path: '/resources' },
      { name: article.title, path: `/resources/${article.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero
        eyebrow={`Resources / ${article.category}`}
        title={article.title}
        copy={article.excerpt}
        image="/images/film-frame-01.jpg"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: article.title },
        ]}
      />

      <article className="article-body">
        <div className="wrap">
          <p className="article-meta">
            {new Date(article.publishedAt).toLocaleDateString('en-KE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            · {article.readingMinutes} min read
          </p>
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <Link href="/resources" className="text-link">
              <span>Back to all resources</span>
            </Link>
          </p>
        </div>
      </article>

      <ClosingCta />
    </>
  );
}
