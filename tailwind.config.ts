import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: '#174B32',
        deep: '#102A1C',
        gold: '#E9B949',
        ivory: '#FFFFFF',
        sage: '#879780',
        ink: '#252D28',
        charcoal: '#252D28',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-body)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-playfair)', 'var(--font-display)', 'Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        display: ['var(--font-playfair)', 'var(--font-display)', 'Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
