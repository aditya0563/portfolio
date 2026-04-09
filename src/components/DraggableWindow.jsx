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
        enableResizing={
          isFullScreen
            ? false
            : {
                bottom: true,
                bottomLeft: true,
                bottomRight: true,
                left: true,
                right: true,
                top: true,
                topLeft: true,
                topRight: true,
              }
        }
        minWidth={isFullScreen ? undefined : 400}
        minHeight={isFullScreen ? undefined : 300}
        onDragStop={(e, d) => {
          if (!isFullScreen) {
            setPosition({ x: d.x, y: d.y });
          }
          onBringToFront?.();
        }}
        onResizeStop={(e, direction, ref, delta, newPosition) => {
          if (!isFullScreen) {
            setSize({
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
            });
            setPosition(newPosition);
          }
          onBringToFront?.();
        }}
        onMouseDown={() => onBringToFront?.()}
        dragHandleClassName="drag-handle"
        style={{
          position: isFullScreen ? "fixed" : "absolute",
          top: isFullScreen ? 0 : undefined,
          left: isFullScreen ? 0 : undefined,
          zIndex: isFullScreen ? 99999 : zIndex,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
        className="overflow-hidden"
      >
        <motion.div
          initial="opening"
          animate={animationState}
          variants={windowVariants}
          className={`w-full h-full flex flex-col overflow-hidden origin-center ${
            isFullScreen ? "rounded-none" : "rounded-2xl"
          } border ${borderColor} ${bgColor} shadow-2xl`}
        >
          {/* Header Bar */}
          <div
            className={`drag-handle h-10 px-4 flex items-center justify-between ${headerColor} border-b ${
              isDarkMode ? "border-white/10" : "border-black/10"
            } select-none ${
              isFullScreen ? "cursor-default" : "cursor-grab active:cursor-grabbing"
            } shrink-0 z-20`}
          >
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2 w-20">
              <button
                type="button"
                onClick={handleClose}
                title="Close"
                className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 active:scale-90 transition-all cursor-pointer shrink-0 border-0 p-0"
              />
              <button
                type="button"
                onClick={handleMinimize}
                title="Minimize"
                className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 active:scale-90 transition-all cursor-pointer shrink-0 border-0 p-0"
              />
              <button
                type="button"
                onClick={handleToggleFullScreen}
                title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110 active:scale-90 transition-all cursor-pointer shrink-0 border-0 p-0"
              />
            </div>

            {/* Window Title */}
            <span
              className={`text-xs font-medium tracking-wide text-center flex-1 truncate ${
                isDarkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              {title}
            </span>

            <div className="w-20" />
          </div>

          {/* Inner Content Area */}
          <div className="flex-1 min-h-0 w-full overflow-hidden flex flex-col relative">
            {children}
          </div>
        </motion.div>
      </Rnd>
    </AnimatePresence>
  );
}