import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Clock,
  Calendar,
} from "lucide-react";
import houseImg from "../assets/contact-house.jpg";
import { NavTab } from "./NavigationDock";

interface ContactSectionProps {
  onBackToHome: () => void;
  onNavigate?: (tab: NavTab) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onBackToHome,
  onNavigate,
}) => {
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  // Real-time Date and Time State
  const [currentTime, setCurrentTime] = useState(new Date());

  // Car Animation and Blackout States
  const [isDriving, setIsDriving] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [houseReached, setHouseReached] = useState(false);

  // Car Visibility and Headlights State (Position & Orientation handled directly on DOM ref for 60/120fps)
  const [carState, setCarState] = useState<{
    visible: boolean;
    scale: number;
    headlightsOn: boolean;
  }>({
    visible: false,
    scale: 0,
    headlightsOn: false,
  });

  // DOM Refs for dynamic road anchoring
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const houseImageRef = useRef<HTMLDivElement>(null);
  const addressBlockRef = useRef<HTMLDivElement>(null);
  const phoneBlockRef = useRef<HTMLDivElement>(null);
  const emailBlockRef = useRef<HTMLDivElement>(null);

  // SVG Refs for high-speed calculation & GPU trail rendering
  const hiddenPathRef = useRef<SVGPathElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const carElRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Rotational damping refs for buttery-smooth cornering
  const smoothedAngleRef = useRef<number>(0);
  const isFirstTickRef = useRef<boolean>(true);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Date and Time
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Calculate word count for message (limit 500 words)
  const getWordCount = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const wordCount = getWordCount(message);
  const maxWords = 500;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const words = val.trim() ? val.trim().split(/\s+/) : [];
    if (words.length <= maxWords) {
      setMessage(val);
      if (formErrors.message) {
        setFormErrors((prev) => ({ ...prev, message: undefined }));
      }
    } else {
      // Keep only up to 500 words
      const truncated = words.slice(0, maxWords).join(" ");
      setMessage(truncated);
    }
  };

  // Convert an array of 2D waypoints into a C1/C2 continuous cubic Bezier SVG path
  const catmullRomToBezier = (pts: Array<{ x: number; y: number }>, tension = 0.72) => {
    if (pts.length < 2) return "";
    if (pts.length === 2) {
      return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)}`;
    }
    const p = [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < p.length - 2; i++) {
      const p0 = p[i - 1];
      const p1 = p[i];
      const p2 = p[i + 1];
      const p3 = p[i + 2];

      const cp1x = p1.x + (p2.x - p0.x) * (tension / 3);
      const cp1y = p1.y + (p2.y - p0.y) * (tension / 3);

      const cp2x = p2.x - (p3.x - p1.x) * (tension / 3);
      const cp2y = p2.y - (p3.y - p1.y) * (tension / 3);

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  // Build the redesigned road SVG path matching the user's analyzed hand-drawn curve
  const generatePathString = useCallback(() => {
    if (
      !cardContainerRef.current ||
      !sendButtonRef.current ||
      !houseImageRef.current
    ) {
      return "";
    }

    const containerRect = cardContainerRef.current.getBoundingClientRect();
    const sendRect = sendButtonRef.current.getBoundingClientRect();
    const houseRect = houseImageRef.current.getBoundingClientRect();
    const phoneRect = phoneBlockRef.current?.getBoundingClientRect();
    const emailRect = emailBlockRef.current?.getBoundingClientRect();
    const addressRect = addressBlockRef.current?.getBoundingClientRect();

    // Start point: Departure On-Ramp at Send Button
    const p0 = {
      x: sendRect.left - containerRect.left + sendRect.width * 0.45,
      y: sendRect.top - containerRect.top + sendRect.height * 0.5,
    };

    // End point: Arrival Bay at House Image
    const p6 = {
      x: houseRect.left - containerRect.left + houseRect.width * 0.48,
      y: houseRect.top - containerRect.top + houseRect.height * 0.6,
    };

    // Dynamic Element Coordinates relative to container
    const emailRight = emailRect
      ? emailRect.right - containerRect.left
      : p0.x + 120;
    const emailLeft = emailRect
      ? emailRect.left - containerRect.left
      : p0.x + 20;
    const emailTop = emailRect
      ? emailRect.top - containerRect.top
      : p0.y - 180;
    const emailBottom = emailRect
      ? emailRect.bottom - containerRect.top
      : p0.y - 120;

    const phoneLeft = phoneRect
      ? phoneRect.left - containerRect.left
      : (p6.x + p0.x) * 0.5;
    const phoneRight = phoneRect
      ? phoneRect.right - containerRect.left
      : (p6.x + p0.x) * 0.5 + 80;
    const phoneTop = phoneRect
      ? phoneRect.top - containerRect.top
      : emailTop;
    const phoneBottom = phoneRect
      ? phoneRect.bottom - containerRect.top
      : emailBottom;

    const addressLeft = addressRect
      ? addressRect.left - containerRect.left
      : p6.x - 40;
    const addressRight = addressRect
      ? addressRect.right - containerRect.left
      : p6.x + 120;
    const addressBottom = addressRect
      ? addressRect.bottom - containerRect.top
      : emailBottom;

    // Detect if layout is vertically stacked (e.g. mobile viewports)
    const isStacked =
      emailRect &&
      phoneRect &&
      emailRect.top > phoneRect.bottom + 5;

    if (isStacked) {
      const mobileWaypoints = [
        p0,
        { x: p0.x + 40, y: p0.y - (p0.y - emailBottom) * 0.3 },
        { x: (p0.x + p6.x) / 2 + 50, y: (p0.y + p6.y) * 0.65 },
        { x: (p0.x + p6.x) / 2 - 40, y: (p0.y + p6.y) * 0.4 },
        { x: p6.x - 25, y: p6.y + 50 },
        p6,
      ];
      return catmullRomToBezier(mobileWaypoints, 0.7);
    }

    // Desktop 3-column Layout (Mathematically fitted to user's analyzed drawing):
    // 1. P1: Curves rightwards leaving Send button, heading past outer right of Email
    const p1 = {
      x: Math.max(p0.x + 75, emailRight - 15),
      y: p0.y - (p0.y - emailBottom) * 0.35 + 8,
    };

    // 2. P2: Loops up along the outer right flank of the Email card
    const p2 = {
      x: emailRight + 45,
      y: emailTop + (emailBottom - emailTop) * 0.4,
    };

    // 3. P3: High crest arching smoothly above Email and Phone
    const p3 = {
      x: (emailLeft + phoneRight) / 2 + 10,
      y: Math.min(emailTop, phoneTop) - 45,
    };

    // 4. P4: Smooth diagonal chute passing through the open gap between Phone and Address
    const p4 = {
      x: (phoneLeft + addressRight) / 2,
      y: (phoneTop + phoneBottom) / 2 + 12,
    };

    // 5. P5: Smooth trough dipping under the Address card
    const p5 = {
      x: (addressLeft + addressRight) / 2 + 20,
      y: addressBottom + 40,
    };

    const waypoints = [p0, p1, p2, p3, p4, p5, p6];
    return catmullRomToBezier(waypoints, 0.72);
  }, []);

  // Trigger Send Button and initiate Car Travel
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDriving || isBlackout) return;

    // Validate inputs
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errors.name = "Please enter your name";
    if (!email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!message.trim()) errors.message = "Please write a message";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    startCarJourney();
  };

  // Prefill demo data for immediate testing
  const handleQuickPrefill = () => {
    setName("Alex Mercer");
    setEmail("alex.mercer@visiontech.io");
    setMessage(
      "Hi Rohith, I reviewed your impressive portfolio and would love to discuss a high-impact engineering collaboration in Hyderabad. Looking forward to connecting!"
    );
    setFormErrors({});
  };

  // Execute the car journey animation with rotational damping & GPU acceleration
  const startCarJourney = () => {
    if (
      !cardContainerRef.current ||
      !sendButtonRef.current ||
      !houseImageRef.current
    )
      return;

    const pathEl = hiddenPathRef.current;
    if (!pathEl) return;

    const totalLength = pathEl.getTotalLength();
    if (!totalLength) return;

    setIsDriving(true);
    setHouseReached(false);

    // Compute initial departure angle at start point
    const sampleWindow = 14;
    const startPt = pathEl.getPointAtLength(0);
    const nextPt = pathEl.getPointAtLength(
      Math.min(totalLength, sampleWindow * 2)
    );
    const initialAngle =
      (Math.atan2(nextPt.y - startPt.y, nextPt.x - startPt.x) * 180) / Math.PI;

    smoothedAngleRef.current = initialAngle;
    isFirstTickRef.current = true;

    // Reset trail
    if (trailPathRef.current) {
      trailPathRef.current.style.strokeDasharray = `0 ${totalLength}`;
      trailPathRef.current.style.strokeDashoffset = "0";
    }

    // Step 1: Car pops up at Send button facing initial road departure heading
    setCarState({
      visible: true,
      scale: 0,
      headlightsOn: true,
    });

    if (carElRef.current) {
      carElRef.current.style.transform = `translate3d(${startPt.x}px, ${startPt.y}px, 0) translate(-50%, -50%) rotate(${initialAngle + 90}deg) scale(0)`;
    }

    // Pop scale animation: 0 -> 1 over 200ms
    setTimeout(() => {
      setCarState((prev) => ({ ...prev, scale: 1 }));
      if (carElRef.current) {
        carElRef.current.style.transform = `translate3d(${startPt.x}px, ${startPt.y}px, 0) translate(-50%, -50%) rotate(${initialAngle + 90}deg) scale(1)`;
      }
    }, 40);

    // After car pops in, start driving along path
    setTimeout(() => {
      const durationMs = 4800; // 4.8 seconds smooth driving
      let startTime: number | null = null;

      const driveStep = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / durationMs);

        // Quintic smoothstep easing for zero acceleration jerk:
        const eased =
          6 * Math.pow(progress, 5) -
          15 * Math.pow(progress, 4) +
          10 * Math.pow(progress, 3);

        const currentDist = eased * totalLength;
        const point = pathEl.getPointAtLength(currentDist);

        // Anti-jitter tangent window across vehicle wheelbase
        const prev = pathEl.getPointAtLength(
          Math.max(0, currentDist - sampleWindow)
        );
        const next = pathEl.getPointAtLength(
          Math.min(totalLength, currentDist + sampleWindow)
        );
        const targetDeg =
          (Math.atan2(next.y - prev.y, next.x - prev.x) * 180) / Math.PI;

        // Shortest arc angle difference
        let angleDiff = targetDeg - smoothedAngleRef.current;
        while (angleDiff > 180) angleDiff -= 360;
        while (angleDiff < -180) angleDiff += 360;

        if (isFirstTickRef.current) {
          smoothedAngleRef.current = targetDeg;
          isFirstTickRef.current = false;
        } else {
          // Rotational follow damping factor: 0.32 gives silky smooth realistic vehicle steering
          smoothedAngleRef.current += angleDiff * 0.32;
        }

        // Direct GPU-accelerated transform update (Zero React rerender overhead during drive loop)
        if (carElRef.current) {
          carElRef.current.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) rotate(${smoothedAngleRef.current + 90}deg) scale(1)`;
        }

        // Dynamic glowing taillight trail streak along the road
        if (trailPathRef.current) {
          const trailLength = 190;
          const trailStart = Math.max(0, currentDist - trailLength);
          const segmentLen = currentDist - trailStart;
          trailPathRef.current.style.strokeDasharray = `${segmentLen} ${totalLength}`;
          trailPathRef.current.style.strokeDashoffset = `${-trailStart}`;
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(driveStep);
        } else {
          // Destination reached: HQ House!
          setHouseReached(true);
          setTimeout(() => {
            triggerBlackoutSuccess();
          }, 350);
        }
      };

      animationFrameRef.current = requestAnimationFrame(driveStep);
    }, 250);
  };

  // Blackout success screen with gold text for 3 seconds
  const triggerBlackoutSuccess = () => {
    setIsBlackout(true);

    setTimeout(() => {
      finishBlackout();
    }, 3000);
  };

  // Finish blackout and return to normal state
  const finishBlackout = () => {
    setIsBlackout(false);
    setIsDriving(false);
    setHouseReached(false);
    setCarState({ visible: false, scale: 0, headlightsOn: false });
    if (trailPathRef.current) {
      trailPathRef.current.style.strokeDasharray = "0 99999";
    }

    // Clear form inputs
    setName("");
    setEmail("");
    setMessage("");
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Compute SVG Path d string
  const [pathData, setPathData] = useState("");
  useEffect(() => {
    const updatePath = () => {
      const p = generatePathString();
      setPathData(p);
    };
    updatePath();
    const timer = setTimeout(updatePath, 150);
    window.addEventListener("resize", updatePath);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePath);
    };
  }, [generatePathString]);

  return (
    <div
      ref={cardContainerRef}
      className="relative w-full h-screen max-h-screen overflow-hidden bg-[#090a0d] text-white flex flex-col justify-between items-center select-none pt-4 sm:pt-6 pb-20 sm:pb-24 px-4 sm:px-8 lg:px-12"
    >
      {/* =========================================================================
          MAP BACKGROUND LAYER (Faint Dark Vector Urban Map as per reference)
      ========================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* SVG Vector Map: Roads, Streets, Blocks & Hyderabad Nanakramguda Map Beacon */}
        <svg
          className="w-full h-full object-cover opacity-30"
          viewBox="0 0 1600 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Dark City Grid Pattern */}
          <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="39" height="39" fill="#0d0f14" stroke="#161820" strokeWidth="0.8" />
          </pattern>
          <rect width="1600" height="900" fill="url(#cityGrid)" />

          {/* City Blocks / Building Footprints */}
          <g opacity="0.65">
            <rect x="820" y="80" width="160" height="120" rx="6" fill="#141720" stroke="#222634" strokeWidth="1" />
            <rect x="1010" y="60" width="200" height="140" rx="8" fill="#12151e" stroke="#202430" strokeWidth="1" />
            <rect x="1240" y="110" width="140" height="180" rx="6" fill="#131620" stroke="#222634" strokeWidth="1" />
            <rect x="900" y="340" width="210" height="150" rx="8" fill="#12151e" stroke="#1f232f" strokeWidth="1" />
            <rect x="1140" y="320" width="180" height="190" rx="6" fill="#141722" stroke="#232736" strokeWidth="1" />
            <rect x="800" y="560" width="200" height="160" rx="8" fill="#11141c" stroke="#1e222d" strokeWidth="1" />
            <rect x="1030" y="570" width="240" height="140" rx="6" fill="#13151f" stroke="#212532" strokeWidth="1" />
          </g>

          {/* Urban Secondary Streets */}
          <g stroke="#262b3a" strokeWidth="3" strokeLinecap="round" opacity="0.85">
            <path d="M 650,0 L 780,900" />
            <path d="M 780,0 L 960,900" />
            <path d="M 500,300 L 1600,240" />
            <path d="M 550,560 L 1600,520" />
            <path d="M 950,100 L 1450,700" />
            <path d="M 800,850 L 1550,100" />
          </g>

          {/* Major Arterial Boulevard / Curved Avenue matching reference road ("Каланчевская ул." / Nanakramguda Rd) */}
          <g>
            <path
              d="M 1400,-50 C 1220,220 1050,420 900,570 C 780,680 700,770 560,950"
              stroke="#3d4456"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 1400,-50 C 1220,220 1050,420 900,570 C 780,680 700,770 560,950"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="12 8"
              fill="none"
              opacity="0.8"
            />

            {/* Connecting diagonal road */}
            <path
              d="M 720,240 C 920,310 1120,420 1520,550"
              stroke="#303646"
              strokeWidth="14"
              fill="none"
            />
            <path
              d="M 720,240 C 920,310 1120,420 1520,550"
              stroke="#546078"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              fill="none"
              opacity="0.6"
            />
          </g>

          {/* Stylized Street Names at subtle angles matching reference */}
          <g fill="#5a657c" fontSize="11" fontFamily="sans-serif" letterSpacing="0.08em" fontWeight="600">
            <text x="960" y="470" transform="rotate(48 960 470)" opacity="0.8">
              Nanakramguda Rd / Каланчевская
            </text>
            <text x="1160" y="410" transform="rotate(16 1160 410)" opacity="0.65">
              Financial District Ave
            </text>
            <text x="800" y="260" transform="rotate(-15 800 260)" opacity="0.6">
              Outer Ring Rd (ORR)
            </text>
            <text x="1200" y="170" opacity="0.5">
              WaveRock Tech Campus
            </text>
            <text x="920" y="700" transform="rotate(-25 920 700)" opacity="0.5">
              Knowledge City Way
            </text>
          </g>

          {/* Glowing Map Pin & Coordinates for Hyderabad Nanakramguda */}
          <g transform="translate(1080, 420)">
            {/* Pulsing Concentric Rings */}
            <circle r="24" fill="#ef4444" fillOpacity="0.12">
              <animate attributeName="r" values="8;30;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="fillOpacity" values="0.25;0.03;0.25" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle r="12" fill="#ef4444" fillOpacity="0.25" />
            <circle r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />

            {/* Pin label */}
            <rect x="14" y="-12" width="144" height="22" rx="4" fill="#0d0f14" stroke="#2b3140" strokeWidth="1" />
            <text x="24" y="3" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace" fontWeight="600">
              17.4399° N, 78.3489° E
            </text>
          </g>
        </svg>

        {/* Gradient Overlays: Ensure crisp text readability while displaying atmospheric map */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0d] via-[#090a0d]/90 to-transparent w-full md:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-[#090a0d]/50" />
      </div>

      {/* =========================================================================
          TOP ROW: TIME & DATE ON THE TOP LEFT (User Requirement) & BACK TO HOME
      ========================================================================== */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between">
        {/* TOP LEFT: LIVE TIME & DATE (Replaced Rohith Vallepu name as requested) */}
        <div className="flex items-center gap-2 sm:gap-3 bg-zinc-900/80 border border-zinc-800/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl backdrop-blur-md shadow-inner">
          <div className="flex items-center gap-2 text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white">
              {formattedTime.split(":").slice(0, 2).join(":")}
            </span>
          </div>
          <div className="h-3 w-[1px] bg-zinc-700 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{formattedDate}</span>
          </div>
          <span className="text-[10px] font-mono text-red-400/90 font-bold px-1.5 py-0.5 rounded bg-red-950/40 border border-red-900/50 hidden md:inline">
            IST • UTC+5:30
          </span>
        </div>

        {/* TOP RIGHT: BACK TO HOME BUTTON */}
        {/* <button
          onClick={onBackToHome}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button> */}
      </div>

      {/* =========================================================================
          MAIN CONTACT BODY (Fitting viewport cleanly without vertical scrolling)
      ========================================================================== */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center gap-6 sm:gap-8 my-auto">
        {/* 1. Header: Subtitle, "Contacts" Title & House Image Beside It */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-mono">
            <span className="w-1.5 h-3.5 bg-red-600 rounded-sm" />
            <span>How to contact us</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 mt-0.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-editorial">
              Contacts
            </h1>

            {/* House Image Destination beside "Contacts" (User Requirement) */}
            <div
              ref={houseImageRef}
              id="contact-house-destination"
              className="relative group cursor-pointer"
              title="Destination Estate: Hyderabad, Nanakramguda"
            >
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border transition-all duration-500 ${houseReached
                  ? "border-amber-400 scale-110 shadow-[0_0_40px_rgba(251,191,36,0.6)] ring-4 ring-amber-400/30"
                  : "border-zinc-700/80 shadow-[0_10px_25px_rgba(0,0,0,0.6)] group-hover:border-zinc-500 group-hover:scale-105"
                  }`}
              >
                <img
                  src={houseImg}
                  alt="Destination Residence - Hyderabad Nanakramguda"
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* House Status Pill */}
                <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-zinc-700/60 text-[8.5px] font-mono text-zinc-300">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${houseReached ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"
                        }`}
                    />
                    <span>HQ</span>
                  </span>
                  <span className="text-zinc-400 font-sans">HYD</span>
                </div>
              </div>

              {/* Arrival flare effect */}
              {houseReached && (
                <div className="absolute -inset-2 rounded-3xl bg-amber-400/20 blur-md pointer-events-none animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* 2. Contact Details: Address, Phone, E-mail */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-2 border-y border-zinc-800/80">
          {/* Address */}
          <div ref={addressBlockRef} className="flex items-start gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 shrink-0 group-hover:border-red-500/50 transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10.5px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                Address
              </span>
              <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                Hyderabad
              </span>
              <span className="text-[10.5px] text-zinc-500">
                Telangana, India • 500032
              </span>
            </div>
          </div>

          {/* Phone */}
          <div ref={phoneBlockRef} className="flex items-start gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0 group-hover:text-red-500 group-hover:border-red-500/50 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10.5px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                Phone
              </span>
              <a
                href="tel:9999999999"
                className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-red-400 transition-colors font-mono tracking-tight"
              >
                6302934902
              </a>
              <span className="text-[10.5px] text-zinc-500">
                WhatsApp
              </span>
            </div>
          </div>

          {/* E-mail */}
          <div ref={emailBlockRef} className="flex items-start gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0 group-hover:text-red-500 group-hover:border-red-500/50 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10.5px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                E-mail
              </span>
              <a
                href="mailto:contact@gmail.com"
                className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-red-400 transition-colors font-mono tracking-tight"
              >
                vallepurohith76@gmail.com
              </a>
              <span className="text-[10.5px] text-zinc-500">
                Official Inquiries
              </span>
            </div>
          </div>
        </div>

        {/* 3. "Get in touch" Form with 3 fields stacked & Send button beside */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-mono">
              <span className="w-1.5 h-3.5 bg-red-600 rounded-sm" />
              <span>Get in touch</span>
            </div>

            {/* Quick prefill demo button */}
            <button
              type="button"
              onClick={handleQuickPrefill}
              className="text-[11px] text-zinc-500 hover:text-amber-400 transition-colors font-mono flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Fill Demo</span>
            </button>
          </div>

          {/* Form Layout: 3 Stacked inputs on left, Send button beside (right) */}
          <form
            onSubmit={handleSendMessage}
            className="flex flex-col md:flex-row items-stretch md:items-end gap-5 lg:gap-8"
          >
            {/* Three stacked inputs: Name, Email, Message */}
            <div className="flex-1 flex flex-col gap-3.5 max-w-xl">
              {/* Field 1: Name */}
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (formErrors.name) {
                      setFormErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  placeholder="Enter your name"
                  disabled={isDriving}
                  className="w-full bg-zinc-900/60 border-b border-zinc-700/80 hover:border-zinc-500 focus:border-red-500 px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors rounded-t-md"
                />
                {formErrors.name && (
                  <span className="text-[10.5px] text-red-400 mt-1 block">
                    {formErrors.name}
                  </span>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email) {
                      setFormErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  placeholder="Enter your email"
                  disabled={isDriving}
                  className="w-full bg-zinc-900/60 border-b border-zinc-700/80 hover:border-zinc-500 focus:border-red-500 px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors rounded-t-md"
                />
                {formErrors.email && (
                  <span className="text-[10.5px] text-red-400 mt-1 block">
                    {formErrors.email}
                  </span>
                )}
              </div>

              {/* Field 3: Message with 500 words limit */}
              <div className="relative">
                <textarea
                  rows={2}
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Enter your message..."
                  disabled={isDriving}
                  className="w-full bg-zinc-900/60 border-b border-zinc-700/80 hover:border-zinc-500 focus:border-red-500 px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors resize-none rounded-t-md"
                />
                <div className="flex items-center justify-between mt-1 text-[10.5px] font-mono">
                  {formErrors.message ? (
                    <span className="text-red-400">{formErrors.message}</span>
                  ) : (
                    <span className="text-zinc-500">Max limit: 500 words</span>
                  )}
                  <span
                    className={`${wordCount >= 480 ? "text-amber-400 font-bold" : "text-zinc-500"
                      }`}
                  >
                    {wordCount} / {maxWords} words
                  </span>
                </div>
              </div>
            </div>

            {/* BESIDE OF IT: SEND BUTTON (Anchor for car popup) */}
            <div className="shrink-0 flex items-center md:items-end pb-1">
              <button
                ref={sendButtonRef}
                type="submit"
                disabled={isDriving}
                id="contact-send-button"
                className={`group relative flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border transition-all duration-300 shadow-lg cursor-pointer ${isDriving
                  ? "opacity-30 pointer-events-none border-zinc-800"
                  : "border-zinc-700 hover:border-red-500/70 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                  }`}
              >
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-200 group-hover:text-white transition-colors">
                  Send
                </span>

                {/* Circular icon with red dot / send arrow */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 group-hover:bg-red-600 border border-zinc-700 group-hover:border-red-500 flex items-center justify-center text-zinc-300 group-hover:text-white transition-all transform group-hover:translate-x-0.5">
                  <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>

                {/* Small red accent dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =========================================================================
          INVISIBLE PATH & DYNAMIC VEHICLE OVERLAY
      ========================================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Subtle Dynamic Taillight Trail Gradient (active only while car drives) */}
          <linearGradient id="laserTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
          </linearGradient>

          <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Taillight Streak (Appears strictly behind car during travel) */}
        <path
          ref={trailPathRef}
          d={pathData}
          fill="none"
          stroke="url(#laserTrailGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0 99999"
          opacity={isDriving ? 0.9 : 0}
          filter="url(#trailGlow)"
        />

        {/* Completely Invisible Path for length & smooth tangent calculations */}
        <path
          ref={hiddenPathRef}
          d={pathData}
          fill="none"
          stroke="transparent"
          strokeWidth="1"
        />
      </svg>

      {/* TOP-DOWN SPORTS CAR (POPS UP AT SEND BUTTON & TRAVELS SMOOTHLY TO HOUSE) */}
      {carState.visible && (
        <div
          ref={carElRef}
          className="absolute pointer-events-none z-40"
          style={{
            left: 0,
            top: 0,
            willChange: "transform",
            transformOrigin: "center center",
          }}
        >
          {/* Sports Car Render in SVG */}
          <div className="relative w-8 h-14 sm:w-9 sm:h-16 flex items-center justify-center">
            {/* Twin Headlight Light Cones casting forward light on dark surface */}
            {carState.headlightsOn && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  width: "140px",
                  height: "170px",
                  background:
                    "radial-gradient(ellipse at 50% 100%, rgba(255, 255, 230, 0.55) 0%, rgba(251, 191, 36, 0.22) 42%, transparent 75%)",
                  clipPath: "polygon(40% 100%, 60% 100%, 96% 0%, 4% 0%)",
                  transformOrigin: "bottom center",
                }}
              />
            )}

            {/* Vector Sports Car Top-Down Body */}
            <svg
              viewBox="0 0 36 64"
              className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            >
              <defs>
                <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="30%" stopColor="#334155" />
                  <stop offset="50%" stopColor="#475569" />
                  <stop offset="70%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>

                <linearGradient id="windshieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* 4 Wheels at Corners */}
              <rect x="1" y="8" width="4.5" height="12" rx="2" fill="#090a0f" stroke="#334155" strokeWidth="0.5" />
              <rect x="30.5" y="8" width="4.5" height="12" rx="2" fill="#090a0f" stroke="#334155" strokeWidth="0.5" />
              <rect x="1" y="44" width="4.5" height="12" rx="2" fill="#090a0f" stroke="#334155" strokeWidth="0.5" />
              <rect x="30.5" y="44" width="4.5" height="12" rx="2" fill="#090a0f" stroke="#334155" strokeWidth="0.5" />

              {/* Aerodynamic Sports Car Chassis */}
              <path
                d="M 6,10 C 6,4 12,2 18,2 C 24,2 30,4 30,10 L 31,48 C 31,56 26,60 18,60 C 10,60 5,56 5,48 Z"
                fill="url(#carBodyGrad)"
                stroke="#94a3b8"
                strokeWidth="0.8"
              />

              {/* Front Hood Scoop Lines */}
              <path d="M 12,6 L 14,16 M 24,6 L 22,16" stroke="#1e293b" strokeWidth="0.75" />

              {/* Front Windshield */}
              <path
                d="M 8,18 C 11,16 25,16 28,18 L 26,29 C 23,30 13,30 10,29 Z"
                fill="url(#windshieldGrad)"
                stroke="#38bdf8"
                strokeWidth="0.5"
              />

              {/* Roofline */}
              <rect x="10" y="30" width="16" height="13" rx="2" fill="#1e293b" />

              {/* Rear Window */}
              <path
                d="M 10,44 C 13,43 23,43 26,44 L 25,50 C 22,51 14,51 11,50 Z"
                fill="#0f172a"
                stroke="#475569"
                strokeWidth="0.5"
              />

              {/* Rear Spoiler */}
              <rect x="6" y="55" width="24" height="2.5" rx="1" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" />

              {/* Front LED Headlights */}
              <circle cx="8.5" cy="4" r="2.2" fill="#fef08a" />
              <circle cx="27.5" cy="4" r="2.2" fill="#fef08a" />
              <circle cx="8.5" cy="4" r="4" fill="#fef08a" fillOpacity="0.4" />
              <circle cx="27.5" cy="4" r="4" fill="#fef08a" fillOpacity="0.4" />

              {/* Rear LED Taillights */}
              <rect x="7" y="58" width="5" height="1.8" rx="0.8" fill="#ef4444" />
              <rect x="24" y="58" width="5" height="1.8" rx="0.8" fill="#ef4444" />
            </svg>
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL-SCREEN BLACKOUT OVERLAY WITH "Message has sent" IN GOLD COLOR
          (Lasts 3 seconds without timer display as requested)
      ========================================================================== */}
      {isBlackout && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#030304] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 select-none"
        >
          {/* Subtle Golden Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[130px]" />
          </div>

          <div className="relative z-10 max-w-xl flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500">
            {/* Elegant Golden Emblem */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#f5d061]/50 bg-gradient-to-b from-[#2a220e] to-[#0d0a04] flex items-center justify-center shadow-[0_0_50px_rgba(245,208,97,0.35)]">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#f5d061] drop-shadow-[0_0_12px_rgba(245,208,97,0.7)]" />
              </div>
              <Sparkles className="w-6 h-6 text-[#ffd700] absolute -top-1 -right-1 animate-bounce" />
            </div>

            {/* Main Title: "Message has sent" in Gold Color (User Requirement) */}
            <div className="flex flex-col gap-2">
              <h2
                className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#ffd700] via-[#fff4b8] to-[#c5a028] drop-shadow-[0_2px_20px_rgba(255,215,0,0.5)]"
                style={{
                  textShadow: "0 0 30px rgba(212,175,55,0.45)",
                }}
              >
                Message has sent
              </h2>

              <p className="font-editorial-body text-base sm:text-lg text-amber-200/80 max-w-md mx-auto leading-relaxed italic">
                Your dispatch has safely arrived at Hyderabad, Nanakramguda.
                Rohith will review and get in touch with you promptly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSection;
