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
        );
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => setIsUnlocked(true);
  const handleLock = () => setIsUnlocked(false);

  const hours = currentTime.getHours() % 12 || 12;
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-0 sm:p-4 overflow-hidden select-none">
      {!isUnlocked ? (
        <IosBootAndLock onUnlock={handleUnlock} />
      ) : (
        <div className="relative w-full sm:w-[390px] h-screen sm:h-[844px] sm:rounded-[50px] bg-black shadow-2xl overflow-hidden border-0 outline-none flex flex-col justify-start">
          {/* iOS Blurred Background */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage: `url(${mobileWallpaper})`,
              filter: "blur(25px) brightness(0.92)",
            }}
          />

          {/* MAIN HOME GRID CONTENT */}
          <div className="mt-12 flex-1 overflow-y-auto">
            <HomeScreenGrid setActiveApp={setActiveApp} />
          </div>

          {/* BOTTOM SEARCH PILL & DOCK */}
          <div className="relative z-30 pb-2 px-5 flex flex-col items-center mt-auto">
            {/* Search Pill */}
            <div className="bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10 cursor-pointer active:scale-95 transition-transform mb-3">
              <SearchIcon />
              <span className="text-[12px] font-medium text-white/90 tracking-tight">
                Search
              </span>
            </div>

            {/* Bottom Dock Container */}
            <div className="w-full bg-white/20 backdrop-blur-3xl rounded-[38px] p-3.5 flex justify-between items-center border border-white/20 shadow-2xl px-5">
              {DOCK_APPS.map((dockApp) => (
                <div
                  key={dockApp.id}
                  className="relative cursor-pointer active:scale-90 transition-transform duration-150"
                  onClick={() => setActiveApp(dockApp.id)}
                >
                  <div className="relative w-[62px] h-[62px] [clip-path:inset(0_round_22.5%)] flex items-center justify-center overflow-hidden">
                    {dockApp.imgSrc ? (
                      <img
                        src={dockApp.imgSrc}
                        alt={dockApp.id}
                        className="w-full h-full object-cover scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-700/80 flex items-center justify-center">
                        <span className="text-[12px] text-white/80 font-semibold uppercase tracking-wider">
                          {dockApp.id.substring(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {dockApp.badge && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#FF3B30] text-white text-[11px] font-bold px-1.5 min-w-[20px] h-[20px] rounded-full flex items-center justify-center border-2 border-white/20 shadow-md z-10">
                      {dockApp.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Home Indicator */}
            <div className="w-36 h-1 bg-white/90 rounded-full mt-3 mb-1" />
          </div>

          {/* APP OVERLAY MODAL (z-40) */}
          <AnimatePresence>
            {activeApp && (
              <AppModal
                activeApp={activeApp}
                onClose={() => setActiveApp(null)}
              />
            )}
          </AnimatePresence>

          {/* TOP STATUS BAR & DYNAMIC ISLAND */}
          <div className="absolute top-0 inset-x-0 z-50 flex justify-between items-center px-7 pt-3.5 pb-1 text-white pointer-events-none">
            {/* Time */}
            <span className="text-[15px] font-semibold tracking-tight text-white/95 pointer-events-auto">
              {formattedTime}
            </span>

            {/* Dynamic Island */}
            <button
              onClick={handleLock}
              title="Lock Phone"
              className="
      absolute
      left-1/2
      -translate-x-1/2
      top-2.5
      w-[120px]
      h-[35px]
      bg-black
      rounded-full
      z-50
      cursor-pointer
      active:scale-95
      transition-transform
      pointer-events-auto
      shadow-md
    "
            >
              {/* Orange microphone dot */}
              <span
                className="
        absolute
        right-[38px]
        top-1/2
        -translate-y-1/2
        w-[6px]
        h-[6px]
        bg-[#FF9500]
        rounded-full
        shadow-[0_0_4px_rgba(255,149,0,0.6)]
      "
              />
            </button>

            {/* Right status icons */}
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <SignalBarsIcon />

              <span className="text-[12px] font-semibold tracking-tight text-white/95">
                5G
              </span>

              <BatteryPillIcon level={batteryLevel} isCharging={isCharging} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
