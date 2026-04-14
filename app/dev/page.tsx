"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Code, Globe, Mail, ExternalLink, Terminal, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DevBackground } from "@/components/Backgrounds";
import { GaseousDivider } from "@/components/GaseousDivider";
import { useAudio } from "@/components/AudioProvider";

export const ResearchGateIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.37 12.83c.285 0 .541.026.765.076.224.05.439.132.645.241l1.245-2.031c-.53-.339-1.114-.582-1.748-.727-.636-.145-1.304-.218-2.003-.218-1.077 0-1.996.14-2.757.419-.76.277-1.393.684-1.897 1.218-.504.536-.889 1.192-1.155 1.97-.266.778-.398 1.666-.398 2.665 0 1.012.132 1.905.398 2.68.266.773.65 1.424 1.155 1.954.504.528 1.137.928 1.897 1.197.761.272 1.68.408 2.757.408 1.259 0 2.308-.186 3.149-.556v-3.418h-3.418v1.85h1.568v.81c-.267.106-.528.188-.785.244-.257.056-.554.084-.891.084-.57 0-1.047-.11-1.429-.333-.383-.222-.686-.532-.91-.933-.223-.4-.378-.865-.466-1.396-.088-.53-.131-1.096-.131-1.696 0-.61.043-1.171.131-1.683.088-.512.243-.96.466-1.346.224-.384.527-.68.91-.884.382-.204.859-.306 1.429-.306zM7.174 13.71c.365 0 .7.056 1.004.168.305.112.557.275.759.488.201.213.355.474.462.784.106.31.159.661.159 1.053 0 .393-.053.743-.159 1.052a2.31 2.31 0 0 1-.462.784 2.39 2.39 0 0 1-.759.488 2.8 2.8 0 0 1-1.004.168c-.366 0-.7-.056-1.004-.168a2.36 2.36 0 0 1-.76-.488 2.31 2.31 0 0 1-.461-.784 2.89 2.89 0 0 1-.159-1.052c0-.392.053-.744.159-1.053.107-.31.26-.571.461-.784a2.44 2.44 0 0 1 .76-.488c.304-.112.638-.168 1.004-.168z" />
  </svg>
);

