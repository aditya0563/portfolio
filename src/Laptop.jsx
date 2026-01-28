import React, { useState, useEffect, useCallback, useReducer, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import photo from "./assets/wallpaper.jpg";

import Topbar from "./components/Topbar";
import DynamicIsland from "./components/DynamicIsland";
import DesktopIcons from "./components/DesktopIcons";
import Dock from "./components/Dock";

import BootScreen from "./components/BootScreen";
import DesktopWidgets from "./components/DesktopWidgets";
import WindowManager from "./components/WindowManager";
import LockScreen from "./components/LockScreen";

function windowReducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        [action.id]: { isOpen: true, isMinimized: false }
      };
    case "CLOSE":
      return {
        ...state,
        [action.id]: { ...state[action.id], isOpen: false }
      };
    case "MINIMIZE":
      return {
        ...state,
        [action.id]: { ...state[action.id], isMinimized: true }
      };
    default:
      return state;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const TopbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 280, damping: 22 } 
  },
};

const widgetVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 240, damping: 20 } 
  },
};

const iconVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.25, ease: "easeOut" } 
  },
};

const dockVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 220, damping: 18, delay: 0.15 } 
  },
};

const profile = {
  name: "Bikash Dalapati",
  title: "Full-Stack MERN Developer & DSA Problem Solver",
  bio: "Building high-performance web applications and solving complex algorithmic challenges with clean, modern code.",
};

const Laptop = () => {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  
  const [windows, dispatch] = useReducer(windowReducer, {});
  const [windowZIndices, setWindowZIndices] = useState({});
  const [nextZIndex, setNextZIndex] = useState(100);

  const [isWifiActive, setIsWifiActive] = useState(true);
  const [isBluetooth, setIsBluetooth] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [finderCategory, setFinderCategory] = useState("recents");

  const hasRequestedFullscreen = useRef(false);

  const triggerFullscreen = () => {
    if (!hasRequestedFullscreen.current && !document.fullscreenElement) {
      hasRequestedFullscreen.current = true;
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err) => console.log("Fullscreen blocked:", err));
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  const handleUserInteraction = () => {
    triggerFullscreen();
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const bringWindowToFront = useCallback((windowId) => {
    setWindowZIndices((prev) => ({ ...prev, [windowId]: nextZIndex }));
    setNextZIndex((prev) => prev + 1);
  }, [nextZIndex]);

  const getWindowZIndex = useCallback((windowId) => {
    return windowZIndices[windowId] || 40;
  }, [windowZIndices]);

  const openApp = useCallback((appId) => {
    dispatch({ type: "OPEN", id: appId });
    bringWindowToFront(appId);
  }, [bringWindowToFront]);

  const closeApp = useCallback((appId) => {
    dispatch({ type: "CLOSE", id: appId });
  }, []);

  const minimizeApp = useCallback((appId) => {
    dispatch({ type: "MINIMIZE", id: appId });
  }, []);

  const handleOpenFinderCategory = useCallback((category) => {
    setFinderCategory(category);
    openApp("finder");
  }, [openApp]);

  const getCenterPosition = useCallback((width, height) => ({
    defaultX: Math.max(20, (window.innerWidth - width) / 2),
    defaultY: Math.max(40, (window.innerHeight - height) / 2),
  }), []);

  return (
    <div 
      onClick={handleUserInteraction}
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-500 ${
        isDarkMode ? "bg-black dark" : "bg-zinc-200"
      }`}
    >
      {/* Background Wallpaper */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
          isDarkMode ? "brightness-90 contrast-105" : "brightness-105"
        }`}
        style={{ backgroundImage: `url(${photo})` }}
      />

      {/* 1. Boot Screen */}
      <AnimatePresence>
        {booting && (
          <div onClick={triggerFullscreen} className="absolute inset-0 z-[9999]">
            <BootScreen key="boot" />
          </div>
        )}
      </AnimatePresence>

      {/* 2. Lock Screen */}
      <AnimatePresence>
        {!booting && isLocked && (
          <LockScreen key="lock" profile={profile} onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* 3. Main Desktop Environment */}
      {!booting && !isLocked && (
        <motion.div
          key="desktop-environment"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full h-full"
        >
          {/* Workspace Container */}
          <div className="absolute inset-0 pb-24 overflow-hidden">
            <WindowManager
              windows={windows}
              onClose={closeApp}
              onMinimize={minimizeApp}
              bringWindowToFront={bringWindowToFront}
              getWindowZIndex={getWindowZIndex}
              getCenterPosition={getCenterPosition}
              isWifiActive={isWifiActive}
              setIsWifiActive={setIsWifiActive}
              isBluetooth={isBluetooth}
              setIsBluetooth={setIsBluetooth}
              isDarkMode={isDarkMode}
              finderCategory={finderCategory}
            />

            <DesktopWidgets
              profile={profile}
              isDarkMode={isDarkMode}
              onOpenWeather={() => openApp("weather")}
              onOpenCalender={() => openApp("calendar")}
              onOpenNotes={() => openApp("notes")}
              widgetVariants={widgetVariants}
            />

            <motion.div variants={iconVariants}>
              <DesktopIcons
                isDarkMode={isDarkMode}
                onOpenResume={() => openApp("resume")}
                onOpenLeetCode={() => openApp("leetcode")}
                onOpenCodechef={() => openApp("codechef")}
                onOpenProject={() => openApp("projectfolder")}
                onOpenDoc={() => handleOpenFinderCategory("documents")}
              />
            </motion.div>
          </div>

          {/* Top Bar & Dynamic Island */}
          <div className="absolute top-0 inset-x-0 z-[9999] pointer-events-none">
            <motion.div variants={TopbarVariants} className="pointer-events-auto">
              <Topbar
                onOpenCalculator={() => openApp("calculator")}
                isWifiActive={isWifiActive}
                setIsWifiActive={setIsWifiActive}
                isBluetooth={isBluetooth}
                setIsBluetooth={setIsBluetooth}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                isOpenFinder={() => handleOpenFinderCategory("recents")}
              />
            </motion.div>
            <div className="pointer-events-auto">
              <DynamicIsland />
            </div>
          </div>

          {/* Dock */}
          <motion.div 
            variants={dockVariants}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
          >
            <Dock
              isDarkMode={isDarkMode}
              onOpenCalculator={() => openApp("calculator")}
              onOpenTerminal={() => openApp("terminal")}
              onOpenLinkedIn={() => openApp("linkedin")}
              onOpenCalendar={() => openApp("calendar")}
              onOpenSafari={() => openApp("safari")}
              onOpenYouTube={() => openApp("youtube")}
              onOpenWeather={() => openApp("weather")}
              onOpenGithub={() => openApp("github")}
              onOpenVscode={() => openApp("vscode")}
              onOpenMap={() => openApp("map")}
              onOpenPhoto={() => openApp("photos")}
              onOpenNetflix={() => openApp("netflix")}
              onOpenNodepad={() => openApp("notes")}
              onOpenSpotify={() => openApp("spotify")}
              onOpenSetting={() => openApp("setting")}
              onOpenImessage={() => openApp("imessage")}
              onOpenFinder={() => handleOpenFinderCategory("recents")}
              onOpenBin={() => handleOpenFinderCategory("bin")}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Laptop;