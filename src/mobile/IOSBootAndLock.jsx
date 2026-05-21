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
              <span className="text-[15px] font-semibold tracking-tight text-white/95 pointer-events-auto">
                {formattedTime}
              </span>

              <motion.div
                layout
                layoutId="dynamic-island"
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className={`absolute left-1/2 -translate-x-1/2 bg-black flex items-center justify-center overflow-hidden z-50 border-0 outline-none shadow-none ring-0 pointer-events-auto ${
                  isFaceIdActive
                    ? "top-2 w-[125px] h-[125px] rounded-[38px]"
                    : "top-2.5 w-[120px] h-[35px] rounded-full"
                }`}
              >
                {isFaceIdActive && (
                  <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-[38px]">
                    <video
                      ref={videoRef}
                      src={faceIdVideo}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                )}
              </motion.div>

              <div className="flex items-center gap-1.5 pointer-events-auto">
                <SignalBarsIcon />
                <span className="text-[12px] font-bold tracking-tight text-white/95 -ml-0.5">5G</span>
                <BatteryPillIcon level={batteryLevel} isCharging={isCharging} />
              </div>
            </div>
          )}

          {/* 1. APPLE BOOT SCREEN */}
          {screenState === "booting" && (
            <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6">
              <img src={logo} alt="Apple Logo" className="w-16 h-16 object-contain" />
              <div className="w-36 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          )}

          {/* 2. iOS LOCK SCREEN (SWIPE FULLY UPWARD) */}
          <AnimatePresence>
            {screenState === "lockscreen" && (
              <motion.div
                key="lockscreen"
                className="absolute inset-0 z-30 w-full h-full cursor-grab active:cursor-grabbing touch-none"
                drag={isSwipingUp ? false : "y"}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                animate={isSwipingUp ? { y: "-100%", opacity: 0 } : { y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onDragEnd={(_, info) => {
                  if (info.offset.y < -40 || info.velocity.y < -150) {
                    triggerSwipeUpToUnlock();
                  }
                }}
              >
                <LockScreen
                  formattedDate={formattedDate}
                  formattedTime={formattedTime}
                  onUnlockSwipe={triggerSwipeUpToUnlock}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. PASSCODE SCREEN */}
          {screenState === "passcode" && (
            <div className="relative z-30 h-full flex flex-col justify-between pt-20 pb-8 px-8 backdrop-blur-3xl bg-black/50">
              <div className="flex flex-col items-center mt-2">
                <h2 className="text-[20px] font-semibold text-white/95 tracking-wide mb-5">
                  Enter Passcode
                </h2>

                <div className="flex gap-4 mb-6">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-[13px] h-[13px] rounded-full transition-all duration-150 ${
                        passcode.length > idx
                          ? "bg-white border-2 border-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          : "border-2 border-white/80 bg-transparent"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-[12px] font-semibold text-white/90 tracking-wide text-center">
                  Hint: Enter any 4 digit to unlock
                </p>
              </div>

              <div className="grid grid-cols-3 gap-y-4 gap-x-6 max-w-[250px] mx-auto my-auto">
                {[
                  { num: "1", sub: "" },
                  { num: "2", sub: "A B C" },
                  { num: "3", sub: "D E F" },
                  { num: "4", sub: "G H I" },
                  { num: "5", sub: "J K L" },
                  { num: "6", sub: "M N O" },
                  { num: "7", sub: "P Q R S" },
                  { num: "8", sub: "T U V" },
                  { num: "9", sub: "W X Y Z" },
                ].map((btn) => (
                  <button
                    key={btn.num}
                    onClick={() => handleKeyClick(btn.num)}
                    className="w-18 h-18 rounded-full bg-white/10 active:bg-white/30 border-0 backdrop-blur-xl flex flex-col items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span className="text-2xl font-light text-white leading-none">{btn.num}</span>
                    {btn.sub && (
                      <span className="text-[8px] font-semibold tracking-widest text-white/60 mt-0.5">
                        {btn.sub}
                      </span>
                    )}
                  </button>
                ))}

                <div className="col-start-2 flex justify-center">
                  <button
                    onClick={() => handleKeyClick("0")}
                    className="w-18 h-18 rounded-full bg-white/10 active:bg-white/30 border-0 backdrop-blur-xl flex items-center justify-center text-2xl font-light text-white shadow-md active:scale-95 cursor-pointer"
                  >
                    0
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-medium text-white/80 px-2 mb-2">
                <button
                  onClick={() => alert("Emergency Call Dialed")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Emergency
                </button>
                <button
                  onClick={() => {
                    setPasscode([]);
                    setIsSwipingUp(false);
                    setScreenState("lockscreen");
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* 4. iOS HOME SCREEN */}
          {screenState === "homescreen" && (
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-30 h-full w-full flex flex-col justify-between pt-10 pb-4 overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto pt-4">
                <HomeScreenGrid setActiveApp={setActiveApp} />
              </div>

              <AnimatePresence>
                {activeApp && (
                  <AppModal activeApp={activeApp} onClose={() => setActiveApp(null)} />
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}