"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Terminal, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { SiGithub, SiCplusplus, SiGmail, SiResearchgate, SiArduino, SiSolidity } from "react-icons/si";
import { FaLinkedin, FaJava, FaRust, FaReact, FaAngular } from "react-icons/fa";
import { TbBrandCSharp, TbBrandTypescript, TbBrandNextjs, TbSql } from "react-icons/tb";
import { BsFillLightningFill } from "react-icons/bs";
import { AiOutlinePython, AiOutlineDotNet } from "react-icons/ai";
import { DiMongodb } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";
import { DevBackground } from "@/components/Backgrounds";
import { GaseousDivider } from "@/components/GaseousDivider";
import { useAudio } from "@/components/AudioProvider";
import Footer from "@/components/Footer";

const LanguageCard = ({ lang, icon: IconComponent, glowColor, link }: { lang: string; icon: any; glowColor: string; link: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl border border-zinc-800 bg-zinc-950/70 transition-all duration-300"
        style={{
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgb(39, 39, 42)',
          backgroundColor: isHovered ? 'rgba(24, 24, 27, 0.95)' : 'rgba(9, 9, 11, 0.7)',
          boxShadow: isHovered ? `0 0 30px ${glowColor}` : 'none'
        }}
      >
        {IconComponent ? (
          <IconComponent size={28} style={{ color: isHovered ? glowColor : 'white', transition: 'color 300ms' }} />
        ) : (
          <div
            className="w-8 h-8 rounded bg-zinc-700/50 flex items-center justify-center text-xs font-semibold transition-all duration-300"
            style={{
              color: isHovered ? glowColor : 'rgb(161, 161, 170)',
              backgroundColor: isHovered ? `${glowColor}20` : 'rgba(113, 113, 122, 0.5)'
            }}
          >
            {lang.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="text-xs font-semibold text-white text-center">{lang}</span>
    </a>
  );
};

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
  const [canHover, setCanHover] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const previousAudioState = useRef<string | null>(null);
  const { setAudioState, audioState } = useAudio();
  const router = useRouter();
  const age = calculateAge("27.06.2003");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMuteToggle = () => {
    if (!isMuted) {
      previousAudioState.current = audioState;
      setAudioState("silent");
    } else {
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
    { id: "highschool", title: "ISC", institution: "Don Bosco, Bandel", year: "2019 - 2021", image: "/images/dbb.jpg", gpa: "85.25%" },
    { id: "school", title: "ICSE", institution: "Don Bosco, Bandel", year: "2009 - 2019", image: "/images/dbb_junior.JPG", gpa: "92.2%" }
  ];

  const ShimmerText = ({ children }: { children: React.ReactNode }) => {
    return (
      <span className="inline-block font-semibold animate-shimmer bg-clip-text text-transparent bg-[length:200%_100%] bg-[linear-gradient(110deg,#a1a1aa,35%,#fff,50%,#a1a1aa)]">
        {children}
      </span>
    );
  };

  useEffect(() => {
    setAudioState("full-dark");
  }, [setAudioState]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 768px)");
    const hoverMedia = window.matchMedia("(hover: hover)");

    const handleMediaChange = () => {
      setIsGlassVisible(media.matches);
      setCanHover(hoverMedia.matches);
    };

    handleMediaChange();
    media.addEventListener("change", handleMediaChange);
    hoverMedia.addEventListener("change", handleMediaChange);

    return () => {
      media.removeEventListener("change", handleMediaChange);
      hoverMedia.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Keyboard Scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;

      const scrollAmount = 100;
      switch (e.key) {
        case "ArrowDown":
          scrollContainerRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
          break;
        case "ArrowUp":
          scrollContainerRef.current.scrollBy({ top: -scrollAmount, behavior: "smooth" });
          break;
        case "PageDown":
          scrollContainerRef.current.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
          break;
        case "PageUp":
          scrollContainerRef.current.scrollBy({ top: -window.innerHeight * 0.8, behavior: "smooth" });
          break;
        case " ":
          e.preventDefault();
          scrollContainerRef.current.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-black text-zinc-300 font-[family-name:var(--font-inter)] selection:bg-white selection:text-black relative overflow-hidden">
      <DevBackground />
      <GaseousDivider
        hoveredSide={(isSidebarHovered || !isGlassVisible) ? "right" : null}
        variant="dev"
        align="right"
        className={`z-[1] transition-opacity duration-700 ease-in-out ${(isSidebarHovered || !isGlassVisible) ? 'opacity-70' : 'opacity-45'}`}>
      </GaseousDivider>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed right-0 top-0 bottom-0 w-16 max-md:w-14 z-50 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="absolute top-[-10%] bottom-[-10%] right-[-100px] w-[160px] rounded-[50%] bg-black/40 border-l border-white/5 shadow-[-20px_0_50px_rgba(255,255,255,0.05)] backdrop-blur-sm z-[-1] hidden md:block" />

        <button
          onClick={handleBackToPortal}
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`group flex flex-col items-center gap-6 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-auto cursor-pointer ${!isGlassVisible ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-zinc-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'}`} >
          <span style={{ writingMode: 'vertical-rl' }} >
            Back to portal
          </span>
          <ArrowRight size={20} className={`${isGlassVisible ? "rotate-0" : "rotate-90"} md:rotate-0 group-hover:translate-y-2 transition-transform duration-300 ${!isGlassVisible ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'}`} />
        </button>
      </motion.nav>

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

      <motion.div
        ref={scrollContainerRef}
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth overscroll-contain no-scrollbar relative z-10"
      >
        <div className="max-w-4xl mx-auto px-6 pr-20 relative z-10 w-full">

          <section className="min-h-screen w-full flex flex-col justify-start md:justify-center snap-start pt-10 md:pt-20 pb-20 md:pb-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="flex flex-col gap-1 mb-1">
                <button
                  id="mute-toggle"
                  onClick={handleMuteToggle}
                  className="flex w-fit items-center gap-2 px-3 py-1 mb-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-all duration-300 cursor-pointer">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isMuted ? "muted" : "unmuted"}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center"
                    >
                      {isMuted ? <VolumeX size={14} strokeWidth={2} /> : <Volume2 size={14} strokeWidth={2} />}
                    </motion.span>
                  </AnimatePresence>
                  {isMuted ? "Unmute" : "Mute"}
                </button>

                <div className="flex w-fit items-center gap-2 px-3 py-1 mb-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Currently Building Software
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2 relative leading-tight">
                Full Stack + AI <br className="md:hidden" /> Developer

                {/* The Icon Wrapper */}
                <span className="inline-block align-middle ml-4 text-zinc-800">
                  <Terminal
                    strokeWidth={2.5}
                    className="w-[1.2em] h-[1.2em] md:w-[1.1em] md:h-[1.1em]"
                  />
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-zinc-500 tracking-wide mb-4">
                Pinaki Pritam Singha
              </h2>

              <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.2em] text-zinc-600 uppercase mb-4">
                <span>{age} Yo</span>
                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                <span>He / Him</span>
                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                <span>Taurus</span>
              </div>

              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
                Building creative <ShimmerText>Full Stack Applications</ShimmerText> and <ShimmerText>AI Solutions</ShimmerText>, blending rigorous backend architecture with engaging, intuitive frontend experiences.
              </p>

              <div className="flex items-center gap-6 mb-8">
                <a href="https://github.com/PixMusicaX" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-all hover:-translate-y-1"><SiGithub size={20} /></a>
                <a href="https://www.linkedin.com/in/pinakipsingha/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-all hover:-translate-y-1"><FaLinkedin size={20} /></a>
                <a href="mailto:pinakipps21@gmail.com" className="text-zinc-500 hover:text-white transition-all hover:-translate-y-1"><SiGmail size={20} /></a>
                <a href="https://www.researchgate.net/profile/Pinaki-Singha-2" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-all hover:-translate-y-1"><SiResearchgate size={20} /></a>
                <a href="https://www.albdo.dev" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-all hover:-translate-y-1"><BsFillLightningFill size={20} /></a>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Go to:</span>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "About Me", id: "about" },
                    { label: "Projects", id: "projects" },
                    { label: "Experience", id: "experience" },
                    { label: "Education", id: "education" },
                    { label: "Resume", id: "resume", link: "/docs/Resume.pdf" }
                  ].map((section) => (
                    <motion.button
                      key={section.id}
                      whileHover={canHover ? { y: -2 } : {}}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        if (section.link) {
                          window.open(section.link, "_blank", "noopener,noreferrer");
                        } else {
                          const element = document.getElementById(section.id);
                          element?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 hover:border-zinc-600 transition-all duration-300 cursor-pointer leading-none"
                    >
                      {section.label}
                      {section.link && <ExternalLink size={10} className="opacity-50" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              onClick={() => {
                const aboutSection = document.getElementById('about');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 mix-blend-difference cursor-pointer hover:text-white transition-colors pointer-events-auto"
            >
              <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ChevronDown size={16} />
              </motion.div>
            </motion.div>
          </section>

          <section id="about" className="min-h-screen w-full flex flex-col justify-start md:justify-center snap-start py-20 border-t border-zinc-900/50 relative">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative z-10 w-full">
              <h2 className="text-2xl font-semibold text-white mb-8 border-b border-zinc-800 pb-4">About Me</h2>
              <div className="text-zinc-400 leading-relaxed space-y-6 text-lg max-w-3xl mb-10">
                <p>
                  I'm a developer focused on building <ShimmerText>Practical, Scalable Applications</ShimmerText> with a strong interest in <ShimmerText>AI-driven Systems</ShimmerText>. I have worked primarily with Python, JavaScript, and modern frameworks like React and FastAPI. 🙂‍↔️
                </p>

                <p>
                  Currently working with <ShimmerText>.NET and Angular</ShimmerText> on the Cloud at LTM, while exploring <ShimmerText>Rust</ShimmerText> for optimal performance and <ShimmerText>Next.js</ShimmerText> for amazing web designs. (like this one!) 😎
                </p>

                <p>
                  Work aside, I enjoy travelling, exploring new tech and music production. Putting inspirations into <ShimmerText>Real-World solutions</ShimmerText>. 🚀
                </p>

                <p>
                  Always open to <ShimmerText>like-minded individuals</ShimmerText> for work or just a chat. 🙂‍↕️
                </p>
              </div>

              <div className="max-w-3xl">
                <h3 className="text-xl font-medium text-white mb-4 border-b border-zinc-800 pb-4">Tools and Frameworks</h3>
                <div className="flex flex-wrap gap-6 mb-6">
                  {[
                    { name: 'Java', icon: FaJava, glowColor: 'rgba(249, 115, 22, 0.6)', link: 'https://www.java.com/en/' },
                    { name: 'Python', icon: AiOutlinePython, glowColor: 'rgba(234, 246, 59, 0.6)', link: 'https://www.python.org/' },
                    { name: 'C++', icon: SiCplusplus, glowColor: 'rgba(19, 55, 212, 0.6)', link: 'https://en.cppreference.com/w/' },
                    { name: 'C#', icon: TbBrandCSharp, glowColor: 'rgba(99, 42, 233, 0.6)', link: 'https://docs.microsoft.com/en-us/dotnet/csharp/' },
                    { name: 'Rust', icon: FaRust, glowColor: 'rgba(255, 255, 255, 0.6)', link: 'https://www.rust-lang.org/' },
                    { name: 'TypeScript', icon: TbBrandTypescript, glowColor: 'rgba(59, 130, 246, 0.6)', link: 'https://www.typescriptlang.org/' },
                    { name: 'React', icon: FaReact, glowColor: 'rgba(34, 211, 238, 0.6)', link: 'https://react.dev/' },
                    { name: 'Angular', icon: FaAngular, glowColor: 'rgba(239, 68, 68, 0.6)', link: 'https://angular.dev/' },
                    { name: 'NextJS', icon: TbBrandNextjs, glowColor: 'rgba(255, 255, 255, 0.6)', link: 'https://nextjs.org/' },
                    { name: '.NET', icon: AiOutlineDotNet, glowColor: 'rgba(168, 85, 247, 0.6)', link: 'https://dotnet.microsoft.com/' },
                    { name: 'Azure', icon: VscAzure, glowColor: 'rgba(59, 130, 246, 0.6)', link: 'https://azure.microsoft.com/en-in' },
                    { name: 'SQL', icon: TbSql, glowColor: 'rgba(234, 179, 8, 0.6)', link: 'https://www.w3schools.com/sql/sql_intro.asp' },
                    { name: 'MongoDB', icon: DiMongodb, glowColor: 'rgba(17, 243, 47, 0.6)', link: 'https://www.mongodb.com/' },
                    { name: 'Arduino', icon: SiArduino, glowColor: 'rgba(34, 197, 94, 0.6)', link: 'https://docs.arduino.cc/language-reference/' },
                    { name: 'Solidity', icon: SiSolidity, glowColor: 'rgba(168, 85, 247, 0.6)', link: 'https://www.soliditylang.org/' }
                  ].map((lang) => (
                    <LanguageCard key={lang.name} lang={lang.name} icon={lang.icon} glowColor={lang.glowColor} link={lang.link} />
                  ))}
                </div>
                <div className="h-px w-full bg-zinc-700/90 mt-3" />
              </div>
            </motion.div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen w-full flex flex-col justify-start md:justify-center snap-start py-20 border-t border-zinc-900/50 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-semibold text-white mb-12 border-b border-zinc-800 pb-4">
                Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    name: "Template-based Document Fraud Detection",
                    date: "Sep 2023 - Dec 2023",
                    role: "Machine Learning Engineer",
                    desc: "Fraud detection system presented at Smart India Hackathon 2023 Finals.",
                    problem: "Detecting forged or tampered documents is difficult due to variations in format, noise, and distortions.",
                    solution: "Built a computer vision pipeline using SIFT and brute-force matching, combined with preprocessing like de-skewing and OCR optimization. Used vector databases for fast similarity search.",
                    result: "Improved detection reliability and scalability, enabling faster verification across large datasets.",
                    tech: ["Python", "Computer Vision", "NLP", "OCR", "Vector DB"],
                    link: "https://github.com/Techtoniic/bajaj-ai-assistant-python"
                  },
                  {
                    name: "Derma-Prediction",
                    date: "Feb 2025 - Apr 2025",
                    role: "Full Stack AI Developer",
                    desc: "AI-powered skin condition assessment web app.",
                    problem: "Users lack accessible tools for early skin condition analysis without visiting specialists.",
                    solution: "Developed a full-stack app integrating ML image models and LLM insights using Hugging Face and Google Bard, with secure authentication and payments.",
                    result: "Delivered an end-to-end platform with real-time analysis; nominated for Springer Nature publication.",
                    tech: ["ReactJS", "Node.js", "MongoDB", "Hugging Face", "Magic SDK", "Razorpay"],
                    link: "https://github.com/PixMusicaX/Derma-Prediction"
                  },
                  {
                    name: "Online Exam Proctor",
                    date: "Sep 2024 - Nov 2024",
                    role: "AI / Python Developer",
                    desc: "AI-based remote exam monitoring system.",
                    problem: "Ensuring exam integrity in remote environments is difficult due to lack of supervision.",
                    solution: "Implemented real-time face and object detection using YOLOv8 with activity tracking and anomaly logging.",
                    result: "Enabled automated monitoring and flagging of suspicious behavior, reducing reliance on manual invigilation.",
                    tech: ["Python", "Flask", "OpenCV", "MongoDB", "YOLOv8", "AI"],
                    link: "https://github.com/PixMusicaX/The_Online_Proctor"
                  },
                  {
                    name: "Decentralized Voting System",
                    date: "Feb 2024 - Mar 2024",
                    role: "Blockchain Developer",
                    desc: "Blockchain-based secure voting platform.",
                    problem: "Traditional voting systems are vulnerable to tampering and lack transparency.",
                    solution: "Built Ethereum smart contracts with Solidity and integrated MetaMask for secure transactions and identity verification.",
                    result: "Created a tamper-proof, transparent voting system with verifiable transactions.",
                    tech: ["Solidity", "Ethereum", "Truffle", "MetaMask", "Node.js", "SQL"],
                    link: "https://github.com/PixMusicaX/Decentralized_Voting_System"
                  },
                ].map((project, i) => (
                  <div
                    key={i}
                    className="group flex flex-col h-full p-8 md:p-10 rounded-3xl bg-zinc-900/30 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-zinc-900/50 shadow-lg shadow-black/30 transition-all duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-semibold text-white tracking-tight pr-4 group-hover:text-white/90 transition">
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

                      <div className="mb-8 space-y-5 text-sm md:text-[15px] leading-relaxed">
                        {/* Problem */}
                        <div className="relative pl-4">
                          <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-red-400/70"></div>
                          <span className="text-zinc-500 font-medium">Problem</span>
                          <p className="text-zinc-300 mt-1">{project.problem}</p>
                        </div>

                        {/* Solution */}
                        <div className="relative pl-4">
                          <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-400/70"></div>
                          <span className="text-zinc-500 font-medium">Solution</span>
                          <p className="text-zinc-300 mt-1">{project.solution}</p>
                        </div>

                        {/* Result */}
                        <div className="relative pl-4">
                          <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-green-400/70"></div>
                          <span className="text-zinc-500 font-medium">Result</span>
                          <p className="text-zinc-300 mt-1">{project.result}</p>
                        </div>
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

          <section id="experience" className="min-h-screen w-full flex flex-col justify-start md:justify-center snap-start py-20 border-t border-zinc-900/50">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
              <h2 className="text-2xl font-semibold text-white mb-8 border-b border-zinc-800 pb-4">Work Experience</h2>
              <div className="space-y-12">
                {[
                  { role: "Software Engineer", company: "LTM", period: "Sep 2025 - Present", desc: "Architecting and engineering full-stack enterprise solutions in a hybrid environment.", skills: [".NET Core", "Microsoft Azure", "Angular"] },
                  { role: "Graduate Apprentice", company: "LTM", period: "Jun 2025 - Sep 2025", desc: "Trainee engineer focused on fundamental backend architectures and on-site agile development.", skills: [".NET"] },
                  { role: "AI Intern", company: "Kreat Inc.", period: "Jul 2024 - Feb 2025", desc: "Engineered scalable data scraping ecosystems and formulated advanced agentic architectures utilizing LLM function calling and RAG bridging seamlessly to the frontend.", skills: ["Python", "Prompt Engineering", "MongoDB", "RAG"] },
                ].map((job, i) => (
                  <div key={i} className="group relative pl-8 border-l border-zinc-800 hover:border-zinc-500 transition-colors">
                    <div className={`absolute w-3.5 h-3.5 rounded-full -left-[1.75px] top-1.5 inset-y-0 transform -translate-x-1/2 transition-all duration-300 border-2 ${job.company === "LTM" ? "border-orange-500 bg-orange-500/20 group-hover:bg-orange-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.8)]" : job.company === "Kreat Inc." ? "border-purple-500 bg-purple-500/20 group-hover:bg-purple-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]" : "border-zinc-600 bg-zinc-600/20 group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"}`} />
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold text-white transition-colors duration-300 ${job.company === "LTM" ? "group-hover:text-orange-400" : job.company === "Kreat Inc." ? "group-hover:text-purple-400" : "group-hover:text-indigo-400"}`}>{job.role}</h3>
                      <span className="text-sm font-mono text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">{job.period}</span>
                    </div>
                    <p className="text-zinc-300 font-medium mb-3">{job.company}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-4">{job.desc}</p>
                    {job.skills && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 text-[10px] uppercase tracking-widest font-mono rounded bg-black border border-zinc-800 text-zinc-400 group-hover:border-zinc-600 group-hover:text-zinc-300 transition-colors">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="education" className="min-h-screen w-full flex flex-col justify-start md:justify-center snap-start py-10 border-t border-zinc-900/50 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              /* 1. Added mx-auto to center the entire motion container */
              className="relative z-10 w-full max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold text-white mb-8 border-b border-zinc-800 pb-4">
                Education
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    onMouseEnter={() => setHoveredEdu(edu.id)}
                    onMouseLeave={() => setHoveredEdu(null)}
                    /* 3. The card will now fill the grid cells centered by the parent */
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

              {/* <section id="research" className="min-h-screen w-full flex flex-col justify-center snap-start py-20 border-t border-zinc-900/50 relative"> */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full"
              >
                <h2 className="text-2xl font-semibold text-white mt-8 mb-8 border-b border-zinc-800 pb-4">Research & Publications</h2>

                <div className="space-y-10">
                  {[
                    {
                      title: "Breast Cancer Detection Using Advanced Machine Learning Algorithms: A Comparative Analysis",
                      journal: "Conference Paper • Jul 2024",
                      date: "2024",
                      desc: "A comparative study analyzing various machine learning architectures for high-accuracy breast cancer detection.",
                      link: "https://www.researchgate.net/publication/382372766_Breast_Cancer_Detection_Using_Advanced_Machine_Learning_Algorithms_A_Comparative_Analysis",
                      tags: ["Machine Learning", "Healthcare", "Analysis"]
                    },
                    {
                      title: "A Correlative Survey on Imbalanced Breast Cancer Data Using Ensembled Oversampling Techniques and Deep Learning Algorithms",
                      journal: "Conference Paper • Feb 2024",
                      date: "2024",
                      desc: "Researching the impact of ensembled oversampling on imbalanced datasets to improve deep learning diagnostic reliability.",
                      link: "https://www.researchgate.net/publication/379494519_A_Correlative_Survey_on_Imbalanced_Breast_Cancer_Data_Using_Ensembled_Oversampling_Techniques_and_Deep_Learning_Algorithms",
                      tags: ["Deep Learning", "Oversampling", "Data Science"]
                    },
                    {
                      title: "IoT-based Fire Alarm: Design and Approach",
                      journal: "Article • Oct 2023",
                      date: "2023",
                      desc: "Designed an IoT-integrated fire alarm system leveraging sensor networks for real-time industrial and household safety.",
                      link: "https://www.researchgate.net/publication/374625842_IoT-based_Fire_Alarm_Design_and_Approach",
                      tags: ["IoT", "Embedded Systems", "Safety Tech"]
                    }
                  ].map((pub, i) => (
                    <div key={i} className="group relative pl-8 border-l border-zinc-800 hover:border-cyan-500/50 transition-colors">
                      {/* Timeline Dot */}
                      <div className="absolute w-3.5 h-3.5 rounded-full -left-[7px] top-1.5 transition-all duration-300 border-2 border-cyan-500 bg-cyan-500/20 group-hover:bg-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)]" />

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                        <div className="max-w-2xl">
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {pub.title}
                          </h3>
                          <p className="text-cyan-600/80 font-mono text-xs mt-1 uppercase tracking-wider">{pub.journal}</p>
                          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{pub.desc}</p>

                          {/* Added Tags rendering to match your data objects */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {pub.tags.map((tag) => (
                              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm font-mono text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
                            {pub.date}
                          </span>
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* </section> */}
            </motion.div>
          </section>

          <section className="snap-start py-1 flex flex-col items-center">
            <Footer variant="dev" />
          </section>

        </div>
      </motion.div >


      <AnimatePresence>
        {isExiting && (
          isGlassVisible ? (
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 bg-black z-[9999] origin-right pointer-events-none" />
          ) : (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "100vh", opacity: 1 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="fixed top-0 left-0 right-0 z-[9999] bg-black origin-top pointer-events-none" />
          )
        )}
      </AnimatePresence>
    </div>
  );
}