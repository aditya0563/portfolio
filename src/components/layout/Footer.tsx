"use client";

import { usePathname } from "next/navigation";
import { profile } from "@/data/portfolio"; // Adjust the import path if your portfolio.ts is located elsewhere

export function Footer() {
  const pathname = usePathname();

  // Hide footer on the contact page
  if (pathname === "/contact") return null;

  return (
    <footer className="bg-transparent w-full py-12 border-t border-white/5 flex flex-col items-center justify-center gap-4 mt-12">
      <div className="flex items-center gap-6">
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:-translate-y-1 transition-all inline-block"
        >
          LinkedIn
        </a>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:-translate-y-1 transition-all inline-block"
        >
          GitHub
        </a>
        <a
          href={profile.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:-translate-y-1 transition-all inline-block"
        >
          LeetCode
        </a>
        <a
          href={profile.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:-translate-y-1 transition-all inline-block"
        >
          X (Twitter)
        </a>
      </div>
      <p className="font-label-sm text-label-sm text-on-surface-variant mt-4 text-center">
        © {new Date().getFullYear()} {profile.name}. Crafted with precision.
      </p>
    </footer>
  );
}