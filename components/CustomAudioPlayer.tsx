"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Volume2, VolumeX } from "lucide-react";

export interface Track {
  id: string;
  title: string;
  src: string;
  tag?: string;
}

export type PlayerTheme = "blue" | "purple" | "red" | "grey" | "amber" | "emerald" | "pink" | "indigo" | "teal";

const THEME_MAP: Record<PlayerTheme, { title: string; barBg: string; barFill: string; barHover: string; timeTxt: string; controlsTxt: string; controlsHover: string; controlsActive: string; btnBorder: string; btnHoverBorder: string; btnHoverBg: string }> = {
  blue: { title: "text-blue-900", barBg: "bg-blue-900/10", barFill: "bg-blue-600", barHover: "group-hover:bg-blue-800", timeTxt: "text-blue-900/70", controlsTxt: "text-blue-900/90", controlsHover: "hover:text-blue-700", controlsActive: "text-blue-700", btnBorder: "border-blue-900/20", btnHoverBorder: "hover:border-blue-500", btnHoverBg: "hover:bg-blue-900" },
  purple: { title: "text-purple-900", barBg: "bg-purple-900/10", barFill: "bg-purple-600", barHover: "group-hover:bg-purple-800", timeTxt: "text-purple-900/70", controlsTxt: "text-purple-900/90", controlsHover: "hover:text-purple-700", controlsActive: "text-purple-700", btnBorder: "border-purple-900/20", btnHoverBorder: "hover:border-purple-500", btnHoverBg: "hover:bg-purple-900" },
  red: { title: "text-rose-900", barBg: "bg-rose-900/10", barFill: "bg-rose-600", barHover: "group-hover:bg-rose-800", timeTxt: "text-rose-900/70", controlsTxt: "text-rose-900/90", controlsHover: "hover:text-rose-700", controlsActive: "text-rose-700", btnBorder: "border-rose-900/20", btnHoverBorder: "hover:border-rose-500", btnHoverBg: "hover:bg-rose-900" },
  grey: { title: "text-zinc-900", barBg: "bg-zinc-900/10", barFill: "bg-zinc-600", barHover: "group-hover:bg-zinc-800", timeTxt: "text-zinc-900/70", controlsTxt: "text-zinc-900/90", controlsHover: "hover:text-zinc-700", controlsActive: "text-zinc-700", btnBorder: "border-zinc-900/20", btnHoverBorder: "hover:border-zinc-500", btnHoverBg: "hover:bg-zinc-900" },
  amber: { title: "text-amber-900", barBg: "bg-amber-900/10", barFill: "bg-amber-600", barHover: "group-hover:bg-amber-800", timeTxt: "text-amber-900/70", controlsTxt: "text-amber-900/90", controlsHover: "hover:text-amber-700", controlsActive: "text-amber-700", btnBorder: "border-amber-900/20", btnHoverBorder: "hover:border-amber-500", btnHoverBg: "hover:bg-amber-900" },
  emerald: { title: "text-emerald-900", barBg: "bg-emerald-900/10", barFill: "bg-emerald-600", barHover: "group-hover:bg-emerald-800", timeTxt: "text-emerald-900/70", controlsTxt: "text-emerald-900/90", controlsHover: "hover:text-emerald-700", controlsActive: "text-emerald-700", btnBorder: "border-emerald-900/20", btnHoverBorder: "hover:border-emerald-500", btnHoverBg: "hover:bg-emerald-900" },
  pink: { title: "text-pink-900", barBg: "bg-pink-900/10", barFill: "bg-pink-600", barHover: "group-hover:bg-pink-800", timeTxt: "text-pink-900/70", controlsTxt: "text-pink-900/90", controlsHover: "hover:text-pink-700", controlsActive: "text-pink-700", btnBorder: "border-pink-900/20", btnHoverBorder: "hover:border-pink-500", btnHoverBg: "hover:bg-pink-900" },
  indigo: { title: "text-indigo-900", barBg: "bg-indigo-900/10", barFill: "bg-indigo-600", barHover: "group-hover:bg-indigo-800", timeTxt: "text-indigo-900/70", controlsTxt: "text-indigo-900/90", controlsHover: "hover:text-indigo-700", controlsActive: "text-indigo-700", btnBorder: "border-indigo-900/20", btnHoverBorder: "hover:border-indigo-500", btnHoverBg: "hover:bg-indigo-900" },
  teal: { title: "text-teal-900", barBg: "bg-teal-900/10", barFill: "bg-teal-600", barHover: "group-hover:bg-teal-800", timeTxt: "text-teal-900/70", controlsTxt: "text-teal-900/90", controlsHover: "hover:text-teal-700", controlsActive: "text-teal-700", btnBorder: "border-teal-900/20", btnHoverBorder: "hover:border-teal-500", btnHoverBg: "hover:bg-teal-900" },
};


