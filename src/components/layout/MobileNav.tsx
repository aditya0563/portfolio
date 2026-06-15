"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-white/5 p-4 z-50 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <ul className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 relative transition-colors",
                  isActive ? "text-primary" : "text-on-surface-variant"
                )}
                aria-label={item.label}
              >
                {isActive && (
                  <div className="absolute -top-2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(221,183,255,0.5)]" />
                )}
                <Icon
                  size={24}
                  fill={isActive ? "currentColor" : "none"}
                  className="shrink-0"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
