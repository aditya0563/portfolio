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
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className="p-0.5 rounded-full hover:bg-zinc-700 text-zinc-400 hover:text-white text-[10px] sm:opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Tab Button */}
          <button
            onClick={handleAddTab}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer ml-1 shrink-0"
            title="New Tab"
          >
            <FaPlus className="text-xs" />
          </button>
        </div>

        {/* Address Bar Row */}
        <div className="flex items-center gap-2 px-1">
          {/* Back / Forward / Refresh */}
          <div className="flex items-center gap-1 text-zinc-400 shrink-0">
            <button className="p-1.5 hover:text-white rounded hover:bg-white/5 transition-colors">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="p-1.5 hover:text-white rounded hover:bg-white/5 transition-colors">
              <FaChevronRight className="text-xs" />
            </button>
            <button
              onClick={() => {
                const iframe = document.getElementById(`safari-iframe-${activeTabId}`);
                if (iframe) iframe.src = iframe.src;
              }}
              className="p-1.5 hover:text-white rounded hover:bg-white/5 transition-colors"
              title="Reload"
            >
              <FaRedo className="text-xs" />
            </button>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleNavigate} className="flex-1 relative flex items-center min-w-0">
            <div className="absolute left-3 text-zinc-500 text-xs flex items-center gap-1.5 pointer-events-none">
              <FaLock className="text-[10px] text-emerald-500" />
            </div>

            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Search or enter website name"
              className="w-full bg-[#181818] border border-white/10 rounded-lg py-1.5 pl-8 pr-8 text-xs text-zinc-200 focus:outline-none focus:border-blue-500/50 transition-all font-mono truncate"
            />

            <button
              type="submit"
              className="absolute right-2 text-zinc-400 hover:text-white p-1 text-xs"
            >
              <FaSearch />
            </button>
          </form>

          {/* Privacy & External Link */}
          <div className="flex items-center gap-1 text-zinc-400 shrink-0">
            <button className="p-1.5 hover:text-white rounded hover:bg-white/5 transition-colors" title="Privacy Report">
              <FaShieldAlt className="text-xs text-emerald-400" />
            </button>
            <a
              href={activeTab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-white rounded hover:bg-white/5 transition-colors"
              title="Open in external browser"
            >
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>

      </div>

      {/* Webview Viewport scaled for Mobile & Desktop */}
      <div className="flex-1 bg-white relative overflow-hidden w-full h-full">
        <iframe
          id={`safari-iframe-${activeTabId}`}
          src={activeTab.url}
          title={activeTab.title}
          className="border-none w-[160%] h-[160%] scale-[0.625] origin-top-left sm:w-full sm:h-full sm:scale-100"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

    </div>
  );
}