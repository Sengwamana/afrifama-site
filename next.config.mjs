/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Allows isolating a production build from a dev server's `.next` output,
  // so `npm run dev` and a prod preview can run side by side:
  //   NEXT_DIST_DIR=.next-prod npx next build && NEXT_DIST_DIR=.next-prod npx next start
  // Defaults to '.next', leaving dev/build/start behaviour unchanged.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // All imagery is served from /public — no third-party image hosts.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
