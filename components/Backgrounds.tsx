"use client";

import React from "react";
import { motion } from "framer-motion";

export const DevBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -100, 50, 0], x: [0, 80, -40, 0], rotate: [0, 45, -20, 0], opacity: [0, 0.04, 0] }} 
      transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }} 
      className="absolute top-10 left-10 text-6xl font-mono text-white select-none"
    >
      {"{ }"}
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, 150, -50, 0], x: [0, -100, 60, 0], rotate: [0, -30, 15, 0], opacity: [0, 0.05, 0] }} 
      transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} 
      className="absolute bottom-20 left-1/4 text-8xl font-mono text-white select-none"
    >
      {"</>"}
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -80, 120, 0], x: [0, 50, -80, 0], opacity: [0, 0.03, 0] }} 
      transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }} 
      className="absolute top-1/4 right-10 text-5xl font-mono text-white select-none"
    >
      {"() =>"}
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -150, 80, 0], x: [0, -70, 90, 0], rotate: [0, 90, -45, 0], opacity: [0, 0.06, 0] }} 
      transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }} 
      className="absolute bottom-1/3 right-1/4 text-7xl font-mono text-white select-none italic"
    >
      .tsx
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: [0, 120, -120, 0], y: [0, 80, -80, 0], opacity: [0, 0.04, 0] }} 
      transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} 
      className="absolute top-1/2 left-20 text-5xl font-mono text-white select-none"
    >
      {"function()"}
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -200, 100, 0], rotate: [0, -180, 180, 0], opacity: [0, 0.07, 0] }} 
      transition={{ repeat: Infinity, duration: 35, ease: "easeInOut" }} 
      className="absolute -top-10 right-1/3 text-9xl font-mono text-white select-none"
    >
      ;
    </motion.div>
  </div>
);

export const MusicBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    {/* Ink Blot / Blob 1 */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} 
      transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} 
      className="absolute -top-20 -right-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-purple-600">
        <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </motion.div>

    {/* Ink Blot / Blob 2 */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} 
      transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} 
      className="absolute bottom-0 -left-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-orange-500">
        <path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
    
    {/* Piano Keys */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -150, 100, 0], x: [0, 80, -100, 0], rotate: [-12, -45, 15, -12], opacity: [0, 0.06, 0] }} 
      transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }} 
      className="absolute top-1/4 left-10 flex border border-black/30 w-48 h-24 bg-white/20 backdrop-blur-sm shadow-xl rounded-sm overflow-hidden"
    >
      <div className="flex-1 bg-black/10 border-r border-black/20 relative">
        <div className="absolute top-0 right-[-8px] w-[16px] h-14 bg-black/60 rounded-b-sm z-10"></div>
      </div>
      <div className="flex-1 bg-black/10 border-r border-black/20 relative">
        <div className="absolute top-0 right-[-8px] w-[16px] h-14 bg-black/60 rounded-b-sm z-10"></div>
      </div>
      <div className="flex-1 bg-black/10 border-r border-black/20"></div>
      <div className="flex-1 bg-black/10 border-r border-black/20 relative">
        <div className="absolute top-0 right-[-8px] w-[16px] h-14 bg-black/60 rounded-b-sm z-10"></div>
      </div>
      <div className="flex-1 bg-black/10 border-r border-black/20 relative">
        <div className="absolute top-0 right-[-8px] w-[16px] h-14 bg-black/60 rounded-b-sm z-10"></div>
      </div>
      <div className="flex-1 bg-black/10 border-r border-black/20 relative">
        <div className="absolute top-0 right-[-8px] w-[16px] h-14 bg-black/60 rounded-b-sm z-10"></div>
      </div>
      <div className="flex-1 bg-black/10 relative"></div>
    </motion.div>

    {/* Abstract Violin Shape */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, 200, -150, 0], x: [0, -100, 120, 0], rotate: [-45, 45, -90, -45], opacity: [0, 0.06, 0] }} 
      transition={{ repeat: Infinity, duration: 35, ease: "easeInOut" }} 
      className="absolute bottom-20 right-1/4"
    >
      <svg viewBox="0 0 100 200" className="w-32 h-64 stroke-black/40 fill-none" strokeWidth="2">
        <path d="M50 190 C30 190 20 160 20 130 C20 110 35 105 35 90 C35 75 25 70 25 50 C25 20 35 10 50 10 C65 10 75 20 75 50 C75 70 65 75 65 90 C65 105 80 110 80 130 C80 160 70 190 50 190 Z" />
        <line x1="50" y1="20" x2="50" y2="180" strokeWidth="1" />
        <path d="M35 120 C35 100 45 90 45 80" />
        <path d="M65 120 C65 100 55 90 55 80" />
      </svg>
    </motion.div>
  </div>
);

