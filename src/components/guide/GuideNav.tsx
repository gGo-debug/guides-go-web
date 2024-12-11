'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Compass,
  Calendar,
  Users,
  Settings,
  MessageSquare
} from 'lucide-react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/guide/dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'Adventures',
    href: '/guide/adventures',
    icon: Compass
  },
  {
    label: 'Availability',
    href: '/guide/availability',
    icon: Calendar
  },
  {
    label: 'Bookings',
    href: '/guide/bookings',
    icon: Users
  },
  {
    label: 'Messages',
    href: '/guide/messages',
    icon: MessageSquare
  },
  {
    label: 'Settings',
    href: '/guide/settings',
    icon: Settings
  },
];

export function GuideNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                  pathname === item.href
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}