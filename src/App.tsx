import React, { useState, useEffect } from "react";
import { NavigationDock, NavTab } from "./components/NavigationDock";
import { TopActions } from "./components/TopActions";
import { HeroHome } from "./components/HeroHome";
import { SectionView } from "./components/SectionView";

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");

  // Sync hash if user navigates via browser or direct link
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as NavTab;
      const validTabs: NavTab[] = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "certifications",
        "contact",
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.location.hash = tab === "home" ? "" : tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`relative min-h-screen w-full ${
        activeTab === "skills"
          ? "sunset-screen-bg"
          : activeTab === "projects"
          ? "h-screen max-h-screen overflow-hidden bg-slate-950"
          : activeTab === "certifications"
          ? "h-screen max-h-screen overflow-hidden certificates-screen-bg text-white"
          : activeTab === "contact"
          ? "h-screen max-h-screen overflow-hidden bg-[#0a0b0e] text-white"
          : "sky-ambient-bg"
      } text-[#0f1c2e] overflow-x-hidden selection:bg-[#FFE3B3] selection:text-[#EA6113]`}
    >
      {/* Top action buttons: LinkedIn, GitHub, Resume */}
      <TopActions
        linkedInUrl="https://www.linkedin.com/in/vallepu-rohith"
        githubUrl="https://github.com/VallepuRohith"
        resumeUrl="/resume.pdf"
        isDark={
          activeTab === "projects" ||
          activeTab === "certifications" ||
          activeTab === "contact"
        }
      />

      {/* Main View Area: Home Hero or Section Screen */}
      {activeTab === "home" ? (
        <HeroHome />
      ) : (
        <SectionView
          tab={activeTab}
          onBackToHome={() => handleTabChange("home")}
          onNavigate={handleTabChange}
        />
      )}

      {/* Floating Bottom Navigation Dock */}
      <NavigationDock
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}

export default App;
