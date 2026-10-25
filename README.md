# Afrifama website

A production-built redesign of the Afrifama (poultry & feeds, Kenya) website: Next.js App Router, TypeScript, Tailwind CSS, Lucide icons. Server components by default; client components only where interaction requires it.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (lint + type check run as part of it)
npm run start
npm run lint     # next lint
npx tsc --noEmit # type check
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Cinematic video hero → three business pillars → featured products → farmer support → operations → testimonials → resources → final CTA |
| `/about` | Company story, mission/vision (published statements), three-part framework |
| `/products` | Product catalogue (chicks, feeds, kienyeji) with quote actions |
| `/products/[slug]` | Product detail with published specifications and enquiry CTAs |
| `/farmer-support` | Kukuza partnership: support split, three-phase programme |
| `/operations` | Hatchery, feed manufacturing, farmer partnership rows |
| `/stories` | Testimonials reproduced from afrifama.com + honest "features to come" state |
| `/resources` | Resource library with honest empty state and topic list |
| `/resources/[slug]` | Article template (`notFound()` until articles are added) |
| `/contact` | Contact details + validated enquiry form |
| `/privacy-policy`, `/terms-of-use` | Legal pages linked from the footer |
| `/api/contact` | POST endpoint for the contact form |
| `/sitemap.xml`, `/robots.txt`, `/icon.png` | SEO surface |

## Content architecture

All business content lives in `src/data/` and is typed; components never hardcode it:

- `site.ts` — verified name, tagline, phone, email, address, social profiles, hero video/poster URLs
- `nav.ts` — primary navigation and footer columns
- `pillars.ts` — the three business pillars
- `products.ts` — product records (slug, specs, images) plus `productBySlug`, `productOptions`, `quoteHref`, `specificationNote`
- `operations.ts`, `testimonials.ts`, `articles.ts` — operations, testimonials, resource articles (`articles` is intentionally empty, see limitations)

`src/lib/metadata.ts` builds per-page canonical/OG/Twitter metadata; `src/lib/structured-data.ts` emits Organization, WebSite, Product and Breadcrumb JSON-LD.

## Environment variables (`.env.example`)

