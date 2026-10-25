import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  MapPin,
  Quote,
  Sprout,
} from 'lucide-react';
import { SectionHeading } from '@/components/Site';
import CinematicHero from '@/components/CinematicHero';
import ParallaxMedia from '@/components/ParallaxMedia';
import Reveal from '@/components/Reveal';
import { pillars, products, operations, testimonials, resourceTopics, quoteHref, site } from '@/data';
import { pageMetadata } from '@/lib/metadata';

/** Homepage metadata — canonical "/" plus Open Graph and Twitter cards. */
const homeMetadata = pageMetadata({
  title: site.tagline,
  description: site.description,
  path: '/',
});

export const metadata: Metadata = {
  ...homeMetadata,
  title: { absolute: `${site.name} | ${site.tagline}` },
};

export default function HomePage() {
  return (
    <>
      {/* --------------------------------------------------------- A. Cinematic scroll film */}
      <CinematicHero />

      {/* ------------------------------------------------------------ B. Introduction */}
      <section className="intro-story" id="introduction" aria-labelledby="intro-title">
        <div className="wrap intro-story__grid">
          <Reveal variant="eyebrow" className="intro-story__aside">
            <span className="eyebrow text-forest">
              <i className="kicker-dot" aria-hidden="true" />
              The journey
            </span>
            <span className="intro-story__index" aria-hidden="true">
              01
            </span>
            <span className="intro-story__rule" aria-hidden="true" />
            <p className="intro-story__aside-copy">
              From the hatchery to the farm gate, built around the people who raise the birds.
            </p>
          </Reveal>

          <div className="intro-story__main">
            <Reveal variant="heading">
              <h2 className="display intro-story__title" id="intro-title">
                Poultry farming is a journey.
                <span className="heading-italic block text-sage">We’re in it with you.</span>
              </h2>
            </Reveal>

            <div className="intro-story__body">
              <Reveal variant="paragraph" delay={80}>
                <p className="intro-story__lead">
                  Afrifama works alongside poultry farmers from the first day-old chick to the
                  final sale — with strong inputs, dependable feed and practical support that
                  holds up on a working farm.
                </p>
              </Reveal>
              <Reveal variant="paragraph" delay={160}>
                <p>
                  Our hatchery, feed mill and production units sit close together in Mariakani so
                  quality stays in our hands. Just as importantly, our team stays close to the
                  farmers who put that quality to work.
                </p>
              </Reveal>
            </div>

            <Reveal variant="cta" delay={240}>
              <div className="intro-story__actions">
                <Link href="/about" className="text-link">
                  <span>More about Afrifama</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <span className="intro-story__place">
                  <MapPin size={14} aria-hidden="true" />
                  Mariakani · Kilifi County
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- C. Business pillars */}
      <section className="pillars-section" id="pillars" aria-labelledby="pillars-title">
        <div className="wrap">
          <div className="section-header-row">
            <Reveal variant="heading" delay={40}>
              <SectionHeading
                kicker="What we do"
                title={<span id="pillars-title">Three pillars. One poultry business.</span>}
                copy="Afrifama operates across three pillars — vaccinated day-old chicks, feed manufacturing and farmer partnerships — designed to help farmers build profitable poultry enterprises."
              />
            </Reveal>
            <Reveal variant="cta" delay={140}>
              <Link href="/about" className="text-link header-action-link">
                <span>More about Afrifama</span>
                <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="pillars-grid">
            {/* Pillar 01 — full-bleed photography */}
            <Reveal variant="card" delay={80} className="pillar-wrap pillar-wrap-photo">
              <article className="pillar-card pillar-photo">
                <Image
                  src={pillars[0].image.src}
                  alt={pillars[0].image.alt}
                  fill
                  sizes="(max-width: 1100px) 100vw, 58vw"
                  className="pillar-photo-img"
                />
                <div className="pillar-photo-shade" aria-hidden="true" />
                <div className="pillar-body">
                  <span className="pillar-index">
                    {pillars[0].index} / {pillars[0].eyebrow}
                  </span>
                  <h3 className="display pillar-title">{pillars[0].title}</h3>
                  <p className="pillar-summary">{pillars[0].summary}</p>
                  <ul className="pillar-points">
                    {pillars[0].points.map((point) => (
                      <li key={point}>
                        <Check size={14} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="pillar-actions">
                    <Link href={pillars[0].href} className="btn btn-gold btn-sm">
                      <span>{pillars[0].linkLabel}</span>
                      <ArrowRight size={14} className="arrow" />
                    </Link>
                    <Link href={pillars[0].quoteHref} className="pillar-quote-link">
                      Request a Quote
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Pillar 02 — dark editorial panel with product cut-out */}
            <Reveal variant="card" delay={180} className="pillar-wrap pillar-wrap-panel">
              <article className="pillar-card pillar-panel">
                <div className="pillar-panel-art" aria-hidden="true">
                  <Image
                    src={pillars[1].image.src}
                    alt=""
                    fill
                    sizes="(max-width: 1100px) 60vw, 34vw"
                    className="pillar-panel-img"
                  />
                </div>
                <div className="pillar-body">
                  <span className="pillar-index">
                    {pillars[1].index} / {pillars[1].eyebrow}
                  </span>
                  <h3 className="display pillar-title">{pillars[1].title}</h3>
                  <p className="pillar-summary">{pillars[1].summary}</p>
                  <ul className="pillar-points">
                    {pillars[1].points.map((point) => (
                      <li key={point}>
                        <Check size={14} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="pillar-actions">
                    <Link href={pillars[1].href} className="btn btn-gold btn-sm">
                      <span>{pillars[1].linkLabel}</span>
                      <ArrowRight size={14} className="arrow" />
                    </Link>
                    <Link href={pillars[1].quoteHref} className="pillar-quote-link">
                      Request a Quote
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Pillar 03 — horizontal split */}
            <Reveal variant="card" delay={120} className="pillar-wrap pillar-wrap-split">
              <article className="pillar-card pillar-split">
                <div className="pillar-split-media">
                  <Image
                    src={pillars[2].image.src}
                    alt={pillars[2].image.alt}
                    fill
                    sizes="(max-width: 1100px) 100vw, 34vw"
                    className="pillar-split-img"
                  />
                </div>
                <div className="pillar-body pillar-body-split">
                  <span className="pillar-index">
                    {pillars[2].index} / {pillars[2].eyebrow}
                  </span>
                  <h3 className="display pillar-title">{pillars[2].title}</h3>
                  <p className="pillar-summary">{pillars[2].summary}</p>
                  <ul className="pillar-points">
                    {pillars[2].points.map((point) => (
                      <li key={point}>
                        <Check size={14} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="pillar-actions">
                    <Link href={pillars[2].href} className="btn btn-green btn-sm">
                      <span>{pillars[2].linkLabel}</span>
                      <ArrowRight size={14} className="arrow" />
                    </Link>
                    <Link href={pillars[2].quoteHref} className="pillar-quote-link pillar-quote-dark">
                      Start a partnership enquiry
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- D. Featured products */}
      <section className="products-section" id="products" aria-labelledby="products-title">
        <div className="wrap">
          <div className="section-header-row">
            <Reveal variant="heading" delay={50}>
              <SectionHeading
                kicker="Featured products"
                title={<span id="products-title">Good farming starts with good partners.</span>}
                copy="Dependable poultry inputs from our Mariakani base — every product backed by our own hatchery, feed mill and production units."
              />
            </Reveal>
            <Reveal variant="cta" delay={150}>
              <Link href="/products" className="text-link header-action-link">
                <span>Explore all products</span>
                <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="product-cards-grid">
            {products.map((product, index) => (
              <Reveal key={product.slug} variant="card" delay={index * 110} className="product-card-wrap">
                <article className="product-card" aria-labelledby={`product-${product.slug}`}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="card-media"
                    aria-label={`View details for ${product.name}`}
                  >
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="card-image"
                    />
                    <span className="card-gradient-overlay" aria-hidden="true" />
                    <span className="card-category-badge">{product.category}</span>
                    <span className="card-hover-arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>

                  <div className="card-body">
                    <div className="card-body-top">
                      <span className="card-eyebrow">
                        0{index + 1} · {product.eyebrow}
                      </span>
                      <h3 className="display card-title" id={`product-${product.slug}`}>
                        <Link href={`/products/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <p className="card-desc">{product.summary}</p>
                    </div>

                    <div className="card-specs">
                      {product.specs.slice(0, 3).map((spec) => (
                        <span key={spec} className="spec-tag">
                          <Check size={12} aria-hidden="true" />
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="card-actions">
                      <Link href={`/products/${product.slug}`} className="btn btn-green btn-sm">
                        <span>View Details</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                      <Link href={quoteHref(product)} className="btn btn-outline-dark btn-sm">
                        <span>Request a Quote</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ E. Farmer support */}
      <section className="partnership-section" id="partnership" aria-labelledby="support-title">
        <div className="wrap">
          <div className="partnership-grid">
            <div className="partnership-media-col">
              <Reveal variant="image" delay={80}>
                <div className="partnership-photo-frame">
                  <ParallaxMedia
                    src="/images/operations-farmers-partnership.jpg"
                    alt="Farmers taking part in the Afrifama partnership programme"
                    sizes="(max-width: 900px) 100vw, 50vw"
                    strength={58}
                  />
                  <span className="photo-caption-tag">
                    <Sprout size={15} aria-hidden="true" />
                    <span>Kukuza farmer partnership · Coastal Kenya</span>
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="partnership-text-col">
              <Reveal variant="paragraph" delay={140}>
                <span className="eyebrow text-forest">Farmer support</span>
                <h2 className="display partnership-heading" id="support-title">
                  Your ambition.
                  <span className="heading-italic block text-sage">Our shared work.</span>
                </h2>
                <p className="partnership-lead">
                  Through the Kukuza partnership, Afrifama brings training, technical advice and
                  guaranteed market access together — so a poultry enterprise can take root and
                  keep growing.
                </p>

                <div className="partnership-pillars-list">
                  <div className="pillar-row">
                    <span className="pillar-num">01</span>
                    <div className="pillar-info">
                      <h3 className="pillar-title">Training that cuts chick mortality</h3>
                      <p className="pillar-sub">
                        Practical training and technical advice help farmers protect their flock
                        through its most vulnerable stage.
                      </p>
                    </div>
                  </div>
                  <div className="pillar-row">
                    <span className="pillar-num">02</span>
                    <div className="pillar-info">
                      <h3 className="pillar-title">Mentorship on the farm</h3>
                      <p className="pillar-sub">
                        Support continues after placement, so good practice turns into confident,
                        repeatable farming.
                      </p>
                    </div>
                  </div>
                  <div className="pillar-row">
                    <span className="pillar-num">03</span>
                    <div className="pillar-info">
                      <h3 className="pillar-title">Guaranteed market access</h3>
                      <p className="pillar-sub">
                        No brokers, no exploitation — partner farmers sell back at fair prices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="partnership-actions">
                  <Link href="/farmer-support" className="btn btn-green">
                    <span>Explore farmer support</span>
                    <ArrowRight size={15} className="arrow" />
                  </Link>
                  <Link href="/contact?type=Partnership" className="text-link">
                    <span>Submit a partnership enquiry</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- F. Our operations */}
      <section className="operations-section" id="operations" aria-labelledby="operations-title">
        <div className="wrap">
          <div className="section-header-row">
            <Reveal variant="heading" delay={60}>
              <SectionHeading
                kicker="Our operations"
                title={<span id="operations-title">One integrated approach.</span>}
                copy="From our Mariakani base, hatchery, feed manufacturing and poultry production work together to keep quality high and costs sensible."
              />
            </Reveal>
            <Reveal variant="cta" delay={160}>
              <Link href="/operations" className="text-link header-action-link">
                <span>See our operations</span>
                <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="ops-chain">
            {operations.map((operation, index) => (
              <Reveal key={operation.title} variant="card" delay={index * 120} className="ops-step-wrap">
                <article className={`ops-step${index === operations.length - 1 ? ' ops-step-last' : ''}`}>
                  <span className="ops-step-rail" aria-hidden="true">
                    <span className="ops-step-num">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <Link
                    href="/operations"
                    className="ops-step-link"
                    aria-label={`Learn about our ${operation.title} operations`}
                  >
                    <span className="ops-step-media">
                      <Image
                        src={operation.image.src}
                        alt=""
                        fill
                        sizes="(max-width: 1100px) 100vw, 33vw"
                        className="image-cover"
                      />
                      <span className="op-gradient" aria-hidden="true" />
                      <span className="op-tag">{operation.tag}</span>
                      <span className="op-hover-arrow" aria-hidden="true">
                        <ArrowUpRight size={18} />
                      </span>
                    </span>
                    <span className="ops-step-content">
                      <span className="ops-step-title display">{operation.title}</span>
                      <span className="ops-step-text">{operation.summary}</span>
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- G. Farmer stories & testimonials */}
      <section className="testimonials-section" id="stories" aria-labelledby="stories-title">
        <div className="wrap">
          <div className="testimonials-header">
            <Reveal variant="heading" delay={40}>
              <SectionHeading
                dark
                kicker="Farmer stories & testimonials"
                title={
                  <span id="stories-title">
                    Every farm has a story.
                    <span className="heading-italic block text-gold">
                      Let’s write the next chapter.
                    </span>
                  </span>
                }
                copy="Customers across the coast describe what changes when the inputs and the support are dependable."
              />
            </Reveal>
            <Reveal variant="cta" delay={140}>
              <Link href="/stories" className="text-link text-link-gold">
                <span>Farmer stories</span>
                <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} variant="card" delay={index * 110} className="testimonial-wrap">
                <figure className="testimonial-card">
                  <Quote size={26} className="testimonial-quote-icon" aria-hidden="true" />
                  <blockquote className="testimonial-text">
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                  <figcaption className="testimonial-author">
                    <span className="testimonial-avatar" aria-hidden="true">
                      {testimonial.initials}
                    </span>
                    <span className="testimonial-identity">
                      <strong>{testimonial.name}</strong>
                      <small>{testimonial.role}</small>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="testimonials-footer">
            <p>Are you an Afrifama customer? We would like to feature your farm next.</p>
            <Link href="/contact?type=farmer-story" className="btn btn-gold">
              <span>Share your story</span>
              <ArrowRight size={15} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- H. Resources */}
      <section className="resources-section" id="resources" aria-labelledby="resources-title">
        <div className="wrap">
          <div className="resources-editorial-layout">
            <div className="resources-intro-col">
              <Reveal delay={60}>
                <span className="eyebrow text-forest">Resources</span>
                <h2 className="display resources-heading" id="resources-title">
                  Practical guidance
                  <span className="heading-italic block text-sage">for the long run.</span>
                </h2>
                <p className="resources-lead">
                  The Afrifama resource library will hold field-tested guides for poultry farmers.
                  Until the first guides are published, our team answers questions directly.
                </p>
                <div className="resource-topics" aria-label="Topics the library will cover">
                  {resourceTopics.map((topic) => (
                    <span key={topic} className="resource-topic-chip">
                      {topic}
                    </span>
                  ))}
                </div>
                <Link href="/resources" className="btn btn-green mt-6 inline-flex">
                  <span>Visit the resource library</span>
                  <ArrowRight size={15} className="arrow" />
                </Link>
              </Reveal>
            </div>

            <div className="resources-cards-col">
              <Reveal variant="card" delay={160}>
                <div className="empty-state-card">
                  <span className="empty-state-icon" aria-hidden="true">
                    <BookOpen size={22} />
                  </span>
                  <h3 className="display empty-state-title">No field guides published yet</h3>
                  <p className="empty-state-copy">
                    We only publish guidance we can stand behind, so this library starts empty.
                    Send us your question about brooding, feed planning or flock health and we will
                    point you in the right direction.
                  </p>
                  <div className="empty-state-actions">
                    <Link href="/contact?type=farmer-support" className="btn btn-green btn-sm">
                      <span>Ask our team</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <a href={site.phoneHref} className="text-link">
                      <span>Call {site.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ I. Final CTA */}
      <section className="final-cta-section" id="contact-cta" aria-labelledby="cta-title">
        <div className="wrap">
          <Reveal variant="cta" delay={100}>
            <div className="cta-container">
              <span className="cta-accent-star" aria-hidden="true">
                ✳
              </span>
              <span className="eyebrow text-gold">Let’s grow together</span>

              <h2 className="display cta-heading" id="cta-title">
                Let’s grow your poultry
                <span className="heading-italic block text-gold">business together.</span>
              </h2>

              <p className="cta-subtext">
                Get in touch with Afrifama to explore poultry products, farmer support, or business
                partnerships.
              </p>

              <div className="cta-buttons-row">
                <Link href="/contact" className="btn btn-gold btn-large">
                  <span>Contact Afrifama</span>
                  <ArrowRight size={16} className="arrow" />
                </Link>
                <Link href="/products" className="btn btn-outline btn-large">
                  <span>Explore Products</span>
                </Link>
              </div>

              <div className="cta-direct-info">
                <span>
                  Call: <a href={site.phoneHref}>{site.phoneDisplay}</a>
                </span>
                <span className="divider" aria-hidden="true">
                  ·
                </span>
                <span>
                  Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                </span>
                <span className="divider" aria-hidden="true">
                  ·
                </span>
                <span>{site.address.display.join(' ')}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
