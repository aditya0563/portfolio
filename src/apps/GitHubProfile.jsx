import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Link as LinkIcon,
  Users,
  BookOpen,
  Star,
  GitFork,
  ExternalLink,
  Loader2,
  Package,
  Boxes,
  Edit2,
  Pencil,
  Smile
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function GitHubProfile() {
  const [profileInput, setProfileInput] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [readmeContent, setReadmeContent] = useState("");

  // Helper to extract clean username from plain text or URL inputs
  const extractUsername = (input) => {
    let cleaned = input.trim();
    if (!cleaned) return "";

    cleaned = cleaned.replace(/\/+$/, "");

    if (cleaned.includes("github.com/")) {
      const parts = cleaned.split("github.com/");
      const pathParts = parts[parts.length - 1].split("/");
      return pathParts[0];
    }

    return cleaned;
  };

  const fetchGitHubData = async (rawInput) => {
    const user = extractUsername(rawInput);
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Fetch User Profile Data via GitHub API
      const userRes = await fetch(`https://api.github.com/users/${user}`);
      
      if (!userRes.ok) {
        throw new Error(
          userRes.status === 404
            ? "GitHub profile not found."
            : userRes.status === 403
            ? "GitHub API rate limit exceeded. Please try again later."
            : "Failed to load GitHub profile."
        );
      }
      const userData = await userRes.json();

      // 2. Fetch User Repositories (sorted by updated date)
      const reposRes = await fetch(
        `https://api.github.com/users/${user}/repos?sort=updated&per_page=6`
      );
      const reposData = reposRes.ok ? await reposRes.json() : [];

      setProfile(userData);
      setRepos(reposData);
      // 3. Fetch User README
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${user}/${user}/readme`);
        if (readmeRes.ok) {
          const readmeData = await readmeRes.json();
          // GitHub API returns base64 encoded content
          // Sometimes there are newlines in the base64 string, so we replace them before decoding
          setReadmeContent(decodeURIComponent(escape(window.atob(readmeData.content.replace(/\n/g, "")))));
        } else {
          setReadmeContent("No README found for this profile.");
        }
      } catch (e) {
        setReadmeContent("Failed to load README.");
      }

    } catch (err) {
      setError(err.message || "An error occurred while fetching the profile.");
      setProfile(null);
      setRepos([]);
      setReadmeContent("");
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch default profile on initial render
  useEffect(() => {
    fetchGitHubData("aditya0563");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (profileInput.trim()) {
      fetchGitHubData(profileInput);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans antialiased overflow-y-auto">
      {/* Top Desktop Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#161b22] border-b border-[#30363d] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 fill-white cursor-pointer hover:opacity-80 transition-opacity"
              viewBox="0 0 16 16"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <span className="font-semibold text-white text-sm hidden sm:inline-block">
              {profile?.login || "GitHub"}
            </span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <input
              type="text"
              value={profileInput}
              onChange={(e) => setProfileInput(e.target.value)}
              placeholder="Type '/' to search or paste profile URL..."
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md py-1.5 pl-9 pr-8 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <span className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 border border-[#30363d] px-1.5 py-0.5 rounded bg-[#161b22]">
              /
            </span>
          </form>

          <div className="flex items-center gap-3">
            <a
              href={profile?.html_url || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#58a6ff] hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Full Screen Loader */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-40 gap-3 text-[#8b949e]">
            <Loader2 className="w-8 h-8 animate-spin text-[#58a6ff]" />
            <p className="text-sm font-medium animate-pulse">
              Loading profile details...
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-md p-4 text-center my-10 text-sm">
            {error}
          </div>
        )}

        {!loading && profile && (
          <>
            {/* Desktop Tabs Header */}
            <div className="border-b border-[#30363d] mb-6">
              <nav className="flex gap-6 text-sm font-medium">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
                    activeTab === "overview"
                      ? "border-[#f78166] text-white font-semibold"
                      : "border-transparent text-[#8b949e] hover:text-white"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("repositories")}
                  className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
                    activeTab === "repositories"
                      ? "border-[#f78166] text-white font-semibold"
                      : "border-transparent text-[#8b949e] hover:text-white"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Repositories
                  <span className="bg-[#21262d] text-[#8b949e] text-xs px-2 py-0.5 rounded-full border border-[#30363d]">
                    {profile.public_repos}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`hidden sm:flex items-center gap-2 pb-3 border-b-2 transition-colors ${
                    activeTab === "projects"
                      ? "border-[#f78166] text-white font-semibold"
                      : "border-transparent text-[#8b949e] hover:text-white"
                  }`}
                >
                  <Boxes className="w-4 h-4" />
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab("packages")}
                  className={`hidden sm:flex items-center gap-2 pb-3 border-b-2 transition-colors ${
                    activeTab === "packages"
                      ? "border-[#f78166] text-white font-semibold"
                      : "border-transparent text-[#8b949e] hover:text-white"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Packages
                </button>
                <button
                  onClick={() => setActiveTab("stars")}
                  className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
                    activeTab === "stars"
                      ? "border-[#f78166] text-white font-semibold"
                      : "border-transparent text-[#8b949e] hover:text-white"
                  }`}
                >
                  <Star className="w-4 h-4" />
                  Stars
                </button>
              </nav>
            </div>

            {/* Layout Grid: Sidebar Profile + Main Content Column */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Column: Fixed/Sticky Sidebar Profile Info */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-20 flex flex-col items-center lg:items-start">
                  {/* User Avatar with Status Icon */}
                  <div className="relative mb-4 group">
                    <img
                      src={profile.avatar_url}
                      alt={profile.name || profile.login}
                      className="w-48 h-48 sm:w-64 sm:h-64 lg:w-full lg:h-auto rounded-full border border-[#30363d] object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#161b22] border border-[#30363d] p-1.5 rounded-full text-gray-400 hover:text-white cursor-pointer shadow-md">
                      <Smile className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Name and Handle */}
                  <h1 className="text-2xl font-bold text-white leading-tight">
                    {profile.name || profile.login}
                  </h1>
                  <h2 className="text-lg text-[#8b949e] font-light mb-4">
                    {profile.login}
                  </h2>

                  {/* Edit Profile Button */}
                  <button className="w-full bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white text-xs font-semibold py-1.5 px-3 rounded-md transition-colors mb-4">
                    Edit profile
                  </button>

                  {/* Followers & Following */}
                  <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 w-full">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold text-white">
                      {profile.followers}
                    </span>{" "}
                    followers
                    <span>·</span>
                    <span className="font-semibold text-white">
                      {profile.following}
                    </span>{" "}
                    following
                  </div>

                  {/* Profile Metadata */}
                  <div className="w-full space-y-2 text-xs text-[#8b949e] border-t border-[#30363d] pt-4">
                    {profile.company && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 shrink-0" />
                        <span className="truncate">{profile.company}</span>
                      </div>
                    )}
                    {profile.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">{profile.location}</span>
                      </div>
                    )}
                    {profile.blog && (
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 shrink-0" />
                        <a
                          href={
                            profile.blog.startsWith("http")
                              ? profile.blog
                              : `https://${profile.blog}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="text-white hover:text-[#58a6ff] hover:underline truncate"
                        >
                          {profile.blog}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Main Content */}
              <div className={`lg:col-span-3 relative ${activeTab !== "overview" ? "max-h-[65vh] overflow-hidden rounded-md" : ""}`}>
                {/* Blur Overlay for non-overview tabs */}
                {activeTab !== "overview" && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d1117]/30 backdrop-blur-[6px] rounded-md border border-[#30363d]/50">
                    <h3 className="text-white text-lg font-bold mb-4 capitalize">
                      {activeTab}
                    </h3>
                    <a
                      href={`https://github.com/${profile.login}?tab=${activeTab}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on GitHub
                    </a>
                  </div>
                )}
                
                {/* Main Content (Blurred if not overview) */}
                <div className={`space-y-8 transition-all duration-300 ${activeTab !== "overview" ? "blur-[4px] opacity-60 pointer-events-none select-none" : ""}`}>
                  {/* Simulated README Markdown Box */}
                <div className="border border-[#30363d] rounded-md bg-[#0d1117]">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[#30363d] text-xs text-[#8b949e]">
                    <span className="font-mono">
                      {profile.login} / README.md
                    </span>
                    <Pencil className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                  </div>
                  <div className="p-6 text-sm text-[#c9d1d9] overflow-hidden prose prose-invert max-w-none prose-img:max-w-full">
                    {readmeContent ? (
                      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                        {readmeContent}
                      </ReactMarkdown>
                    ) : (
                      <div className="text-center text-gray-500 py-10">
                        {loading ? "Loading README..." : "No README found for this profile."}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pinned Repositories Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">Pinned</h3>
                    <span className="text-xs text-[#8b949e] hover:text-[#58a6ff] cursor-pointer">
                      Customize your pins
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repos.length === 0 ? (
                      <p className="text-xs text-gray-500 col-span-2">
                        No pinned repositories available.
                      </p>
                    ) : (
                      repos.slice(0, 4).map((repo) => (
                        <div
                          key={repo.id}
                          className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 flex flex-col justify-between hover:border-[#8b949e] transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#58a6ff] font-semibold text-xs hover:underline truncate flex items-center gap-1.5"
                              >
                                <BookOpen className="w-3.5 h-3.5 text-[#8b949e]" />
                                {repo.name}
                              </a>
                              <span className="text-[10px] text-[#8b949e] border border-[#30363d] px-2 py-0.5 rounded-full capitalize">
                                {repo.visibility}
                              </span>
                            </div>

                            <p className="text-xs text-[#8b949e] line-clamp-2 mb-4 min-h-[32px]">
                              {repo.description || "No description provided."}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                            {repo.language && (
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]" />
                                <span>{repo.language}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 hover:text-[#58a6ff]">
                              <Star className="w-3.5 h-3.5" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center gap-1 hover:text-[#58a6ff]">
                              <GitFork className="w-3.5 h-3.5" />
                              <span>{repo.forks_count}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Contribution Graph Section */}
                <div className="border-t border-[#30363d] pt-6">
                  <h3 className="text-sm font-semibold text-white mb-3">
                    Contribution Graph
                  </h3>
                  <div className="border border-[#30363d] rounded-md p-4 overflow-x-auto bg-[#0d1117] flex justify-center">
                    <img
                      src={`https://ghchart.rshah.org/40c463/${profile.login}`}
                      alt="Contribution Graph"
                      className="w-full min-w-[600px] h-auto"
                    />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}