"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { certifications } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { GraduationCap, Cloud, Users, Trophy, BadgeCheck } from "lucide-react";

export default function Certifications() {
  return (
    <>
      <header className="mb-12 max-w-4xl">
        <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface mb-4">
          Professional Recognition & Credentials
        </h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Verified achievements, technical certifications, and active community involvement shaping my engineering journey.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap max-w-6xl pb-24 auto-rows-min">
        {certifications.map((cert, index) => {
          // --- Dynamic Styling Configuration ---
          let gridClass = "md:col-span-12 lg:col-span-6"; // Default for index 2 & 3
          let iconProps = { Icon: Trophy, colorClass: "text-red-400" };
          let customFooter = null;
          let customHeader = null;

          if (index === 0) {
            gridClass = "md:col-span-12 lg:col-span-8";
            iconProps = { Icon: GraduationCap, colorClass: "text-purple-400" };
            customHeader = (
              <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-semibold tracking-wider uppercase text-purple-300 border border-purple-500/20">
                Highlight
              </span>
            );
          } else if (index === 1) {
            gridClass = "md:col-span-12 lg:col-span-4";
            iconProps = { Icon: Cloud, colorClass: "text-blue-400" };
            customFooter = (
              <div className="flex items-center gap-2 mt-auto z-10 text-yellow-500">
                <BadgeCheck className="w-5 h-5" />
                <span className="text-sm font-medium">15+ Skill Badges Earned</span>
              </div>
            );
          } else if (index === 2) {
            iconProps = { Icon: Users, colorClass: "text-yellow-400" };
          }

          const { Icon, colorClass } = iconProps;

          return (
            <BentoCard
              key={cert.id}
              delay={0.1 * (index + 1)}
              className={cn("p-8 flex flex-col min-h-[280px] md:min-h-[320px] justify-between", gridClass)}
            >
              {/* Header section for Card 0 (Highlight Pill) */}
              {index === 0 ? (
                <div className="flex justify-between items-start z-10 w-full mb-8">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-white/5">
                    <Icon className={cn("w-5 h-5", colorClass)} />
                  </div>
                  {customHeader}
                </div>
              ) : (
                <div className="z-10 mb-6">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-white/5 mb-6">
                    <Icon className={cn("w-5 h-5", colorClass)} />
                  </div>
                </div>
              )}

              {/* Main Text Content */}
              <div className={cn("z-10", index !== 0 && "mb-6")}>
                <p className={cn("text-sm font-semibold mb-2 tracking-wide", colorClass)}>
                  {cert.issuer}
                </p>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-3">
                  {cert.title}
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl">
                  {cert.description}
                </p>
              </div>

              {/* Footer section for Card 1 (Badges) */}
              {customFooter}
            </BentoCard>
          );
        })}
      </div>
    </>
  );
}