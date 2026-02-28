import React from "react";

export default function WindowHeader({ title, onClose, onMinimize }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 select-none">
      {/* macOS Traffic Lights */}
      <div className="flex items-center gap-2">
        {/* Red: Close */}
        <button
          onClick={onClose}
          className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 active:scale-95 transition-all cursor-pointer"
          title="Close"
        />
        {/* Yellow: Minimize */}
        <button
          onClick={onMinimize}
          className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80 active:scale-95 transition-all cursor-pointer"
          title="Minimize"
        />
        {/* Green: Maximize */}
        <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
      </div>

      {/* App Title Center */}
      <span className="text-xs font-medium text-zinc-400 tracking-wide absolute left-1/2 -translate-x-1/2 pointer-events-none">
        {title}
      </span>

      <div className="w-12" />
    </div>
  );
}