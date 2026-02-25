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
          </h1>
          <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
            {FEATURED_HERO.description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsPlaying(true)}
              className="px-5 py-2 bg-white text-black hover:bg-zinc-200 transition-all rounded font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <Play className="w-4 h-4 fill-black" /> Play
            </button>
            <button
              onClick={() => setActiveMovie(FEATURED_HERO)}
              className="px-4 py-2 bg-zinc-600/70 hover:bg-zinc-600 text-white transition-all rounded font-bold text-xs flex items-center gap-2 backdrop-blur-md"
            >
              <Info className="w-4 h-4" /> More Info
            </button>
          </div>
        </div>

        {/* Mute Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 right-8 p-2 rounded-full border border-white/30 bg-black/40 hover:bg-black/70 transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 3. CATEGORY CAROUSEL ROWS */}
      <div className="p-8 flex flex-col gap-8 -mt-6 z-20">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-zinc-200 hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              {category.title} <ChevronRight className="w-4 h-4 text-red-600" />
            </h3>

            {/* Horizontal Scroll Grid */}
            <div className="grid grid-cols-4 gap-3">
              {category.movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setActiveMovie(movie)}
                  className="group relative aspect-video rounded-md overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer hover:scale-105 hover:z-30 transition-all duration-300 shadow-xl"
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPlaying(true);
                          }}
                          className="p-1.5 bg-white text-black rounded-full hover:scale-110 transition-transform"
                        >
                          <Play className="w-3 h-3 fill-black" />
                        </button>
                        <button
                          onClick={(e) => toggleMyList(movie, e)}
                          className="p-1.5 border border-white/40 rounded-full hover:border-white transition-colors"
                        >
                          {isInMyList(movie.id) ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Plus className="w-3 h-3 text-white" />
                          )}
                        </button>
                      </div>
                      <span className="text-[10px] font-bold text-green-400">
                        {movie.match}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white truncate">
                      {movie.title}
                    </h4>
                    <span className="text-[9px] text-zinc-400 font-medium">
                      {movie.category} • {movie.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 4. DETAIL PREVIEW MODAL */}
      {activeMovie && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#181818] border border-white/10 rounded-xl overflow-hidden max-w-xl w-full shadow-2xl relative flex flex-col">
            <button
              onClick={() => setActiveMovie(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-video">
              <img
                src={activeMovie.backdrop || activeMovie.image}
                alt={activeMovie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="px-4 py-1.5 bg-white text-black font-bold text-xs rounded flex items-center gap-2 hover:bg-zinc-200"
                >
                  <Play className="w-3.5 h-3.5 fill-black" /> Play
                </button>
                <button
                  onClick={(e) => toggleMyList(activeMovie, e)}
                  className="p-1.5 border border-white/40 rounded-full hover:border-white"
                >
                  {isInMyList(activeMovie.id) ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-green-400">{activeMovie.match || "98% Match"}</span>
                <span className="border border-zinc-600 px-1 text-[10px] text-zinc-400">
                  {activeMovie.rating || "TV-MA"}
                </span>
                <span className="text-zinc-400">HD</span>
              </div>
              <h2 className="text-xl font-bold text-white">{activeMovie.title}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {activeMovie.description ||
                  "High quality showcase content built with MERN stack and React desktop OS architectures."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. VIDEO PLAYER OVERLAY */}
      {isPlaying && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 p-2 bg-zinc-800/80 hover:bg-zinc-700 rounded-full text-white z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Simulated Video Screen */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <h3 className="text-lg font-bold">Streaming Content...</h3>
            <p className="text-xs text-zinc-500">Demo video player active</p>
          </div>
        </div>
      )}

    </div>
  );
}