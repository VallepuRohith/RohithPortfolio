import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FolderKanban,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Github,
  Heart,
  Sparkles,
  Layers,
  X,
  Cpu,
  CheckCircle2,
} from "lucide-react";

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  techStack: string[];
  metrics: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  features: string[];
  architecture: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "complexity-analyzer",
    name: "Time and Space Complexity Analyzer",
    category: "Static AST Code Analysis & Asymptotics",
    tagline: "Automated Big-O Algorithmic Profiling",
    description:
      "Automated static analysis engine that computes Big-O asymptotic time and space bounds from source code ASTs, producing live asymptotic curves, cyclomatic complexity scores, and recursion depth graphs.",
    techStack: ["Python", "AST Parser", "Big-O Analysis", "React", "D3.js", "FastAPI"],
    metrics: "O(1) to O(2ⁿ) Detection · Flame Graphs · Live AST Tree",
    image: "/assets/projects/complexity-analyzer.jpg",
    githubUrl: "https://github.com/VallepuRohith/complexity-analyzer",
    liveUrl: "https://github.com/VallepuRohith",
    features: [
      "Real-time cyclomatic and asymptotic complexity computation",
      "Interactive AST tree visualization with AST node inspection",
      "Comparative growth curves: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)",
      "Automated recursion depth & heap memory footprint estimation",
    ],
    architecture:
      "Source Code → Abstract Syntax Tree Parser → Symbolic Recurrence Solver → Asymptotic Curve Generator & Interactive D3 Dashboard.",
  },
  {
    id: "algo-visualizer",
    name: "Algorithm Visualizer",
    category: "Interactive Data Structures & Visual Computing",
    tagline: "Step-Through Algorithmic Exploration",
    description:
      "High-performance interactive algorithm visualizer supporting 30+ sorting, tree traversal, dynamic programming, and pathfinding algorithms with real-time state manipulation and step debugging.",
    techStack: ["TypeScript", "React", "Dijkstra & A*", "Canvas API", "Web Workers", "Tailwind CSS"],
    metrics: "30+ Algorithms · Step Debugger · Custom Graph Builder",
    image: "/assets/projects/algo-visualizer.jpg",
    githubUrl: "https://github.com/VallepuRohith/algorithm-visualizer",
    liveUrl: "https://github.com/VallepuRohith",
    features: [
      "Dijkstra, A*, BFS, DFS shortest path visualizer on interactive weighted grids",
      "Sorting array comparisons with real-time sound pitch frequency synthesis",
      "Step-by-step playback debugger with breakpoint and speed controls",
      "Memory allocation and swap count performance telemetry",
    ],
    architecture:
      "React Canvas Engine → Web Worker Algorithm Execution → High-Precision Animation Scheduler with Audio Synthesis.",
  },
  {
    id: "movie-recommendation",
    name: "Movie Recommended System",
    category: "Machine Learning & Recommender Engine",
    tagline: "Hybrid Collaborative & Content Filtering",
    description:
      "Hyper-personalized recommendation engine utilizing hybrid matrix factorization and TF-IDF cosine similarity across cinematic metadata to predict user taste with 98% affinity accuracy.",
    techStack: ["Python", "Scikit-Learn", "Cosine Similarity", "FastAPI", "React", "Tailwind CSS"],
    metrics: "98% Match Accuracy · Vector Clustering · 50k+ Titles",
    image: "/assets/projects/movie-recommendation.jpg",
    githubUrl: "https://github.com/VallepuRohith/movie-recommendation-system",
    liveUrl: "https://github.com/VallepuRohith",
    features: [
      "Hybrid collaborative and content-based recommendation model",
      "Interactive multi-dimensional genre affinity radar & cluster graph",
      "Real-time rating predictor and personalized watchlist curation",
      "Low-latency vector similarity search powered by optimized embeddings",
    ],
    architecture:
      "50k+ Metadata Corpus → TF-IDF Vectorizer & SVD Matrix Factorization → Cosine Similarity API → React Streaming UI.",
  },
  {
    id: "research-paper-analysis",
    name: "Research Paper Analysis",
    category: "Natural Language Processing & AI Parser",
    tagline: "Automated Academic Paper Synthesis",
    description:
      "Intelligent document digestion platform that extracts methodologies, cross-references citations into an interactive knowledge graph, and generates structured executive summaries from scientific papers.",
    techStack: ["NLP", "Transformers", "LangChain", "Knowledge Graphs", "Python", "React"],
    metrics: "Citation Graphs · Multi-Modal LLM · Instant Summaries",
    image: "/assets/projects/research-paper-analysis.jpg",
    githubUrl: "https://github.com/VallepuRohith/research-paper-analysis",
    liveUrl: "https://github.com/VallepuRohith",
    features: [
      "PDF parsing with section extraction and formula recognition",
      "Interactive citation network graph connecting authors and prior literature",
      "Automated executive summary generation and methodology benchmarking",
      "Semantic search across paper body with contextual Q&A assistance",
    ],
    architecture:
      "PDF Document Stream → LayoutLM OCR & AST Parser → Transformer Embedding Model → Neo4j Knowledge Graph & LLM Summarizer.",
  },
  {
    id: "bus-booking",
    name: "Bus Ticket Booking System",
    category: "Real-Time Transit Logistics & Fleet Platform",
    tagline: "Interactive Seat Reservation Engine",
    description:
      "Full-stack transit seat reservation system featuring real-time socket seat locking, interactive bus deck blueprints, route telemetry tracking, and dynamic digital QR boarding passes.",
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "WebSockets", "Tailwind CSS"],
    metrics: "Zero Double-Booking · Live Seat Lock · QR Boarding Pass",
    image: "/assets/projects/bus-booking.jpg",
    githubUrl: "https://github.com/VallepuRohith/bus-ticket-booking-system",
    liveUrl: "https://github.com/VallepuRohith",
    features: [
      "Real-time concurrent seat reservation locking using Redis and WebSockets",
      "Interactive bus cabin deck selector (sleeper, semi-sleeper, recliner)",
      "Dynamic route map with live estimated arrival times and stops",
      "Automated QR-code ticket generation and verification portal",
    ],
    architecture:
      "Node.js & WebSocket Cluster → Redis Distributed Lock Manager → PostgreSQL ACID Booking Pipeline → Interactive Deck UI.",
  },
];

