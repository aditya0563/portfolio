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
