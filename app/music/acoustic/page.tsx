"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useAudio } from "@/components/AudioProvider";
import { CustomAudioPlayer, Track } from "@/components/CustomAudioPlayer";
import { GaseousDivider } from "@/components/GaseousDivider";
import { AcousticBackground } from "@/components/Backgrounds";

const TRACKS: Track[] = [
  { id: "1", title: "Bossa Nova", src: "/audio/acoustic/track01.mp3", tag: "Lo-Fi" },
  { id: "2", title: "Last of Us", src: "/audio/acoustic/track02.mp3", tag: "SFX" },
  { id: "3", title: "Toxic", src: "/audio/acoustic/track03.mp3", tag: "Salsa" },
];

export default function AcousticPage() {
  const { setAudioState } = useAudio();
  const [activeTrack, setActiveTrack] = useState<string>(TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setAudioState("silent");
  }, [setAudioState]);

  return (
    <div className="min-h-screen bg-emerald-50 text-emerald-900 font-[family-name:var(--font-outfit)] relative overflow-hidden flex">
      <AcousticBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50/50 to-emerald-100/80 -z-10" />

      <nav className="w-16 fixed left-0 top-0 bottom-0 flex flex-col justify-center items-center z-40 pointer-events-none">
        <div className="absolute top-[-10%] bottom-[-10%] left-[-100px] w-[160px] rounded-[50%] bg-white/40 border-r border-emerald-500/10 shadow-[20px_0_50px_rgba(5,150,105,0.05)] backdrop-blur-sm z-[-1]" />

        <Link
          href="/music#genres"
          className="group flex flex-col items-center gap-6 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-emerald-400 hover:text-emerald-600 hover:drop-shadow-[0_0_12px_rgba(5,150,105,0.4)] transition-all duration-300 pointer-events-auto"
        >
          <ArrowLeft size={20} className="group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(5,150,105,0.6)]" />
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Back to Genres
          </span>
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-between py-16 pl-16 relative z-20 overflow-y-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-emerald-900/90 mb-4">Acoustic</h1>
          <p className="text-lg md:text-xl text-emerald-600/60 max-w-xl mx-auto italic font-light" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Raw, intimate performances captured with warmth — fingerpicked strings and natural resonance.
          </p>
        </motion.div>

        <div className="w-full max-w-3xl px-8 flex justify-center">
          <div className="flex flex-wrap gap-6 justify-center">
            {TRACKS.map((track) => {
              const isActive = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`w-56 md:w-72 h-20 md:h-24 flex flex-col items-center justify-center rounded-2xl uppercase tracking-[0.3em] font-medium text-sm md:text-base transition-all duration-300 border ${isActive
                    ? 'bg-white text-emerald-700 border-white shadow-[0_10px_40px_rgba(5,150,105,0.15)] scale-105 z-10'
                    : 'bg-white/40 text-emerald-900/60 border-white/40 hover:bg-white/80 hover:text-emerald-800 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm'
                    }`}
                >
                  <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                  {track.tag && <span className={`text-[10px] mt-1 tracking-wider font-normal ${isActive ? 'text-emerald-500/70' : 'text-emerald-900/30'}`}>{track.tag}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full mt-auto mb-8 px-8 relative z-30">
          <CustomAudioPlayer
            tracks={TRACKS}
            activeTrackId={activeTrack}
            onTrackChange={(track) => setActiveTrack(track.id)}
            onPlayStateChange={(state) => setIsPlaying(state)}
            theme="emerald"
          />
        </div>
      </main>

      <GaseousDivider hoveredSide="left" variant="acoustic" align="bottom" className={`transition-opacity duration-1000 ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 bg-emerald-600 pointer-events-none z-[9999]"
      />
    </div>
  );
}
