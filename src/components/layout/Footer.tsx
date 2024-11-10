import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "For Guides", href: "/guides" },
  { label: "Safety", href: "/safety" },
  { label: "Community Guidelines", href: "/community" },
  { label: "Support", href: "/support" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-montserrat font-bold text-[#2A5A3B]">
                Guides GO
              </span>
            </Link>
            <p className="text-[#2D3142] text-sm">
              Turn every adventure into a social quest. Join thousands of adventurers and guides exploring together.
            </p>
          </div>

          {/* Navigation Links - Split into two columns on larger screens */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              {footerLinks.slice(0, Math.ceil(footerLinks.length / 2)).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block mb-3 text-[#2D3142] hover:text-[#2A5A3B] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div>
              {footerLinks.slice(Math.ceil(footerLinks.length / 2)).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block mb-3 text-[#2D3142] hover:text-[#2A5A3B] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-montserrat font-semibold text-[#2D3142]">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-[#2D3142] hover:text-[#FF6B35] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-sm text-[#2D3142] text-center">
            © {new Date().getFullYear()} Guides GO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 