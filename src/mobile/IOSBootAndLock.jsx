import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import mobileWallpaper from "../assets/mob-wall.jpeg"; 
import faceIdVideo from "../assets/face-id.webm";
import HomeScreenGrid from "./HomeScreenGrid";
import LockScreen from "./LockScreen";
import AppModal from "./AppModal";

// --- iOS SIGNAL BARS ICON ---
// --- iOS SIGNAL BARS ICON (FIXED) ---
const SignalBarsIcon = () => (
  <svg className="w-[17px] h-[11px] shrink-0" viewBox="0 0 17 11" fill="none">
    <rect x="0" y="7" width="2.8" height="4" rx="0.8" fill="#FFFFFF" />
    <rect x="4.2" y="4.5" width="2.8" height="6.5" rx="0.8" fill="#FFFFFF" />
    <rect x="8.4" y="2" width="2.8" height="9" rx="0.8" fill="#FFFFFF" />
    <rect x="12.6" y="0" width="2.8" height="11" rx="0.8" fill="#FFFFFF" fillOpacity="0.3" />
  </svg>
);

// --- iOS BATTERY PILL ICON ---
const BatteryPillIcon = ({ level, isCharging }) => {
  const clampedLevel = Math.min(Math.max(level, 0), 100);

  return (
    <div className="flex items-center gap-[1.5px] shrink-0 select-none">
      <div className="relative w-[27px] h-[13px] rounded-[4.5px] p-[1px] flex items-center justify-start overflow-hidden bg-white/20 backdrop-blur-md">
        <div
          className={`h-full rounded-[2.5px] transition-all duration-300 ${
            isCharging
              ? "bg-[#34C759]"
              : clampedLevel <= 20
              ? "bg-[#FF3B30]"
              : "bg-white"
          }`}
          style={{ width: `${clampedLevel}%` }}
        />

        <div className="absolute inset-0 flex items-center justify-center gap-[1px] px-0.5 pointer-events-none">
          {isCharging ? (
            <svg className="w-2.5 h-2.5 fill-white drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M13 2L3 14h7v8l10-12h-7z" />
            </svg>
          ) : (
            <span className="text-[8.5px] font-bold tracking-tight leading-none text-white drop-shadow-sm">
              {clampedLevel}
            </span>
          )}
        </div>
      </div>
      <div className="w-[1.5px] h-[4px] rounded-r-[1px] bg-white/40" />
    </div>
  );
};

export default function IosBootAndLock({ onUnlock }) {
  const [screenState, setScreenState] = useState("booting"); 
  const [currentTime, setCurrentTime] = useState(new Date());
  const [passcode, setPasscode] = useState([]);
  const [isFaceIdActive, setIsFaceIdActive] = useState(false);
  const [isSwipingUp, setIsSwipingUp] = useState(false); // Controls the slide-out override
  const [activeApp, setActiveApp] = useState(null);

  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

  const videoRef = useRef(null);

  // --- NATIVE BATTERY STATUS API SYNC ---
  useEffect(() => {
    let batteryObj = null;

    const handleBatteryUpdate = (battery) => {
      setBatteryLevel(Math.round(battery.level * 100));
      setIsCharging(battery.charging);
    };

    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        batteryObj = battery;
        handleBatteryUpdate(battery);

        const onLevelChange = () => handleBatteryUpdate(battery);
        const onChargingChange = () => handleBatteryUpdate(battery);

        battery.addEventListener("levelchange", onLevelChange);
        battery.addEventListener("chargingchange", onChargingChange);

        batteryObj._cleanup = () => {
          battery.removeEventListener("levelchange", onLevelChange);
          battery.removeEventListener("chargingchange", onChargingChange);
        };
      }).catch((err) => {
        console.warn("Battery API unavailable:", err);
      });
    }

    return () => {
      if (batteryObj && batteryObj._cleanup) {
        batteryObj._cleanup();
      }
    };
  }, []);

  useEffect(() => {
    if (screenState !== "booting") return;
    const timer = setTimeout(() => setScreenState("lockscreen"), 1200);
    return () => clearTimeout(timer);
  }, [screenState]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- FAST FACE ID TRIGGER ---
  useEffect(() => {
    if (!isFaceIdActive) return;

    if (videoRef.current) {
      videoRef.current.playbackRate = 1.8;
    }

    const faceIdTimer = setTimeout(() => {
      handleFaceIdEnd();
    }, 1200);

    return () => clearTimeout(faceIdTimer);
  }, [isFaceIdActive]);

  const hours = currentTime.getHours() % 12 || 12;
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const triggerSwipeUpToUnlock = () => {
    if (isFaceIdActive) return;
    setIsSwipingUp(true); // Forces Framer Motion to slide top-out fully
    setIsFaceIdActive(true);
  };

  const handleFaceIdEnd = () => {
    setIsFaceIdActive(false);
    setIsSwipingUp(false);
    setScreenState("passcode");
  };

  const handleKeyClick = (num) => {
    if (passcode.length < 4) {
      const nextPasscode = [...passcode, num];
      setPasscode(nextPasscode);

      if (nextPasscode.length === 4) {
        setTimeout(() => {
          setScreenState("homescreen");
          if (onUnlock) onUnlock();
        }, 200);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-0 sm:p-4 overflow-hidden select-none">
      <div className="relative w-full sm:w-[390px] h-screen sm:h-[844px] sm:rounded-[48px] bg-black shadow-2xl overflow-hidden border-0 outline-none">
        
        <div className="relative w-full h-full sm:rounded-[46px] text-white font-sans overflow-hidden bg-black">
          
          {/* WALLPAPER LAYER */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
            style={{
              backgroundImage: `url(${mobileWallpaper})`,
              filter: screenState === "homescreen" ? "blur(20px) brightness(0.9)" : "none",
              transform: screenState === "homescreen" ? "scale(1.1)" : "scale(1)",
            }}
          />

          {/* STATUS BAR & DYNAMIC ISLAND */}
          {screenState !== "booting" && (
            <div className="absolute top-0 inset-x-0 z-50 flex justify-between items-center px-7 pt-3.5 text-white pointer-events-none">
