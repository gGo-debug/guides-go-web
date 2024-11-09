import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  className?: string;
  Icon?: LucideIcon;
  name: string;
  description: string;
  href?: string;
  cta?: string;
  background?: React.ReactNode;
  extendedContent?: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  Icon,
  name,
  description,
  href,
  cta,
  background,
  extendedContent,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl p-6 relative overflow-hidden group",
        "hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      {background}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <Icon className="w-6 h-6 text-[#2A5A3B]" />
          )}
          <h3 className="font-semibold text-xl text-[#2D3142]">{name}</h3>
        </div>
        <p className="text-[#2D3142]/80 mb-4">{description}</p>
        {extendedContent}
        {href && cta && (
          <a
            href={href}
            className="text-[#FF6B35] font-semibold hover:text-[#FF6B35]/80 transition-colors mt-auto"
          >
            {cta} →
          </a>
        )}
      </div>
    </div>
  );
}
