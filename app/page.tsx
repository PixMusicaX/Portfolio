"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Code2, Music4 } from "lucide-react";

import { DevBackground, MusicBackground } from "@/components/Backgrounds";
import { GaseousDivider } from '@/components/GaseousDivider';
import { useAudio } from "@/components/AudioProvider";

export default function Home() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [tappedSide, setTappedSide] = useState<"left" | "right" | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);
  const minSwipeDistance = 50;
  const isNavigatingRef = useRef(false);

  const [isLocked, setIsLocked] = useState(true);

  const { setAudioState, hasEntered } = useAudio();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Increased threshold for tablets/landscape
      setIsLandscape(window.innerWidth > window.innerHeight && window.innerWidth < 1280);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const mql = window.matchMedia("(orientation: landscape)");
    const handleOrientation = (e: MediaQueryListEvent) => {
      checkMobile();
    };
    mql.addEventListener("change", handleOrientation);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mql.removeEventListener("change", handleOrientation);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLocked(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedSide) return;
    if (hoveredSide === "left") {
      setAudioState("hover-dark");
    } else if (hoveredSide === "right") {
      setAudioState("hover-light");
    } else {
      setAudioState("initial");
    }
  }, [hoveredSide, selectedSide, setAudioState]);

  // Desktop mouse tracking (unchanged)
  useEffect(() => {
    if (isMobile) return;
    if (selectedSide) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking && hasEntered && !isLocked) {
        requestAnimationFrame(() => {
          const w = window.innerWidth;
          const x = e.clientX;
          let nextState: "left" | "right" | null = null;
          if (x < w * 0.35) nextState = "left";
          else if (x > w * 0.65) nextState = "right";
          setHoveredSide((prev) => prev !== nextState ? nextState : prev);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => setHoveredSide(null);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasEntered, isLocked, selectedSide, isMobile]);

  // Mobile: first tap = hover state, second tap = navigate
  const handleMobileTap = (side: "left" | "right", path: string) => {
    if (selectedSide) return;

    if (tappedSide === side) {
      // Second tap — navigate
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      
      setSelectedSide(side);
      setHoveredSide(side);
      setTimeout(() => router.push(path), 700);
    } else {
      // First tap — trigger hover state
      setTappedSide(side);
      setHoveredSide(side);
    }
  };

  // Desktop click (unchanged)
  const handleNavigate = (e: React.MouseEvent, side: "left" | "right", path: string) => {
    if (isMobile && !isLandscape) return;
    const w = window.innerWidth;
    const x = e.clientX;
    if (side === "left" && x > w * 0.35) return;
    if (side === "right" && x < w * 0.65) return;
    
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    setSelectedSide(side);
    setTimeout(() => router.push(path), 700);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndY(null);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStartY || !touchEndY) return;
    const distance = touchStartY - touchEndY;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) {
      // Swipe UP -> Select/Explore Music (Bottom)
      if (hoveredSide === "right") {
        // SECOND SWIPE -> Navigate
        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;
        setSelectedSide("right");
        setTimeout(() => router.push("/music"), 700);
      } else {
        setHoveredSide("right");
        setTappedSide("right");
      }
    } else if (isDownSwipe) {
      // Swipe DOWN -> Select/Explore Developer (Top)
      if (hoveredSide === "left") {
        // SECOND SWIPE -> Navigate
        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;
        setSelectedSide("left");
        setTimeout(() => router.push("/dev"), 700);
      } else {
        setHoveredSide("left");
        setTappedSide("left");
      }
    }
  };

