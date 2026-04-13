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
