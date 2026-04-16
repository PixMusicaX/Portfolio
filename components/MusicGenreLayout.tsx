"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useAudio } from "@/components/AudioProvider";
import { CustomAudioPlayer, Track, PlayerTheme } from "@/components/CustomAudioPlayer";
import { GaseousDivider } from "@/components/GaseousDivider";

interface MusicGenreLayoutProps {
  title: string;
  description: string;
  tracks: Track[];
  theme: PlayerTheme;
  themeColor: string;
  bgVariant: string;
  background: ReactNode;
  entryColor: string;
  rootBgColor?: string;
  children: ReactNode;
  activeTrackId: string | null;
  setActiveTrack: (id: string | null) => void;
}

export function MusicGenreLayout({
  title,
  description,
  tracks,
  theme,
  themeColor,
  bgVariant,
  background,
  entryColor,
  rootBgColor = "bg-white",
  children,
  activeTrackId,
  setActiveTrack
}: MusicGenreLayoutProps) {
  const { setAudioState } = useAudio();
  const [isFrameVisible, setIsFrameVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGlassVisible, setIsGlassVisible] = useState(false);

  useEffect(() => {
    setAudioState("silent");
  }, [setAudioState]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = () => setIsGlassVisible(media.matches);
    handleMediaChange();
    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div className={`fixed inset-0 overflow-hidden flex font-[family-name:var(--font-outfit)] ${rootBgColor}`}>
      {background}

      {/* Unified Background Dividers */}
      <GaseousDivider
        hoveredSide="left"
        variant={bgVariant as any}
        className={`z-[1] transition-opacity duration-1000 ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-0'} ${isGlassVisible ? 'hidden' : 'block'}`}
      />
      {isGlassVisible && (
        <GaseousDivider
          hoveredSide="left"
          variant={bgVariant as any}
          align="bottom"
          className={`z-[1] transition-opacity duration-1000 ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      <nav className="w-16 fixed left-0 top-0 bottom-0 flex flex-col justify-center items-center z-40 pointer-events-none">
        <div className={`absolute top-[-10%] bottom-[-10%] left-[-100px] w-[160px] rounded-[50%] bg-white/40 border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.05)] backdrop-blur-sm z-[-1] ${isGlassVisible ? 'block' : 'hidden'}`} />
        <Link
          href="/music#genres"
          className="group flex flex-col items-center gap-6 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 pointer-events-auto"
          style={{ color: themeColor }}
        >
          <ArrowLeft size={20} className="group-hover:-translate-y-2 transition-transform duration-300" />
          <span className="opacity-70 group-hover:opacity-100 transition-opacity" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Back to Genres
          </span>
        </Link>
      </nav>

      {/* Main Content Area - Center Aligned in Remaining Space */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 md:py-20 relative z-20 overflow-y-auto pl-14 md:pl-20 pr-4 md:pr-10">
        <div className="w-full max-w-5xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-16 w-full px-4 md:px-0"
          >
            <h1
              className="text-4xl md:text-8xl font-bold tracking-tight mb-4"
              style={{ color: themeColor }}
            >
              {title}
            </h1>
            <p
              className="text-sm md:text-xl opacity-70 max-w-2xl italic font-light font-serif leading-relaxed mx-auto"
              style={{ color: themeColor }}
            >
              {description}
            </p>
          </motion.div>

          {/* Children content (usually the Grid) */}
          <div className="pb-[17rem] w-full">
            {children}
          </div>
        </div>

        {/* Floating Integrated Player Container - Background Matched */}
        <AnimatePresence>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="fixed bottom-6 left-14 md:left-20 right-6 md:right-10 z-[60] pointer-events-none flex justify-center"
          >
            <div
              className={`w-full max-w-4xl border rounded-[2rem] p-4 md:p-6 transition-all duration-500 pointer-events-auto ${isFrameVisible
                  ? 'bg-white/20 backdrop-blur-2xl shadow-[0_-20px_40px_rgba(0,0,0,0.02)]'
                  : 'bg-white/0 border-transparent shadow-none backdrop-blur-none'
                }`}
              style={{ borderColor: isFrameVisible ? `${themeColor}40` : 'transparent' }}
            >
              <CustomAudioPlayer
                tracks={tracks}
                activeTrackId={activeTrackId}
                onTrackChange={(track) => setActiveTrack(track.id)}
                onPlayStateChange={(state) => setIsPlaying(state)}
                theme={theme}
                onToggleFrame={() => setIsFrameVisible(!isFrameVisible)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none z-[9999]"
        style={{ backgroundColor: entryColor }}
      />
    </div>
  );
}
