"use client";

import { useState } from "react";
import { MusicGenreLayout } from "@/components/MusicGenreLayout";
import { BattleBackground } from "@/components/Backgrounds";
import { Track } from "@/components/CustomAudioPlayer";

const TRACKS: Track[] = [
  { id: "1", title: "Winter faces Summer Act I", src: "/audio/battle-soundtracks/track02.mp3", tag: "Afro" },
  { id: "2", title: "Winter faces Summer Act II", src: "/audio/battle-soundtracks/track01.mp3", tag: "Cinematic" },
  { id: "3", title: "Rapiers and Flowers", src: "/audio/battle-soundtracks/track03.mp3", tag: "European" },
];

export default function BattleSoundtracksPage() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <MusicGenreLayout
      title="Battle Soundtracks"
      description="Intense, cinematic scoring featuring massive brass, tight percussion, and adrenaline-inducing themes."
      tracks={TRACKS}
      theme="red"
      themeColor="#e11d48"
      bgVariant="battle"
      background={<BattleBackground />}
      rootBgColor="bg-rose-50"
      entryColor="#e11d48"
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
                className={`w-56 md:w-72 h-16 md:h-20 flex flex-col items-center justify-center rounded-2xl uppercase tracking-[0.25em] font-medium text-xs md:text-sm transition-all duration-300 border backdrop-blur-md ${isActive
                  ? 'bg-white text-rose-700 border-white shadow-[0_10px_40px_rgba(225,29,72,0.15)] scale-105 z-10'
                  : 'bg-white/10 text-rose-900/60 border-white/20 hover:bg-white/30 hover:text-rose-800 hover:shadow-lg hover:-translate-y-1'
                  }`}
              >
                <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                {track.tag && (
                  <span className={`text-[9px] mt-1 tracking-wider font-normal ${isActive ? 'text-rose-400/70' : 'text-rose-900/30'}`}>
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