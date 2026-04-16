"use client";

import { useState } from "react";
import { MusicGenreLayout } from "@/components/MusicGenreLayout";
import { FusionBackground } from "@/components/Backgrounds";
import { Track } from "@/components/CustomAudioPlayer";

const TRACKS: Track[] = [
  { id: "1", title: "Bad Habits", src: "/audio/fusion/track01.mp3", tag: "Jazz • EDM" },
  { id: "2", title: "Pochita", src: "/audio/fusion/track02.mp3", tag: "Piano • Hip Hop" },
  { id: "3", title: "Toxic", src: "/audio/fusion/track03.mp3", tag: "Salsa • Trap" },
  { id: "4", title: "Super Gogeta", src: "/audio/fusion/track04.mp3", tag: "Metal • Electronic" }
];

export default function FusionPage() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <MusicGenreLayout
      title="Fusion"
      description="Genre-defying sonic experiments merging genres with modern production techniques."
      tracks={TRACKS}
      theme="amber"
      themeColor="#d97706"
      bgVariant="fusion"
      background={<FusionBackground />}
      rootBgColor="bg-amber-50"
      entryColor="#d97706"
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
                  ? 'bg-white text-amber-700 border-white shadow-[0_10px_40px_rgba(217,119,6,0.15)] scale-105 z-10'
                  : 'bg-white/10 text-amber-900/60 border-white/20 hover:bg-white/30 hover:text-amber-800 hover:shadow-lg hover:-translate-y-1'
                  }`}
              >
                <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                {track.tag && (
                  <span className={`text-[9px] mt-1 tracking-wider font-normal ${isActive ? 'text-amber-500/70' : 'text-amber-900/30'}`}>
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