export const WaltzBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    {/* Ink Blot / Blob 1 */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} 
      transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} 
      className="absolute -top-20 -right-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-blue-500">
        <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </motion.div>

    {/* Ink Blot / Blob 2 */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} 
      transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} 
      className="absolute bottom-0 -left-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-sky-400">
        <path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
  </div>
);

export const SynthwaveBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} 
      transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} 
      className="absolute -top-20 -right-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-purple-500">
        <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} 
      transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} 
      className="absolute bottom-0 -left-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-fuchsia-400">
        <path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
  </div>
);

export const BattleBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} 
      transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} 
      className="absolute -top-20 -right-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-rose-500">
        <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} 
      transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} 
      className="absolute bottom-0 -left-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-red-400">
        <path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
  </div>
);

export const ElectronicBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} 
      transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} 
      className="absolute -top-20 -right-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-zinc-400">
        <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} 
      transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} 
      className="absolute bottom-0 -left-20"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-neutral-300">
        <path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
  </div>
);

export const FusionBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} className="absolute -top-20 -right-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-amber-500"><path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" /></svg>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} className="absolute bottom-0 -left-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-orange-400"><path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" /></svg>
    </motion.div>
  </div>
);

export const AcousticBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} className="absolute -top-20 -right-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-emerald-500"><path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" /></svg>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} className="absolute bottom-0 -left-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-green-400"><path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" /></svg>
    </motion.div>
  </div>
);

export const AnimeBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} className="absolute -top-20 -right-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-pink-500"><path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" /></svg>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} className="absolute bottom-0 -left-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-rose-300"><path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" /></svg>
    </motion.div>
  </div>
);

export const OrchestralBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} className="absolute -top-20 -right-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-indigo-500"><path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" /></svg>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} className="absolute bottom-0 -left-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-violet-400"><path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" /></svg>
    </motion.div>
  </div>
);

export const LegacyBackground = ({ position = "fixed" }: { position?: "fixed" | "absolute" }) => (
  <div className={`${position} inset-0 overflow-hidden pointer-events-none z-0`}>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, -120, 60, 0], x: [0, 100, -80, 0], scale: [1, 1.2, 0.8, 1], opacity: [0, 0.05, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} className="absolute -top-20 -right-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-teal-500"><path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.3C89.6,-33.4,94.5,-17.8,92,-3C89.4,11.8,79.5,25.8,70.5,39.6C61.4,53.4,53.3,66.9,41.9,76.6C30.5,86.2,15.2,92,1.3,89.7C-12.6,87.4,-25.2,77,-36.8,67.6C-48.4,58.2,-58.9,49.8,-69.1,39.3C-79.3,28.8,-89.2,16.2,-91,-2.9C-92.8,-22,-86.6,-44.6,-73.2,-59C-59.8,-73.4,-39.2,-79.6,-21.8,-80.6C-4.4,-81.6,9.8,-77.4,24.1,-75.9C38.4,-74.4,52.8,-75.6,44.7,-76.4Z" transform="translate(100 100)" /></svg>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ y: [0, 150, -100, 0], x: [0, -150, 80, 0], scale: [1, 0.8, 1.2, 1], opacity: [0, 0.04, 0] }} transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} className="absolute bottom-0 -left-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-[30rem] fill-cyan-400"><path d="M51.1,-63.9C64.6,-58.5,72.9,-43.3,77.9,-27.1C82.9,-10.9,84.6,6.3,79.8,21.6C75.1,36.9,64,50.2,50.5,58.5C36.9,66.7,21,69.9,4.4,64.4C-12.1,58.8,-27.9,44.5,-40.8,31C-53.6,17.5,-63.6,5,-64.1,-7.7C-64.6,-20.3,-55.8,-32.9,-44.8,-39.9C-33.8,-46.9,-20.5,-48.2,-5.7,-41C9.1,-33.8,24,-14.2,37.6,-26.3C51.1,-38.4,63.1,-62.1,51.1,-63.9Z" transform="translate(100 100)" /></svg>
    </motion.div>
  </div>
);
