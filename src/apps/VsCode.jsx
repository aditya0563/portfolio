import React, { useState } from "react";
import {
  Files,
  Search,
  GitGraph,
  Play,
  Blocks,
  Settings,
  Terminal,
  X,
  ChevronDown,
  ChevronRight,
  FileCode2,
  Folder,
  Send
} from "lucide-react";

// Initial Mock Project Files
const initialFiles = [
  {
    id: "portfolio",
    name: "Portfolio.jsx",
    language: "javascript",
    iconColor: "text-yellow-400",
    content: `import React from 'react';\nimport { Motion } from 'framer-motion';\n\nexport default function Portfolio() {\n  return (\n    <div className="bg-zinc-950 text-white min-h-screen p-8">\n      <h1 className="text-3xl font-bold">Bikash Dalapati's Portfolio</h1>\n      <p className="text-zinc-400 mt-2">Full-Stack MERN Developer & DSA Specialist</p>\n    </div>\n  );\n}`
  },
  {
    id: "styles",
    name: "global.css",
    language: "css",
    iconColor: "text-sky-400",
    content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  font-family: 'Inter', sans-serif;\n  background-color: #09090b;\n  color: #f4f4f5;\n}`
  },
  {
    id: "package",
    name: "package.json",
    language: "json",
    iconColor: "text-emerald-400",
    content: `{\n  "name": "developer-portfolio",\n  "private": true,\n  "version": "1.0.0",\n  "type": "module",\n  "dependencies": {\n    "framer-motion": "^11.0.0",\n    "lucide-react": "^0.300.0",\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  }\n}`
  }
];

export default function VSCodeApp() {
  const [activeSidebar, setActiveSidebar] = useState("explorer");
  const [files, setFiles] = useState(initialFiles);
  const [openTabs, setOpenTabs] = useState([initialFiles[0]]);
  const [activeTabId, setActiveTabId] = useState(initialFiles[0].id);
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);

  // Terminal States
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState([
    { text: "VS Code Integrated Terminal v1.85.0", type: "system" },
    { text: "Type 'help' to view available commands.", type: "system" }
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const activeFile = files.find((file) => file.id === activeTabId);

  // Handle Editing Code in Real Time
  const handleCodeChange = (e) => {
    const updatedContent = e.target.value;

    // Update main files state
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.id === activeTabId ? { ...f, content: updatedContent } : f
      )
    );

    // Update open tabs state
    setOpenTabs((prevTabs) =>
      prevTabs.map((f) =>
        f.id === activeTabId ? { ...f, content: updatedContent } : f
      )
    );
  };

  // Open Tab Handler
  const handleOpenFile = (file) => {
    if (!openTabs.some((tab) => tab.id === file.id)) {
      setOpenTabs([...openTabs, file]);
    }
    setActiveTabId(file.id);
  };

  // Close Tab Handler
  const handleCloseTab = (e, fileId) => {
    e.stopPropagation();
    const filteredTabs = openTabs.filter((tab) => tab.id !== fileId);
    setOpenTabs(filteredTabs);

    if (activeTabId === fileId && filteredTabs.length > 0) {
      setActiveTabId(filteredTabs[filteredTabs.length - 1].id);
    }
  };

  // Terminal Command Execution
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, { text: `$ ${terminalInput}`, type: "user" }];

    switch (cmd) {
      case "help":
        newLogs.push({
          text: "Available commands:\n  help      - Show this menu\n  ls        - List directory files\n  clear     - Clear terminal logs\n  npm start - Run production server\n  whoami    - Display active user profile",
          type: "response"
        });
        break;
      case "ls":
        newLogs.push({
          text: files.map((f) => f.name).join("   "),
          type: "response"
        });
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      case "whoami":
        newLogs.push({
          text: "Bikash - Full Stack Developer & DSA Specialist",
          type: "response"
        });
        break;
      case "npm start":
        newLogs.push({
          text: "> dev-portfolio@1.0.0 start\n> vite dev\n\n  VITE v5.1.0  ready in 240 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose",
          type: "response"
        });
        break;
      default:
        newLogs.push({
          text: `bash: command not found: ${cmd}. Type 'help' for available commands.`,
          type: "error"
        });
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  return (
    <div className="w-full h-full bg-[#1e1e1e] text-[#cccccc] font-sans flex flex-col select-none overflow-hidden">
      
      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Leftmost Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center justify-between py-2 border-r border-[#252526] shrink-0">
          <div className="flex flex-col gap-4 text-[#858585]">
            <button
              onClick={() => setActiveSidebar("explorer")}
              className={`p-2 rounded hover:text-white transition-colors relative ${
                activeSidebar === "explorer" ? "text-white" : ""
              }`}
            >
              <Files className="w-5 h-5" />
              {activeSidebar === "explorer" && (
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white" />
              )}
            </button>
            <button
              onClick={() => setActiveSidebar("search")}
              className={`p-2 rounded hover:text-white transition-colors relative ${
                activeSidebar === "search" ? "text-white" : ""
              }`}
            >
              <Search className="w-5 h-5" />
              {activeSidebar === "search" && (
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white" />
              )}
            </button>
            <button
              onClick={() => setActiveSidebar("git")}
              className={`p-2 rounded hover:text-white transition-colors relative ${
                activeSidebar === "git" ? "text-white" : ""
              }`}
            >
              <GitGraph className="w-5 h-5" />
              {activeSidebar === "git" && (
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white" />
              )}
            </button>
            <button
              onClick={() => setActiveSidebar("debug")}
              className={`p-2 rounded hover:text-white transition-colors relative ${
                activeSidebar === "debug" ? "text-white" : ""
              }`}
            >
              <Play className="w-5 h-5" />
              {activeSidebar === "debug" && (
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white" />
              )}
            </button>
