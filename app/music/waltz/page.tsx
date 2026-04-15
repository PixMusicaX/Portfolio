"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useAudio } from "@/components/AudioProvider";
import { CustomAudioPlayer, Track } from "@/components/CustomAudioPlayer";
import { GaseousDivider } from "@/components/GaseousDivider";
import { WaltzBackground } from "@/components/Backgrounds";

const TRACKS: Track[] = [
  { id: "1", title: "Clockwork Courtroom", src: "/audio/waltz/track01.mp3", tag: "Dark" },
  { id: "2", title: "Rondo of Circles", src: "/audio/waltz/track02.mp3", tag: "Electro Swing" },
  { id: "3", title: "Boat", src: "/audio/waltz/track03.mp3", tag: "Emotional" },
];

export default function WaltzPage() {
  const { setAudioState } = useAudio();
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGlassVisible, setIsGlassVisible] = useState(false);

  // Sync Global Audio State
  useEffect(() => {
    // Mute the global audio engine gracefully when entering custom portal
    setAudioState("silent");
  }, [setAudioState]);

  // Handle responsive visibility for glass effects and divider placement
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = () => setIsGlassVisible(media.matches);

    handleMediaChange();
    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div className="fixed inset-0 bg-sky-50 text-blue-900 font-[family-name:var(--font-outfit)] overflow-hidden flex">
      <WaltzBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50/50 to-sky-100/80 -z-10" />

      {/* Unified Background Dividers */}
      <GaseousDivider
        hoveredSide="left"
        variant="waltz"
        className={`z-[1] transition-opacity duration-1000 ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-0'} ${isGlassVisible ? 'hidden' : 'block'}`}
      />
      {isGlassVisible && (
        <GaseousDivider
          hoveredSide="left"
          variant="waltz"
          align="bottom"
          className={`z-[1] transition-opacity duration-1000 ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Navigation Sidebar */}
      <nav className="w-16 fixed left-0 top-0 bottom-0 flex flex-col justify-center items-center z-40 pointer-events-none">
        {/* Parabolic Light Leak Sidebar Container — only visible on desktop */}
        <div
          className={`absolute top-[-10%] bottom-[-10%] left-[-100px] w-[160px] rounded-[50%] bg-white/40 border-r border-blue-500/10 shadow-[20px_0_50px_rgba(37,99,235,0.05)] backdrop-blur-sm z-[-1] ${isGlassVisible ? 'block' : 'hidden'
            }`}
        />

        {/* Gaseous divider moved to root for correct layering */}

        <Link
          href="/music#genres"
          // High contrast text-blue-900 for mobile, md:text-blue-400 for desktop depth
          className="group flex flex-col items-center gap-6 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-blue-900 md:text-blue-400 hover:text-blue-600 hover:drop-shadow-[0_0_12px_rgba(37,99,235,0.4)] transition-all duration-300 pointer-events-auto"
        >
          <ArrowLeft size={20} className="group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Back to Genres
          </span>
        </Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-between py-16 pl-16 relative z-20 overflow-y-auto">
        {/* Genre Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12 px-4 md:px-0"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-blue-900/90 mb-4">Waltz</h1>
          <p className="text-lg md:text-xl text-blue-600/60 max-w-xl mx-auto italic font-light" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Sweeping, orchestral ¾ time signatures blending classical elegance with dark acoustic atmospheres.
          </p>
        </motion.div>

        {/* Track Grid Matrix */}
        <div className="w-full max-w-3xl px-8 flex justify-center mb-24 md:mb-32">
          <div className="flex flex-wrap gap-6 justify-center">
            {TRACKS.map((track) => {
              const isActive = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`w-56 md:w-72 h-20 md:h-24 flex flex-col items-center justify-center rounded-2xl uppercase tracking-[0.3em] font-medium text-sm md:text-base transition-all duration-300 border ${isActive
                      ? 'bg-white text-blue-700 border-white shadow-[0_10px_40px_rgba(37,99,235,0.15)] scale-105 z-10'
                      : 'bg-white/40 text-blue-900/60 border-white/40 hover:bg-white/80 hover:text-blue-800 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm'
                    }`}
                >
                  <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                  {track.tag && (
                    <span className={`text-[10px] mt-1 tracking-wider font-normal ${isActive ? 'text-blue-500/70' : 'text-blue-900/30'}`}>
                      {track.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio Player Engine */}
        <div className="w-full mt-auto pt-12 md:pt-20 mb-8 px-4 md:px-8 relative z-30">
          <CustomAudioPlayer
            tracks={TRACKS}
            activeTrackId={activeTrack}
            onTrackChange={(track) => setActiveTrack(track.id)}
            onPlayStateChange={(state) => setIsPlaying(state)}
            theme="blue"
          />
        </div>
      </main>

      {/* Fixed z-index layering above */}

      {/* Absolute Initial Transition Wipe */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 bg-blue-600 pointer-events-none z-[9999]"
      />
    </div>
  );
}