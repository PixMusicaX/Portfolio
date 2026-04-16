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
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    setAudioState("silent");
  }, [setAudioState]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const glassMedia = window.matchMedia("(min-width: 768px)");
    const landscapeMedia = window.matchMedia("(orientation: landscape) and (max-height: 500px)");

    const handleMediaChange = () => {
      setIsGlassVisible(glassMedia.matches);
      setIsMobileLandscape(landscapeMedia.matches);
    };

    handleMediaChange();
    glassMedia.addEventListener("change", handleMediaChange);
    landscapeMedia.addEventListener("change", handleMediaChange);

    return () => {
      glassMedia.removeEventListener("change", handleMediaChange);
      landscapeMedia.removeEventListener("change", handleMediaChange);
    };
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
        <div className={`absolute top-[-10%] bottom-[-10%] left-[-100px] w-[160px] rounded-[50%] bg-white/20 border-r border-white/20 shadow-xl backdrop-blur-xl z-[-1] ${isGlassVisible ? 'block' : 'hidden'}`} />
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

      {/* Main Content Area */}
      <main className={`flex-1 relative z-20 overflow-y-auto pl-14 md:pl-20 pr-4 md:pr-10 ${isMobileLandscape ? 'flex flex-row items-start pt-10 pb-10 gap-8' : 'flex flex-col items-center justify-start py-12 md:py-20'}`}>
        
        {/* Left Column: Header + Tracks */}
        <div className={`flex flex-col items-center ${isMobileLandscape ? 'w-[55%] min-h-full' : 'w-full max-w-5xl'}`}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-center w-full px-4 md:px-0 ${isMobileLandscape ? 'mb-6' : 'mb-8 md:mb-16'}`}
          >
            <h1
              className={`font-bold tracking-tight mb-2 md:mb-4 ${isMobileLandscape ? 'text-2xl' : 'text-4xl md:text-8xl'}`}
              style={{ color: themeColor }}
            >
              {title}
            </h1>
            <p
              className={`opacity-70 italic font-light font-serif leading-relaxed mx-auto ${isMobileLandscape ? 'text-xs max-w-lg' : 'text-sm md:text-xl max-w-2xl'}`}
              style={{ color: themeColor }}
            >
              {description}
            </p>
          </motion.div>

          <div className={`${isMobileLandscape ? 'pb-10' : 'pb-[17rem]'} w-full`}>
            {children}
          </div>
        </div>

        {/* Right Column / Floating Player for Portrait */}
        {/* Persistent Unified Player Container */}
        <div className={isMobileLandscape 
          ? "w-[45%] sticky top-0 h-full flex items-center justify-center pr-4 pointer-events-none" 
          : "fixed bottom-6 left-14 md:left-20 right-6 md:right-10 z-[60] pointer-events-none flex justify-center"
        }>
          <motion.div
            layout
            initial={isMobileLandscape ? false : { y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              layout: { duration: 0.6, ease: "easeOut" },
              opacity: { duration: 0.8 },
              y: { duration: 0.8, delay: isMobileLandscape ? 0 : 0.5 }
            }}
            className={`w-full max-w-4xl border p-4 transition-all duration-500 pointer-events-auto ${
              isMobileLandscape 
                ? 'bg-white/20 backdrop-blur-xl shadow-xl rounded-3xl' 
                : (isFrameVisible 
                    ? 'bg-white/20 backdrop-blur-xl shadow-xl rounded-[2rem] md:p-6' 
                    : 'bg-white/0 border-transparent shadow-none backdrop-blur-none rounded-[2rem] md:p-6')
            }`}
            style={{ 
              borderColor: (isMobileLandscape || isFrameVisible) ? `${themeColor}40` : 'transparent' 
            }}
          >
            <CustomAudioPlayer
              tracks={tracks}
              activeTrackId={activeTrackId}
              onTrackChange={(track) => setActiveTrack(track.id)}
              onPlayStateChange={(state) => setIsPlaying(state)}
              theme={theme}
              onToggleFrame={() => setIsFrameVisible(!isFrameVisible)}
              isLandscape={isMobileLandscape}
            />
          </motion.div>
        </div>
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
