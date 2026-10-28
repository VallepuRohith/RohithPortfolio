import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Binary,
  Layers,
  Sparkles,
  BookOpen,
  Calendar,
  Building2,
  CheckCircle2,
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
    type: "Full-Time · Technical Training & Mentorship",
    pageNumber: "01",
    chapterTitle: "Chapter I — Algorithmic Mastery & CRT",
    image: "/assets/experience/bytexl.jpg",
    imageAlt: "ByteXL Data Structures & Algorithms and CRT Classroom Training in Hyderabad",
    designationBadge: "DSA & CAMPUS RECRUITMENT TRAINING",
    focusArea: "Algorithmic Problem Solving & Interview Readiness",
    summary:
      "Taught core and advanced Data Structures & Algorithms while spearheading intensive Campus Recruitment Training (CRT) sessions for engineering students in Hyderabad.",
    description: [
      "Designed and delivered rigorous curriculum in Data Structures and Algorithms, covering Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Recursion, and Asymptotic Complexity (Big-O) analysis.",
      "Conducted extensive Campus Recruitment Training (CRT) batches, preparing aspiring software engineers to clear technical coding rounds and algorithmic interview bars at premier product and service organizations.",
      "Led interactive live coding breakdowns, taught optimal problem-solving heuristics, and mentored students in cracking competitive programming challenges with high efficiency.",
    ],
    keyHighlights: [
      "Mentored hundreds of students in mastering Data Structures & Algorithms",
      "Conducted Campus Recruitment Training (CRT) across competitive coding rounds",
      "Delivered live code walk-throughs & optimal time/space complexity derivations",
      "Organized mock technical interviews and comprehensive algorithmic reviews",
    ],
    skills: [
      "Data Structures",
      "Algorithms",
      "CRT Training",
      "Competitive Coding",
      "C++",
      "Java",
      "Python",
      "Time Complexity",
      "Dynamic Programming",
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
      "Built and maintained software applications while delivering structured instructional modules on Data Structures, Algorithms, and Core Computer Science fundamentals.",
      "Taught Data Structures and Algorithms with heavy emphasis on practical implementations, clean code standards, and real-world software engineering application.",
      "Conducted code reviews, debugged complex algorithmic edge cases, and guided learners through building robust software solutions from concept to deployment.",
    ],
    keyHighlights: [
      "Instructed foundational and advanced Data Structures and Algorithms",
      "Developed software features with modern web stacks and clean code principles",
      "Guided students through complex algorithmic problem sets and debugging",
      "Created structured programming assignments and real-time coding assessments",
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
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const totalExperiences = experiencesData.length;
  const currentExperience = experiencesData[activeIndex];

  // Navigate to Next Experience Page with 3D Flip
  const handleNext = useCallback(() => {
    if (isFlipping) return;
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % totalExperiences);
      setTimeout(() => {
        setIsFlipping(false);
      }, 350);
    }, 280);
  }, [isFlipping, totalExperiences]);

  // Navigate to Previous Experience Page with 3D Flip
  const handlePrev = useCallback(() => {
    if (isFlipping) return;
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + totalExperiences) % totalExperiences);
      setTimeout(() => {
        setIsFlipping(false);
      }, 350);
    }, 280);
  }, [isFlipping, totalExperiences]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden bg-[#161c28] text-white flex flex-col justify-between items-center select-none pt-3 sm:pt-5 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-10">
      {/* =========================================================================
          BACKGROUND ATMOSPHERIC STUDIO LIGHTING (Matching Reference Image)
      ========================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Radial Ambient Studio Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-sky-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[130px]" />

        {/* Faint Studio Grid Backdrop */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Studio Surface Horizon Line / Shadow Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0e121a] to-transparent opacity-80" />
      </div>

      {/* =========================================================================
          TOP ROW: HEADER & METRICS (Matching "Journal ⎚ 70 Pages" Design Pattern)
      ========================================================================== */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between">
        {/* Top Left: Back to Home Button */}
        <button
          onClick={onBackToHome}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all cursor-pointer backdrop-blur-md shadow-sm group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </button>

        {/* Center: "Journal" Header with Page Badge (Exact Pattern in Picture) */}
        <div className="flex flex-col items-center">
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            Journal
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono mt-0.5">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>
              {totalExperiences} Chapters • Hyderabad, IN
            </span>
          </div>
        </div>

        {/* Top Right: Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Verified History</span>
        </div>
      </div>

      {/* =========================================================================
          MAIN 3D BOOK STRUCTURE (Matching Picture: Open Spread + Fanned Stack)
      ========================================================================== */}
      <div
        className="relative z-10 w-full max-w-5xl flex-1 flex items-center justify-center my-auto px-2 sm:px-4"
        style={{ perspective: "1800px" }}
      >
        {/* Master Book Frame with 3D Perspective */}
        <div
          className={`relative w-full max-w-4xl h-[430px] sm:h-[460px] md:h-[490px] lg:h-[510px] transition-transform duration-500 ease-out flex items-center justify-center`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipping
              ? flipDirection === "next"
                ? "rotateY(-4deg) scale(0.98)"
                : "rotateY(4deg) scale(0.98)"
              : "rotateY(0deg) scale(1)",
          }}
        >
          {/* =====================================================================
              LEFT SIDE: FANNED PAGES STACK (Matching Reference Image Exact Look!)
          ====================================================================== */}
          <div className="absolute left-0 top-0 bottom-0 pointer-events-none z-0 hidden sm:block">
            {/* Sheet 4 (Furthest back in stack) */}
            <div
              className="absolute top-2 bottom-2 w-48 rounded-l-2xl border border-white/10 bg-gradient-to-l from-[#182030] to-[#121622] shadow-2xl transition-all duration-300"
              style={{
                left: "-38px",
                transform: "rotateY(-18deg) scale(0.91)",
                opacity: 0.35,
              }}
            />
            {/* Sheet 3 */}
            <div
              className="absolute top-1.5 bottom-1.5 w-48 rounded-l-2xl border border-white/15 bg-gradient-to-l from-[#1e263a] to-[#141a28] shadow-2xl transition-all duration-300"
              style={{
                left: "-28px",
                transform: "rotateY(-14deg) scale(0.94)",
                opacity: 0.55,
              }}
            />
            {/* Sheet 2 */}
            <div
              className="absolute top-1 bottom-1 w-48 rounded-l-2xl border border-white/20 bg-gradient-to-l from-[#222c42] to-[#171e2c] shadow-xl transition-all duration-300"
              style={{
                left: "-18px",
                transform: "rotateY(-10deg) scale(0.96)",
                opacity: 0.75,
              }}
            />
            {/* Sheet 1 (Just behind active left page) */}
            <div
              className="absolute top-0.5 bottom-0.5 w-48 rounded-l-2xl border border-white/20 bg-gradient-to-l from-[#25314a] to-[#1a2233] shadow-lg transition-all duration-300"
              style={{
                left: "-9px",
                transform: "rotateY(-5deg) scale(0.98)",
                opacity: 0.9,
              }}
            />
          </div>

          {/* =====================================================================
              RIGHT SIDE: BOOK COVER / UPCOMING PAGES BACKING STACK
          ====================================================================== */}
          <div className="absolute right-0 top-0 bottom-0 pointer-events-none z-0 hidden sm:block">
            <div
              className="absolute top-1 bottom-1 w-32 rounded-r-2xl border border-white/15 bg-gradient-to-r from-[#1e273a] to-[#131722] shadow-xl"
              style={{
                right: "-12px",
                transform: "rotateY(8deg) scale(0.98)",
                opacity: 0.6,
              }}
            />
            <div
              className="absolute top-2 bottom-2 w-32 rounded-r-2xl border border-white/10 bg-gradient-to-r from-[#171e2c] to-[#0e121a] shadow-2xl"
              style={{
                right: "-22px",
                transform: "rotateY(14deg) scale(0.95)",
                opacity: 0.35,
              }}
            />
          </div>

          {/* =====================================================================
              AMBIENT REALISTIC UNDER-BOOK DROP SHADOW ON STUDIO TABLE
          ====================================================================== */}
          <div
            className="absolute -bottom-8 left-8 right-8 h-16 bg-black/70 blur-2xl rounded-full pointer-events-none z-0"
            style={{ transform: "scale(0.95, 0.4)" }}
          />

          {/* =====================================================================
              THE CENTRAL OPEN BOOK SPREAD (2-PAGE SPREAD)
          ====================================================================== */}
          <div
            className={`relative z-10 w-full h-full rounded-2xl sm:rounded-3xl border border-zinc-700/60 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] flex overflow-hidden backdrop-blur-xl transition-all duration-500 ${
              isFlipping ? "opacity-90 scale-[0.99]" : "opacity-100 scale-100"
            }`}
          >
            {/* -----------------------------------------------------------------
                PAGE 1: LEFT PAGE VIEW ("image regarding the designation")
            ------------------------------------------------------------------ */}
            <div className="w-full sm:w-1/2 h-full relative p-4 sm:p-6 lg:p-7 flex flex-col justify-between bg-gradient-to-br from-[#1b2232] via-[#161c28] to-[#121620] border-r border-black/80 overflow-hidden">
              {/* Spine Crease Inner Shadow on Right Edge of Left Page */}
              <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-l from-black/60 via-black/25 to-transparent pointer-events-none z-20" />

              {/* Left Page Top Ribbon: Category Pill & Chapter Index */}
              <div className="relative z-10 flex items-center justify-between pb-2 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-red-500">
                    <Binary className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-300 font-semibold uppercase">
                    {currentExperience.focusArea}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Page {currentExperience.pageNumber}
                </span>
              </div>

              {/* Main Visual Image Area: "image regarding the designation" */}
              <div className="relative z-10 flex-1 my-3 sm:my-4 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-700/80 shadow-[0_10px_25px_rgba(0,0,0,0.6)] bg-zinc-900 group">
                {/* Fallback stylized artwork / image */}
                {!imageError[currentExperience.id] ? (
                  <img
                    src={currentExperience.image}
                    alt={currentExperience.imageAlt}
                    onError={() =>
                      setImageError((prev) => ({
                        ...prev,
                        [currentExperience.id]: true,
                      }))
                    }
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  /* Elegant Fallback Graphic Blueprint if local image isn't generated yet */
                  <div className="w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-900 via-[#181f2d] to-[#0f141f]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60 font-semibold">
                        {currentExperience.designationBadge}
                      </span>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>

                    <div className="flex flex-col gap-2 my-auto text-center items-center py-4">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-red-400 shadow-lg">
                        <GraduationCap className="w-7 h-7" />
                      </div>
                      <h4 className="font-editorial text-lg font-bold text-white tracking-wide">
                        {currentExperience.designation}
                      </h4>
                      <p className="text-xs text-zinc-400 font-editorial-body max-w-xs italic">
                        "{currentExperience.quote}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/80">
                      <span>{currentExperience.company} • Hyderabad</span>
                      <span>{currentExperience.period}</span>
                    </div>
                  </div>
                )}

                {/* Subtle Image Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                {/* Designation Banner Overlay on bottom of Left Image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700/70 text-left pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-red-400 font-bold">
                      {currentExperience.designationBadge}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      {currentExperience.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-white truncate mt-0.5">
                    {currentExperience.designation}
                  </div>
                </div>
              </div>

              {/* Left Page Footer: Chapter Kicker */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
                <span>Rohith Vallepu Portfolio</span>
                <span className="text-zinc-400">{currentExperience.company}</span>
              </div>
            </div>

            {/* -----------------------------------------------------------------
                CENTER SPINE CREASE & 3D BINDING DIVIDER
            ------------------------------------------------------------------ */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-4 z-30 pointer-events-none hidden sm:flex items-center justify-center">
              {/* Dark spine fold line */}
              <div className="w-[1.5px] h-full bg-black/80 shadow-[0_0_8px_rgba(0,0,0,0.9)]" />
              {/* Top & Bottom binding notch highlights */}
              <div className="absolute top-0 w-2.5 h-1 bg-zinc-800/90 rounded-b-sm" />
              <div className="absolute bottom-0 w-2.5 h-1 bg-zinc-800/90 rounded-t-sm" />
            </div>

            {/* -----------------------------------------------------------------
                PAGE 2: RIGHT PAGE VIEW (Strictly following user's specifications:
                "top left will be company name and top right location,
                 after that designation and description about that job")
            ------------------------------------------------------------------ */}
            <div className="hidden sm:flex w-1/2 h-full relative p-5 sm:p-7 lg:p-8 flex-col justify-between bg-gradient-to-bl from-[#1c2334] via-[#161c28] to-[#121622] text-left overflow-y-auto custom-scrollbar">
              {/* Spine Crease Inner Shadow on Left Edge of Right Page */}
              <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none z-20" />

              {/* Upper Section */}
              <div className="relative z-10 flex flex-col">
                {/* 1. TOP ROW: Top Left Company Name & Top Right Location */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  {/* TOP LEFT: Company Name */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-red-500 shadow-sm">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                        {currentExperience.company}
                      </h2>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {currentExperience.companyTag}
                      </span>
                    </div>
                  </div>

                  {/* TOP RIGHT: Location */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 font-mono text-xs shadow-inner">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="font-medium text-[11px]">
                      {currentExperience.location}
                    </span>
                  </div>
                </div>

                {/* 2. AFTER THAT: Designation Row */}
                <div className="mt-3.5 mb-2.5 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <span>{currentExperience.designation}</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-[10.5px] font-mono text-zinc-400">
                    <span className="text-red-400 font-medium">
                      {currentExperience.type}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      <span>{currentExperience.period}</span>
                    </span>
                  </div>
                </div>

                {/* 3. AFTER THAT: Description About That Job */}
                <div className="flex flex-col gap-2 my-2 text-zinc-300 text-xs sm:text-[12.5px] leading-relaxed">
                  {currentExperience.description.map((paragraph, pIdx) => (
                    <p key={pIdx} className="font-sans text-zinc-300/95">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key Responsibilities Checklist */}
                <div className="mt-2 pt-2 border-t border-zinc-800/80 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Key Highlights & Responsibilities:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {currentExperience.keyHighlights.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-[11px] sm:text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower Section: Tech Stack Badges & Page Footer */}
              <div className="relative z-10 pt-3 border-t border-zinc-800/80 flex flex-col gap-2.5">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {currentExperience.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-300 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Right Page Footer: Chapter Label & Page Index */}
                <div className="flex items-center justify-between text-[10.5px] font-mono text-zinc-500 pt-1">
                  <span>{currentExperience.chapterTitle}</span>
                  <span className="font-bold text-zinc-400">
                    {activeIndex + 1} / {totalExperiences}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          NAVIGATION CONTROLS BELOW DESIGN (Matching Project Section Structure)
          "below the design of the experience i want navigation to the left and right,
           like in the project section."
      ========================================================================== */}
      <div className="relative z-30 mb-20 sm:mb-24 flex flex-col items-center gap-2 px-4">
        {/* Glassmorphic Navigation Capsule */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 backdrop-blur-2xl border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.2)]">
          {/* Previous Page Arrow Button */}
          <button
            onClick={handlePrev}
            type="button"
            disabled={isFlipping}
            aria-label="Previous experience page"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center active:scale-95 transition-all cursor-pointer group disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Center Info Pill */}
          <div className="flex items-center gap-2.5 px-3 min-w-[170px] sm:min-w-[220px] text-left">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-900 border border-white/30 flex items-center justify-center text-red-500 shrink-0 font-bold font-mono text-xs">
              {currentExperience.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <div className="text-xs sm:text-sm font-semibold text-white truncate">
                {currentExperience.company}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-white/70">
                Chapter {activeIndex + 1} of {totalExperiences}
              </div>
            </div>
          </div>

          {/* Next Page Arrow Button */}
          <button
            onClick={handleNext}
            type="button"
            disabled={isFlipping}
            aria-label="Next experience page"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center active:scale-95 transition-all cursor-pointer group disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Page Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-0.5">
          {experiencesData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (isFlipping || activeIndex === idx) return;
                setFlipDirection(idx > activeIndex ? "next" : "prev");
                setIsFlipping(true);
                setTimeout(() => {
                  setActiveIndex(idx);
                  setTimeout(() => setIsFlipping(false), 300);
                }, 250);
              }}
              aria-label={`Jump to page ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;

