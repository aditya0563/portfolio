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
            </svg>
          )}
        </div>

        {/* Spotlight Search Icon */}
        <FaSearch className="text-[11px] opacity-80 cursor-pointer hover:opacity-100 transition-opacity" />

        {/* macOS Battery Icon */}
        <div
          className="flex items-center gap-1.5 text-[11px] font-medium cursor-default"
          title={`Battery: ${batteryLevel}%${isCharging ? " (Charging)" : ""}`}
        >
          <span>{batteryLevel}%</span>
          <div className="relative flex items-center">
            <div
              className={`w-[22px] h-[11px] rounded-[4px] border-[1.5px] p-[1.5px] flex items-center relative overflow-hidden backdrop-blur-sm shadow-sm ${
                isDarkMode
                  ? "border-white/70 bg-white/10"
                  : "border-black/60 bg-black/5"
              }`}
            >
              <div
                className={`h-full rounded-[2px] transition-all duration-300 ${getBatteryColor()}`}
                style={{ width: `${batteryLevel}%` }}
              />
            </div>
            <div
              className={`w-[2px] h-[4px] rounded-r-[1.5px] -ml-[0.5px] ${
                isDarkMode ? "bg-white/70" : "bg-black/60"
              }`}
            />
          </div>
          {isCharging && (
            <span className="text-[10px] text-emerald-500 font-mono leading-none">
              ⚡
            </span>
          )}
        </div>

        {/* Control Center Toggle Button & Popover Modal */}
        <div className="relative" ref={controlCenterRef}>
          <button
            onClick={() => setShowControlCenter(!showControlCenter)}
            className={`p-1 rounded transition-colors cursor-pointer ${
              showControlCenter
                ? isDarkMode
                  ? "bg-white/30"
                  : "bg-black/20"
                : isDarkMode
                ? "hover:bg-white/10"
                : "hover:bg-black/10"
            }`}
            title="Control Center"
          >
            <FaSlidersH className="text-[13px] opacity-90" />
          </button>

          {/* Control Panel Popover */}
          {showControlCenter && (
            <div
              className={`absolute top-9 right-0 w-[300px] backdrop-blur-3xl border rounded-3xl p-3 shadow-2xl z-50 flex flex-col gap-3 font-sans transition-all duration-300 ${
                isDarkMode
                  ? "bg-black/40 border-white/20 text-white shadow-black/50"
                  : "bg-white/60 border-black/15 text-zinc-900 shadow-xl"
              }`}
            >
              {/* Top Grid: Connectivity & Toggles */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Left Card: Connectivity Switches */}
                <div
                  className={`border rounded-2xl p-3 flex flex-col gap-3 backdrop-blur-md ${
                    isDarkMode
                      ? "bg-white/15 border-white/20"
                      : "bg-black/5 border-black/10"
                  }`}
                >
                  <div
                    onClick={() => setIsWifiActive(!isWifiActive)}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isWifiActive
                          ? "bg-blue-500 text-white"
                          : isDarkMode
                          ? "bg-white/20 text-white/60"
                          : "bg-black/15 text-zinc-600"
                      }`}
                    >
                      <FaWifi className="text-xs" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold text-xs">Wi-Fi</span>
                      <span className="text-[10px] opacity-70">
                        {isWifiActive ? "Home" : "Off"}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setIsBluetooth(!isBluetooth)}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isBluetooth
                          ? "bg-blue-500 text-white"
                          : isDarkMode
                          ? "bg-white/20 text-white/60"
                          : "bg-black/15 text-zinc-600"
                      }`}
                    >
                      <FaBluetoothB className="text-xs" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold text-xs">Bluetooth</span>
                      <span className="text-[10px] opacity-70">
                        {isBluetooth ? "On" : "Off"}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setIsAirDrop(!isAirDrop)}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isAirDrop
                          ? "bg-blue-500 text-white"
                          : isDarkMode
                          ? "bg-white/20 text-white/60"
                          : "bg-black/15 text-zinc-600"
                      }`}
                    >
                      <FaPowerOff className="text-xs" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold text-xs">AirDrop</span>
                      <span className="text-[10px] opacity-70">
                        {isAirDrop ? "On" : "Off"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Cards: Quick Actions & Dark Mode Toggle */}
                <div className="flex flex-col gap-2.5">
                  <div
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`border rounded-2xl p-2.5 flex items-center gap-2.5 cursor-pointer transition-colors backdrop-blur-md ${
                      isDarkMode
                        ? "bg-white/15 border-white/20 hover:bg-white/25"
                        : "bg-black/5 border-black/10 hover:bg-black/10"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isDarkMode
                          ? "bg-indigo-600 text-white"
                          : "bg-amber-400 text-zinc-900"
                      }`}
                    >
                      {isDarkMode ? (
                        <FaMoon className="text-xs" />
                      ) : (
                        <FaSun className="text-xs" />
                      )}
                    </div>
                    <span className="font-bold text-xs">
                      {isDarkMode ? "Dark Mode" : "Light Mode"}
                    </span>
                  </div>

                  {/* Quick Action Tiles */}
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div
                      onClick={() => {
                        if (onOpenCalculator) onOpenCalculator();
                        setShowControlCenter(false);
                      }}
                      className={`border rounded-2xl p-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors backdrop-blur-md ${
                        isDarkMode
                          ? "bg-white/15 border-white/20 hover:bg-white/25"
                          : "bg-black/5 border-black/10 hover:bg-black/10"
                      }`}
                    >
                      <FaCalculator className="text-lg opacity-90" />
                      <span className="text-[10px] font-semibold text-center leading-tight">
                        Calculator
                      </span>
                    </div>

                    <div
                      onClick={toggleFullScreen}
                      className={`border rounded-2xl p-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors backdrop-blur-md ${
                        isDarkMode
                          ? "bg-white/15 border-white/20 hover:bg-white/25"
                          : "bg-black/5 border-black/10 hover:bg-black/10"
                      }`}
                    >
                      <FaDesktop className="text-lg opacity-90" />
                      <span className="text-[10px] font-semibold text-center leading-tight">
                        Full Screen
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Brightness Slider */}
              <div
                className={`border rounded-2xl p-3 flex flex-col gap-2 backdrop-blur-md ${
                  isDarkMode
                    ? "bg-white/15 border-white/20"
                    : "bg-black/5 border-black/10"
                }`}
              >
                <span className="font-bold text-xs opacity-90">Display</span>
                <div className="relative flex items-center bg-white/90 rounded-full h-8 px-3 overflow-hidden shadow-inner">
                  <FaSun className="text-zinc-800 text-xs z-10 pointer-events-none" />
                  <span className="text-xs font-bold text-zinc-800 ml-2 z-10 pointer-events-none">
                    {brightness}%
                  </span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                  />
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-white transition-all pointer-events-none"
                    style={{ width: `${brightness}%` }}
                  />
                </div>
              </div>

              {/* Universal Sound Volume Slider */}
              <div
                className={`border rounded-2xl p-3 flex flex-col gap-2 backdrop-blur-md ${
                  isDarkMode
                    ? "bg-white/15 border-white/20"
                    : "bg-black/5 border-black/10"
                }`}
              >
                <span className="font-bold text-xs opacity-90">Sound</span>
                <div className="relative flex items-center bg-white/90 rounded-full h-8 px-3 overflow-hidden shadow-inner">
                  {volume === 0 ? (
                    <FaVolumeMute className="text-zinc-800 text-xs z-10 pointer-events-none" />
                  ) : (
                    <FaVolumeUp className="text-zinc-800 text-xs z-10 pointer-events-none" />
                  )}
                  <span className="text-xs font-bold text-zinc-800 ml-2 z-10 pointer-events-none">
                    {volume}%
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                  />
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-white transition-all pointer-events-none"
                    style={{ width: `${volume}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clock */}
        <span className="text-[11px] font-medium tracking-tight ml-0.5">
          {time || "Wed 19:08"}
        </span>
      </div>
    </header>
  );
}