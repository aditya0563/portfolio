import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Star,
  Building,
  FolderGit2,
  Users,
  ChevronRight,
  Pin,
  Pencil,
  Plus,
  Share2,
  ChevronLeft,
  ExternalLink
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function GitHubMobileProfile({ username = "aditya0563" }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [userRes, reposRes, readmeRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/repos/${username}/${username}/readme`)
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setProfile(userData);
        }
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(reposData);
        }
        if (readmeRes.ok) {
          const readmeData = await readmeRes.json();
          setReadmeContent(decodeURIComponent(escape(window.atob(readmeData.content.replace(/\n/g, "")))));
        } else {
          setReadmeContent("No README found for this profile.");
        }
      } catch (err) {
        console.error("Failed to fetch GitHub mobile data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] pt-14 p-4 flex items-center justify-center sm:hidden">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans pt-12 pb-16 px-4 select-none sm:hidden">
      
      {/* 1. iOS App Top Navigation Bar */}
      <div className="flex items-center justify-between pb-4">
        <button className="text-[#58a6ff] hover:opacity-80 transition-opacity">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          {/* Go to GitHub Button */}
          <a
            href={profile?.html_url || `https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] text-xs font-semibold text-white transition-all shadow-sm"
          >
            <span>Go to GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-3 text-white ml-1">
            <button className="hover:opacity-80">
              <Plus className="w-5 h-5" />
            </button>
            <button className="hover:opacity-80">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Profile Header (Avatar, Name, Bio) */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={profile?.avatar_url || "https://github.com/aditya0563.png"}
          alt={profile?.name || username}
          className="w-16 h-16 rounded-full border border-[#30363d] object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white leading-snug">
            {profile?.name || "Aditya Thakur"}
          </h1>
          <span className="text-sm text-[#8b949e]">
            {profile?.login || username}
          </span>
        </div>
      </div>

      {/* Bio / Status Bar */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 flex items-center justify-between mb-4">
        <span className="text-xs text-white truncate pr-2">
          {profile?.bio || "Coding daily, No excuse !!! ..."}
        </span>
        <Pencil className="w-3.5 h-3.5 text-[#8b949e] shrink-0" />
      </div>

      {/* Info Rows */}
      <div className="flex flex-col gap-2 text-xs text-[#8b949e] mb-6">
        {profile?.email && (
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">✉</span>
            <a href={`mailto:${profile.email}`} className="text-white hover:underline truncate">
              {profile.email}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#8b949e]" />
          <span>
            <strong className="text-white">{profile?.followers ?? 3}</strong> followers ·{" "}
            <strong className="text-white">{profile?.following ?? 2}</strong> following
          </span>
        </div>
      </div>

      {/* 3. iOS GitHub Menu List */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden mb-6 text-sm divide-y divide-[#30363d]">
        <a href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 hover:bg-[#21262d] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 text-white">
            <BookOpen className="w-5 h-5 text-[#8b949e]" />
            <span>Repositories</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8b949e]">
            <span>{profile?.public_repos || repos.length}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </a>

        <a href={`https://github.com/${username}?tab=stars`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 hover:bg-[#21262d] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 text-white">
            <Star className="w-5 h-5 text-amber-400" />
            <span>Starred</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8b949e]">
            <span>2</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </a>

        <a href={`https://github.com/${username}?tab=organizations`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 hover:bg-[#21262d] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 text-white">
            <Building className="w-5 h-5 text-[#8b949e]" />
            <span>Organizations</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8b949e]">
            <span>0</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </a>

        <a href={`https://github.com/${username}?tab=projects`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 hover:bg-[#21262d] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 text-white">
            <FolderGit2 className="w-5 h-5 text-[#8b949e]" />
            <span>Projects</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8b949e]">
            <span>1</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </a>
      </div>

      {/* 4. Pinned Repositories Carousel */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 text-xs text-[#8b949e] font-semibold uppercase tracking-wider">
          <Pin className="w-3.5 h-3.5 rotate-45" />
          <span>Pinned</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {repos.slice(0, 4).map((repo) => (
            <div
              key={repo.id}
              className="min-w-[260px] max-w-[260px] bg-[#161b22] border border-[#30363d] rounded-xl p-3.5 flex flex-col justify-between snap-start shrink-0"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <img
                    src={profile?.avatar_url}
                    alt="avatar"
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-xs text-[#8b949e] truncate">
                    {username}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white truncate mb-1">
                  {repo.name}
                </h3>
                <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed mb-3">
                  {repo.description || "No description provided."}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#8b949e]">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  <span>{repo.stargazers_count}</span>
                </div>
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span>{repo.language}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Readme Section Header */}
      <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 border-t border-[#30363d] pt-4">
        <span>{username} / README.md</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>

      {/* 6. Rendered Readme Markdown Content */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 text-white text-sm overflow-hidden prose prose-invert max-w-none prose-img:max-w-full">
        {readmeContent && readmeContent !== "No README found for this profile." ? (
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {readmeContent}
          </ReactMarkdown>
        ) : (
          <div className="text-center text-gray-500 py-6">
            {readmeContent || "No README found for this profile."}
          </div>
        )}
      </div>
    </div>
  );
}