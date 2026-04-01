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
              </div>
              <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 py-1">
                <span className="flex items-center gap-2"><FaWifi className="text-gray-400" /> CoffeeShop_Guest</span>
                <span className="text-gray-400 text-[10px]">Saved</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 py-1">
                <span className="flex items-center gap-2"><FaWifi className="text-gray-400" /> Office_Wi-Fi</span>
                <span className="text-gray-400 text-[10px]">Saved</span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Ask to join networks</span>
              <Toggle enabled={askToJoin} onToggle={() => setAskToJoin(!askToJoin)} />
            </div>
          </div>
        );

      case "Bluetooth":
        return (
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200">Bluetooth</div>
                <div className="text-[11px] text-gray-500">Discoverable as Bikash's MacBook Pro</div>
              </div>
              <Toggle enabled={bluetoothActive} onToggle={toggleBluetooth} />
            </div>

            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl p-4 space-y-3">
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200">My Devices</div>
              <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 py-1">
                <span>AirPods Pro</span>
                <span className="text-emerald-500 font-medium text-[11px]">Connected</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 py-1">
                <span>Magic Keyboard</span>
                <span className="text-gray-400 text-[11px]">Not Connected</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 py-1">
                <span>MX Master 3S</span>
                <span className="text-emerald-500 font-medium text-[11px]">Connected</span>
              </div>
            </div>
          </div>
        );

      case "Appearance":
        return (
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl p-4">
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-3">Appearance Theme</div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setDarkMode("light")}
                  className={`p-3 rounded-lg text-center text-xs font-medium ${
                    darkMode === "light" ? "bg-blue-50 dark:bg-zinc-800 text-blue-600" : "bg-gray-100 dark:bg-zinc-800/50"
                  }`}
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => setDarkMode("dark")}
                  className={`p-3 rounded-lg text-center text-xs font-medium ${
                    darkMode === "dark" ? "bg-blue-50 dark:bg-zinc-800 text-blue-600" : "bg-gray-100 dark:bg-zinc-800/50"
                  }`}
                >
                  🌙 Dark
                </button>
                <button
                  onClick={() => setDarkMode("auto")}
                  className={`p-3 rounded-lg text-center text-xs font-medium ${
                    darkMode === "auto" ? "bg-blue-50 dark:bg-zinc-800 text-blue-600" : "bg-gray-100 dark:bg-zinc-800/50"
                  }`}
                >
                  🔄 Auto
                </button>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Accent Color</span>
              <div className="flex gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-blue-400 cursor-pointer"></span>
                <span className="w-4 h-4 rounded-full bg-purple-500 cursor-pointer"></span>
                <span className="w-4 h-4 rounded-full bg-pink-500 cursor-pointer"></span>
                <span className="w-4 h-4 rounded-full bg-orange-500 cursor-pointer"></span>
              </div>
            </div>
          </div>
        );

      case "General":
        return (
          <>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center text-white shadow-md mb-2">
                <span className="text-3xl">⚙️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">General</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                Manage overall preferences, software updates, language settings, and system tools.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl shadow-xs overflow-hidden">
              {generalSubItems.map((sub, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-100/60 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{sub.icon}</span>
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                      {sub.title}
                    </span>
                  </div>
                  <FiChevronRight className="text-gray-400" size={14} />
                </div>
              ))}
            </div>
          </>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 rounded-xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">{selectedSetting}</h3>
              <p className="text-xs text-gray-500 mb-4">Configure and customize options for {selectedSetting}.</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Enable feature for {selectedSetting}</span>
                  <Toggle enabled={true} onToggle={() => {}} />
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Allow background process</span>
                  <Toggle enabled={autoUnlock} onToggle={() => setAutoUnlock(!autoUnlock)} />
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Reduce Motion & Animations</span>
                  <Toggle enabled={reduceMotion} onToggle={() => setReduceMotion(!reduceMotion)} />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <style>{scrollbarHideStyle}</style>

      {/* ==================== DESKTOP MACOS LAYOUT ==================== */}
      <div className="hidden lg:flex w-full h-screen bg-[#e8e8e8] dark:bg-[#1e1e1e] items-center justify-center p-6 text-gray-800 dark:text-gray-100 select-none">
        {/* Outer Container without internal center dividing border */}
        <div className="w-[980px] h-[640px] bg-[#f6f6f6] dark:bg-[#282828] rounded-xl shadow-2xl overflow-hidden flex">
          
          {/* LEFT SIDEBAR (No right border) */}
          <div className="w-[280px] bg-[#e8e8e8]/70 dark:bg-[#202020]/80 flex flex-col p-3 backdrop-blur-md">
            
            {/* Sidebar Search Bar */}
            <div className="relative mb-3 pt-1">
              <FiSearch className="absolute left-2.5 top-3.5 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-200/80 dark:bg-zinc-700/60 text-xs text-gray-800 dark:text-gray-200 pl-8 pr-3 py-1.5 rounded-md outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-gray-400"
              />
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200/60 dark:hover:bg-zinc-700/40 cursor-pointer mb-2 transition-colors">
              <img
                src={profile}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="overflow-hidden">
                <div className="font-medium text-xs leading-tight text-gray-900 dark:text-gray-100 truncate">
                  Bikash Dalapati
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  Apple Account
                </div>
              </div>
            </div>

            {/* Nav Items Scrollable List */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5 pr-1">
              {sidebarNavItems
                .filter((item) =>
                  item.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => {
                  const isSelected = selectedSetting === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedSetting(item.id)}
                      className={`flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-zinc-700/50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-white shrink-0 mr-2.5 ${
                          typeof item.icon === "string" ? "bg-transparent text-sm" : item.bg
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.right && (
                        <div onClick={(e) => e.stopPropagation()}>
                          {item.right}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT MAIN PANEL / PREVIEW (No left border) */}
          <div className="flex-1 flex flex-col bg-[#f6f6f6] dark:bg-[#282828] overflow-hidden relative">
            {/* Top Navigation Header */}
            <div className="flex items-center justify-between px-6 pt-4 pb-2 text-gray-500 shrink-0">
              <div className="flex items-center gap-3">
                <button className="hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">
                  <FiChevronLeft size={18} />
                </button>
                <button className="hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">
                  <FiChevronRight size={18} />
                </button>
              </div>

              {selectedSetting === "Battery" && (
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-200">
                  <span className="text-sm">Battery</span>
                  <span className="flex items-center gap-1.5 text-gray-500 font-normal">
                    {renderBatteryIcon(deviceBatteryLevel)} Battery Level: {deviceBatteryLevel}%
                  </span>
                </div>
              )}
            </div>

            {/* Scrollable Settings Content Area */}
            <div className="px-8 py-4 max-w-2xl mx-auto w-full flex-1 overflow-y-auto no-scrollbar pb-16">
              {renderDetailPane()}
            </div>

            {/* Bottom Actions */}
            {selectedSetting === "Battery" && (
              <div className="absolute bottom-3 right-6 flex items-center gap-2 bg-[#f6f6f6]/90 dark:bg-[#282828]/90 py-1 pl-2 rounded-lg">
                <button className="bg-gray-200/80 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-md transition-colors shadow-xs">
                  Options...
                </button>
                <button className="bg-gray-200/80 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold transition-colors shadow-xs">
                  ?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT (UNCHANGED) ==================== */}
      <div className="lg:hidden bg-black h-screen overflow-y-auto text-white flex justify-center select-none">
        <div className="w-full max-w-md px-4 pt-20 sm:pt-6 pb-6">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          {/* Apple ID Card */}
          <div className="bg-[#1C1C1E] hover:bg-[#2C2C2E] transition-colors rounded-3xl p-5 mb-5 cursor-pointer">
            <div className="flex items-center">
              <img
                src={profile}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-2xl font-semibold">Bikash Dalapati</h2>
                <p className="text-gray-400 text-sm">
                  Apple Account, iCloud and more
                </p>
              </div>
              <FiChevronRight className="text-gray-500" size={22} />
            </div>

            <div className="border-t border-gray-700 my-4"></div>

            <div className="flex justify-between items-center">
              <span className="text-base">iCloud Storage Almost Full</span>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center text-xs font-semibold">
                  1
                </div>
                <FiChevronRight className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Software Update Card */}
          <div className="bg-[#1C1C1E] hover:bg-[#2C2C2E] transition-colors rounded-2xl p-5 flex justify-between items-center mb-5 cursor-pointer">
            <span className="text-base">Software Update Available</span>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center text-xs font-semibold">
                1
              </div>
              <FiChevronRight className="text-gray-500" />
            </div>
          </div>

          {/* Mobile Settings List */}
          <div className="bg-[#1C1C1E] rounded-3xl overflow-hidden">
            {mobileSettings.map((item, index) => (
              <div
                key={index}
                className={`flex items-center px-4 py-3 border-b border-gray-800 last:border-none transition-colors ${
                  !item.right ? "cursor-pointer hover:bg-[#2C2C2E]" : ""
                }`}
              >
                <div
                  className={`${item.bg} w-8 h-8 rounded-lg flex justify-center items-center text-white text-base shrink-0`}
                >
                  {item.icon}
                </div>

                <span className="ml-4 flex-1 text-base">{item.title}</span>

                {item.right ? (
                  item.right
                ) : (
                  <FiChevronRight className="text-gray-500" size={18} />
                )}
              </div>
            ))}
          </div>

          <div className="h-24"></div>
        </div>

        {/* Mobile Bottom Search Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md px-4 pb-5 pt-2 flex justify-center">
          <div className="max-w-md w-full bg-[#2C2C2E] rounded-full px-4 py-2.5 flex items-center">
            <FiSearch className="text-gray-400 cursor-pointer" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none flex-1 ml-3 text-white placeholder-gray-500 text-sm cursor-text"
            />
            <FiMic className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </>
  );
}