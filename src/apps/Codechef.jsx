import React, { useState } from "react";
import { ChevronDown, ExternalLink, Clock } from "lucide-react";

export default function CodeChefApp() {
  const [activeTab, setActiveTab] = useState("CodeChef Rating");

  // CodeChef profile base URL
  const profileUrl = "https://www.codechef.com/users/bikash_09";

  // Heatmap generation (Last 6 Months grid)
  const days = ["Mon", "Wed", "Fri", "Sun"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <div className="w-full h-full bg-[#f8f9fa] text-zinc-800 font-sans overflow-y-auto select-none">
      
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-zinc-200 px-8 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a
            href="https://www.codechef.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-xl text-zinc-800 tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">👨‍🍳</span> CODECHEF
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a
              href="https://www.codechef.com/practice"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              Courses <ChevronDown className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.codechef.com/practice"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              Practice
            </a>
            <a
              href="https://www.codechef.com/contests"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              Compete
            </a>
            <a
              href="https://www.codechef.com/ide"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              Compiler
            </a>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <a
            href="https://www.codechef.com/pro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            👑 Upgrade to Pro
          </a>
          <a
            href="https://www.codechef.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline px-2"
          >
            Login
          </a>
          <a
            href="https://www.codechef.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors shadow-sm"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto py-6 px-4 flex flex-col gap-6">
        
        {/* Breadcrumb */}
        <div className="text-xs text-zinc-500">
          <a href="https://www.codechef.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">Home</a> » bikash_09
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: USER DETAILS & GRAPH (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* USER CARD & DETAILS */}
            <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm flex flex-col gap-6">
              
              {/* Profile Header */}
              <div className="flex items-start gap-4 pb-4 border-b border-zinc-200">
                <div className="w-16 h-16 rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80"
                    alt="bikash_09"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-zinc-800 hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    bikash_09 <ExternalLink className="w-4 h-4 text-zinc-400" />
                  </a>
                </div>
              </div>

              {/* User Metadata Table */}
              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-zinc-500">Username:</span>
                  <span className="col-span-2 font-medium flex items-center gap-1.5">
                    <span className="bg-green-700 text-white text-[10px] px-1 rounded font-bold">2★</span> 
                    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">bikash_09</a>
                  </span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="font-semibold text-zinc-500">Country:</span>
                  <span className="col-span-2 font-medium flex items-center gap-1.5">
                    <span>🇮🇳</span> India
                  </span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="font-semibold text-zinc-500">Student/Professional:</span>
                  <span className="col-span-2 font-medium text-zinc-700">Student</span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="font-semibold text-zinc-500">Institution:</span>
                  <span className="col-span-2 font-medium text-zinc-700">Om Dayal Groups Of Institution</span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="font-semibold text-zinc-500">CodeChef Pro Plan:</span>
                  <span className="col-span-2 font-medium text-zinc-700">
                    No Active Plan. <a href="https://www.codechef.com/pro" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Details</a>
                  </span>
                </div>
              </div>

              {/* HEATMAP SECTION */}
              <div className="pt-4 border-t border-zinc-200 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-base text-zinc-800">Submissions Heat Map</h2>
                  <select className="text-xs border border-zinc-300 rounded px-2 py-1 bg-white outline-none">
                    <option>Last 6 Months</option>
                    <option>Last 1 Year</option>
                  </select>
                </div>

                {/* Heatmap Grid */}
                <div className="flex flex-col gap-1 overflow-x-auto pb-2">
                  <div className="flex text-[10px] text-zinc-400 gap-[26px] pl-8">
                    {months.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col text-[10px] text-zinc-400 gap-1.5 pr-1">
                      {days.map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>

                    <div className="grid grid-rows-4 grid-flow-col gap-1">
                      {Array.from({ length: 112 }).map((_, i) => {
                        const level = i % 11 === 0 ? 3 : i % 7 === 0 ? 2 : i % 5 === 0 ? 1 : 0;
                        const colors = ["bg-zinc-200", "bg-green-300", "bg-green-500", "bg-green-600"];
                        return (
                          <div
                            key={i}
                            className={`w-2.5 h-2.5 rounded-sm ${colors[level]}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RATING GRAPH SECTION */}
            <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <h2 className="font-bold text-base text-zinc-800">Rating Graph</h2>
                <span className="text-xs text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded">
                  No. of Contests Participated: <strong>25</strong>
                </span>
              </div>

              {/* Interactive Tooltip Simulation */}
              <div className="relative border border-zinc-200 rounded-md p-4 bg-gradient-to-b from-zinc-50 to-white flex flex-col gap-4 overflow-hidden">
                <div className="flex items-center gap-4 bg-white border border-zinc-200 shadow-md p-3 rounded-md w-fit">
                  <div className="bg-green-700 text-white font-bold px-3 py-2 rounded text-center">
                    <span className="text-sm border-b border-white/20 block pb-0.5">1537 (-2)</span>
                    <span className="text-[10px] font-normal block pt-0.5">Rating</span>
                  </div>
                  <div className="text-xs">
                    <a href="https://www.codechef.com/START241" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 block hover:underline">
                      Starters 241 (Rated)
                    </a>
                    <span className="text-zinc-400 text-[10px] block">(2026-06-03 22:00:04)</span>
                    <span className="text-zinc-600 text-[11px] block mt-0.5">
                      Global Rank: <strong>1456</strong>
                    </span>
                  </div>
                </div>

                {/* SVG Visual Graph Line */}
                <div className="h-44 w-full relative pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                    <rect x="0" y="0" width="500" height="40" fill="#dcfce7" opacity="0.5" />
                    <rect x="0" y="40" width="500" height="70" fill="#f3f4f6" opacity="0.8" />
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#93c5fd" strokeDasharray="3 3" />
                    <line x1="0" y1="110" x2="500" y2="110" stroke="#d1d5db" strokeDasharray="3 3" />

                    <path
                      d="M 10 130 L 40 100 L 70 85 L 100 85 L 130 80 L 160 70 L 190 60 L 220 60 L 250 55 L 280 50 L 310 42 L 340 30 L 370 25 L 400 18 L 430 10"
                      fill="none"
                      stroke="#15803d"
