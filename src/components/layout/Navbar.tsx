"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
      fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300
      ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
    `}
    >
      <Container>
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg" // Replace with your actual file name
              alt="GuidesGo Logo"
              width={32}
              height={32}
              className={`transition-colors duration-300 pr-2 ${
                isScrolled ? "filter brightness-0 saturate-150" : ""
              }`}
            />
            <span
              className={`
              font-['Montserrat'] font-bold text-xl transition-colors duration-300
              ${isScrolled ? "text-[#0E9871]" : "text-white"}
            `}
            >
              GuidesGo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  font-['Inter'] text-[14px] font-medium
                  transition-all duration-200
                  ${
                    item.label === "Download App"
                      ? "bg-gradient-to-r from-[#0E9871] to-[#39CF8D] hover:opacity-90 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
                      : isScrolled
                        ? "text-[#2D3142] hover:text-[#2A5A3B]"
                        : "text-white hover:text-[#7DCFFF]"
                  }
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
            <Menu
              className={`h-6 w-6 ${isScrolled ? "text-[#2D3142]" : "text-white"}`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`
            md:hidden absolute top-[72px] left-0 right-0 shadow-lg
            ${isScrolled ? "bg-[#2A5A3B]" : "bg-[#2A5A3B]"}
          `}
          >
            <div className="flex flex-col px-4 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    font-['Inter'] text-[16px] font-medium
                    py-4 border-b border-opacity-10
                    ${isScrolled ? "border-white" : "border-white"} last:border-0
                    ${
                      item.label === "Download App"
                        ? "text-[#FF6B35] font-semibold bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-white rounded-lg px-4"
                        : isScrolled
                          ? "text-white hover:text-[#7DCFFF]"
                          : "text-white hover:text-[#7DCFFF]"
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
