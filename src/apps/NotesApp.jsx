import React, { useState, useMemo } from "react";
import {
  SquarePen,
  Trash2,
  Search,
  FileText,
  Clock,
  Sparkles,
  ChevronLeft
} from "lucide-react";

const INITIAL_NOTES = [
  {
    id: "note-1",
    title: "👋 Welcome to My Portfolio!",
    content:
      "Hello there! I'm a Computer Science Engineering student and full-stack MERN developer. Welcome to my interactive macOS-inspired portfolio OS!\n\nHere is a quick overview of what you'll find around here:\n• 💻 Tech Stack : Specialized in MongoDB, Express, React, Node.js (MERN), and C++ for competitive programming.\n• 🚀 Projects: Explore functional web applications built with modern UI trends like Tailwind CSS, glassmorphism, and Bento layouts.\n• 🏆 Problem Solving : Dedicated DSA problem solver with a strong background in algorithmic challenges and optimization.\n\nFeel free to explore my desktop icons, check out my code repositories, or read through my notes. Have fun exploring!",
    updatedAt: "Just now",
    date: "Today"
  },
  {
    id: "note-2",
    title: "MERN Stack Portfolio Ideas",
    content:
      "Build interactive desktop apps inside the portfolio OS:\n- Photos Explorer with local asset loading\n- Streaming Media App (Netflix style)\n- Functional Notes App with search & persistent state\n- Interactive Map with custom map markers",
    updatedAt: "10:42 AM",
    date: "Today"
  },
  {
    id: "note-3",
    title: "DSA & System Design Checklist",
    content:
      "1. Graph Traversal Algorithms (BFS/DFS optimizations)\n2. Dynamic Programming Memoization Techniques\n3. Redux Toolkit state slices & WebSocket connection logic\n4. Database indexing & execution plan analysis",
    updatedAt: "Yesterday",
    date: "Yesterday"
  }
];

export default function NotesApp() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [activeNoteId, setActiveNoteId] = useState(INITIAL_NOTES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mobile View Toggle: 'list' | 'editor'
  const [mobileScreen, setMobileScreen] = useState("list");

  // Get active note
  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeNoteId) || notes[0],
    [notes, activeNoteId]
  );

  // Filter notes by search
  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  // Create new note
  const handleCreateNote = () => {
    const newNote = {
      id: `note-${Date.now()}`,
      title: "New Note",
      content: "",
      updatedAt: "Just now",
      date: "Today"
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setMobileScreen("editor"); // Switch to editor on mobile when creating
  };

  // Update current note content
  const handleUpdateNote = (field, value) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === activeNoteId
          ? {
              ...note,
              [field]: value,
              updatedAt: "Just now"
            }
          : note
      )
    );
  };

  // Delete current note
  const handleDeleteNote = (id, e) => {
    e.stopPropagation();
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    if (remaining.length > 0) {
      setActiveNoteId(remaining[0].id);
    }
  };

  // Handle note selection
  const handleSelectNote = (id) => {
    setActiveNoteId(id);
    setMobileScreen("editor"); // Open editor view on mobile
  };

  // Word & Character count
  const stats = useMemo(() => {
    if (!activeNote?.content) return { words: 0, chars: 0 };
    const text = activeNote.content.trim();
    return {
      words: text ? text.split(/\s+/).length : 0,
      chars: text.length
    };
  }, [activeNote]);

  return (
    <div className="w-full h-full bg-[#1e1e1e] text-white flex font-sans select-none overflow-hidden pt-12 sm:pt-0">
      
      {/* 1. SIDEBAR / LIST VIEW */}
      {/* Hidden on mobile when viewing the editor screen; always visible on desktop (sm:flex) */}
      <div
        className={`w-full sm:w-64 bg-[#141414] border-r border-white/10 flex flex-col shrink-0 ${
          mobileScreen === "editor" ? "hidden sm:flex" : "flex"
        }`}
      >
        {/* Top Control Header */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between gap-2 bg-black/20">
          <div className="bg-[#262626] border border-white/10 rounded-lg px-2.5 py-1.5 sm:py-1 flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
            />
          </div>

          <button
            onClick={handleCreateNote}
            className="p-2 sm:p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors shrink-0 active:scale-95"
            title="Create New Note"
          >
            <SquarePen className="w-4 h-4" />
          </button>
        </div>

        {/* Notes Items */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {filteredNotes.length === 0 ? (
            <div className="p-6 text-center text-zinc-500 text-xs flex flex-col items-center gap-2">
              <FileText className="w-6 h-6 opacity-40" />
              <span>No notes found</span>
            </div>
          ) : (
            filteredNotes.map((note) => {
              const isActive = note.id === activeNoteId;
              return (
                <div
                  key={note.id}
                  onClick={() => handleSelectNote(note.id)}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all border ${
                    isActive
                      ? "bg-yellow-500/15 border-yellow-500/40"
                      : "bg-[#1a1a1a] border-transparent hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className={`text-xs font-semibold truncate ${
                        isActive ? "text-yellow-400" : "text-zinc-200"
                      }`}
                    >
                      {note.title || "Untitled Note"}
                    </h4>
                    
                    <button
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-all"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {note.content || "No additional text..."}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-500 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{note.updatedAt}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-2.5 border-t border-white/10 text-[10px] font-mono text-zinc-500 text-center bg-black/20">
          {notes.length} {notes.length === 1 ? "Note" : "Notes"}
        </div>
      </div>

      {/* 2. EDITOR VIEW */}
      {/* Hidden on mobile when viewing the notes list; always visible on desktop (sm:flex) */}
      <div
        className={`flex-1 flex-col bg-[#1e1e1e] overflow-hidden ${
          mobileScreen === "list" ? "hidden sm:flex" : "flex"
        }`}
      >
        {activeNote ? (
          <>
            {/* Metadata / Mobile Navigation Header */}
            <div className="h-12 sm:h-10 px-4 sm:px-6 border-b border-white/5 flex items-center justify-between text-xs text-zinc-400 bg-black/10">
              {/* Back to List button for Mobile view */}
              <button
                onClick={() => setMobileScreen("list")}
                className="flex sm:hidden items-center gap-1 text-yellow-400 text-xs font-medium active:opacity-70 pr-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Notes</span>
              </button>

              <span className="text-[11px] font-mono text-zinc-500 truncate">
                Edited {activeNote.updatedAt}
              </span>

              <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-mono text-zinc-500 shrink-0">
                <span>{stats.words} words</span>
                <span className="hidden sm:inline">{stats.chars} characters</span>
              </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 p-5 sm:p-8 flex flex-col gap-4 overflow-y-auto">
              {/* Title Input */}
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => handleUpdateNote("title", e.target.value)}
                placeholder="Note Title"
                className="bg-transparent text-xl sm:text-2xl font-bold text-white outline-none border-none placeholder-zinc-600 tracking-tight"
              />

              {/* Content Textarea */}
              <textarea
                value={activeNote.content}
                onChange={(e) => handleUpdateNote("content", e.target.value)}
                placeholder="Start writing..."
                className="flex-1 bg-transparent text-sm text-zinc-300 outline-none border-none resize-none placeholder-zinc-600 leading-relaxed font-sans scrollbar-thin scrollbar-thumb-zinc-800 pb-10 sm:pb-0"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-3">
            <Sparkles className="w-8 h-8 opacity-40 text-yellow-500" />
            <span className="text-xs">Select or create a note to start writing</span>
          </div>
        )}
      </div>

    </div>
  );
}