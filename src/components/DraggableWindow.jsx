import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Rnd } from "react-rnd";

export default function DraggableWindow({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  title,
  children,
  defaultWidth = 600,
  defaultHeight = 400,
  defaultX = 0,
  defaultY = 0,
  zIndex,
  onBringToFront,
  headerColor = "bg-zinc-950",
  borderColor = "border-white/15",
  bgColor = "bg-black",
  isDarkMode = true,
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [animationState, setAnimationState] = useState("opening");

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setAnimationState("opening");
      const timer = setTimeout(() => setAnimationState("idle"), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  if (!isOpen || isMinimized) return null;

  const handleToggleFullScreen = (e) => {
    e.stopPropagation();
    onBringToFront?.();
    setIsFullScreen((prev) => !prev);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setAnimationState("closing");
    setTimeout(() => {
      onClose?.();
    }, 200);
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    setAnimationState("minimizing");
    setTimeout(() => {
      onMinimize?.();
    }, 250);
  };

  const windowVariants = {
    opening: {
      scale: 0.88,
      opacity: 0,
      y: 20,
    },
    idle: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 340,
        damping: 26,
        mass: 0.8,
      },
    },
    closing: {
      scale: 0.92,
      opacity: 0,
      transition: { duration: 0.18, ease: "easeOut" },
    },
    minimizing: {
      scale: 0.3,
      opacity: 0,
      y: 200,
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <AnimatePresence>
      <Rnd
        size={
          isFullScreen
            ? { width: "100vw", height: "100vh" }
            : { width: size.width, height: size.height }
        }
        position={
          isFullScreen
            ? { x: 0, y: 0 }
            : { x: position.x, y: position.y }
        }
        disableDragging={isFullScreen}
