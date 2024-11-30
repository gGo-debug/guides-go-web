export const navItems = [
  { label: "Book Now", href: "/waitlist" },
  { label: "About", href: "/about" },
  { label: "Become a Guide", href: "/waitlist" },
  { label: "Download App", href: "/waitlist" },
  // { label: 'Join Waitlist', href: '/waitlist' },
] as const;

export const footerLinks = {
  company: [
    { label: "About Us", href: "/waitlist" },
    { label: "For Guides", href: "/waitlist" },
    { label: "Safety", href: "/waitlist" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/waitlist" },
    { label: "Terms of Service", href: "/waitlist" },
  ],
  support: [
    { label: "Community Guidelines", href: "/waitlist" },
    { label: "Support", href: "/waitlist" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/guidesgo" },
    { label: "Facebook", href: "https://facebook.com/guidesgo" },
    { label: "Twitter", href: "https://twitter.com/guidesgo" },
    { label: "YouTube", href: "https://youtube.com/guidesgo" },
  ],
} as const;
