import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Dock({ onOpenCalculator,onOpenBin, onOpenFinder, onOpenImessage, onOpenSpotify, onOpenSetting, onOpenNetflix, onOpenNodepad, onOpenPhoto, onOpenMap, onOpenVscode, onOpenWeather, onOpenGithub, onOpenTerminal,onOpenLinkedIn, onOpenCalendar, onOpenSafari, onOpenYouTube }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex items-end justify-center w-full pb-2 select-none">
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="
          relative
          flex
          items-end
          gap-4.5
          px-4
          pb-4
          pt-2
          rounded-3xl
          bg-black/20
          backdrop-blur-2xl
          border
          border-white/10
          shadow-2xl
          z-50
          h-[80px]
        "
      >
        {/* Finder */}
        <div className="scale-120">
          <DockItem
            name="Finder"
            icon="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png"
            mouseX={mouseX}
            onClick={onOpenFinder}
          />
        </div>

        {/* Separator after Finder */}
        <div className="w-[1px] h-9 bg-white/20 my-auto mx-0.5 self-center mt-3" />

        {/* Terminal - Connected */}
        <div className="scale-130">
          <DockItem
            name="Terminal"
            icon="https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png"
            mouseX={mouseX}
            onClick={onOpenTerminal}
          />
        </div>

        {/* Calendar */}
        <div>
          <DockItem
            name="Calendar"
            customIcon={<DynamicCalendarIcon />}
            mouseX={mouseX}
            onClick={onOpenCalendar}
          />
        </div>

        {/* Safari */}
        <div>
          <DockItem
            name="Safari"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMyU_UpA41LcZgCx2sSqHF8pEYcMaP7rFzjxBFbedV6KNVBkJEDES8So9&s=10"
            mouseX={mouseX}
            onClick={onOpenSafari}
          />
        </div>

        {/* Music */}
        <div className="scale-110">
          <DockItem
            name="Music"
            icon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/3840px-Apple_Music_icon.svg.png"
            mouseX={mouseX}
            onClick={onOpenSpotify}
          />
        </div>

        {/* System Settings */}
        <div className="scale-120">
          <DockItem
            name="System Settings"
            icon="https://cdn.iconscout.com/icon/free/png-256/free-apple-settings-icon-svg-download-png-493162.png?f=webp"
            mouseX={mouseX}
            onClick={onOpenSetting}
          />
        </div>

        {/* GitHub */}
        <div className="scale-110">
          <DockItem
            name="GitHub"
            icon="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png"
            mouseX={mouseX}
            onClick={onOpenGithub}
          />
        </div>

        {/* LinkedIn */}
        <div>
          <DockItem
            name="LinkedIn"
            icon="https://api.iconify.design/devicon:linkedin.svg"
            mouseX={mouseX}
            onClick={onOpenLinkedIn}
          />
        </div>

        {/* App Store */}
        <div>
          <DockItem
            name="App Store"
            icon="https://api.iconify.design/logos:apple-app-store.svg"
            mouseX={mouseX}
          />
        </div>

        {/* VS Code */}
        <div>
          <DockItem
            name="VS Code"
            icon="https://api.iconify.design/logos:visual-studio-code.svg"
            mouseX={mouseX}
            onClick={onOpenVscode}
          />
        </div>

        {/* Calculator - Connected */}
        <div>
          <DockItem
            name="Calculator"
            icon="https://help.apple.com/assets/67DB4A443E933AA73E0B736E/67DB4A441BBBD795C80FED6E/en_US/d7683090881be82d88efa4ac1d3aec74.png"
            mouseX={mouseX}
            onClick={onOpenCalculator}
          />
        </div>

        {/* Notes */}
        <div>
          <DockItem
            name="Notes"
            icon="https://upload.wikimedia.org/wikipedia/commons/8/82/Apple_Notes_%28macOS_Big_Sur%29.png"
            mouseX={mouseX}
            onClick={onOpenNodepad}
          />
