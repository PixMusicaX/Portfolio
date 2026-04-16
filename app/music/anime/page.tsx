"use client";

import { useState } from "react";
import { MusicGenreLayout } from "@/components/MusicGenreLayout";
import { AnimeBackground } from "@/components/Backgrounds";
import { Track } from "@/components/CustomAudioPlayer";

const TRACKS: Track[] = [
  { id: "1", title: "Blue", src: "/audio/anime/track01.mp3", tag: "Ringtone" },
  { id: "2", title: "Opening", src: "/audio/anime/track02.mp3", tag: "Original" },
  { id: "3", title: "SpecialZ", src: "/audio/anime/track03.mp3", tag: "Acoustic" },
  { id: "4", title: "SBR", src: "/audio/anime/track04.mp3", tag: "Recreation" },
];

export default function AnimePage() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <MusicGenreLayout
      title="Anime"
      description="High-energy opening themes and emotional ballads inspired by Japanese animation scoring."
      tracks={TRACKS}
      theme="pink"
      themeColor="#db2777"
      bgVariant="anime"
      background={<AnimeBackground />}
      rootBgColor="bg-pink-50"
      entryColor="#db2777"
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
                  ? 'bg-white text-pink-700 border-white shadow-[0_10px_40px_rgba(219,39,119,0.15)] scale-105 z-10'
                  : 'bg-white/20 text-pink-900/60 border-white/20 hover:bg-white/30 hover:text-pink-800 hover:shadow-lg hover:-translate-y-1'
                  }`}
              >
                <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                {track.tag && (
                  <span className={`text-[9px] mt-1 tracking-wider font-normal ${isActive ? 'text-pink-500/70' : 'text-pink-900/30'}`}>
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