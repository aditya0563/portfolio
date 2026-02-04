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
