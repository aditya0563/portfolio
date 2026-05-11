import React from "react";
import { FlashlightIcon, CameraLockIcon } from "./BatteryPillIcon";

export default function LockScreen({ formattedDate, formattedTime, onUnlockSwipe }) {
  return (
    <div className="relative z-20 h-full flex flex-col justify-between pt-12 pb-2 px-6 select-none">
      {/* Date & Time Header */}
      <div className="flex flex-col items-center mt-3 w-full">
        <p className="text-[19px] font-semibold tracking-wide text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          {formattedDate}
        </p>

        <div className="relative w-full mt-2 px-3 py-1 rounded-[28px] flex justify-center items-center scale-y-150">
          <h1 className="text-[86px] font-bold leading-none tracking-normal font-serif text-white/80 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] filter backdrop-blur-[0.5px]">
            {formattedTime}
          </h1>
        </div>
      </div>

      {/* Quick Action Buttons & Bottom Indicator */}
