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
                  className="flex-1 cursor-pointer flex items-center justify-center relative group/lens"
                  title="Tap to Siri"
                >
                  <div className="w-4 h-4 rounded-full bg-[#0a0a0c] border border-neutral-800 flex items-center justify-center relative overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-sky-950 via-blue-900 to-indigo-950 border border-sky-500/20 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-white/50" />
                    </div>
                  </div>
                </div>
                <div className="flex-[1.5] cursor-pointer" title="File Tray" />
              </div>
            </motion.div>
          ) : (
            /* --- EXPANDED SIRI DIALOG CARD STATE --- */
            <motion.div
              key="siri-card"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 8 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-[380px] bg-black/85 backdrop-blur-2xl border border-red-500/40 rounded-2xl p-4 text-white siri-card-glow relative shadow-2xl flex flex-col gap-3"
            >
              {/* Top Row: Glowing Orb & Greeting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Siri Glowing Orb */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-red-500 to-cyan-400 p-[2px] shadow-lg shadow-red-500/30 animate-pulse flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-red-500 blur-[2px]" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide">
                      How can I help you?
                    </span>
                    <span className="text-[11px] text-zinc-400 font-light">
                      Try: <span className="text-zinc-200">"Open Settings"</span>, <span className="text-zinc-200">"Play music"</span>
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleSiriToggle}
                  className="text-[10px] font-medium tracking-wider bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition-all cursor-pointer text-zinc-300"
                >
                  CLOSE
                </button>
              </div>

              {/* Bottom Row: Waveform & Listening State */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {/* Waveform Bars */}
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="siri-bar w-[3px] h-3 bg-cyan-400 rounded-full" style={{ animationDelay: "0s" }} />
                    <span className="siri-bar w-[3px] h-3 bg-blue-500 rounded-full" style={{ animationDelay: "0.15s" }} />
                    <span className="siri-bar w-[3px] h-3 bg-red-500 rounded-full" style={{ animationDelay: "0.3s" }} />
                    <span className="siri-bar w-[3px] h-3 bg-purple-500 rounded-full" style={{ animationDelay: "0.1s" }} />
                  </div>
                  <span className="text-[11px] tracking-widest text-cyan-300 font-mono uppercase font-medium">
                    Listening...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}