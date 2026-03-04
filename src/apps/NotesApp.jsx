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
