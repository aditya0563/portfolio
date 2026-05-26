import React from "react";
import { motion } from "framer-motion";
import { FaChevronLeft } from "react-icons/fa";
import CalculatorApp from "../apps/CalculatorApp";
import WeatherApp from "../apps/WeatherApp";
import NotesApp from "../apps/NotesApp";
import GitHubMobileProfile from "../apps/GitHubMobileProfile";
import CalendarApp from "../apps/CalendarApp";
import Setting from "../apps/Setting";
import Maps from "../apps/Map";
import PhotosApp from "../apps/PhotosApp";
import LinkedInApp from "../apps/LinkedInApp";
import SafariApp from "../apps/SafariApp";
import ResumeApp from "./Resume";
import Leetcode from "../apps/Leetcode";
import LeetCodeApp from "../apps/Leetcode";
import PhoneApp from "./PhoneApp";
import Imessage from "../apps/Imessage";
import Spotify from "../apps/SpotifyApp";
import CameraApp from "./Camera";
import Project from "../apps/ProjectsFolderSection";

export default function AppModal({ activeApp, onClose }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 30 }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      /* Fully covers the screen under the z-50 status bar */
      className="absolute inset-0 z-40 bg-black flex flex-col justify-between select-none overflow-hidden"
    >
      {/* FLOATING BACK BUTTON - Added 'external-back-button' class here */}
      <button
        onClick={onClose}
        className="external-back-button absolute top-12 left-4 z-50 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 active:scale-95 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center text-white transition-all cursor-pointer"
        aria-label="Back"
      >
        <FaChevronLeft className="w-3 h-3 text-white -ml-0.5" />
      </button>

      {/* FULLSCREEN APP RENDER CONTAINER */}
      <div className="flex-1 w-full h-full relative overflow-y-auto">
        {activeApp === "Calculator" && <CalculatorApp />}
        {activeApp === "Weather" && <WeatherApp onClose={onClose} />}
        {activeApp === "Notes" && <NotesApp onClose={onClose} />}
        {activeApp === "GitHub" && <GitHubMobileProfile onClose={onClose} />}
        {activeApp === "Calendar" && <CalendarApp onClose={onClose} />}
        {activeApp === "Settings" && <Setting onClose={onClose} />}
        {activeApp === "Maps" && <Maps onClose={onClose} />}
        {activeApp === "Photos" && <PhotosApp onClose={onClose} />}
        {activeApp === "LinkedIn" && <LinkedInApp onClose={onClose} />}
        {activeApp === "Safari" && <SafariApp onClose={onClose} />}
        {activeApp === "Resume.pdf" && <ResumeApp />}
        {activeApp === "LeetCode" && <LeetCodeApp />}
        {activeApp === "phone" && <PhoneApp />}
        {activeApp === "messages" && <Imessage />}
        {activeApp === "music" && <Spotify />}
        {activeApp === "camera" && <CameraApp />}
        {activeApp === "Projects" && <Project />}
      </div>

      {/* iOS BOTTOM HOME BAR */}
      <div
        onClick={onClose}
        className="absolute bottom-1 inset-x-0 flex justify-center py-2 cursor-pointer z-50 active:opacity-60 transition-opacity"
      >
        <div className="w-36 h-1 bg-white/80 rounded-full shadow-md backdrop-blur-md" />
      </div>
    </motion.div>
  );
}