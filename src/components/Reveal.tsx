'use client';

import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant =
  | 'up'
  | 'fade'
  | 'heading'
  | 'eyebrow'
  | 'paragraph'
  | 'card'
  | 'cta'
  | 'image';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Retained for existing call sites. `variant` takes precedence. */
  direction?: 'up' | 'none' | 'fade';
  threshold?: number;
  variant?: RevealVariant;
}

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: 'reveal-up',
  fade: 'reveal-fade',
  heading: 'reveal-heading',
  eyebrow: 'reveal-eyebrow',
  paragraph: 'reveal-paragraph',
  card: 'reveal-card',
  cta: 'reveal-cta',
  image: 'reveal-image',
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12,
  variant,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Respect the user's motion preference. */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setIsVisible(true);
      return;
    }

    /* ── Strategy 1: IntersectionObserver (preferred) ──────────────────── */
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
              break;
            }
          }
        },
        {
          /* rootMargin pushes the trigger line UP inside the viewport so
             elements animate in before they reach the very bottom edge. */
          rootMargin: '0px 0px -8% 0px',
          threshold: Math.min(0.35, Math.max(0, threshold)),
        }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    /* ── Strategy 2: rAF-based geometry check (fallback) ───────────────── */
    let frame = 0;
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setIsVisible(true);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };

    const check = () => {
      frame = 0;
      if (!el.isConnected) return;
      const rect = el.getBoundingClientRect();
      const triggerLine = window.innerHeight * (1 - Math.min(0.35, Math.max(0, threshold)));
      if (rect.top < triggerLine) reveal();
    };

    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(check);
    }

    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  const resolvedVariant: RevealVariant =
    variant ?? (direction === 'fade' ? 'fade' : direction === 'none' ? 'fade' : 'up');

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${VARIANT_CLASS[resolvedVariant]} ${
        isVisible ? 'is-revealed' : ''
      } ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
