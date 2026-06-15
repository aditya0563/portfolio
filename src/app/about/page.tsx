"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { cn } from "@/lib/utils";
import { 
  Route, 
  GraduationCap, 
  Wrench, 
  Palette, 
  Terminal, 
  Code2, 
  Box, 
  Database, 
  Hexagon 
} from "lucide-react";

export default function About() {
  return (
    <>
      <header className="mb-12 max-w-4xl">
        <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface mb-4">
          The Architect Behind the Code.
        </h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          I bridge the gap between complex engineering requirements and elegant user experiences.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap max-w-6xl pb-24 auto-rows-min">
        
        {/* Card 1: The Journey */}
        <BentoCard 
          delay={0.1} 
          className="p-8 flex flex-col min-h-[320px] md:col-span-12 lg:col-span-7"
        >
          <div className="flex items-center gap-3 mb-6 z-10">
            <Route className="w-6 h-6 text-primary" />
            <h3 className="text-headline-md font-headline-md text-on-surface">The Journey</h3>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant z-10">
            I am a Computer Science & Engineering student with a deep-seated passion for systems architecture. I don't just write code; I design scalable digital ecosystems. My expertise lies in modern toolchains like Turborepo and tRPC, ensuring every project is type-safe and performance-optimized.
          </p>
        </BentoCard>

        {/* Card 2: Academics */}
        <BentoCard 
          delay={0.2} 
          className="p-8 flex flex-col justify-between min-h-[320px] md:col-span-12 lg:col-span-5"
        >
          <div className="z-10">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-tertiary" />
              <h3 className="text-headline-md font-headline-md text-on-surface">Academics</h3>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant mb-8">
              Pursuing B.Tech in CSE. Specialized in Object-Oriented Programming, Data Structures, and Algorithm Design.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-auto z-10">
            <span className="text-sm font-medium text-on-surface-variant">LeetCode</span>
            <span className="px-3 py-1 bg-surface-container-high text-primary text-xs font-semibold rounded-full border border-white/5">
              150+ Solved
            </span>
          </div>
        </BentoCard>

        {/* Card 3: Arsenal */}
        <BentoCard 
          delay={0.3} 
          className="p-8 flex flex-col min-h-[320px] md:col-span-12 lg:col-span-7"
        >
          <div className="flex items-center gap-3 mb-8 z-10">
            <Wrench className="w-6 h-6 text-secondary" />
            <h3 className="text-headline-md font-headline-md text-on-surface">Arsenal</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4 z-10">
            {[
              { name: "Next.js", icon: Terminal },
              { name: "TypeScript", icon: Code2 },
              { name: "Docker", icon: Box },
              { name: "Drizzle", icon: Database },
              { name: "K8s", icon: Hexagon },
            ].map((tech) => (
              <div 
                key={tech.name} 
                className="flex flex-col items-center justify-center p-4 bg-surface border border-white/5 rounded-2xl hover:bg-surface-container-high transition-colors"
              >
                <tech.icon className="w-5 h-5 md:w-6 md:h-6 text-on-surface-variant mb-3" />
                <span className="text-xs text-on-surface-variant font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Card 4: Beyond the Screen */}
        <BentoCard 
          delay={0.4} 
          className="p-8 flex flex-col min-h-[320px] md:col-span-12 lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-6 z-10">
            <Palette className="w-6 h-6 text-primary" />
            <h3 className="text-headline-md font-headline-md text-on-surface">Beyond the Screen</h3>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant z-10">
            Fun fact: I am an accomplished artist. I bring this creative perspective into UI/UX design, blending logic with aesthetics to craft interfaces that are not only functional but visually compelling.
          </p>
        </BentoCard>

      </div>
    </>
  );
}