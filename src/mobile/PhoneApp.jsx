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
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#3a3a3c] flex items-center justify-center text-xs text-zinc-300 font-medium">
              {contact.initials}
            </div>
            <span className="text-base text-white font-normal">Contact Photo & Poster</span>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500" />
        </div>

        {/* PHONE & EMAIL */}
        <div className="bg-[#2c2c2e] rounded-2xl divide-y divide-[#3a3a3c] overflow-hidden">
          <div className="p-3.5">
            <div className="text-xs text-zinc-400 font-medium">mobile</div>
            <div className="text-[17px] text-[#0a84ff] font-normal mt-0.5">
              {contact.mobile}
            </div>
          </div>

          <div className="p-3.5">
            <div className="text-xs text-zinc-400 font-medium">home</div>
            <div className="text-[17px] text-[#0a84ff] font-normal mt-0.5 break-all">
              {contact.email}
            </div>
          </div>
        </div>

        {/* ADDRESS WITH MAP PIN CARD */}
        <div className="bg-[#2c2c2e] rounded-2xl p-3.5 flex items-start justify-between gap-3">
          <div className="flex-1 space-y-0.5">
            <div className="text-xs text-zinc-400 font-medium mb-1">home</div>
            <div className="text-[15px] text-white leading-snug">{contact.address.line1}</div>
            <div className="text-[15px] text-white leading-snug">{contact.address.line2}</div>
            <div className="text-[15px] text-white leading-snug">{contact.address.state}</div>
            <div className="text-[15px] text-white leading-snug">{contact.address.country}</div>
          </div>

          <div className="w-24 h-24 rounded-xl bg-[#1c1c1e] border border-zinc-700/60 relative overflow-hidden flex-shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-900/20" />
            <MapPin className="w-7 h-7 text-[#ff453a] fill-[#ff453a] relative z-10 drop-shadow-md" />
          </div>
        </div>

        {/* NOTES */}
        <div className="bg-[#2c2c2e] rounded-2xl p-3.5">
          <div className="text-xs text-zinc-400 font-medium mb-1">Notes</div>
          <div className="text-[15px] text-zinc-500 h-8"></div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="bg-[#2c2c2e] rounded-2xl divide-y divide-[#3a3a3c] overflow-hidden">
          <button className="w-full p-3.5 text-left text-[17px] text-[#0a84ff] hover:bg-[#3a3a3c] transition-colors">
            Send Message
          </button>
          <button className="w-full p-3.5 text-left text-[17px] text-[#0a84ff] hover:bg-[#3a3a3c] transition-colors">
            Share Contact
          </button>
          <button className="w-full p-3.5 text-left text-[17px] text-[#0a84ff] hover:bg-[#3a3a3c] transition-colors">
            Add to Favourites
          </button>
        </div>

        {/* EMERGENCY & BLOCK */}
        <div className="bg-[#2c2c2e] rounded-2xl divide-y divide-[#3a3a3c] overflow-hidden">
          <button className="w-full p-3.5 text-left text-[17px] text-[#0a84ff] hover:bg-[#3a3a3c] transition-colors">
            Add to Emergency Contacts
          </button>
          <button className="w-full p-3.5 text-left text-[17px] text-[#ff453a] hover:bg-[#3a3a3c] transition-colors">
            Block Contact
          </button>
        </div>
      </div>
    </div>
  );
}