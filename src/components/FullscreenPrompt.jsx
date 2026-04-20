import React from "react";
import { FaApple } from "react-icons/fa";

export default function FullscreenPrompt({ onEnter }) {
  const handleStart = () => {
    // 1. Request full screen mode
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {});
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen(); // Safari
    }

    // 2. Hide this overlay and enter the app
    onEnter();
  };

  return (
    <div
      onClick={handleStart}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-3xl text-white select-none cursor-pointer"
    >
      <div className="flex flex-col items-center gap-5 p-8 text-center">
        {/* Apple Icon */}
        <FaApple className="text-6xl text-white/90 drop-shadow-lg animate-pulse" />

        {/* Text */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">macOS Portfolio</h1>
          <p className="text-xs text-white/60">Click anywhere to enter full screen</p>
        </div>

        {/* Enter Button */}
        <button
          onClick={handleStart}
          className="mt-3 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium backdrop-blur-md transition-all"
        >
          Click to Enter
        </button>
      </div>
    </div>
  );
}