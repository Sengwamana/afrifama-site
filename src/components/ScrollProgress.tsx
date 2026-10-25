'use client';

import { useEffect, useRef } from 'react';

/**
 * GlobalScrollEffects
 * ───────────────────
 * Mounts exactly one time at the root. Drives two scroll-linked effects:
 *   1. A fixed progress bar at the very top of the viewport.
 *   2. `data-scrolled` on <html> for any CSS that needs a scrolled sentinel.
 *
 * Respects `prefers-reduced-motion` — skips all work when the user has asked
 * for reduced motion.
 */
export default function GlobalScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    /* Skip entirely for users who prefer reduced motion. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bar.style.display = 'none';
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

      /* GPU-composited transform — no layout thrash. */
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;

      /* Expose a class to the rest of the page for CSS selectors. */
      document.documentElement.classList.toggle('is-scrolled', scrollY > 30);
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      aria-hidden="true"
      role="presentation"
    />
  );
}
