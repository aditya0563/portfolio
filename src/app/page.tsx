"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { certifications, profile, projects } from "@/data/portfolio";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Diamond } from "lucide-react";
import { WelcomeBanner } from "@/components/ui/WelcomeBanner";

export default function Home() {
  const featuredProject = projects.find((p) => p.isFeatured);

  return (
    <>
      <WelcomeBanner />
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div className="max-w-2xl">
          <h2 className="font-display-lg text-4xl md:text-5xl lg:text-[64px] leading-tight font-bold text-on-surface hidden md:block">
            Advanced Full-Stack Development <br /> &amp; Modern Architectures
          </h2>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface md:hidden">
            Advanced Full-Stack Development &amp; Modern Architectures
          </h2>
        </div>
        <Link
          href="/contact?ref=home"
          className="text-primary hover:text-primary-container font-label-sm text-label-sm flex items-center gap-2 transition-colors group"
        >
          Let&apos;s Connect
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap auto-rows-min">
        {/* Stat Card 1 */}
        <BentoCard delay={0.1} className="md:col-span-3 p-8 flex flex-col justify-center items-center text-center h-[200px]">
          <span className="font-headline-lg text-3xl md:text-4xl font-bold text-primary block mb-2 group-hover:scale-105 transition-transform origin-bottom">
            Type-Safe
          </span>
          <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
            Next.js, tRPC, Drizzle ORM, Tailwind CSS
          </span>
        </BentoCard>

        {/* Stat Card 2 */}
        <BentoCard delay={0.2} className="md:col-span-6 p-8 flex flex-col justify-center items-center text-center h-[200px] bg-gradient-to-br from-[#161616] to-[#1a1122]">
          {/* Decorative Graphic */}
          <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
            <Diamond size={150} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <span className="font-headline-lg text-headline-lg md:text-[56px] font-bold text-on-surface leading-none mb-2 block bg-clip-text text-transparent bg-gradient-to-r from-white to-on-surface-variant">
              Monorepos
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant">
              Turborepo, Docker &amp; Kubernetes
            </span>
          </div>
        </BentoCard>

        {/* Stat Card 3 */}
        <BentoCard delay={0.3} className="md:col-span-3 p-8 flex flex-col justify-center items-center text-center h-[200px]">
          <span className="font-headline-lg text-3xl md:text-4xl font-bold text-secondary block mb-2 group-hover:scale-105 transition-transform origin-bottom">
            Algorithmic
          </span>
          <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
            Active LeetCode problem solver
          </span>
        </BentoCard>

        {/* Stat Card 4 */}
        <BentoCard delay={0.4} className="md:col-span-4 p-8 flex flex-col justify-center items-start h-[240px]">
          <Award size={36} className="text-primary mb-4" fill="currentColor" />
          <h3 className="font-headline-md text-headline-md mb-2">Linux Native</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Custom Xfce development environment
          </p>
        </BentoCard>

        {/* About Card */}
        <BentoCard delay={0.5} className="md:col-span-8 p-8 flex flex-col justify-between h-[240px]">
          <div>
            <h3 className="font-headline-md text-headline-md mb-3 text-white">
              Building scalable solutions
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              {profile.shortDescription}
            </p>
          </div>
          <Link
            href={profile.githubUrl}
            className="inline-flex w-max items-center gap-2 font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors mt-4"
          >
            View my GitHub
            <ArrowRight size={14} />
          </Link>
        </BentoCard>

        {/* Featured Project */}
        {featuredProject && (
          <BentoCard delay={0.6} className="md:col-span-12 p-8 flex flex-col min-h-[500px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-lg text-headline-lg font-bold">Featured Projects</h3>
              <Link
                href="/projects"
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
              >
                View Repository <ArrowRight size={14} />
              </Link>
            </div>

            <div className="relative w-full flex-grow rounded-xl overflow-hidden group/img cursor-pointer bg-surface-container-high border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

              <div className="absolute inset-0 w-full h-full bg-[#1a1a24] flex items-center justify-center overflow-hidden">
                <Image
                  src={featuredProject.imageUrl}
                  alt={featuredProject.imageAlt}
                  fill
                  className="object-cover opacity-60 group-hover/img:scale-105 group-hover/img:opacity-80 transition-all duration-700 ease-out"
                />
              </div>

              <div className="absolute bottom-0 left-0 p-8 z-20 w-full translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300">
                <div className="flex gap-2 mb-3">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface/80 backdrop-blur-sm border border-white/10 rounded-full font-label-sm text-label-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                  {featuredProject.type && (
                    <span className="px-3 py-1 bg-surface/80 backdrop-blur-sm border border-white/10 rounded-full font-label-sm text-label-sm text-secondary">
                      {featuredProject.type}
                    </span>
                  )}
                </div>
                <h4 className="font-headline-md text-headline-md text-white mb-1">
                  {featuredProject.title}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 delay-100">
                  {featuredProject.description}
                </p>
              </div>
            </div>
          </BentoCard>
        )}

        {/* Certifications / Affiliations */}
        <BentoCard delay={0.7} className="md:col-span-12 p-8">
          <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-8 text-center">
            Affiliations &amp; Hackathons
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="h-20 bg-surface-container-high rounded-lg flex items-center justify-center border border-white/5 opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="font-headline-md text-on-surface font-bold opacity-80 text-center px-2">
                  {cert.issuer}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </>
  );
}
