import React, { useState, useMemo } from "react";
import {
  Play,
  Plus,
  Check,
  Info,
  X,
  Volume2,
  VolumeX,
  Search,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

// Catalog Dataset
const FEATURED_HERO = {
  id: "hero-1",
  title: "BMW M4: Apex Predator",
  tagline: "Speed, precision, and pure engineering.",
  description:
    "Explore the engineering masterpiece behind high-performance track machines. From twin-turbo precision to sleek carbon fiber acoustics, experience raw performance.",
  backdrop: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80",
  rating: "TV-MA",
  match: "98% Match",
  year: "2026",
  duration: "1h 52m"
};

const CATEGORIES = [
  {
    id: "trending",
    title: "Trending Now",
    movies: [
      {
        id: "m1",
        title: "BMW M4 Competition",
        category: "Performance",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
        match: "98% Match",
        rating: "TV-MA"
      },
      {
        id: "m2",
        title: "Cyberpunk Night City",
        category: "Sci-Fi",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        match: "95% Match",
        rating: "TV-14"
      },
      {
        id: "m3",
        title: "The Code Architect",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        match: "99% Match",
        rating: "PG-13"
      },
      {
        id: "m4",
        title: "Engine Mechanics",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        match: "91% Match",
        rating: "TV-PG"
      }
    ]
  },
  {
    id: "tech-picks",
    title: "Tech & Logic Originals",
    movies: [
      {
        id: "m5",
        title: "Full-Stack Revolution",
        category: "Development",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        match: "97% Match",
        rating: "TV-MA"
      },
      {
        id: "m6",
        title: "Algorithm Mastery",
        category: "DSA",
        image: "https://images.unsplash.com/photo-1516116211223-48a122638e59?auto=format&fit=crop&w=800&q=80",
        match: "94% Match",
        rating: "TV-14"
      },
      {
        id: "m7",
        title: "Real-Time Socket Protocols",
        category: "Networking",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        match: "92% Match",
        rating: "PG-13"
      }
    ]
  }
];

export default function NetflixApp() {
  const [myList, setMyList] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null); // For detail preview modal
  const [isPlaying, setIsPlaying] = useState(false); // For video playback screen
  const [searchQuery, setSearchQuery] = useState("");
  const [isMuted, setIsMuted] = useState(true);

  // Toggle My List
  const toggleMyList = (movie, e) => {
    e?.stopPropagation();
    setMyList((prev) =>
      prev.some((item) => item.id === movie.id)
        ? prev.filter((item) => item.id !== movie.id)
        : [...prev, movie]
    );
  };

  const isInMyList = (id) => myList.some((item) => item.id === id);

  return (
    <div className="w-full h-full bg-[#141414] text-white flex flex-col font-sans select-none overflow-y-auto relative scrollbar-thin scrollbar-thumb-zinc-800">
      
      {/* 1. TOP NAVBAR */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-md">
        <div className="flex items-center gap-8">
          <span className="text-red-600 font-extrabold text-2xl tracking-tighter cursor-pointer drop-shadow-md">
            NETFLIX
          </span>
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-300">
            <button className="text-white font-bold hover:text-zinc-300 transition-colors">Home</button>
            <button className="hover:text-white transition-colors">Series</button>
            <button className="hover:text-white transition-colors">Films</button>
            <button className="hover:text-white transition-colors">New & Popular</button>
            <button className="hover:text-white transition-colors">
              My List {myList.length > 0 && `(${myList.length})`}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/60 border border-white/20 px-2.5 py-1 rounded-full">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Titles, people, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white outline-none placeholder-zinc-500 w-36"
            />
          </div>
        </div>
      </div>

      {/* 2. HERO FEATURED BANNER */}
      <div className="relative w-full h-[380px] -mt-14 overflow-hidden shrink-0">
        <img
          src={FEATURED_HERO.backdrop}
          alt={FEATURED_HERO.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

        {/* Hero Meta & Controls */}
        <div className="absolute bottom-8 left-8 max-w-lg flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">
            <span className="bg-red-600 text-white px-1 py-0.5 rounded-sm">N</span> ORIGINAL
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
            {FEATURED_HERO.title}
