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
