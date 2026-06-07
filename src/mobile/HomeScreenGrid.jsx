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
        <div className="text-[11px] sm:text-[12px] font-semibold text-white/90 truncate flex items-center">
          <span className="truncate">{weather.location}</span>
          <LocationArrowIcon />
        </div>
        <div className="text-[28px] sm:text-[36px] font-light leading-tight mt-0.5">
          {weather.temp}°
        </div>
      </div>
      <div>
        <DrizzleIcon />
        <div className="text-[10px] sm:text-[11px] font-medium text-white/95 leading-tight mt-0.5">
          {weather.condition}
        </div>
        <div className="text-[9px] sm:text-[10px] font-medium text-white/60 leading-tight">
          H:{weather.high}° L:{weather.low}°
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP GRID DATA ---
const APP_GRID = [
  // Row 1
  { 
    id: "calendar", 
    label: "Calendar", 
  },
  { 
    id: "notes", 
    label: "Notes", 
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/1/18/Notes_%28iOS_26%29_app_icon.png" 
  },
  { 
    id: "calculator", 
    label: "Calculator", 
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Calculator_%28iOS_26%29_app_icon.png" 
  },
  { 
    id: "github", 
    label: "GitHub", 
    imgSrc: "https://img.icons8.com/ios11/1200/github.jpg" 
  },
  // Row 2
  { 
    id: "leetcode", 
    label: "LeetCode", 
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" 
  },
  { 
    id: "settings", 
    label: "Settings", 
    imgSrc: "https://cdn.iconscout.com/icon/free/png-256/free-apple-settings-icon-svg-download-png-493162.png?f=webp", 
    badge: 2 
  },
  { 
    id: "maps", 
    label: "Maps", 
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/2/21/Apple_Maps_iOS_26_icon.png" 
  },
  { 
    id: "photos", 
    label: "Photos", 
    imgSrc: "https://cdn.iconscout.com/icon/free/png-256/free-apple-photos-icon-svg-download-png-493155.png?f=webp" 
  },
  // Row 3
  { 
    id: "linkedin", 
    label: "LinkedIn", 
    imgSrc: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-icon.png", 
    badge: 26 
  },
  { 
    id: "safari", 
    label: "Safari", 
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcZzmhhfkg4fZrWCOJ8TJqDk4m_XkI6MAh6YgnxuPaUH8CZgBa88BPSkY&s=10" 
  },
  { 
    id: "projects", 
    label: "Projects", 
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Files_App_icon_iOS.png" 
  },
  { 
    id: "resume", 
    label: "Resume.pdf", 
    imgSrc: "https://p1.hiclipart.com/preview/390/359/771/ios-style-adobe-icons-pdf-ios7-red-png-icon.jpg" 
  },
];

export default function HomeScreenGrid({ setActiveApp }) {
  return (
    <div className="relative z-30 w-full h-full overflow-hidden px-4 sm:px-6 py-2 flex flex-col justify-start max-w-[420px] max-h-[720px] my-auto mx-auto select-none touch-none">
      
      {/* 1. TOP WIDGETS ROW */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 mb-3 sm:mb-5">
        {/* Dynamic Calendar Widget */}
        <div 
          onClick={() => setActiveApp && setActiveApp("Calendar")}
          className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform w-full"
        >
          <div className="w-full max-w-[155px] aspect-square mx-auto">
            <DynamicCalendarWidget />
          </div>
          <span className="text-[11px] font-medium text-white/90 tracking-tight drop-shadow">
            Calendar
          </span>
        </div>

        {/* Dynamic Weather Widget */}
        <div 
          onClick={() => setActiveApp && setActiveApp("Weather")}
          className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform w-full"
        >
          <div className="w-full max-w-[155px] aspect-square mx-auto">
            <DynamicWeatherWidget />
          </div>
          <span className="text-[11px] font-medium text-white/90 tracking-tight drop-shadow">
            Weather
          </span>
        </div>
      </div>

      {/* 2. MAIN APP GRID */}
      <div className="grid grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-4 justify-items-center items-center">
        {APP_GRID.map((app) => (
          <div
            key={app.id}
            onClick={() => setActiveApp && setActiveApp(app.label)}
            className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform duration-150"
          >
            {/* iOS Continuous Squircle Outer Container */}
            <div className="relative w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] shrink-0">
              <div className="relative w-full h-full [clip-path:inset(0_round_22.5%)] flex items-center justify-center overflow-hidden">
                {/* App Content */}
                {app.id === "calendar" ? (
                  <DynamicCalendarIcon />
                ) : app.imgSrc ? (
                  <img
                    src={app.imgSrc}
                    alt={app.label}
                    className="w-full h-full object-cover scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-700/80 flex items-center justify-center">
                    <span className="text-[10px] text-white/80 font-semibold uppercase tracking-wider">
                      {app.label.substring(0, 2)}
                    </span>
                  </div>
                )}

                {/* --- iOS GLASS LIGHTING OVERLAYS --- */}
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-[22.5%] border border-white/30 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Notification Badge */}
              {app.badge && (
                <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[10px] sm:text-[11px] font-bold px-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white/20 shadow-md z-10">
                  {app.badge}
                </span>
              )}
            </div>

            <span className="text-[11px] font-medium text-white/90 tracking-tight drop-shadow truncate max-w-[62px] text-center">
              {app.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}