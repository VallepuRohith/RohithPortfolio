import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase,
  GraduationCap,
  Binary,
  BookOpen,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  Award,
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
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [flipProgress, setFlipProgress] = useState<boolean>(false);
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const totalExperiences = experiencesData.length;
  const currentExperience = experiencesData[activeIndex];

  // 2-Second Realistic 3D Page Turn Transition Handler
  const handleTurnPage = useCallback(
    (direction: "next" | "prev") => {
      if (isFlipping) return;

      const nextIdx =
        direction === "next"
          ? (activeIndex + 1) % totalExperiences
          : (activeIndex - 1 + totalExperiences) % totalExperiences;

      setFlipDirection(direction);
      setTargetIndex(nextIdx);
      setIsFlipping(true);
      setFlipProgress(false);

      // Trigger the 3D flip on the next browser frame for smooth CSS interpolation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlipProgress(true);
        });
      });

      // Complete the 2-second page flip transition
      setTimeout(() => {
        setActiveIndex(nextIdx);
        setIsFlipping(false);
        setFlipProgress(false);
      }, 2050); // Exactly 2 seconds plus brief safety buffer
    },
    [activeIndex, isFlipping, totalExperiences]
  );

  const handleNext = useCallback(() => handleTurnPage("next"), [handleTurnPage]);
  const handlePrev = useCallback(() => handleTurnPage("prev"), [handleTurnPage]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Render Left Page View ("image regarding the designation")
  const renderLeftPage = (exp: ExperienceItem) => (
    <div className="w-full h-full relative p-4 sm:p-5 lg:p-6 flex flex-col justify-between bg-gradient-to-br from-[#1c2436] via-[#161c28] to-[#121622] text-left select-none overflow-hidden">
      {/* Curved Page Surface Shading */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 55%, rgba(0,0,0,0.4) 95%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Deep Spine Crease Inner Shadow on Right Edge */}
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-black/80 via-black/35 to-transparent pointer-events-none z-20" />

      {/* Top Header Ribbon */}
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-red-500">
            <Binary className="w-3 h-3" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-300 font-semibold uppercase">
            {exp.focusArea}
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Page {exp.pageNumber}
        </span>
      </div>

      {/* Main Image Area: Image regarding designation with polaroid/photo mount aesthetic */}
      <div className="relative z-10 flex-1 my-2.5 sm:my-3 rounded-xl overflow-hidden border border-zinc-700/80 shadow-[0_12px_28px_rgba(0,0,0,0.7)] bg-zinc-950 group">
        {!imageError[exp.id] ? (
          <img
            src={exp.image}
            alt={exp.imageAlt}
            onError={() =>
              setImageError((prev) => ({ ...prev, [exp.id]: true }))
            }
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          /* High-Fidelity Fallback Graphic */
          <div className="w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-900 via-[#192130] to-[#0f141f]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60 font-semibold">
                {exp.designationBadge}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex flex-col gap-2 my-auto text-center items-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-red-400 shadow-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h4 className="font-editorial text-lg font-bold text-white tracking-wide">
                {exp.designation}
              </h4>
              <p className="text-xs text-zinc-400 font-editorial-body max-w-xs italic">
                "{exp.quote}"
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/80">
              <span>{exp.company} • Hyderabad</span>
              <span>{exp.period}</span>
            </div>
          </div>
        )}

        {/* Ambient Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

        {/* Designation Badge Overlay on bottom of Left Image */}
        <div className="absolute bottom-2 left-2 right-2 px-3 py-2 rounded-lg bg-black/85 backdrop-blur-md border border-zinc-700/80 text-left pointer-events-none">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-widest text-red-400 font-bold">
              {exp.designationBadge}
            </span>
            <span className="text-[9px] font-mono text-zinc-400">
              {exp.period}
            </span>
          </div>
          <div className="text-xs font-semibold text-white truncate mt-0.5">
            {exp.designation}
          </div>
        </div>
      </div>

      {/* Left Page Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
        <span>Rohith Vallepu Portfolio</span>
        <span className="text-zinc-400">{exp.company}</span>
      </div>
    </div>
  );

  // Render Right Page View (User requirement: Top left Company name, Top right Location, after that Designation and Description)
  const renderRightPage = (exp: ExperienceItem) => (
    <div className="w-full h-full relative p-4 sm:p-6 lg:p-7 flex flex-col justify-between bg-gradient-to-bl from-[#1c2436] via-[#161c28] to-[#121622] text-left select-none overflow-y-auto custom-scrollbar">
      {/* Curved Page Surface Shading */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
        style={{
          background:
            "linear-gradient(270deg, rgba(0,0,0,0.35) 0%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 55%, rgba(0,0,0,0.4) 95%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Deep Spine Crease Inner Shadow on Left Edge */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none z-20" />

      {/* Upper Content Section */}
      <div className="relative z-10 flex flex-col">
        {/* 1. TOP ROW: Top Left Company Name & Top Right Location */}
        <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/80">
          {/* TOP LEFT: Company Name */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-red-500 shadow-sm shrink-0">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                {exp.company}
              </h2>
              <span className="text-[9.5px] font-mono text-zinc-400">
                {exp.companyTag}
              </span>
            </div>
          </div>

          {/* TOP RIGHT: Location */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 font-mono text-xs shadow-inner shrink-0">
            <MapPin className="w-3 h-3 text-red-500 shrink-0" />
            <span className="font-medium text-[10.5px]">{exp.location}</span>
          </div>
        </div>

        {/* 2. AFTER THAT: Designation Row */}
        <div className="mt-2.5 mb-2 flex flex-col gap-0.5">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {exp.designation}
          </h3>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="text-red-400 font-semibold">{exp.type}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Calendar className="w-3 h-3 text-zinc-500" />
              <span>{exp.period}</span>
            </span>
          </div>
        </div>

        {/* 3. AFTER THAT: Description About That Job */}
        <div className="flex flex-col gap-1.5 my-1.5 text-zinc-300 text-xs sm:text-[12px] leading-relaxed">
          {exp.description.map((paragraph, pIdx) => (
            <p key={pIdx} className="font-sans text-zinc-300/95">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Key Responsibilities Checklist */}
        <div className="mt-1.5 pt-1.5 border-t border-zinc-800/80 flex flex-col gap-1">
          <span className="text-[9.5px] font-mono uppercase tracking-widest text-zinc-500">
            Key Responsibilities & Highlights:
          </span>
          <div className="grid grid-cols-1 gap-1">
            {exp.keyHighlights.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-1.5 text-[10.5px] sm:text-[11px] text-zinc-300"
              >
                <CheckCircle2 className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Content Section: Skills & Page Footer */}
      <div className="relative z-10 pt-2 border-t border-zinc-800/80 flex flex-col gap-1.5">
        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1">
          {exp.skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-[9.5px] font-mono text-zinc-300 shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Right Page Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-0.5">
          <span>{exp.chapterTitle}</span>
          <span className="font-bold text-zinc-400">
            {activeIndex + 1} / {totalExperiences}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto bg-[#0d121c] text-white flex flex-col justify-between items-center select-none pt-28 sm:pt-32 pb-14 sm:pb-16 px-3 sm:px-6 lg:px-8">
      {/* =========================================================================
          ATMOSPHERIC STUDIO BACKDROP (Warm ambient spotlighting on book)
      ========================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Radial Ambient Spotlight on the book */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-sky-600/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-500/5 rounded-full blur-[140px]" />

        {/* Subtle Reading Studio Surface Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#080b11] via-[#0b0e17] to-transparent opacity-95" />
      </div>

      {/* =========================================================================
          REALISTIC 3D BOOK RIG (HAND-HELD PERSPECTIVE & NATURAL ARCH)
      ========================================================================== */}
      <div
        className="relative z-10 w-full max-w-5xl flex-1 flex items-center justify-center my-4 sm:my-6 px-2 sm:px-4"
        style={{ perspective: "2200px" }}
      >
        {/* Ambient Cast Soft Desk Shadow directly beneath the book */}
        <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] max-w-4xl h-24 bg-black/85 rounded-[50%] blur-3xl pointer-events-none z-0"
          style={{ transform: "scale(1, 0.45)" }}
        />

        {/* Book Container with Reading Pitch Angle (rotateX 6deg for natural hand-held perspective) */}
        <div
          className="relative w-full max-w-4xl h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(6.5deg)",
          }}
        >
          {/* =====================================================================
              1. HARDCOVER LEATHER CASING & GOLD CORNER EMBOSSING
          ====================================================================== */}
          <div
            className="absolute -inset-2.5 sm:-inset-3 rounded-[26px] bg-gradient-to-br from-[#1d2536] via-[#131824] to-[#0c0f17] shadow-[0_30px_70px_rgba(0,0,0,0.9),0_10px_25px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.18)] border border-zinc-700/60 pointer-events-none z-0"
            style={{
              transform: "translateZ(-8px)",
            }}
          >
            {/* Fine Inset Gold Foil Border Rule running inside cover */}
            <div className="absolute inset-1.5 sm:inset-2 rounded-[22px] border border-[#d4af37]/20 pointer-events-none" />

            {/* Gilded Metal Corner Accents at 4 Corners of Book Cover */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]/60 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]/60 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]/60 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]/60 rounded-br-sm pointer-events-none" />

            {/* Center Spine Hump & Stitching indentation */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-[#0d121c] via-[#070a10] to-[#0d121c] shadow-[inset_0_0_12px_rgba(0,0,0,0.95)] border-x border-white/5" />
          </div>

          {/* =====================================================================
              2. REALISTIC STACKED PAGE EDGES (PAPER BLOCK THICKNESS)
          ====================================================================== */}
          {/* Bottom Page Block Thickness */}
          <div
            className="absolute -bottom-2 left-6 right-6 h-3 rounded-b-md shadow-md pointer-events-none z-10"
            style={{
              background:
                "repeating-linear-gradient(0deg, #94a3b8 0px, #64748b 1px, #334155 2px, #94a3b8 3px)",
              opacity: 0.7,
              transform: "translateZ(-2px)",
            }}
          />
          {/* Left Side Page Block Thickness */}
          <div
            className="absolute top-5 bottom-5 -left-2 w-3 rounded-l-md pointer-events-none z-10 hidden sm:block"
            style={{
              background:
                "repeating-linear-gradient(90deg, #94a3b8 0px, #64748b 1px, #334155 2px, #94a3b8 3px)",
              opacity: 0.7,
              transform: "translateZ(-2px)",
            }}
          />
          {/* Right Side Page Block Thickness */}
          <div
            className="absolute top-5 bottom-5 -right-2 w-3 rounded-r-md pointer-events-none z-10 hidden sm:block"
            style={{
              background:
                "repeating-linear-gradient(90deg, #94a3b8 0px, #64748b 1px, #334155 2px, #94a3b8 3px)",
              opacity: 0.7,
              transform: "translateZ(-2px)",
            }}
          />

          {/* =====================================================================
              3. FANNED STACK OF PREVIOUS PAGES ON THE LEFT (Matching Reference Image)
          ====================================================================== */}
          <div className="absolute left-0 top-0 bottom-0 pointer-events-none z-0 hidden sm:block">
            {/* Sheet 4 (Furthest back in stack) */}
            <div
              className="absolute top-2.5 bottom-2.5 w-48 rounded-l-2xl border border-white/10 bg-gradient-to-l from-[#182030] to-[#121622] shadow-2xl transition-all duration-300"
              style={{
                left: "-38px",
                transform: "rotateY(-18deg) scale(0.91)",
                opacity: 0.35,
              }}
            />
            {/* Sheet 3 */}
            <div
              className="absolute top-2 bottom-2 w-48 rounded-l-2xl border border-white/15 bg-gradient-to-l from-[#1e263a] to-[#141a28] shadow-2xl transition-all duration-300"
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
              4. OPEN BOOK PAGES STAGE (3D WINGS FORMING A NATURAL BOOK V-TROUGH)
          ====================================================================== */}
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* -----------------------------------------------------------------
                LEFT WING (Angled forward by +12deg around center spine)
            ------------------------------------------------------------------ */}
            <div
              className="absolute top-0 bottom-0 left-0 w-full sm:w-1/2 rounded-2xl sm:rounded-l-2xl sm:rounded-r-none overflow-hidden border border-zinc-700/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] z-20"
              style={{
                transformOrigin: "right center",
                transform: "rotateY(12deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* If flipping backward (prev), show the newly incoming Left page underneath */}
              {isFlipping && flipDirection === "prev"
                ? renderLeftPage(experiencesData[targetIndex])
                : renderLeftPage(experiencesData[activeIndex])}

              {/* Dynamic shadow that darkens left wing as page turns and lands over it */}
              <div
                className="absolute inset-0 bg-black pointer-events-none z-30 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity:
                    isFlipping && flipDirection === "next" && flipProgress
                      ? 0.4
                      : 0,
                }}
              />
            </div>

            {/* -----------------------------------------------------------------
                RIGHT WING (Angled forward by -12deg around center spine)
            ------------------------------------------------------------------ */}
            <div
              className="hidden sm:block absolute top-0 bottom-0 right-0 w-1/2 rounded-r-2xl overflow-hidden border border-zinc-700/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] z-20"
              style={{
                transformOrigin: "left center",
                transform: "rotateY(-12deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* If flipping forward (next), reveal the newly incoming Right page underneath immediately */}
              {isFlipping && flipDirection === "next"
                ? renderRightPage(experiencesData[targetIndex])
                : renderRightPage(experiencesData[activeIndex])}

              {/* Dynamic shadow on right wing while page lifts up */}
              <div
                className="absolute inset-0 bg-black pointer-events-none z-30 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity:
                    isFlipping && flipDirection === "prev" && flipProgress
                      ? 0.4
                      : 0,
                }}
              />
            </div>

            {/* -----------------------------------------------------------------
                5. THE 2-SECOND 3D REAL PAGE TURN LEAF
            ------------------------------------------------------------------ */}
            {isFlipping && (
              <div
                className="hidden sm:block absolute top-0 bottom-0 w-1/2 pointer-events-none z-40"
                style={{
                  left: flipDirection === "next" ? "50%" : "0%",
                  transformOrigin:
                    flipDirection === "next" ? "left center" : "right center",
                  transformStyle: "preserve-3d",
                  transition:
                    "transform 2000ms cubic-bezier(0.34, 0.04, 0.22, 1.0)",
                  transform:
                    flipDirection === "next"
                      ? flipProgress
                        ? "rotateY(-168deg)" // Lands flush on Left wing (+12deg)
                        : "rotateY(-12deg)"  // Starts on Right wing (-12deg)
                      : flipProgress
                        ? "rotateY(168deg)"   // Lands flush on Right wing (-12deg)
                        : "rotateY(12deg)",   // Starts on Left wing (+12deg)
                }}
              >
                {/* FRONT FACE of turning leaf (visible during 0deg -> 90deg) */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg)",
                  }}
                >
                  {flipDirection === "next"
                    ? renderRightPage(experiencesData[activeIndex])
                    : renderLeftPage(experiencesData[activeIndex])}

                  {/* Dynamic peeling light reflection sheen across turning page */}
                  <div
                    className="absolute inset-0 pointer-events-none z-40 transition-opacity duration-1000"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.5) 100%)",
                      opacity: flipProgress ? 0.7 : 0,
                    }}
                  />
                </div>

                {/* BACK FACE of turning leaf (visible during 90deg -> 180deg) */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {flipDirection === "next"
                    ? renderLeftPage(experiencesData[targetIndex])
                    : renderRightPage(experiencesData[targetIndex])}

                  {/* Settling shadow as back face comes down */}
                  <div
                    className="absolute inset-0 pointer-events-none z-40 transition-opacity duration-1000"
                    style={{
                      background:
                        "linear-gradient(225deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.1) 100%)",
                      opacity: flipProgress ? 0.3 : 0.8,
                    }}
                  />
                </div>
              </div>
            )}

            {/* -----------------------------------------------------------------
                6. CENTER SPINE GUTTER & CRIMSON SATIN RIBBON BOOKMARK
            ------------------------------------------------------------------ */}
            {/* Center Gutter Crease Shadow */}
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 z-30 pointer-events-none hidden sm:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            {/* Top and Bottom Binding Headbands */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-gradient-to-r from-red-800 via-amber-400 to-red-800 rounded-b-sm z-35 hidden sm:block pointer-events-none shadow-sm" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-gradient-to-r from-red-800 via-amber-400 to-red-800 rounded-t-sm z-35 hidden sm:block pointer-events-none shadow-sm" />

            {/* Silk Ribbon Bookmark hanging from spine past bottom edge */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3 sm:w-3.5 z-35 pointer-events-none hidden sm:block"
              style={{
                height: "calc(100% + 22px)",
                background:
                  "linear-gradient(180deg, #dc2626 0%, #b91c1c 70%, #991b1b 100%)",
                boxShadow: "2px 4px 10px rgba(0,0,0,0.7)",
                clipPath: "polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM NAVIGATION CONTROLS (Like in the Project section, 2s 3D Page Turn)
      ========================================================================== */}
      <div className="relative z-30 my-4 sm:my-6 flex flex-col items-center gap-2.5 px-4">
        {/* Glassmorphic Navigation Capsule */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/60 backdrop-blur-2xl border border-zinc-700/80 shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.15)]">
          {/* Previous Page Button */}
          <button
            onClick={handlePrev}
            disabled={isFlipping}
            type="button"
            aria-label="Turn to previous experience page"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white border border-zinc-600/60 flex items-center justify-center active:scale-95 transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Center Capsule Chapter Info */}
          <div className="flex items-center gap-2.5 px-3 max-w-[220px] sm:max-w-[300px] text-left">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border border-zinc-700 shrink-0 bg-zinc-900 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="truncate">
              <div className="text-xs sm:text-sm font-semibold text-white truncate">
                {currentExperience.company}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                Chapter {activeIndex + 1} of {totalExperiences} · Turn Page
              </div>
            </div>
          </div>

          {/* Next Page Button */}
          <button
            onClick={handleNext}
            disabled={isFlipping}
            type="button"
            aria-label="Turn to next experience page"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white border border-zinc-600/60 flex items-center justify-center active:scale-95 transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Experience Page Progress Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {experiencesData.map((exp, idx) => (
            <button
              key={exp.id}
              type="button"
              disabled={isFlipping}
              onClick={() => {
                if (idx !== activeIndex) {
                  handleTurnPage(idx > activeIndex ? "next" : "prev");
                }
              }}
              aria-label={`Go to chapter ${idx + 1}: ${exp.company}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-6 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                  : "w-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
