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
      <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 flex flex-col gap-6 text-white text-sm">
        
        {/* Header Title */}
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-[#ff6b6b] flex items-center justify-center gap-2">
            Hi{" "}
            <img
              src="https://raw.githubusercontent.com/ABSphreak/ABSphreak/master/gifs/Hi.gif"
              alt="hi"
              className="w-7 h-7"
            />
            , I'm Bikash Dalapati
          </h1>
          <h3 className="text-xs font-medium text-[#ff6b6b] mt-1">
            A passionate Problem Solver and Full Stack Developer from India
          </h3>
        </div>

        {/* Hero GIF Illustration */}
        <div className="flex justify-center my-2">
          <img
            src="https://raw.githubusercontent.com/vsuman00/vsuman00/main/git.gif"
            alt="coding GIF"
            className="w-full max-w-[220px] rounded-lg"
          />
        </div>

        {/* Profile Views Badge */}
        <div>
          <img
            src="https://komarev.com/ghpvc/?username=bikashdalapati-09&label=Profile%20views&color=ff6b6b&style=plastic"
            alt="profile views"
            className="h-5"
          />
        </div>

        {/* About Me Section */}
        <div className="flex flex-col gap-3.5 bg-[#161b22] border border-[#30363d] p-3.5 rounded-lg text-xs">
          <div className="flex items-center gap-2 font-bold text-white">
            <img
              src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif"
              alt="wave"
              className="w-5 h-5"
            />
            <span>About Me:</span>
          </div>
          <ul className="flex flex-col gap-2.5 text-[#ff6b6b]">
            <li className="flex items-start gap-1.5">
              <span>🔭</span>
              <span>
                I’m currently working on <b className="text-white">Next js</b>
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span>🌱</span>
              <span>
                I’m currently learning <b className="text-white">MERN Stack</b>
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span>📫</span>
              <span>
                How to reach me{" "}
                <a
                  href="mailto:bikashdalapati09@gmail.com"
                  className="text-white underline break-all"
                >
                  bikashdalapati09@gmail.com
                </a>
              </span>
            </li>
          </ul>
        </div>

        {/* Connect With Me */}
        <div>
          <h2 className="text-sm font-bold text-white mb-3">Connect with me</h2>
          <div className="flex items-center gap-3">
            <a href="https://linkedin.com/in/bikashdalapati09" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
                alt="linkedin"
                className="h-8"
              />
            </a>
            <a href="https://twitter.com/bikashdalapati" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg"
                alt="twitter"
                className="h-8"
              />
            </a>
          </div>
        </div>

        {/* Coding Profiles */}
        <div>
          <h2 className="text-sm font-bold text-white mb-3">Coding Profiles</h2>
          <div className="flex items-center gap-3">
            <a href="https://www.leetcode.com/bikash_09" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg"
                alt="leetcode"
                className="h-8"
              />
            </a>
            <a href="https://www.codechef.com/users/bikash_09" target="_blank" rel="noreferrer">
              <img
                src="https://img.icons8.com/color/48/codechef.png"
                alt="codechef"
                className="h-8"
              />
            </a>
            <a href="https://codeforces.com/profile/AT6" target="_blank" rel="noreferrer">
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/free-code-forces-logo-icon-svg-download-png-3029920.png?f=webp&w=512"
                alt="codeforces"
                className="h-8"
              />
            </a>
          </div>
        </div>

        {/* Languages & Skills Grid */}
        <div>
          <h2 className="text-sm font-bold text-white mb-3">Languages & Skills</h2>
          <div className="flex flex-wrap items-center gap-3">
            <img src="https://img.icons8.com/?size=512&id=40670&format=png" alt="c" className="h-7" />
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" alt="cpp" className="h-7" />
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" className="h-7" />
            <img src="https://images.icon-icons.com/2107/PNG/512/file_type_html_icon_130541.png" alt="html" className="h-7" />
            <img src="https://images.icon-icons.com/1826/PNG/512/4202020css3htmllogosocialsocialmedia-115668_115633.png" alt="css" className="h-7" />
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="js" className="h-7" />
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" className="h-7" />
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" className="h-7" />
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" className="h-7" />
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" className="h-7" />
            <img src="https://img.icons8.com/color/48/redux.png" alt="redux" className="h-7" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="tailwind" className="h-7" />
            <img src="https://www.vectorlogo.zone/logos/mysql/mysql-ar21.svg" alt="mysql" className="h-7" />
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" alt="typescript" className="h-7" />
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nextjs-icon.png" alt="nextjs" className="h-7" />
          </div>
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-sm font-bold text-white mb-3">Tools</h2>
          <div className="flex flex-wrap items-center gap-3">
            <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" className="h-7" />
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" className="h-7" />
            <img src="https://img.icons8.com/?size=512&id=9OGIyU8hrxW5&format=png" alt="vscode" className="h-7" />
            <img src="https://images.icon-icons.com/3053/PNG/512/mongodb_compass_macos_bigsur_icon_189933.png" alt="compass" className="h-7" />
            <img src="https://img.icons8.com/?size=100&id=6RHskkZGRABM&format=png&color=000000" alt="sublime" className="h-7" />
            <img src="https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png&color=000000" alt="postman" className="h-7" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/3840px-ChatGPT_logo.svg.png" alt="chatgpt" className="h-7" />
          </div>
        </div>

        {/* Stats Cards & Contribution Graph */}
        <div className="flex flex-col gap-4 pt-2">
          <img
            src="https://github-readme-stats-lyart-six-14.vercel.app/api?username=bikashdalapati-09&show_icons=true&theme=radical&include_all_commits=true&count_private=true&hide_border=true&bg_color=0D1117&title_color=ff6b6b&icon_color=ff6b6b&text_color=c9d1d9"
            alt="GitHub Stats"
            className="w-full rounded-lg"
          />
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=bikashdalapati-09&custom_title=Contribution%20Graph&bg_color=0D1117&color=ff6b6b&line=ff6b6b&point=c9d1d9&area_color=ff6b6b&area=true&hide_border=true"
            alt="Contribution Graph"
            className="w-full rounded-lg"
          />
        </div>

      </div>
    </div>
  );
}