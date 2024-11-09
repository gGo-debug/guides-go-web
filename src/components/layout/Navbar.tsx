"use client";

import { useState } from 'react';
import Link from 'next/link';
import { navItems } from '@/constants/navigation';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center"
          >
            <span className="text-[#2A5A3B] font-['Montserrat'] font-bold text-xl">
              Guides GO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  font-['Inter'] text-[14px] font-medium text-[#2D3142]
                  transition-colors duration-200
                  ${item.label === 'Download App' ? 
                    'bg-[#FF6B35] text-white px-6 py-2 rounded-lg hover:bg-[#e55a2a] hover:text-white' : 
                    'hover:text-[#2A5A3B]'}
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? 
              <X className="h-6 w-6 text-[#2D3142]" /> : 
              <Menu className="h-6 w-6 text-[#2D3142]" />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-lg">
            <div className="flex flex-col px-4 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    font-['Inter'] text-[16px] font-medium text-[#2D3142]
                    py-4 border-b border-gray-100 last:border-0
                    ${item.label === 'Download App' ? 
                      'text-[#FF6B35] font-semibold' : 
                      'hover:text-[#2A5A3B]'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}