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

