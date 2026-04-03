import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaArrowRight, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import photo from "../assets/wallpaper.jpg"; // Background wallpaper

export default function LockScreen({ profile, onUnlock }) {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/(AM|PM)/i, '').trim();
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Keyboard & Wheel listener for swipe/key actions to reveal password box
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showPasswordPrompt && (e.key === "ArrowUp" || e.key === "Enter" || e.key === " ")) {
        setShowPasswordPrompt(true);
      }
    };
    const handleWheel = (e) => {
      if (!showPasswordPrompt && e.deltaY < -20) {
        setShowPasswordPrompt(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [showPasswordPrompt]);

  // Handle Password Submission (Any 4-digit code like 2026)
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (/^\d{4}$/.test(password)) {
      onUnlock(); 
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <motion.div 
      drag={!showPasswordPrompt ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.y < -40 && !showPasswordPrompt) {
          setShowPasswordPrompt(true);
        }
      }}
      onClick={() => {
        if (!showPasswordPrompt) setShowPasswordPrompt(true);
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-between py-16 select-none overflow-hidden font-sans cursor-grab active:cursor-grabbing"
    >
      {/* Background Wallpaper with heavy blur when password prompt is open */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
          showPasswordPrompt ? "brightness-75 blur-3xl scale-105" : "brightness-90 blur-0"
        }`}
        style={{ backgroundImage: `url(${photo})` }}
      />
      <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${showPasswordPrompt ? "bg-black/50" : "bg-black/15"}`} />

      {/* Top Section: Serif Date & Massive Serif Clock */}
      <motion.div 
        animate={{ y: showPasswordPrompt ? -15 : 0, opacity: showPasswordPrompt ? 0.85 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center text-white drop-shadow-md mt-6 pointer-events-none font-serif"
      >
        <div className="text-lg md:text-xl font-medium tracking-wider text-white/90 mb-1">
          {formatDate(currentTime)}
        </div>
        <div className="text-[6rem] md:text-[8rem] font-normal leading-none tracking-tight">
          {formatTime(currentTime)}
        </div>
      </motion.div>

      {/* Center/Bottom Section: Frosted Glass BD Initials Badge & Password Input */}
      <div className="relative z-10 flex flex-col items-center gap-3 mb-12" onClick={(e) => e.stopPropagation()}>
        {/* Profile Initials Circle ("BD") with Frosted Glass Effect */}
        <div className="w-24 h-24 rounded-full border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-2xl flex items-center justify-center text-white text-2xl font-semibold tracking-wider drop-shadow-md">
          BD
        </div>

        {/* User Name */}
        <h2 className="text-white text-base font-semibold tracking-wide drop-shadow-md font-sans">
          {profile?.name || "Bikash Dalapati"}
        </h2>

        <AnimatePresence mode="wait">
          {!showPasswordPrompt ? (
            // Swipe Up Prompt
            <motion.div 
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center cursor-pointer pointer-events-none flex flex-col items-center gap-1 mt-1 font-sans"
            >
              <p className="text-xs text-white/90 font-light drop-shadow animate-bounce">
                Swipe up or click to unlock
              </p>
            </motion.div>
          ) : (
            // Active Password Input Box
            <motion.div 
              key="password-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-4 mt-2 font-sans"
            >
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                <motion.div
                  animate={error ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-64 rounded-full bg-white/10 border ${
                    error ? "border-red-500 bg-red-500/20" : "border-white/30 focus-within:border-white/50"
                  } backdrop-blur-xl transition-all flex items-center px-4 py-1.5 shadow-2xl`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setPassword(val);
                    }}
                    placeholder="Enter Password"
                    autoFocus
                    className="w-full bg-transparent text-white text-xs placeholder-white/60 focus:outline-none tracking-widest text-center"
                  />

                  {/* Toggle Show/Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-white/60 hover:text-white text-xs mx-2 transition-colors cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                  {/* Submit Arrow Button */}
                  <button
                    type="submit"
                    className="text-white/80 hover:text-white text-xs transition-transform active:scale-90 cursor-pointer"
                  >
                    <FaArrowRight />
                  </button>
                </motion.div>

                {/* Helper Text */}
                <p className={`text-[11px] transition-colors ${error ? "text-red-400 font-medium" : "text-white/60"}`}>
                  {error ? "Please enter valid year to unlock" : '" Hint: Enter any 4 digit to unlock "'}
                </p>
              </form>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setShowPasswordPrompt(false)}
                className="mt-1 px-5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-xs font-light backdrop-blur-md transition-all flex items-center gap-1.5 active:scale-95 shadow-lg cursor-pointer"
              >
                <span>Cancel</span>
                <FaTimes className="text-[10px]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}