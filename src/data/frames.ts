/**
 * The supplied hero film.
 *
 * The source folder contains 240 consecutive frames exported at 24 fps from
 * the Afrifama commercial. Scene changes detected in the footage fall on
 * frames 61, 120 and 179, giving four visual chapters:
 *
 *   1. Hatchery / day-old chicks      frames 001–060
 *   2. Feed milling                   frames 061–119
 *   3. Farmer & flock care            frames 120–178
 *   4. Healthy, thriving poultry      frames 179–240
 *
 * Browser-ready derivatives live in /public/frames. The original PNGs stay in
 * the source folder for future re-exports.
 */
export const HERO_FRAME_TOTAL = 240;

export const HERO_FRAME_DIRECTORY = {
  desktop: '/frames/desktop',
  mobile: '/frames/mobile',
} as const;

export type HeroFrameVariant = keyof typeof HERO_FRAME_DIRECTORY;

export interface HeroScene {
  label: string;
  shortLabel: string;
  /** 1-based, inclusive. */
  start: number;
  /** 1-based, inclusive. */
  end: number;
}

export const HERO_SCENES: HeroScene[] = [
  { label: 'The hatchery', shortLabel: 'Hatchery', start: 1, end: 60 },
  { label: 'The feed mill', shortLabel: 'Feed mill', start: 61, end: 119 },
  { label: 'The farm', shortLabel: 'Farm care', start: 120, end: 178 },
  { label: 'The flock', shortLabel: 'The flock', start: 179, end: 240 },
];

export function heroFrameUrl(frame: number, variant: HeroFrameVariant = 'desktop') {
  const safeFrame = Math.min(HERO_FRAME_TOTAL, Math.max(1, Math.round(frame)));
  return `${HERO_FRAME_DIRECTORY[variant]}/frame_${String(safeFrame).padStart(6, '0')}.webp`;
}

/** Display frames used by the canvas. Mobile uses every second frame. */
export function heroFrameList(variant: HeroFrameVariant = 'desktop') {
  const stride = variant === 'mobile' ? 2 : 1;
  const frames: number[] = [];
  for (let frame = 1; frame <= HERO_FRAME_TOTAL; frame += stride) {
    frames.push(frame);
  }
  return frames;
}

export function heroSceneForFrame(frame: number) {
  const index = HERO_SCENES.findIndex((scene) => frame >= scene.start && frame <= scene.end);
  return index === -1 ? HERO_SCENES.length - 1 : index;
}