const calculateAge = (birthDate: string) => {
  const [day, month, year] = birthDate.split('.').map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export default function DeveloperPage() {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [hoveredEdu, setHoveredEdu] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isGlassVisible, setIsGlassVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const previousAudioState = useRef<string | null>(null);
  const { setAudioState, audioState } = useAudio();
  const router = useRouter();
  const age = calculateAge("27.06.2003");

  const handleMuteToggle = () => {
    if (!isMuted) {
      // Muting: Save current state, then set to silent
      previousAudioState.current = audioState;
      setAudioState("silent");
    } else {
      // Unmuting: Restore previous state if it exists, otherwise default back to full-dark
      if (previousAudioState.current) {
        setAudioState(previousAudioState.current as any);
      } else {
        setAudioState("full-dark");
      }
    }
    setIsMuted(!isMuted);
  };

  const handleBackToPortal = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  const educationData = [
    { id: "college", title: "B.Tech in Computer Science", institution: "University of Engineering & Management, Kolkata", year: "2021 - 2025", image: "/images/UEM,_Kolkata.jpg", gpa: "8.4 CGPA" },
    { id: "school", title: "ICSE + ISC", institution: "Don Bosco, Bandel", year: "2009 - 2021", image: "/images/dbb.jpg", gpa: "92%" }
  ];

  useEffect(() => {
    setAudioState("full-dark");
  }, [setAudioState]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = () => setIsGlassVisible(media.matches);
    handleMediaChange();
    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <>

      <div className="min-h-[100dvh] bg-black text-zinc-300 font-[family-name:var(--font-inter)] selection:bg-white selection:text-black relative overflow-hidden">
        <DevBackground />

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="fixed right-0 top-0 bottom-0 w-16 max-md:w-14 max-md:right-2 z-50 flex flex-col items-center justify-center pointer-events-none"
        >



          <GaseousDivider
            hoveredSide={isSidebarHovered ? "right" : null}
            variant="dev"
            align="right"
            className={`z-[-2] transition-opacity duration-700 ease-in-out ${isSidebarHovered ? 'opacity-70' : 'opacity-45'}`}>
          </GaseousDivider>
          {/* Parabolic Light Leak — hidden on mobile to prevent content overlap */}
          <div className="absolute top-[-10%] bottom-[-10%] right-[-100px] w-[160px] rounded-[50%] bg-black/40 border-l border-white/5 shadow-[-20px_0_50px_rgba(255,255,255,0.05)] backdrop-blur-sm z-[-1] hidden md:block" />

          <button
            onClick={handleBackToPortal}
            onMouseEnter={() => setIsSidebarHovered(true)}
            onMouseLeave={() => setIsSidebarHovered(false)}
            className="group flex flex-col items-center gap-6 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 pointer-events-auto cursor-pointer" >
            <span style={{ writingMode: 'vertical-rl' }} >
              Back to portal
            </span>
            <ArrowRight size={20} className={`${isGlassVisible ? "rotate-0" : "rotate-90"} md:rotate-0 group-hover:translate-y-2 transition-transform duration-300 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]`} />
          </button>
        </motion.nav>

        {/* Global Ambient Graphic Institution Fader - Extracted strictly outside scrolling container physics */}
        <AnimatePresence>
          {hoveredEdu && (
            <motion.img
              key={hoveredEdu}
              src={educationData.find(e => e.id === hoveredEdu)?.image}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.2, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none z-[1] grayscale-[60%]"
              alt="Institution Graphic"
            />
          )}
        </AnimatePresence>

        {/* Global Scroll Viewport */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] relative"
        >

          <div className="max-w-4xl mx-auto px-6 pr-20 relative z-10 w-full">

            {/* Header Section */}
            <section className="min-h-screen w-full flex flex-col justify-center snap-start py-20 relative pb-32">
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
                {/* Mute Toggle — pill style, inline above status */}
                <button
                  id="mute-toggle"
                  onClick={handleMuteToggle}
                  className="flex w-fit items-center gap-2 px-3 py-1 mb-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-all duration-300 cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isMuted ? "muted" : "unmuted"}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center"
                    >
                      {isMuted ? <VolumeX size={12} strokeWidth={1.5} /> : <Volume2 size={12} strokeWidth={1.5} />}
                    </motion.span>
                  </AnimatePresence>
                  {isMuted ? "Unmute" : "Mute"}
                </button>
                <div className="inline-flex items-center gap-3 px-3 py-1 mb-6 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Currently Building Software
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2 flex items-center gap-4">
                  Software <br className="md:hidden" /> Developer <Terminal size={48} className="text-zinc-700 hidden md:block" />
                </h1>
                <h2 className="text-2xl md:text-3xl font-light text-zinc-500 tracking-wide mb-2">
                  Pinaki Pritam Singha
                </h2>
                
                <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.2em] text-zinc-600 uppercase mb-8">
                  <span>{age} Yo</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-800" />
                  <span>He / Him</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-800" />
                  <span>Tauros</span>
                </div>
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                Previously architecting intelligent solutions as an AI developer, I transitioned into engineering robust enterprise ecosystems using .NET and Angular. Currently, my focus is expanding into high-performance systems with Rust while crafting cinematic, modern web experiences in Next.js.
              </p>
                <div className="flex items-center gap-6 mt-8">
                  <a href="https://github.com/PixMusicaX" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" title="GitHub">
                    <Code size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/pinakipsingha/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" title="LinkedIn">
                    <Globe size={24} />
                  </a>
                  <a href="mailto:pinakipps21@gmail.com" className="text-zinc-500 hover:text-white transition-colors" title="Email">
                    <Mail size={24} />
                  </a>
                </div>

              {/* Scroll Indicator - Moved from fixed to absolute within header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2 text-zinc-600 mix-blend-difference"
              >
                <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <ChevronDown size={16} />
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* About Me Section integrated with Education Interactive Background */}
          <section className="min-h-screen w-full flex flex-col justify-center snap-start py-20 border-t border-zinc-900/50 relative">

            {/* Standard Z-10 Foreground Frame */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative z-10 w-full">
              <h2 className="text-2xl font-semibold text-white mb-8 border-b border-zinc-800 pb-4">About Me</h2>
              <div className="text-zinc-400 leading-relaxed space-y-6 text-lg max-w-3xl mb-16">
                <p>
                  I am a software engineer focused on building high-performance architectures and engaging user experiences. I thrive on bridging the gap between rigorous backend system orchestration and seamless, beautifully responsive frontend interfaces.
                </p>
                <p>
                  With a foundation deeply rooted in algorithmic efficiency and iterative component design, I enjoy decomposing massive, complex product requirements into highly scalable, cleanly maintainable source code.
                </p>
              </div>

              {/* Interactive Education Cards block */}
              <h3 className="text-xl font-medium text-white mb-6">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    onMouseEnter={() => setHoveredEdu(edu.id)}
                    onMouseLeave={() => setHoveredEdu(null)}
                    className="group p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:bg-zinc-800/80 transition-all duration-300 backdrop-blur-md cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2 relative">
                      <h4 className="text-lg font-medium text-white group-hover:text-green-400 transition-colors">{edu.title}</h4>
                      <span className="text-xs font-mono text-zinc-500 bg-black/50 px-2 py-1 rounded">{edu.year}</span>
                    </div>
                    <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors mb-4">{edu.institution}</p>
                    <div className="flex bg-black/40 w-fit px-3 py-1.5 rounded-md border border-white/5">
                      <span className="text-zinc-500 text-xs font-mono tracking-widest uppercase mr-2">Grade:</span>
                      <span className="text-white text-xs font-mono">{edu.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Experience Section */}
          <section className="min-h-screen w-full flex flex-col justify-center snap-start py-20 border-t border-zinc-900/50">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
              <h2 className="text-2xl font-semibold text-white mb-8 border-b border-zinc-800 pb-4">Work Experience</h2>
              <div className="space-y-12">
                {[
                  {
                    role: "Software Engineer",
                    company: "LTM",
                    period: "Sep 2025 - Present",
                    desc: "Architecting and engineering full-stack enterprise solutions in a hybrid environment.",
                    skills: [".NET Core", "Microsoft Azure", "Angular"]
                  },
                  {
                    role: "Graduate Apprentice",
                    company: "LTM",
                    period: "Jun 2025 - Sep 2025",
                    desc: "Trainee engineer focused on fundamental backend architectures and on-site agile development.",
                    skills: [".NET"]
                  },
                  {
                    role: "AI Intern",
                    company: "Kreat Inc.",
                    period: "Jul 2024 - Feb 2025",
                    desc: "Engineered scalable data scraping ecosystems and formulated advanced agentic architectures utilizing LLM function calling and RAG bridging seamlessly to the frontend.",
                    skills: ["Python", "Prompt Engineering", "MongoDB", "RAG"]
                  },
                ].map((job, i) => (
                  <div key={i} className="group relative pl-8 border-l border-zinc-800 hover:border-zinc-500 transition-colors">
                    <div className={`absolute w-3.5 h-3.5 rounded-full -left-[1.75px] top-1.5 inset-y-0 transform -translate-x-1/2 transition-all duration-300 border-2
                      ${job.company === "LTM" ? "border-orange-500 bg-orange-500/20 group-hover:bg-orange-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.8)]" : 
                        job.company === "Kreat Inc." ? "border-purple-500 bg-purple-500/20 group-hover:bg-purple-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]" : 
                        "border-zinc-600 bg-zinc-600/20 group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"}
                    `} />
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold text-white transition-colors duration-300
                        ${job.company === "LTM" ? "group-hover:text-orange-400" : 
                          job.company === "Kreat Inc." ? "group-hover:text-purple-400" : 
                          "group-hover:text-indigo-400"}
                      `}>{job.role}</h3>
                      <span className="text-sm font-mono text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">{job.period}</span>
                    </div>
                    <p className="text-zinc-300 font-medium mb-3">{job.company}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-4">{job.desc}</p>

                    {job.skills && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 text-[10px] uppercase tracking-widest font-mono rounded bg-black border border-zinc-800 text-zinc-400 group-hover:border-zinc-600 group-hover:text-zinc-300 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen w-full flex flex-col justify-center snap-start py-20 border-t border-zinc-900/50 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-semibold text-white mb-12 border-b border-zinc-800 pb-4">
                Projects
              </h2>

              {/* UPDATED CONTAINER HERE: flex for mobile, grid for desktop, consistent large gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    name: "Template-based Document Fraud Detection",
                    date: "Sep 2023 - Dec 2023",
                    role: "Machine Learning Engineer",
                    desc: "An advanced fraud detection system presented in the Smart India Hackathon Finals in 2023.",
                    highlights: [
                      "Utilized a Vector Database to store embeddings of data for faster computation and scalability.",
                      "Implemented Brute-Force Matching algorithm and Scale-Invariant Feature Transform (SIFT) for corner detectors in OpenCV.",
                      "Applied image processing techniques such as grayscale conversion, de-skewing, noise removal, and font adjustments for better OCR."
                    ],
                    tech: ["Python", "Computer Vision", "NLP", "OCR", "Vector DB"],
                    link: "https://github.com/Techtoniic/bajaj-ai-assistant-python"
                  },
                  {
                    name: "Derma-Prediction",
                    date: "Feb 2025 - Apr 2025",
                    role: "Full Stack AI Developer",
                    desc: "An AI-powered web application for skin condition assessment, utilizing image processing and machine learning techniques. Nominated for Publication on Springer Nature.",
                    highlights: [
                      "Implemented frontend using ReactJS and Chakra UI, and backend with Node.js, Express.js, and MongoDB.",
                      "Integrated Google Bard (LLM) and Hugging Face models for advanced image analysis and diagnosis.",
                      "Employed Magic SDK for secure, passwordless authentication and Razorpay API for payment processing."
                    ],
                    tech: ["ReactJS", "Node.js", "MongoDB", "Hugging Face", "Magic SDK", "Razorpay"],
                    link: "https://github.com/PixMusicaX/Derma-Prediction"
                  },
                  {
                    name: "Online Exam Proctor",
                    date: "Sep 2024 - Nov 2024",
                    role: "AI / Python Developer",
                    desc: "An AI-powered online proctoring system to monitor and ensure the integrity of remote examinations.",
                    highlights: [
                      "Implemented real-time face detection and object detection using YOLOv8 to identify unauthorized activities.",
                      "Designed and integrated activity logging to record and flag suspicious behaviors during exams.",
                      "Built the application using Python, with a web interface powered by Flask, and managed data with MongoDB."
                    ],
                    tech: ["Python", "Flask", "OpenCV", "MongoDB", "YOLOv8", "AI"],
                    link: "https://github.com/PixMusicaX/The_Online_Proctor"
                  },
                  {
                    name: "Decentralized Voting System",
                    date: "Feb 2024 - Mar 2024",
                    role: "Blockchain Developer",
                    desc: "A decentralized voting application utilizing Ethereum smart contracts to ensure secure, tamper-proof elections.",
                    highlights: [
                      "Developed smart contracts written in Solidity and deployed via the Truffle framework.",
                      "Integrated Node.js for backend logic and SQL for managing user and vote data.",
                      "Implemented MetaMask to facilitate secure transaction signing and identity verification on the client side."
                    ],
                    tech: ["Solidity", "Ethereum", "Truffle", "MetaMask", "Node.js", "SQL"],
                    link: "https://github.com/PixMusicaX/Decentralized_Voting_System"
                  },
                ].map((project, i) => (
                  <div
                    key={i}
                    className="group flex flex-col h-full p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:bg-zinc-900/80 transition-all duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-semibold text-white tracking-tight pr-4">
                          {project.name}
                        </h3>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all shrink-0"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-zinc-500 mb-6 font-mono">
                        <span>{project.role}</span>
                        <span className="text-zinc-700">•</span>
                        <span>{project.date}</span>
                      </div>

                      <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
                        {project.desc}
                      </p>

                      <div className="mb-8">
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                          Key Features & Impact
                        </h4>
                        <ul className="space-y-3">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start text-zinc-300 text-sm">
                              <span className="mr-3 text-zinc-600 mt-0.5">▹</span>
                              <span className="leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-zinc-800/50">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs font-mono rounded-lg bg-black border border-zinc-800 text-zinc-400 group-hover:border-zinc-600 group-hover:text-zinc-300 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
      </div>
    </motion.div >

      {/* Exit Transition Overlay */ }
      <AnimatePresence>
  {
    isExiting && (
      isGlassVisible ? (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-black z-[9999] origin-right pointer-events-none"
        />
      ) : (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "100vh", opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-black origin-bottom pointer-events-none"
        />
      )
    )
  }
        </AnimatePresence >
      </div >
    </>
  );
}