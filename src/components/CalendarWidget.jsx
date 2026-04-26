import React from "react";

export default function CalendarWidget({ onOpenCalender }) {
  const now = new Date();

  const month = now.toLocaleDateString("en-US", {
    month: "long",
  });

  const day = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const date = now.getDate();

  return (
    <div
      onClick={onOpenCalender}
      className="w-full h-full flex flex-col items-center justify-center select-none cursor-pointer group transition-transform duration-200 active:scale-95"
      title="Click to open Calendar"
    >
      {/* Month */}
      <p className="text-sm font-bold text-red-500 uppercase tracking-wider group-hover:text-red-400 transition-colors">
        {month}
      </p>

      {/* Date */}
      <h1
        className="
          text-7xl
          leading-none
          text-white
          font-normal
          tracking-tighter
          mb-3
          mr-3
          text-center
          group-hover:scale-105
          transition-transform
        "
      >
        {date}
      </h1>

      {/* Weekday */}
      <p className="text-xs font-bold text-white/70 uppercase tracking-widest group-hover:text-white transition-colors">
        {day}
      </p>
    </div>
  );
}