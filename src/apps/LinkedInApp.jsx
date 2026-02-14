import React, { useState, useEffect } from "react";
import { FaLinkedin, FaExternalLinkAlt, FaBriefcase, FaGraduationCap, FaCode, FaUser, FaSpinner, FaMapMarkerAlt, FaCheckCircle, FaAward, FaBuilding } from "react-icons/fa";

// Import your local assets here (adjust paths based on your folder structure)
import coverImage from "../assets/cover-banner.png"; 
import profileImage from "../assets/profile-photo.jpeg";

export default function LinkedInApp() {
  const [loading, setLoading] = useState(true);

  // Profile data matched precisely to your LinkedIn screenshot details
  const [profileData] = useState({
    name: "Bikash Dalapati",
    headline: "Final Year CSE Student | Full Stack Developer (MERN) | Next.js | TypeScript | React.js | Node.js | REST APIs | Building Responsive & Scalable Web Applications.",
    location: "Midnapore, West Bengal, India",
    connections: "43",
    followers: "2,450",
    institution: "Om dayal group of institutions",
    about: "Passionate Computer Science Engineering student specializing in building high-performance web applications and solving complex algorithmic challenges with clean, modern code. Experienced in the MERN stack, Next.js, and modern responsive design architectures.",
    experience: [],
    education: [
      {
        school: "Om dayal group of institutions",
        degree: "Bachelor of Technology - BTech, Computer Science Engineering",
        period: "2023 - 2027",
        description: "Focused on core computer science fundamentals including Operating Systems, Computer Organization and Architecture (COA), and Database Management Systems (DBMS)."
      }
    ],
    certifications: [
      {
        title: "Advanced Data Structures & Algorithms in C++",
        issuer: "Codehelp",
        issueDate: "2025"
      },
      {
        title: "Full Stack Web Development By Harkirat Singh",
        issuer: "100xDevs",
        issueDate: "2025"
      }
    ],
    skills: [
      "Next.js", "TypeScript", "React.js", "Node.js", "Express.js", 
      "MongoDB", "C++", "Data Structures & Algorithms", "Tailwind CSS", "REST APIs"
    ]
  });

  // Simulating load time for smooth transition
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-[#1b1f23] text-white flex flex-col items-center justify-center gap-3 select-none font-sans">
        <FaSpinner className="animate-spin text-[#0a66c2] text-3xl" />
        <p className="text-xs text-zinc-400 tracking-wide font-medium">Syncing with LinkedIn profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#1b1f23] text-zinc-100 flex flex-col select-none font-sans overflow-y-auto scrollbar-none pb-8">
      
      {/* LinkedIn Mobile Top Safe Bar */}
      <div className="pt-12 sm:pt-0 px-4 pb-2 bg-[#1b1f23] sticky top-0 z-20 flex items-center justify-between border-b border-white/5 sm:border-none">
        <div className="flex items-center gap-3 w-full">
          {/* Reserve space for mobile back button */}
          <div className="w-8 h-8 shrink-0 sm:hidden" />
          <div className="flex-1 bg-zinc-800/80 border border-white/10 rounded-md px-3 py-1.5 flex items-center text-xs text-zinc-400">
            <span>Search</span>
          </div>
        </div>
      </div>

      {/* LinkedIn Profile Card Container */}
      <div className="bg-[#24292e] border-b border-white/10 shadow-lg">
        
        {/* Cover Banner Image - Adjusted height for Mobile like screenshot */}
        <div className="h-24 sm:h-44 w-full relative bg-zinc-900">
          <img 
            src={coverImage} 
            alt="Cover Banner" 
            className="w-full h-full object-cover"
          />
          <a
            href="https://www.linkedin.com/in/bikashdalapati09/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a66c2] hover:bg-[#004182] text-[11px] sm:text-xs font-semibold text-white transition-all shadow-md cursor-pointer z-10"
          >
            <span>View on LinkedIn</span>
            <FaExternalLinkAlt className="text-[9px]" />
          </a>

          {/* Profile Picture Positioned cleanly across breakpoints */}
          <div className="absolute -bottom-10 left-4 sm:-bottom-12 sm:left-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#24292e] shadow-2xl overflow-hidden bg-zinc-800 z-10">
            <img 
              src={profileImage} 
              alt="Bikash Dalapati" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Header Details */}
        <div className="px-4 sm:px-6 pb-6 relative">
          
          <div className="pt-12 sm:pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            
            {/* Left Column: Name, Headline, Location */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-bold tracking-tight text-white">{profileData.name}</h1>
                <FaCheckCircle className="text-[#71b5fb] text-sm" title="Verified Profile" />
              </div>
              
              <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-normal">
                {profileData.headline}
              </p>

              <div className="mt-2 text-[11px] text-zinc-400 font-medium">
                <p className="text-zinc-300">{profileData.institution}</p>
                <p className="mt-0.5">{profileData.location}</p>
              </div>

              <div className="flex items-center gap-4 mt-2 text-[11px]">
                <span className="text-[#71b5fb] font-semibold cursor-pointer">{profileData.connections} connections</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-full bg-[#70b5f9] text-black font-semibold text-xs text-center">
                  Open to
                </button>
                <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-full border border-[#70b5f9] text-[#70b5f9] font-semibold text-xs text-center">
                  Add section
                </button>
              </div>
            </div>

            {/* Right Column: Institution Box (Desktop view) */}
            <div className="hidden sm:flex bg-[#1b1f23]/80 border border-white/10 rounded-lg p-3 items-center gap-3 self-start">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[#71b5fb] text-sm">
                <FaBuilding />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{profileData.institution}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 flex flex-col gap-4 max-w-4xl mx-auto w-full">
        
        {/* About Section */}
        <div className="bg-[#24292e] rounded-lg p-5 border border-white/10 shadow-sm">
          <h2 className="text-sm font-bold tracking-wide text-white mb-2 flex items-center gap-2">
            <FaUser className="text-[#71b5fb]" /> About
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {profileData.about}
          </p>
        </div>

        {/* Experience Section */}
        <div className="bg-[#24292e] rounded-lg p-5 border border-white/10 shadow-sm">
          <h2 className="text-sm font-bold tracking-wide text-white mb-4 flex items-center gap-2">
            <FaBriefcase className="text-[#71b5fb]" /> Experience
          </h2>
          <div className="flex flex-col gap-4">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="flex gap-3 pb-4 border-b border-white/5 last:border-none last:pb-0">
                <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 text-xs shrink-0 mt-0.5">
                  {exp.company.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-white">{exp.role}</h3>
                  <p className="text-[11px] text-zinc-300">{exp.company} · {exp.employmentType}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{exp.period} · {exp.duration}</p>
                  <p className="text-[10px] text-zinc-400">{exp.location}</p>
                  
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {exp.skillsUsed.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-[#24292e] rounded-lg p-5 border border-white/10 shadow-sm">
          <h2 className="text-sm font-bold tracking-wide text-white mb-4 flex items-center gap-2">
            <FaGraduationCap className="text-[#71b5fb]" /> Education
          </h2>
          <div className="flex flex-col gap-3">
            {profileData.education.map((edu, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 text-xs shrink-0 mt-0.5">
                  🎓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{edu.school}</h3>
                  <p className="text-[11px] text-zinc-300">{edu.degree}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{edu.period}</p>
                  <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-[#24292e] rounded-lg p-5 border border-white/10 shadow-sm">
          <h2 className="text-sm font-bold tracking-wide text-white mb-4 flex items-center gap-2">
            <FaAward className="text-[#71b5fb]" /> Licenses & Certifications
          </h2>
          <div className="flex flex-col gap-3">
            {profileData.certifications.map((cert, index) => (
              <div key={index} className="flex gap-3 pb-3 border-b border-white/5 last:border-none last:pb-0">
                <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  📜
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{cert.title}</h3>
                  <p className="text-[11px] text-zinc-300">{cert.issuer}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Issued {cert.issueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-[#24292e] rounded-lg p-5 border border-white/10 shadow-sm">
          <h2 className="text-sm font-bold tracking-wide text-white mb-3 flex items-center gap-2">
            <FaCode className="text-[#71b5fb]" /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-[#38434f]/50 border border-white/10 text-xs text-zinc-200 font-medium hover:bg-[#38434f] transition-colors cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}