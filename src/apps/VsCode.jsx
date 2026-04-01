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
            <button
              onClick={() => setActiveSidebar("extensions")}
              className={`p-2 rounded hover:text-white transition-colors relative ${
                activeSidebar === "extensions" ? "text-white" : ""
              }`}
            >
              <Blocks className="w-5 h-5" />
              {activeSidebar === "extensions" && (
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white" />
              )}
            </button>
          </div>

          <button className="p-2 text-[#858585] hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Panel */}
        <div className="w-60 bg-[#252526] border-r border-[#1e1e1e] flex flex-col shrink-0">
          <div className="px-4 py-2 text-xs font-semibold tracking-wider text-[#bbbbbb] uppercase flex items-center justify-between">
            <span>Explorer</span>
          </div>

          {/* File Tree Header */}
          <div className="flex-1 overflow-y-auto">
            <button
              onClick={() => setIsExplorerOpen(!isExplorerOpen)}
              className="w-full px-2 py-1 flex items-center gap-1 text-xs font-bold text-[#cccccc] hover:bg-[#2a2d2e]"
            >
              {isExplorerOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
              <Folder className="w-3.5 h-3.5 text-sky-400" />
              <span className="truncate">PORTFOLIO-PROJECT</span>
            </button>

            {/* File List */}
            {isExplorerOpen && (
              <div className="pl-4 flex flex-col mt-0.5">
                {files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => handleOpenFile(file)}
                    className={`w-full px-2 py-1 flex items-center gap-2 text-xs hover:bg-[#2a2d2e] transition-colors ${
                      activeTabId === file.id
                        ? "bg-[#37373d] text-white"
                        : "text-[#cccccc]"
                    }`}
                  >
                    <FileCode2 className={`w-3.5 h-3.5 shrink-0 ${file.iconColor}`} />
                    <span className="truncate">{file.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Code Workspace Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
          
          {/* Tab Navigation */}
          <div className="flex items-center bg-[#252526] overflow-x-auto border-b border-[#1e1e1e] no-scrollbar">
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group flex items-center gap-2 px-3 py-2 text-xs border-r border-[#1e1e1e] cursor-pointer min-w-[120px] max-w-[180px] justify-between ${
                  activeTabId === tab.id
                    ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]"
                    : "bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2d2e]"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <FileCode2 className={`w-3.5 h-3.5 shrink-0 ${tab.iconColor}`} />
                  <span className="truncate">{tab.name}</span>
                </div>
                {openTabs.length > 1 && (
                  <button
                    onClick={(e) => handleCloseTab(e, tab.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#454545] rounded text-gray-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Editable Code Workspace */}
          {activeFile ? (
            <div className="flex-1 flex overflow-hidden font-mono text-xs p-4 overflow-y-auto leading-relaxed">
              {/* Dynamic Line Numbers */}
              <div className="flex flex-col text-right pr-4 select-none text-[#5a5a5a] border-r border-[#333333]">
                {activeFile.content.split("\n").map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              {/* Editable Text Area */}
              <textarea
                value={activeFile.content}
                onChange={handleCodeChange}
                spellCheck={false}
                className="flex-1 bg-transparent text-[#d4d4d4] resize-none outline-none pl-4 font-mono text-xs leading-relaxed overflow-x-auto selection:bg-[#264f78]"
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#5a5a5a]">
              No files open
            </div>
          )}

          {/* Integrated Interactive Terminal */}
          {isTerminalOpen && (
            <div className="h-44 bg-[#181818] border-t border-[#333333] flex flex-col shrink-0">
              {/* Terminal Header Bar */}
              <div className="px-4 py-1.5 bg-[#252526] border-b border-[#333333] flex items-center justify-between text-xs text-[#cccccc]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold">Terminal</span>
                </div>
                <button
                  onClick={() => setIsTerminalOpen(false)}
                  className="hover:text-white p-0.5 rounded hover:bg-[#333333]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Terminal Logs View */}
              <div className="flex-1 p-3 overflow-y-auto font-mono text-xs flex flex-col gap-1 text-[#cccccc]">
                {terminalLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap ${
                      log.type === "error"
                        ? "text-red-400"
                        : log.type === "system"
                        ? "text-zinc-500"
                        : log.type === "response"
                        ? "text-emerald-400"
                        : "text-sky-300"
                    }`}
                  >
                    {log.text}
                  </div>
                ))}

                {/* Terminal Input Form */}
                <form
                  onSubmit={handleTerminalSubmit}
                  className="flex items-center gap-2 mt-1"
                >
                  <span className="text-emerald-400 font-bold">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command ('help', 'ls', 'npm start')..."
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder-zinc-600"
                  />
                  <button type="submit" className="hidden">
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VS Code Bottom Status Bar */}
      <div className="h-6 bg-[#007acc] text-white text-[11px] px-3 flex items-center justify-between shrink-0 font-sans select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="flex items-center gap-1 hover:bg-[#005999] px-1 py-0.5 rounded transition-colors"
          >
            <Terminal className="w-3 h-3" />
            <span>Terminal</span>
          </button>
          <span>main*</span>
        </div>
        <div className="flex items-center gap-4 text-white/90">
          <span>
            Ln {activeFile ? activeFile.content.split("\n").length : 1}, Col 1
          </span>
          <span>UTF-8</span>
          <span>JavaScript React</span>
        </div>
      </div>

    </div>
  );
}