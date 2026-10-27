import React from "react";
import { NavTab } from "./NavigationDock";
import { ProjectsSection } from "./ProjectsSection";
import { CertificatesSection } from "./CertificatesSection";
import {
  Code2,
  Briefcase,
  Award,
  FolderKanban,
  User,
  Send,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface SectionViewProps {
  tab: NavTab;
  onBackToHome: () => void;
}

interface SectionMeta {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  previewTags: string[];
}

const sectionConfig: Record<Exclude<NavTab, "home">, SectionMeta> = {
  skills: {
    title: "TECHNICAL SKILLS & EXPERTISE",
    subtitle: "Full-Stack Development, Architecture & Mentorship",
    icon: Code2,
    description:
      "Core technologies, frameworks, and engineering tools leveraged to build high-performance web applications and scalable digital solutions.",
    previewTags: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "System Design",
      "Technical Instruction",
    ],
  },
  certifications: {
    title: "CERTIFICATIONS & CREDENTIALS",
    subtitle: "Validated Expertise & Continuous Learning",
    icon: Award,
    description:
      "Professional credentials and specialized certifications demonstrating dedication to lifelong learning and mastery in software engineering.",
    previewTags: [
      "Full Stack Specialization",
      "Cloud Architecture",
      "Algorithmic Problem Solving",
      "Technical Mentorship",
    ],
  },
  experience: {
    title: "WORK EXPERIENCE & TEACHING",
    subtitle: "Professional Career Timeline & Teaching Impact",
    icon: Briefcase,
    description:
      "Hands-on experience delivering enterprise web systems and mentoring the next generation of engineers as an instructor.",
    previewTags: [
      "Software Development",
      "Technical Instructor",
      "Curriculum Design",
      "Code Reviews",
      "Engineering Leadership",
    ],
  },
  projects: {
    title: "FEATURED PROJECTS & BUILDS",
    subtitle: "Selected Works, Production Apps & Open Source",
    icon: FolderKanban,
    description:
      "A curated showcase of applications built with high standards of performance, clean architecture, and delightful user experience.",
    previewTags: [
      "Full-Stack Web Apps",
      "Developer Tools",
      "Interactive Platforms",
      "API Integrations",
    ],
  },
  about: {
    title: "ABOUT VALLEPU ROHITH",
    subtitle: "Software Developer, Lifelong Learner & Instructor",
    icon: User,
    description:
      "Driven by a passion to transform complex ideas into elegant reality through code, education, and thoughtful digital engineering.",
    previewTags: [
      "Software Developer",
      "Tech Educator",
      "Problem Solver",
      "Lifelong Learner",
    ],
  },
  contact: {
    title: "GET IN TOUCH",
    subtitle: "Collaboration, Inquiries & Mentorship",
    icon: Send,
    description:
      "Have an exciting project, speaking engagement, or instructional collaboration in mind? Reach out directly.",
    previewTags: [
      "LinkedIn Direct",
      "GitHub Collaboration",
      "Email Inquiries",
      "Mentorship Sessions",
    ],
  },
};

export interface SkillItem {
  name: string;
  image?: string; // Users can supply image paths here anytime: { name: "React", image: "/assets/react.svg" }
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "Redis" },
    ],
  },
  {
    id: "programming",
    number: "03",
    title: "Programming",
    skills: [
      { name: "Python" },
      { name: "C" },
      { name: "Java" },
    ],
  },
  {
    id: "tools",
    number: "04",
    title: "Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
      { name: "VS Code" },
    ],
  },
];

