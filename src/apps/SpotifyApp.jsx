import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Search,
  Home,
  Library,
  Music,
  Clock,
  ListMusic,
  Wifi,
  WifiOff,
} from "lucide-react";

// ==========================================
// 🔑 SPOTIFY DEVELOPER CONFIGURATION
// ==========================================
const SPOTIFY_CLIENT_ID = "b28072303b8748a89aff5309d06e4f25";
const SPOTIFY_CLIENT_SECRET = "3a5ea3015b1342f598bf61afa42e3fbe";
const DEFAULT_PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M"; // Today's Top Hits

// Reliable Public Streams
const WORKING_AUDIO_FALLBACKS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
];

// Fallback Local/Remote Playlist
const FALLBACK_PLAYLIST = [
  {
    id: "fallback-1",
    title: "Apex Predator",
    artist: "Synthwave Engine",
    album: "M4 Sessions",
    duration: "3:45",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fallback-2",
    title: "Cyberpunk Alley",
    artist: "Night Drive",
    album: "Neon Horizons",
    duration: "2:58",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fallback-3",
    title: "Async & Await Flow",
    artist: "Full-Stack Beats",
    album: "Code & Coffee",
    duration: "4:12",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  },
];

export default function SpotifyApp() {
  const [playlist, setPlaylist] = useState(FALLBACK_PLAYLIST);
  const [playlistTitle, setPlaylistTitle] = useState("Featured Playlist");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [likedTracks, setLikedTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);

  const audioRef = useRef(null);

  // Fetch Spotify Live Playlist via Web API
  useEffect(() => {
    async function fetchLivePlaylist() {
      if (!SPOTIFY_CLIENT_ID || SPOTIFY_CLIENT_ID === "YOUR_CLIENT_ID_HERE") {
        return;
      }

      try {
        setLoading(true);

        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
          },
          body: "grant_type=client_credentials",
        });

        if (!tokenRes.ok) throw new Error("Auth failed");
        const tokenData = await tokenRes.json();
        const token = tokenData.access_token;

        const res = await fetch(
          `https://api.spotify.com/v1/playlists/${DEFAULT_PLAYLIST_ID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();

        setPlaylistTitle(data.name || "Spotify Playlist");

        const liveTracks = data.tracks.items
          .filter((item) => item && item.track)
          .map((item, index) => {
            const track = item.track;
            const mins = Math.floor(track.duration_ms / 60000);
            const secs = String(
              Math.floor((track.duration_ms % 60000) / 1000)
            ).padStart(2, "0");

            const validAudioSrc =
              track.preview_url ||
              WORKING_AUDIO_FALLBACKS[index % WORKING_AUDIO_FALLBACKS.length];

            return {
              id: track.id,
              title: track.name,
              artist: track.artists.map((a) => a.name).join(", "),
              album: track.album?.name || "Single",
              duration: `${mins}:${secs}`,
              src: validAudioSrc,
              cover: track.album?.images[0]?.url || "",
            };
          });

        if (liveTracks.length > 0) {
          setPlaylist(liveTracks);
          setIsLive(true);
        }
      } catch (err) {
        console.warn(
          "Spotify API Error. Falling back to static tracks:",
          err.message
        );
      } finally {
        setLoading(false);
      }
    }

    fetchLivePlaylist();
  }, []);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Sync Audio Play state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((e) => {
        console.warn("Playback prevented or aborted:", e.message);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handleEnded = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handleError = (e) => {
    console.warn("Audio load error, skipping to next track:", e);
    handleEnded();
  };

  const togglePlay = (index = currentTrackIndex) => {
    if (index === currentTrackIndex) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex(
      (prev) => (prev - 1 + playlist.length) % playlist.length
    );
    setIsPlaying(true);
  };

  const toggleLike = (trackId, e) => {
    e.stopPropagation();
    setLikedTracks((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  const filteredTracks = useMemo(() => {
    return playlist.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [playlist, searchQuery]);

  return (
    <div className="w-full h-full bg-[#121212] text-white flex flex-col font-sans select-none overflow-hidden relative">
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        onEnded={handleEnded}
        onError={handleError}
        preload="auto"
      />

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex overflow-hidden relative pt-10 md:pt-0">
        
        {/* SIDEBAR NAVIGATION (Desktop/Laptop Only) */}
        <div className="hidden md:flex w-56 bg-black p-4 flex-col gap-6 shrink-0 border-r border-white/5">
          <div className="flex items-center gap-2 text-green-500 font-bold text-lg tracking-tight px-2">
            <Music className="w-6 h-6 fill-green-500 text-black" />
            <span>Spotify</span>
          </div>

          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-3 text-xs font-semibold text-white bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
              <Home className="w-4 h-4 text-green-500" /> Home
            </button>
            <button className="flex items-center gap-3 text-xs font-semibold text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition-colors cursor-pointer">
              <Search className="w-4 h-4" /> Search
            </button>
            <button className="flex items-center gap-3 text-xs font-semibold text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition-colors cursor-pointer">
              <Library className="w-4 h-4" /> Your Library
            </button>
          </div>

          <div className="h-px bg-white/10 my-1" />

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3">
              Playlists
            </span>
            <button className="flex items-center gap-3 text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 transition-colors text-left truncate cursor-pointer">
              <ListMusic className="w-4 h-4 text-green-500 shrink-0" />
              <span className="truncate">{playlistTitle}</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 bg-gradient-to-b from-[#222222] via-[#121212] to-[#121212] overflow-y-auto flex flex-col p-3 md:p-6 gap-4 md:gap-6">
          
          {/* TOP BAR - pl-11 on mobile pushes search bar right of the parent back button */}
          <div className="flex items-center gap-2 md:gap-3 justify-between w-full pl-11 md:pl-0">
            
            {/* Search Input - Compact on mobile */}
            <div className="bg-black/40 border border-white/10 rounded-full px-3 h-8 md:h-10 flex items-center gap-2 flex-1 max-w-xs backdrop-blur-md">
              <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="Search tracks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
              />
            </div>

            {/* Mode Indicator Badge */}
            <div className="shrink-0">
              {isLive ? (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[10px]">
                  <Wifi className="w-3 h-3" /> API
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-mono text-[10px]">
                  <WifiOff className="w-3 h-3" /> Static
                </span>
              )}
            </div>
          </div>

          {/* HERO BANNER */}
          {currentTrack && (
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-green-900/40 via-emerald-950/20 to-transparent border border-white/10 p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-end gap-4 md:gap-6 shadow-2xl">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl object-cover shadow-2xl border border-white/10 shrink-0 bg-zinc-800"
              />
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 md:gap-2 w-full min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                  Now Playing
                </span>
                <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight line-clamp-1 w-full">
                  {currentTrack.title}
                </h1>
                <p className="text-xs text-zinc-400 truncate w-full">
                  {currentTrack.artist} • {currentTrack.album}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => togglePlay(currentTrackIndex)}
                    className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-black" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-black" /> Play
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TRACK LIST TABLE */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {playlistTitle}
            </h3>

            <div className="flex flex-col">
              {filteredTracks.map((track) => {
                const actualIndex = playlist.findIndex((s) => s.id === track.id);
                const isSelected = currentTrackIndex === actualIndex;
                const isLiked = likedTracks.includes(track.id);

                return (
                  <div
                    key={track.id}
                    onClick={() => togglePlay(actualIndex)}
                    className={`group flex items-center justify-between p-2 md:p-2.5 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white/10 border border-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 md:gap-4 min-w-0">
                      <span className="text-xs font-mono text-zinc-500 w-4 text-center shrink-0 hidden sm:inline-block">
                        {isSelected && isPlaying ? (
                          <div className="flex items-end gap-0.5 h-3 justify-center">
                            <span className="w-0.5 h-full bg-green-500 animate-pulse" />
                            <span className="w-0.5 h-1/2 bg-green-500 animate-pulse" />
                            <span className="w-0.5 h-3/4 bg-green-500 animate-pulse" />
                          </div>
                        ) : (
                          actualIndex + 1
                        )}
                      </span>

                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-9 h-9 md:w-10 md:h-10 rounded object-cover shrink-0 bg-zinc-800"
                      />

                      <div className="flex flex-col truncate">
                        <span
                          className={`text-xs font-semibold truncate ${
                            isSelected ? "text-green-400" : "text-white"
                          }`}
                        >
                          {track.title}
                        </span>
                        <span className="text-[11px] text-zinc-400 truncate">
                          {track.artist}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6 shrink-0 ml-2">
                      <button
                        onClick={(e) => toggleLike(track.id, e)}
                        className="text-zinc-500 hover:text-green-400 transition-colors cursor-pointer p-1"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? "fill-green-500 text-green-500" : ""
                          }`}
                        />
                      </button>
                      <span className="text-xs font-mono text-zinc-500 hidden sm:flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {track.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM PLAYER BAR */}
      {currentTrack && (
        <div className="h-16 md:h-20 bg-[#181818] border-t border-white/10 px-3 md:px-4 flex items-center justify-between shrink-0 z-30">
          
          {/* Track Info */}
          <div className="flex items-center gap-2 md:gap-3 w-1/2 md:w-1/4 min-w-0">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-10 h-10 md:w-12 md:h-12 rounded object-cover border border-white/10 shrink-0 bg-zinc-800"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-white truncate">
                {currentTrack.title}
              </span>
              <span className="text-[10px] text-zinc-400 truncate">
                {currentTrack.artist}
              </span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-end md:justify-center gap-2 md:gap-4 w-1/2 md:w-2/4">
            <button
              onClick={handlePrev}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => togglePlay(currentTrackIndex)}
              className="p-2 bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-black" />
              ) : (
                <Play className="w-4 h-4 fill-black" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Volume Controls */}
          <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-zinc-400 hover:text-white cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 h-1 bg-zinc-600 accent-green-500 rounded-lg cursor-pointer"
            />
          </div>

        </div>
      )}

    </div>
  );
}