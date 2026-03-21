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