export const SectionView: React.FC<SectionViewProps> = ({
  tab,
  onBackToHome,
}) => {
  if (tab === "home") return null;

  // Dedicated 3D Spatial Coverflow View for PROJECTS
  if (tab === "projects") {
    return <ProjectsSection onBackToHome={onBackToHome} />;
  }

  // Dedicated 3D Curved Perspective Carousel View for CERTIFICATIONS (Matching Reference Image)
  if (tab === "certifications") {
    return <CertificatesSection onBackToHome={onBackToHome} />;
  }

  const meta = sectionConfig[tab];
  const Icon = meta.icon;

  // Custom Sunset Theme View for SKILLS only
  if (tab === "skills") {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 py-20 sm:py-24 lg:py-28 z-20 overflow-y-auto sunset-screen-bg">
        {/* Main Sunset Container with Rounded Edges */}
        <div className="w-full max-w-6xl rounded-3xl p-6 sm:p-10 lg:p-12 backdrop-blur-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300 border border-[#FFE3B3]/40 shadow-[0_24px_60px_rgba(180,60,0,0.25)] bg-[#EA6113]/25">
          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            type="button"
            className="self-start mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-[#FFE3B3] border border-[#FFE3B3]/50 bg-[#EA6113]/50 hover:bg-[#FFE3B3] hover:text-[#EA6113] shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          {/* Section Badge Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#FBB931] border border-[#FFE3B3]/60 flex items-center justify-center text-[#FFE3B3] shadow-[0_8px_24px_rgba(180,60,0,0.3)] mb-5">
            <Icon className="w-8 h-8 drop-shadow-sm" />
          </div>

          {/* Section Title */}
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-[#FFE3B3] uppercase mb-2 drop-shadow-[0_2px_4px_rgba(160,50,0,0.5)]">
            {meta.title}
          </h2>
          <p className="text-sm sm:text-base text-[#FFE3B3]/90 font-medium mb-4 drop-shadow-[0_1px_2px_rgba(160,50,0,0.4)]">
            {meta.subtitle}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#FFE3B3]/85 max-w-2xl mb-8 leading-relaxed drop-shadow-[0_1px_1px_rgba(160,50,0,0.3)]">
            {meta.description}
          </p>

          {/* Highlights & Specializations */}
          <div className="w-full mb-10">
            <div className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#FFE3B3] mb-3 drop-shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE3B3]" />
              <span>Highlights &amp; Specializations</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {meta.previewTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-[#FBB931] border border-[#FFE3B3]/60 text-[#FFE3B3] font-semibold shadow-sm hover:scale-105 hover:bg-[#FFE3B3] hover:text-[#EA6113] transition-all cursor-default drop-shadow-[0_1px_1px_rgba(140,40,0,0.4)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Under Highlights and Specialization: Practical Toolkit Grid (Matching User Reference Image) */}
          <div className="w-full pt-8 border-t border-[#FFE3B3]/30 text-left">
            {/* Header matching Picture 1 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#FFE3B3]/85 uppercase mb-2">
                  02 — SKILLS
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FFE3B3] drop-shadow-[0_2px_4px_rgba(150,50,0,0.5)]">
                  A practical toolkit for thoughtful products.
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#FFE3B3]/90 max-w-md font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(140,40,0,0.4)]">
                A balanced mix of interface craft, engineering fundamentals, and the tools needed to move from idea to dependable release.
              </p>
            </div>

            {/* 2x2 Grid of Category Boxes: Frontend, Backend, Programming, Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
              {skillCategories.map((category) => (
                <div
                  key={category.id}
                  className="sunset-category-box p-6 sm:p-7 flex flex-col justify-between"
                >
                  {/* Category Header: Title on Left, Number on Right */}
                  <div className="flex items-center justify-between mb-6 pb-2.5 border-b border-[#FFE3B3]/35">
                    <h4 className="font-bold text-xl sm:text-2xl tracking-wide text-[#FFE3B3] drop-shadow-[0_1.5px_2px_rgba(140,45,0,0.7)]">
                      {category.title}
                    </h4>
                    <span className="font-mono text-sm sm:text-base font-semibold text-[#FFE3B3]/90 drop-shadow-[0_1px_1px_rgba(140,45,0,0.6)]">
                      {category.number}
                    </span>
                  </div>

                  {/* Inside Technical Skills 3-Column Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="sunset-skill-card p-3.5 sm:p-4 flex flex-col justify-between min-h-[96px] sm:min-h-[108px] group"
                      >
                        {/* Picture Slot / Icon Container with Base Color #F88F22 */}
                        <div className="w-8 h-8 rounded-lg bg-[#F88F22] border border-[#FFE3B3]/40 flex items-center justify-center text-[#FFE3B3] mb-3 group-hover:scale-110 group-hover:border-[#FFE3B3] transition-transform shadow-inner">
                          {skill.image ? (
                            <img
                              src={skill.image}
                              alt={skill.name}
                              className="w-5 h-5 object-contain"
                            />
                          ) : (
                            <span className="font-mono font-bold text-xs tracking-tighter text-[#FFE3B3]">
                              &lt;/&gt;
                            </span>
                          )}
                        </div>

                        {/* Skill Name */}
                        <span className="font-semibold text-xs sm:text-sm tracking-wide text-[#FFE3B3] leading-snug drop-shadow-[0_1px_1px_rgba(120,35,0,0.5)]">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Editorial View for all other sections (About, Projects, Experience, Certifications, Contact)
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 sm:py-28 z-20 overflow-y-auto sky-ambient-bg">
      {/* Frosted Glass Content Container */}
      <div className="w-full max-w-3xl rounded-3xl frosted-card p-6 sm:p-10 backdrop-blur-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
          type="button"
          className="self-start mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-[#1e334d] border border-white/90 bg-white/70 hover:bg-white hover:text-[#0c1827] shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Section Badge Icon */}
        <div className="w-16 h-16 rounded-2xl bg-white/80 border border-white flex items-center justify-center text-[#1b3452] shadow-[0_8px_20px_rgba(25,50,85,0.08)] mb-5">
          <Icon className="w-8 h-8" />
        </div>

        {/* Section Title */}
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-wider text-[#0f1c2e] uppercase mb-2">
          {meta.title}
        </h2>
        <p className="text-sm sm:text-base text-[#3b526d] font-medium mb-4">
          {meta.subtitle}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#5a738e] max-w-lg mb-8 leading-relaxed">
          {meta.description}
        </p>

        {/* Preview / Key Pillars */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#224467] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Highlights &amp; Specializations</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {meta.previewTags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs bg-white/75 border border-white text-[#2a4361] font-medium shadow-sm hover:bg-white transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Notice */}
        <div className="w-full rounded-2xl p-4 bg-white/60 border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="text-xs text-[#47607a]">
            <span className="font-semibold text-[#0f1c2e] block mb-0.5">
              Ready for customized section content
            </span>
            Tell me what details or interactive layout you'd like here and we will bring it to life!
          </div>
          <button
            onClick={onBackToHome}
            type="button"
            className="dock-pill active shrink-0 cursor-pointer"
          >
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

