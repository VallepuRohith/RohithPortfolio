import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export interface CertificateItem {
  id: string;
  name: string;
  displayName: string;
  categoryTag: string;
  subtitle: string;
  issuer: string;
  skills: string[];
  brandColor: string;
  ambientGlow: string;
}

export const certificatesData: CertificateItem[] = [
  {
    id: "java",
    name: "Java",
    displayName: "THE Java Enterprise",
    categoryTag: "Core Backend",
    subtitle: "Enterprise Java & Object-Oriented Architecture",
    issuer: "Oracle Certified Professional",
    skills: ["OOP", "Multithreading", "JVM Internals", "Collections", "Streams API"],
    brandColor: "#E76F00",
    ambientGlow: "rgba(231, 111, 0, 0.32)",
  },
  {
    id: "aws",
    name: "AWS",
    displayName: "THE AWS Cloud",
    categoryTag: "Cloud Architecture",
    subtitle: "Cloud Infrastructure & Scalable Solutions",
    issuer: "Amazon Web Services",
    skills: ["EC2 & S3", "AWS Lambda", "IAM & VPC", "CloudFront", "DynamoDB"],
    brandColor: "#FF9900",
    ambientGlow: "rgba(255, 153, 0, 0.35)",
  },
  {
    id: "python",
    name: "Python",
    displayName: "THE Python Core",
    categoryTag: "Data & Systems",
    subtitle: "Advanced Scripting, Data Structures & ASTs",
    issuer: "Python Institute Specialist",
    skills: ["Algorithms", "FastAPI", "Data Analysis", "OOP", "Automation"],
    brandColor: "#3776AB",
    ambientGlow: "rgba(55, 118, 171, 0.35)",
  },
  {
    id: "sql",
    name: "SQL",
    displayName: "THE SQL Database",
    categoryTag: "Database Engine",
    subtitle: "Relational Modeling & High-Performance Queries",
    issuer: "Relational DB Specialist",
    skills: ["Complex Joins", "Indexing", "Query Plan Optimization", "ACID", "PostgreSQL"],
    brandColor: "#00B4D8",
    ambientGlow: "rgba(0, 180, 216, 0.35)",
  },
  {
    id: "javascript",
    name: "JavaScript",
    displayName: "THE JavaScript ES6+",
    categoryTag: "Web Standard",
    subtitle: "Modern Asynchronous & Runtime Engine",
    issuer: "ECMAScript Specialist",
    skills: ["Closures", "Event Loop", "Promises & Async", "DOM APIs", "TypeScript Bridge"],
    brandColor: "#F7DF1E",
    ambientGlow: "rgba(247, 223, 30, 0.32)",
  },
  {
    id: "react",
    name: "React",
    displayName: "THE React Architecture",
    categoryTag: "Frontend UI",
    subtitle: "Declarative Component Systems & State Management",
    issuer: "Meta / React Ecosystem",
    skills: ["Hooks", "Virtual DOM", "State Management", "Performance Profiling", "Next.js"],
    brandColor: "#61DAFB",
    ambientGlow: "rgba(97, 218, 251, 0.35)",
  },
];

