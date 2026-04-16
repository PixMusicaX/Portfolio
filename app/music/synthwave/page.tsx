"use client";

import { useState } from "react";
import { MusicGenreLayout } from "@/components/MusicGenreLayout";
import { SynthwaveBackground } from "@/components/Backgrounds";
import { Track } from "@/components/CustomAudioPlayer";

const TRACKS: Track[] = [
  { id: "1", title: "Trainer Battle", src: "/audio/synthwave/track01.mp3", tag: "Pokemon" },
  { id: "2", title: "Underwater", src: "/audio/synthwave/track02.mp3", tag: "Dark" },
  { id: "3", title: "Jungle", src: "/audio/synthwave/track03.mp3", tag: "Fusion" }
];

export default function SynthwavePage() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <MusicGenreLayout
      title="Synthwave"
      description="Nostalgic 80s analog synthesizers paired with driving, retro-futuristic arpeggios and grooves."
      tracks={TRACKS}
      theme="purple"
      themeColor="#9333ea"
      bgVariant="synthwave"
      background={<SynthwaveBackground />}
      rootBgColor="bg-purple-50"
      entryColor="#a21caf"
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
                  ? 'bg-white text-purple-700 border-white shadow-[0_10px_40px_rgba(147,51,234,0.15)] scale-105 z-10'
                  : 'bg-white/10 text-purple-900/60 border-white/20 hover:bg-white/30 hover:text-purple-800 hover:shadow-lg hover:-translate-y-1'
                  }`}
              >
                <span className={isActive ? 'font-bold' : ''}>{track.title}</span>
                {track.tag && (
                  <span className={`text-[9px] mt-1 tracking-wider font-normal ${isActive ? 'text-purple-500/70' : 'text-purple-900/30'}`}>
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