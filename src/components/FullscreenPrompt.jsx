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
