import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/Pages';
import ContactForm from '@/components/ContactForm';
import { site } from '@/data';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Contact Afrifama',
  description:
    'Contact the Afrifama team in Mariakani, Kilifi about day-old chicks, poultry feeds, farmer support or partnership enquiries.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact / We’re listening"
        title="Good things start with a conversation."
        copy="Tell us what you’re working on. Our team is ready to talk products, farmer support, or a partnership."
        image="/images/film-frame-07.jpg"
      />

      <section className="section contact-section">
        <div className="wrap contact-layout">
          <div className="contact-info">
            <span className="eyebrow">Come say hello</span>
            <h2 className="display">
              Rooted in
              <br />
              <em>Mariakani.</em>
            </h2>
            <p>We’re here to help you find the right next step for your poultry business.</p>

            <a href={site.phoneHref} className="contact-detail">
              <span className="contact-detail-icon">
                <Phone size={17} aria-hidden="true" />
              </span>
              <div className="contact-detail-text">
                <small>Call our team</small>
                <b>{site.phoneDisplay}</b>
              </div>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <a href={`mailto:${site.email}`} className="contact-detail">
              <span className="contact-detail-icon">
                <Mail size={17} aria-hidden="true" />
              </span>
              <div className="contact-detail-text">
                <small>Email us</small>
                <b>{site.email}</b>
              </div>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <div className="contact-detail address">
              <span className="contact-detail-icon">
                <MapPin size={17} aria-hidden="true" />
              </span>
              <div className="contact-detail-text">
                <small>Find us</small>
                <b>
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region}, {site.address.country}
                </b>
              </div>
            </div>

            <div className="contact-map" aria-hidden="true">
              <span>KENYA &nbsp; / &nbsp; KILIFI COUNTY</span>
              <strong>{site.address.locality}</strong>
              <i>✳</i>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
