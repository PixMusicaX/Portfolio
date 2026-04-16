"use client";

import { useState } from "react";
import { MusicGenreLayout } from "@/components/MusicGenreLayout";
import { ElectronicBackground } from "@/components/Backgrounds";
import { Track } from "@/components/CustomAudioPlayer";

const TRACKS: Track[] = [
  { id: "1", title: "KAWAII", src: "/audio/electronic/track04.mp3", tag: "Pop Synth" },
  { id: "2", title: "O I A", src: "/audio/electronic/track02.mp3", tag: "Meme" },
  { id: "3", title: "DOOM", src: "/audio/electronic/track03.mp3", tag: "Chiptune" },
  { id: "4", title: "ULTRAS", src: "/audio/electronic/track05.mp3", tag: "Dubstep" },
  { id: "5", title: "Toothless", src: "/audio/electronic/track06.mp3", tag: "Hyper" }
];

export default function ElectronicPage() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <MusicGenreLayout
      title="Electronic"
      description="Modern digital synthesis featuring deep sub-basses, crisp sonics, and immaculate sound design."
      tracks={TRACKS}
      theme="grey"
      themeColor="#71717a"
      bgVariant="electronic"
      background={<ElectronicBackground />}
      rootBgColor="bg-zinc-50"
      entryColor="#27272a"
      activeTrackId={activeTrack}
      setActiveTrack={setActiveTrack}
    >
      <div className="w-full flex justify-center mb-12">
        <div className="flex flex-wrap gap-6 justify-center">
          {TRACKS.map((track) => {
            const isActive = activeTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`w-56 md:w-72 h-16 md:h-20 flex flex-col items-center justify-center rounded-2xl uppercase tracking-[0.25em] font-medium text-xs md:text-sm transition-all duration-300 border backdrop-blur-xl ${isActive
                  ? 'bg-white text-zinc-700 border-white shadow-[0_10px_40px_rgba(39,39,42,0.15)] scale-105 z-10'
                  : 'bg-white/20 text-zinc-900/60 border-white/20 hover:bg-white/30 hover:text-zinc-800 hover:shadow-lg hover:-translate-y-1'
                  }`}
              >
                <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                {track.tag && (
                  <span className={`text-[9px] mt-1 tracking-wider font-normal ${isActive ? 'text-zinc-500/70' : 'text-zinc-900/30'}`}>
                    {track.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </MusicGenreLayout>
  );
}