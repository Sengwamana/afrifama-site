/**
 * Navigation and footer link structures.
 * Keeping links here means the IA can change without touching components.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Optional note used by screen readers when the label needs more context. */
  ariaLabel?: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

/** Primary navigation, shown in the header on desktop and in the mobile menu. */
export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Farmer Support', href: '/farmer-support' },
  { label: 'Our Operations', href: '/operations' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

/** "Explore" column in the footer. */
export const footerExplore: FooterColumn = {
  title: 'Explore',
  links: [
    { label: 'About Afrifama', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Farmer Support', href: '/farmer-support' },
    { label: 'Our Operations', href: '/operations' },
    { label: 'Resources', href: '/resources' },
    { label: 'Farmer Stories', href: '/stories' },
    { label: 'Contact', href: '/contact' },
  ],
};

/** Legal links in the footer. */
export const footerLegal: FooterColumn = {
  title: 'Legal',
  links: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms-of-use' },
  ],
};
