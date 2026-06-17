import React from 'react';
import { Project } from '@/data/portfolio';
import Link from 'next/link';
import { BentoCard } from '@/components/ui/BentoCard';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Terminal,
  Server,
  ShoppingCart,
  GitBranch,
  Blocks,
  ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const projectIcons: LucideIcon[] = [Terminal, Server, ShoppingCart, GitBranch];

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // Grid sizing based on original design
  let gridClass = "md:col-span-6 lg:col-span-4";
  if (index === 0) {
    gridClass = "md:col-span-12 lg:col-span-8";
  } else if (index === 3) {
    gridClass = "md:col-span-12 lg:col-span-8";
  }

  const Icon = projectIcons[index] ?? Terminal;

  return (
    <BentoCard
      delay={0.1 * (index + 1)}
      className={cn("p-8 flex flex-col min-h-[320px]", gridClass)}
    >
      <div className="flex justify-between items-start mb-6 z-10">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => {
            const colors = ["text-primary", "text-secondary", "text-tertiary"];
            const colorClass = colors[tagIndex % colors.length];
            return (
              <span
                key={tag}
                className={cn(
                  "px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium border border-white/5",
                  colorClass
                )}
              >
                #{tag}
              </span>
            );
          })}
        </div>
        <Icon size={24} className="text-on-surface-variant" />
      </div>

      <div className="flex-1 mb-8 z-10">
        <h3 className="text-headline-md font-headline-md text-on-surface mb-3">
          {project.title}
        </h3>
        <p className="text-body-md font-body-md text-on-surface-variant max-w-md">
          {project.description}
        </p>
      </div>

      {/* Decorative block for the first project as in original */}
      {index === 0 && (
        <div className="w-full h-48 bg-surface rounded-xl border border-white/5 mb-6 overflow-hidden relative z-10 group-hover:border-primary/20 transition-colors">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdjFINHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48cGF0aCBkPSJNMTAgMGgxdjQwSDEweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="w-full h-full flex items-center justify-center">
            <Blocks size={64} className="text-surface-variant" />
          </div>
        </div>
      )}

      <div className={cn("flex items-center mt-auto z-10", index === 0 ? "justify-between pt-4 border-t border-white/5" : "justify-end")}>
        {index === 0 && (
          <span className="px-3 py-1 bg-surface rounded-full text-xs font-medium text-on-surface border border-white/10 flex items-center gap-1">
            <ExternalLink size={14} />
            Github
          </span>
        )}
        <Link
          href={project.githubUrl}
          className="text-sm font-medium text-on-surface-variant flex items-center gap-1 hover:text-primary transition-colors group/link"
        >
          View Project
          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </BentoCard>
  );
}
