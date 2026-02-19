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

export default function GitHubMobileProfile({ username = "bikashdalapati-09" }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setProfile(userData);
        }
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(reposData);
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
          src={profile?.avatar_url || "https://github.com/bikashdalapati-09.png"}
          alt={profile?.name || username}
          className="w-16 h-16 rounded-full border border-[#30363d] object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white leading-snug">
            {profile?.name || "Bikash Dalapati"}
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
        <div className="flex items-center justify-between p-3.5 hover:bg-[#21262d] transition-colors">
          <div className="flex items-center gap-3 text-white">
            <BookOpen className="w-5 h-5 text-[#8b949e]" />
            <span>Repositories</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8b949e]">
            <span>{profile?.public_repos || repos.length}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center justify-between p-3.5 hover:bg-[#21262d] transition-colors">
          <div className="flex items-center gap-3 text-white">
            <Star className="w-5 h-5 text-amber-400" />
            <span>Starred</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8b949e]">
            <span>2</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center justify-between p-3.5 hover:bg-[#21262d] transition-colors">
          <div className="flex items-center gap-3 text-white">
            <Building className="w-5 h-5 text-[#8b949e]" />
            <span>Organizations</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8b949e]">
            <span>0</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center justify-between p-3.5 hover:bg-[#21262d] transition-colors">
          <div className="flex items-center gap-3 text-white">
            <FolderGit2 className="w-5 h-5 text-[#8b949e]" />
            <span>Projects</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8b949e]">
            <span>1</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
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
