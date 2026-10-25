import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section not-found-section">
      <div className="wrap not-found-inner">
        <span className="eyebrow text-forest">404 / Page not found</span>
        <h1 className="display not-found-title">
          This page has
          <span className="heading-italic block text-gold">left the coop.</span>
        </h1>
        <p className="not-found-copy">
          The address you followed does not exist on this site. Try the homepage, or jump straight
          to the products our team can talk you through.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-green">
            <Home size={15} aria-hidden="true" />
            <span>Back to home</span>
          </Link>
          <Link href="/products" className="btn btn-outline-dark">
            <span>Explore products</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
