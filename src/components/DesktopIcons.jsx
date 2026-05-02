import React, { useRef } from "react";
import Draggable from "react-draggable";

function DraggableIcon({ item, defaultPos }) {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" defaultPosition={defaultPos}>
      <div
        ref={nodeRef}
        onDoubleClick={item.action}
        title="Double click to open"
        className="absolute group flex flex-col items-center w-24 p-2 rounded-xl hover:bg-white/10 cursor-grab active:cursor-grabbing transition-colors select-none z-30 pointer-events-auto"
      >
        <img
          src={item.icon}
          alt={item.name}
          draggable={false}
          className="w-16 h-16 drop-shadow-lg pointer-events-none object-contain"
        />
        <span className="text-[12px] font-medium text-white text-center mt-1.5 drop-shadow-sm pointer-events-none">
          {item.name}
        </span>
      </div>
    </Draggable>
  );
}

export default function DesktopIcons({ onOpenResume, onOpenDoc, onOpenLeetCode, onOpenCodechef, onOpenProject }) {
  const items = [
    { 
      id: 1, 
      name: "Resume.pdf", 
      icon: "https://www.iconpacks.net/icons/2/free-pdf-file-icon-3382-thumb.png",
      action: onOpenResume
    },
    { 
      id: 2, 
