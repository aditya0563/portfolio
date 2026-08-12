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

  // Local Database of Videos for mock searching
  const ALL_VIDEOS = [
    { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley", views: "1.5B views", time: "14 years ago" },
    { id: "L_LUpnjgPso", title: "Build and Deploy a Full Stack MERN Desktop Portfolio", channel: "Code Mastery", views: "245K views", time: "2 weeks ago" },
    { id: "3JZ_D3ELwOQ", title: "C++ Advanced Data Structures & Algorithms Roadmap", channel: "Tech Algo", views: "120K views", time: "1 month ago" },
    { id: "fJ9rUzIMcZQ", title: "BMW M4 Competition - Pure Engine Sound & Aesthetics", channel: "Auto Motion", views: "890K views", time: "3 months ago" },
    { id: "pkmAksHqU20", title: "The Next Generation of AI Models Explained", channel: "TechInsider", views: "1.2M views", time: "5 days ago" },
    { id: "jNQXAC9IVRw", title: "Me at the zoo", channel: "jawed", views: "305M views", time: "18 years ago" },
    { id: "VqgUkExPvLY", title: "Next.js 14 Crash Course", channel: "Web Dev Simplified", views: "450K views", time: "4 months ago" },
    { id: "KJwYBJOUIG0", title: "Sony A7IV vs Canon R6 Mark II", channel: "Camera Geek", views: "320K views", time: "1 month ago" },
    { id: "0e3GPea1Tyg", title: "Chill Lofi Beats to Study/Relax To", channel: "Lofi Girl", views: "50M views", time: "Live" },
    { id: "B4Yq21wWwI4", title: "How computers actually work", channel: "Computerphile", views: "2.1M views", time: "3 years ago" },
    { id: "yWgb2n70yE8", title: "Cyberpunk 2077 - Phantom Liberty Gameplay", channel: "Gaming HUB", views: "3.4M views", time: "6 months ago" },
    { id: "8dWL3wF_OMw", title: "Top 10 VS Code Extensions for Web Developers", channel: "Dev Tips", views: "500K views", time: "2 months ago" }
  ].map(v => ({ ...v, thumbnail: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` }));

  const [videos, setVideos] = useState(ALL_VIDEOS.slice(0, 4));

  // Local mock search engine integration
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSelectedVideo(null);

    try {
      // Simulate network request for realism
      await new Promise((resolve) => setTimeout(resolve, 800));

      const results = ALL_VIDEOS.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setVideos(results);
    } catch (err) {
      console.error("Failed to search videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetHome = () => {
    setSelectedVideo(null);
    setSearchQuery("");
    setVideos(ALL_VIDEOS.slice(0, 4));
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
          <button
            type="submit"
            className="absolute right-3 text-zinc-400 hover:text-white text-xs cursor-pointer p-1"
            title="Search"
          >
            <FaSearch />
          </button>
        </form>

        <div className="flex items-center gap-3 text-zinc-300">
          <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer">
            <FaBell className="text-sm" />
          </button>
          <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs">
            T
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-16 sm:w-48 bg-[#0f0f0f] border-r border-zinc-800/60 p-2 flex flex-col gap-1">
          <button 
            onClick={handleResetHome}
            className="flex items-center gap-4 px-3 py-2.5 rounded-xl bg-zinc-800 text-white text-xs font-semibold w-full text-left cursor-pointer"
          >
            <FaHome className="text-base text-red-500" />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-zinc-800/50 text-zinc-400 hover:text-white text-xs font-semibold w-full text-left transition-colors cursor-pointer">
            <FaCompass className="text-base" />
            <span className="hidden sm:inline">Explore</span>
          </button>
          <button className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-zinc-800/50 text-zinc-400 hover:text-white text-xs font-semibold w-full text-left transition-colors cursor-pointer">
            <FaHistory className="text-base" />
            <span className="hidden sm:inline">History</span>
          </button>
          <button className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-zinc-800/50 text-zinc-400 hover:text-white text-xs font-semibold w-full text-left transition-colors cursor-pointer">
            <FaThumbsUp className="text-base" />
            <span className="hidden sm:inline">Liked</span>
          </button>
        </div>

        {/* Video Viewport */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-none">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 text-xs gap-2">
              <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              Searching YouTube...
            </div>
          ) : selectedVideo ? (
            /* Active Video Player View */
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSelectedVideo(null)}
                className="self-start flex items-center gap-2 text-xs text-red-500 font-semibold hover:underline cursor-pointer mb-1"
              >
                <FaTimes /> Back to feeds
              </button>
              
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&enablejsapi=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-2">
                <h2 className="text-base font-bold text-white leading-snug">
                  {selectedVideo.title}
                </h2>
                <div className="flex items-center justify-between text-xs text-zinc-400 mt-2 pb-4 border-b border-zinc-800">
                  <div>
                    <span className="font-medium text-zinc-200">{selectedVideo.channel}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedVideo.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Video Grid Feed */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer flex flex-col gap-2 rounded-xl p-2 hover:bg-zinc-900/80 transition-all border border-transparent hover:border-zinc-800"
                >
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-zinc-800">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      {video.channel[0]}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xs font-semibold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                        {video.title}
                      </h3>
                      <span className="text-[11px] text-zinc-400 mt-1">
                        {video.channel}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {video.views} • {video.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}