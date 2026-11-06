import React from "react";
import {
  Home,
  BarChart3,
  FolderKanban,
  Briefcase,
  Award,
  Send,
} from "lucide-react";

export type NavTab =
  | "skills"
  | "projects"
  | "home"
  | "experience"
  | "certifications"
  | "contact";

interface NavigationDockProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

interface NavItemConfig {
  id: NavTab;
  label: string;
  icon: React.ElementType;
  sag: number;        // Parabolic vertical sag offset (px)
  angle: number;      // Natural hanging tilt along thread curve (deg)
  dur: string;        // Sway animation period
  delay: string;      // Sway animation offset phase
}

// 6 Hanging sections arranged according to user specification:
// skills, projects, home, experience, certifications, contact
const navItems: NavItemConfig[] = [
  {
    id: "skills",
    label: "Skills",
    icon: BarChart3,
    sag: 2,
    angle: 6.0,
    dur: "3.6s",
    delay: "-2.1s",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    sag: 10,
    angle: 3.6,
    dur: "4.5s",
    delay: "-0.9s",
  },
  {
    id: "home",
    label: "Home",
    icon: Home,
    sag: 16,
    angle: 1.2,
    dur: "3.8s",
    delay: "-0.5s",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    sag: 16,
    angle: -1.2,
    dur: "3.9s",
    delay: "-1.6s",
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    sag: 10,
    angle: -3.6,
    dur: "4.1s",
    delay: "-2.4s",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Send,
    sag: 2,
    angle: -6.0,
    dur: "3.7s",
    delay: "-0.2s",
  },
];

export const NavigationDock: React.FC<NavigationDockProps> = ({
  activeTab,
  onTabChange,
}) => {
  const isDark =
    activeTab === "projects" ||
    activeTab === "certifications" ||
    activeTab === "experience" ||
    activeTab === "contact";

  return (
    <nav
      aria-label="Portfolio hanging navigation"
      className="fixed top-0 inset-x-0 z-50 pointer-events-none flex flex-col items-center select-none"
    >
      {/* =========================================================================
          THE HANGING THREAD / WIRE (Centered & Anchored with Mounting Pins)
      ========================================================================== */}
      <div className="relative w-full max-w-4xl sm:max-w-5xl mx-auto h-[60px] pointer-events-none px-4">
        <svg
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Subtle thread shadow */}
          <path
            d="M 12,12 Q 500,28 988,12"
            fill="none"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="2.5"
            transform="translate(0, 1.5)"
            vectorEffect="non-scaling-stroke"
          />

          {/* Main hanging wire */}
          <path
            d="M 12,11 Q 500,27 988,11"
            fill="none"
            stroke={isDark ? "#94a3b8" : "#64748b"}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity={isDark ? 0.75 : 0.65}
            vectorEffect="non-scaling-stroke"
          />

          {/* Left metallic wall eyelet / pin */}
          <circle
            cx="12"
            cy="11"
            r="4"
            fill={isDark ? "#334155" : "#475569"}
            stroke={isDark ? "#0f172a" : "#1e293b"}
            strokeWidth="1.5"
          />
          <circle cx="12" cy="11" r="1.5" fill="#f8fafc" />

          {/* Right metallic wall eyelet / pin */}
          <circle
            cx="988"
            cy="11"
            r="4"
            fill={isDark ? "#334155" : "#475569"}
            stroke={isDark ? "#0f172a" : "#1e293b"}
            strokeWidth="1.5"
          />
          <circle cx="988" cy="11" r="1.5" fill="#f8fafc" />
        </svg>
      </div>

      {/* =========================================================================
          HANGING CARDS TRACK (With Green Clips & Gentle Pendulum Swaying)
      ========================================================================== */}
      <div className="absolute top-0 pointer-events-auto w-full max-w-4xl sm:max-w-5xl mx-auto px-4 pt-1 flex justify-center items-start gap-1 sm:gap-1.5 md:gap-2.5 overflow-x-auto scrollbar-none pb-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              className="hanging-nav-item flex flex-col items-center group cursor-pointer shrink-0"
              style={
                {
                  "--y-sag": `${item.sag}px`,
                  "--base-angle": `${item.angle}deg`,
                  "--sway-dur": item.dur,
                  "--sway-delay": item.delay,
                } as React.CSSProperties
              }
              onClick={() => onTabChange(item.id)}
            >
              {/* -------------------------------------------------------------
                  GREEN CLIP / CLOTHESPIN CLAMP (Matching Reference Image)
              -------------------------------------------------------------- */}
              <div
                className={`relative z-20 flex flex-col items-center justify-start -mb-2 transition-all duration-300 ${
                  isActive ? "scale-105" : "group-hover:scale-105"
                }`}
              >
                <div
                  className={`w-3.5 sm:w-4 h-5 sm:h-5.5 rounded-t-md rounded-b-[2px] flex flex-col items-center pt-0.5 shadow-sm transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-b from-emerald-400 via-emerald-500 to-green-600 shadow-[0_0_10px_rgba(16,185,129,0.7)] border border-emerald-300/80"
                      : "bg-gradient-to-b from-emerald-500 via-emerald-600 to-green-700 border border-emerald-400/40 shadow-sm"
                  }`}
                >
                  {/* Round white hole through which the thread passes */}
                  <div className="w-1.5 h-1.5 rounded-full bg-white/95 shadow-inner border border-black/20" />
                  {/* Clip center tension spring groove */}
                  <div className="w-2 h-[1.5px] bg-emerald-800/80 rounded-full mt-1" />
                </div>
              </div>

              {/* -------------------------------------------------------------
                  HANGING NAVIGATION BUTTON CARD
              -------------------------------------------------------------- */}
              <button
                type="button"
                className={`relative z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 pt-2.5 sm:pt-3 rounded-xl sm:rounded-2xl font-medium text-[11px] sm:text-xs tracking-wide transition-all duration-300 whitespace-nowrap shadow-md cursor-pointer ${
                  isActive
                    ? isDark
                      ? "bg-white text-zinc-950 font-semibold shadow-[0_10px_24px_rgba(255,255,255,0.25)] border border-white"
                      : "bg-[#0f1c2e] text-white font-semibold shadow-[0_10px_24px_rgba(15,28,46,0.3)] border border-[#0f1c2e]"
                    : isDark
                    ? "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/70 backdrop-blur-xl shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
                    : "bg-white/85 hover:bg-white text-[#1e334d] hover:text-[#0f1c2e] border border-white/90 backdrop-blur-xl shadow-[0_6px_16px_rgba(25,50,85,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)]"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${
                    isActive
                      ? isDark
                        ? "text-zinc-950"
                        : "text-emerald-400"
                      : isDark
                      ? "text-zinc-400 group-hover:text-white"
                      : "text-[#47607a] group-hover:text-[#0f1c2e]"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationDock;
