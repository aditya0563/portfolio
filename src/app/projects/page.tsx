"use client";

import { projects } from "@/data/portfolio";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <>
      <header className="mb-12 max-w-4xl">
        <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface mb-4">
          Engineering Impactful Solutions.
        </h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          A showcase of full-stack applications, monorepo architectures, and open-source contributions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap max-w-6xl pb-24 auto-rows-min">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </>
  );
}
