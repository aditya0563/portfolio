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
      name: "Projects", 
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Files_App_icon_iOS.png",
      action: onOpenProject
    },
    { 
      id: 3, 
      name: "Documents", 
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Files_App_icon_iOS.png" ,
      action: onOpenDoc
    },
    { 
      id: 4, 
      name: "LeetCode", 
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-leetcode-logo-icon-svg-download-png-2944960.png",
      action: onOpenLeetCode
    },
    { 
      id: 5, 
      name: "Codechef", 
      icon: "https://img.icons8.com/color/512/codechef.png",
      action: onOpenCodechef
    }
  ];

  const startX = window.innerWidth - 120;
  const startYOffset = 15;

  return (
    <div className="fixed inset-0 pt-12 pb-20 pointer-events-none z-20">
      {items.map((item, index) => (
        <DraggableIcon
          key={item.id}
          item={item}
          defaultPos={{ x: startX, y: startYOffset + index * 120 }}
        />
      ))}
    </div>
  );
}