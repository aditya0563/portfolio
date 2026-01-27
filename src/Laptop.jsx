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
