import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DynamicIsland({ onSiriClick }) {
  const [isSiriActive, setIsSiriActive] = useState(false);

  const handleSiriToggle = () => {
    const nextState = !isSiriActive;
    setIsSiriActive(nextState);
    if (onSiriClick) {
      onSiriClick(nextState);
    }
  };

  return (
    <>
      {/* Siri Glow & Keyframes Styles */}
      <style>{`
        .notch-curves::before, .notch-curves::after {
          content: "";
          position: absolute;
          top: 0;
          width: 16px;
          height: 16px;
          background-color: transparent;
          pointer-events: none;
        }
        .notch-curves::before {
          left: -16px;
          border-top-right-radius: 16px;
          box-shadow: 4px -4px 0 4px black;
        }
        .notch-curves::after {
          right: -16px;
          border-top-left-radius: 16px;
          box-shadow: -4px -4px 0 4px black;
        }

        .siri-card-glow {
          box-shadow: 
            0 0 30px rgba(220, 38, 38, 0.25),
            0 0 60px rgba(59, 130, 246, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
        }

        @keyframes siri-wave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .siri-bar {
          animation: siri-wave 0.8s ease-in-out infinite;
        }
      `}</style>

      {/* --- Dynamic Island / Siri Container --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-90 flex justify-center">
        <AnimatePresence mode="wait">
          {!isSiriActive ? (
            /* --- COMPACT NOTCH STATE --- */
            <motion.div
              key="notch"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-black text-white flex items-center justify-center relative notch-curves w-[160px] md:w-[200px] h-[32px] md:h-[40px] rounded-b-[18px]"
            >
              <div className="absolute inset-0 flex w-full h-8 z-20">
                <div className="flex-[1.5] cursor-pointer" title="Music & Calendar" />
                <div
                  onClick={handleSiriToggle}
