import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Check,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sprout,
  BookOpen,
  Quote,
} from 'lucide-react';
import { SectionHeading } from '@/components/Site';
import Reveal from '@/components/Reveal';
import {
  products,
  operations,
  testimonials,
  resourceTopics,
  quoteHref,
  specificationNote,
  site,
} from '@/data';

/* -------------------------------------------------------------------------- */
/*  Shared page furniture                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Full-bleed page header — premium cinematic redesign.
 *
 * Layers (bottom → top):
 *   1. Full-bleed background photograph (slow Ken-Burns drift)
 *   2. Depth gradient  — left-anchored directional wash
 *   3. Vignette        — bottom-up shadow
 *   4. Grain texture   — subtle noise overlay
 *   5. Content         — breadcrumb · eyebrow · title · copy
 *   6. Bottom bar      — decorative film-slate line
 */
export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  const sectionLabel = eyebrow.split(/[\/$·]/)[0].trim();
  const trail = breadcrumb ?? [{ label: 'Home', href: '/' }, { label: sectionLabel }];

  return (
    <section className="page-hero" aria-label={sectionLabel}>
      {/* ── Layer 1: Background photograph ─────────────────────────────── */}
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="page-hero-bg"
      />

      {/* ── Layer 2: Directional depth gradient ────────────────────────── */}
      <div className="page-hero-depth" aria-hidden="true" />

      {/* ── Layer 3: Bottom vignette ────────────────────────────────────── */}
      <div className="page-hero-vignette" aria-hidden="true" />

      {/* ── Layer 4: Noise grain texture ────────────────────────────────── */}
      <div className="page-hero-grain" aria-hidden="true" />

      {/* ── Layer 5: Content ────────────────────────────────────────────── */}
      <div className="wrap page-hero-inner">
        {/* Breadcrumb */}
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          {trail.map((item, index) => (
            <span className="breadcrumb-item" key={`${item.label}-${index}`}>
              {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {item.href && index < trail.length - 1 ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Gold accent rule — draws in on mount */}
        <span className="page-hero-accent-rule" aria-hidden="true" />

        {/* Eyebrow */}
        <p className="page-hero-eyebrow">
          <i className="kicker-dot" aria-hidden="true" />
          {eyebrow}
        </p>

        {/* Title */}
        <h1 className="display page-hero-title">{title}</h1>

        {/* Supporting copy */}
        <p className="page-hero-copy">{copy}</p>

        {/* Decorative scroll hint */}
        <div className="page-hero-scroll-hint" aria-hidden="true">
          <span className="page-hero-scroll-line" />
          <span className="page-hero-scroll-label">Scroll</span>
        </div>
      </div>

      {/* ── Layer 6: Bottom film-slate bar ──────────────────────────────── */}
      <div className="page-hero-bottom" aria-hidden="true">
        <span className="page-hero-bottom-label">{sectionLabel}</span>
        <span className="page-hero-bottom-rule" />
        <span className="page-hero-bottom-counter">
          {String(trail.length > 1 ? trail.length - 1 : 1).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="closing-section">
      <div className="wrap closing-inner">
        <div className="closing-text">
          <span className="eyebrow text-gold">Let’s Grow Together</span>
          <h2 className="display closing-title">
            A stronger flock
            <span className="heading-italic block text-gold">starts with a conversation.</span>
          </h2>
          <p className="closing-desc">
            Reach out to our Mariakani team about day-old chicks, poultry feed, farmer support or
            partnership opportunities.
          </p>
        </div>
        <div className="closing-actions">
          <Link href="/contact" className="btn btn-gold btn-large">
            <span>Talk With Our Team</span>
            <ArrowRight size={16} className="arrow" aria-hidden="true" />
          </Link>
          <a href={site.phoneHref} className="btn btn-outline btn-large">
            <Phone size={15} aria-hidden="true" />
            <span>{site.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** Honest note shown wherever product specifications appear. */
export function SpecNote() {
  return <p className="spec-note">{specificationNote}</p>;
}

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story / Mariakani, Kenya"
        title="Built from the ground up, with farmers in mind."
        copy="Afrifama began on a small broiler farm and grew into an integrated poultry business — chicks, feeds and farmer support, all from one place."
        image="/images/film-frame-01.jpg"
      />

      <section className="section story-copy">
        <div className="wrap story-copy-grid">
          <div className="story-meta-col">
            <span className="eyebrow text-forest">01 / The Journey</span>
            <div className="meta-line" aria-hidden="true" />
            <div className="meta-pill">Founded 2022</div>
            <div className="meta-note">Mariakani · Kilifi County</div>
          </div>
          <div className="story-main-col">
            <h2 className="display story-headline">
              A farmer’s challenge
              <span className="heading-italic block text-sage">became our life’s work.</span>
            </h2>
            <div className="story-prose">
              <p>
                Afrifama’s journey began in 2022 as a small broiler farm in Mariakani, Kilifi
                County. Like so many farmers across coastal Kenya, we experienced first-hand how
                rising feed costs, poor-quality chicks and inconsistent support can push a hard-working
                farm backwards.
              </p>
              <p>
                In 2024, Afrifama Feeds was founded to attack that problem directly. Working with
                Kenya’s leading feed formulation and animal nutrition experts, the team began
                producing affordable, nutrient-dense rations tailored to the needs of coastal farms —
                and feed costs came down while bird health and growth improved.
              </p>
              <p>
                Today Afrifama is an integrated poultry business: an in-house hatchery, feed
                manufacturing and poultry production, held together by farmer support programmes
                that keep knowledge and market access where they belong — with the farmer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision, using the company's published statements */}
      <section className="values-band" aria-labelledby="values-title">
        <div className="wrap values-grid">
          <div className="value-box">
            <span className="eyebrow text-gold">Our Mission</span>
            <h2 className="display value-heading" id="values-title">
              Empower poultry farmers to build
              <span className="heading-italic block text-gold">profitable, sustainable agribusinesses.</span>
            </h2>
            <p className="value-desc">
              We give farmers the tools, training and trusted products they need to get there —
              without the guesswork.
            </p>
          </div>
          <div className="value-box">
            <span className="eyebrow text-gold">Our Vision</span>
            <h3 className="display value-heading">
              Kenya’s most trusted
              <span className="heading-italic block text-gold">poultry brand.</span>
            </h3>
            <p className="value-desc">
              Transforming rural communities, advancing food security and creating lasting economic
              opportunity along the coast.
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="section bg-ivory" aria-labelledby="framework-title">
        <div className="wrap">
          <SectionHeading
            kicker="Our Integrated Framework"
            title={<span id="framework-title">Three parts. One shared purpose.</span>}
            copy="Every part of Afrifama reinforces the others, so quality stays consistent from hatchery to farm gate."
          />
          <div className="number-list-grid">
            <div className="number-list-card">
              <span className="list-card-num">01</span>
              <h3 className="display list-card-title">Vaccinated day-old chicks</h3>
              <p className="list-card-desc">
                Chicks are hatched in-house in Kilifi for strength and vaccinated for protection
                before they ever reach your farm.
              </p>
            </div>
            <div className="number-list-card">
              <span className="list-card-num">02</span>
              <h3 className="display list-card-title">Feed manufacturing</h3>
              <p className="list-card-desc">
                Affordable, nutrient-dense rations developed with Kenya’s leading feed formulation
                and animal nutrition experts.
              </p>
            </div>
            <div className="number-list-card">
              <span className="list-card-num">03</span>
              <h3 className="display list-card-title">Kukuza farmer partnership</h3>
              <p className="list-card-desc">
                Training, technical advice and guaranteed market access help partner farmers cut
                losses and sell at fair prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Products catalogue                                                         */
/* -------------------------------------------------------------------------- */

export function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products / Made for the Journey"
        title="Quality inputs for a stronger flock."
        copy="Explore Afrifama’s poultry products, then contact our Mariakani team for current availability and the right fit for your farm."
        image="/images/film-frame-02.jpg"
      />

      <section className="section product-catalog-section" aria-labelledby="catalog-title">
        <div className="wrap">
          <div className="product-catalog-intro">
            <div>
              <span className="eyebrow text-forest">The Afrifama range</span>
              <h2 className="display text-3xl md:text-4xl text-forest mt-2" id="catalog-title">
                Dependable inputs, batch after batch.
              </h2>
            </div>
            <p className="catalog-lead-text">
              We focus on the non-negotiables: strong, vaccinated chicks at hatch,
              nutritionist-formulated feed, and properly raised poultry from our own production
              units.
            </p>
          </div>

          <div className="catalog-grid">
            {products.map((product, idx) => (
              <article className="catalog-card" key={product.slug}>
                <Link href={`/products/${product.slug}`} className="catalog-media-link">
                  <span className="catalog-img-wrap">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={idx === 0}
                      className="image-cover"
                    />
                    <span className="catalog-badge">
                      0{idx + 1} · {product.category}
                    </span>
                    <span className="catalog-arrow-overlay" aria-hidden="true">
                      <ArrowUpRight size={20} />
                    </span>
                  </span>
                </Link>

                <div className="catalog-content">
                  <span className="eyebrow text-sage">{product.eyebrow}</span>
                  <h3 className="display catalog-product-title">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="catalog-product-desc">{product.description}</p>

                  <div className="catalog-specs-row">
                    {product.specs.map((spec) => (
                      <span key={spec} className="catalog-spec-chip">
                        <Check size={12} className="text-forest" aria-hidden="true" />
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="catalog-actions-row">
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
            ))}
          </div>

          <SpecNote />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Single product                                                             */
/* -------------------------------------------------------------------------- */

export function ProductPage({ slug }: { slug: string }) {
  const product = products.find((item) => item.slug === slug);
  if (!product) return null;

  return (
    <>
      <section className="product-detail-hero">
        <div className="wrap">
          <div className="detail-hero-layout">
            <div className="detail-hero-media">
              <div className="detail-img-frame">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="image-cover"
                />
                <span className="detail-tag-float">
                  <Sprout size={16} className="text-gold" aria-hidden="true" />
                  <span>Supplied from our Mariakani base</span>
                </span>
              </div>
            </div>

            <div className="detail-hero-info">
              <nav className="detail-breadcrumb page-breadcrumb page-breadcrumb-light" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={13} aria-hidden="true" />
                <Link href="/products">Products</Link>
                <ChevronRight size={13} aria-hidden="true" />
                <span aria-current="page">{product.name}</span>
              </nav>
              <span className="eyebrow text-forest mt-4 block">{product.category}</span>
              <h1 className="display detail-hero-heading">{product.name}</h1>
              <p className="detail-lead-text">{product.detail}</p>

              <div className="detail-specs-box">
                <h2 className="detail-specs-title">Key specifications</h2>
                <ul className="detail-specs-list">
                  {product.specs.map((spec) => (
                    <li key={spec}>
                      <CheckCircle2 size={16} className="text-gold shrink-0" aria-hidden="true" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
                <SpecNote />
              </div>

              <div className="detail-cta-row">
                <Link className="btn btn-gold btn-large" href={quoteHref(product)}>
                  <span>Request a Quote</span>
                  <ArrowRight size={16} className="arrow" aria-hidden="true" />
                </Link>
                <a href={site.phoneHref} className="btn btn-outline-dark btn-large">
                  <Phone size={15} aria-hidden="true" />
                  <span>Call to check availability</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-advisory-section">
        <div className="wrap">
          <div className="advisory-card">
            <span className="eyebrow text-forest">{product.eyebrow}</span>
            <h2 className="display advisory-heading">
              Every flock has its own stage and goal.
              <span className="heading-italic block text-sage">We’ll help you plan the next step.</span>
            </h2>
            <p className="advisory-copy">
              Tell our team your flock size, stage of production and plans for the coming cycle. We
              will help you match chicks, feed and timing to what your farm can realistically carry.
            </p>
            <div className="advisory-actions">
              <Link className="btn btn-green" href={quoteHref(product)}>
                <span>Talk with our team</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Farmer support (Kukuza partnership)                                        */
/* -------------------------------------------------------------------------- */

export function SupportPage() {
  const steps = [
    {
      badge: 'Phase 01',
      title: 'Learn',
      desc: 'Training and practical technical advice help farmers prepare well and cut chick mortality from day one.',
      points: ['Chick and flock handling', 'Feeding and farm hygiene basics'],
    },
    {
      badge: 'Phase 02',
      title: 'Grow',
      desc: 'Mentorship continues as the flock grows, turning good practice into confident, repeatable farming.',
      points: ['Ongoing technical advice', 'Support through the vulnerable stages'],
    },
    {
      badge: 'Phase 03',
      title: 'Earn',
      desc: 'Guaranteed market access closes the loop: no brokers, no exploitation — partner farmers sell back at fair prices.',
      points: ['Fair, dependable off-take', 'Planning for the next cycle'],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="The Kukuza Programme / Farmer Support"
        title="Your ambition deserves a reliable partner."
        copy="Training, practical flock advice and reliable market access — built around the real day-to-day of poultry farming in coastal Kenya."
        image="/images/film-frame-03.jpg"
      />

      <section className="section support-intro-section" aria-labelledby="support-page-title">
        <div className="wrap">
          <div className="support-split-layout">
            <div className="support-img-col">
              <Reveal direction="fade" delay={80}>
                <div className="support-frame">
                  <Image
                    src="/images/operations-farmers-partnership.jpg"
                    alt="Farmers taking part in the Afrifama partnership programme"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="image-cover"
                  />
                  <span className="support-tag">
                    <Sprout size={15} className="text-gold" aria-hidden="true" />
                    <span>Kukuza farmer partnership · Coastal Kenya</span>
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="support-text-col">
              <span className="eyebrow text-forest">More Than a Supplier</span>
              <h2 className="display support-headline" id="support-page-title">
                Farmer success is
                <span className="heading-italic block text-sage">our shared success.</span>
              </h2>
              <p className="support-lead">
                Through the Kukuza partnership, Afrifama brings training, technical advice and
                guaranteed market access into one programme — because good inputs alone do not build
                a profitable farm.
              </p>
              <p className="support-body">
                When a farmer has strong chicks, dependable feed, real training and a fair route to
                market, poultry farming stops being a gamble and starts becoming a business that
                feeds families and pays school fees.
              </p>

              <div className="support-action-box">
                <Link className="btn btn-green btn-large" href="/contact?type=Partnership">
                  <span>Inquire About the Kukuza Programme</span>
                  <ArrowRight size={15} className="arrow" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="support-steps-section bg-ivory" aria-labelledby="steps-title">
        <div className="wrap">
          <SectionHeading
            kicker="How We Partner"
            title={<span id="steps-title">Support for the work at every stage.</span>}
            copy="From first placement through to a fair sale, the Kukuza programme follows the whole cycle."
          />

          <div className="steps-three-grid">
            {steps.map((step, index) => (
              <Reveal key={step.badge} delay={index * 110} className="step-wrap">
                <article className="step-card">
                  <span className="step-badge">{step.badge}</span>
                  <h3 className="display step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                  <ul className="step-points">
                    {step.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Operations                                                                 */
/* -------------------------------------------------------------------------- */

export function OperationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Operations / From Hatch to Harvest"
        title="Connected at every step."
        copy="Hatchery, feed manufacturing and poultry production under one integrated roof — so quality never has to leave our hands."
        image="/images/film-frame-04.jpg"
      />

      <section className="section ops-page-section" aria-labelledby="ops-page-title">
        <div className="wrap">
          <div className="ops-page-intro">
            <span className="eyebrow text-forest">The Mariakani Operations Hub</span>
            <h2 className="display text-3xl md:text-5xl text-forest mt-3" id="ops-page-title">
              Precision agriculture, rooted in the coast.
            </h2>
            <p className="ops-page-lead">
              Owning each phase of the chain lets Afrifama control chick strength, feed quality and
              flock welfare instead of hoping for them.
            </p>
          </div>

          <div className="ops-detailed-rows">
            {operations.map((operation, idx) => (
              <article
                className={`ops-detail-row ${idx % 2 !== 0 ? 'is-reversed' : ''}`}
                key={operation.title}
              >
                <div className="ops-row-media">
                  <div className="ops-img-container">
                    <Image
                      src={operation.image.src}
                      alt={operation.image.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="image-cover"
                    />
                    <span className="ops-badge-tag">{operation.tag}</span>
                  </div>
                </div>

                <div className="ops-row-copy">
                  <span className="eyebrow text-sage">Stage {operation.index} of 03</span>
                  <h3 className="display ops-heading">{operation.title}</h3>
                  <p className="ops-paragraph">{operation.body}</p>

                  <ul className="ops-guarantees">
                    {operation.points.map((point) => (
                      <li className="guarantee-item" key={point}>
                        <Check size={16} className="text-forest" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className="btn btn-green mt-6 inline-flex">
                    <span>Ask about {operation.title}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Farmer stories & testimonials                                              */
/* -------------------------------------------------------------------------- */

export function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Farmer Stories / Voices From the Coast"
        title="Real farms. Real growth."
        copy="Customers and partner farmers describe, in their own words, what changes when the inputs and the support are dependable."
        image="/images/film-frame-05.jpg"
      />

      <section className="section stories-grid-section" aria-labelledby="voices-title">
        <div className="wrap">
          <SectionHeading
            kicker="What others say about Afrifama"
            title={<span id="voices-title">Trusted on farms and in kitchens.</span>}
            copy="Testimonials published by Afrifama customers and shared with their permission."
          />

          <div className="testimonials-grid testimonials-grid-light">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 110} className="testimonial-wrap">
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

          <Reveal delay={120}>
            <div className="empty-state-card empty-state-wide">
              <span className="empty-state-icon" aria-hidden="true">
                <BookOpen size={22} />
              </span>
              <h2 className="display empty-state-title">Long-form farmer features are next</h2>
              <p className="empty-state-copy">
                We only publish stories we can stand behind, so detailed farm profiles will appear
                here as they are written up with the farmers involved. If you farm with Afrifama and
                would like to be featured, we would love to hear from you.
              </p>
              <div className="empty-state-actions">
                <Link href="/contact?type=farmer-story" className="btn btn-green btn-sm">
                  <span>Share your story</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/stories#voices-title" className="text-link">
                  <span>Read the testimonials above</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Resources                                                                  */
/* -------------------------------------------------------------------------- */

export function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources / Notes From the Field"
        title="Knowledge for the long run."
        copy="A growing library of practical, field-tested guidance for coastal poultry producers — nothing published until it is worth reading."
        image="/images/film-frame-06.jpg"
      />

      <section className="section resources-catalog-section" aria-labelledby="library-title">
        <div className="wrap">
          <div className="resources-editorial-layout resources-editorial-page">
            <div className="resources-intro-col">
              <span className="eyebrow text-forest">The library</span>
              <h2 className="display resources-heading" id="library-title">
                Practical guidance
                <span className="heading-italic block text-sage">for the long run.</span>
              </h2>
              <p className="resources-lead">
                Field guides, checklists and explainers will live here. Each one will be written
                from work on real coastal farms — not recycled from somewhere else.
              </p>
              <div className="resource-topics" aria-label="Topics the library will cover">
                {resourceTopics.map((topic) => (
                  <span key={topic} className="resource-topic-chip">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="resources-cards-col">
              <div className="empty-state-card">
                <span className="empty-state-icon" aria-hidden="true">
                  <BookOpen size={22} />
                </span>
                <h2 className="display empty-state-title">No guides published yet</h2>
                <p className="empty-state-copy">
                  The library starts empty on purpose: we publish guidance we can stand behind.
                  Until the first guides land, our team answers questions directly — brooding, feed
                  planning, flock health or market access.
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
            </div>
          </div>

          <div className="resource-help-banner">
            <div className="banner-content">
              <h3 className="display text-2xl text-forest">
                Have a specific flock management question?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Send it through and the Afrifama team will point you in the right direction.
              </p>
            </div>
            <Link href="/contact?type=farmer-support" className="btn btn-green">
              <span>Ask our team</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Static legal pages                                                         */
/* -------------------------------------------------------------------------- */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  image,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} copy={intro} image={image} />

      <section className="section legal-section">
        <div className="wrap legal-layout">
          <div className="legal-prose">
            {sections.map((section) => (
              <section key={section.heading} aria-label={section.heading}>
                <h2 className="display legal-heading">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="legal-aside" aria-label="Contact about this page">
            <span className="eyebrow text-forest">Questions?</span>
            <p>
              If you would like to know how Afrifama handles your information, contact us directly.
            </p>
            <a href={site.phoneHref} className="legal-contact-row">
              <Phone size={15} aria-hidden="true" />
              <span>{site.phoneDisplay}</span>
            </a>
            <a href={`mailto:${site.email}`} className="legal-contact-row">
              <Mail size={15} aria-hidden="true" />
              <span>{site.email}</span>
            </a>
            <div className="legal-contact-row">
              <MapPin size={15} aria-hidden="true" />
              <span>{site.address.display.join(', ')}</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