interface ProjectsSectionProps {
  onBackToHome: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onBackToHome }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [expandedProject, setExpandedProject] = useState<ProjectItem | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const totalProjects = projectsData.length;
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  // Keyboard navigation: Left and Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedProject) return; // Ignore when modal is open
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, expandedProject]);

  // Touch Swipe for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }
    setTouchStartX(null);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeProject = projectsData[activeIndex];

  // Calculate 3D coverflow transform for each card based on offset relative to activeIndex
  const getCardStyle = (index: number) => {
    // Relative offset in circular range [-2, 2]
    let offset = (index - activeIndex + totalProjects) % totalProjects;
    if (offset > 2) {
      offset = offset - totalProjects;
    }

    // Default styles for hidden or far items
    let transform = "";
    let opacity = 0;
    let zIndex = 0;
    let pointerEvents: "auto" | "none" = "none";
    let filter = "blur(2px) brightness(0.6)";

    if (offset === 0) {
      // Center active card
      transform = "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)";
      opacity = 1;
      zIndex = 30;
      pointerEvents = "auto";
      filter = "none";
    } else if (offset === -1) {
      // Immediate left card
      transform = "translateX(-68%) translateZ(-140px) rotateY(28deg) scale(0.85)";
      opacity = 0.82;
      zIndex = 20;
      pointerEvents = "auto";
      filter = "brightness(0.9) blur(0.4px)";
    } else if (offset === 1) {
      // Immediate right card
      transform = "translateX(68%) translateZ(-140px) rotateY(-28deg) scale(0.85)";
      opacity = 0.82;
      zIndex = 20;
      pointerEvents = "auto";
      filter = "brightness(0.9) blur(0.4px)";
    } else if (offset === -2) {
      // Far left card
      transform = "translateX(-120%) translateZ(-260px) rotateY(42deg) scale(0.72)";
      opacity = 0.48;
      zIndex = 10;
      pointerEvents = "auto";
      filter = "brightness(0.75) blur(1.2px)";
    } else if (offset === 2) {
      // Far right card
      transform = "translateX(120%) translateZ(-260px) rotateY(-42deg) scale(0.72)";
      opacity = 0.48;
      zIndex = 10;
      pointerEvents = "auto";
      filter = "brightness(0.75) blur(1.2px)";
    }

    return {
      transform,
      opacity,
      zIndex,
      pointerEvents,
      filter,
      offset,
    };
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start px-3 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 z-20 overflow-y-auto sky-ambient-bg select-none">
      {/* Full-Screen Glassmorphic Container matching Skills Section breadth */}
      <div className="w-full max-w-[1360px] rounded-3xl p-4 sm:p-8 lg:p-10 backdrop-blur-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300 frosted-card border border-white/85 shadow-[0_24px_70px_rgba(20,50,90,0.12)] pb-28 sm:pb-32">
        {/* Top Header Bar: Back to Home & Category Indicator */}
        <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={onBackToHome}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-[#1e334d] border border-white/90 bg-white/75 hover:bg-white hover:text-[#0c1827] shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-[#2d496a] bg-white/60 border border-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>3D Spatial Showcase · 5 Builds</span>
          </div>
        </div>

        {/* Section Badge Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/80 border border-white flex items-center justify-center text-[#1b3452] shadow-[0_8px_20px_rgba(25,50,85,0.08)] mb-4 sm:mb-5">
          <FolderKanban className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>

        {/* Section Title & Subtitle */}
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-[#0f1c2e] uppercase mb-2">
          FEATURED PROJECTS &amp; BUILDS
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#3b526d] font-medium max-w-2xl mb-2 sm:mb-3">
          Interactive Spatial 3D Coverflow · Browse production apps, algorithms &amp; developer tools
        </p>

        {/* Sub-kicker pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8">
          {["Time & Space Analyzer", "Algorithm Visualizer", "Movie Recommender", "Paper AI", "Bus Booking"].map(
            (tag, idx) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "bg-[#0f1c2e] text-white shadow-md scale-105"
                    : "bg-white/70 text-[#3b526d] border border-white/80 hover:bg-white"
                }`}
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* 3D Perspective Stage Viewport */}
        <div
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] flex items-center justify-center overflow-hidden my-2 sm:my-4"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {projectsData.map((project, index) => {
            const { transform, opacity, zIndex, pointerEvents, filter, offset } = getCardStyle(index);
            const isCenter = offset === 0;

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] h-[480px] sm:h-[530px] lg:h-[560px] rounded-[28px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
                  isCenter
                    ? "cursor-default shadow-[0_25px_60px_rgba(15,28,46,0.28),0_0_0_1px_rgba(255,255,255,0.9)]"
                    : "cursor-pointer hover:opacity-95 shadow-[0_15px_35px_rgba(15,28,46,0.18)]"
                }`}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  pointerEvents,
                  filter,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Frosted Glass Card Container */}
                <div className="relative w-full h-full flex flex-col justify-between bg-white/75 backdrop-blur-2xl border border-white/85 text-left overflow-hidden">
                  {/* Top Image Banner with Gradient Shadow */}
                  <div className="relative w-full h-[50%] sm:h-[52%] overflow-hidden bg-[#0c1827]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                      loading="eager"
                    />

                    {/* Gradient Overlay for seamless transition into text area */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Top Action Pills on Active Card */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      {/* Category Badge */}
                      <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide bg-black/50 backdrop-blur-md text-white/90 border border-white/20">
                        {project.category.split("&")[0]}
                      </span>

                      {/* Expand Button (as in reference image) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedProject(project);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-black/50 hover:bg-black/75 border border-white/25 backdrop-blur-md shadow-sm transition-all cursor-pointer"
                        title="Expand Details"
                      >
                        <Maximize2 className="w-3 h-3 text-white" />
                        <span>Expand</span>
                      </button>
                    </div>

                    {/* Bottom of Image Tagline & Pin */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white text-[11px] font-medium z-10">
                      <span className="truncate max-w-[220px] text-white/90 font-mono text-[10.5px]">
                        {project.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Lower Content Area: Title, Counter, Description, Badges */}
                  <div className="relative flex-1 p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-white/95 to-white/85 backdrop-blur-xl">
                    <div>
                      {/* Title & Index Counter (e.g. 1 / 5) matching reference picture */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#0f1c2e] leading-tight">
                          {project.name}
                        </h3>
                        <span className="font-mono text-xs font-bold text-[#64748b] bg-[#e6f1fa] px-2 py-0.5 rounded-md border border-white shrink-0 mt-0.5">
                          {index + 1} / {totalProjects}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[11.5px] sm:text-xs text-[#47607a] leading-relaxed line-clamp-3 mb-3">
                        {project.description}
                      </p>

                      {/* Highlights / Specialization */}
                      <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#254668] mb-3">
                        <Sparkles className="w-3 h-3 text-[#EA6113] shrink-0" />
                        <span className="truncate">{project.metrics}</span>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white border border-[#cde0f1] text-[#2c4765] shadow-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium text-[#6b829c] bg-[#eef5fb]">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Links: GitHub & Live Demo */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-1.5 px-3 rounded-full text-[11px] font-semibold text-center bg-[#0f1c2e] hover:bg-[#1a3352] text-white transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="py-1.5 px-3 rounded-full text-[11px] font-semibold text-center bg-white hover:bg-[#f1f6fb] text-[#1e344f] border border-[#cde0f1] transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Github className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Left & Right Navigation Pill (Matching user's reference image!) */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
          {/* Glassmorphic Capsule Navigation Bar */}
          <div className="inline-flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/70 backdrop-blur-2xl border border-white/95 shadow-[0_12px_36px_rgba(20,50,90,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] max-w-full">
            {/* Left Navigation Arrow Button */}
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous Project"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#f2f8fd] active:scale-95 text-[#0f1c2e] border border-white/90 shadow-sm flex items-center justify-center transition-all cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Middle Active Project Quick Summary */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-1 sm:px-2 max-w-[220px] sm:max-w-[320px] text-left">
              {/* Circular Thumbnail */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/90 shadow-xs shrink-0">
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="truncate">
                <div className="text-xs sm:text-sm font-bold text-[#0f1c2e] truncate">
                  {activeProject.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#546e8c] truncate">
                  {activeProject.tagline}
                </div>
              </div>
            </div>

            {/* Favorite / Heart Button */}
            <button
              onClick={(e) => toggleLike(activeProject.id, e)}
              type="button"
              aria-label="Save Project"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/90 shadow-xs flex items-center justify-center transition-all cursor-pointer ${
                isLiked[activeProject.id]
                  ? "bg-rose-50 text-rose-500 border-rose-200"
                  : "bg-white hover:bg-[#f2f8fd] text-[#546e8c]"
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  isLiked[activeProject.id] ? "fill-rose-500 scale-110" : ""
                }`}
              />
            </button>

            {/* Right Navigation Arrow Button */}
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next Project"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#f2f8fd] active:scale-95 text-[#0f1c2e] border border-white/90 shadow-sm flex items-center justify-center transition-all cursor-pointer group"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Indicator Dots (matching bottom dots in reference image) */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {projectsData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Jump to project ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-7 bg-[#0f1c2e] shadow-xs"
                    : "w-2 bg-[#9fb5cc]/50 hover:bg-[#6885a5]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Project Details Modal */}
      {expandedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setExpandedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-2xl p-6 sm:p-8 border border-white shadow-[0_25px_60px_rgba(15,28,46,0.3)] text-left animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setExpandedProject(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header info */}
            <div className="pr-8 mb-4">
              <span className="font-mono text-xs font-semibold text-[#EA6113] uppercase tracking-wider">
                {expandedProject.category}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0f1c2e] mt-1">
                {expandedProject.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#47607a] mt-1 font-medium">
                {expandedProject.tagline}
              </p>
            </div>

            {/* Image Banner */}
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-5 border border-slate-200/80 shadow-inner">
              <img
                src={expandedProject.image}
                alt={expandedProject.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#3b526d] leading-relaxed mb-5">
              {expandedProject.description}
            </p>

            {/* Key Features */}
            <div className="mb-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f1c2e] mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Core Capabilities &amp; Features</span>
              </div>
              <ul className="space-y-1.5">
                {expandedProject.features.map((feat, i) => (
                  <li key={i} className="text-xs text-[#47607a] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA6113] mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Flow */}
            <div className="mb-5 p-3.5 rounded-xl bg-[#eef5fb] border border-[#d6e6f5]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1e344f] mb-1.5">
                <Cpu className="w-4 h-4 text-[#204975]" />
                <span>System Architecture</span>
              </div>
              <p className="font-mono text-[11px] text-[#33557a] leading-relaxed">
                {expandedProject.architecture}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f1c2e] mb-2">
                <Layers className="w-4 h-4 text-[#204975]" />
                <span>Technologies &amp; Libraries</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {expandedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-[#cde0f1] text-[#2c4765] shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
              <a
                href={expandedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold text-center bg-[#0f1c2e] hover:bg-[#1a3352] text-white transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch Live Demo</span>
              </a>

              <a
                href={expandedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-xl text-xs font-semibold text-center bg-white hover:bg-slate-50 text-[#1e344f] border border-slate-300 transition-all shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source Code</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
