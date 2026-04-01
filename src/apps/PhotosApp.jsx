import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Download,
  Image as ImageIcon,
  LayoutGrid,
  Library
} from "lucide-react";

// 1. Import all images directly inside src/assets/ (flat, no subfolders)
const assetModules = import.meta.glob(
  "../assets/*.{png,jpg,jpeg,svg,webp,gif}",
  { eager: true }
);

// 2. Map imported modules into a photo list
const APP_PHOTOS = Object.entries(assetModules).map(([filePath, module], index) => {
  const fileName = filePath.split("/").pop();
  const cleanName = fileName.substring(0, fileName.lastIndexOf(".")).replace(/[-_]/g, " ");

  return {
    id: `asset-${index}`,
    title: cleanName || fileName,
    fileName: fileName,
    url: module.default || module,
    path: `src/assets/${fileName}`
  };
});

export default function PhotosApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState("library"); // 'library' | 'collections'
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Filter photos based on search query
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return APP_PHOTOS;
    return APP_PHOTOS.filter(
      (photo) =>
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="w-full h-full bg-black text-white flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* TOP BAR (iOS Header Style - Increased Top Padding for Mobile) */}
      <div className="pt-16 sm:pt-4 px-4 pb-2 flex items-center justify-between shrink-0 bg-gradient-to-b from-black/80 to-transparent z-10">
        {/* Added ml-10 on mobile to clear the floating back button (<) */}
        <div className="ml-10 sm:ml-0">
          <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
            {activeTab === "library" ? "Library" : "Collections"}
          </h1>
          <p className="text-[11px] text-zinc-400 font-medium flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Syncing {filteredPhotos.length} Items...
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Filter / Sort Button */}
          <button className="w-8 h-8 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-md flex items-center justify-center text-white/90 border border-white/5 active:scale-95 transition-all">
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Select Button */}
          <button className="px-3.5 py-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-md text-xs font-semibold text-white/90 border border-white/5 active:scale-95 transition-all">
            Select
          </button>
        </div>
      </div>

      {/* PHOTO GRID (iOS Aspect-Square Seamless Grid) */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-none">
        {filteredPhotos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-2 p-6">
            <ImageIcon className="w-10 h-10 opacity-30" />
            <span className="text-xs font-medium">No images found</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[2px] bg-black">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-square bg-zinc-900 overflow-hidden cursor-pointer active:opacity-80 transition-opacity"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FLOATING iOS BOTTOM DOCK & SEARCH BUTTON */}
      <div className="absolute bottom-5 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Left/Center: Tab Switcher Capsule */}
        <div className="pointer-events-auto bg-zinc-900/85 backdrop-blur-2xl border border-white/10 rounded-full p-1 flex items-center shadow-2xl mx-auto">
          <button
            onClick={() => setActiveTab("library")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "library"
                ? "bg-white/20 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            Library
          </button>

          <button
            onClick={() => setActiveTab("collections")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "collections"
                ? "bg-white/20 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Collections
          </button>
        </div>

        {/* Right: Floating Circular Search Trigger */}
        <button
          onClick={() => setShowSearchModal(true)}
          className="pointer-events-auto w-11 h-11 rounded-full bg-zinc-900/85 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center shadow-2xl active:scale-90 transition-all"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* SEARCH OVERLAY MODAL */}
      {showSearchModal && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-xl p-4 pt-16 flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-zinc-800/90 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search photos, titles, assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowSearchModal(false)}
              className="text-xs font-semibold text-sky-400 hover:text-sky-300"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* FULLSCREEN PREVIEW / LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col animate-in zoom-in-95 duration-150">
          {/* Top Bar inside Lightbox */}
          <div className="pt-16 sm:pt-4 px-4 pb-3 flex items-center justify-between border-b border-white/10 bg-black/40">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-zinc-300 truncate max-w-[200px] capitalize">
              {selectedPhoto.title}
            </span>
            <a
              href={selectedPhoto.url}
              download={selectedPhoto.fileName}
              className="px-3 py-1.5 rounded-full bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Save
            </a>
          </div>

          {/* Image Display */}
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
}