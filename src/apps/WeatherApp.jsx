import React, { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiSunset,
  WiWindDeg,
  WiBarometer
} from "react-icons/wi";
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

export default function WeatherApp() {
  const [city, setCity] = useState("Kolkata");
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to map WMO Weather Codes to text & component icons
  const getWeatherDetails = (code) => {
    switch (code) {
      case 0:
        return { condition: "Clear Sky", icon: <WiDaySunny className="text-xl text-yellow-300" />, type: "sun" };
      case 1:
      case 2:
      case 3:
        return { condition: "Partly Cloudy", icon: <WiCloudy className="text-xl text-gray-200" />, type: "cloud" };
      case 45:
      case 48:
        return { condition: "Foggy", icon: <WiFog className="text-xl text-gray-300" />, type: "fog" };
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        return { condition: "Rainy", icon: <WiRain className="text-xl text-blue-300" />, type: "rain" };
      case 71:
      case 73:
      case 75:
      case 85:
      case 86:
        return { condition: "Snowy", icon: <WiSnow className="text-xl text-blue-100" />, type: "snow" };
      case 95:
      case 96:
      case 99:
        return { condition: "Thunderstorm", icon: <WiThunderstorm className="text-xl text-yellow-400" />, type: "thunder" };
      default:
        return { condition: "Clear", icon: <WiDaySunny className="text-xl text-yellow-300" />, type: "sun" };
    }
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Fetch Lat/Long via Geocoding
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("Location not found.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Fetch Live Forecast Data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const data = await weatherRes.json();

      const currentDetails = getWeatherDetails(data.current.weather_code);

      // Construct transformed state
      setWeatherData({
        city: name,
        country: country,
        temp: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: `${data.current.relative_humidity_2m}%`,
        wind: `${Math.round(data.current.wind_speed_10m)} km/h`,
        pressure: `${Math.round(data.current.surface_pressure)} hPa`,
        condition: currentDetails.condition,
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
        hourly: data.hourly.time.slice(0, 12).map((timeStr, idx) => {
          const hourDetails = getWeatherDetails(data.hourly.weather_code[idx]);
          return {
            time: idx === 0 ? "Now" : new Date(timeStr).toLocaleTimeString([], { hour: 'numeric', hour12: true }),
            temp: Math.round(data.hourly.temperature_2m[idx]),
            icon: hourDetails.icon
          };
        }),
        daily: data.daily.time.slice(0, 5).map((d, idx) => {
          const dayDetails = getWeatherDetails(data.daily.weather_code[idx]);
          return {
            day: idx === 0 ? "Today" : new Date(d).toLocaleDateString("en-US", { weekday: "short" }),
            low: Math.round(data.daily.temperature_2m_min[idx]),
            high: Math.round(data.daily.temperature_2m_max[idx]),
            icon: dayDetails.icon
          };
        })
      });
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery);
      fetchWeather(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    /* 
      Mobile behavior remains unchanged (overflow-y-auto min-h-screen).
      Laptop / Desktop view (sm: and up) gets restricted height (sm:h-full sm:max-h-screen) 
      and explicit vertical scrolling (sm:overflow-y-auto).
    */
    <div className="w-full h-full bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027] text-white flex flex-col font-sans select-none overflow-y-auto sm:overflow-y-auto sm:h-full sm:max-h-screen p-4 pt-14 sm:pt-4 pb-12 sm:pb-6 relative scrollbar-none min-h-screen sm:min-h-0">
      
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Search bar */}
      <div className="relative z-10 flex items-center justify-between mb-4 shrink-0">
        <form onSubmit={handleSearch} className="relative flex items-center w-48 sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city..."
            className="w-full bg-white/15 border border-white/20 rounded-full py-1 px-3 pl-8 text-xs text-white placeholder-white/60 focus:outline-none focus:bg-white/25 transition-all"
          />
          <FaSearch className="absolute left-2.5 text-xs text-white/60 pointer-events-none" />
        </form>
        <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/10 px-2 py-1 rounded-md border border-white/15">
          macOS Weather
        </span>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-sm font-light animate-pulse">
          Fetching live weather data...
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center text-sm text-red-300">
          {error}
        </div>
      ) : weatherData ? (
        <>
          {/* Main Hero Card */}
          <div className="relative z-10 flex flex-col items-center justify-center my-2 text-center shrink-0">
            <span className="text-[11px] uppercase tracking-widest font-semibold opacity-80">
              MY LOCATION
            </span>
            <h1 className="text-3xl font-light tracking-tight mt-0.5">
              {weatherData.city}
            </h1>
            <div className="text-6xl font-extralight tracking-tighter my-1">
              {weatherData.temp}°
            </div>
            <p className="text-sm font-medium">{weatherData.condition}</p>
            <div className="flex items-center gap-2 text-xs font-medium opacity-90 mt-0.5">
              <span>H:{weatherData.high}°</span>
              <span>L:{weatherData.low}°</span>
              <span className="ml-1 opacity-75">(Feels like {weatherData.feelsLike}°)</span>
            </div>
          </div>

          {/* Hourly Carousel */}
          <div className="relative z-10 mt-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-lg shrink-0">
            <p className="text-xs font-medium opacity-90 mb-3 px-1 border-b border-white/10 pb-2">
              Conditions are currently {weatherData.condition.toLowerCase()}. Humidity is at {weatherData.humidity}.
            </p>

            <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none py-1 px-1">
              {weatherData.hourly.map((item, index) => (
                <div key={index} className="flex flex-col items-center min-w-[40px] gap-1.5 shrink-0">
                  <span className="text-[11px] font-medium opacity-80">{item.time}</span>
                  {item.icon}
                  <span className="text-xs font-semibold">{item.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout Cards (1-column on mobile, 3-column on laptop view) */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 shrink-0">
            
            {/* 5-Day Forecast */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-lg flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold opacity-75 mb-2">
                <FaCalendarAlt className="text-[10px]" /> 5-DAY FORECAST
              </div>
              <div className="flex flex-col gap-2.5">
                {weatherData.daily.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-medium">
                    <span className="w-12">{item.day}</span>
                    {item.icon}
                    <span className="opacity-60 text-[11px]">{item.low}°</span>
                    <div className="w-20 h-1.5 bg-white/20 rounded-full relative overflow-hidden mx-1">
                      <div className="absolute inset-y-0 left-2 right-2 bg-gradient-to-r from-blue-300 to-yellow-400 rounded-full" />
                    </div>
                    <span className="font-semibold">{item.high}°</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Widget */}
            <div className="flex flex-col gap-3">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-1.5 text-xs font-semibold opacity-75 mb-1">
                  <WiBarometer className="text-base" /> PRESSURE
                </div>
                <div className="text-2xl font-bold">{weatherData.pressure}</div>
                <p className="text-[10px] opacity-80 mt-1">Surface Atmospheric Pressure</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-lg flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold opacity-75">
                  <WiWindDeg className="text-lg" /> WIND
                </div>
                <div className="flex items-baseline justify-between my-2">
                  <span className="text-xl font-bold">{weatherData.wind}</span>
                </div>
                <div className="w-full h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] opacity-75">
                  Humidity: {weatherData.humidity}
                </div>
              </div>
            </div>

            {/* Location Radar Tile */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-lg flex flex-col justify-between overflow-hidden relative min-h-[160px]">
              <div className="flex items-center gap-1.5 text-xs font-semibold opacity-75 z-10">
                <FaMapMarkerAlt className="text-[10px]" /> LOCATION MAP
              </div>
              
              <div className="absolute inset-0 top-7 rounded-b-2xl bg-zinc-900/40 p-2 flex flex-col justify-between opacity-90">
                <div className="w-full h-full rounded-xl bg-[#1e293b] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[1px]" />
                  <div className="text-center z-10">
                    <div className="px-2.5 py-1 bg-blue-600/90 rounded-full text-[11px] font-bold shadow-md inline-block">
                      {weatherData.temp}° {weatherData.city}
                    </div>
                    <p className="text-[9px] opacity-70 mt-1">{weatherData.condition}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      ) : null}
    </div>
  );
}