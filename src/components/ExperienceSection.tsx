import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Binary,
  Layers,
  RotateCcw,
  Eye,
} from "lucide-react";
import { NavTab } from "./NavigationDock";

export interface ExperienceItem {
  id: string;
  company: string;
  companyTag: string;
  location: string;
  designation: string;
  period: string;
  type: string;
  pageNumber: string;
  chapterTitle: string;
  image: string;
  imageAlt: string;
  designationBadge: string;
  focusArea: string;
  summary: string;
  description: string[];
  keyHighlights: string[];
  skills: string[];
  quote: string;
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "bytexl",
    company: "ByteXL",
    companyTag: "EdTech & Engineering Solutions",
    location: "Hyderabad, India",
    designation: "Technical Instructor — DSA & CRT Trainer",
    period: "2023 – Present",
    type: "Full-Time · Technical Instruction & Training",
    pageNumber: "01",
    chapterTitle: "Chapter I — Data Structures, Algorithms & CRT",
    image: "/assets/experience/bytexl.jpg",
    imageAlt: "ByteXL Data Structures & Algorithms and CRT Classroom Training in Hyderabad",
    designationBadge: "DSA & CAMPUS RECRUITMENT TRAINING",
    focusArea: "Algorithmic Problem Solving & CRT Specialist",
    summary:
      "Taught core and advanced Data Structures & Algorithms while spearheading intensive Campus Recruitment Training (CRT) sessions for engineering students in Hyderabad.",
    description: [
      "Taught Data Structures and Algorithms with deep focus on asymptotic time/space complexity (Big-O), Arrays, Linked Lists, Stacks, Queues, Binary Trees, Graphs, Recursion, and Dynamic Programming.",
      "Conducted intensive Campus Recruitment Training (CRT) classes, equipping aspiring software engineers with the problem-solving heuristics and algorithmic strategies needed to crack competitive technical coding rounds.",
      "Conducted live problem-solving sessions, taught optimal coding patterns across C++, Java, and Python, and led mock technical interviews mimicking premier hiring standards.",
    ],
    keyHighlights: [
      "Instructed in-depth Data Structures & Algorithms (Trees, Graphs, DP, Sorting)",
      "Conducted specialized Campus Recruitment Training (CRT) for engineering batches",
      "Mentored hundreds of students on algorithmic optimization & interview readiness",
      "Led live code walk-throughs & competitive programming problem-solving",
    ],
    skills: [
      "Data Structures",
      "Algorithms",
      "CRT Training",
      "Competitive Coding",
      "C++",
      "Java",
      "Python",
      "Dynamic Programming",
      "Asymptotic Analysis",
      "Systematic Problem Solving",
    ],
    quote: "Empowering future engineers to master complex algorithms with confidence and clarity.",
  },
  {
    id: "nxtwave",
    company: "NxtWave",
    companyTag: "Next-Gen Tech Education",
    location: "Hyderabad, India",
    designation: "Software Developer & Instructor",
    period: "2022 – 2023",
    type: "Full-Time · Software Development & Instruction",
    pageNumber: "02",
    chapterTitle: "Chapter II — Full-Stack & Algorithmic Foundations",
    image: "/assets/experience/nxtwave.jpg",
    imageAlt: "NxtWave Software Development & Technical Instruction Workspace in Hyderabad",
    designationBadge: "SOFTWARE DEVELOPMENT & DSA INSTRUCTION",
    focusArea: "Full-Stack Development & Computer Science Foundations",
    summary:
      "Dual role as Software Developer and Technical Instructor, engineering scalable software modules and teaching foundational to advanced Data Structures & Algorithms in Hyderabad.",
    description: [
      "Taught foundational to advanced Data Structures and Algorithms with strong emphasis on real-world implementations, clean code principles, and efficient data modeling.",
      "Engineered and maintained full-stack web application modules using modern JavaScript, React, Node.js, and database architectures.",
      "Conducted rigorous code reviews, guided students through debugging complex algorithmic edge cases, and developed structured programming assessments.",
    ],
    keyHighlights: [
      "Taught core and advanced Data Structures & Algorithms to diverse student cohorts",
      "Developed web features and internal educational tools with modern tech stacks",
      "Conducted detailed code reviews and one-on-one algorithmic debugging sessions",
      "Designed structured coding problem sets and practical development milestones",
    ],
    skills: [
      "Software Development",
      "Data Structures",
      "Algorithms",
      "React",
      "JavaScript / TypeScript",
      "Node.js",
      "Code Reviews",
      "Debugging",
      "Object-Oriented Design",
      "Computer Science Fundamentals",
    ],
    quote: "Bridging software engineering best practices with intuitive algorithmic education.",
  },
];

