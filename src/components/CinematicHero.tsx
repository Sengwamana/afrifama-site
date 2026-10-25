'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import {
  HERO_FRAME_TOTAL,
  HERO_SCENES,
  heroFrameList,
  heroFrameUrl,
  heroSceneForFrame,
  type HeroFrameVariant,
} from '@/data/frames';

/* -------------------------------------------------------------------------- */
/*  Frame budget                                                              */
/* -------------------------------------------------------------------------- */

/**
 * How many decoded frames stay resident in memory. A desktop frame decodes to
 * roughly 4.7 MB and a mobile frame to roughly 2.1 MB, so these budgets keep
 * the decoded cache near 85 MB / 42 MB rather than letting a full sequence
 * pin hundreds of megabytes.
 */
const CACHE_SIZE = { desktop: 18, mobile: 20 } as const;
/** Frames decoded ahead of the playhead / kept behind it. */
const LOOK_AHEAD = { desktop: 16, mobile: 16 } as const;
const LOOK_BEHIND = { desktop: 5, mobile: 4 } as const;
const MAX_CONCURRENT_LOADS = 6;
const MAX_CANVAS_PIXELS = 7_000_000;

type CachedFrame =
  | { kind: 'bitmap'; source: ImageBitmap }
  | { kind: 'image'; source: HTMLImageElement; release: () => void };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

