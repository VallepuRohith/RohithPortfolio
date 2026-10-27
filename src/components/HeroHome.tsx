import React from "react";
import rohithEditorial from "@/assets/Rohith.png";

export const HeroHome: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen flex items-center justify-center overflow-hidden sky-ambient-bg select-none">
      {/* Soft atmospheric gradient glows reproducing the sky blue canvas */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle top-left soft sky tint */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-[#bde0f7]/40 blur-3xl" />
        {/* Subtle center daylight bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/70 blur-3xl" />
        {/* Subtle bottom-right sky wash */}
        <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] rounded-full bg-[#c8e5f9]/50 blur-3xl" />
      </div>

      {/* Main Editorial Hero Stage */}
      <div className="relative w-full max-w-[1600px] h-screen min-h-[640px] max-h-[1050px] px-4 sm:px-8 lg:px-12 flex items-center justify-center">

        {/* Top-Left / Left to Head: "VALLEPU" + Editorial Kicker */}
        <div className="absolute top-[16%] sm:top-[20%] lg:top-[22%] left-4 sm:left-8 lg:left-14 xl:left-20 z-20 flex flex-col items-start pointer-events-none">
          {/* Subtitle / Kicker */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-6 sm:w-10 h-[1.5px] bg-[#3b526d]/60" />
            <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold tracking-[0.28em] text-[#3b526d] uppercase font-sans">
              Software Developer &amp; Instructor
            </span>
          </div>

          {/* Large Editorial Name: VALLEPU */}
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] xl:text-[7.5rem] font-bold tracking-[0.06em] text-[#0f1c2e] uppercase editorial-wordmark">
            VALLEPU
          </h1>

          {/* Secondary Subtitle Tagline */}
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs tracking-[0.22em] uppercase text-[#5a738e] font-medium pl-1">
            Building Ideas Into Reality
          </p>
        </div>

        {/* Central Hero Figure: Rohith Editorial Cutout */}
        <div className="relative z-15 h-full flex items-end justify-center pb-36 sm:pb-38 lg:pb-40  pointer-events-none">
          <img
            src={rohithEditorial}
            alt="Vallepu Rohith — Editorial Portrait"
            className="h-[74vh] sm:h-[82vh] lg:h-[86vh] max-h-[880px] w-auto object-contain object-bottom drop-shadow-[0_24px_45px_rgba(25,55,90,0.18)]"
            loading="eager"
          />
        </div>

        {/* Bottom-Right / Right After Knee: "ROHITH" + Editorial Tagline */}
        <div className="absolute bottom-[20%] sm:bottom-[18%] lg:bottom-[19%] right-4 sm:right-8 lg:right-14 xl:right-20 z-20 flex flex-col items-end text-right pointer-events-none">
          {/* Secondary Tagline on top of Rohith */}
          <p className="mb-1 sm:mb-2 text-[10px] sm:text-xs tracking-[0.24em] uppercase text-[#5a738e] font-medium pr-1">
            Problem Solver · Lifelong Learner
          </p>

          {/* Large Editorial Name: ROHITH */}
          <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] font-bold tracking-[0.06em] text-[#0f1c2e] uppercase editorial-wordmark">
            ROHITH
          </h2>

          {/* Subtitle / Footer Kicker */}
          <div className="flex items-center gap-2 mt-2 sm:mt-3">
            <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold tracking-[0.28em] text-[#3b526d] uppercase font-sans">
              Learn / Build / Teach / Grow
            </span>
            <span className="w-6 sm:w-10 h-[1.5px] bg-[#3b526d]/60" />
          </div>
        </div>

        {/* Minimal Bottom Editorial Coordinates / Credit */}
        <div className="hidden lg:flex absolute bottom-8 left-12 z-20 items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#64748b]/80 font-medium">
          <span>Edition 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#64748b]/40" />
          <span>Curated Portfolio</span>
        </div>

        <div className="hidden lg:flex absolute bottom-8 right-12 z-20 items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#64748b]/80 font-medium">
          <span>Creative Engineering</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#64748b]/40" />
          <span>Tech Education</span>
        </div>
      </div>
    </main>
  );
};
