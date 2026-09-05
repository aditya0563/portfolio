import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import {
  Search,
  Crosshair,
  MapPin,
  Coffee,
  Utensils,
  Fuel
} from "lucide-react";

// Fix default Leaflet icon paths in React
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// Helper component to programmatically pan/re-center map when location changes
function MapFlyTo({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 14, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapApp() {
  const ADITYA_LOCATION = [28.7158, 77.1705]; // Adarsh Nagar, Delhi
  const [mapCenter, setMapCenter] = useState(ADITYA_LOCATION);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [tileStyle, setTileStyle] = useState("dark"); // 'dark' | 'street' | 'satellite'

  // Map Tile Providers
  const TILE_SERVERS = {
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  };

  // Auto-fetch viewer's location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setUserLocation(coords);
          // Calculate straight-line distance in km using Leaflet
          const dist = L.latLng(ADITYA_LOCATION).distanceTo(L.latLng(coords));
          setDistance((dist / 1000).toFixed(1));
        },
        (error) => {
          console.warn("Location permission denied or failed.");
        }
      );
    }
  }, []);

  // Real Global Location Search using OpenStreetMap's free Nominatim API
  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setSearchResults(data);

      if (data && data.length > 0) {
        const first = data[0];
        setMapCenter([parseFloat(first.lat), parseFloat(first.lon)]);
      }
    } catch (err) {
      console.error("Geocoding search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Get Live Real-Time User GPS Geolocation manually
  const handleGetMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setUserLocation(coords);
          setMapCenter(coords);
          const dist = L.latLng(ADITYA_LOCATION).distanceTo(L.latLng(coords));
          setDistance((dist / 1000).toFixed(1));
        },
        (error) => {
          alert("Could not access your location. Check browser permissions.");
        }
      );
    }
  };

  return (
    <div className="w-full h-full bg-[#121417] text-white flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* 1. REAL INTERACTIVE LEAFLET MAP CANVAS */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={mapCenter}
          zoom={13}
          zoomControl={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={TILE_SERVERS[tileStyle]}
          />

          <MapFlyTo center={mapCenter} zoom={14} />

          {/* Aditya's Pinned Location */}
          <Marker position={ADITYA_LOCATION} icon={customIcon}>
            <Popup>
              <div className="text-emerald-600 font-sans text-xs font-bold">
                📍 Aditya is here (Adarsh Nagar, Delhi)
              </div>
            </Popup>
          </Marker>

          {/* User GPS Pin (If located) */}
          {userLocation && (
            <Marker position={userLocation} icon={customIcon}>
              <Popup>
                <div className="text-blue-600 font-sans text-xs font-bold">
                  📍 You are here
                </div>
              </Popup>
            </Marker>
          )}

          {/* Active Searched Pin (Hide if it overlaps exactly with Aditya or User) */}
          {mapCenter[0] !== ADITYA_LOCATION[0] && (!userLocation || mapCenter[0] !== userLocation[0]) && (
            <Marker position={mapCenter} icon={customIcon}>
              <Popup>
                <div className="text-zinc-900 font-sans text-xs font-semibold">
                  Selected Location
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* DISTANCE OVERLAY */}
      {userLocation && distance && (
        <div className="absolute top-24 sm:top-20 left-1/2 -translate-x-1/2 z-20 bg-[#161a1e]/95 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl flex flex-col items-center gap-1 pointer-events-auto">
          <div className="text-[11px] sm:text-xs font-semibold text-zinc-300">
            Distance from Aditya
          </div>
          <div className="text-base sm:text-lg font-bold text-sky-400">
            {distance} km
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${ADITYA_LOCATION[0]},${ADITYA_LOCATION[1]}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 px-3 py-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 rounded-lg text-[10px] sm:text-[11px] font-medium transition-colors"
          >
            Directions on Google Maps
          </a>
        </div>
      )}

      {/* 2. TOP OVERLAY CONTROLS */}
      <div className="relative z-10 pt-12 px-3 sm:pt-4 sm:px-4 flex items-start justify-between pointer-events-none gap-2">
        
        {/* Search Box */}
        <div className="pointer-events-auto bg-[#161a1e]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-1.5 ml-12 sm:ml-0 w-full sm:w-80 flex flex-col gap-2">
          <form onSubmit={handleSearch} className="flex items-center gap-1.5 px-2 py-1 bg-[#21262d] rounded-lg border border-white/5">
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[11px] sm:text-xs text-white placeholder-zinc-500 w-full font-medium"
            />
            {isSearching && (
              <span className="animate-spin text-xs text-sky-400">⏳</span>
            )}
          </form>

          {/* Search Result Suggestions Dropdown */}
          {searchResults.length > 0 && (
            <div className="max-h-48 overflow-y-auto flex flex-col divide-y divide-white/5 bg-[#12161a] rounded-xl border border-white/10">
              {searchResults.slice(0, 4).map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMapCenter([parseFloat(result.lat), parseFloat(result.lon)]);
                    setSearchResults([]);
                  }}
                  className="p-2 text-left text-[11px] text-zinc-300 hover:bg-sky-500/10 hover:text-sky-400 transition-colors flex items-start gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-sky-400 mt-0.5" />
                  <span className="truncate">{result.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions: Layer Switcher & Re-center GPS */}
        <div className="pointer-events-auto flex flex-col gap-2 shrink-0">
          <div className="bg-[#161a1e]/90 backdrop-blur-xl border border-white/10 p-1 rounded-xl shadow-2xl flex flex-col gap-1">
            <button
              onClick={() => setTileStyle("dark")}
              className={`px-2 py-1 sm:p-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                tileStyle === "dark"
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTileStyle("street")}
              className={`px-2 py-1 sm:p-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                tileStyle === "street"
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Vector
            </button>
            <button
              onClick={() => setTileStyle("satellite")}
              className={`px-2 py-1 sm:p-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                tileStyle === "satellite"
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Satel
            </button>
          </div>

          {/* GPS Live Location Trigger Button */}
          <button
            onClick={handleGetMyLocation}
            className="bg-[#161a1e]/90 hover:bg-sky-500/20 text-sky-400 p-2 sm:p-3 rounded-xl border border-white/10 backdrop-blur-xl shadow-2xl transition-all flex items-center justify-center cursor-pointer"
            title="Locate Me"
          >
            <Crosshair className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* 3. DAILY LIFE QUICK UTILITY BOTTOM DRAWER */}
      <div className="absolute bottom-4 left-3 right-3 sm:right-auto sm:left-4 z-10 bg-[#161a1e]/95 backdrop-blur-xl border border-white/10 p-2.5 sm:p-3 rounded-2xl shadow-2xl flex items-center justify-between sm:justify-start gap-2 sm:gap-3 overflow-x-auto scrollbar-none pointer-events-auto">
        <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-wider shrink-0">
          Explore:
        </span>
        
        <button
          onClick={() => {
            setSearchQuery("Restaurants near me");
            handleSearch();
          }}
          className="px-2.5 sm:px-3 py-1.5 bg-[#21262d] hover:bg-[#282e37] rounded-xl border border-white/10 text-[11px] sm:text-xs text-zinc-200 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Utensils className="w-3.5 h-3.5 text-orange-400" /> Food
        </button>

        <button
          onClick={() => {
            setSearchQuery("Cafes near me");
            handleSearch();
          }}
          className="px-2.5 sm:px-3 py-1.5 bg-[#21262d] hover:bg-[#282e37] rounded-xl border border-white/10 text-[11px] sm:text-xs text-zinc-200 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Coffee className="w-3.5 h-3.5 text-emerald-400" /> Cafes
        </button>

        <button
          onClick={() => {
            setSearchQuery("Gas station near me");
            handleSearch();
          }}
          className="px-2.5 sm:px-3 py-1.5 bg-[#21262d] hover:bg-[#282e37] rounded-xl border border-white/10 text-[11px] sm:text-xs text-zinc-200 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Fuel className="w-3.5 h-3.5 text-sky-400" /> Fuel
        </button>
      </div>

    </div>
  );
}