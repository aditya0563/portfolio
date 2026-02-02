import React, { useState, useRef, useEffect } from "react";

export default function TerminalApp() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", text: "Last login: " + new Date().toDateString() + " on ttys001" },
    { type: "output", text: "Type 'help' to see available commands." },
  ]);

  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);

  // 1. Focus input WITHOUT triggering browser page scrolling
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  // 2. Keep terminal scrolled to bottom internally when history updates
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "input", text: `bikash@macbook-pro ~ % ${input}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: "Available commands:\n  about         - Learn about Bikash\n  education     - View degree & college info\n  skills        - View languages, tools & tech stack\n  projects      - View featured software projects\n  achievements  - View competitive programming & LeetCode stats\n  contact       - View email, phone & social profiles\n  clear         - Clear terminal screen\n  date          - Show current date & time",
        });
        break;

      case "about":
        newHistory.push({
          type: "output",
          text: "BIKASH DALAPATI\nLocation: Uluberia, West Bengal, India\nSummary: Computer Science Engineering student specializing in MERN stack web development and DSA problem solving.",
        });
        break;

      case "education":
        newHistory.push({
          type: "output",
          text: "Degree: B.Tech in Computer Science and Engineering\nCollege: OmDayal Group of Institutions Engineering and Architecture College, Howrah\nCGPA: 7.8 (till 5th semester)\nRelevant Coursework: Data Structures, Operating Systems, OOPS, DBMS, Computer Networks",
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: "Languages: C, C++, JavaScript, Python\nFrontend: React.js, Redux, HTML, CSS, Tailwind CSS\nBackend: Node.js, Express.js, REST APIs, JWT\nDatabase: MongoDB, MySQL\nTools: Git, GitHub, Firebase, Razorpay, Postman",
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: "1. InterviewX | AI-Powered Mock Interview Platform\n   - Integrated GPT-4o Mini (OpenRouter) for resume analysis & interview generation.\n   - Tech Stack: React.js, Node.js, Express.js, MongoDB, Firebase, Razorpay, OpenRouter API\n\n2. Real-Time Chat Application\n   - Scalable chat platform using Socket.IO for low-latency communication.\n   - Tech Stack: React.js, Node.js, Express.js, MongoDB, Socket.IO\n\n3. Expense Tracker\n   - Full-stack MERN expense tracking app with JWT auth & transaction visualizer.\n   - Tech Stack: React.js, Node.js, Express.js, MongoDB, Tailwind CSS",
        });
        break;

