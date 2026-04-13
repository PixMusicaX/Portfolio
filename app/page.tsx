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
  
  // Immovable state lockout prevents hover logic from destroying the initial track fade natively
  const [isLocked, setIsLocked] = useState(true);
  
  const { setAudioState, hasEntered } = useAudio();
  const router = useRouter();

  useEffect(() => {
    // 1.5s timeline freeze lock on return from deep routes
    const timer = setTimeout(() => setIsLocked(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Audio orchestrator synced dynamically to the landing page interaction nodes
  useEffect(() => {
    if (selectedSide) return;

    if (hoveredSide === "left") {
      setAudioState("hover-dark"); // Developer side
    } else if (hoveredSide === "right") {
      setAudioState("hover-light"); // Music side  
    } else {
      setAudioState("initial"); // Ambient deadzone center
    }
  }, [hoveredSide, selectedSide, setAudioState]);

  useEffect(() => {
    if (selectedSide) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      // Brutally lock tracking mechanics until user enters site AND the 1.5s layout cooldown is over
      if (!ticking && hasEntered && !isLocked) {
        requestAnimationFrame(() => {
          const w = window.innerWidth;
          const x = e.clientX;
          
          let nextState: "left" | "right" | null = null;
          if (x < w * 0.35) nextState = "left";
          else if (x > w * 0.65) nextState = "right";

          // Prevent excessive re-renders by enforcing strict equality block
          setHoveredSide((prev) => prev !== nextState ? nextState : prev);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      setHoveredSide(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasEntered, isLocked, selectedSide]);

  const handleNavigate = (e: React.MouseEvent, side: "left" | "right", path: string) => {
    const w = window.innerWidth;
    const x = e.clientX;
    
    // Strictly enforce the deadzone to lock out raw container DOM clicks
    if (side === "left" && x > w * 0.35) return;
    if (side === "right" && x < w * 0.65) return;

    setSelectedSide(side);
    setTimeout(() => {
      router.push(path);
    }, 700);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black font-[family-name:var(--font-inter)]">
      {/* Left Side: Developer */}
      <motion.div
        className={`relative flex flex-col justify-center items-center ${hoveredSide === "left" && !selectedSide ? "cursor-pointer" : "cursor-default"}`}
        animate={{
          width: selectedSide === "left" ? "100%" : selectedSide === "right" ? "0%" : hoveredSide === "left" ? "70%" : hoveredSide === "right" ? "30%" : "50%",
          backgroundColor: hoveredSide === "left" || selectedSide === "left" ? "#0a0a0a" : "#000000",
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => !selectedSide && handleNavigate(e, "left", "/dev")}
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
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent"
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

      {/* Right Side: Music Producer */}
      <motion.div
        className={`relative flex flex-col justify-center items-center font-[family-name:var(--font-syne)] ${hoveredSide === "right" && !selectedSide ? "cursor-pointer" : "cursor-default"}`}
        animate={{
          width: selectedSide === "right" ? "100%" : selectedSide === "left" ? "0%" : hoveredSide === "right" ? "70%" : hoveredSide === "left" ? "30%" : "50%",
          backgroundColor: hoveredSide === "right" || selectedSide === "right" ? "#ffffff" : "#fafafa",
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => !selectedSide && handleNavigate(e, "right", "/music")}
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
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent pb-2"
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
