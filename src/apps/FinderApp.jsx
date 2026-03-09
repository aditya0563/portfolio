import React, { useState, useMemo, useEffect } from "react";
import {
  FaClock,
  FaThLarge,
  FaList,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaTag,
  FaEllipsisH,
  FaDownload,
  FaDesktop,
  FaFileAlt,
  FaCloud,
  FaUsers,
  FaLaptop,
  FaHdd,
  FaTrash,
  FaNetworkWired,
  FaFileCode,
  FaFilePdf,
  FaFileImage,
  FaFileArchive,
  FaFolder,
  FaExternalLinkAlt,
} from "react-icons/fa";

// --- COMPLETE STATIC DATABASE ---
const FILE_DATABASE = [
  // ==================== 1. RECENTS ====================
  {
    id: "f1",
    name: "Bikash_Resume.pdf",
    fullName: "Bikash_Resume.pdf",
    category: "recents",
    type: "PDF Document",
    size: "245 KB",
    iconType: "pdf",
    description: "Official resume detailing full-stack MERN development, DSA problem-solving, and engineering credentials.",
    downloadable: true,
  },
  {
    id: "f2",
    name: "UI_Design.png",
    fullName: "UI_Design.png",
    category: "recents",
    type: "PNG Image",
    size: "3.2 MB",
    iconType: "image",
    imagePreview: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80",
    description: "UI design mockup showcasing high-performance automotive aesthetics and layouts.",
  },
  {
    id: "f3",
    name: "App.tsx",
    fullName: "App.tsx",
    category: "recents",
    type: "TypeScript React",
    size: "12 KB",
    iconType: "react",
    description: "Main application root component managing React states, routes, and layout modules.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "f4",
    name: "LockScreen.png",
    fullName: "LockScreen.png",
    category: "recents",
    type: "PNG Image",
    size: "2.1 MB",
    iconType: "image",
    description: "Lock screen design asset with blur overlay and customized lock UI widgets.",
  },
  {
    id: "f5",
    name: "OpenWindow.png",
    fullName: "OpenWindow.png",
    category: "recents",
    type: "PNG Image",
    size: "4.5 MB",
    iconType: "image",
    description: "Screen capture showing multiple active workspace windows and terminal instances.",
  },
  {
    id: "f6",
    name: "Profile.png",
    fullName: "Profile.png",
    category: "recents",
    type: "PNG Image",
    size: "1.8 MB",
    iconType: "image",
    description: "Profile portrait artwork with stylized backdrop.",
  },
  {
    id: "f7",
    name: "LandingPage.png",
    fullName: "LandingPage.png",
    category: "recents",
    type: "PNG Image",
    size: "3.9 MB",
    iconType: "image",
    description: "Hero section landing page design featuring dynamic welcome text overlay.",
  },
  {
    id: "f8",
    name: "SystemInfo.jpg",
    fullName: "SystemInfo.jpg",
    category: "recents",
    type: "JPEG Image",
    size: "1.4 MB",
    iconType: "image",
    description: "System specifications widget window rendering configuration stats.",
  },

  // ==================== 2. APPLICATIONS ====================
  { id: "app-finder", name: "Finder", fullName: "Finder.app", category: "applications", type: "macOS System Application", size: "42.1 MB", iconType: "app-icon", appIcon: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png", description: "Default macOS file manager and desktop environment shell." },
  { id: "app-terminal", name: "Terminal", fullName: "Terminal.app", category: "applications", type: "System Utility", size: "12.4 MB", iconType: "app-icon", appIcon: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png", description: "Command-line interface for system administration and execution." },
  { id: "app-calendar", name: "Calendar", fullName: "Calendar.app", category: "applications", type: "Productivity App", size: "18.6 MB", iconType: "app-icon", appIcon: "https://p1.hiclipart.com/preview/281/939/689/ios-7-alt-icons-calendar-png-icon.jpg", description: "Schedule tracker and event management application." },
  { id: "app-safari", name: "Safari", fullName: "Safari.app", category: "applications", type: "Web Browser", size: "85.2 MB", iconType: "app-icon", appIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMyU_UpA41LcZgCx2sSqHF8pEYcMaP7rFzjxBFbedV6KNVBkJEDES8So9&s=10", description: "Fast, privacy-focused web browser built for macOS." },
  { id: "app-music", name: "Music", fullName: "Apple Music.app", category: "applications", type: "Media Player", size: "34.8 MB", iconType: "app-icon", appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/3840px-Apple_Music_icon.svg.png", description: "Stream high-fidelity audio tracks and personalized playlists." },
  { id: "app-settings", name: "System Settings", fullName: "System Settings.app", category: "applications", type: "System Utility", size: "28.3 MB", iconType: "app-icon", appIcon: "https://cdn.iconscout.com/icon/free/png-256/free-apple-settings-icon-svg-download-png-493162.png?f=webp", description: "Manage system preferences, displays, and security controls." },
  { id: "app-github", name: "GitHub", fullName: "GitHub Desktop.app", category: "applications", type: "Developer Tool", size: "112.0 MB", iconType: "app-icon", appIcon: "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png", description: "Version control dashboard for managing repositories and pull requests." },
  { id: "app-linkedin", name: "LinkedIn", fullName: "LinkedIn.app", category: "applications", type: "Social Application", size: "15.4 MB", iconType: "app-icon", appIcon: "https://api.iconify.design/devicon:linkedin.svg", description: "Professional networking platform and career client." },
  { id: "app-vscode", name: "VS Code", fullName: "Visual Studio Code.app", category: "applications", type: "Code Editor", size: "180.5 MB", iconType: "app-icon", appIcon: "https://api.iconify.design/logos:visual-studio-code.svg", description: "Lightweight source code editor with built-in debugging and extensions." },

  // ==================== 3. DOWNLOADS ====================
  { id: "dl-1", name: "node-v20.11.0.pkg", fullName: "node-v20.11.0.pkg", category: "downloads", type: "Installer Package", size: "78.4 MB", iconType: "archive", description: "Node.js runtime environment v20.11.0 installer package." },
  { id: "dl-2", name: "mongodb-mac.zip", fullName: "mongodb-mac.zip", category: "downloads", type: "ZIP Archive", size: "142.1 MB", iconType: "archive", description: "Compressed MongoDB Community Server binaries for macOS ARM64." },
  { id: "dl-3", name: "Portfolio_V2.zip", fullName: "Portfolio_V2.zip", category: "downloads", type: "ZIP Archive", size: "45.2 MB", iconType: "archive", description: "Exported backup archive of the portfolio web application codebase." },
  { id: "dl-4", name: "wallpaper_4k.jpg", fullName: "wallpaper_4k.jpg", category: "downloads", type: "JPEG Image", size: "8.5 MB", iconType: "image", description: "Ultra-HD 4K wallpaper asset." },

  // ==================== 4. DESKTOP ====================
  { id: "dt-1", name: "MERN_Project", fullName: "MERN_Project", category: "desktop", type: "Folder", size: "--", iconType: "folder", description: "Active working directory for full-stack MERN application development." },
  { id: "dt-2", name: "DSA_Sheet.pdf", fullName: "DSA_Sheet.pdf", category: "desktop", type: "PDF Document", size: "1.2 MB", iconType: "pdf", description: "Curated Data Structures & Algorithms practice problems guide." },
  { id: "dt-3", name: "Portfolio.code-workspace", fullName: "Portfolio.code-workspace", category: "desktop", type: "VS Code Workspace", size: "4 KB", iconType: "react", description: "VS Code multi-root workspace file for rapid development." },

  // ==================== 5. DOCUMENTS ====================
  { id: "doc-1", name: "System_Architecture.pdf", fullName: "System_Architecture.pdf", category: "documents", type: "PDF Document", size: "3.4 MB", iconType: "pdf", description: "High-level architectural blueprint for real-time socket microservices." },
  { id: "doc-2", name: "Academic_Transcripts.pdf", fullName: "Academic_Transcripts.pdf", category: "documents", type: "PDF Document", size: "890 KB", iconType: "pdf", description: "Verified computer science engineering semester transcripts." },
  { id: "doc-3", name: "Database_Schema.sql", fullName: "Database_Schema.sql", category: "documents", type: "SQL Script", size: "18 KB", iconType: "react", description: "Relational database schema initialization script and sample seed data." },

  // ==================== 6. ICLOUD DRIVE ====================
  { id: "ic-1", name: "Cloud_Notes.txt", fullName: "Cloud_Notes.txt", category: "icloud", type: "Plain Text", size: "14 KB", iconType: "pdf", description: "Synced markdown study notes on Operating Systems and Database Systems." },
  { id: "ic-2", name: "Backup_Configs.json", fullName: "Backup_Configs.json", category: "icloud", type: "JSON Document", size: "6 KB", iconType: "react", description: "Personalized editor, shell, and keybinding configurations backup." },

  // ==================== 7. SHARED ====================
  { id: "sh-1", name: "Team_UI_Assets", fullName: "Team_UI_Assets", category: "shared", type: "Shared Folder", size: "--", iconType: "folder", description: "Shared team drive containing high-resolution graphics, logos, and UI component exports." },

  // ==================== 8. MAC LOCATION ====================
  { id: "mac-1", name: "Tom HD", fullName: "Tom HD", category: "tommac", type: "Internal Volume", size: "512 GB", iconType: "folder", description: "Primary internal solid-state drive root partition." },
  { id: "mac-2", name: "Users", fullName: "Users", category: "tommac", type: "System Directory", size: "128 GB", iconType: "folder", description: "User profiles directory containing workspace files." },

  // ==================== 9. HARD DRIVE ====================
  { id: "hd-1", name: "Applications", fullName: "Applications", category: "harddrive", type: "System Directory", size: "48 GB", iconType: "folder", description: "Installed macOS binary applications and system software." },
  { id: "hd-2", name: "System", fullName: "System", category: "harddrive", type: "System Directory", size: "22 GB", iconType: "folder", description: "Core macOS operating system kernels and framework libraries." },
  { id: "hd-3", name: "Library", fullName: "Library", category: "harddrive", type: "System Directory", size: "18 GB", iconType: "folder", description: "Shared system support files, caches, and application preferences." },

  // ==================== 10. BIN ====================
  { id: "bin-1", name: "old_draft.tmp", fullName: "old_draft.tmp", category: "bin", type: "Temporary File", size: "120 KB", iconType: "pdf", description: "Deleted draft text file ready for permanent erasure." },

  // ==================== 11. NETWORK ====================
  { id: "net-1", name: "Local_Dev_Server", fullName: "Local_Dev_Server", category: "network", type: "Network Host", size: "--", iconType: "folder", description: "Local development server connected via LAN endpoint." },
];

// --- SIDEBAR STRUCTURE ---
const SIDEBAR_SECTIONS = [
  {
    title: "FAVORITES",
    items: [
      { id: "recents", label: "Recents", icon: FaClock },
      { id: "applications", label: "Applications", icon: FaThLarge },
      { id: "downloads", label: "Downloads", icon: FaDownload },
      { id: "desktop", label: "Desktop", icon: FaDesktop },
      { id: "documents", label: "Documents", icon: FaFileAlt },
    ],
  },
  {
    title: "ICLOUD",
    items: [
      { id: "icloud", label: "iCloud Drive", icon: FaCloud },
      { id: "shared", label: "Shared", icon: FaUsers },
    ],
  },
  {
    title: "LOCATIONS",
    items: [
      { id: "tommac", label: "Tom's Mac", icon: FaLaptop },
      { id: "harddrive", label: "Tom HD", icon: FaHdd },
      { id: "bin", label: "Bin", icon: FaTrash },
      { id: "network", label: "Network", icon: FaNetworkWired },
    ],
  },
];

// 1. ADDED `initialCategory` PROP
export default function FinderApp({ initialCategory = "recents" }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // 2. ADDED EFFECT TO SYNC CATEGORY WHEN DISPATCHED FROM DOCK / PARENT
  useEffect(() => {
    setActiveCategory(initialCategory);
    const firstMatch = FILE_DATABASE.find((f) => f.category === initialCategory);
    setSelectedFile(firstMatch || null);
  }, [initialCategory]);

  // Filter items dynamically based on category and search
  const filteredFiles = useMemo(() => {
    return FILE_DATABASE.filter((file) => {
      // Show files matching the category specifically
      const matchesCategory = file.category === activeCategory;
      const matchesSearch = file.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Update selection when category switches manually from sidebar
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    const firstMatch = FILE_DATABASE.find((f) => f.category === catId);
    setSelectedFile(firstMatch || null);
  };

  // Dynamic header title helper
  const getHeaderTitle = (category) => {
    if (category === "tommac") return "Tom's Mac";
    if (category === "harddrive") return "Tom HD";
    if (category === "bin") return "Bin";
    return category;
  };

  // Icon Render Helper
  const renderFileIcon = (file) => {
    if (!file) return null;

    if (file.iconType === "app-icon" && file.appIcon) {
      return (
        <img
          src={file.appIcon}
          alt={file.fullName}
          className="w-12 h-12 object-contain drop-shadow-md"
        />
      );
    }
    if (file.iconType === "folder") {
      return (
        <div className="w-12 h-12 flex items-center justify-center text-blue-400 text-4xl drop-shadow">
          <FaFolder />
        </div>
      );
    }
    if (file.iconType === "archive") {
      return (
        <div className="w-12 h-12 flex items-center justify-center text-amber-500 text-4xl drop-shadow">
          <FaFileArchive />
        </div>
      );
    }
    if (file.iconType === "pdf") {
      return (
        <div className="w-12 h-14 bg-white rounded-md shadow border border-zinc-300 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full bg-red-600 py-0.5 text-[9px] font-black text-white text-center uppercase">
            PDF
          </div>
          <FaFilePdf className="text-red-500 text-lg mt-1" />
        </div>
      );
    }
    if (file.iconType === "react") {
      return (
        <div className="w-12 h-12 bg-[#1e1e24] rounded-xl border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl shadow">
          <FaFileCode />
        </div>
      );
    }
    return (
      <div className="w-14 h-11 rounded bg-zinc-800 border border-white/10 overflow-hidden shadow flex items-center justify-center relative">
        {file.imagePreview ? (
          <img
            src={file.imagePreview}
            alt={file.fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaFileImage className="text-zinc-500 text-lg" />
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col font-sans select-none overflow-hidden bg-[#1e1e1e] text-zinc-200">
      
      {/* 1. TOP HEADER TOOLBAR */}
      <div className="px-4 py-2 bg-[#282828] border-b border-black/40 flex items-center justify-between shrink-0">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <button className="hover:text-zinc-200 transition-colors p-1">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="hover:text-zinc-200 transition-colors p-1">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
          <span className="text-xs font-semibold text-zinc-200 tracking-wide capitalize">
            {getHeaderTitle(activeCategory)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggles */}
          <div className="flex items-center bg-zinc-800 p-0.5 rounded-lg border border-white/5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded text-xs transition-all ${
                viewMode === "grid"
                  ? "bg-zinc-700 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded text-xs transition-all ${
                viewMode === "list"
                  ? "bg-zinc-700 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FaList />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-zinc-400 text-xs px-1">
            <button className="hover:text-white transition-colors"><FaShareAlt /></button>
            <button className="hover:text-white transition-colors"><FaTag /></button>
            <button className="hover:text-white transition-colors"><FaEllipsisH /></button>
          </div>

          {/* Search Box */}
          <div className="relative w-40 sm:w-52">
            <FaSearch className="absolute left-2.5 top-2.5 text-[10px] text-zinc-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-md pl-7 pr-3 py-1 text-xs text-zinc-100 placeholder-zinc-500 outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* 2. MAIN BODY */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-48 bg-[#252526] border-r border-black/40 p-3 flex flex-col shrink-0 overflow-y-auto space-y-4">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="text-[10px] font-bold text-zinc-500 tracking-wider px-2">
                {section.title}
              </div>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeCategory === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleCategoryChange(item.id)}
                      className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#374e75] text-white"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`text-xs ${isActive ? "text-blue-300" : "text-blue-400"}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Center Grid/List View Area */}
        <div className="flex-1 p-5 overflow-y-auto bg-[#1a1a1a]">
          {filteredFiles.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-zinc-500 font-mono">
              Directory is empty
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
              {filteredFiles.map((file) => {
                const isSelected = selectedFile?.id === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-600/30 border border-blue-500/50"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-center h-14">
                      {renderFileIcon(file)}
                    </div>
                    <span className="text-xs font-medium text-zinc-200 text-center truncate w-full px-1">
                      {file.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              <div className="grid grid-cols-12 px-3 py-1 text-[10px] font-bold text-zinc-500 border-b border-white/5">
                <span className="col-span-7">Name</span>
                <span className="col-span-3">Kind</span>
                <span className="col-span-2 text-right">Size</span>
              </div>
              {filteredFiles.map((file) => {
                const isSelected = selectedFile?.id === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`grid grid-cols-12 items-center px-3 py-1.5 rounded cursor-pointer text-xs transition-all ${
                      isSelected ? "bg-blue-600 text-white" : "hover:bg-white/5 text-zinc-300"
                    }`}
                  >
                    <span className="col-span-7 truncate">{file.fullName}</span>
                    <span className={`col-span-3 truncate text-[11px] ${isSelected ? "text-blue-100" : "text-zinc-400"}`}>
                      {file.type}
                    </span>
                    <span className={`col-span-2 text-right text-[10px] font-mono ${isSelected ? "text-blue-100" : "text-zinc-500"}`}>
                      {file.size}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Inspector Panel */}
        {selectedFile && (
          <div className="w-60 bg-[#252526] border-l border-black/40 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center pb-3 border-b border-white/10">
                <div className="mb-3">{renderFileIcon(selectedFile)}</div>
                <h4 className="text-xs font-bold text-white break-all">
                  {selectedFile.fullName}
                </h4>
                <span className="text-[10px] text-zinc-400 font-mono mt-1">
                  {selectedFile.type} • {selectedFile.size}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Information
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed bg-black/20 p-2.5 rounded border border-white/5">
                  {selectedFile.description}
                </p>
              </div>

              {selectedFile.tech && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedFile.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-zinc-800 text-blue-300 rounded text-[10px] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 mt-4">
              {selectedFile.downloadable ? (
                <button
                  onClick={() => alert("Downloading Resume...")}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FaDownload className="text-xs" />
                  <span>Download File</span>
                </button>
              ) : selectedFile.category === "applications" ? (
                <button
                  onClick={() => alert(`Launching ${selectedFile.name}...`)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  <span>Open Application</span>
                </button>
              ) : (
                <div className="text-center text-[10px] text-zinc-500 font-mono">
                  macOS Preview Active
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}