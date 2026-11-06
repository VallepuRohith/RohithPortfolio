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
  RotateCcw,
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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Animation stages: "blank" -> "balloon" (rising from bottom to center) -> "expanded" (side cards slide out)
  const [animStage, setAnimStage] = useState<"blank" | "balloon" | "expanded">("blank");
  // Full page reading mode when user clicks "View More"
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const totalExperiences = experiencesData.length;
  const activeExp = experiencesData[activeIndex];
  const sideIndex = (activeIndex + 1) % totalExperiences;
  const sideExp = experiencesData[sideIndex];

  // Balloon Rising & Card Expansion Animation Sequence
  // "once user clicks on experience button the first card will pop from the bottom (like a balloon moving from bottom to little bit upwards) to middle. and rest of the cards come from the first card."
  const startAnimationSequence = useCallback(() => {
    setAnimStage("blank");

    const balloonTimer = setTimeout(() => {
      setAnimStage("balloon");
    }, 120);

    const expandTimer = setTimeout(() => {
      setAnimStage("expanded");
    }, 900);

    return () => {
      clearTimeout(balloonTimer);
      clearTimeout(expandTimer);
    };
  }, []);

  useEffect(() => {
    const cleanup = startAnimationSequence();
    return cleanup;
  }, [startAnimationSequence]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalExperiences);
  }, [totalExperiences]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalExperiences) % totalExperiences);
  }, [totalExperiences]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedExperience) {
        if (e.key === "Escape") {
          setSelectedExperience(null);
        } else if (e.key === "ArrowRight") {
          const idx = experiencesData.findIndex((x) => x.id === selectedExperience.id);
          setSelectedExperience(experiencesData[(idx + 1) % totalExperiences]);
        } else if (e.key === "ArrowLeft") {
          const idx = experiencesData.findIndex((x) => x.id === selectedExperience.id);
          setSelectedExperience(experiencesData[(idx - 1 + totalExperiences) % totalExperiences]);
        }
      } else {
        if (e.key === "ArrowRight") {
          handleNext();
        } else if (e.key === "ArrowLeft") {
          handlePrev();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedExperience, handleNext, handlePrev, totalExperiences]);

  // =========================================================================
  // VIEW MODE 1: FULL PAGE MODE (When user clicks "View More")
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
                  onClick={() => {
                    const prevIdx = (currentIdx - 1 + totalExperiences) % totalExperiences;
                    setSelectedExperience(experiencesData[prevIdx]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  aria-label="Previous Experience"
                  className="w-7 h-7 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = (currentIdx + 1) % totalExperiences;
                    setSelectedExperience(experiencesData[nextIdx]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
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
  // VIEW MODE 2: PLANE STAGE WITH 2-PART CARD & SIDE VERTICAL BOX
  // User Requirement:
  // 1. "do not add any text in the experience section... like in the certifications sections, my experience should also be plane, just cards."
  // 2. "so the card contains 2 part, left part is picture and the right part is summary of that designation."
  // 3. "to know more about my designations user will click on view more button."
  // 4. "once user clicks on experience button the first card will pop from the buttom(imagine like a ballon moving from bottom to little bit upwards) to middle. and rest of the cards come from the first card."
  // 5. "so the side card appears as a vertical box, i want the same pattern"
  // =========================================================================
  return (
    <div className="relative min-h-screen w-full bg-[#0b0e15] text-white flex flex-col justify-center items-center select-none pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-8 overflow-x-hidden overflow-y-auto">
      {/* Soft Ambient Aurora Backdrop (Matching Reference Picture Vibe) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft violet/blue gradient wash */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-sky-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[450px] bg-indigo-500/15 rounded-full blur-[140px]" />
      </div>

      {/* Main Interactive Stage — Pure cards with no extra header text */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center my-auto">
        <div className="relative w-full flex items-center justify-center min-h-[440px] sm:min-h-[480px]">
          {/* Subtle Horizontal Connector Line with Nodes (Matching reference picture) */}
          <div
            className={`hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[960px] items-center justify-between pointer-events-none z-0 transition-opacity duration-700 ${
              animStage === "expanded" ? "opacity-40" : "opacity-0"
            }`}
          >
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent relative">
              {/* Connector dots */}
              <span className="absolute left-[12%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
              <span className="absolute right-[12%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
            </div>
          </div>

          {/* Side Card Left (Vertical Box for previous experience if multi-card or mirrored) */}
          <div
            onClick={handlePrev}
            title={`Switch to ${sideExp.designation}`}
            style={{
              transform:
                animStage === "expanded"
                  ? "translateX(0px) scale(1)"
                  : "translateX(140px) scale(0.6)",
              opacity: animStage === "expanded" ? 1 : 0,
              transition: "all 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`hidden lg:flex flex-col items-center justify-center absolute left-2 xl:left-8 z-10 cursor-pointer group select-none ${
              animStage === "expanded" ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Vertical Card Frame (Matching Reference Image) */}
            <div className="relative w-[78px] xl:w-[94px] h-[270px] xl:h-[320px] rounded-[26px] xl:rounded-[32px] p-1.5 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.6)] border border-white/80 group-hover:scale-105 group-hover:shadow-[0_20px_45px_rgba(255,255,255,0.2)] transition-all duration-300 overflow-hidden">
              <img
                src={sideExp.image}
                alt={sideExp.imageAlt}
                className="w-full h-full object-cover object-center rounded-[20px] xl:rounded-[26px] filter brightness-95 group-hover:brightness-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[26px]" />
              <div className="absolute bottom-3 inset-x-2 text-center">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-white uppercase bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                  {sideExp.company}
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              THE CENTER ACTIVE CARD (2 Parts: Left = Picture, Right = Summary)
              Balloon Animation: rises up from bottom to middle like a buoyant balloon
          ========================================================================== */}
          <div
            style={{
              transform:
                animStage === "blank"
                  ? "translateY(180px) scale(0.65)"
                  : "translateY(0px) scale(1)",
              opacity: animStage === "blank" ? 0 : 1,
              // Floating balloon physics transition
              transition:
                animStage === "balloon"
                  ? "transform 0.85s cubic-bezier(0.18, 0.89, 0.32, 1.25), opacity 0.45s ease-out"
                  : "transform 0.5s ease-out, opacity 0.3s ease-out",
            }}
            className="relative z-20 w-full max-w-[760px] rounded-[28px] sm:rounded-[36px] bg-white text-zinc-950 shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(255,255,255,0.12)] border border-white overflow-hidden transition-shadow duration-500 flex flex-col md:flex-row items-stretch"
          >
              {/* -------------------------------------------------------------
                  PART 1: LEFT PART IS PICTURE (User Requirement)
              -------------------------------------------------------------- */}
              <div className="w-full md:w-[48%] p-3 sm:p-4 shrink-0 flex items-center justify-center">
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[370px] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-zinc-100 shadow-inner group/pic">
                  {!imageError[activeExp.id] ? (
                    <img
                      src={activeExp.image}
                      alt={activeExp.imageAlt}
                      onError={() =>
                        setImageError((prev) => ({ ...prev, [activeExp.id]: true }))
                      }
                      className="w-full h-full object-cover object-center transform group-hover/pic:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white">
                      <GraduationCap className="w-14 h-14 text-emerald-400 mb-2" />
                      <span className="text-xs font-mono">{activeExp.company}</span>
                    </div>
                  )}

                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Brand pill emblem in bottom corner (matching RBL. logo in reference) */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-white uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 shadow-md">
                      {activeExp.company}
                    </span>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  PART 2: RIGHT PART IS SUMMARY OF THAT DESIGNATION (User Requirement)
                  "to know more about my designations user will click on view more button"
              -------------------------------------------------------------- */}
              <div className="w-full md:w-[52%] p-6 sm:p-8 md:pl-4 flex flex-col justify-between text-left">
                {/* Top: Header metadata */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {activeExp.location}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 font-medium">
                      {activeExp.period}
                    </span>
                  </div>

                  {/* Designation Title */}
                  <h3 className="font-editorial text-2xl sm:text-[1.75rem] font-bold text-zinc-950 tracking-tight leading-snug mt-1 mb-3">
                    {activeExp.designation}
                  </h3>

                  {/* Summary of that designation */}
                  <p className="text-xs sm:text-sm text-zinc-600 font-editorial-body leading-relaxed">
                    “{activeExp.summary}”
                  </p>
                </div>

                {/* Bottom: View More Button */}
                <div className="pt-5 mt-auto border-t border-zinc-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedExperience(activeExp)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-zinc-950 text-white hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-lg cursor-pointer group/btn active:scale-95"
                  >
                    <span>View More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <span className="text-[11px] font-mono text-zinc-400">
                    {activeIndex + 1} of {totalExperiences}
                  </span>
                </div>
              </div>
            </div>

            {/* Side Card Right (Vertical Box for next experience, matching reference image) */}
            <div
              onClick={handleNext}
              title={`Switch to ${sideExp.designation}`}
              style={{
                transform:
                  animStage === "expanded"
                    ? "translateX(0px) scale(1)"
                    : "translateX(-140px) scale(0.6)",
                opacity: animStage === "expanded" ? 1 : 0,
                transition: "all 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`hidden lg:flex flex-col items-center justify-center absolute right-2 xl:right-8 z-10 cursor-pointer group select-none ${
                animStage === "expanded" ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              {/* Vertical Card Frame (Matching Reference Image) */}
              <div className="relative w-[78px] xl:w-[94px] h-[270px] xl:h-[320px] rounded-[26px] xl:rounded-[32px] p-1.5 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.6)] border border-white/80 group-hover:scale-105 group-hover:shadow-[0_20px_45px_rgba(255,255,255,0.2)] transition-all duration-300 overflow-hidden">
                <img
                  src={sideExp.image}
                  alt={sideExp.imageAlt}
                  className="w-full h-full object-cover object-center rounded-[20px] xl:rounded-[26px] filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[26px]" />
                <div className="absolute bottom-3 inset-x-2 text-center">
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-white uppercase bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                    {sideExp.company}
                  </span>
                </div>
              </div>
            </div>
          </div>

        {/* Bottom Pagination Dots (Matching reference picture • — •) & Replay Icon */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {/* Arrow Left */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Experience"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/15"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {experiencesData.map((exp, idx) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Jump to ${exp.company}`}
                className={`transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-7 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                    : "w-2 h-2 rounded-full bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Arrow Right */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Experience"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/15"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Replay Balloon Animation button */}
          <button
            type="button"
            onClick={startAnimationSequence}
            title="Replay Balloon Float Animation"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 ml-1 border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;