interface CustomAudioPlayerProps {
  tracks: Track[];
  onTrackChange?: (track: Track) => void;
  activeTrackId?: string | null;
  onPlayStateChange?: (isPlaying: boolean) => void;
  theme?: PlayerTheme;
  onToggleFrame?: () => void;
}

export function CustomAudioPlayer({ tracks, onTrackChange, activeTrackId, onPlayStateChange, theme = "blue", onToggleFrame }: CustomAudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isDraggingSeek, setIsDraggingSeek] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  // Web Audio refs for iOS volume support
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const initAudioCtx = () => {
    if (audioCtxRef.current) return;
    
    try {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new AudioContextClass();
      const gainNode = ctx.createGain();
      
      if (audioRef.current) {
        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        audioCtxRef.current = ctx;
        gainNodeRef.current = gainNode;
        sourceNodeRef.current = source;
        
        // Initial volume sync
        gainNode.gain.value = isMuted ? 0 : volume;
      }
    } catch (err) {
      console.error("Failed to initialize Web Audio API:", err);
    }
  };

  // Sync with prop-driven track selection
  useEffect(() => {
    if (activeTrackId) {
      const idx = tracks.findIndex(t => t.id === activeTrackId);
      if (idx !== -1 && idx !== currentTrackIndex) {
        setCurrentTrackIndex(idx);
        setIsPlaying(true); // Auto-play if clicked externally
      }
    }
  }, [activeTrackId, tracks]);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (onTrackChange && currentTrack) {
      onTrackChange(currentTrack);
    }
  }, [currentTrackIndex]); // eslint-disable-line

  useEffect(() => {
    const getEventX = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        return e.touches[0].clientX;
      } else if ('clientX' in e) {
        return (e as MouseEvent).clientX;
      }
      return 0;
    };

    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (isDraggingSeek && progressBarRef.current && audioRef.current) {
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickX = getEventX(e) - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const newTime = percentage * (audioRef.current.duration || 0);
        audioRef.current.currentTime = newTime;
        setProgress(newTime);
      }
      if (isDraggingVolume && volumeBarRef.current) {
        const rect = volumeBarRef.current.getBoundingClientRect();
        const clickX = getEventX(e) - rect.left;
        const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
        setVolume(newVolume);
        setIsMuted(false);
      }
    };

    const handleGlobalUp = () => {
      setIsDraggingSeek(false);
      setIsDraggingVolume(false);
    };

    if (isDraggingSeek || isDraggingVolume) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
      window.addEventListener("touchmove", handleGlobalMove, { passive: false });
      window.addEventListener("touchend", handleGlobalUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [isDraggingSeek, isDraggingVolume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error(e));
      }
    }
  }, [currentTrackIndex]); // eslint-disable-line

  useEffect(() => {
    if (audioRef.current) {
      // Audio.volume is still set for non-iOS or desktop
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    // Web Audio GainNode for iOS and advanced volume control
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(isMuted ? 0 : volume, audioCtxRef.current?.currentTime || 0, 0.01);
    }
  }, [volume, isMuted]);

  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    initAudioCtx();
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (currentTrackIndex === -1) {
      setCurrentTrackIndex(0);
      setIsPlaying(true);
      return;
    }

    if (!audioRef.current) return;
    let nextPlayingState = !isPlaying;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error(e);
        nextPlayingState = false;
      });
    }

    setIsPlaying(nextPlayingState);
    if (onPlayStateChange) onPlayStateChange(nextPlayingState);
  };

  useEffect(() => {
    if (onPlayStateChange) onPlayStateChange(isPlaying);
  }, [isPlaying]); // eslint-disable-line

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDraggingSeek) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    initAudioCtx();
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clickX = clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setProgress(newTime);
    setIsDraggingSeek(true);
  };

  const skipRelative = (e: React.MouseEvent, amount: number) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    initAudioCtx();
    if (!volumeBarRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clickX = clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(newVolume);
    setIsMuted(false);
    setIsDraggingVolume(true);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="w-full flex flex-col items-center justify-center z-50">
      {/* Hidden Native Audio Node */}
      <audio
        ref={audioRef}
        src={currentTrack?.src || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleEnded}
        className="hidden"
      />

      {/* Typography - Now triggers frame toggle */}
      <div 
        className="text-center space-y-2 h-[48px] md:h-[60px] flex items-center justify-center mb-6 md:mb-8 cursor-pointer group/title select-none"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFrame?.();
        }}
      >
        <h2 className={`text-2xl md:text-4xl font-light tracking-widest uppercase transition-opacity group-hover/title:opacity-100 ${THEME_MAP[theme].title} ${currentTrackIndex === -1 ? 'opacity-40' : 'opacity-100'}`}>
          {currentTrackIndex === -1 ? "Select a track to begin" : (currentTrack?.title || "Loading...")}
        </h2>
      </div>

      {/* Seek Tracker */}
      <div 
        className="w-full max-w-2xl py-4 cursor-pointer group mb-1 md:mb-2 touch-none" 
        onMouseDown={handleSeek}
        onTouchStart={handleSeek}
      >
        <div ref={progressBarRef} className={`h-[2px] w-full ${THEME_MAP[theme].barBg} relative rounded-full overflow-hidden`}>
          <div
            className={`absolute top-0 left-0 h-full ${THEME_MAP[theme].barFill} transition-all duration-75 ease-linear ${THEME_MAP[theme].barHover}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className={`flex justify-between items-center mt-3 text-[10px] font-mono ${THEME_MAP[theme].timeTxt} tracking-widest`}>
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Media & Volume Controls */}
      <div className="flex flex-col items-center gap-6">
        <div className={`flex items-center gap-5.5 sm:gap-6.5 md:gap-8 ${THEME_MAP[theme].controlsTxt}`}>
          <button onClick={handlePrev} className={`${THEME_MAP[theme].controlsHover} transition-colors hover:scale-110 active:scale-95`}>
            <SkipBack size={24} strokeWidth={1.5} />
          </button>
          <button onClick={(e) => skipRelative(e, -10)} className={`${THEME_MAP[theme].controlsHover} transition-colors hover:scale-110 active:scale-95`}>
            <Rewind size={28} strokeWidth={1.5} />
          </button>

          <button
            onClick={togglePlay}
            className={`w-16 h-16 rounded-full border ${THEME_MAP[theme].btnBorder} flex items-center justify-center ${THEME_MAP[theme].btnHoverBorder} ${THEME_MAP[theme].btnHoverBg} hover:text-white transition-all hover:scale-105 active:scale-95`}
          >
            {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
          </button>

          <button onClick={(e) => skipRelative(e, 10)} className={`${THEME_MAP[theme].controlsHover} transition-colors hover:scale-110 active:scale-95`}>
            <FastForward size={28} strokeWidth={1.5} />
          </button>
          <button onClick={handleNext} className={`${THEME_MAP[theme].controlsHover} transition-colors hover:scale-110 active:scale-95`}>
            <SkipForward size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Volume Control - Positioned below buttons */}
        <div className="flex items-center justify-center gap-3 opacity-100">
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className={`${THEME_MAP[theme].controlsActive}`}
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div 
            ref={volumeBarRef}
            onMouseDown={handleVolumeClick}
            onTouchStart={handleVolumeClick}
            className="py-4 px-2 cursor-pointer group/vol flex items-center touch-none"
          >
            <div className={`w-32 md:w-40 h-[2px] ${THEME_MAP[theme].barBg} relative rounded-full`}>
              <div 
                className={`absolute top-0 left-0 h-full ${THEME_MAP[theme].barFill} ${THEME_MAP[theme].barHover}`}
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
