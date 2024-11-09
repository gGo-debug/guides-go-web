export const navItems = [
  { label: 'For Guides', href: '/guides' },
  { label: 'About', href: '/about' },
  { label: 'Become a Guide', href: '/apply' },
  { label: 'Download App', href: '/download' },

] as const;

export const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'For Guides', href: '/guides' },
    { label: 'Safety', href: '/safety' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  support: [
    { label: 'Community Guidelines', href: '/guidelines' },
    { label: 'Support', href: '/support' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/guidesgo' },
    { label: 'Facebook', href: 'https://facebook.com/guidesgo' },
    { label: 'Twitter', href: 'https://twitter.com/guidesgo' },
    { label: 'YouTube', href: 'https://youtube.com/guidesgo' },
  ],
} as const; 