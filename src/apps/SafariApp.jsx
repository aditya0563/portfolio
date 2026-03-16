import React, { useState } from "react";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaRedo, 
  FaShieldAlt, 
  FaLock, 
  FaPlus, 
  FaTimes, 
  FaSearch, 
  FaExternalLinkAlt 
} from "react-icons/fa";

export default function SafariApp() {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Google", url: "https://www.google.com/search?igu=1" },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [inputUrl, setInputUrl] = useState("https://www.google.com/search?igu=1");

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleNavigate = (e) => {
    e.preventDefault();
    let target = inputUrl.trim();
    if (!target) return;

    // Handle plain search queries vs URLs
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      if (target.includes(".") && !target.includes(" ")) {
        target = `https://${target}`;
      } else {
        target = `https://www.google.com/search?q=${encodeURIComponent(target)}&igu=1`;
      }
    }

    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? { ...tab, url: target, title: target.replace(/^https?:\/\//, "").split("/")[0] }
          : tab
      )
    );
  };

  const handleAddTab = () => {
    const newId = Date.now();
    const newTab = {
      id: newId,
      title: "New Tab",
      url: "https://www.google.com/search?igu=1",
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setInputUrl(newTab.url);
  };

  const handleCloseTab = (id, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Keep at least one tab open

    const filtered = tabs.filter((t) => t.id !== id);
    setTabs(filtered);

    if (activeTabId === id) {
      const nextActive = filtered[filtered.length - 1];
      setActiveTabId(nextActive.id);
      setInputUrl(nextActive.url);
    }
  };

  const handleSelectTab = (tab) => {
    setActiveTabId(tab.id);
    setInputUrl(tab.url);
  };

  return (
    <div className="w-full h-full bg-[#1e1e1e] text-white flex flex-col font-sans select-none overflow-hidden">
      
      {/* Top Browser Toolbar */}
      <div className="bg-[#2a2a2a] border-b border-white/10 px-3 pt-14 sm:pt-2 pb-2 flex flex-col gap-2 shrink-0">
        
        {/* Tab Bar */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pl-10 sm:pl-0">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => handleSelectTab(tab)}
                className={`group relative flex items-center justify-between gap-2 px-3 py-1.5 min-w-[100px] sm:min-w-[120px] max-w-[180px] rounded-t-lg text-xs font-medium cursor-pointer transition-all border-t border-x ${
                  isActive
                    ? "bg-[#1e1e1e] text-white border-white/10"
                    : "bg-[#222222] text-zinc-400 border-transparent hover:bg-[#282828]"
                }`}
              >
                <span className="truncate">{tab.title}</span>
