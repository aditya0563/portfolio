import {
  Home,
  Code,
  Award,
  User,
  Mail,
  type LucideIcon,
} from "lucide-react";

export interface Profile {
  name: string;
  title: string;
  avatarUrl: string;
  avatarAlt: string;
  shortDescription: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  twitterUrl: string;
  email: string;    
  location: string;
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  githubUrl: string;
  liveUrl?: string;
  isFeatured: boolean;
  type?: string;
}

export interface Certification {
  id: string;
  title: string;       // e.g., "Full Stack Web Development Certification"
  issuer: string;      // e.g., "NPTEL / IIT Madras"
  description: string;
}
export const profile: Profile = {
  name: "Aditya Thakur",
  title: "Full-Stack Developer",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYntqiHliiGbcGLqMTmnPnZlu9d4lqqruPLl8V2CwK3K8PgxqEqgQiW3fnWanhunYJjKzU-6IDRSU03uL28_mrdNZECFU3GV_GqNo2SgphYDp2fvWb_kXOGe3NEp5u8Z-lzlC4Xyt0j1mwvUnsQGFrPxmNDk3Sy0Zmrjy2oCtb2VwrB9GqQoRaWuXu9dkzyJLL61ZIemlJ2Ar_SOMpkhenPLDf9FmFiEgEw8U5fRHGzuZnLnRZTzaJOid106r1Lqu2l1YR9DvXLjg",
  avatarAlt: "Aditya Thakur's professional profile picture",
  shortDescription: "I am a Computer Science and Engineering student specializing in advanced full-stack web development. My focus is on building performant applications utilizing modern monorepo architectures, type-safe toolchains, and robust deployment strategies.",
  githubUrl: "https://github.com/aditya0563",
  linkedinUrl: "https://www.linkedin.com/in/aditya-thakur-1507091aa/",
  leetcodeUrl: "https://leetcode.com/u/Aditya_0567/",
  twitterUrl: "#",
  email: "taditiya870@gmail.com",
  location: "Delhi, India",
};

export const navItems: NavItem[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Projects", icon: Code, href: "/projects" },
  { label: "Certifications", icon: Award, href: "/certifications" },
  { label: "About", icon: User, href: "/about" },
  { label: "Contact", icon: Mail, href: "/contact" },
];

export const projects: Project[] = [
  {
    id: "modern-full-stack",
    title: "Modern Full-Stack Boilerplate",
    description: "Production-ready Turborepo starter designed for enterprise scale. Features end-to-end type safety, modern ORM, and optimized deployment pipelines.",
    tags: ["NextJS", "tRPC", "Drizzle"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCIjxDvQaHqpO9Lvr6z8-QicycTmG5oKitJcdkiPhgnsL0tgEGv5Yi71MHvwvA2lkgy5cAryL45nvJzrp2O2N0VeV4vtuEGYsI_QWFbsCzxi8U3cg97RmxmLXDzLqW-XAzNUbwAs0z5J-siq1yzQocZsjvyTiScTAkJLk0t0Qm43OkYkImfH9JWYcW_22s2QuicmGsbwrpeLCjgPkcsIJ5q9ELgprdA_jajhKMyibuxEaqBD5Ttfim-yjVhO5Le9_LOiR9dhIseDQ",
    imageAlt: "Showcase of a modern web application interface",
    githubUrl: "#",
    liveUrl: "#",
    isFeatured: true,
    type: "E-Commerce",
  },
  {
    id: "scalable-monorepo",
    title: "Scalable Monorepo System",
    description: "Orchestrated multi-service architecture using Turborepo and Docker, reducing build times by 40%.",
    tags: ["Turborepo", "Docker"],
    imageUrl: "",
    imageAlt: "",
    githubUrl: "#",
    isFeatured: false,
  },
  {
    id: "ecommerce-api",
    title: "Type-Safe E-Commerce API",
    description: "Robust backend service handling complex transactions with strict validation and caching layers.",
    tags: ["NodeJS", "PostgreSQL"],
    imageUrl: "",
    imageAlt: "",
    githubUrl: "#",
    isFeatured: false,
  },
  {
    id: "algo-visualizer",
    title: "Algo-Visualizer",
    description: "Interactive React-based tool for visualizing complex data structures and algorithms in real-time. Designed for educational purposes with custom animation hooks.",
    tags: ["React", "Algorithms"],
    imageUrl: "",
    imageAlt: "",
    githubUrl: "#",
    liveUrl: "#",
    isFeatured: false,
  },
];

export const certifications: Certification[] = [
  { 
    id: "cert-nptel",
    title: "Full Stack Web Development Certification", 
    issuer: "NPTEL / IIT Madras",
    description: "Comprehensive training focused on modern application development, robust system design, and scalable architecture paradigms."
  },
  { 
    id: "cert-cloud",
    title: "Cloud Engineering & Gen AI", 
    issuer: "Google Cloud Study Jam",
    description: "Mastering cloud infrastructure and generative AI deployment strategies."
  },
  { 
    id: "cert-gdg",
    title: "Technical Lead / Core Member", 
    issuer: "GDG DSEU",
    description: "Driving community building initiatives and facilitating Google Cloud Study Jams to mentor aspiring developers."
  },
  { 
    id: "cert-ust",
    title: "Innovation Challenge Participant", 
    issuer: "UST D3CODE Hackathon",
    description: "Developed novel solutions focusing on data intelligence and exploring quantum computing applications."
  },
];
