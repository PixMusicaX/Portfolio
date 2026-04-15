"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export type AudioState = "silent" | "initial" | "hover-dark" | "hover-light" | "full-dark" | "full-light";

interface AudioContextType {
  audioState: AudioState;
  setAudioState: (state: AudioState) => void;
  hasEntered: boolean;
}

const AudioContext = createContext<AudioContextType>({
  audioState: "silent",
  setAudioState: () => {},
  hasEntered: false,
});

export const useAudio = () => useContext(AudioContext);

const TRACKS = {
  "initial": "/audio/initial.mp3",
  "hover-dark": "/audio/hover-dark.mp3",
  "hover-light": "/audio/hover-light.mp3",
  "full-dark": "/audio/full-dark.mp3",
  "full-light": "/audio/full-light.mp3",
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [audioState, setAudioState] = useState<AudioState>("silent");
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Web Audio Context References for Sample-Accurate Seamless Looping
  const audioCtxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<{ [key: string]: AudioBuffer }>({});
  const gainNodesRef = useRef<{ [key: string]: GainNode }>({});
  
  // Store the scheduler interval ID to ensure cleanup
  const schedulerIntervalRef = useRef<any>(null);
  const isEnteringRef = useRef(false);

  // Initialize and Buffer tracks into memory purely on client-side
  useEffect(() => {
    // Instantiate low-level audio engine
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return; // Fallback for unsupported browsers
    
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const loadPromises = Object.entries(TRACKS).map(async ([key, src]) => {
      try {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        buffersRef.current[key] = audioBuffer;

        // Isolate volume control for this specific mathematical loop
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0; // Absolute zero initial matrix
        gainNode.connect(ctx.destination);
        gainNodesRef.current[key] = gainNode;
      } catch (err) {
        console.error("Failed to decode audio track seamlessly:", src, err);
      }
    });

    Promise.all(loadPromises).then(() => {
      setIsLoading(false); // Unlocks entry overlay
    });

    return () => {
      // Memory cleanup if router completely strips layout (rare)
      if (ctx.state !== 'closed') ctx.close();
    };
  }, []);

  // Frame-perfect Crossfading Loop manually tracking the GainNodes
  useEffect(() => {
    if (!hasEntered || !audioCtxRef.current) return;

    let rafId: number;
    
    // Tone down maximum hardware amplitude directly by cutting global ceiling to 60%
    const MASTER_VOL = 0.6;
    
    // Dynamically calculate mathematical fade duration logic intervals:
    // 3s for initial entry, 1.2s for room/page transitions, 0.8s for side-hovers
    const isInitialEntry = audioState === 'initial';
    const isPageTransition = audioState.startsWith('full-');
    
    const fadeDurationSeconds = isInitialEntry ? 3 : isPageTransition ? 1.2 : 0.8;
    
    // We assume an average 60Hz monitor dispatch rate for smooth interpolation calculations
    const STEPS_PER_SECOND = 60;
    const frameStepValue = MASTER_VOL / (fadeDurationSeconds * STEPS_PER_SECOND);

    const crossfade = () => {
      Object.entries(gainNodesRef.current).forEach(([key, gainNode]) => {
        const targetVolume = (key === audioState) ? MASTER_VOL : 0;
        const currentGain = gainNode.gain.value;
        
        if (currentGain < targetVolume) {
          gainNode.gain.value = Math.min(targetVolume, currentGain + frameStepValue);
        } else if (currentGain > targetVolume) {
          gainNode.gain.value = Math.max(0, currentGain - frameStepValue);
        }
      });

      rafId = requestAnimationFrame(crossfade);
    };

    rafId = requestAnimationFrame(crossfade);
    return () => cancelAnimationFrame(rafId);
  }, [audioState, hasEntered]);

  const handleEnter = async () => {
    if (hasEntered || isEnteringRef.current || isLoading || !audioCtxRef.current) return;
    
    isEnteringRef.current = true;
    
    // Unlock Context securely against Chromium anti-autoplay engine
    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    
    // Safely retrieve the baseline duration track (all stems assumed identically exported)
    const masterBuffer = Object.values(buffersRef.current)[0];
    if (!masterBuffer) return;

    // Crossfade interpolation boundary inside each loop (erases MP3 encode padding cuts)
    const OVERLAP_MS = 0.15; // 150ms fade overlap to melt tracks seamlessly
    const LOOP_DURATION = masterBuffer.duration - OVERLAP_MS;
    
    // Web Audio engine starts scheduling 100ms in the mathematical future
    let nextStartTime = ctx.currentTime + 0.1;
    const LOOKAHEAD_WINDOW = 2.0; // Queue 2 whole seconds in CPU future to bypass browser tab throttling

    const scheduleQueue = () => {
      // If the next loop event enters the time horizon, queue it!
      while (nextStartTime < ctx.currentTime + LOOKAHEAD_WINDOW) {
        
        Object.entries(buffersRef.current).forEach(([key, buffer]) => {
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          
          // Spawn a dedicated micro-fader mathematically targeting this isolated track spawn
          const popFader = ctx.createGain();
          popFader.connect(gainNodesRef.current[key]);
          source.connect(popFader);
          
          // Perfect seamless fade in (avoids amplitude pops on raw cuts)
          popFader.gain.setValueAtTime(0, nextStartTime);
          popFader.gain.linearRampToValueAtTime(1, nextStartTime + OVERLAP_MS);
          
          // Smooth seamless fade out directly overlapping the next loop instance
          const endTime = nextStartTime + buffer.duration;
          popFader.gain.setValueAtTime(1, endTime - OVERLAP_MS);
          popFader.gain.linearRampToValueAtTime(0, endTime);
          
          // Ship off block to DSP Engine
          source.start(nextStartTime);
          source.stop(endTime);
        });

        // Push chronological clock boundary identically 
        nextStartTime += LOOP_DURATION;
      }
    };

    // Spin up scheduler initially, then lock it via interval so backgrounding the tab doesn't kill it
    scheduleQueue();
    if (schedulerIntervalRef.current) clearInterval(schedulerIntervalRef.current);
    schedulerIntervalRef.current = setInterval(scheduleQueue, 1000);

    setHasEntered(true);
    // Note: isEnteringRef.current remains true to prevent ever re-entering the async loop redundantly
    // since setHasEntered(true) update might take a render cycle to reflect.

    // Apply strict location routing commands dynamically
    if (pathname === '/dev') {
        setAudioState('full-dark');
    } else if (pathname === '/music') {
        setAudioState('full-light');
    } else {
        setAudioState('initial');
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartY || isLoading) return;
    const touchEndY = e.changedTouches[0].clientY;
    const distance = Math.abs(touchStartY - touchEndY);
    if (distance > 30) {
      handleEnter();
    }
  };

  return (
    <AudioContext.Provider value={{ audioState, setAudioState, hasEntered }}>
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(40px)", scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            onClick={isLoading ? undefined : handleEnter}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-3xl flex flex-col items-center justify-center text-white overflow-hidden ${isLoading ? 'cursor-wait' : 'cursor-pointer'} ${hasEntered ? 'pointer-events-none' : ''}`}
          >
             <div className="relative z-10 flex flex-col items-center justify-center px-4">
                 <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 opacity-100 flex items-center gap-3">
                    <span className="font-semibold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Pinaki</span> <span className="text-zinc-200">P Singha</span>
                 </h1>
                 
                 <div className="h-[1px] w-12 bg-white/30 mb-8" />

                 <p className={`text-zinc-300 font-mono text-[10px] md:text-sm tracking-[0.3em] uppercase text-center transition-colors duration-500`}>
                    {isLoading ? "Buffering gapless audio engine..." : "Use headphones for best experience."}
                 </p>
                 
                 <AnimatePresence>
                   {!isLoading && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-20 text-[10px] md:text-xs text-white/70 tracking-[0.4em] uppercase animate-pulse font-medium"
                      >
                         {isMobile ? "Tap / Swipe to Enter" : "Click to Enter"}
                      </motion.p>
                   )}
                 </AnimatePresence>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </AudioContext.Provider>
  );
}
