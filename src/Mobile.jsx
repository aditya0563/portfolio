import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import IosBootAndLock from "./mobile/IOSBootAndLock";
import HomeScreenGrid from "./mobile/HomeScreenGrid";
import AppModal from "./mobile/AppModal";
import mobileWallpaper from "./assets/mob-wall.jpeg";

// --- iOS SIGNAL BARS ICON ---
const SignalBarsIcon = () => (
  <svg className="w-[17px] h-[11px] shrink-0" viewBox="0 0 17 11" fill="none">
    <rect x="0" y="7" width="2.8" height="4" rx="0.8" fill="#FFFFFF" />
    <rect x="4.2" y="4.5" width="2.8" height="6.5" rx="0.8" fill="#FFFFFF" />
    <rect x="8.4" y="2" width="2.8" height="9" rx="0.8" fill="#FFFFFF" />
    <rect
      x="12.6"
      y="0"
      width="2.8"
      height="11"
      rx="0.8"
      fill="#FFFFFF"
      fillOpacity="0.3"
    />
  </svg>
);

// --- iOS BATTERY PILL ICON ---
const BatteryPillIcon = ({ level, isCharging }) => {
  const getFillColor = () => {
    if (isCharging) return "bg-[#34C759]";
    if (level <= 20) return "bg-[#FF3B30]";
    return "bg-white";
  };

  const getCapColor = () => {
    if (isCharging) return "bg-[#34C759]";
    if (level <= 20) return "bg-[#FF3B30]";
    return "bg-white/40";
  };

  return (
    <div className="flex items-center gap-[1.5px] shrink-0 select-none">
      <div className="relative w-[27px] h-[13px] rounded-[4.5px] p-[1px] flex items-center justify-between overflow-hidden transition-colors duration-300 bg-white/20 backdrop-blur-md border border-white/10">
        {/* Dynamic Battery Level Fill Bar */}
        <div
          className={`h-full rounded-[3px] transition-all duration-300 ${getFillColor()}`}
          style={{ width: `${Math.max(level, 10)}%` }}
        />

        {/* Battery Level Text & Charging Lightning Bolt Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-[0.5px] px-0.5 pointer-events-none">
          <span
            className={`text-[8.5px] font-bold tracking-tight leading-none ${
              isCharging || level <= 20
                ? "text-white drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.5)]"
                : level > 50
                  ? "text-black mix-blend-difference"
                  : "text-white"
            }`}
          >
            {level}
          </span>

          {isCharging && (
            <svg
              className="w-2 h-2.5 text-white fill-current drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.5)] -ml-[0.5px]"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h7v8l10-12h-7z" />
            </svg>
          )}
        </div>
      </div>

      {/* Battery Nipple/Cap */}
      <div
        className={`w-[1.5px] h-[4px] rounded-r-[1px] transition-colors duration-300 ${getCapColor()}`}
      />
    </div>
  );
};

const SearchIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-white/80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
  </svg>
);

const DOCK_APPS = [
  {
    id: "phone",
    imgSrc:
      "https://cdn.iconscout.com/icon/free/png-256/free-apple-phone-icon-svg-download-png-493154.png?f=webp",
    badge: 52,
  },
  {
    id: "messages",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg",
    badge: 433,
  },
  {
    id: "camera",
    imgSrc:
      "https://cdn.iconscout.com/icon/free/png-256/free-apple-camera-icon-svg-download-png-493147.png?f=webp",
  },
  {
    id: "music",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/500px-Apple_Music_icon.svg.png",
  },
];

export default function Mobile() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState(null);

  const [batteryLevel, setBatteryLevel] = useState(90);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    let batteryObj = null;

    const updateBattery = (battery) => {
      setBatteryLevel(Math.round(battery.level * 100));
      setIsCharging(battery.charging);
    };

    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        batteryObj = battery;
        updateBattery(battery);

        battery.addEventListener("levelchange", () => updateBattery(battery));
        battery.addEventListener("chargingchange", () =>
          updateBattery(battery),
        );
      });
    }

    return () => {
      if (batteryObj) {
        batteryObj.removeEventListener("levelchange", () =>
          updateBattery(batteryObj),
        );
        batteryObj.removeEventListener("chargingchange", () =>
          updateBattery(batteryObj),
