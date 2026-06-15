"use client";

import { useEffect, useRef } from "react";

export function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        requestAnimationFrame(() => {
          spotlightRef.current!.style.setProperty("--mouse-x", `${e.clientX}px`);
          spotlightRef.current!.style.setProperty("--mouse-y", `${e.clientY}px`);
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        background:
          "radial-gradient(600px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(168, 85, 247, 0.15), transparent 80%)",
        transition: "background 0.1s ease",
      }}
    />
  );
}