async function decodeFrame(url: string, signal: AbortSignal): Promise<CachedFrame> {
  const response = await fetch(url, { signal, cache: 'force-cache' });
  if (!response.ok) throw new Error(`Frame request failed: ${response.status}`);

  const blob = await response.blob();

  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    const bitmap = await createImageBitmap(blob);
    return { kind: 'bitmap', source: bitmap };
  }

  /* Fallback for browsers without createImageBitmap. */
  const objectUrl = URL.createObjectURL(blob);
  const image = new Image();
  image.decoding = 'async';
  image.src = objectUrl;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Frame decode failed'));
  });

  return {
    kind: 'image',
    source: image,
    release: () => {
      image.src = '';
      URL.revokeObjectURL(objectUrl);
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const sceneNumberRef = useRef<HTMLSpanElement>(null);
  const sceneLabelRef = useRef<HTMLSpanElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const sceneTickRefs = useRef<Array<HTMLSpanElement | null>>([]);

  /* Resolve both media queries before the first effect so a phone never starts
     by downloading the larger desktop sequence, and a reduced-motion visitor
     never starts the frame pipeline at all. */
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  /* Watch the two media queries that change how the film is delivered. */
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const syncMotion = () => setReducedMotion(motionQuery.matches);
    const syncMobile = () => setIsMobile(mobileQuery.matches);

    syncMotion();
    syncMobile();

    motionQuery.addEventListener('change', syncMotion);
    mobileQuery.addEventListener('change', syncMobile);

    return () => {
      motionQuery.removeEventListener('change', syncMotion);
      mobileQuery.removeEventListener('change', syncMobile);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Scroll-controlled canvas                                          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    const poster = posterRef.current;
    const content = contentRef.current;
    const shade = shadeRef.current;
    const bottom = bottomRef.current;
    const progressBar = progressRef.current;
    if (!section || !pin || !canvas || !poster || !content) return;

    const variant: HeroFrameVariant = isMobile ? 'mobile' : 'desktop';
    const frames = heroFrameList(variant);
    const cacheLimit = CACHE_SIZE[variant];
    const lookAhead = LOOK_AHEAD[variant];
    const lookBehind = LOOK_BEHIND[variant];

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const cache = new Map<number, CachedFrame>();
    const pending = new Set<number>();
    const usedAt = new Map<number, number>();
    const abortController = new AbortController();

    let queue: number[] = [];
    let activeLoads = 0;
    let useCounter = 0;
    let targetIndex = -1;
    let lastDrawnIndex = -1;
    let lastScene = -1;
    let posterVisible = true;
    let disposed = false;

    let viewportWidth = 1;
    let viewportHeight = 1;
    let pixelRatio = 1;

    let scrollRaf = 0;
    let drawRaf = 0;
    let resizeRaf = 0;

    /* -------------------------------------------------------------- */
    /*  Image cache                                                   */
    /* -------------------------------------------------------------- */

    const releaseFrame = (frame: CachedFrame) => {
      if (frame.kind === 'bitmap') {
        frame.source.close();
      } else {
        frame.release();
      }
    };

    const trimCache = () => {
      while (cache.size > cacheLimit) {
        let oldestIndex = -1;
        let oldestUse = Number.POSITIVE_INFINITY;

        cache.forEach((_frame, index) => {
          if (index === targetIndex) return;
          const used = usedAt.get(index) ?? 0;
          if (used < oldestUse) {
            oldestUse = used;
            oldestIndex = index;
          }
        });

        if (oldestIndex === -1) break;
        const frame = cache.get(oldestIndex);
        cache.delete(oldestIndex);
        usedAt.delete(oldestIndex);
        if (frame) releaseFrame(frame);
      }
    };

    const scheduleDraw = () => {
      if (drawRaf || disposed) return;
      drawRaf = window.requestAnimationFrame(() => {
        drawRaf = 0;
        drawFrame();
      });
    };

    const pumpQueue = () => {
      if (disposed) return;

      while (activeLoads < MAX_CONCURRENT_LOADS && queue.length > 0) {
        const index = queue.shift();
        if (index === undefined) return;
        if (cache.has(index) || pending.has(index)) continue;

        pending.add(index);
        activeLoads += 1;

        decodeFrame(heroFrameUrl(frames[index], variant), abortController.signal)
          .then((frame) => {
            if (disposed) {
              releaseFrame(frame);
              return;
            }
            cache.set(index, frame);
            usedAt.set(index, ++useCounter);
            trimCache();
            if (Math.abs(index - targetIndex) <= lookAhead + 4) scheduleDraw();
          })
          .catch(() => {
            /* A missing frame is not fatal: the last good frame stays on screen. */
          })
          .finally(() => {
            pending.delete(index);
            activeLoads -= 1;
            pumpQueue();
          });
      }
    };

    const buildQueue = (index: number) => {
      const next: number[] = [];

      for (let distance = 0; distance <= lookAhead; distance += 1) {
        const ahead = index + distance;
        if (ahead < frames.length) next.push(ahead);

        if (distance > 0 && distance <= lookBehind) {
          const behind = index - distance;
          if (behind >= 0) next.push(behind);
        }
      }

      queue = next.filter((candidate) => !cache.has(candidate) && !pending.has(candidate));
    };

    /* -------------------------------------------------------------- */
    /*  Canvas rendering                                              */
    /* -------------------------------------------------------------- */

    const drawFrame = () => {
      if (disposed || viewportWidth <= 0 || viewportHeight <= 0) return;

      let index = targetIndex;
      let frame = cache.get(index);

      if (!frame) {
        /* Fast scrolling can outrun the decoder. Fall back to the nearest
           resident frame instead of showing a hole. */
        let nearestDistance = Number.POSITIVE_INFINITY;
        cache.forEach((cachedFrame, cachedIndex) => {
          const distance = Math.abs(cachedIndex - targetIndex);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            index = cachedIndex;
            frame = cachedFrame;
          }
        });
      }

      if (!frame) return;

      const source = frame.source;
      const sourceWidth =
        frame.kind === 'bitmap' ? frame.source.width : frame.source.naturalWidth || frame.source.width;
      const sourceHeight =
        frame.kind === 'bitmap'
          ? frame.source.height
          : frame.source.naturalHeight || frame.source.height;

      if (!sourceWidth || !sourceHeight) return;

      /* cover-style crop: fill the viewport, never stretch */
      const scale = Math.max(viewportWidth / sourceWidth, viewportHeight / sourceHeight);
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      const offsetX = (viewportWidth - drawWidth) / 2;
      const offsetY = (viewportHeight - drawHeight) / 2;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, viewportWidth, viewportHeight);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);

      if (posterVisible) {
        poster.classList.add('is-concealed');
        canvas.classList.add('is-ready');
        posterVisible = false;
      }

      lastDrawnIndex = index;
    };

    const resizeCanvas = () => {
      resizeRaf = 0;
      if (disposed) return;

      const bounds = pin.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const pixelBudgetRatio = Math.sqrt(MAX_CANVAS_PIXELS / (width * height));
      const nextRatio = Math.min(window.devicePixelRatio || 1, 2, Math.max(1, pixelBudgetRatio));

      viewportWidth = width;
      viewportHeight = height;
      pixelRatio = nextRatio;

      const backingWidth = Math.round(width * nextRatio);
      const backingHeight = Math.round(height * nextRatio);

      if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
        canvas.width = backingWidth;
        canvas.height = backingHeight;
      }

      lastDrawnIndex = -1;
      scheduleDraw();
    };

    const scheduleResize = () => {
      if (resizeRaf || disposed) return;
      resizeRaf = window.requestAnimationFrame(resizeCanvas);
    };

    /* -------------------------------------------------------------- */
    /*  Scroll progress                                               */
    /* -------------------------------------------------------------- */

    const updateScene = (sceneIndex: number) => {
      if (sceneIndex === lastScene) return;
      lastScene = sceneIndex;

      pin.dataset.scene = String(sceneIndex + 1);

      if (sceneNumberRef.current) {
        sceneNumberRef.current.textContent = String(sceneIndex + 1).padStart(2, '0');
      }
      if (sceneLabelRef.current) {
        sceneLabelRef.current.textContent = HERO_SCENES[sceneIndex].label;
      }
      sceneTickRefs.current.forEach((tick, index) => {
        tick?.classList.toggle('is-active', index === sceneIndex);
        tick?.classList.toggle('is-past', index < sceneIndex);
      });
    };

    const updateProgress = () => {
      scrollRaf = 0;
      if (disposed) return;

      const bounds = section.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - window.innerHeight);
      const progress = clamp(-bounds.top / travel, 0, 1);

      const nextIndex = clamp(Math.round(progress * (frames.length - 1)), 0, frames.length - 1);
      if (nextIndex !== targetIndex) {
        targetIndex = nextIndex;
        buildQueue(targetIndex);
        pumpQueue();
      }

      if (progressBar) {
        progressBar.style.transform = `scaleY(${progress.toFixed(4)})`;
      }
      if (frameCounterRef.current) {
        const displayFrame = frames[targetIndex];
        frameCounterRef.current.textContent = `${String(displayFrame).padStart(3, '0')} / ${HERO_FRAME_TOTAL}`;
      }

      updateScene(heroSceneForFrame(frames[targetIndex]));

      if (content) {
        content.style.transform = `translate3d(0, ${(-26 * progress).toFixed(2)}px, 0)`;
        content.style.opacity = `${(1 - clamp((progress - 0.78) / 0.22, 0, 1) * 0.24).toFixed(3)}`;
      }
      if (bottom) {
        bottom.style.opacity = `${(1 - clamp((progress - 0.86) / 0.14, 0, 1) * 0.45).toFixed(3)}`;
      }
      if (shade) {
        shade.style.opacity = `${(0.94 + progress * 0.06).toFixed(3)}`;
      }

      if (lastDrawnIndex !== targetIndex) scheduleDraw();
    };

    const scheduleProgress = () => {
      if (scrollRaf || disposed) return;
      scrollRaf = window.requestAnimationFrame(updateProgress);
    };

    /* -------------------------------------------------------------- */
    /*  Boot and clean up                                             */
    /* -------------------------------------------------------------- */

    resizeCanvas();
    targetIndex = 0;
    buildQueue(0);
    pumpQueue();
    updateProgress();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleResize) : null;
    resizeObserver?.observe(pin);

    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleResize, { passive: true });
    window.addEventListener('orientationchange', scheduleResize, { passive: true });

    return () => {
      disposed = true;
      abortController.abort();
      resizeObserver?.disconnect();

      window.removeEventListener('scroll', scheduleProgress);
      window.removeEventListener('resize', scheduleResize);
      window.removeEventListener('orientationchange', scheduleResize);

      window.cancelAnimationFrame(scrollRaf);
      window.cancelAnimationFrame(drawRaf);
      window.cancelAnimationFrame(resizeRaf);

      cache.forEach((frame) => releaseFrame(frame));
      cache.clear();
      pending.clear();
      queue = [];

      /* Leave the first frame visible when the effect is torn down. */
      poster.classList.remove('is-concealed');
      canvas.classList.remove('is-ready');
    };
  }, [isMobile, reducedMotion]);

  return (
    <section ref={sectionRef} className="cine-hero" aria-label="Afrifama introduction">
      <div ref={pinRef} className="cine-hero__pin" data-scene="1">
        <div className="cine-hero__media" aria-hidden="true">
          {/* First frame is in the initial HTML, so the hero never starts empty. */}
          <picture>
            <source media="(max-width: 767px)" srcSet={heroFrameUrl(1, 'mobile')} />
            {/* A raw img is intentional: the canvas takes over and this poster
                must stay pixel-identical to the first decoded frame. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={posterRef}
              className="cine-hero__poster"
              src={heroFrameUrl(1, 'desktop')}
              alt=""
              width={1440}
              height={810}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <canvas ref={canvasRef} className="cine-hero__canvas" aria-hidden="true" />
          <div ref={shadeRef} className="cine-hero__shade" />
          <div className="cine-hero__vignette" />
          <div className="cine-hero__grain" />
        </div>

        <div className="wrap cine-hero__content">
          <div ref={contentRef} className="cine-hero__content-inner">
            <p className="cine-hero__eyebrow cine-enter cine-enter--1">
              <span className="cine-hero__rule" aria-hidden="true" />
              <span>Quality poultry inputs · Practical farmer support</span>
            </p>

            <h1 className="cine-hero__headline">
              <span className="cine-line-mask cine-enter cine-enter--2">
                <span className="cine-line">Build a stronger flock.</span>
              </span>
              <span className="cine-line-mask cine-enter cine-enter--3">
                <span className="cine-line cine-line--gold">Grow a stronger farm.</span>
              </span>
            </h1>

            <p className="cine-hero__support cine-enter cine-enter--4">
              Quality day-old chicks, dependable poultry feeds, and practical support to help
              farmers grow with confidence.
            </p>

            <div className="cine-hero__actions cine-enter cine-enter--5">
              <Link href="/products" className="btn cine-btn cine-btn--gold">
                <span>Explore Our Products</span>
                <ArrowRight size={16} className="arrow" aria-hidden="true" />
              </Link>
              <Link href="/contact?type=Partnership" className="btn cine-btn cine-btn--ghost">
                <span>Partner With Afrifama</span>
                <ArrowRight size={16} className="arrow" aria-hidden="true" />
              </Link>
            </div>

            <div className="cine-hero__trust cine-enter cine-enter--6">
              <span className="cine-trust-item">
                <ShieldCheck size={16} aria-hidden="true" />
                Vaccinated hatchery chicks
              </span>
              <span className="cine-trust-item">
                <Sparkles size={16} aria-hidden="true" />
                Nutritionist-formulated feeds
              </span>
              <span className="cine-trust-item">
                <MapPin size={16} aria-hidden="true" />
                Mariakani, Kilifi County
              </span>
            </div>
          </div>
        </div>

        <div ref={bottomRef} className="cine-hero__bottom">
          <div className="cine-hero__scene-readout" aria-hidden="true">
            <span ref={sceneNumberRef} className="cine-hero__scene-number">
              01
            </span>
            <span className="cine-hero__scene-copy">
              <span ref={sceneLabelRef} className="cine-hero__scene-label">
                The hatchery
              </span>
              <span className="cine-hero__scene-sub">Scroll to direct the film</span>
            </span>
          </div>

          <a href="#introduction" className="cine-hero__cue">
            <span>Scroll to explore</span>
            <span className="cine-hero__cue-arrow" aria-hidden="true">
              ↓
            </span>
          </a>

          <div className="cine-hero__meta" aria-hidden="true">
            <span>Mariakani · Kenya</span>
            <span ref={frameCounterRef} className="cine-hero__counter">
              001 / 240
            </span>
          </div>
        </div>

        <div className="cine-hero__rail" aria-hidden="true">
          <span className="cine-hero__rail-line">
            <span ref={progressRef} className="cine-hero__rail-fill" />
          </span>
          <span className="cine-hero__rail-scenes">
            {HERO_SCENES.map((scene, index) => (
              <span
                key={scene.label}
                ref={(node) => {
                  sceneTickRefs.current[index] = node;
                }}
                className={`cine-hero__rail-scene${index === 0 ? ' is-active' : ''}`}
              >
                {scene.shortLabel}
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
