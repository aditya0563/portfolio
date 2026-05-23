import React from "react";
import {
  MessageCircle,
  Phone,
  Video,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function BikashContactDetails() {
  const contact = {
    name: "Bikash Dalapati",
    initials: "BD",
    mobile: "89271 82293",
    email: "bikashdalapati09@gmail.com",
    address: {
      line1: "Uluberia",
      line2: "Howrah 711316",
      state: "West Bengal",
      country: "India",
    },
  };

  return (
    <div className="w-full h-full bg-[#1c1c1e] text-white flex flex-col font-sans select-none overflow-y-auto px-4 pb-10">
      {/* ================= HEADER ================= */}
      <header className="pt-12 pb-3 flex items-center justify-end sticky top-0 bg-[#1c1c1e]/80 backdrop-blur-md z-10">
        <button className="text-[#0a84ff] text-[17px] font-normal hover:opacity-70 transition-opacity">
          Edit
        </button>
      </header>

      {/* ================= AVATAR & NAME HEADER ================= */}
      <div className="flex flex-col items-center text-center pt-2 pb-1">
        <div className="w-28 h-28 rounded-full bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] flex items-center justify-center border border-white/10 shadow-lg mb-3">
          <span className="text-[#8e8e93] font-normal text-4xl tracking-tight">
            {contact.initials}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white mb-5">
          {contact.name}
        </h1>

        {/* QUICK ACTION BUTTONS */}
        <div className="grid grid-cols-4 gap-2.5 w-full max-w-xs">
          <button className="bg-[#2c2c2e] hover:bg-[#3a3a3c] active:scale-95 transition-all p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-sm">
            <MessageCircle className="w-5 h-5 text-[#0a84ff] fill-[#0a84ff]" />
            <span className="text-[11px] text-[#0a84ff] font-medium">message</span>
          </button>

          <button className="bg-[#2c2c2e] hover:bg-[#3a3a3c] active:scale-95 transition-all p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-sm">
            <Phone className="w-5 h-5 text-[#0a84ff] fill-[#0a84ff]" />
            <span className="text-[11px] text-[#0a84ff] font-medium">call</span>
          </button>

          <button className="bg-[#2c2c2e] hover:bg-[#3a3a3c] active:scale-95 transition-all p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-sm">
            <Video className="w-5 h-5 text-[#0a84ff] fill-[#0a84ff]" />
            <span className="text-[11px] text-[#0a84ff] font-medium">video</span>
          </button>

          <button className="bg-[#2c2c2e] hover:bg-[#3a3a3c] active:scale-95 transition-all p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-sm">
            <Mail className="w-5 h-5 text-[#0a84ff] fill-[#0a84ff]" />
            <span className="text-[11px] text-[#0a84ff] font-medium">mail</span>
          </button>
        </div>
      </div>

      {/* ================= DETAILS LIST ================= */}
      <div className="space-y-4 mt-4">
        {/* CONTACT PHOTO & POSTER */}
        <div className="bg-[#2c2c2e] rounded-2xl p-3.5 flex items-center justify-between cursor-pointer active:opacity-80 transition-opacity">
