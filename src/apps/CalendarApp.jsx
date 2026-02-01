import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch, FaPlus } from "react-icons/fa";

export default function CalendarApp() {
  // Real-world today's date reference
  const today = new Date();

  // Selected date state (defaults to today)
  const [selectedDate, setSelectedDate] = useState(today);

  // Active viewing month/year state
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Navigation handlers
  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleGoToToday = () => {
    const now = new Date();
    setSelectedDate(now);
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const handleSelectDay = (day) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
  };

  // Calendar Grid Logic
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white flex flex-col select-none font-sans overflow-hidden">
      
      {/* ==================== MOBILE VIEW (sm:hidden) ==================== */}
      {/* Increased top padding (pt-20) to push content safely below AppModal's floating back button */}
      <div className="flex flex-col flex-1 sm:hidden pt-20 pb-6 px-4">
        
        {/* Mobile Action Toolbar (Left side cleared for AppModal back button) */}
        <div className="flex items-center justify-end gap-5 pb-3 mb-2 border-b border-zinc-800/60">
          <button
            onClick={handleGoToToday}
            className="text-red-500 hover:text-red-400 text-sm font-semibold transition-colors cursor-pointer"
          >
            Today
          </button>
          <button className="text-red-500 hover:text-red-400 text-lg transition-colors cursor-pointer">
            <FaSearch />
          </button>
          <button className="text-red-500 hover:text-red-400 text-lg transition-colors cursor-pointer">
            <FaPlus />
          </button>
        </div>

        {/* Mobile Month & Year Header with Controls */}
        <div className="flex items-center justify-between my-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {monthNames[month]} <span className="text-zinc-400">{year}</span>
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="w-8 h-8 rounded-full bg-zinc-800/80 active:bg-zinc-700 flex items-center justify-center text-red-500 text-xs transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextMonth}
              className="w-8 h-8 rounded-full bg-zinc-800/80 active:bg-zinc-700 flex items-center justify-center text-red-500 text-xs transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Mobile Days Header */}
        <div className="grid grid-cols-7 text-center text-xs font-bold text-zinc-500 my-2 tracking-wider">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>

        {/* Mobile Days Grid */}
        <div className="grid grid-cols-7 gap-y-3 text-center text-base font-medium my-2">
          {daysArray.map((day, index) => {
            if (day === null) {
              return <div key={`mobile-empty-${index}`} />;
            }

            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            const isSelected =
              day === selectedDate.getDate() &&
              month === selectedDate.getMonth() &&
              year === selectedDate.getFullYear();

            return (
              <div key={`mobile-day-${day}`} className="flex items-center justify-center">
                <button
                  onClick={() => handleSelectDay(day)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-95 ${
                    isToday
                      ? "bg-red-500 text-white font-bold shadow-md shadow-red-500/40"
                      : isSelected
                      ? "bg-zinc-700 text-white font-semibold ring-2 ring-red-500/60"
                      : "hover:bg-zinc-800 text-zinc-200"
                  }`}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Selected Date Events / Footer Card */}
        <div className="mt-auto pt-6 border-t border-zinc-800/80">
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-400">Selected Date</p>
              <p className="text-sm font-semibold text-white mt-0.5">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-medium border border-red-500/20">
              No Events
            </span>
          </div>
        </div>

      </div>

      {/* ==================== DESKTOP / LAPTOP VIEW (hidden sm:flex) ==================== */}
      <div className="hidden sm:flex sm:flex-col flex-1">
        
        {/* Top Navigation & Action Toolbar */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-zinc-800/60">
          <button
            onClick={handleGoToToday}
            className="flex items-center gap-1 text-red-500 hover:text-red-400 text-sm font-semibold transition-colors cursor-pointer"
          >
            <FaChevronLeft className="text-xs" /> Home
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleGoToToday}
              className="text-red-500 hover:text-red-400 text-sm font-semibold transition-colors cursor-pointer"
            >
              Today
            </button>
            <button className="text-red-500 hover:text-red-400 text-base transition-colors cursor-pointer">
              <FaSearch />
            </button>
            <button className="text-red-500 hover:text-red-400 text-base transition-colors cursor-pointer">
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="p-5 flex flex-col flex-1 overflow-y-auto scrollbar-none">
          
          {/* Month & Year Header with Controls */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {monthNames[month]} {year}
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevMonth}
                className="w-7 h-7 rounded-full bg-zinc-800/80 hover:bg-zinc-700 flex items-center justify-center text-red-500 text-xs transition-colors cursor-pointer"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNextMonth}
                className="w-7 h-7 rounded-full bg-zinc-800/80 hover:bg-zinc-700 flex items-center justify-center text-red-500 text-xs transition-colors cursor-pointer"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-zinc-400 mb-4 tracking-wider">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>

          {/* Dynamic Days Grid */}
          <div className="grid grid-cols-7 gap-y-4 text-center text-sm font-medium">
            {daysArray.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />;
              }

              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              const isSelected =
                day === selectedDate.getDate() &&
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear();

              return (
                <div key={`day-${day}`} className="flex items-center justify-center">
                  <button
                    onClick={() => handleSelectDay(day)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                      isToday
                        ? "bg-red-500 text-white font-bold shadow-lg shadow-red-500/30"
                        : isSelected
                        ? "bg-zinc-700 text-white font-semibold ring-2 ring-red-500/50"
                        : "hover:bg-zinc-800 text-zinc-200"
                    }`}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}