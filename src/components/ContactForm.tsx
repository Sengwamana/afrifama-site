'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { productOptions } from '@/data';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const INQUIRY_TYPES = [
  'Product enquiry',
  'Partnership',
  'Farmer support',
  'Business enquiry',
  'Farmer story',
  'Other',
] as const;

type FieldName = 'name' | 'email' | 'phone' | 'message';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d][\d\s()\-.]{5,}$/;

/** Map friendly URLs (?type=partnership) onto the values the API accepts. */
function normaliseType(raw: string): string {
  const map: Record<string, string> = {
    partnership: 'Partnership',
    'farmer-support': 'Farmer support',
    business: 'Business enquiry',
    'farmer-story': 'Farmer story',
  };
  const candidate = map[raw.toLowerCase()] ?? raw;
  return (INQUIRY_TYPES as readonly string[]).includes(candidate) ? candidate : 'Product enquiry';
}

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  } else if (values.name.length > 120) {
    errors.name = 'Please keep your name under 120 characters.';
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address so we can reply.';
  }

  const phone = values.phone.trim();
  if (phone && (phone.length < 7 || !PHONE_PATTERN.test(phone))) {
    errors.phone = 'Please enter a valid phone number, or leave this blank.';
  }

  const message = values.message.trim();
  if (message.length < 10) {
    errors.message = 'Please add a little more detail (at least 10 characters).';
  } else if (message.length > 5000) {
    errors.message = 'Please keep your message under 5,000 characters.';
  }

  return errors;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // Query params are read after mount so the form server-renders in full
  // (no Suspense fallback) while still supporting /contact?product=… links.
  const [type, setType] = useState<string>('Product enquiry');
  const [product, setProduct] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product') ?? '';
    const typeParam = params.get('type') ?? '';

    if (productOptions.some((option) => option.value === productParam)) {
      setProduct(productParam);
    }
    if (typeParam) setType(normaliseType(typeParam));
  }, []);

  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  const showError = (field: FieldName) => (showErrors ? errors[field] : undefined);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const nextErrors = validate({
      name: data.name ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      message: data.message ?? '',
    });

    setErrors(nextErrors);
    setShowErrors(true);

    if (Object.keys(nextErrors).length > 0) {
      setState('idle');
      // Focus the first invalid field (fields always exist — aria-invalid
      // only renders after this state update).
      const order: FieldName[] = ['name', 'email', 'phone', 'message'];
      const firstInvalid = order.find((field) => nextErrors[field]);
      if (firstInvalid) {
        form.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      }
      return;
    }

    setState('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) throw new Error(result.error || 'Could not send your message.');

      setState('success');
      setMessage(result.message || 'Your message has been sent.');
      form.reset();
      setShowErrors(false);
    } catch (error) {
      setState('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or email us directly.'
      );
    }
  }

  if (state === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="form-success-icon">
          <Check size={21} aria-hidden="true" />
        </span>
        <span className="eyebrow">Message received</span>
        <h2 className="display">
          Thank you for
          <br />
          <em>reaching out.</em>
        </h2>
        <p>{message}</p>
        <button
          type="button"
          className="btn btn-outline-dark btn-sm"
          onClick={() => {
            setState('idle');
            setMessage('');
          }}
        >
          <span>Send another message</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="form-intro">
        <span className="eyebrow">Tell us a little about it</span>
        <h2 className="display">
          Let’s start
          <br />
          <em>a conversation.</em>
        </h2>
      </div>

      <div className="form-grid">
        <label htmlFor="contact-name">
          Full name <span aria-hidden="true">*</span>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            minLength={2}
            maxLength={120}
            placeholder="Your name"
            aria-invalid={Boolean(showError('name'))}
            aria-describedby={showError('name') ? 'contact-name-error' : undefined}
          />
          {showError('name') && (
            <span className="field-error" id="contact-name-error">
              {errors.name}
            </span>
          )}
        </label>

        <label htmlFor="contact-email">
          Email address <span aria-hidden="true">*</span>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(showError('email'))}
            aria-describedby={showError('email') ? 'contact-email-error' : undefined}
          />
          {showError('email') && (
            <span className="field-error" id="contact-email-error">
              {errors.email}
            </span>
          )}
        </label>

        <label htmlFor="contact-phone">
          Phone number
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+254 …"
            aria-invalid={Boolean(showError('phone'))}
            aria-describedby={showError('phone') ? 'contact-phone-error' : undefined}
          />
          {showError('phone') && (
            <span className="field-error" id="contact-phone-error">
              {errors.phone}
            </span>
          )}
        </label>

        <label htmlFor="contact-type">
          Inquiry type
          <select
            id="contact-type"
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            {INQUIRY_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="full" htmlFor="contact-product">
          Product of interest
          <select
            id="contact-product"
            name="product"
            value={product}
            onChange={(event) => setProduct(event.target.value)}
          >
            <option value="">Select a product (optional)</option>
            {productOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="full" htmlFor="contact-message">
          Your message <span aria-hidden="true">*</span>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            minLength={10}
            maxLength={5000}
            placeholder="How can our team help?"
            aria-invalid={Boolean(showError('message'))}
            aria-describedby={showError('message') ? 'contact-message-error' : undefined}
          />
          {showError('message') && (
            <span className="field-error" id="contact-message-error">
              {errors.message}
            </span>
          )}
        </label>

        {/* Honeypot: hidden from people, tempting to spam bots. */}
        <div className="form-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {state === 'error' && (
        <p className="form-error" role="alert">
          {message}
        </p>
      )}

      <button className="btn btn-green form-submit" type="submit" disabled={state === 'loading'}>
        {state === 'loading' ? (
          <>
            <LoaderCircle size={16} className="spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send your message
            <ArrowRight size={15} aria-hidden="true" />
          </>
        )}
      </button>

      <p className="form-privacy">
        Your details are used only to respond to your enquiry. See our{' '}
        <a href="/privacy-policy">privacy policy</a>.
      </p>
    </form>
  );
}
