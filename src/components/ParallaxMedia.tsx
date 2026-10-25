'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ParallaxMediaProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Maximum vertical travel in pixels across the visible range. */
  strength?: number;
  className?: string;
  imageClassName?: string;
}

/**
 * A restrained image parallax. The wrapper owns the crop; only the inner
 * layer moves. Updates are written straight to the DOM inside a scroll-frame
 * and stop as soon as the image leaves the viewport.
 */
export default function ParallaxMedia({
  src,
  alt,
  sizes = '(max-width: 900px) 100vw, 50vw',
  priority = false,
  strength = 64,
  className = '',
  imageClassName = 'image-cover',
}: ParallaxMediaProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight || 1;

      /* Skip work while the image is well outside the viewport. Geometry is
         checked on every frame rather than relying on an observer sample, so a
         fast jump straight to this section still lands on the right offset. */
      if (rect.bottom < -160 || rect.top > viewport + 160) return;

      const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));
      const offset = (progress - 0.5) * 2 * strength;

      media.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.06)`;
    };

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={frameRef} className={`parallax-media ${className}`}>
      <div ref={mediaRef} className="parallax-media__inner">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      </div>
    </div>
  );
}
