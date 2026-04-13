"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Camera, Video, Speaker, MonitorSpeaker, Mic2, Pause, ChevronDown, AudioLines, Music2, ArrowRight } from "lucide-react";
import { MusicBackground } from "@/components/Backgrounds";
import { GaseousDivider } from "@/components/GaseousDivider";
import { useAudio } from "@/components/AudioProvider";

export default function MusicPage() {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [transitioningGenre, setTransitioningGenre] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const { setAudioState } = useAudio();
  const router = useRouter();

  const handleGenreClick = (route: string, badge: string) => {
    if (transitioningGenre) return;
    setTransitioningGenre(badge);
    setTimeout(() => {
      router.push(route);
    }, 1000); // Wait for the 800ms sweep plus a 200ms padding buffer exactly.
  };

  const handleBackToPortal = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  useEffect(() => {
    setAudioState("full-light");
  }, [setAudioState]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-[family-name:var(--font-outfit)] selection:bg-purple-200 relative overflow-hidden">
      <MusicBackground />

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed left-0 top-0 bottom-0 w-16 z-50 flex flex-col items-center justify-center pointer-events-none"
      >

        <GaseousDivider
          hoveredSide={isSidebarHovered ? "left" : null}
          variant="music"
          className={`z-[-2] ${isSidebarHovered ? 'transition-opacity duration-300 ease-in opacity-70' : 'transition-opacity duration-700 ease-out opacity-5'}`}
        />

        {/* Parabolic Light Leak — hidden on mobile to prevent content overlap */}
        <div className="absolute top-[-10%] bottom-[-10%] left-[-100px] w-[160px] rounded-[50%] bg-white/40 border-r border-purple-500/10 shadow-[20px_0_50px_rgba(168,85,247,0.15)] backdrop-blur-sm z-[-1] hidden md:block" />

        <button
          onClick={handleBackToPortal}
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className="group flex flex-col items-center gap-6 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 hover:text-purple-600 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-300 pointer-events-auto cursor-pointer"
        >
          <ArrowLeft size={20} className="group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Back to portal
          </span>
        </button>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2 text-zinc-400 drop-shadow-lg"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 pl-20 relative z-10 w-full flex flex-col">

          {/* Header Section */}
          <section className="min-h-screen w-full flex flex-col justify-center snap-start py-20 relative pb-32">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold tracking-widest uppercase">
                Sonic Architecture & Synthesis
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 flex items-center gap-6">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent pb-2">
                  Producer & <br className="md:hidden" /> Sound Architect
                </span>
                <MonitorSpeaker size={120} strokeWidth={1.5} className="text-pink-500 hidden md:block opacity-80" />
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold text-zinc-400 tracking-tight mb-8">
                PiX MusicaX, Theme/Alter
              </h2>
              <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl leading-relaxed font-medium">
                Blending classical instruments with modern electronic synthesis to create cinematic, immersive soundscapes.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <a href="https://www.youtube.com/@PiXMusicaX" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-zinc-100 hover:bg-red-100 hover:text-red-600 transition-colors shadow-sm" title="YouTube (PiX MusicaX)">
                  <Video size={24} />
                </a>
                <a href="https://www.youtube.com/@ThemeAlter-ow2zb" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-zinc-100 hover:bg-blue-100 hover:text-blue-600 transition-colors shadow-sm" title="YouTube (Theme/Alter)">
                  <Video size={24} />
                </a>
                <a href="https://open.spotify.com/artist/3h2hxcu6jLk7T4quHavrdj" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-zinc-100 hover:bg-green-100 hover:text-green-600 transition-colors shadow-sm" title="Spotify">
                  <AudioLines size={24} />
                </a>
                <a href="https://music.apple.com/us/artist/pix-musicax/1511497563" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-zinc-100 hover:bg-pink-100 hover:text-pink-600 transition-colors shadow-sm" title="Apple Music">
                  <Music2 size={24} />
                </a>
                <a href="https://www.instagram.com/_pix.aki_/?__d=1%2B" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-zinc-100 hover:bg-purple-100 hover:text-purple-600 transition-colors shadow-sm" title="Instagram">
                  <Camera size={24} />
                </a>
              </div>
            </motion.div>
          </section>

          {/* About Me Section */}
          <section className="min-h-screen w-full flex flex-col justify-center snap-start py-20 border-t border-purple-500/10">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-black mb-10 flex items-center gap-4 text-zinc-800">
                <Speaker size={32} className="text-pink-500" />
                About Me
              </h2>
              <div className="text-zinc-600 leading-relaxed font-medium space-y-6 text-xl max-w-3xl">
                <p>
                  I go by <span className="text-zinc-900 font-bold">PiX MusicaX</span> and <span className="text-zinc-900 font-bold">Theme/Alter</span> — two sides of the same sonic coin. My journey into music production began in <span className="text-zinc-900 font-semibold">2018</span>, driven by a fascination with layering classical texture over modern digital frameworks.
                </p>
                <p>
                  My weapon of choice is <span className="text-zinc-900 font-semibold">FL Studio</span>, where I sculpt sounds using <span className="text-zinc-900 font-semibold">Serum</span> and <span className="text-zinc-900 font-semibold">Nexus</span> for electronic production, and <span className="text-zinc-900 font-semibold">Kontakt</span> libraries for orchestral and classical arrangements.
                </p>
                <p>
                  Beyond the DAW, I play the <span className="text-zinc-900 font-semibold">piano</span> and <span className="text-zinc-900 font-semibold">guitar</span> — instruments that keep me rooted in raw musicality and inform everything I produce, from intimate acoustic sketches to full cinematic battle scores.
                </p>
                <p>
                  Make sure to check out some of my <span className="text-zinc-900 font-bold">samples</span> by scrolling below!
                </p>
              </div>
            </motion.div>
          </section>

          {/* Featured Genres Section */}
          <section
            id="genres"
            className="min-h-screen w-full flex flex-col justify-center snap-start my-20 py-20 pb-40 border-t border-purple-500/10 relative"
          >
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-black mb-10 flex items-center gap-4">
                <Mic2 size={32} className="text-purple-600" />
                Featured Genres
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Waltz",
                    desc: "Sweeping, orchestral ¾ time signatures blending classical elegance with dark acoustic atmospheres.",
                    route: "/music/waltz",
                    color: "from-blue-100 to-sky-100",
                    badge: "Acoustic"
                  },
                  {
                    title: "Synthwave",
                    desc: "Nostalgic 80s analog synthesizers paired with driving, retro-futuristic drum machine grooves.",
                    route: "/music/synthwave",
                    color: "from-purple-100 to-fuchsia-100",
                    badge: "Analog"
                  },
                  {
                    title: "Battle Soundtracks",
                    desc: "Intense, cinematic scoring featuring massive brass, tight percussion, and adrenaline-inducing themes.",
                    route: "/music/battle-soundtracks",
                    color: "from-red-100 to-rose-100",
                    badge: "Orchestral"
                  },
                  {
                    title: "Electronic",
                    desc: "Modern digital synthesis featuring deep sub-basses, crisp sonics, and immaculate sound design.",
                    route: "/music/electronic",
                    color: "from-zinc-100 to-zinc-200",
                    badge: "Digital"
                  },
                  {
                    title: "Fusion",
                    desc: "Genre-defying sonic experiments merging world instruments with modern production techniques.",
                    route: "/music/fusion",
                    color: "from-amber-100 to-orange-100",
                    badge: "Hybrid"
                  },
                  {
                    title: "Acoustic",
                    desc: "Raw, intimate performances captured with warmth — fingerpicked strings and natural resonance.",
                    route: "/music/acoustic",
                    color: "from-emerald-100 to-green-100",
                    badge: "Organic"
                  },
                  {
                    title: "Anime",
                    desc: "High-energy opening themes and emotional ballads inspired by Japanese animation scoring.",
                    route: "/music/anime",
                    color: "from-pink-100 to-rose-100",
                    badge: "Mixed"
                  },
                  {
                    title: "Orchestral",
                    desc: "Full symphonic arrangements with sweeping strings, bold brass, and thunderous timpani.",
                    route: "/music/orchestral",
                    color: "from-indigo-100 to-violet-100",
                    badge: "Classical"
                  },
                  {
                    title: "Legacy Stuff",
                    desc: "Archived experiments and early explorations from the formative years of the sonic journey.",
                    route: "/music/legacy-stuff",
                    color: "from-teal-100 to-cyan-100",
                    badge: "Archive"
                  },
                ].map((genre, i) => {
                  const isFading = transitioningGenre && transitioningGenre !== genre.badge;
                  const isTransitioning = transitioningGenre === genre.badge;

                  return (
                    <motion.div
                      key={i}
                      onClick={() => handleGenreClick(genre.route, genre.badge)}
                      animate={{ opacity: isFading ? 0 : 1, scale: isFading ? 0.9 : 1 }}
                      transition={{ duration: 0.5 }}
                      className={`block p-8 rounded-3xl bg-gradient-to-br ${genre.color} border border-white/50 shadow-sm transition-all group ${isTransitioning ? 'shadow-2xl -translate-y-2 z-50 relative' : 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'}`}
                    >
                      <div className="flex justify-between items-start mb-12">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-zinc-800 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                          <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 bg-white/50 px-3 py-1 rounded-full">{genre.badge}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-zinc-900">{genre.title}</h3>
                        <p className="text-zinc-600 font-medium leading-relaxed">{genre.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Sweep Transition Overlay */}
            <AnimatePresence>
              {transitioningGenre && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "100vh", opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                  className={`fixed bottom-0 left-0 right-0 z-[999] pointer-events-none origin-bottom ${transitioningGenre === 'Acoustic' ? 'bg-blue-600' :
                    transitioningGenre === 'Analog' ? 'bg-fuchsia-600' :
                      transitioningGenre === 'Orchestral' ? 'bg-rose-600' :
                        transitioningGenre === 'Hybrid' ? 'bg-amber-600' :
                          transitioningGenre === 'Organic' ? 'bg-emerald-600' :
                            transitioningGenre === 'Cinematic' ? 'bg-pink-600' :
                              transitioningGenre === 'Classical' ? 'bg-indigo-600' :
                                transitioningGenre === 'Archive' ? 'bg-teal-600' : 'bg-zinc-800'
                    }`}
                />
              )}
            </AnimatePresence>
          </section>

          {/* Experience / Timeline Section */}
          <section className="min-h-screen w-full flex flex-col justify-center snap-start py-20 border-t border-purple-500/10">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-black mb-10 flex items-center gap-4">
                <Speaker size={32} className="text-orange-500" />
                Experience
              </h2>
              <div className="space-y-6">
                {[
                  { year: "2023", title: "Freelance Composer", desc: "Composed interactive, adaptive soundtracks for personal and professional jobs such as radio stations and audio stories." },
                  { year: "2021", title: "Introduced to Kontakt libraries", desc: "Huge step in my music production journey." },
                  { year: "2019", title: "Opened Youtube Channel", desc: "Started uploading music covers and original compositions to Youtube." },
                  { year: "2018", title: "Introduced to Fruity Loops", desc: "This is where everything began." },
                ].map((exp, i) => (
                  <div key={i} className="flex gap-6 items-start p-6 rounded-2xl hover:bg-purple-50 transition-colors">
                    <div className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-200 text-5xl">
                      {exp.year}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold mb-2 text-zinc-800">{exp.title}</h3>
                      <p className="text-zinc-600 leading-relaxed font-medium">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

        </div>
      </motion.div>

      {/* Exit Transition Overlay */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-white z-[9999] origin-left pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
