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

      case "achievements":
        newHistory.push({
          type: "output",
          text: "🏆 Solved 970+ DSA problems on LeetCode\n🏆 Achieved LeetCode contest rating of 1608 with a 500+ daily POTD streak\n🏆 Achieved CodeChef 2-star rating (1400+)",
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: "Phone: +91-8927182293\nEmail: bikashdalapati09@gmail.com\nLinkedIn: linkedin.com/in/bikashdalapati09\nGitHub: github.com/bikashdalapati-09",
        });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "date":
        newHistory.push({ type: "output", text: new Date().toString() });
        break;

      default:
        newHistory.push({
          type: "output",
          text: `zsh: command not found: ${input}. Type 'help' for available commands.`,
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div
      ref={scrollContainerRef}
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      className="w-full h-full min-h-0 flex flex-col p-4 bg-black/85 backdrop-blur-xl font-mono text-xs text-emerald-400 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent cursor-text"
    >
      <div className="flex flex-col gap-2">
        {history.map((item, index) => (
          <div
            key={index}
            className={
              item.type === "input"
                ? "text-white font-semibold"
                : "text-zinc-300 whitespace-pre-line"
            }
          >
            {item.text}
          </div>
        ))}

        {/* Active Command Prompt Line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-1 shrink-0">
          <span className="text-emerald-500 font-bold shrink-0">bikash@macbook ~ %</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-white outline-none font-mono text-xs caret-emerald-400"
          />
        </form>
      </div>
    </div>
  );
}