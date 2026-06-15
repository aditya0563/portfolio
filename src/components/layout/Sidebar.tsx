"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile, navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex fixed left-0 top-0 w-sidebar-width border-white/5 flex-col z-50 ml-6 my-6 h-[calc(100vh-3rem)] rounded-3xl bg-surface-container border p-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-10 px-4">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary/20 p-1">
          <Image
            src={profile.avatarUrl}
            alt={profile.avatarAlt}
            width={96}
            height={96}
            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface text-center mb-1">
          {profile.name}
        </h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant text-center tracking-widest uppercase mt-1">
          {profile.title}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 pl-4 py-2 rounded-lg transition-all duration-200 hover:scale-[0.98]",
                isActive
                  ? "text-primary font-bold border-l-2 border-primary bg-primary/5 group"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
              )}
            >
              <Icon
                size={20}
                fill={isActive ? "currentColor" : "none"}
                className="shrink-0"
              />
              <span className="font-label-sm text-label-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-auto px-4">
        <Link
          href="/contact?ref=hire"
          className="w-full bg-primary-container text-on-primary-container font-label-sm text-label-sm py-3 px-4 rounded-lg font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2"
        >
          Available for Hire
        </Link>
      </div>
    </nav>
  );
}