interface ExperienceSectionProps {
  onBackToHome: () => void;
  onNavigate?: (tab: NavTab) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onBackToHome,
  onNavigate,
}) => {
  // Animation stage: "blank" (empty page) -> "popping" (first card pops up in center) -> "expanded" (rest expand from behind)
  const [stage, setStage] = useState<"blank" | "popping" | "expanded">("blank");
  // Full page view state: null when browsing cards, or ExperienceItem when reading full details
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const totalExperiences = experiencesData.length;

  // Run the sequence when section opens:
  // 1. Blank page initially
  // 2. First card pops up on screen after 200ms
  // 3. Cards expand out from the back after 950ms
  const triggerAnimationSequence = useCallback(() => {
    setStage("blank");
    const popTimer = setTimeout(() => {
      setStage("popping");
    }, 220);

    const expandTimer = setTimeout(() => {
      setStage("expanded");
    }, 950);

    return () => {
      clearTimeout(popTimer);
      clearTimeout(expandTimer);
    };
  }, []);

  useEffect(() => {
    const cleanup = triggerAnimationSequence();
    return cleanup;
  }, [triggerAnimationSequence]);

  // Navigate to previous or next experience inside full page mode
  const handleNextExperience = () => {
    if (!selectedExperience) return;
    const currentIndex = experiencesData.findIndex((e) => e.id === selectedExperience.id);
    const nextIndex = (currentIndex + 1) % totalExperiences;
    setSelectedExperience(experiencesData[nextIndex]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevExperience = () => {
    if (!selectedExperience) return;
    const currentIndex = experiencesData.findIndex((e) => e.id === selectedExperience.id);
    const prevIndex = (currentIndex - 1 + totalExperiences) % totalExperiences;
    setSelectedExperience(experiencesData[prevIndex]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keyboard support: Escape exits full page mode; Left/Right cycles roles
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedExperience) {
        if (e.key === "Escape") {
          setSelectedExperience(null);
        } else if (e.key === "ArrowRight") {
          handleNextExperience();
        } else if (e.key === "ArrowLeft") {
          handlePrevExperience();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedExperience, totalExperiences]);

  // =========================================================================
  // VIEW MODE 1: FULL PAGE MODE (When user clicks "View More" on any card)
  // =========================================================================
  if (selectedExperience) {
    const currentIdx = experiencesData.findIndex((e) => e.id === selectedExperience.id);

    return (
      <div className="relative min-h-screen w-full bg-[#0a0d14] text-white pt-28 sm:pt-32 pb-20 px-4 sm:px-8 lg:px-12 select-none overflow-x-hidden overflow-y-auto">
        {/* Soft Background Radial Ambiance */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-20 right-1/4 w-[600px] h-[500px] bg-sky-600/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8 sm:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Top Bar: Back Button & Quick Role Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
            {/* User Requirement: Click back button to be back to same experience section */}
            <button
              type="button"
              onClick={() => setSelectedExperience(null)}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-zinc-950 hover:bg-emerald-400 transition-all duration-300 shadow-lg cursor-pointer group active:scale-95 self-start"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Experiences</span>
            </button>

            {/* Quick Switcher between roles */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">
                Experience {currentIdx + 1} of {totalExperiences}
              </span>
              <div className="inline-flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 rounded-full p-1">
                <button
                  type="button"
                  onClick={handlePrevExperience}
                  aria-label="Previous Experience"
                  className="w-7 h-7 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextExperience}
                  aria-label="Next Experience"
                  className="w-7 h-7 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Role Header Banner */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                {selectedExperience.company}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800">
                {selectedExperience.location}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800">
                {selectedExperience.period}
              </span>
            </div>

            {/* Prominent Designation Title */}
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mt-1">
              {selectedExperience.designation}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-1">
              {selectedExperience.summary}
            </p>
          </div>

          {/* Main 2-Column Responsive Detailed View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Visual Card, Quote & Highlights */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-950 group">
                {!imageError[selectedExperience.id] ? (
                  <img
                    src={selectedExperience.image}
                    alt={selectedExperience.imageAlt}
                    onError={() =>
                      setImageError((prev) => ({ ...prev, [selectedExperience.id]: true }))
                    }
                    className="w-full h-[320px] sm:h-[380px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-[320px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
                    <GraduationCap className="w-12 h-12 text-emerald-400 mb-3" />
                    <span className="text-sm font-semibold text-white">
                      {selectedExperience.company}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    {selectedExperience.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    {selectedExperience.location}
                  </span>
                </div>
              </div>

              {/* Quote Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md">
                <p className="text-xs sm:text-sm italic text-zinc-300 font-editorial-body leading-relaxed">
                  "{selectedExperience.quote}"
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instructional Philosophy</span>
                </div>
              </div>

              {/* Key Highlights Checklist */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Key Highlights</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {selectedExperience.keyHighlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Full In-Depth Description & Competencies */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Detailed Description Section */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md flex flex-col gap-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>Role Overview &amp; Responsibilities</span>
                </div>

                <div className="flex flex-col gap-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {selectedExperience.description.map((para, idx) => (
                    <p key={idx} className="font-editorial-body">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Skills & Technologies Taught / Used */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  <Binary className="w-4 h-4 text-emerald-400" />
                  <span>Core Technologies &amp; Methodologies</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedExperience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-zinc-800/90 text-zinc-200 border border-zinc-700/80 hover:border-emerald-400/60 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Alternate Role Preview Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 to-[#121927] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Other Experience
                  </div>
                  <div className="text-base font-bold text-white font-editorial mt-0.5">
                    {experiencesData[currentIdx === 0 ? 1 : 0].designation}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {experiencesData[currentIdx === 0 ? 1 : 0].company} • {experiencesData[currentIdx === 0 ? 1 : 0].location}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedExperience(experiencesData[currentIdx === 0 ? 1 : 0]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  View Role →
                </button>
              </div>

              {/* Bottom Back Button */}
              <div className="pt-2 flex justify-start">
                <button
                  type="button"
                  onClick={() => setSelectedExperience(null)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-zinc-950 hover:bg-emerald-400 transition-all duration-300 shadow-xl cursor-pointer group active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Experiences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE 2: POP-UP & HORIZONTAL EXPANSION SPREAD (User Request & References)
  // =========================================================================
  return (
    <div className="relative min-h-screen w-full bg-[#0d121c] text-white flex flex-col justify-between items-center select-none pt-28 sm:pt-32 pb-14 sm:pb-16 px-4 sm:px-8 overflow-x-hidden overflow-y-auto">
      {/* Soft Studio Lighting Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-emerald-600/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-500/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Eyebrow / Section Title */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 max-w-xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Professional Experience</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          Career Journey &amp; Instruction
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-editorial-body">
          Click <span className="text-white font-medium">View More</span> on any card to read full details
        </p>
      </div>

      {/* =========================================================================
          THE STAGE: BLANK -> POPPED (Deck Stack) -> EXPANDED (Fanned Cards Arc)
      ========================================================================== */}
      <div className="relative z-20 w-full max-w-5xl flex-1 flex items-center justify-center my-auto min-h-[460px] sm:min-h-[520px] overflow-visible">
        {/* If stage === "blank", page is blank (very short delay per user request) */}
        {stage === "blank" && (
          <div className="w-full flex items-center justify-center text-zinc-600 text-xs font-mono">
            {/* Blank slate */}
          </div>
        )}

        {/* When stage is "popping" or "expanded", cards are rendered with fluid physics */}
        {stage !== "blank" && (
          <div className="relative w-full flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
            {experiencesData.map((exp, index) => {
              const isFirstCard = index === 0;
              const isHovered = hoveredIndex === index;

              // Calculate transformation styles for each stage:
              // 1. POPPED STAGE: First card in center; other cards stacked directly behind it
              // 2. EXPANDED STAGE: Cards fan out horizontally from the back of the first card
              let transform = "";
              let zIndex = 10;
              let opacity = 1;

              if (stage === "popping") {
                if (isFirstCard) {
                  // First card pops up prominently in center (matching reference "After 🔥")
                  transform = "translateX(0px) translateY(0px) rotate(0deg) scale(1)";
                  zIndex = 20;
                  opacity = 1;
                } else {
                  // Other cards tucked behind first card with subtle stacked edge
                  const rearOffset = (index - 0) * 4;
                  transform = `translateX(${rearOffset}px) translateY(${rearOffset}px) rotate(${rearOffset * 0.8}deg) scale(0.96)`;
                  zIndex = 10 - index;
                  opacity = 0.95;
                }
              } else if (stage === "expanded") {
                // Cards fanned out horizontally to left and right from the back of first card
                // Index 0: to the left (-180px, -5deg); Index 1: to the right (+180px, +5deg)
                const offset = index - (totalExperiences - 1) / 2;
                const baseTranslateX = offset * 210; // Responsive base offset in px
                const baseRotate = offset * 6; // Rotation angle in deg
                const baseY = Math.abs(offset) * 8; // Gentle curve sag

                if (isHovered) {
                  // Card lifts, straightens, and scales up on hover
                  transform = `translateX(${baseTranslateX}px) translateY(-16px) rotate(0deg) scale(1.05)`;
                  zIndex = 30;
                } else {
                  transform = `translateX(${baseTranslateX}px) translateY(${baseY}px) rotate(${baseRotate}deg) scale(1)`;
                  zIndex = isFirstCard ? 20 : 15;
                }
              }

              return (
                <div
                  key={exp.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedExperience(exp)}
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    // Spring pop-up for initial appearance, and smooth 700ms expansion
                    transition:
                      stage === "popping"
                        ? "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease"
                        : "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, z-index 0.1s ease",
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] sm:w-[310px] md:w-[330px] h-[390px] sm:h-[440px] md:h-[470px] rounded-[28px] sm:rounded-[32px] overflow-hidden cursor-pointer select-none border border-white/20 backdrop-blur-xl group ${
                    isHovered
                      ? "shadow-[0_28px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(52,211,153,0.35),0_0_0_1px_rgba(255,255,255,0.4)]"
                      : "shadow-[0_22px_45px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.15)]"
                  }`}
                >
                  {/* Card Background: Visual of the role */}
                  <div className="absolute inset-0 w-full h-full bg-zinc-950 overflow-hidden">
                    {!imageError[exp.id] ? (
                      <img
                        src={exp.image}
                        alt={exp.imageAlt}
                        onError={() =>
                          setImageError((prev) => ({ ...prev, [exp.id]: true }))
                        }
                        className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
                        <GraduationCap className="w-16 h-16 text-emerald-400 mb-2" />
                        <span className="text-xs font-mono text-zinc-400">
                          {exp.company}
                        </span>
                      </div>
                    )}
                    {/* Deep gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />
                  </div>

                  {/* Top-Right Index Pill (Matching Reference Look) */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] font-mono text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {index + 1} / {totalExperiences}
                    </span>
                  </div>

                  {/* Top-Left Company Mini Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-emerald-300 bg-emerald-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30">
                      {exp.company}
                    </span>
                  </div>

                  {/* Card Content — USER REQUIREMENT:
                      1. "on the card there should only the title of the designation"
                      2. "if user want to see more about the designation(like full information), user will click on view more button"
                  */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-left">
                    {/* 1. ONLY TITLE OF THE DESIGNATION */}
                    <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-wide text-white leading-tight drop-shadow-md mb-4 text-left">
                      {exp.designation}
                    </h3>

                    {/* 2. VIEW MORE BUTTON */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExperience(exp);
                      }}
                      className="w-full py-2.5 sm:py-3 px-4 rounded-full text-xs sm:text-[13px] font-semibold bg-white text-zinc-950 hover:bg-emerald-400 hover:text-black transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer group/btn active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          BOTTOM CONTROLS: REPLAY ANIMATION & HELPER
      ========================================================================== */}
      <div className="relative z-20 mt-4 sm:mt-6 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={triggerAnimationSequence}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer backdrop-blur-md active:scale-95 shadow-sm"
          title="Replay pop-up and horizontal card expansion"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Replay Expansion</span>
        </button>

        <span className="text-[11px] font-mono text-zinc-500">
          Showing {totalExperiences} roles in Hyderabad
        </span>
      </div>
    </div>
  );
};

export default ExperienceSection;