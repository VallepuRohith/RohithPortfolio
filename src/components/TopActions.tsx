import React from "react";
import { FileText } from "lucide-react";

interface TopActionsProps {
  linkedInUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  isDark?: boolean;
}

export const TopActions: React.FC<TopActionsProps> = ({
  linkedInUrl = "https://www.linkedin.com/in/vallepu-rohith",
  githubUrl = "https://github.com/VallepuRohith",
  resumeUrl = "#resume",
  isDark = true,
}) => {

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-40 px-4 sm:px-8 max-w-[1600px] mx-auto flex items-center justify-end pointer-events-none">

      {/* Top Right: LinkedIn, GitHub & Resume */}
      <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">

        {/* LinkedIn Button */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn Profile"
          className="group flex flex-col items-center gap-1 focus:outline-none"
        >
          <div className="action-circle-btn">
            <span className="font-bold text-sm tracking-tight text-[#0f1c2e] group-hover:scale-110 transition-transform">
              in
            </span>
          </div>
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-wider transition-colors ${isDark
            ? "text-white/85 group-hover:text-white drop-shadow-md"
            : "text-[#475569] group-hover:text-[#0f1c2e]"
            }`}>
            LinkedIn
          </span>
        </a>

        {/* GitHub Button */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub Profile"
          className="group flex flex-col items-center gap-1 focus:outline-none"
        >
          <div className="action-circle-btn">
            <svg
              className="w-4 h-4 fill-current text-[#0f1c2e] group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-wider transition-colors ${isDark
            ? "text-white/85 group-hover:text-white drop-shadow-md"
            : "text-[#475569] group-hover:text-[#0f1c2e]"
            }`}>
            Git Hub
          </span>
        </a>

        {/* Resume Button */}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Resume"
          className="group flex flex-col items-center gap-1 focus:outline-none"
        >
          <div className="action-circle-btn">
            <FileText className="w-4 h-4 text-[#0f1c2e] group-hover:scale-110 transition-transform" />
          </div>
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-wider transition-colors ${isDark
            ? "text-white/85 group-hover:text-white drop-shadow-md"
            : "text-[#475569] group-hover:text-[#0f1c2e]"
            }`}>
            Resume
          </span>
        </a>

      </div>
    </header>
  );

};
