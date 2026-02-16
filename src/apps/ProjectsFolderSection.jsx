import React, { useState, useMemo, useEffect } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaExternalLinkAlt,
  FaGithub,
  FaCode,
  FaStar,
  FaComments,
  FaWallet,
  FaDesktop,
  FaUserTie,
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaSearch,
  FaThLarge,
  FaList,
  FaRegFilePdf,
  FaFileCode,
  FaRegFileAlt,
  FaFolderPlus,
  FaCheckCircle,
} from "react-icons/fa";

// Project images
import chatAppImg from "../assets/chatapp.jpeg";
import interviewImg from "../assets/interview-agent.png";
import portfolioImg from "../assets/portfolio.png";

// =========================================================================
// NESTED ICLOUD DATA MODEL
// =========================================================================

const ICLOUD_FILES_DATA = [
  // =======================================================================
  // PROJECTS
  // =======================================================================
  {
    id: "folder-projects",
    type: "folder",
    name: "Projects",
    itemCount: 4,

    children: [
      // ===================================================================
      // 1. AI INTERVIEW AGENT
      // ===================================================================
      {
        id: "proj-1",
        type: "project",
        categoryId: "mern",
        categoryName: "MERN Stack",
        name: "AI Interview Agent",
        icon: <FaUserTie className="text-sm" />,
        imageUrl: interviewImg,

        description:
          "An AI-powered full-stack mock interview platform that simulates real HR and technical interview environments. Users can configure interviews by role and skills or upload a resume for automatic role and skill detection, then complete a structured 5-question interview using voice or text responses with a timer. The platform provides AI-generated feedback with strengths and improvement suggestions, downloadable interview reports, interview history, performance tracking, Firebase authentication, and a token-based payment system.",

        overview:
          "AI Interview Agent is a full-stack interview preparation platform designed to simulate a real interview environment. It allows users to practise HR and technical interviews using AI-generated questions and receive structured feedback after completing an interview.",

        features: [
          "Role and skills-based interview configuration",
          "Resume upload with automatic skill and role detection",
          "HR interview mode for behavioural and communication questions",
          "Technical interview mode for domain-specific and DSA questions",
          "Video-based AI interviewer experience",
          "Structured 5-question interview flow",
          "Timer for each interview question",
          "Voice input using speech-to-text",
          "Text-based answer submission",
          "Instant AI-generated feedback",
          "Strengths and improvement suggestions",
          "Downloadable interview report",
          "Interview history and performance tracking",
          "Token-based interview system",
          "100 tokens provided to new users",
          "50 tokens required for each interview",
          "Online payment integration using Razorpay",
          "Firebase authentication",
        ],

        technicalDetails: [
          "React.js frontend for the interview interface",
          "Framer Motion for frontend animations",
          "Node.js and Express.js backend",
          "MongoDB for persistent application data",
          "Firebase for authentication",
          "AI-powered question generation and feedback",
          "Voice input through speech-to-text",
          "Razorpay integration for online payments",
          "Token-based interview access system",
        ],

        techStack: {
          Frontend: ["React.js", "Framer Motion", "React Icons"],
          Backend: ["Node.js", "Express.js"],
          Database: ["MongoDB"],
          Authentication: ["Firebase"],
          Payments: ["Razorpay"],
          AI: ["ChatGPT-4 Mini"],
        },

        projectPurpose:
          "The main purpose of the project is to provide users with an accessible environment where they can practise HR and technical interviews, receive AI-generated feedback, and review their interview performance.",

        tags: [
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Firebase",
          "OpenRouter API",
          "Razorpay",
          "Framer Motion",
        ],

        githubUrl: "https://github.com/bikashdalapati-09",
        liveUrl: "https://ai-interview-agent-client-o7ai.onrender.com/",

        featured: true,
        date: "Oct 12",
        size: "AI System",
      },

      // ===================================================================
      // 2. EXPENSE TRACKER
      // ===================================================================
      {
        id: "proj-2",
        type: "project",
        categoryId: "mern",
        categoryName: "MERN Stack",
        name: "Expense Tracker",
        icon: <FaWallet className="text-sm" />,

        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",

        description:
          "A full-stack expense management application built with the MERN stack that allows users to securely manage their daily expenses through cookie-based authentication and complete CRUD operations. Users can add, update, delete, and review expenses through a structured dashboard with summary cards, daily and total expense insights, and visual expense charts. The application also includes a GitHub-inspired developer profile page and a contact form with user feedback notifications.",

        overview:
          "Expense Tracker is a full-stack web application for managing and analysing daily expenses. It combines secure authentication, expense CRUD operations, dashboard analytics, and visual charts into a single application.",

        features: [
          "Secure user login and logout",
          "Cookie-based authentication",
          "Add new expenses",
          "Update existing expenses",
          "Delete expenses",
          "View expenses in a structured table",
          "Dashboard summary cards",
          "Total expense overview",
          "Daily expense overview",
          "Visual expense charts",
          "GitHub-inspired developer profile page",
          "Contact form",
          "User feedback notification",
        ],

        technicalDetails: [
          "React frontend for the user interface",
          "Tailwind CSS for responsive UI styling",
          "Axios for frontend-backend API communication",
          "React Router for application navigation",
          "React Hot Toast for feedback notifications",
          "Node.js and Express.js backend",
          "MongoDB for persistent expense data",
          "REST API based frontend-backend communication",
          "Cookie-based authentication system",
          "Controller, model, and route based backend structure",
        ],

        techStack: {
          Frontend: [
            "React",
            "Tailwind CSS",
            "Axios",
            "React Router",
            "React Hot Toast",
          ],
          Backend: ["Node.js", "Express.js"],
          Database: ["MongoDB"],
          Tools: ["VS Code", "Git", "Postman", "MongoDB Compass"],
        },

        projectPurpose:
          "The project demonstrates how a complete MERN application can combine authentication, CRUD operations, API communication, database persistence, dashboard analytics, and visual data representation.",

        tags: [
          "React",
          "Tailwind CSS",
          "Axios",
          "React Router",
          "Node.js",
          "Express",
          "MongoDB",
        ],

        githubUrl: "https://github.com/bikashdalapati-09/expense-tracker",
        liveUrl: null,

        featured: false,
        date: "Yesterday",
        size: "MERN Stack",
      },

      // ===================================================================
      // 3. REAL-TIME CHAT APPLICATION
      // ===================================================================
      {
        id: "proj-3",
        type: "project",
        categoryId: "mern",
        categoryName: "MERN Stack",
        name: "Real-Time Chat Application",
        icon: <FaComments className="text-sm" />,
        imageUrl: chatAppImg,

        description:
          "A full-stack real-time messaging application built with the MERN stack, Redux Toolkit, and Socket.io. It provides JWT-based authentication, instant message delivery, online/offline user status, and persistent chat history stored in MongoDB. Socket.io handles real-time communication through socket events for connection setup, chat-room joining, message sending, and message receiving, while Redux Toolkit manages shared application state across the React frontend.",

        overview:
          "Real-Time Chat Application is a full-stack messaging platform focused on real-time communication. It combines REST APIs with Socket.io WebSockets to allow messages to be delivered instantly while MongoDB stores chat history for persistent access.",

        features: [
          "JWT-based user login and signup",
          "Real-time messaging",
          "Instant message delivery using Socket.io",
          "Online and offline user status",
          "Chat history stored in MongoDB",
          "Global state management using Redux Toolkit",
          "Responsive mobile and desktop UI",
          "Chat room initialisation",
          "Real-time message sending",
          "Real-time message receiving",
        ],

        technicalDetails: [
          "React.js frontend",
          "Tailwind CSS responsive interface",
          "Redux Toolkit for global application state",
          "Axios for API communication",
          "Socket.io Client for real-time communication",
          "Node.js and Express.js backend",
          "MongoDB with Mongoose for database operations",
          "JWT-based authentication",
          "Socket.io server for WebSocket communication",
          "Separated controllers, models, routes, middleware, and socket logic",
        ],

        socketEvents: [
          "setup → Initialise socket connection",
          "join chat → Join a chat room",
          "new message → Send a message",
          "message received → Receive a message",
        ],

        techStack: {
          Frontend: [
            "React.js",
            "Tailwind CSS",
            "Redux Toolkit",
            "Axios",
            "Socket.io Client",
          ],
          Backend: ["Node.js", "Express.js", "Socket.io"],
          Database: ["MongoDB", "Mongoose"],
          Authentication: ["JWT"],
        },

        projectPurpose:
          "The project demonstrates real-time communication using WebSockets, global state management using Redux Toolkit, REST API integration, authentication, database persistence, and a scalable MERN application structure.",

        tags: [
          "React.js",
          "Redux Toolkit",
          "Socket.io",
          "Express.js",
          "MongoDB",
          "JWT",
          "Tailwind CSS",
        ],

        githubUrl: "https://github.com/bikashdalapati-09/chat-app",
        liveUrl: null,

        featured: true,
        date: "Today",
        size: "MERN Stack",
      },

      // ===================================================================
      // 4. MACOS PORTFOLIO SYSTEM
      // ===================================================================
      {
        id: "proj-4",
        type: "project",
        categoryId: "system",
        categoryName: "System & UI",
        name: "macOS Portfolio System",
        icon: <FaDesktop className="text-sm" />,
        imageUrl: portfolioImg,

        description:
          "An interactive portfolio experience designed around a macOS-inspired desktop interface rather than a traditional portfolio layout. Built with React and Tailwind CSS, it combines a frosted-glass visual style with a Finder-inspired project browser for organising and presenting projects, certificates, source-code files, and other portfolio content. The project demonstrates component-based React development, interactive UI states, responsive layouts, search, folder navigation, grid/list views, and project preview functionality.",

        overview:
          "The macOS Portfolio System is an interactive portfolio designed to feel like a desktop operating system. Instead of presenting information as a conventional portfolio page, it organises projects, certificates, source code, and other information through a Finder-inspired interface.",

        features: [
          "macOS-inspired portfolio interface",
          "Finder-style project browser",
          "Project folder navigation",
          "Certificates folder",
          "Source Code folder",
          "Search files and folders",
          "Grid view",
          "List view",
          "Project image preview",
          "Project information preview modal",
          "GitHub repository links",
          "Live demo links",
          "Responsive interface",
          "Frosted glass / glassmorphism visual styling",
          "Interactive folder and file states",
        ],

        technicalDetails: [
          "React component-based architecture",
          "React state management using useState",
          "useMemo for filtered display data",
          "useEffect for external navigation state",
          "Tailwind CSS for styling",
          "React Icons for interface icons",
          "Dynamic project data model",
          "Nested folder and file structure",
          "Search filtering",
          "Grid/list view switching",
          "Modal-based project preview",
          "Responsive layouts for different screen sizes",
        ],

        techStack: {
          Frontend: ["React.js", "Tailwind CSS", "JavaScript"],
          UI: ["Glassmorphism", "Responsive Design"],
          Libraries: ["React Icons"],
        },

        projectPurpose:
          "The purpose of this project is to present personal projects and portfolio information through an interactive desktop-style experience while demonstrating React component development, state management, responsive UI design, and interactive data-driven interfaces.",

        tags: [
          "React.js",
          "Tailwind CSS",
          "JavaScript",
          "Glassmorphism",
          "Responsive UI",
          "React Icons",
        ],

        githubUrl: "https://github.com/bikashdalapati-09",
        liveUrl: "#",

        featured: true,
        date: "Sep 20",
        size: "React UI",
      },
    ],
  },

  // =======================================================================
  // CERTIFICATES
  // =======================================================================
  {
    id: "folder-certificates",
    type: "folder",
    name: "Certificates",
    itemCount: 3,

    children: [
      {
        id: "cert-1",
        type: "image",
        name: "AWS_Certified_Dev.png",
        date: "Aug 15",
        size: "3.4 MB",
        imageUrl:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      },

      {
        id: "cert-2",
        type: "image",
        name: "FullStack_Meta_Cert.png",
        date: "Jul 10",
        size: "2.8 MB",
        imageUrl:
          "https://assets-cms.b-cdn.net/course-thumbnails/f0ee325e170c524a220cae2437cc0b0cc0bdaea4eddd6a912b7c7fa38eb66f75.jpg",
      },

      {
        id: "cert-3",
        type: "image",
        name: "Advance Data Structure and Algorithm Certificate",
        date: "Jun 02",
        size: "1.9 MB",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEcEZ4EYCXmupxJmyDCiqW7HmNrfYIhzXyBplkoHYEdwem2FoiltYvhTw&s=10",
      },
    ],
  },

  // =======================================================================
  // DESIGN ASSET
  // =======================================================================
  {
    id: "file-ui-design",
    type: "image",
    name: "UI_Design.png",
    date: "Yesterday",
    size: "14.5 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },

  // =======================================================================
  // SOURCE CODE
  // =======================================================================
  {
    id: "folder-source-code",
    type: "folder",
    name: "Source Code",
    itemCount: 2,

    children: [
      {
        id: "code-1",
        type: "code",
        name: "ServerConfig.js",
        date: "Yesterday",
        size: "12 KB",
      },

      {
        id: "code-2",
        type: "code",
        name: "DockerCompose.yml",
        date: "Sep 01",
        size: "4 KB",
      },
    ],
  },
];

// =========================================================================
// COMPONENT
// =========================================================================

export default function ProjectsFolderSection({
  initialFiles = ICLOUD_FILES_DATA,
}) {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeItemModal, setActiveItemModal] = useState(null);

  // Hide external back button when inside a folder
  useEffect(() => {
    const externalBtn =
      document.querySelector(".external-back-button") ||
      document.querySelector("#external-back-button") ||
      document.querySelector("[data-external-back]");

    if (externalBtn) {
      if (currentFolder) {
        externalBtn.style.display = "none";
      } else {
        externalBtn.style.display = "";
      }
    }
  }, [currentFolder]);

  // Search
  const displayItems = useMemo(() => {
    const rawList = currentFolder ? currentFolder.children : initialFiles;

    if (!searchQuery.trim()) return rawList;

    return rawList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentFolder, searchQuery, initialFiles]);

  // =========================================================================
  // PROJECT INFORMATION MODAL
  // =========================================================================

  const ProjectPreview = ({ project }) => {
    return (
      <div className="space-y-5 pr-1">
        {/* Project Image */}
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-44 object-cover rounded-2xl border border-white/10"
          />
        )}

        {/* Overview */}
        {project.overview && (
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Project Overview
            </h4>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {project.overview}
            </p>
          </div>
        )}

        {/* Main Description */}
        {project.description && (
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              What I Built
            </h4>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Key Features
            </h4>

            <div className="space-y-1.5">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-xs text-zinc-300"
                >
                  <FaCheckCircle className="text-[#007AFF] text-[10px] mt-0.5 shrink-0" />

                  <span className="leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Details */}
        {project.technicalDetails?.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Technical Implementation
            </h4>

            <div className="space-y-1.5">
              {project.technicalDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-xs text-zinc-300"
                >
                  <FaCode className="text-zinc-500 text-[10px] mt-0.5 shrink-0" />

                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Socket Events */}
        {project.socketEvents?.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Socket Events
            </h4>

            <div className="bg-black/30 border border-white/5 rounded-xl p-3 space-y-2">
              {project.socketEvents.map((event, index) => (
                <div
                  key={index}
                  className="text-[10px] font-mono text-zinc-300"
                >
                  {event}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack && (
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Technology Stack
            </h4>

            <div className="space-y-2">
              {Object.entries(project.techStack).map(
                ([category, technologies]) => (
                  <div key={category}>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wide">
                      {category}
                    </span>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {technologies.map((technology) => (
                        <span
                          key={technology}
                          className="text-[10px] bg-zinc-800 text-zinc-300 border border-white/5 px-2 py-1 rounded-md font-mono"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Project Purpose */}
        {project.projectPurpose && (
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Project Purpose
            </h4>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {project.projectPurpose}
            </p>
          </div>
        )}

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Technologies
            </h4>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md font-mono border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-2 pt-3 border-t border-white/15">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-xl border border-white/10 transition-colors"
            >
              <FaGithub />
              Repository
            </a>
          )}

          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-[#007AFF] hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition-colors"
            >
              <span>Live Demo</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full min-h-screen md:min-h-0 bg-black text-white font-sans flex flex-col select-none overflow-hidden relative">
      {/* ===================================================================
          HEADER
      =================================================================== */}

      <div className="pt-12 pb-3 md:py-2.5 px-4 grid grid-cols-3 items-center border-b border-white/10 shrink-0 bg-black/80 backdrop-blur-md">
        <div className="flex items-center justify-start">
          {currentFolder ? (
            <button
              onClick={() => setCurrentFolder(null)}
              className="flex items-center gap-1.5 text-[#007AFF] text-sm font-medium active:opacity-60 cursor-pointer"
            >
              <FaChevronLeft className="text-xs" />
              <span>Back</span>
            </button>
          ) : (
            <span className="w-12 h-4" />
          )}
        </div>

        <div className="flex items-center justify-center text-center">
          <h1 className="text-sm font-semibold tracking-tight truncate max-w-full">
            {currentFolder ? currentFolder.name : "Bikash's iCloud"}
          </h1>
        </div>

        <div className="flex items-center justify-end">
          <button className="text-[#007AFF] text-sm font-medium active:opacity-60 cursor-pointer">
            Select
          </button>
        </div>
      </div>

      {/* ===================================================================
          SEARCH & TOOLBAR
      =================================================================== */}

      <div className="px-4 py-2.5 flex flex-col gap-2 shrink-0 bg-[#0d0d10]">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs" />

          <input
            type="text"
            placeholder="Search files and folders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c1c1e] text-xs text-white placeholder-zinc-500 pl-8 pr-3 py-1.5 md:py-2 rounded-xl border border-white/5 focus:outline-none focus:border-[#007AFF]/50 transition-colors"
          />
        </div>

        <div className="flex items-center justify-between pt-0.5 px-1 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <FaFolderPlus className="text-[#007AFF]" />

            <span className="text-[#007AFF]">Sorted by Name</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setViewMode(viewMode === "grid" ? "list" : "grid")
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              {viewMode === "grid" ? <FaList /> : <FaThLarge />}
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================
          MAIN CONTENT
      =================================================================== */}

      <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#0d0d10] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {displayItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-xs gap-2 py-12">
            <FaFolder className="text-3xl text-zinc-700" />
            <p>No items found</p>
          </div>
        ) : currentFolder?.id === "folder-projects" ? (
          // =================================================================
          // PROJECT CARDS (ENTIRE CARD CLICKABLE)
          // =================================================================
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
            {displayItems.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveItemModal(project)}
                className="bg-[#18181c] border border-white/10 hover:border-[#007AFF]/50 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-200 shadow-lg cursor-pointer"
              >
                {project.imageUrl && (
                  <div className="relative w-full h-40 bg-black/50 overflow-hidden border-b border-white/10">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2 bg-black/60 rounded-full text-white text-xs flex items-center gap-1 backdrop-blur-sm">
                        <FaExpand />
                        Preview
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#007AFF]/10 rounded-lg text-[#007AFF]">
                          {project.icon || <FaCode className="text-sm" />}
                        </div>

                        <h3 className="font-bold text-xs md:text-sm text-white group-hover:text-[#007AFF] transition-colors leading-snug">
                          {project.name}
                        </h3>
                      </div>

                      {project.featured && (
                        <span className="flex items-center gap-1 text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full shrink-0">
                          <FaStar className="text-[8px]" />
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-zinc-800/80 text-zinc-300 border border-white/5 px-2 py-0.5 rounded-md font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-white/10 transition-all cursor-pointer"
                        >
                          <FaGithub className="text-xs" />
                          <span>Repo</span>
                        </a>
                      )}

                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#007AFF] hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer"
                        >
                          <span>Live Demo</span>
                          <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === "grid" ? (
          // =================================================================
          // GRID VIEW
          // =================================================================
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-6 md:gap-y-8 pb-12 justify-items-center">
            {displayItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === "folder") {
                    setCurrentFolder(item);
                  } else {
                    setActiveItemModal(item);
                  }
                }}
                className="flex flex-col items-center gap-1.5 group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-md">
                  {item.type === "folder" && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                      <svg
                        viewBox="0 0 100 80"
                        className="w-16 h-14 sm:w-20 sm:h-16 drop-shadow-md"
                      >
                        <path
                          d="M 5,15 C 5,10 10,5 15,5 L 35,5 C 40,5 42,10 45,12 L 50,15 L 85,15 C 90,15 95,20 95,25 L 95,70 C 95,75 90,80 85,80 L 15,80 C 10,80 5,75 5,70 Z"
                          fill="#54A5FF"
                        />

                        <path
                          d="M 0,25 C 0,20 5,17 10,17 L 90,17 C 95,17 100,20 100,25 L 100,70 C 100,75 95,80 90,80 L 10,80 C 5,80 0,75 0,70 Z"
                          fill="#2B8CFF"
                        />
                      </svg>
                    </div>
                  )}

                  {item.type === "pdf" && (
                    <div className="w-16 h-20 bg-zinc-100 rounded-lg shadow-md border border-zinc-300 flex flex-col items-center justify-center relative">
                      <FaRegFilePdf className="text-red-500 text-2xl" />

                      <span className="absolute bottom-1 right-1 text-[8px] font-bold text-zinc-400 uppercase">
                        PDF
                      </span>
                    </div>
                  )}

                  {item.type === "image" && (
                    <div className="w-full h-full bg-zinc-800 rounded-xl overflow-hidden border border-white/10 shadow-md">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  {item.type === "code" && (
                    <div className="w-16 h-20 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center">
                      <FaFileCode className="text-amber-400 text-2xl" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center text-center max-w-[90px] sm:max-w-[110px]">
                  <span className="text-xs font-semibold text-white truncate w-full leading-snug">
                    {item.name}
                  </span>

                  {item.type === "folder" ? (
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {item.itemCount} items
                    </span>
                  ) : (
                    <span className="text-[9px] text-zinc-500 font-mono leading-none mt-0.5">
                      {item.date} • {item.size}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // =================================================================
          // LIST VIEW
          // =================================================================
          <div className="flex flex-col divide-y divide-white/5 pb-12">
            {displayItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === "folder") {
                    setCurrentFolder(item);
                  } else {
                    setActiveItemModal(item);
                  }
                }}
                className="flex items-center justify-between py-3 px-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {item.type === "folder" ? (
                    <div className="w-8 h-8 rounded-lg bg-[#2B8CFF]/20 text-[#2B8CFF] flex items-center justify-center">
                      <FaFolder className="text-lg" />
                    </div>
                  ) : item.type === "pdf" ? (
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center">
                      <FaRegFilePdf className="text-base" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center overflow-hidden border border-white/10">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaRegFileAlt className="text-sm" />
                      )}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">
                      {item.name}
                    </span>

                    <span className="text-[10px] text-zinc-500 font-mono">
                      {item.type === "folder"
                        ? `${item.itemCount} items`
                        : `${item.date} • ${item.size}`}
                    </span>
                  </div>
                </div>

                <FaChevronLeft className="rotate-180 text-zinc-600 text-xs" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===================================================================
          PREVIEW MODAL (FIXED FULL SCREEN & SCROLLING)
      =================================================================== */}

      {activeItemModal && (
        <div
          onClick={() => setActiveItemModal(null)}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg h-full max-h-[90vh] bg-[#1c1c1e] border border-white/15 rounded-3xl flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0 bg-[#1c1c1e]/90 backdrop-blur-md">
              <div className="flex items-center gap-2.5 min-w-0">
                {activeItemModal.icon && (
                  <div className="p-2 bg-[#007AFF]/10 rounded-xl text-[#007AFF] shrink-0">
                    {activeItemModal.icon}
                  </div>
                )}

                <span className="text-sm sm:text-base font-bold text-white truncate">
                  {activeItemModal.name}
                </span>
              </div>

              <button
                onClick={() => setActiveItemModal(null)}
                className="p-2 bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors shrink-0 cursor-pointer"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
              {activeItemModal.type === "project" && (
                <ProjectPreview project={activeItemModal} />
              )}

              {activeItemModal.type === "image" && (
                <div className="space-y-4">
                  <img
                    src={activeItemModal.imageUrl}
                    alt={activeItemModal.name}
                    className="w-full max-h-[60vh] object-contain rounded-2xl border border-white/10 bg-black/40"
                  />

                  <div className="flex justify-between text-xs text-zinc-400 font-mono">
                    <span>Date: {activeItemModal.date}</span>
                    <span>Size: {activeItemModal.size}</span>
                  </div>
                </div>
              )}

              {activeItemModal.type === "pdf" && (
                <div className="py-12 flex flex-col items-center justify-center gap-4">
                  <FaRegFilePdf className="text-red-500 text-6xl" />

                  <span className="text-xs text-zinc-400 font-mono">
                    {activeItemModal.name} ({activeItemModal.size})
                  </span>

                  <a
                    href={activeItemModal.downloadUrl}
                    download
                    className="px-6 py-2.5 bg-[#007AFF] hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}