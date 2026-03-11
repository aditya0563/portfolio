import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  GraduationCap, 
  ChevronRight, 
  ChevronDown,
  Loader2, 
  ExternalLink,
  Flame,
  CheckCircle2,
  MessageSquare,
  FileText,
  ListOrdered,
  Sparkles,
  Info
} from "lucide-react";

import userAvatar from "../assets/profile-photo.jpeg"; 

export default function LeetCodeApp() {
  const username = "bikash_09";
  const leetCodeUrl = `https://leetcode.com/u/${username}/`;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recent");
  
  // Dynamic streak calculation: Base streak of 514 on anchor date (July 28, 2026)
  const [streak, setStreak] = useState(514);

  useEffect(() => {
    const baseStreak = 514;
    const anchorDate = new Date("2026-07-28T00:00:00Z");
    const now = new Date();
    
    const diffInTime = now.getTime() - anchorDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    
    if (diffInDays > 0) {
      setStreak(baseStreak + diffInDays);
    }
  }, []);

  useEffect(() => {
    async function fetchLeetCodeStats() {
      try {
        setLoading(true);
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.status === "success") {
          setStats(data);
        }
      } catch (err) {
        console.warn("Failed to fetch live LeetCode stats, falling back to local defaults:", err.message);
        setStats(null);
      } finally {
        setLoading(false);
      }
    }

    fetchLeetCodeStats();
  }, [username]);

  const easySolved = stats?.easySolved ?? 428;
  const mediumSolved = stats?.mediumSolved ?? 429;
  const hardSolved = stats?.hardSolved ?? 126;
  const totalSolved = stats ? stats.easySolved + stats.mediumSolved + stats.hardSolved : (easySolved + mediumSolved + hardSolved);

  // Months grouped with week column counts for precise month-by-month grid separation
  const monthlyData = [
    { name: "Aug", weeks: 4 },
    { name: "Sep", weeks: 4 },
    { name: "Oct", weeks: 5 },
    { name: "Nov", weeks: 4 },
    { name: "Dec", weeks: 4 },
    { name: "Jan", weeks: 5 },
    { name: "Feb", weeks: 4 },
    { name: "Mar", weeks: 4 },
    { name: "Apr", weeks: 4 },
    { name: "May", weeks: 5 },
    { name: "Jun", weeks: 4 },
    { name: "Jul", weeks: 5 }
  ];

  // Helper function returning active green shades only
  const getActiveGreenShade = (i) => {
    const shades = [
      "bg-[#0e4429]", // Dark green
      "bg-[#006d32]", // Medium-dark green
      "bg-[#26a641]", // LeetCode bright green
      "bg-[#39d353]"  // Bright light green
    ];
    return shades[i % shades.length];
  };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a] text-[#c7c7c7] font-sans text-xs selection:bg-amber-500/30 selection:text-amber-200 overflow-y-auto">
      
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-20 bg-[#1a1a1a]/95 backdrop-blur border-b border-[#282828] px-4 sm:px-6 pt-12 pb-2.5 sm:py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center cursor-pointer select-none tracking-tight font-bold text-base sm:text-lg pl-10 sm:pl-0">
            <span className="text-[#ffa116]">Leet</span>
            <span className="text-white">Code</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-5 text-zinc-400 font-medium text-xs">
            <span className="hover:text-white cursor-pointer transition-colors">Problems</span>
            <span className="hover:text-white cursor-pointer transition-colors">Contest</span>
            <span className="hover:text-white cursor-pointer transition-colors">Discuss</span>
            <span className="hover:text-white cursor-pointer transition-colors">Interview</span>
            <span className="text-[#ffa116] font-semibold cursor-pointer">Store</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#282828] px-2.5 py-1 rounded-full text-amber-500 text-xs font-medium border border-zinc-700/50 shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{streak}</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden border border-zinc-600 flex-shrink-0 cursor-pointer">
            <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* ================= FLOATING GO TO LEETCODE BUTTON ================= */}
      <a
        href={leetCodeUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-[#ffa116] hover:bg-[#ffb84d] text-black font-bold px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer text-xs"
      >
        <span>Go to LeetCode</span>
        <ExternalLink className="w-4 h-4" />
      </a>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-[1400px] mx-auto pl-4 pr-3 py-3 sm:px-6 sm:py-6">
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#ffa116]" />
            <p className="text-xs">Loading profile statistics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-[#262626] border border-[#333] rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-md">
                <div className="flex gap-3.5 items-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-700 border border-zinc-600 flex-shrink-0 shadow-inner">
                    <img src={userAvatar} alt="Bikash Dalapati" className="w-full h-full object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h1 className="text-base sm:text-lg font-bold text-white leading-tight truncate">Bikash Dalapati</h1>
                      <Sparkles className="w-3.5 h-3.5 text-[#ffa116] flex-shrink-0" />
                    </div>
                    <p className="text-zinc-400 text-xs truncate mt-0.5">{username}</p>
                    <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded bg-[#1f1f1f] border border-zinc-700 text-zinc-300 text-[11px] font-medium">
                      Rank <span className="text-white font-bold ml-1">34,364</span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-300 italic text-xs bg-[#1f1f1f] p-2.5 rounded-lg border border-[#333]">
                  "Be the GameChanger !!!..."
                </p>

                <div className="flex items-center gap-4 text-zinc-400 text-xs">
                  <span><strong className="text-white">1</strong> Following</span>
                  <span><strong className="text-white">1</strong> Followers</span>
                </div>

                <div className="border-t border-[#333] pt-3.5 flex flex-col gap-2.5 text-zinc-400 text-xs">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                    <span className="text-zinc-300">India</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                    <span className="text-zinc-300 truncate">OmDayal Group of Institutions</span>
                  </div>

                  <a href="https://github.com/bikashdalapati-09" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#ffa116] transition-colors truncate">
                    <svg className="w-4 h-4 text-zinc-500 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span className="truncate">bikashdalapati-09</span>
                  </a>

                  <a href="https://x.com/bikashdalapati" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#ffa116] transition-colors truncate">
                    <svg className="w-4 h-4 text-zinc-500 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="truncate">bikashdalapati</span>
                  </a>

                  <a href="https://linkedin.com/in/bikashdalapati09" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#ffa116] transition-colors truncate">
                    <svg className="w-4 h-4 text-zinc-500 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span className="truncate">bikashdalapati09</span>
                  </a>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["c++", "dsa", "mern", "oops", "sql"].map((skill) => (
                    <span key={skill} className="bg-[#1f1f1f] border border-zinc-700/50 text-zinc-300 text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#262626] border border-[#333] rounded-xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-md">
                <h3 className="font-semibold text-white text-xs tracking-wide">Community Stats</h3>
                <div className="flex flex-col gap-2.5 text-zinc-400 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">👁️ Views</span>
                    <span className="text-white font-medium">9 <span className="text-[10px] text-zinc-500 font-normal block sm:inline">Last week 0</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">☑️ Solution</span>
                    <span className="text-white font-medium">1 <span className="text-[10px] text-zinc-500 font-normal block sm:inline">Last week 0</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">💬 Discuss</span>
                    <span className="text-white font-medium">0 <span className="text-[10px] text-zinc-500 font-normal block sm:inline">Last week 0</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7 bg-[#262626] border border-[#333] rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-md">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Contest Rating</p>
                      <p className="text-lg sm:text-xl font-bold text-white mt-0.5">1,532</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Global Ranking</p>
                      <p className="text-xs font-semibold text-white mt-1">314,988 <span className="text-zinc-500 font-normal text-[10px]">/876,708</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Attended</p>
                      <p className="text-xs font-semibold text-white mt-1">28</p>
                    </div>
                  </div>

                  <div className="w-full h-16 mt-2 flex items-end justify-between border-b border-zinc-700/40 pb-1 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                      <div className="w-full h-[1px] bg-[#ffa116]"></div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">2024</span>
                    <div className="flex items-center gap-1 bg-[#1a1a1a] border border-zinc-700 px-2 py-0.5 rounded text-[10px] text-[#ffa116] font-bold z-10 shadow">
                      1,608
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">2026</span>
                  </div>
                </div>

                <div className="sm:col-span-5 bg-[#262626] border border-[#333] rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-md">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Top</p>
                    <p className="text-2xl font-bold text-white mt-0.5">36.35%</p>
                  </div>
                  <div className="flex items-end gap-1 h-12 pt-1">
                    {[20, 35, 45, 80, 100, 65, 40, 30, 20, 15, 10].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={`flex-1 rounded-t-xs transition-all ${i === 4 ? "bg-[#ffa116]" : "bg-zinc-700/60"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7 bg-[#262626] border border-[#333] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
                  <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-zinc-800"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#ffa116]"
                        strokeDasharray={`${Math.min(100, Math.round((totalSolved / 4003) * 100))}, 100`}
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>

                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-xl sm:text-2xl font-bold text-white leading-none">
                        {totalSolved}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium mt-1 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Solved
                      </span>
                      <span className="text-[9px] text-zinc-500 mt-0.5">
                        21 Attempting
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 w-full">
                    <div className="bg-[#1f1f1f] px-3 py-2 rounded-lg border border-[#333] flex justify-between items-center">
                      <span className="text-emerald-400 font-semibold text-xs">Easy</span>
                      <span className="text-white font-bold text-xs">{easySolved}<span className="text-zinc-500 font-normal">/956</span></span>
                    </div>
                    <div className="bg-[#1f1f1f] px-3 py-2 rounded-lg border border-[#333] flex justify-between items-center">
                      <span className="text-amber-400 font-semibold text-xs">Med.</span>
                      <span className="text-white font-bold text-xs">{mediumSolved}<span className="text-zinc-500 font-normal">/2091</span></span>
                    </div>
                    <div className="bg-[#1f1f1f] px-3 py-2 rounded-lg border border-[#333] flex justify-between items-center">
                      <span className="text-rose-400 font-semibold text-xs">Hard</span>
                      <span className="text-white font-bold text-xs">{hardSolved}<span className="text-zinc-500 font-normal">/956</span></span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-5 bg-[#262626] border border-[#333] rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Badges</p>
                      <p className="text-xl font-bold text-white mt-0.5">27</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 cursor-pointer hover:text-white transition-colors" />
                  </div>

                  <div className="flex items-center justify-around my-1 gap-2">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-md flex-shrink-0 flex items-center justify-center text-[10px] font-extrabold text-black">
                      500d
                    </div>
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md flex-shrink-0 flex items-center justify-center text-[10px] font-extrabold text-black">
                      100d
                    </div>
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 p-0.5 shadow-md flex-shrink-0 flex items-center justify-center text-[10px] font-extrabold text-white">
                      2026
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-zinc-400">Most Recent Badge</p>
                    <p className="text-xs font-semibold text-white mt-0.5">500 Days Badge</p>
                  </div>
                </div>
              </div>

              {/* Row 3: Fully Green Heatmap separated by Months */}
              <div className="bg-[#262626] border border-[#333] rounded-xl p-4 sm:p-5 flex flex-col gap-3 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight">921</span>
                    <span className="text-zinc-400 font-medium text-xs">submissions in the past one year</span>
                    <Info className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-[11px] sm:text-xs">
                    <div>
                      Total active days: <span className="text-white font-semibold">365</span>
                    </div>
                    <div>
                      Max streak: <span className="text-white font-semibold">365</span>
                    </div>

                    <button className="flex items-center gap-1 bg-[#1f1f1f] border border-zinc-700 hover:border-zinc-500 text-zinc-200 px-2.5 py-1 rounded transition-colors cursor-pointer font-medium text-xs">
                      <span>Current</span>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  </div>
                </div>

                {/* Heatmap Grid Separated by Months */}
                <div className="w-full overflow-x-auto pb-1 pt-2">
                  <div className="flex items-start gap-4 min-w-[780px]">
                    {monthlyData.map((month, monthIdx) => (
                      <div key={monthIdx} className="flex flex-col items-center gap-2">
                        
                        {/* Month Grid (All Boxes Green) */}
                        <div className="grid grid-flow-col grid-rows-7 gap-1">
                          {Array.from({ length: month.weeks * 7 }).map((_, boxIdx) => (
                            <div
                              key={boxIdx}
                              className={`w-3 h-3 rounded-[2px] ${getActiveGreenShade(monthIdx * 7 + boxIdx)} transition-all hover:scale-110 hover:ring-1 hover:ring-white/80 cursor-pointer`}
                            />
                          ))}
                        </div>

                        {/* Month Name */}
                        <span className="text-[11px] text-zinc-400 font-medium hover:text-zinc-200 transition-colors select-none">
                          {month.name}
                        </span>

                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Activity Tabs Bar */}
              <div className="bg-[#262626] border border-[#333] rounded-xl p-4 flex flex-col gap-4 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#333] pb-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setActiveTab("recent")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'recent' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ffa116]" />
                      <span>Recent AC</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("list")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'list' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                      <span>List</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("solutions")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'solutions' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Solutions</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("discuss")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'discuss' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Discuss</span>
                    </button>
                  </div>

                  <span className="text-zinc-400 text-xs hover:text-white cursor-pointer transition-colors font-medium">
                    View all submissions &gt;
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    { title: "Two Sum", difficulty: "Easy", time: "1 day ago", lang: "C++" },
                    { title: "Add Two Numbers", difficulty: "Medium", time: "2 days ago", lang: "C++" },
                    { title: "Median of Two Sorted Arrays", difficulty: "Hard", time: "3 days ago", lang: "C++" }
                  ].map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#1f1f1f] border border-[#333] hover:border-zinc-600 transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-zinc-200 font-medium truncate">{sub.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] flex-shrink-0">
                        <span className={`px-2 py-0.5 rounded font-medium ${sub.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-950/40' : sub.difficulty === 'Medium' ? 'text-amber-400 bg-amber-950/40' : 'text-rose-400 bg-rose-950/40'}`}>
                          {sub.difficulty}
                        </span>
                        <span className="text-zinc-500 hidden sm:inline">{sub.lang}</span>
                        <span className="text-zinc-400">{sub.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        )}
      </main>

    </div>
  );
}