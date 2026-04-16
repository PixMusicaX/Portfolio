"use client";

import { useState } from "react";
import { MusicGenreLayout } from "@/components/MusicGenreLayout";
import { WaltzBackground } from "@/components/Backgrounds";
import { Track } from "@/components/CustomAudioPlayer";

const TRACKS: Track[] = [
  { id: "1", title: "Clockwork Courtroom", src: "/audio/waltz/track01.mp3", tag: "Dark" },
  { id: "2", title: "Rondo of Circles", src: "/audio/waltz/track02.mp3", tag: "Electro Swing" },
  { id: "3", title: "Boat", src: "/audio/waltz/track03.mp3", tag: "Emotional" },
];

export default function WaltzPage() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <MusicGenreLayout
      title="Waltz"
      description="Sweeping, orchestral ¾ time signatures blending classical elegance with dark acoustic atmospheres."
      tracks={TRACKS}
      theme="blue"
      themeColor="#2563eb"
      bgVariant="waltz"
      background={<WaltzBackground />}
      rootBgColor="bg-sky-50"
      entryColor="#2563eb"
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
                  ? 'bg-white text-blue-700 border-white shadow-[0_10px_40px_rgba(37,99,235,0.15)] scale-105 z-10'
                  : 'bg-white/20 text-blue-900/60 border-white/20 hover:bg-white/30 hover:text-blue-800 hover:shadow-lg hover:-translate-y-1'
                  }`}
              >
                <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                {track.tag && (
                  <span className={`text-[9px] mt-1 tracking-wider font-normal ${isActive ? 'text-blue-500/70' : 'text-blue-900/30'}`}>
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