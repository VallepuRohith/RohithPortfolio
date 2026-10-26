import React from "react";
import {
  User,
  BarChart3,
  FolderKanban,
  Home,
  Briefcase,
  Award,
  Send,
} from "lucide-react";

export type NavTab =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "certifications"
  | "contact";

interface NavigationDockProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "home", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "contact", label: "Contact", icon: Send },
];

export const NavigationDock: React.FC<NavigationDockProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav
      aria-label="Portfolio primary navigation"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-3 flex justify-center"
    >
      <div className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/60 border border-white/80 backdrop-blur-2xl shadow-[0_14px_40px_rgba(25,50,85,0.1),0_1px_3px_rgba(255,255,255,0.9)_inset] overflow-x-auto max-w-full scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`dock-pill ${isActive ? "active" : ""} shrink-0 cursor-pointer`}
              type="button"
            >
              <Icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                  isActive ? "text-white" : "text-[#47607a]"
                }`}
              />
              <span className="text-xs sm:text-[13px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