// --- MOBILE LAYOUT (Portrait) ---
  if ((isMobile && !isLandscape)) {
    return (
      <div 
        className="relative flex flex-col h-[100dvh] w-full overflow-hidden bg-black font-[family-name:var(--font-inter)]"
        style={{ overscrollBehaviorY: 'contain' }} // Prevent pull-to-refresh
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >

        {/* Top: Developer */}
        <motion.div
          className="relative z-10 w-full flex flex-col justify-center items-center cursor-pointer overflow-visible"
          animate={{
            width: "100%",
            height: selectedSide === "left" ? "100dvh" : selectedSide === "right" ? "0dvh" : hoveredSide === "left" ? "65dvh" : hoveredSide === "right" ? "35dvh" : "50dvh",
            backgroundColor: hoveredSide === "left" || selectedSide === "left" ? "#0a0a0a" : "#000000",
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => !selectedSide && handleMobileTap("left", "/dev")}
        >
          {/* Isolate background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <DevBackground position="absolute" />
          </div>

          <motion.div
            animate={{
              scale: hoveredSide === "left" ? 1.08 : 1,
              opacity: selectedSide ? 0 : (hoveredSide === "right" ? 0.4 : 1),
            }}
            transition={{ duration: 0.4 }}
            className="text-white flex flex-col items-center z-10 px-6 pointer-events-none"
          >
            <Code2 size={40} className="mb-3 opacity-80" />
            <h1 className="text-3xl font-bold tracking-tighter mb-2 bg-gradient-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent text-center">
              Software Developer
            </h1>
            <p className="text-zinc-400 text-sm text-center max-w-xs">
              Building elegant, scalable, and robust web applications.
            </p>
          </motion.div>

          {hoveredSide === "left" && !selectedSide && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-16 text-zinc-500 font-mono text-[10px] tracking-widest z-10 pointer-events-none text-center"
            >
              TAP OR SWIPE AGAIN TO EXPLORE [DEV]
            </motion.div>
          )}

          {/* FIX 1: Show White Gases ONLY when Light Side is hovered. Also fixed the align="top" typo here! */}
          {hoveredSide === "right" && (
            <div className="absolute bottom-0 left-0 w-full pointer-events-none">
              <GaseousDivider hoveredSide={hoveredSide} align="top" />
            </div>
          )}
        </motion.div>

        {/* Bottom: Music Producer */}
        <motion.div
          className="relative w-full overflow-hidden flex flex-col justify-center items-center cursor-pointer font-[family-name:var(--font-syne)]"
          style={{ zIndex: 5 }}
          animate={{
            width: "100%",
            height: selectedSide === "right" ? "100dvh" : selectedSide === "left" ? "0dvh" : hoveredSide === "right" ? "65dvh" : hoveredSide === "left" ? "35dvh" : "50dvh",
            backgroundColor: hoveredSide === "right" || selectedSide === "right" ? "#ffffff" : "#fafafa",
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => !selectedSide && handleMobileTap("right", "/music")}
        >
          {/* FIX 2: Show Dark Gases (Inverted Smoke) on initial load (null) AND when Dark Side is hovered */}
          {hoveredSide !== "right" && (
            <div className="absolute top-0 left-0 w-full pointer-events-none">
              <GaseousDivider hoveredSide={hoveredSide} align="top" />
            </div>
          )}

          {/* Isolate background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <MusicBackground position="absolute" />
          </div>

          <motion.div
            animate={{
              scale: hoveredSide === "right" ? 1.08 : 1,
              opacity: selectedSide ? 0 : (hoveredSide === "left" ? 0.4 : 1),
            }}
            transition={{ duration: 0.4 }}
            className="text-black flex flex-col items-center z-10 px-6 pointer-events-none"
          >
            <Music4 size={40} className="mb-3 text-purple-600" />
            <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent pb-1 text-center">
              Music Producer
            </h1>
            <p className="text-zinc-600 text-sm text-center max-w-xs font-medium">
              Crafting immersive soundscapes and dynamic beats.
            </p>
          </motion.div>

          {hoveredSide === "right" && !selectedSide && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-12 text-zinc-400 text-[10px] tracking-[0.2em] uppercase font-bold z-10 pointer-events-none text-center"
            >
              Tap or Swipe again to explore (Audio)
            </motion.div>
          )}
        </motion.div>

        {/* FIX 3: Added bg-black/0, cursor-pointer, and increased height to 120px to force mobile tap registration */}
        {hoveredSide && !selectedSide && (
          <div
            className="absolute left-0 w-full h-[120px] z-[100] cursor-pointer bg-black/0"
            style={{
              top: hoveredSide === "left" ? "65dvh" : "35dvh",
              transform: "translateY(-50%)"
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setHoveredSide(null);
              setTappedSide(null);
            }}
          />
        )}

      </div>
    );
  }

  // --- DESKTOP LAYOUT (unchanged) ---
  return (
    <div className="flex h-screen w-full overflow-hidden bg-black font-[family-name:var(--font-inter)]">
      <motion.div
        className={`relative flex flex-col justify-center items-center ${hoveredSide === "left" && !selectedSide ? "cursor-pointer" : "cursor-default"}`}
        animate={{
          width: selectedSide === "left" ? "100%" : selectedSide === "right" ? "0%" : hoveredSide === "left" ? "70%" : hoveredSide === "right" ? "30%" : "50%",
          backgroundColor: hoveredSide === "left" || selectedSide === "left" ? "#0a0a0a" : "#000000",
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => {
          if (selectedSide) return;
          if (isMobile) {
            handleMobileTap("left", "/dev");
          } else {
            handleNavigate(e, "left", "/dev");
          }
        }}
      >
        <DevBackground position="absolute" />
        <motion.div
          animate={{
            scale: hoveredSide === "left" ? 1.1 : 1,
            opacity: selectedSide ? 0 : (hoveredSide === "right" ? 0.5 : 1),
          }}
          transition={{ duration: 0.4 }}
          className="text-white flex flex-col items-center z-10"
        >
          <Code2 size={64} className="mb-6 opacity-80" />
          <motion.h1
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent text-center"
          >
            Software Developer
          </motion.h1>
          <p className="text-zinc-400 max-w-sm text-center">
            Building elegant, scalable, and robust web applications with modern technologies.
          </p>
        </motion.div>
        {hoveredSide === "left" && !selectedSide && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-12 text-zinc-500 font-mono text-sm tracking-widest z-10"
          >
            CLICK TO EXPLORE [DEV]
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className={`relative flex flex-col justify-center items-center font-[family-name:var(--font-syne)] ${hoveredSide === "right" && !selectedSide ? "cursor-pointer" : "cursor-default"}`}
        animate={{
          width: selectedSide === "right" ? "100%" : selectedSide === "left" ? "0%" : hoveredSide === "right" ? "70%" : hoveredSide === "left" ? "30%" : "50%",
          backgroundColor: hoveredSide === "right" || selectedSide === "right" ? "#ffffff" : "#fafafa",
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => {
          if (selectedSide) return;
          if (isMobile) {
            handleMobileTap("right", "/music");
          } else {
            handleNavigate(e, "right", "/music");
          }
        }}
      >
        <MusicBackground position="absolute" />
        <GaseousDivider hoveredSide={hoveredSide} />
        <motion.div
          animate={{
            scale: hoveredSide === "right" ? 1.1 : 1,
            opacity: selectedSide ? 0 : (hoveredSide === "left" ? 0.5 : 1),
          }}
          transition={{ duration: 0.4 }}
          className="text-black flex flex-col items-center z-10"
        >
          <Music4 size={64} className="mb-6 text-purple-600" />
          <motion.h1
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent pb-2 text-center"
          >
            Music Producer
          </motion.h1>
          <p className="text-zinc-600 max-w-sm text-center font-medium pointer-events-none">
            Crafting immersive soundscapes, dynamic beats, and emotive audio experiences.
          </p>
        </motion.div>
        {hoveredSide === "right" && !selectedSide && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-12 text-zinc-400 text-sm tracking-[0.2em] uppercase font-bold z-10"
          >
            Click to explore (Audio)
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}