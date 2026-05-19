import React from "react";
import { 
  FaChevronDown, 
  FaSearch, 
  FaPen, 
  FaCrop, 
  FaInfoCircle, 
  FaShare, 
  FaDownload 
} from "react-icons/fa";

export default function ResumeApp() {
  const pdfUrl = "/Resume.pdf";

  return (
    <div className="w-full h-full bg-[#000000] text-white flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* Top Header Bar (iOS File Viewer Style) */}
      <div className="pt-12 pb-3 px-4 flex items-center justify-between bg-[#000000]/90 backdrop-blur-md z-10 border-b border-white/10">
        
        {/* Title Dropdown */}
        <div className="flex items-center gap-1.5 cursor-pointer ml-10">
          <span className="text-base font-semibold tracking-tight text-white">
            Bikash CV
          </span>
          <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center">
            <FaChevronDown className="text-[9px] text-zinc-400" />
          </div>
        </div>

        {/* Top Right Visible Download Button for Recruiters */}
        <a
          href={pdfUrl}
          download="Bikash_Dalapati_Resume.pdf"
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
          title="Download Resume"
        >
          <FaDownload className="text-xs" />
          <span>Download</span>
        </a>