/* Official Scalable Vector Logos for each Language / Technology */
const CertificateLogo: React.FC<{ id: string; name: string }> = ({ id, name }) => {
  switch (id) {
    case "java":
      return (
        <svg
          viewBox="0 0 110 110"
          className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_32px_rgba(231,111,0,0.55)] transition-transform duration-500 group-hover:scale-110"
          aria-label={name}
        >
          {/* Steam 1 (Cyan/Blue #5382A1) */}
          <path
            d="M51 18c-8 12 5 20-3 32 7-9 5-18 0-24 7-3 7-7 3-8z"
            fill="#5382A1"
          />
          {/* Steam 2 (Orange/Red #E76F00) */}
          <path
            d="M60 12c7 10-5 19 3 28-6-8-4-15 0-20-6-3-6-7-3-8z"
            fill="#E76F00"
          />
          {/* Steam 3 (Orange/Red #E76F00) */}
          <path
            d="M70 20c5 8-3 15 2 22-5-6-3-12 0-16-5-2-5-5-2-6z"
            fill="#E76F00"
          />
          {/* Cup Rim & Body */}
          <path
            d="M32 58h46c0 0-2 24-23 24s-23-24-23-24z"
            fill="#5382A1"
          />
          {/* Cup Handle */}
          <path
            d="M76 60c9 1 15 6 15 13 0 8-7 13-17 13l2-5c6 0 10-3 10-8 0-5-5-8-10-8z"
            fill="#5382A1"
          />
          {/* Cup Saucer */}
          <ellipse cx="55" cy="88" rx="34" ry="7" fill="#E76F00" />
          <ellipse cx="55" cy="87" rx="30" ry="5" fill="#F89820" />
          {/* Coffee surface */}
          <ellipse cx="55" cy="58" rx="23" ry="5" fill="#2E1B0F" />
        </svg>
      );

    case "aws":
      return (
        <svg
          viewBox="0 0 100 65"
          className="w-32 sm:w-36 drop-shadow-[0_12px_32px_rgba(255,153,0,0.55)] transition-transform duration-500 group-hover:scale-110"
          aria-label={name}
        >
          {/* a */}
          <path
            d="M22 24.5c0-4.7 3.5-7.5 8.5-7.5 4.8 0 8.2 2.7 8.2 7.3v13.2h-3.7v-2.8c-1.4 2-3.8 3.1-6.4 3.1-4.8 0-8-3.3-8-7.7 0-4.6 3.4-7.4 8.2-7.4 2.6 0 4.7 1 5.9 2.4v-3.3c0-2.6-1.9-4.2-4.6-4.2-2.3 0-4.2 1.1-4.6 3.1h-3.5zm13 8.4v-2c-.9-1.2-2.5-2-4.4-2-3 0-4.9 1.8-4.9 4.4 0 2.6 1.8 4.4 4.8 4.4 2.2 0 3.7-1 4.5-2.4v-2.4z"
            fill="#FFFFFF"
          />
          {/* w */}
          <path
            d="M41 17.5h3.9l3.5 13.8 3.6-13.8h3.8l3.6 13.8 3.5-13.8h3.9l-5.4 19.8h-4l-3.5-13.3-3.6 13.3h-4L41 17.5z"
            fill="#FFFFFF"
          />
          {/* s */}
          <path
            d="M68.5 32.8c1.3 1.1 3.2 1.8 5.1 1.8 2.6 0 4.1-1.2 4.1-2.9 0-1.8-1.4-2.5-4.3-3.4-3.6-1.1-6.1-2.4-6.1-5.9 0-3.4 2.7-5.5 6.7-5.5 2.6 0 4.8.8 6.2 2.1l-1.6 2.7c-1.3-1-3-1.6-4.6-1.6-2.2 0-3.5 1.1-3.5 2.5 0 1.6 1.3 2.3 4 3.2 3.8 1.2 6.4 2.5 6.4 6.1 0 3.6-2.8 5.8-7.3 5.8-3 0-5.5-.9-7.1-2.5l2-2.9z"
            fill="#FFFFFF"
          />
          {/* Amazon Orange Smile Arrow */}
          <path
            d="M14 44c20 9 51 9 70 0 1.5-.7 3.3.4 2.5 2-20 11-56 11-75 0-.8-1.5 1-2.7 2.5-2z"
            fill="#FF9900"
          />
          {/* Arrow tip */}
          <path
            d="M85 43l3.8 4.2-5.4 1.2c-.8.2-1.3-.8-.8-1.4l2.4-4z"
            fill="#FF9900"
          />
        </svg>
      );

    case "python":
      return (
        <svg
          viewBox="0 0 110 110"
          className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_32px_rgba(55,118,171,0.55)] transition-transform duration-500 group-hover:scale-110"
          aria-label={name}
        >
          {/* Top Snake (Blue #3776AB) */}
          <path
            d="M54.2 8.5c-24.8 0-23.3 10.7-23.3 10.7l.03 11.1h23.7v3.4H21.5S7.2 32.1 7.2 56.8c0 24.8 12.6 24 12.6 24h7.5v-10.5c0-11.8 10.2-11.8 10.2-11.8h23.5c9.4 0 9.4-9.1 9.4-9.1v-23c0-7.8-6.8-17.9-16.2-17.9zm-9.3 7.3a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"
            fill="#3776AB"
          />
          {/* Bottom Snake (Yellow #FFD438) */}
          <path
            d="M55.8 101.5c24.8 0 23.3-10.7 23.3-10.7l-.03-11.1H55.4v-3.4h33.1s14.3 1.6 14.3-23.1c0-24.8-12.6-24-12.6-24h-7.5v10.5c0 11.8-10.2 11.8-10.2 11.8H49c-9.4 0-9.4 9.1-9.4 9.1v23c0 7.8 6.8 17.9 16.2 17.9zm9.3-7.3a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
            fill="#FFD438"
          />
        </svg>
      );

    case "sql":
      return (
        <svg
          viewBox="0 0 120 120"
          className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_32px_rgba(0,180,216,0.55)] transition-transform duration-500 group-hover:scale-110"
          aria-label={name}
        >
          {/* Database Stack Cylinders */}
          <ellipse cx="60" cy="28" rx="36" ry="13" fill="#00B4D8" />
          <path
            d="M24 28v20c0 7.2 16.1 13 36 13s36-5.8 36-13V28c0 7.2-16.1 13-36 13s-36-5.8-36-13z"
            fill="#0096C7"
          />
          <path
            d="M24 48v20c0 7.2 16.1 13 36 13s36-5.8 36-13V48c0 7.2-16.1 13-36 13s-36-5.8-36-13z"
            fill="#0077B6"
          />
          <path
            d="M24 68v20c0 7.2 16.1 13 36 13s36-5.8 36-13V68c0 7.2-16.1 13-36 13s-36-5.8-36-13z"
            fill="#023E8A"
          />
          {/* SQL Emblem Badge */}
          <rect
            x="26"
            y="48"
            width="68"
            height="26"
            rx="8"
            fill="#0A1128"
            stroke="#00B4D8"
            strokeWidth="2"
          />
          <text
            x="60"
            y="66"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="sans-serif"
            fontWeight="900"
            fontSize="15"
            letterSpacing="2"
          >
            SQL
          </text>
        </svg>
      );

    case "javascript":
      return (
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#F7DF1E] flex items-end justify-end p-2.5 shadow-[0_12px_32px_rgba(247,223,30,0.5)] transition-transform duration-500 group-hover:scale-110">
          <svg viewBox="0 0 80 80" className="w-full h-full" aria-label={name}>
            <path
              d="M16 64c3.5 2 7.5 3.2 11.5 3.2 6.5 0 10.5-3.2 10.5-10.5V32h-7.5v24c0 3.6-2 5.2-5.2 5.2-2.4 0-5.2-1.2-6.8-2.4l-2.5 5.2zM44 62c3.2 2.4 7.6 4 12.4 4 8 0 12.8-4 12.8-10.8 0-6-3.6-8.8-9.6-11.6-4.4-2-6.4-3.2-6.4-6 0-2.4 2-4 5.2-4 2.8 0 5.2 1.2 6.8 2.4l3.2-4.4c-2.4-2-6-3.2-10-3.2-7.2 0-12 4-12 10.4 0 5.6 3.6 8.4 9.2 11.2 4.8 2 6.8 3.6 6.8 6.4 0 2.8-2.4 4.4-6 4.4-3.6 0-6.8-1.6-9.2-3.6l-3.2 4.8z"
              fill="#000000"
            />
          </svg>
        </div>
      );

    case "react":
      return (
        <svg
          viewBox="0 0 110 110"
          className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_32px_rgba(97,218,251,0.55)] transition-transform duration-500 group-hover:scale-110"
          aria-label={name}
        >
          {/* Nucleus */}
          <circle cx="55" cy="55" r="9" fill="#61DAFB" />
          {/* Orbital Ellipse 1 */}
          <ellipse
            cx="55"
            cy="55"
            rx="43"
            ry="16.5"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="4"
          />
          {/* Orbital Ellipse 2 (rotated 60deg) */}
          <ellipse
            cx="55"
            cy="55"
            rx="43"
            ry="16.5"
            transform="rotate(60 55 55)"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="4"
          />
          {/* Orbital Ellipse 3 (rotated 120deg) */}
          <ellipse
            cx="55"
            cy="55"
            rx="43"
            ry="16.5"
            transform="rotate(120 55 55)"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="4"
          />
        </svg>
      );

    default:
      return null;
  }
};

