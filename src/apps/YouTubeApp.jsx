import React, { useState } from "react";
import { 
  FaSearch, 
  FaHome, 
  FaCompass, 
  FaHistory, 
  FaPlayCircle, 
  FaThumbsUp, 
  FaTimes, 
  FaBell 
} from "react-icons/fa";

export default function YouTubeApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Default initial feed videos
  const [videos, setVideos] = useState([
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
      channel: "Rick Astley",
      views: "1.5B views",
      time: "14 years ago",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    },
    {
      id: "L_LUpnjgPso",
      title: "Build and Deploy a Full Stack MERN Desktop Portfolio",
      channel: "Code Mastery",
      views: "245K views",
      time: "2 weeks ago",
      thumbnail: "https://img.youtube.com/vi/L_LUpnjgPso/hqdefault.jpg",
    },
    {
      id: "3JZ_D3ELwOQ",
      title: "C++ Advanced Data Structures & Algorithms Roadmap",
      channel: "Tech Algo",
      views: "120K views",
      time: "1 month ago",
      thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    },
    {
      id: "fJ9rUzIMcZQ",
      title: "BMW M4 Competition - Pure Engine Sound & Aesthetics",
      channel: "Auto Motion",
      views: "890K views",
      time: "3 months ago",
      thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg",
    },
  ]);

  // Real search engine integration
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSelectedVideo(null);

    try {
      // Fetch dynamic search results using an open API proxy
      const res = await fetch(
        `https://pipedapi.kavin.rocks/search?q=${encodeURIComponent(searchQuery)}&filter=all`
      );
      const data = await res.json();

      if (data && data.items) {
        const formattedResults = data.items
          .filter((item) => item.type === "stream")
          .map((item) => {
            const videoId = item.url.split("v=")[1] || item.url.replace("/watch?v=", "");
            return {
              id: videoId,
              title: item.title,
              channel: item.uploaderName || "YouTube Creator",
              views: `${(item.views / 1000).toFixed(0)}K views`,
              time: item.uploadedDate || "Recently",
              thumbnail: item.thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            };
          });

        if (formattedResults.length > 0) {
          setVideos(formattedResults);
        }
      }
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetHome = () => {
    setSelectedVideo(null);
    setSearchQuery("");
  };

  return (
    <div className="w-full h-full bg-[#0f0f0f] text-white flex flex-col font-sans select-none overflow-hidden">
      
      {/* Top Search Header */}
      <div className="px-4 py-3 bg-[#0f0f0f] border-b border-zinc-800 flex items-center justify-between gap-4">
        <div 
          onClick={handleResetHome}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="bg-red-600 text-white p-1.5 rounded-lg flex items-center justify-center">
            <FaPlayCircle className="text-lg" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">
            YouTube
          </span>
        </div>

        {/* Dynamic Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any song or video..."
            className="w-full bg-[#121212] border border-zinc-700 rounded-full py-1.5 pl-4 pr-10 text-xs text-zinc-200 focus:outline-none focus:border-red-500 transition-all font-sans"
          />
