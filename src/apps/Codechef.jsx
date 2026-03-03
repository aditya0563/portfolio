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
                      strokeWidth="2.5"
                    />

                    {[
                      [10, 130], [40, 100], [70, 85], [100, 85], [130, 80],
                      [160, 70], [190, 60], [220, 60], [250, 55], [280, 50],
                      [310, 42], [340, 30], [370, 25], [400, 18], [430, 10]
                    ].map(([x, y], idx) => (
                      <circle key={idx} cx={x} cy={y} r="3" fill="#000" />
                    ))}
                  </svg>
                </div>

                <div className="flex justify-between text-[11px] text-zinc-400 font-mono px-2 pt-2 border-t border-zinc-100">
                  <span>2025</span>
                  <span>2026</span>
                  <span>2026</span>
                  <span>2026</span>
                </div>
              </div>

              <div className="text-center">
                <a href="https://www.codechef.com/ratings/info" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                  How the rating system works?
                </a>
              </div>
            </div>

            {/* LEARNING & PRACTICE PATHS */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm flex flex-col gap-2">
              <h3 className="font-bold text-sm text-zinc-800">Learning Paths (0)</h3>
            </div>
            <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm flex flex-col gap-2">
              <h3 className="font-bold text-sm text-zinc-800">Practice Paths (5)</h3>
            </div>

          </div>

          {/* RIGHT COLUMN: RATING CARD, SKILL TESTS & BADGES (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* RATING CARD */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden">
              
              {/* Rating Tabs */}
              <div className="flex border-b border-zinc-200 bg-zinc-50 p-1.5 gap-1 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("CodeChef Rating")}
                  className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${
                    activeTab === "CodeChef Rating"
                      ? "bg-white text-zinc-800 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  CodeChef Rating
                </button>
                <button
                  onClick={() => setActiveTab("DSA Rating")}
                  className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${
                    activeTab === "DSA Rating"
                      ? "bg-white text-zinc-800 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  DSA Rating
                </button>
              </div>

              {/* Rating Numbers */}
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-zinc-800 tracking-tight">1537</span>
                <span className="text-xs text-zinc-500 font-medium mt-0.5">(Div 3)</span>

                <div className="flex items-center gap-1 my-2">
                  <span className="bg-green-700 text-white text-[10px] px-1 rounded font-bold">★</span>
                  <span className="bg-green-700 text-white text-[10px] px-1 rounded font-bold">★</span>
                </div>

                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline">
                  CodeChef Rating
                </a>
                <span className="text-[10px] text-zinc-400 mt-0.5">(Highest Rating 1539)</span>

                <div className="w-full grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-zinc-200 text-center">
                  <div>
                    <span className="text-xl font-bold text-blue-600 block">21589</span>
                    <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                      Global Rank
                    </span>
                  </div>
                  <div className="border-l border-zinc-200">
                    <span className="text-xl font-bold text-blue-600 block">20010</span>
                    <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                      Country Rank
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* SKILL TESTS */}
            <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-sm text-zinc-800 text-center">Skill tests</h3>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-zinc-200 flex items-center justify-center font-bold text-zinc-500 shrink-0">
                    3%
                  </div>
                  <div className="flex flex-col">
                    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline leading-snug">
                      Data structures and Algorithms in C test
                    </a>
                    <span className="text-[10px] text-zinc-400">Attempted on October 2025</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500 text-blue-600 flex items-center justify-center font-bold shrink-0">
                    97%
                  </div>
                  <div className="flex flex-col">
                    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline leading-snug">
                      C++ Skill test
                    </a>
                    <span className="text-[10px] text-zinc-400">Attempted on October 2025</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-400 text-blue-500 flex items-center justify-center font-bold shrink-0">
                    67%
                  </div>
                  <div className="flex flex-col">
                    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline leading-snug">
                      Skill-test: Operating systems
                    </a>
                    <span className="text-[10px] text-zinc-400">Attempted on December 2025</span>
                  </div>
                </div>
              </div>

              <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-semibold text-center mt-1">
                View skill tests
              </a>
            </div>

            {/* BADGES */}
            <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-sm text-zinc-800 text-center">Badges</h3>

              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-500 shrink-0 text-base">
                    🥈
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-700">Contest Contender - Silver Badge</span>
                    <span className="text-[10px] text-zinc-400">Received for participating in 25 Contests</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600 shrink-0 text-base">
                    🥉
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-700">Problem Solver - Bronze Badge</span>
                    <span className="text-[10px] text-zinc-400">Received for solving 50 Problems</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-300 flex items-center justify-center text-orange-500 shrink-0 text-base">
                    🔥
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-700">Daily Streak - Bronze Badge</span>
                    <span className="text-[10px] text-zinc-400">Received for maintaining a streak of 5 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PROMO BANNER */}
            <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 shadow-sm flex flex-col gap-3 relative overflow-hidden">
              <h4 className="font-bold text-base leading-tight">
                Master Data Structures and Algorithms
              </h4>
              <a href="https://www.codechef.com/practice" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold text-xs px-3 py-1.5 rounded w-fit hover:bg-blue-50 transition-colors">
                Start Roadmap ›
              </a>
            </div>

            {/* RECENT ACTIVITY TABLE */}
            <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-sm flex flex-col gap-3">
              <h3 className="font-bold text-sm text-zinc-800 text-center border-b border-zinc-200 pb-2">
                Recent Activity
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-500 font-semibold border-b border-zinc-200">
                      <th className="p-1.5">Time</th>
                      <th className="p-1.5">Problem</th>
                      <th className="p-1.5 text-center">Result</th>
                      <th className="p-1.5">Lang</th>
                      <th className="p-1.5 text-right">Solution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr>
                      <td className="p-1.5 text-zinc-400">
                        <Clock className="w-3 h-3 inline" />
                      </td>
                      <td className="p-1.5 font-semibold text-blue-600 hover:underline cursor-pointer">
                        <a href="https://www.codechef.com/problems/CHEFHQ" target="_blank" rel="noopener noreferrer">
                          CHEFHO...
                        </a>
                      </td>
                      <td className="p-1.5 text-center font-bold text-green-600">
                        ✓ <span className="text-[10px] font-normal">(100)</span>
                      </td>
                      <td className="p-1.5 font-mono text-zinc-600">C++</td>
                      <td className="p-1.5 text-right">
                        <a
                          href={profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold px-2.5 py-1 rounded transition-colors"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}