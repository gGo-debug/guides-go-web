"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const isGuide = profile?.role === 'guide';

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
              src="/logo.svg"
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
            <Link
              href="/adventures"
              className={`
                font-medium transition-colors
                ${isScrolled ? "text-gray-700 hover:text-[#0E9871]" : "text-white hover:text-[#7DCFFF]"}
              `}
            >
              Explore
            </Link>

            {!user && (
              <>
                <Link
                  href="/auth/login"
                  className={`
                    font-medium transition-colors
                    ${isScrolled ? "text-gray-700 hover:text-[#0E9871]" : "text-white hover:text-[#7DCFFF]"}
                  `}
                >
                  Login
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                      <AvatarFallback>
                        {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={isGuide ? "/guide/dashboard" : "/dashboard"}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isGuide && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/guide/adventures">My Adventures</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/guide/bookings">Bookings</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={isScrolled ? "text-gray-700" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-gray-700" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                href="/adventures"
                className="text-gray-700 hover:text-[#0E9871]"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              {!user ? (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-[#0E9871]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={isGuide ? "/guide/dashboard" : "/dashboard"}
                    className="text-gray-700 hover:text-[#0E9871]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {isGuide && (
                    <>
                      <Link
                        href="/guide/adventures"
                        className="text-gray-700 hover:text-[#0E9871]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Adventures
                      </Link>
                      <Link
                        href="/guide/bookings"
                        className="text-gray-700 hover:text-[#0E9871]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Bookings
                      </Link>
                    </>
                  )}
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-[#0E9871]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}