| Variable | Required for | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Email delivery of contact form submissions | Resend API key (`https://resend.com`) |
| `CONTACT_TO_EMAIL` | Email delivery | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | Email delivery | Sender address verified in Resend (otherwise Resend's default is used) |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Optional override | Replaces the bundled hero MP4 without a rebuild of assets |

Until `RESEND_API_KEY` **and** `CONTACT_TO_EMAIL` are set, `POST /api/contact` responds `503` with the published phone/email and the form tells visitors to use them. The form never claims delivery that cannot happen.

## Assets

- `public/video/afrifama-hero.mp4` — 720p/≈1.8 MB re-encode of the supplied hero footage (muted, faststart). The untouched original is kept at `assets/afrifama-hero-source.mp4` — it is **1080p**, so a sharper hero encode is possible if the extra weight is acceptable.
- `public/images/hero-poster.jpg`, `film-frame-01…07.jpg` — 1920×1080 frames extracted from that footage, used as decorative page-hero imagery (`alt=""`).
- `public/images/operations-*.jpg` — the four operations/partnership photographs at **1200×600**, the largest size afrifama.com publishes (its theme crops those same photos to 370×570; the originals are the identically-framed source of those crops).
- `public/images/chicks.webp`, `feeds.webp`, `prod.webp` — product shots at 370×289, the largest size published upstream. `chicks.webp`/`prod.webp` are unused (`products.ts` `cutout`); `feeds.webp` is the decorative panel art on the home page — the one image still shown slightly above its native width.
- `public/images/og-afrifama.jpg` — 1200×630 social share image; `src/app/icon.png` — favicon.
- `public/images/logo-horizontal-dark.png` / `logo-horizontal-white.webp` — header/footer marks; `afrifama-logo.png` — structured-data logo.
- All imagery is local; the site makes **no** third-party image requests. Next's optimizer serves AVIF/WebP derivatives, so no file in `public/` is sent as-is.

## Design system

- **Palette** — forest `#174B32`, deep green `#102A1C`, harvest gold `#E9B949`, **pure white `#FFFFFF`** canvas (the `--ivory` / `--ivory-alt` tokens are aliased to white, so page/section/form/card surfaces render white), charcoal `#252D28`. There is **no warm-ivory tint left anywhere**: body copy on the dark-green sections (hero, pillars, testimonials, footer) is pure white at reduced opacity, which gives the same contrast without the cream cast.
- **Shape** — sharp rectangles (`border-radius: 0`) throughout: buttons and tags (nav "Request a Quote", hero CTAs, form submit, video control, heritage/category/meta/support tags, footer social buttons) as well as **cards, panels and image frames** (product/catalog/pillar/testimonial/story/step/resource/empty-state cards, contact form, spec boxes, ops media, ops tag chips + hover arrows, photo frames, detail image frames, map, testimonial avatar). Still rounded by intent: 4px category badge chips, 2px video progress track, 8px form fields / error box / skip link, and purely decorative circles (kicker dots, footer/contact icon discs, the catalog card arrow badge, empty-state and form-success icons).
- **Frosting** — `backdrop-filter` is used sparingly and at a *reduced* strength: the sticky header at `blur(6px)`, every other frosted surface (hero outline button, video control, category/story/location badges, mobile drawer overlay) at `blur(3px)`. Nothing relies on heavy blur for legibility.
- **Header / navigation** — one solid white bar on every page (the home hero included; there is no transparent-over-video state): dark logo left, rectangular chip links (filled forest when active, soft gold tint on hover), gold "Request a Quote" CTA right, and a subtle elevation that deepens on scroll. The seven links fit down to 1025px; at ≤1024px they collapse into the right-side drawer, which carries its own CTA and contact details.
- **Hero** — full-bleed background video (poster fallback; ≤767px or reduced-motion / data-saver keeps the still) under one open framing gradient plus a soft bottom band. Copy sits in a left column, anchored low: an eyebrow label ruled off by a trailing hairline, a two-line display headline in the same face (white + gold), the support line, then **one ruled action strip** that gathers both CTAs and the compact trust details behind a hairline. The bottom bar carries the video play/pause control with progress, a rectangular "Scroll to explore" chip and the region label. No rotating stamp badge, no pulsing status dot, no eyebrow chip, no glass buttons.
- **Subpage heroes** — the same flat language: one even vertical scrim over the still (`page-hero-shade`) instead of a left-to-right sweep, with no corner text mark.
- **Section hairlines** — consecutive white bands are separated by a 1px `--border-light` rule drawn full-bleed (home: pillars → products → partnership → operations, plus the existing rule above the subpage closing CTA). The rules are **background-aware**, so a line never appears against a dark band: `:has(+ …)` drops the rule where a dark section or the footer follows, and the operations rule is removed below 1024px, where the subpage hero becomes the first section.
- **Home "One integrated approach" section** — the three operations read as **one connected chain**: a ghost step numeral (01 / 02 / 03) joined to the next step by a hairline that ends in a small gold node, above an aligned, equal-height rectangular image panel. The numbered tag chips inside each image and the gold hover arrow are sharp-cornered. The rail and the connecting hairlines only render while the three steps sit side by side (≥1101px); at ≤1100px they stack into a single column and the rails drop away.
- **Home "One integrated approach" section** — the three operations read as **one connected chain**: a ghost step numeral (01 / 02 / 03) joined to the next step by a hairline that ends in a small gold node, above an aligned, equal-height rectangular image panel. The numbered tag chips inside each image and the gold hover arrow are sharp-cornered. The rail and the connecting hairlines only render while the three steps sit side by side (≥1101px); at ≤1100px they stack into a single column and the rails drop away.
- **Fonts** — Plus Jakarta Sans (display) + Inter (body), self-hosted via `next/font`.
- **Dev/prod coexistence** — a running `npm run dev` server and a production preview share `.next` by default, so each breaks the other's chunks (unstyled pages / CSS 500s). Build and start the prod preview in an isolated output directory instead: `NEXT_DIST_DIR=.next-prod npx next build && NEXT_DIST_DIR=.next-prod npx next start`.

## Working functionality

- **Contact form**: client-side validation (inline, `aria-invalid`, focus moved to first invalid field), server-side validation, honeypot spam trap, per-IP throttle (5 requests / 10 minutes), loading / success / error states, enquiry types mapped from `?type=` query links, product preselected from `?product=`.
- **Hero video**: poster renders in first paint; the `<video>` mounts only on viewports ≥768px without `prefers-reduced-motion` or data-saver, pauses when scrolled out of view, has a play/pause control, and falls back to the poster on load error.
- **Mobile navigation**: focus trap, Escape to close, scroll lock, focus returned to the toggle, `aria-current` on the active link.
- **Motion**: `Reveal` animations honour `prefers-reduced-motion` (instant reveal), and a global reduced-motion rule neutralises CSS animation.
- **SEO**: unique title/description + canonical + OG/Twitter on every route, sitemap with product/resource/legal URLs, `robots.txt`, Organization/WebSite/Product/Breadcrumb JSON-LD, semantic landmarks, one `h1` per page, alt text on content images.

## Content provenance — read before launch

Verified values (phone `+254 716 438 604`, email `info@afrifama.com`, Kaloleni Road, Mariakani–Kilifi address, the three pillars, mission/vision text, "up to 75%" feed-cost framing, "50+ farmers", guaranteed market access) were taken from the published afrifama.com site.

Limitations that remain **by design**:

1. **Testimonials** are reproduced verbatim from Afrifama's live site (Chef Brian Kimani, Sarah Wanjiku, Peter Otieno). If the site moves to new testimonials, update `src/data/testimonials.ts`.
2. **No fabricated data anywhere**: no invented prices, pack weights, formulas, statistics, articles, emails, phone numbers or social URLs. Product cards therefore show only published specification points plus an explicit note that pack sizes, pricing and availability are confirmed by the team.
3. **Resource library is empty** — the live blog posts are theme demo content, so `articles` is `[]` and `/resources` shows an honest empty state. `/resources/[slug]` returns 404 until real articles are added to `src/data/articles.ts`.
4. **No WhatsApp button**: no WhatsApp number is published/verified, so contextual "WhatsApp us" CTAs were deliberately not shipped; phone/email/contact-form fallbacks are used instead.
5. **Email delivery is not configured** until the Resend variables above are supplied — test a real submission before advertising the form.
6. **Privacy policy and terms of use are templates** for this site's actual behaviour; they need a legal review before launch.
7. **Rate limiting is per server instance** — adequate for a single Node deployment, not a substitute for edge/WAF rules on serverless.
8. **Hero footage** is the supplied clip re-encoded for the web; swap in a final cut via `NEXT_PUBLIC_HERO_VIDEO_URL` or by replacing `public/video/afrifama-hero.mp4`.
9. **Photography is capped by what afrifama.com publishes.** The operations photos are now served from the largest available originals (1200×600); the product shots only ever existed at 370×289. Nothing was upscaled or retouched to fake detail — supplying original high-resolution photography is the only way to improve those further.
