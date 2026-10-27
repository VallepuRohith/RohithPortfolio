import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
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
    liveUrl: "https://complexity-analyzer-skuf.onrender.com/",
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
    githubUrl: "https://github.com/VallepuRohith/AlgorithmVisualizer",
    liveUrl: "https://algorithmvisualizer-j5oi.onrender.com",
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
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

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

  const activeProject = projectsData[activeIndex];

  // Calculate 3D coverflow transform for each card based on circular offset relative to activeIndex
  const getCardStyle = (index: number) => {
    let offset = (index - activeIndex + totalProjects) % totalProjects;
    if (offset > 2) {
      offset = offset - totalProjects;
    }

    let transform = "";
    let opacity = 0;
    let zIndex = 0;
    let pointerEvents: "auto" | "none" = "none";
    let filter = "brightness(0.6) blur(2px)";

    if (offset === 0) {
      // Center active card
      transform = "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)";
      opacity = 1;
      zIndex = 30;
      pointerEvents = "auto";
      filter = "none";
    } else if (offset === -1) {
      // Immediate left card
      transform = "translateX(-64%) translateZ(-120px) rotateY(24deg) scale(0.86)";
      opacity = 0.88;
      zIndex = 20;
      pointerEvents = "auto";
      filter = "brightness(0.85)";
    } else if (offset === 1) {
      // Immediate right card
      transform = "translateX(64%) translateZ(-120px) rotateY(-24deg) scale(0.86)";
      opacity = 0.88;
      zIndex = 20;
      pointerEvents = "auto";
      filter = "brightness(0.85)";
    } else if (offset === -2) {
      // Far left card
      transform = "translateX(-118%) translateZ(-240px) rotateY(38deg) scale(0.72)";
      opacity = 0.55;
      zIndex = 10;
      pointerEvents = "auto";
      filter = "brightness(0.7) blur(0.6px)";
    } else if (offset === 2) {
      // Far right card
      transform = "translateX(118%) translateZ(-240px) rotateY(-38deg) scale(0.72)";
      opacity = 0.55;
      zIndex = 10;
      pointerEvents = "auto";
      filter = "brightness(0.7) blur(0.6px)";
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
    <div className="relative w-full h-screen max-h-screen overflow-hidden flex flex-col justify-between items-center select-none bg-slate-950">
      {/* 1. Atmospheric Blurred Background of the Active Project with Smooth Crossfade */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {projectsData.map((project, idx) => (
          <div
            key={project.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeIndex === idx ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={project.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover filter blur-[45px] sm:blur-[60px] scale-110 brightness-[0.55] contrast-[1.15]"
            />
          </div>
        ))}
        {/* Soft cinematic vignette overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85" />
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      {/* Top Floating Bar: Back to Home Button */}
      <div className="relative z-30 w-full max-w-7xl pt-4 sm:pt-6 px-4 sm:px-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          {/* <button
            onClick={onBackToHome}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button> */}
        </div>
      </div>

      {/* 2. 3D Spatial Coverflow Stage Viewport (Fitting screen without scroll) */}
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-20 w-full flex-1 flex items-center justify-center overflow-visible min-h-[360px]"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Side Arrow Navigation Buttons (Spatial reference style) */}
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous project"
          className="hidden md:flex absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 text-white/80 hover:text-white border border-white/20 backdrop-blur-xl items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          type="button"
          aria-label="Next project"
          className="hidden md:flex absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 text-white/80 hover:text-white border border-white/20 backdrop-blur-xl items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 3D Cards */}
        {projectsData.map((project, index) => {
          const { transform, opacity, zIndex, pointerEvents, filter, offset } = getCardStyle(index);
          const isCenter = offset === 0;

          return (
            <div
              key={project.id}
              onClick={() => {
                setActiveIndex(index);
              }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[82vw] max-w-[310px] sm:max-w-[350px] lg:max-w-[380px] h-[380px] sm:h-[440px] lg:h-[480px] max-h-[58vh] rounded-[28px] sm:rounded-[32px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${isCenter
                ? "cursor-default shadow-[0_30px_70px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.4)]"
                : "cursor-pointer hover:brightness-110 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
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
              {/* Card Container */}
              <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-900 border border-white/25 group">
                {/* Full Cover Project Image */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />

                {/* Dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />

                {/* Top-Right Index Badge (matching reference picture 1 / 20) */}
                <div className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 z-10">
                  <span className="font-mono text-[11px] sm:text-xs font-semibold text-white/95 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
                    {index + 1} / {totalProjects}
                  </span>
                </div>

                {/* Card Content: ONLY 3 THINGS as requested (1. Name, 2. Live Link, 3. Git Link) */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-left">
                  {/* 1. Project Name */}
                  <h3 className="font-editorial text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-white leading-tight drop-shadow-md mb-3">
                    {project.name}
                  </h3>

                  {/* 2. Link of it & 3. Git link */}
                  <div className="flex items-center gap-2.5">
                    {/* 2. Link of it */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2 sm:py-2.5 px-4 rounded-full text-xs font-semibold text-center bg-white text-[#0f1c2e] hover:bg-slate-100 active:scale-95 transition-all shadow-md inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {/* 3. Git link */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2 sm:py-2.5 px-4 rounded-full text-xs font-semibold text-center bg-white/20 hover:bg-white/35 text-white border border-white/35 backdrop-blur-md active:scale-95 transition-all shadow-md inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Down Navigation Part to Browse Projects (Sits cleanly above main dock) */}
      <div className="relative z-30 mb-20 sm:mb-24 flex flex-col items-center gap-2.5 px-4">
        {/* Glassmorphic Navigation Capsule */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/50 backdrop-blur-2xl border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.2)]">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Previous project"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center active:scale-95 transition-all cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Center Active Project Capsule Info */}
          <div className="flex items-center gap-2.5 px-2 max-w-[200px] sm:max-w-[280px] text-left">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/30 shrink-0">
              <img
                src={activeProject.image}
                alt={activeProject.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <div className="text-xs sm:text-sm font-semibold text-white truncate">
                {activeProject.name}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-white/70">
                {activeIndex + 1} of {totalProjects}
              </div>
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next project"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center active:scale-95 transition-all cursor-pointer group"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Project Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Jump to project ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx
                ? "w-6 bg-white shadow-sm"
                : "w-2 bg-white/35 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
