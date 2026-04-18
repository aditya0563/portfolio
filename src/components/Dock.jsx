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
        </div>

        {/* Netflix */}
        <div className="scale-110">
          <DockItem
            name="Netflix"
            icon="https://static.vecteezy.com/system/resources/previews/017/396/814/large_2x/netflix-mobile-application-logo-free-png.png"
            mouseX={mouseX}
            onClick={onOpenNetflix}
          />
        </div>

        {/* Photos */}
        <div className="scale-110">
          <DockItem
            name="Photos"
            icon="https://images.seeklogo.com/logo-png/36/2/apple-photos-logo-png_seeklogo-360372.png"
            mouseX={mouseX}
            onClick={onOpenPhoto}
          />
        </div>

        {/* Maps */}
        <div>
          <DockItem
            name="Maps"
            icon="https://upload.wikimedia.org/wikipedia/commons/2/21/Apple_Maps_iOS_26_icon.png"
            mouseX={mouseX}
            onClick={onOpenMap}
          />
        </div>

        {/* YouTube */}
        <div>
          <DockItem
            name="YouTube"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMtz0ivmcGty_qWadac5ado5rrgi-0aafS6jIRZ9KJVdQuGWcLXf-R8r0&s=10"
            mouseX={mouseX}
            onClick={onOpenYouTube}
          />
        </div>

        {/* Weather */}
        <div>
          <DockItem
            name="Weather"
            icon="https://upload.wikimedia.org/wikipedia/commons/e/e2/Weather_%28iOS_26%29.png"
            mouseX={mouseX}
            onClick={onOpenWeather}
          />
        </div>

        <div>
          <DockItem
            name="imessage"
            icon="https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg"
            mouseX={mouseX}
            onClick={onOpenImessage}
          />
        </div>

        {/* Separator before Trash */}
        <div className="w-[1px] h-9 bg-white/20 my-auto mx-0.5 self-center mt-3" />

        {/* Trash */}
        <div>
          <DockItem
            name="Trash"
            icon="https://images.icon-icons.com/270/PNG/512/Trash_Full_29942.png"
            mouseX={mouseX}
            onClick={onOpenBin}
          />
        </div>
      </motion.nav>
    </div>
  );
}

// Dynamic Apple Calendar Icon Component
function DynamicCalendarIcon() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNumber = date.getDate();

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-between overflow-hidden shadow-sm">
      {/* Red Banner */}
      <div className="w-full bg-[#FF3B30] h-[32%] flex items-center justify-center pt-0.5">
        <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-wider leading-none">
          {dayOfWeek}
        </span>
      </div>

      {/* Date Number */}
      <div className="flex-1 flex items-center justify-center pb-1">
        <span className="text-black font-semibold text-[22px] sm:text-[26px] tracking-tighter leading-none">
          {dayNumber}
        </span>
      </div>
    </div>
  );
}

// Individual Animated Icon Item Component
function DockItem({ name, icon, customIcon, mouseX, onClick }) {
  const ref = useRef(null);

  // Calculate distance between cursor and icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Smooth physics magnification
  const widthSync = useTransform(distance, [-180, 0, 180], [44, 82, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="relative aspect-square flex flex-col items-center justify-center group focus:outline-none cursor-pointer"
    >
      {/* iOS-styled Rounded Icon Wrapper */}
      <div className="w-full h-full rounded-[22%] overflow-hidden flex items-center justify-center shadow-md">
        {customIcon ? (
          customIcon
        ) : (
          <motion.img
            src={icon}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-100"
          />
        )}
      </div>

      {/* Glassmorphic Tooltip */}
      <span className="absolute -top-11 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium py-1 px-2.5 rounded-xl border border-white/10 whitespace-nowrap shadow-lg pointer-events-none -translate-y-1 group-hover:translate-y-0">
        {name}
      </span>
    </motion.button>
  );
}