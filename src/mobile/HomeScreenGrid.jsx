import React, { useState, useEffect } from "react";

// --- DYNAMIC CALENDAR APP ICON ---
const DynamicCalendarIcon = () => {
  const [dateInfo, setDateInfo] = useState({ month: "", day: "" });

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const month = now.toLocaleString("default", { month: "short" }).toUpperCase();
      const day = now.getDate();
      setDateInfo({ month, day });
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden">
      {/* Red Header Bar */}
      <div className="bg-[#FF3B30] w-full h-[32%] flex items-center justify-center pt-0.5">
        <span className="text-[10px] sm:text-[11px] font-extrabold text-white tracking-wider leading-none">
          {dateInfo.month}
        </span>
      </div>
      {/* Date Number Display */}
      <div className="flex-1 flex items-center justify-center pb-1">
        <span className="text-[26px] sm:text-[32px] font-semibold text-[#1C1C1E] tracking-tighter leading-none">
          {dateInfo.day}
        </span>
      </div>
    </div>
  );
};

// --- DYNAMIC CALENDAR WIDGET ---
const DynamicCalendarWidget = () => {
  const [calendarData, setCalendarData] = useState({
    weekday: "",
    month: "",
    day: "",
  });

  useEffect(() => {
    const updateCalendar = () => {
      const now = new Date();
      setCalendarData({
        weekday: now.toLocaleString("default", { weekday: "short" }),
        month: now.toLocaleString("default", { month: "short" }),
        day: now.getDate(),
      });
    };

    updateCalendar();
    const interval = setInterval(updateCalendar, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#1C1C1E]/95 backdrop-blur-2xl rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4 flex flex-col justify-between shadow-xl border border-white/5 select-none">
      <div className="flex items-center gap-1 text-[15px] sm:text-[18px] font-bold tracking-tight">
        <span className="text-[#FF3B30]">{calendarData.weekday}</span>
        <span className="text-white/80">{calendarData.month}</span>
      </div>
      <div className="text-[44px] sm:text-[56px] font-bold text-white leading-none tracking-tight -mt-1">
        {calendarData.day}
      </div>
    </div>
  );
};

// --- WIDGET HELPER ICONS ---
const LocationArrowIcon = () => (
  <svg className="w-2.5 h-2.5 text-white/90 inline ml-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
  </svg>
);

const DrizzleIcon = () => (
  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM9 21h1.5v2H9v-2zm4 0h1.5v2H13v-2zm-8 0h1.5v2H5v-2z" />
  </svg>
);

// Map Weather Code (WMO) to Readable Text
const getWeatherCondition = (code) => {
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Thunderstorm";
  return "Sunny";
};

// --- DYNAMIC WEATHER WIDGET ---
const DynamicWeatherWidget = () => {
  const [weather, setWeather] = useState({
    location: "Locating...",
    temp: "--",
    condition: "Loading",
    high: "--",
    low: "--",
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setWeather((prev) => ({ ...prev, location: "Geolocation Off", loading: false }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const geoData = await geoRes.json();
          const cityName =
            geoData.address?.city ||
            geoData.address?.town ||
            geoData.address?.village ||
            geoData.address?.county ||
            "Current Location";

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
          );
          const weatherData = await weatherRes.json();

          const currentTemp = Math.round(weatherData.current_weather.temperature);
          const code = weatherData.current_weather.weathercode;
          const highTemp = Math.round(weatherData.daily.temperature_2m_max[0]);
          const lowTemp = Math.round(weatherData.daily.temperature_2m_min[0]);

          setWeather({
            location: cityName,
            temp: currentTemp,
            condition: getWeatherCondition(code),
            high: highTemp,
            low: lowTemp,
            loading: false,
          });
        } catch (error) {
          console.error("Error fetching weather:", error);
          setWeather((prev) => ({ ...prev, location: "Weather Error", loading: false }));
        }
      },
      (error) => {
        console.warn("Geolocation permission denied/failed:", error);
        setWeather({
          location: "Location Blocked",
          temp: "27",
          condition: "Drizzle",
          high: "29",
          low: "25",
          loading: false,
        });
      }
    );
  }, []);

  return (
    <div className="w-full h-full bg-[#2C3540]/80 backdrop-blur-2xl rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4 flex flex-col justify-between shadow-xl border border-white/5 text-white select-none">
      <div>
