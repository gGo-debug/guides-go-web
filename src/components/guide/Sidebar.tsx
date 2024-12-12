// components/guide/Sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Calendar,
  Users,
  Settings,
  MessageSquare,
  BarChart,
  CreditCard,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/guide/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Adventures",
    href: "/guide/adventures",
    icon: Compass,
  },
  {
    name: "Availability",
    href: "/guide/availability",
    icon: Calendar,
  },
  {
    name: "Bookings",
    href: "/guide/bookings",
    icon: Users,
  },
  {
    name: "Messages",
    href: "/guide/messages",
    icon: MessageSquare,
  },
  {
    name: "Analytics",
    href: "/guide/analytics",
    icon: BarChart,
  },
  {
    name: "Payments",
    href: "/guide/payments",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/guide/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
