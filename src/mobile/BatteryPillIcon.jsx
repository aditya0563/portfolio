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
              isCharging || clampedLevel <= 20
                ? "text-white"
                : clampedLevel > 50
                ? "text-black mix-blend-difference"
                : "text-white"
            }`}
          >
            {clampedLevel}
          </span>

          {isCharging && (
            <svg
              className="w-2 h-2.5 text-white fill-current drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)] -ml-[0.5px]"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h7v8l10-12h-7z" />
            </svg>
          )}
        </div>
      </div>

      {/* Battery Cap / Nipple */}
      <div
        className={`w-[1.5px] h-[4px] rounded-r-[1px] transition-colors duration-300 ${getCapColor()}`}
      />
    </div>
  );
};

// --- FLASHLIGHT ICON ---
export const FlashlightIcon = () => (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 2h6a1 1 0 011 1v3.25l-2.5 3.75V21a1 1 0 01-1 1h-1a1 1 0 01-1-1v-11L8 6.25V3a1 1 0 011-1zm3 1.5H10.5v1.5H12V3.5z" />
  </svg>
);

// --- CAMERA LOCK ICON ---
export const CameraLockIcon = () => (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path
      fillRule="evenodd"
      d="M4 7a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-2.172a2 2 0 01-1.414-.586l-.828-.828A2 2 0 0014.172 5H9.828a2 2 0 01-1.414.586l-.828.828A2 2 0 016.172 7H4zm8 10a5 5 0 100-10 5 5 0 000 10z"
      clipRule="evenodd"
    />
  </svg>
);