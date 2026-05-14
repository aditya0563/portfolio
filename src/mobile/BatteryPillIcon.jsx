import React from "react";

// --- iOS SIGNAL BARS ICON ---
export const SignalBarsIcon = () => (
  <svg className="w-[17px] h-[11px] shrink-0" viewBox="0 0 17 11" fill="none">
    <rect x="0" y="7" width="3" h="4" rx="1" fill="#FFFFFF" />
    <rect x="4.5" y="4.5" width="3" h="6.5" rx="1" fill="#FFFFFF" />
    <rect x="9" y="2" width="3" h="9" rx="1" fill="#FFFFFF" />
    <rect x="13.5" y="0" width="3" h="11" rx="1" fill="#FFFFFF" fillOpacity="0.3" />
  </svg>
);

// --- iOS BATTERY PILL ICON ---
export const BatteryPillIcon = ({ level, isCharging }) => {
  // Clamp battery percentage level strictly between 0 and 100
  const clampedLevel = Math.min(Math.max(level, 0), 100);

  // Dynamic fill color logic
  const getFillColor = () => {
    if (isCharging) return "bg-[#34C759]"; // iOS Green
    if (clampedLevel <= 20) return "bg-[#FF3B30]"; // iOS Low Power Red
    return "bg-white";
  };

  // Battery cap indicator color
  const getCapColor = () => {
    if (isCharging) return "bg-[#34C759]";
    if (clampedLevel <= 20) return "bg-[#FF3B30]";
    return "bg-white/40";
  };

  return (
    <div className="flex items-center gap-[1.5px] shrink-0 select-none">
      {/* Outer Pill Container (Translucent track frame) */}
      <div className="relative w-[27px] h-[13px] rounded-[4.5px] p-[1px] flex items-center justify-start overflow-hidden bg-white/20 backdrop-blur-md transition-colors duration-300">
        
        {/* Inner Dynamic Progress Bar */}
        <div
          className={`h-full rounded-[2.5px] transition-all duration-300 ${getFillColor()}`}
          style={{ width: `${clampedLevel}%` }}
        />

        {/* Level Number & Lightning Bolt Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-[0.5px] px-0.5 pointer-events-none">
          <span
            className={`text-[8.5px] font-bold tracking-tight leading-none drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.4)] ${
