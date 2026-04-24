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
