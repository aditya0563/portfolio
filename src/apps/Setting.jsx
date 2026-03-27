import React, { useState, useEffect } from "react";
import profile from "../assets/profile-photo.jpeg";
import {
  FiChevronRight,
  FiChevronLeft,
  FiSearch,
  FiMic,
  FiInfo,
} from "react-icons/fi";

import {
  FaWifi,
  FaBluetoothB,
  FaBatteryThreeQuarters,
  FaBatteryFull,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaGlobe,
  FaUniversalAccess,
  FaSun,
  FaSlidersH,
  FaDesktop,
  FaTv,
  FaSearch,
  FaImage,
  FaInfoCircle,
  FaHdd,
  FaApple,
  FaBroadcastTower,
  FaKey,
  FaClock,
  FaLanguage,
  FaThList,
  FaShieldAlt,
  FaVolumeUp,
  FaBell,
  FaMoon,
  FaHourglassHalf,
  FaLock,
  FaFingerprint,
} from "react-icons/fa";

import {
  MdAirplanemodeActive,
  MdSignalCellularAlt,
  MdLink,
  MdRefresh,
} from "react-icons/md";

// Custom scrollbar hiding style tag
const scrollbarHideStyle = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

// Toggle Switch Component
const Toggle = ({ enabled, onToggle }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      if (typeof onToggle === "function") {
        onToggle();
      }
    }}
    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer ${
      enabled ? "bg-blue-500" : "bg-gray-300 dark:bg-zinc-600"
    }`}
  >
    <div
      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
        enabled ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export default function Settings({
  isWifiActive: externalWifi,
  setIsWifiActive: setExternalWifi,
  isBluetooth: externalBt,
  setIsBluetooth: setExternalBt,
}) {
  // Device Battery State Sync
  const [deviceBatteryLevel, setDeviceBatteryLevel] = useState(87);

  useEffect(() => {
    let batteryObj = null;

    const updateBattery = (battery) => {
      const level = Math.round(battery.level * 100);
      setDeviceBatteryLevel(level);
    };

    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        batteryObj = battery;
        updateBattery(battery);

        battery.addEventListener("levelchange", () => updateBattery(battery));
      });
    }

    return () => {
      if (batteryObj) {
        batteryObj.removeEventListener("levelchange", () => updateBattery(batteryObj));
      }
    };
  }, []);

  // Dynamic Battery Icon Selection
  const renderBatteryIcon = (level) => {
    if (level > 80) return <FaBatteryFull size={15} className="text-gray-700 dark:text-gray-200" />;
    if (level > 40) return <FaBatteryThreeQuarters size={15} className="text-gray-700 dark:text-gray-200" />;
    if (level > 20) return <FaBatteryHalf size={15} className="text-gray-700 dark:text-gray-200" />;
    return <FaBatteryQuarter size={15} className="text-red-500" />;
  };

  // Local fallback states
  const [localWifi, setLocalWifi] = useState(true);
  const [localBt, setLocalBt] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);

  // Active selection for macOS sidebar layout
  const [selectedSetting, setSelectedSetting] = useState("Battery");
  const [searchTerm, setSearchTerm] = useState("");
  const [batteryTab, setBatteryTab] = useState("24h");

  // Sub-settings mock toggles
  const [askToJoin, setAskToJoin] = useState(true);
  const [autoUnlock, setAutoUnlock] = useState(true);
  const [darkMode, setDarkMode] = useState("auto");
  const [reduceMotion, setReduceMotion] = useState(false);

  const wifiActive = externalWifi !== undefined ? externalWifi : localWifi;
  const toggleWifi = () => {
    if (setExternalWifi) {
      setExternalWifi((prev) => !prev);
    } else {
      setLocalWifi((prev) => !prev);
    }
  };

  const bluetoothActive = externalBt !== undefined ? externalBt : localBt;
  const toggleBluetooth = () => {
    if (setExternalBt) {
      setExternalBt((prev) => !prev);
    } else {
      setLocalBt((prev) => !prev);
    }
  };

  // macOS Sidebar Items
  const sidebarNavItems = [
    { id: "Wi-Fi", icon: <FaWifi size={13} />, bg: "bg-blue-500", title: "Wi-Fi", right: <Toggle enabled={wifiActive} onToggle={toggleWifi} /> },
    { id: "Bluetooth", icon: <FaBluetoothB size={13} />, bg: "bg-blue-500", title: "Bluetooth", right: <Toggle enabled={bluetoothActive} onToggle={toggleBluetooth} /> },
    { id: "Network", icon: <FaGlobe size={13} />, bg: "bg-blue-500", title: "Network" },
    { id: "VPN", icon: <FaShieldAlt size={13} />, bg: "bg-blue-500", title: "VPN" },
    { id: "Notifications", icon: <FaBell size={13} />, bg: "bg-red-500", title: "Notifications" },
    { id: "Sound", icon: <FaVolumeUp size={13} />, bg: "bg-pink-500", title: "Sound" },
    { id: "Focus", icon: <FaMoon size={13} />, bg: "bg-indigo-500", title: "Focus" },
    { id: "Screen Time", icon: <FaHourglassHalf size={13} />, bg: "bg-purple-500", title: "Screen Time" },
    { id: "General", icon: "⚙️", bg: "bg-gray-400", title: "General" },
    { id: "Appearance", icon: <FaSun size={13} />, bg: "bg-black", title: "Appearance" },
    { id: "Accessibility", icon: <FaUniversalAccess size={13} />, bg: "bg-blue-500", title: "Accessibility" },
    { id: "Control Center", icon: <FaSlidersH size={13} />, bg: "bg-gray-400", title: "Control Center" },
    { id: "Siri & Spotlight", icon: <FaSearch size={13} />, bg: "bg-black", title: "Siri & Spotlight" },
    { id: "Privacy & Security", icon: <FaShieldAlt size={13} />, bg: "bg-blue-600", title: "Privacy & Security" },
    { id: "Desktop & Dock", icon: <FaDesktop size={13} />, bg: "bg-black", title: "Desktop & Dock" },
    { id: "Displays", icon: <FaTv size={13} />, bg: "bg-blue-400", title: "Displays" },
    { id: "Wallpaper", icon: <FaImage size={13} />, bg: "bg-cyan-500", title: "Wallpaper" },
    { id: "Screen Saver", icon: "🌌", bg: "bg-teal-500", title: "Screen Saver" },
    { id: "Battery", icon: <FaBatteryThreeQuarters size={13} />, bg: "bg-green-500", title: "Battery" },
    { id: "Lock Screen", icon: <FaLock size={13} />, bg: "bg-gray-600", title: "Lock Screen" },
    { id: "Touch ID & Passcode", icon: <FaFingerprint size={13} />, bg: "bg-pink-600", title: "Touch ID & Passcode" },
  ];

  // General Section Items
  const generalSubItems = [
    { title: "About", icon: <FaInfoCircle className="text-gray-500" /> },
    { title: "Software Update", icon: <MdRefresh className="text-gray-500" /> },
    { title: "Storage", icon: <FaHdd className="text-gray-500" /> },
    { title: "AppleCare & Warranty", icon: <FaApple className="text-red-500" /> },
    { title: "AirDrop & Handoff", icon: <FaBroadcastTower className="text-blue-500" /> },
    { title: "AutoFill & Passwords", icon: <FaKey className="text-gray-500" /> },
    { title: "Date & Time", icon: <FaClock className="text-blue-500" /> },
    { title: "Language & Region", icon: <FaLanguage className="text-blue-500" /> },
    { title: "Login Items & Extensions", icon: <FaThList className="text-gray-500" /> },
  ];

  // Mobile list items
  const mobileSettings = [
    { icon: <MdAirplanemodeActive size={22} />, bg: "bg-orange-500", title: "Airplane Mode", right: <Toggle enabled={airplaneMode} onToggle={() => setAirplaneMode((prev) => !prev)} /> },
    { icon: <FaWifi size={18} />, bg: "bg-blue-500", title: "Wi-Fi", right: <Toggle enabled={wifiActive} onToggle={toggleWifi} /> },
    { icon: <FaBluetoothB size={18} />, bg: "bg-blue-500", title: "Bluetooth", right: <Toggle enabled={bluetoothActive} onToggle={toggleBluetooth} /> },
    { icon: <MdSignalCellularAlt size={18} />, bg: "bg-green-500", title: "Mobile Service" },
    { icon: <MdLink size={18} />, bg: "bg-green-500", title: "Personal Hotspot" },
    { icon: <FaBatteryThreeQuarters size={18} />, bg: "bg-green-500", title: "Battery" },
    { icon: "🔔", bg: "bg-red-500", title: "Notifications" },
    { icon: "🔊", bg: "bg-pink-500", title: "Sounds & Haptics" },
    { icon: "🌙", bg: "bg-indigo-500", title: "Focus" },
    { icon: "⏱", bg: "bg-purple-500", title: "Screen Time" },
    { icon: "⚙️", bg: "bg-gray-500", title: "General" },
    { icon: "🎮", bg: "bg-gray-700", title: "Game Center" },
    { icon: "💡", bg: "bg-yellow-500", title: "Display & Brightness" },
    { icon: "🔒", bg: "bg-blue-500", title: "Privacy & Security" },
    { icon: "💳", bg: "bg-black", title: "Wallet & Apple Pay" },
    { icon: "📦", bg: "bg-gray-600", title: "Apps" },
    { icon: "❤️", bg: "bg-red-500", title: "Health" },
    { icon: "📷", bg: "bg-gray-500", title: "Camera" },
    { icon: "🎵", bg: "bg-pink-600", title: "Music" },
    { icon: "📺", bg: "bg-black", title: "TV" },
    { icon: "📞", bg: "bg-green-500", title: "Phone" },
    { icon: "💬", bg: "bg-green-600", title: "Messages" },
    { icon: "✉️", bg: "bg-blue-500", title: "Mail" },
  ];

  // Chart bar heights relative to synchronized battery level
  const batteryLevelBars = [
    98, 97, 96, 95, 94, 92, 90, 89, 88, 87, 85, 95, 98, 100, 99, 98, 97, 95, 94, 92, 90, 88,
    deviceBatteryLevel, deviceBatteryLevel
  ];

  const screenUsageBars = [
    { height: "45%" }, { height: "0%" }, { height: "5%" }, { height: "0%" },
    { height: "18%" }, { height: "60%" }, { height: "60%" }, { height: "20%" },
    { height: "0%" }, { height: "2%" }, { height: "0%" }, { height: "0%" },
    { height: "22%" }, { height: "60%" }, { height: "42%" }, { height: "48%" },
    { height: "48%" },
  ];

  // Render detail contents
  const renderDetailPane = () => {
    switch (selectedSetting) {
      case "Battery":
        return (
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl px-4 py-3 flex items-center justify-between shadow-xs">
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                Low Power Mode
              </span>
              <div className="flex items-center gap-1 cursor-pointer bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">
                <span>Never</span>
                <span className="text-[10px] text-gray-500">▼</span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl px-4 py-3 flex items-center justify-between shadow-xs">
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                Battery Health
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Normal</span>
                <div className="relative group cursor-pointer flex items-center">
                  <FiInfo size={16} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:flex flex-col items-start bg-gray-900/95 text-white text-[11px] rounded-lg px-3 py-2 shadow-xl whitespace-nowrap z-50 transition-all">
                    <span className="font-semibold text-xs text-emerald-400">Battery Health: 100%</span>
                    <span className="text-gray-300 text-[10px] mt-0.5">Maximum Capacity: 100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl p-4 shadow-xs">
              <div className="bg-gray-200/60 dark:bg-zinc-800 p-0.5 rounded-lg flex text-xs font-medium mb-4">
                <button
                  onClick={() => setBatteryTab("24h")}
                  className={`flex-1 py-1 rounded-md transition-all ${
                    batteryTab === "24h"
                      ? "bg-blue-600 text-white shadow-xs font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  }`}
                >
                  Last 24 Hours
                </button>
                <button
                  onClick={() => setBatteryTab("10d")}
                  className={`flex-1 py-1 rounded-md transition-all ${
                    batteryTab === "10d"
                      ? "bg-blue-600 text-white shadow-xs font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  }`}
                >
                  Last 10 Days
                </button>
              </div>

              <div className="mb-4">
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Last charged to 100%
                </div>
                <div className="text-[11px] text-gray-400">Today, 5:06 AM</div>
              </div>

              <div className="mb-6">
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Battery Level
                </div>
                <div className="relative pb-2 flex items-end justify-between h-24 pt-2">
                  <div className="absolute right-0 inset-y-0 flex flex-col justify-between text-[10px] text-gray-400 pointer-events-none">
                    <span>100%</span>
                    <span>50%</span>
                    <span>0%</span>
                  </div>
                  <div className="flex items-end justify-between w-[90%] h-full px-2">
                    {batteryLevelBars.map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center h-full justify-end w-1.5">
                        <div style={{ height: `${val}%` }} className="w-full bg-emerald-500 rounded-t-xs hover:bg-emerald-400 transition-colors"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 pt-1 px-2 w-[90%]">
                  <span>12 P</span><span>3</span><span>6</span><span>9</span>
                  <span>12 A</span><span>3</span><span>6</span><span>9</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Screen On Usage
                </div>
                <div className="relative pb-2 flex items-end h-24 pt-2">
                  <div className="absolute right-0 inset-y-0 flex flex-col justify-between text-[10px] text-gray-400 pointer-events-none">
                    <span>60m</span><span>30m</span><span>0m</span>
                  </div>
                  <div className="flex items-end justify-between w-[90%] h-full px-2">
                    {screenUsageBars.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center h-full justify-end w-2">
                        {item.height !== "0%" && (
                          <div style={{ height: item.height }} className="w-full bg-blue-500 rounded-t-xs hover:bg-blue-400 transition-colors"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 pt-1 px-2 w-[90%]">
                  <span>12 P</span><span>3</span><span>6</span><span>9</span>
                  <span>12 A</span><span>3</span><span>6</span><span>9</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Wi-Fi":
        return (
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200">Wi-Fi</div>
                <div className="text-[11px] text-gray-500">Connected to Home_Network_5G</div>
              </div>
              <Toggle enabled={wifiActive} onToggle={toggleWifi} />
            </div>

            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl p-4 space-y-3">
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200">Known Networks</div>
              <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 py-1">
                <span className="flex items-center gap-2"><FaWifi className="text-blue-500" /> Home_Network_5G</span>
                <span className="text-gray-400 text-[10px]">Connected</span>