interface CertificatesSectionProps {
  onBackToHome: () => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  onBackToHome,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const totalCertificates = certificatesData.length;
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCertificates) % totalCertificates);
  }, [totalCertificates]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCertificates);
  }, [totalCertificates]);

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

  // Touch swipe for mobile/tablet devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const activeCertificate = certificatesData[activeIndex];

  // 3D curved cylinder/coverflow perspective: exactly 5 cards visible simultaneously
  const getCardStyle = (index: number) => {
    let offset = (index - activeIndex + totalCertificates) % totalCertificates;
    if (offset > totalCertificates / 2) {
      offset = offset - totalCertificates;
    }

    let transform = "";
    let opacity = 0;
    let zIndex = 0;
    let pointerEvents: "auto" | "none" = "none";
    let filter = "brightness(0.5) blur(3px)";

    if (offset === 0) {
      // Center active card: facing straight, prominent, lower/level as in reference image
      transform = "translateX(0%) translateY(0px) translateZ(0px) rotateY(0deg) scale(1)";
      opacity = 1;
      zIndex = 30;
      pointerEvents = "auto";
      filter = "none";
    } else if (offset === -1) {
      // Immediate left card: tilted with Y rotation toward center
      transform = "translateX(-64%) translateY(-6px) translateZ(-80px) rotateY(24deg) scale(0.86)";
      opacity = 0.9;
      zIndex = 20;
      pointerEvents = "auto";
      filter = "brightness(0.85)";
    } else if (offset === 1) {
      // Immediate right card: tilted with Y rotation toward center
      transform = "translateX(64%) translateY(-6px) translateZ(-80px) rotateY(-24deg) scale(0.86)";
      opacity = 0.9;
      zIndex = 20;
      pointerEvents = "auto";
      filter = "brightness(0.85)";
    } else if (offset === -2) {
      // Far left card: further angled along curved arc
      transform = "translateX(-116%) translateY(-14px) translateZ(-170px) rotateY(38deg) scale(0.72)";
      opacity = 0.62;
      zIndex = 10;
      pointerEvents = "auto";
      filter = "brightness(0.7) blur(0.4px)";
    } else if (offset === 2) {
      // Far right card: further angled along curved arc
      transform = "translateX(116%) translateY(-14px) translateZ(-170px) rotateY(-38deg) scale(0.72)";
      opacity = 0.62;
      zIndex = 10;
      pointerEvents = "auto";
      filter = "brightness(0.7) blur(0.4px)";
    } else {
      // Offscreen/hidden cards
      transform = "translateX(0%) translateZ(-350px) scale(0.5)";
      opacity = 0;
      zIndex = 0;
      pointerEvents = "none";
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
    <div className="relative w-full h-screen max-h-screen overflow-hidden flex flex-col justify-between items-center select-none certificates-screen-bg text-white">
      {/* 1. Atmospheric Colored Glow of the Active Certificate */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {certificatesData.map((cert, idx) => (
          <div
            key={cert.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeIndex === idx ? "opacity-100" : "opacity-0"
              }`}
          >
            {/* Ambient Radial Bloom matching the active tech brand color */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[110px] opacity-40"
              style={{ backgroundColor: cert.brandColor }}
            />
          </div>
        ))}

        {/* Cinematic Vignette Overlay matching reference image */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0a08]/60 to-[#080605]/95" />
      </div>

      {/* Top Floating Bar: Back to Home Button */}
      <div className="relative z-30 w-full max-w-7xl pt-3 sm:pt-4 px-4 sm:px-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          {/* <button
            onClick={onBackToHome}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button> */}
        </div>

        {/* Verified Credential Tag */}
        {/* <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-amber-200/90 bg-amber-500/10 border border-amber-500/20 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Accredited Technical Proficiencies</span>
        </div> */}
      </div>

      {/* 2. Top Header Pattern Analyzed from the Reference Picture */}
      <header className="relative z-20 w-full max-w-7xl px-4 sm:px-8 pt-1 sm:pt-2">
        {/* Upper Editorial Eyebrows matching Reference Image */}
        {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 sm:mb-3">
          <div className="text-xs sm:text-sm font-semibold tracking-wide text-amber-100/80">
            View our latest certificates
          </div>
          <div className="text-[11px] sm:text-xs text-stone-400 max-w-md sm:text-right font-normal leading-relaxed">
            Rigorous technical certifications and industry standards validating production-grade engineering mastery.
          </div>
        </div> */}

        {/* Main Title Row: Left Statement + Giant "CERTIFICATES" (Replacing "OUR WORKS") */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6 pt-1 border-t border-white/10">
          {/* Left statement paragraph */}
          {/* <div className="max-w-xs text-[11px] sm:text-xs text-stone-300/85 leading-relaxed order-2 md:order-1 hidden sm:block">
            Rohith's verified technical certifications &amp; credentials validating production-ready engineering across core languages and cloud.
          </div> */}

          {/* 1. "OUR WORKS" replaced with "CERTIFICATES" in wide futuristic display font */}
          {/* <h1 className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] order-1 md:order-2">
            CERTIFICATES
          </h1> */}
        </div>
      </header>

      {/* 3. 3D Spatial Coverflow Stage: 5 Cards Visible Simultaneously */}
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-20 w-full flex-1 flex items-center justify-center overflow-visible min-h-[340px] sm:min-h-[380px]"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Desktop Side Arrow Navigation */}
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous certificate"
          className="hidden md:flex absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 text-white/80 hover:text-white border border-white/20 backdrop-blur-xl items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          type="button"
          aria-label="Next certificate"
          className="hidden md:flex absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 text-white/80 hover:text-white border border-white/20 backdrop-blur-xl items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 5-Card 3D Arc Display */}
        {certificatesData.map((cert, index) => {
          const { transform, opacity, zIndex, pointerEvents, filter, offset } = getCardStyle(index);
          const isCenter = offset === 0;

          return (
            <div
              key={cert.id}
              onClick={() => setActiveIndex(index)}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76vw] max-w-[230px] sm:max-w-[270px] lg:max-w-[290px] h-[340px] sm:h-[400px] lg:h-[430px] max-h-[54vh] rounded-[24px] sm:rounded-[30px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${isCenter
                ? "cursor-default shadow-[0_28px_60px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.35)]"
                : "cursor-pointer hover:brightness-110 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
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
              {/* Card Container with Dark Luxury Texture */}
              <div className="relative w-full h-full rounded-[24px] sm:rounded-[30px] overflow-hidden bg-[#181310]/90 border border-white/20 group flex flex-col justify-between p-5 sm:p-6">
                {/* Background Ambient Colored Radial Glow */}
                <div
                  className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 45%, ${cert.brandColor} 0%, transparent 75%)`,
                  }}
                />

                {/* Subtle Grain / Studio lighting overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/80 pointer-events-none" />

                {/* Top Section: Pill Tag (like "Rings" in image) + Index / Verified badge */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  {/* Pill Tag matching reference image */}
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-black/50 text-white/90 border border-white/20 backdrop-blur-md shadow-sm">
                    {cert.categoryTag}
                  </span>

                  {/* Certified check indicator */}
                  <div className="flex items-center gap-1 font-mono text-[10px] text-white/70 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Center Section: Official Scalable Logo in place of jewelry picture */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
                  <div className="p-3 sm:p-4 rounded-3xl bg-black/30 border border-white/10 backdrop-blur-md flex items-center justify-center">
                    <CertificateLogo id={cert.id} name={cert.name} />
                  </div>
                </div>

                {/* Bottom Section: Title matching reference picture (e.g. "THE Hibiscus Ring II") */}
                <div className="relative z-10 pt-2 text-left">
                  {/* Name in bold display font */}
                  <h3 className="font-syne text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white mb-1 drop-shadow-md">
                    {cert.displayName}
                  </h3>

                  {/* Issuer & Subtitle */}
                  <p className="text-[11px] sm:text-xs text-stone-300 font-medium truncate">
                    {cert.issuer}
                  </p>

                  {/* Key Skills Tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Navigation Part Analyzed from Reference Picture (Sits cleanly above dock) */}
      <div className="relative z-30 mb-20 sm:mb-24 flex flex-col items-center gap-3 px-4">
        {/* Navigation Controls: Circular Next & Previous Buttons (from the reference picture) */}
        <div className="flex items-center justify-center gap-3">
          {/* Circular Previous Button ( ← ) */}
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Previous certificate"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/70 active:scale-95 text-white/90 hover:text-white border border-white/30 hover:border-white/60 backdrop-blur-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Active Certificate Capsule Info */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 backdrop-blur-2xl border border-white/20 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeCertificate.brandColor }} />
            <div className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              {activeCertificate.name}
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-white/60 pl-1 border-l border-white/20">
              {activeIndex + 1} / {totalCertificates}
            </span>
          </div>

          {/* Circular Next Button ( → ) */}
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next certificate"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/70 active:scale-95 text-white/90 hover:text-white border border-white/30 hover:border-white/60 backdrop-blur-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg group"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Certificate Indicator Progress Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {certificatesData.map((cert, idx) => (
            <button
              key={cert.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Jump to ${cert.name}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx
                ? "w-6 bg-white shadow-sm"
                : "w-2 bg-white/30 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
