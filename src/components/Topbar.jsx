import React, { useState, useEffect, useRef } from "react";
import {
  FaApple,
  FaWifi,
  FaBluetoothB,
  FaSearch,
  FaSlidersH,
  FaPowerOff,
  FaMoon,
  FaCalculator,
  FaDesktop,
  FaSun,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import DynamicIsland from "./DynamicIsland";

export default function TopBar({
  onSiriClick,
  isWifiActive,
  setIsWifiActive,
  isBluetooth,
  setIsBluetooth,
  isDarkMode,
  setIsDarkMode,
  onOpenCalculator,
  onVolumeChange,
  isOpenFinder,
}) {
  const [time, setTime] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(true);

  // Dynamic Network Bandwidth State
  const [downloadSpeed, setDownloadSpeed] = useState("0 KB/s");
  const [uploadSpeed, setUploadSpeed] = useState("0 KB/s");

  // Control Center & Popover Visibility State
  const [showControlCenter, setShowControlCenter] = useState(false);

  // Control Center Interactive States
  const [isAirDrop, setIsAirDrop] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(100);

  const controlCenterRef = useRef(null);

  // Helper function to format bytes/sec into dynamic human-readable units (KB/s or MB/s)
  const formatSpeed = (speedInKB) => {
    if (speedInKB >= 1024) {
      return `${(speedInKB / 1024).toFixed(1)}MB/s`;
    }
    return `${speedInKB.toFixed(1)}KB/s`;
  };

  // 1. Dynamic Network Speed Measurement & Simulation Effect
  useEffect(() => {
    const updateNetworkSpeed = () => {
      if (!isWifiActive) {
        setDownloadSpeed("0.0KB/s");
        setUploadSpeed("0.0KB/s");
        return;
      }

      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      let baseDlMultiplier = 1;

      if (connection && connection.downlink) {
        baseDlMultiplier = Math.max(0.5, connection.downlink / 2);
      }

      const rawDownload = (Math.random() * 600 + 150) * baseDlMultiplier;
      const rawUpload = (Math.random() * 120 + 20) * (baseDlMultiplier * 0.5);

      setDownloadSpeed(formatSpeed(rawDownload));
      setUploadSpeed(formatSpeed(rawUpload));
    };

    updateNetworkSpeed();
    const speedInterval = setInterval(updateNetworkSpeed, 1500);

    return () => clearInterval(speedInterval);
  }, [isWifiActive]);

  // 2. Apply actual screen brightness to document body
  useEffect(() => {
    document.body.style.filter = `brightness(${brightness}%)`;
    return () => {
      document.body.style.filter = "brightness(100%)";
    };
  }, [brightness]);

  // 3. Universal Sound Synchronization (YouTube, Spotify, Local Audio/Video)
  useEffect(() => {
    const normVolume = volume / 100;
    const percentVolume = volume;

    document.querySelectorAll("audio, video").forEach((media) => {
      media.volume = normVolume;
    });

    document
      .querySelectorAll(
        'iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"]',
      )
      .forEach((iframe) => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "setVolume",
              args: [percentVolume],
            }),
            "*",
          );
        }
      });

    if (window.ytPlayer && typeof window.ytPlayer.setVolume === "function") {
      window.ytPlayer.setVolume(percentVolume);
    }

    if (
      window.spotifyPlayer &&
      typeof window.spotifyPlayer.setVolume === "function"
    ) {
      window.spotifyPlayer.setVolume(normVolume);
    }

    if (onVolumeChange) {
      onVolumeChange(normVolume);
    }
  }, [volume, onVolumeChange]);

  // Live Clock Formatter
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString("en-US", { weekday: "short" });
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${day} ${hours}:${minutes}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real Battery Reader
  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      });
    }
  }, []);

  // Close Control Center on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        controlCenterRef.current &&
        !controlCenterRef.current.contains(e.target)
      ) {
        setShowControlCenter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Helper function to resolve battery bar color dynamically
  const getBatteryColor = () => {
    if (isCharging) return "bg-emerald-500";
    if (batteryLevel <= 20) return "bg-amber-400";
    return isDarkMode ? "bg-white" : "bg-zinc-900";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-8 z-50 backdrop-blur-2xl border-b transition-colors duration-300 flex items-center justify-between px-4 text-xs select-none ${
        isDarkMode
          ? "bg-black/25 border-white/10 text-white"
          : "bg-white/40 border-black/10 text-zinc-900"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 z-10">
        <FaApple className="text-sm cursor-default" />
        <span
          className="font-semibold text-[13px] tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
          onClick={isOpenFinder}
        >
          Finder
        </span>
      </div>

      {/* --- Center Dynamic Island / Notch Component --- */}
      <DynamicIsland onSiriClick={onSiriClick} />

      {/* Right Section */}
      <div className="flex items-center gap-3 z-10 font-medium">
        {/* Dynamic Bandwidth Readout */}
        <div
          className={`hidden sm:flex flex-col items-end text-[9px] font-mono leading-tight tracking-tight ${
            isDarkMode ? "text-white/90" : "text-zinc-800"
          }`}
        >
          <div className="flex items-center gap-0.5">
            <span className="text-[8px] opacity-70">↕</span>
            <span>{downloadSpeed}</span>
          </div>
          <span className={isDarkMode ? "text-white/60" : "text-zinc-500"}>
            {uploadSpeed}
          </span>
        </div>

        {/* Bluetooth Icon */}
        <div
          onClick={() => setIsBluetooth(!isBluetooth)}
          className="relative flex items-center justify-center cursor-pointer p-0.5"
          title={isBluetooth ? "Bluetooth: On" : "Bluetooth: Off"}
        >
          <FaBluetoothB
            className={`text-[13px] transition-opacity ${
              isBluetooth ? "opacity-90 hover:opacity-100" : "opacity-40"
            }`}
          />
          {!isBluetooth && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none drop-shadow"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="13" x2="13" y2="3" />
            </svg>
          )}
        </div>

        {/* Wi-Fi Icon */}
        <div
          onClick={() => setIsWifiActive(!isWifiActive)}
          className="relative flex items-center justify-center cursor-pointer p-0.5"
          title={isWifiActive ? "Wi-Fi: On" : "Wi-Fi: Off"}
        >
          <FaWifi
            className={`text-[13px] transition-opacity ${
              isWifiActive ? "opacity-90 hover:opacity-100" : "opacity-40"
            }`}
          />
          {!isWifiActive && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none drop-shadow"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="13" x2="13" y2="3" />
