import React, { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiDayHaze,
} from "react-icons/wi";

export default function WeatherWidget({ onOpenWeather }) {
  const [weather, setWeather] = useState({
    temp: "--",
    city: "Detecting...",
    condition: "Sunny",
    forecast: [
      { day: "Today", icon: "☀️", temp: "--" },
      { day: "Tue", icon: "🌤️", temp: "--" },
      { day: "Wed", icon: "🌧️", temp: "--" },
    ],
  });
  const [loading, setLoading] = useState(true);

  const getWeatherDetails = (code) => {
    switch (code) {
      case 0:
        return { text: "Sunny", icon: <WiDaySunny className="text-4xl text-yellow-300" /> };
      case 1:
      case 2:
      case 3:
        return { text: "Partly Cloudy", icon: <WiCloudy className="text-4xl text-zinc-300" /> };
      case 45:
      case 48:
        return { text: "Hazy/Foggy", icon: <WiDayHaze className="text-4xl text-zinc-400" /> };
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
        return { text: "Rainy", icon: <WiRain className="text-4xl text-blue-400" /> };
      case 71:
      case 73:
      case 75:
        return { text: "Snowy", icon: <WiSnow className="text-4xl text-cyan-200" /> };
      case 95:
      case 96:
      case 99:
        return { text: "Thunderstorm", icon: <WiThunderstorm className="text-4xl text-purple-400" /> };
      default:
        return { text: "Clear", icon: <WiDaySunny className="text-4xl text-yellow-300" /> };
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async (lat, lon, cityName = "Current Location") => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=auto`
        );
        const data = await res.json();

        if (data && data.current && isMounted) {
          const currentTemp = Math.round(data.current.temperature_2m);
          const currentWeatherCode = data.current.weather_code;
          const details = getWeatherDetails(currentWeatherCode);

          const dailyTimes = data.daily?.time || [];
          const dailyCodes = data.daily?.weather_code || [];
          const dailyMax = data.daily?.temperature_2m_max || [];

          const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

          const forecastList = [0, 1, 2].map((i) => {
            if (!dailyTimes[i]) return { day: "---", icon: "☀️", temp: "--" };
            const dateObj = new Date(dailyTimes[i]);
            const dayName = i === 0 ? "Today" : daysOfWeek[dateObj.getDay()];
            const code = dailyCodes[i];
            const tempMax = Math.round(dailyMax[i]);

            let emoji = "☀️";
            if (code >= 1 && code <= 3) emoji = "🌤️";
            else if (code >= 51 && code <= 65) emoji = "🌧️";
            else if (code >= 71 && code <= 75) emoji = "❄️";
            else if (code >= 95) emoji = "⚡";

            return { day: dayName, icon: emoji, temp: `${tempMax}°` };
          });

          setWeather({
            temp: `${currentTemp}°`,
            city: cityName,
            condition: details.text,
            icon: details.icon,
            forecast: forecastList,
          });
        }
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Reverse Geocoding via BigDataCloud (CORS friendly)
    const getCityName = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        const data = await res.json();
        return data.city || data.locality || data.principalSubdivision || "Current Location";
      } catch {
        return "Current Location";
      }
    };

    // Fast & Unblocked IP Geolocation Fallback (Works on laptops & desktops)
    const fetchIpLocation = async () => {
      try {
        const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const locData = await response.json();

        if (locData && locData.latitude && locData.longitude) {
          const cityName = locData.city || locData.region || "Current Location";
          fetchWeather(parseFloat(locData.latitude), parseFloat(locData.longitude), cityName);
        } else {
          fetchWeather(22.5726, 88.3639, "Kolkata");
        }
      } catch (error) {
        console.error("IP geolocation failed:", error);
        fetchWeather(22.5726, 88.3639, "Kolkata");
      }
    };

    // Geolocation execution logic
    if (navigator.geolocation && (window.isSecureContext || window.location.hostname === "localhost")) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const cityName = await getCityName(latitude, longitude);
          fetchWeather(latitude, longitude, cityName);
        },
        (error) => {
          console.warn("Browser geolocation failed on laptop, falling back to IP:", error);
          fetchIpLocation();
        },
        { timeout: 4000, enableHighAccuracy: false }
      );
    } else {
      fetchIpLocation();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      onClick={onOpenWeather}
      className="h-full flex flex-col justify-between text-white cursor-pointer group select-none transition-transform duration-200 active:scale-95"
      title="Click to open Weather app"
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-light leading-none group-hover:text-yellow-200 transition-colors">
            {loading ? "..." : weather.temp}
          </h1>
          <p className="text-xs text-white/80 mt-1 truncate max-w-[120px]">
            {weather.city}
          </p>
        </div>

        <div className="transform group-hover:scale-110 transition-transform">
          {weather.icon || <WiDaySunny className="text-4xl text-yellow-300" />}
        </div>
      </div>

      {/* Forecast */}
      <div className="space-y-1 text-[11px]">
        {weather.forecast.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between ${
              index !== weather.forecast.length - 1
                ? "border-b border-white/10 pb-1"
                : ""
            }`}
          >
            <span className="text-white/70">{item.day}</span>
            <span>
              {item.icon} {item.temp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}