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
  const [mapCenter, setMapCenter] = useState([21.1926, 81.332]); // Default Bhilai coordinates
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [tileStyle, setTileStyle] = useState("dark"); // 'dark' | 'street' | 'satellite'

  // Map Tile Providers
  const TILE_SERVERS = {
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  };

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

  // Get Live Real-Time User GPS Geolocation
  const handleGetMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setUserLocation(coords);
          setMapCenter(coords);
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

          {/* Active Searched Pin */}
          <Marker position={mapCenter} icon={customIcon}>
            <Popup>
              <div className="text-zinc-900 font-sans text-xs font-semibold">
                Selected Location
              </div>
            </Popup>
          </Marker>

          {/* User GPS Pin (If located) */}
          {userLocation && (
            <Marker position={userLocation} icon={customIcon}>
              <Popup>
                <div className="text-blue-600 font-sans text-xs font-bold">
                  📍 You are here
