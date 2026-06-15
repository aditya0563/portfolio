"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface BentoCardProps extends HTMLMotionProps<"div"> {
  className?: string;
  delay?: number;
}

export function BentoCard({ className, children, delay = 0, ...props }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[#161616] border border-white/5 transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.1)] group",
        className
      )}
      {...props}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-0" />
      
      {/* Content Wrapper */}
      <div className="relative z-10 h-full">
        {children as React.ReactNode}
      </div>
    </motion.div>
  );
}
