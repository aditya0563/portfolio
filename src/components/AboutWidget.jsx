import React from "react";

export default function AboutWidget({ profile, onOpenNodepad }) {
  return (
    <div
      onClick={onOpenNodepad}
      className="h-full flex flex-col justify-start text-white select-none space-y-3 cursor-pointer group transition-transform duration-200 active:scale-95"
      title="Click to open Notes"
    >
      <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs border-b border-white/10 pb-2 group-hover:text-amber-200 transition-colors">
        <span>📄 ABOUT ME</span>
      </div>

      <div className="space-y-2.5 text-xs text-zinc-200 leading-relaxed font-normal">
        <p className="flex items-start gap-2">
          <span>👉</span>
          <span>
            Hi 👋, I'm <strong className="text-white">{profile?.name}</strong>.
          </span>
        </p>
        <p className="flex items-start gap-2">
          <span>👉</span>
          <span>{profile?.title}</span>
        </p>
        <p className="flex items-start gap-2">
          <span>👉</span>
          <span>{profile?.bio}</span>
        </p>
      </div>
    </div>
  );
}