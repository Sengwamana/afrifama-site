'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { primaryNav, footerExplore, footerLegal, site, products } from '@/data';

/* -------------------------------------------------------------------------- */
/*  Brand                                                                      */
/* -------------------------------------------------------------------------- */

function Brand({ variant = 'dark', priority = false }: { variant?: 'light' | 'dark'; priority?: boolean }) {
  const src =
    variant === 'light' ? '/images/afrifama-logo-white.png' : '/images/afrifama-logo-dark.png';

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={1443}
      height={873}
      sizes="(max-width: 768px) 140px, 190px"
      priority={priority}
      className="brand-logo"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                     */
/* -------------------------------------------------------------------------- */

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  /* Solid background once the page has moved. */
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  /* Always close the drawer when the route changes. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Lock scrolling, close on Escape and return focus to the toggle. */
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  /* Move focus into the drawer when it opens. */
  useEffect(() => {
    if (!open) return;
    const firstLink = panelRef.current?.querySelector<HTMLElement>('.mobile-link');
    firstLink?.focus();
  }, [open]);

  /* Keep Tab inside the open drawer. */
  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    ).filter((element) => element.offsetParent !== null);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && (active === first || !panel.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header
      className={`site-header site-header--floating ${isHome ? 'site-header-home' : ''} ${scrolled ? 'scrolled' : ''}`}
      role="banner"
    >
      <div className="nav-container">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="Afrifama — go to the homepage">
            <Brand variant="light" priority />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {primaryNav.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="nav-link-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link href="/contact" className="nav-cta">
              <span>Request a Quote</span>
              <ArrowRight size={14} className="nav-cta-arrow" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              onClick={() => setOpen((value) => !value)}
              aria-controls="mobile-navigation"
              aria-expanded={open}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)}>
          <div
            id="mobile-navigation"
            ref={panelRef}
            className="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handlePanelKeyDown}
          >
            <div className="mobile-nav-header">
              <Link href="/" className="brand brand-mobile" aria-label="Afrifama — go to the homepage">
                <Brand variant="light" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                className="mobile-close-btn"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-links" aria-label="Mobile navigation">
              {primaryNav.map((item, index) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`mobile-link ${isActive ? 'is-active' : ''}`}
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <span className="mobile-link-num">0{index + 1}</span>
                    <span className="mobile-link-label">{item.label}</span>
                    <ArrowRight size={16} className="mobile-arrow" />
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-nav-footer">
              <Link className="btn btn-gold w-full justify-center" href="/contact" onClick={() => setOpen(false)}>
                <span>Request a Quote</span>
                <ArrowRight size={15} />
              </Link>
              <div className="mobile-contact-quick">
                <a href={site.phoneHref}>
                  <Phone size={13} aria-hidden="true" /> {site.phoneDisplay}
                </a>
                <a href={`mailto:${site.email}`}>
                  <Mail size={13} aria-hidden="true" /> {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared pieces                                                              */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  kicker,
  title,
  copy,
  dark = false,
  align = 'left',
}: {
  kicker: string;
  title: React.ReactNode;
  copy?: string;
  dark?: boolean;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`section-heading ${dark ? 'heading-dark' : 'heading-light'} ${align === 'center' ? 'text-center mx-auto' : ''}`}>
      <span className="eyebrow section-kicker">
        <i className="kicker-dot" aria-hidden="true" />
        {kicker}
      </span>
      <h2 className="display section-title">{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

export function ProductImage({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = 'image-cover',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return <Image src={src} alt={alt} fill sizes={sizes} className={className} priority={priority} />;
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

function SocialIcon({ label }: { label: string }) {
  if (label === 'LinkedIn') return <Linkedin size={16} aria-hidden="true" />;
  if (label === 'Facebook') return <Facebook size={16} aria-hidden="true" />;
  if (label === 'YouTube') return <Youtube size={16} aria-hidden="true" />;
  return null;
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand footer-brand-link" aria-label="Afrifama — go to the homepage">
              <Brand variant="light" />
            </Link>
            <p className="footer-desc">
              We provide affordable, high-quality day-old chicks and feeds, along with farmer support
              programmes designed to help poultry farmers grow profitable businesses.
            </p>
            <div className="footer-socials">
              {site.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                  aria-label={`Afrifama on ${social.label} (opens in a new tab)`}
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h2 className="footer-col-title">{footerExplore.title}</h2>
            <ul className="footer-links">
              {footerExplore.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-col-title">Products</h2>
            <ul className="footer-links">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact?product=day-old-chicks">Request a Quote</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-contact-col">
            <h2 className="footer-col-title">Contact</h2>
            <div className="footer-contact-items">
              <a href={site.phoneHref} className="footer-contact-item">
                <span className="footer-icon-box">
                  <Phone size={14} aria-hidden="true" />
                </span>
                <span>
                  <small>Call our team</small>
                  <strong>{site.phoneDisplay}</strong>
                </span>
              </a>

              <a href={`mailto:${site.email}`} className="footer-contact-item">
                <span className="footer-icon-box">
                  <Mail size={14} aria-hidden="true" />
                </span>
                <span>
                  <small>Email us</small>
                  <strong>{site.email}</strong>
                </span>
              </a>

              <div className="footer-contact-item">
                <span className="footer-icon-box">
                  <MapPin size={14} aria-hidden="true" />
                </span>
                <span>
                  <small>Find us</small>
                  <span>
                    {site.address.display.map((line) => (
                      <span key={line} className="footer-address-line">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            <span>
              © {currentYear} {site.legalName}. All rights reserved.
            </span>
            <div className="footer-legal">
              {footerLegal.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-motto">
            <span>{site.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
