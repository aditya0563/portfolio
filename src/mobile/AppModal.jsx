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
