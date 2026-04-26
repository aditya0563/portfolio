import React, { memo } from "react";
import { motion } from "framer-motion";
import WeatherWidget from "./WeatherWidget";
import CalendarWidget from "./CalendarWidget";
import AboutWidget from "./AboutWidget";

const DesktopWidgets = ({ profile, onOpenWeather, onOpenCalender, onOpenNotes, widgetVariants }) => {
  return (
    <motion.div 
      className="absolute top-20 left-6 flex flex-col gap-5"
      variants={widgetVariants}
    >
      <div className="flex gap-5">
        <div className="w-[160px] h-[160px] rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl p-4 transition-transform hover:scale-105 duration-200">
          <WeatherWidget onOpenWeather={onOpenWeather}/>
        </div>
        <div className="w-[160px] h-[160px] rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl p-4 transition-transform hover:scale-105 duration-200">
          <CalendarWidget onOpenCalender={onOpenCalender} />
        </div>
      </div>
      <div className="w-[345px] min-h-[215px] rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl p-5 transition-transform hover:scale-[1.02] duration-200">
        <AboutWidget profile={profile} onOpenNodepad={onOpenNotes} />
      </div>
    </motion.div>
  );
};

export default memo(DesktopWidgets);