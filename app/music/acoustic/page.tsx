"use client";

import { useState } from "react";
import { MusicGenreLayout } from "@/components/MusicGenreLayout";
import { AcousticBackground } from "@/components/Backgrounds";
import { Track } from "@/components/CustomAudioPlayer";

const TRACKS: Track[] = [
  { id: "1", title: "Bossa Nova", src: "/audio/acoustic/track01.mp3", tag: "Lo-Fi" },
  { id: "2", title: "Last of Us", src: "/audio/acoustic/track02.mp3", tag: "SFX" },
  { id: "3", title: "Detective", src: "/audio/acoustic/track04.mp3", tag: "Cinematic" },
];

export default function AcousticPage() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <MusicGenreLayout
      title="Acoustic"
      description="Raw, intimiate performances captured with warmth — fingerpicked strings or natural resonance."
      tracks={TRACKS}
      theme="emerald"
      themeColor="#059669"
      bgVariant="acoustic"
      background={<AcousticBackground />}
      rootBgColor="bg-emerald-50"
      entryColor="#059669"
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
                  ? 'bg-white text-emerald-700 border-white shadow-[0_10px_40px_rgba(16,185,129,0.15)] scale-105 z-10'
                  : 'bg-white/20 text-emerald-900/60 border-white/20 hover:bg-white/30 hover:text-emerald-800 hover:shadow-lg hover:-translate-y-1'
                  }`}
              >
                <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                {track.tag && (
                  <span className={`text-[9px] mt-1 tracking-wider font-normal ${isActive ? 'text-emerald-500/70' : 'text-emerald-900/30'}`}>
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