import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Brain, 
  Sparkles, 
  Languages, 
  Users, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Sun, 
  Moon, 
  ArrowRight, 
  FileText, 
  CheckCircle, 
  Quote, 
  Heart,
  ExternalLink,
  ChevronRight,
  Info,
  Download,
  Menu,
  X,
  Github,
  ArrowUp,
  Volume2,
  VolumeX,
  Copy
} from "lucide-react";

import { personalInfo } from "./data";
import AmbientBackground from "./components/AmbientBackground";
import ScrollParticles from "./components/ScrollParticles";
import NeuralCanvas from "./components/NeuralCanvas";
import ResearchSandbox from "./components/ResearchSandbox";
import PublicationsList from "./components/PublicationsList";
import AcademicTimeline from "./components/AcademicTimeline";
import EducationSpiral from "./components/EducationSpiral";
import GenerativeArt from "./components/GenerativeArt";
import { TechnicalSkills } from "./components/TechnicalSkills";
import MagneticCursor from "./components/MagneticCursor";
import Loader from "./components/Loader";
import trustImg from "./assets/images/computational_trust_magazine_1783364483351.jpg";
import networkImg from "./assets/images/network_topology_magazine_1783392429129.jpg";
import ganEthicsImg from "./assets/images/gan_ethics_magazine_1783392443859.jpg";
import brainComputerImg from "./assets/images/brain_computer_magazine_1783364500004.jpg";
import nlpReasoningImg from "./assets/images/nlp_reasoning_magazine_1783392458260.jpg";
import rlApplicationsImg from "./assets/images/rl_applications_magazine_1783392472442.jpg";

import SEO from "./components/SEO";

const darkPublications = [
  {
    image: trustImg,
    title: "Computational Trust & Agent Dynamics",
    subtitle: "Simulating Multi-Agent reinforcement learning under noisy environments"
  },
  {
    image: networkImg,
    title: "Network Topology & Graph Neural Networks",
    subtitle: "Decoding structural complexities in multi-layered AI architectures"
  },
  {
    image: ganEthicsImg,
    title: "GANs & Ethical Constraints",
    subtitle: "Balancing creativity and constraint in machine learning"
  }
];

const lightPublications = [
  {
    image: brainComputerImg,
    title: "Brain-Computer Interface Design",
    subtitle: "Mapping cognitive states and language retrieval dynamics"
  },
  {
    image: nlpReasoningImg,
    title: "NLP & Contextual Reasoning",
    subtitle: "Exploring attention mechanisms in large language models"
  },
  {
    image: rlApplicationsImg,
    title: "Reinforcement Learning Realities",
    subtitle: "Optimizing real-world complex systems with deep Q-networks"
  }
];

function SectionDivider({ isDark }: { isDark: boolean }) {
  return (
    <motion.div 
      className="w-full flex justify-center py-8"
      initial={{ opacity: 0, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
        className={`h-px w-2/3 max-w-3xl ${isDark ? "bg-gradient-to-r from-transparent via-white/20 to-transparent" : "bg-gradient-to-r from-transparent via-black/20 to-transparent"}`} 
      />
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeCanvasTask, setActiveCanvasTask] = useState<string>("resting");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  // Audio refs
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const noiseNodeRef = React.useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (noiseNodeRef.current) {
        noiseNodeRef.current.stop();
        noiseNodeRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsAudioPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 2; // 2 seconds of buffer
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Generate brown noise
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // (roughly) compensate for gain
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const gain = ctx.createGain();
      gain.gain.value = 0.05; // Soft volume

      noise.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noiseNodeRef.current = noise;
      gainNodeRef.current = gain;

      setIsAudioPlaying(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex(prev => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * darkPublications.length);
        } while (nextIndex === prev && darkPublications.length > 1);
        return nextIndex;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync theme with DOM body classes for elegant global styling transitions
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!document.startViewTransition) {
      setTheme(prev => prev === "dark" ? "light" : "dark");
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add("is-changing-theme");

    const transition = document.startViewTransition(() => {
      setTheme(prev => prev === "dark" ? "light" : "dark");
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove("is-changing-theme");
    });
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const isDark = theme === "dark";

  return (
    <>
      <SEO />
      {isLoading && <Loader onComplete={() => setIsLoading(false)} isDark={isDark} />}
      <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-black/10 selection:text-current ${
        isDark 
          ? "bg-[#0B0F19] text-[#F7F7F7]" 
          : "bg-[#F2F2F2] text-[#2D2D2D]"
      }`}>
      <MagneticCursor />
      <AmbientBackground isDark={isDark} />
      <ScrollParticles isDark={isDark} />
      
      {/* 1. HEADER & CAPSULE NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 pt-6">
        {/* Scroll Progress Bar */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 z-50 ${isDark ? "bg-white/60 backdrop-blur-md" : "bg-[#121212]"}`}
          style={{ scaleX, transformOrigin: "0%" }}
        />
        <div className={`relative z-50 mx-auto flex items-start justify-between transition-all duration-300 pb-6 border-b ${
          isDark 
            ? "border-white/10" 
            : "border-black/5"
        }`}>
          {/* Logo / Brand Name */}
          <div className="flex flex-col">
            <a href="#hero" className="text-sm font-semibold tracking-tighter uppercase">
              George Okello
            </a>
            <span className="text-[10px] opacity-60 uppercase tracking-[0.2em] mt-0.5">Computational Researcher</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.25em] font-medium">
            {[
              { label: "About", href: "#about" },
              { label: "Lab Sandbox", href: "#sandbox" },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Chronicle", href: "#chronicle" },
              { label: "Creative", href: "#creative" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:opacity-70 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons (Theme and Contact) */}
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] font-medium">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`hover:opacity-70 transition-opacity p-1.5 rounded-full ${isAudioPlaying ? (isDark ? 'bg-white/10' : 'bg-black/5') : ''}`}
              title="Toggle Ambient Noise"
            >
              {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-50" />}
            </button>

            {/* Theme toggler */}
            <button
              onClick={toggleTheme}
              className="hover:opacity-70 transition-opacity uppercase"
              title="Toggle Neural Mode"
              id="theme-toggle-btn"
            >
              {isDark ? "Light" : "Dark"}
            </button>

            {/* Quick Contact Link */}
            <a
              href="mailto:georgeokelloouma@gmail.com"
              className="hidden md:block hover:opacity-70 transition-opacity uppercase"
              id="navbar-contact-btn"
            >
              Contact
            </a>

            <button 
              className="md:hidden hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className={`md:hidden fixed inset-0 z-40 flex flex-col pt-32 px-8 ${
                isDark ? "bg-[#0B0F19]" : "bg-[#FAFAF9]"
              }`}
            >
              <div className="flex flex-col gap-8 text-3xl font-serif tracking-tight">
                {[
                  { label: "About", href: "#about" },
                  { label: "Lab Sandbox", href: "#sandbox" },
                  { label: "Portfolio", href: "#portfolio" },
                  { label: "Chronicle", href: "#chronicle" },
                  { label: "Creative", href: "#creative" }
                ].map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.05), duration: 0.4 }}
                    key={link.label}
                    href={link.href}
                    className="hover:opacity-60 transition-opacity block border-b border-current/10 pb-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto mb-12 flex flex-col gap-6"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-50">Say Hello</div>
                <div className="flex flex-col gap-1 w-full">
                  <a
                    href="mailto:georgeokelloouma@gmail.com"
                    className="text-sm font-mono tracking-wider flex items-center justify-between hover:opacity-70 transition-opacity border-current/10 pb-4 border-b w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" /> 
                      <span className="truncate">georgeokelloouma@gmail.com</span>
                    </div>
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("georgeokelloouma@gmail.com");
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }}
                    className="flex items-center justify-between text-sm font-mono tracking-wider hover:opacity-70 transition-opacity border-current/10 py-4 border-b w-full text-left"
                  >
                    <div className="flex items-center gap-3 text-xs opacity-80">
                      {copiedEmail ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copiedEmail ? "Copied to clipboard" : "Copy email address"}
                    </div>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. DYNAMIC HERO SECTION */}
      <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 overflow-hidden">
        {/* Background interactive Canvas */}
        <div className="absolute inset-0 z-0">
          <NeuralCanvas theme={theme} activeTask={activeCanvasTask} />
          {/* Subtle gradient overlays to keep text readable */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
            isDark 
              ? "bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/85 to-[#0B0F19]/15" 
              : "bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9]/90 to-[#FAFAF9]/15"
          }`} />
        </div>

        {/* Content container */}
        <div className="px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
          
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Display name */}
              <h1 className="text-6xl md:text-[140px] font-bold leading-[0.82] tracking-[-0.04em] uppercase mb-10">
                G.OKELLO<br/>
                <span className="ml-12 md:ml-20 flex items-center text-4xl md:text-[80px]">
                  <span className={`hidden md:block w-32 h-[1px] mr-8 ${isDark ? "bg-white/60 backdrop-blur-md" : "bg-[#121212]"}`}></span>
                  RESEARCHER
                </span>
              </h1>

              {/* Academic description */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pt-12">
                <p className="text-lg leading-snug max-w-[280px] font-light opacity-90">
                  Deciphering the algorithmic foundations of thought by intersecting <strong className="font-medium">machine learning</strong> with <strong className="font-medium">neural architectures</strong>.
                </p>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 border rounded-full text-[10px] uppercase tracking-widest ${isDark ? "border-[#F7F7F7]" : "border-[#121212]"}`}>Research</span>
                  <span className={`px-3 py-1 border rounded-full text-[10px] uppercase tracking-widest ${isDark ? "border-[#F7F7F7]" : "border-[#121212]"}`}>Computational Modelling</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2"
            >
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl border ${isDark ? "bg-slate-950/40 border-slate-850" : "bg-white border-slate-200"}`}>
                  <Brain className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Focus Region</div>
                  <div className="text-xs font-sans font-medium text-slate-400">EEG / Cognitive State</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl border ${isDark ? "bg-slate-950/40 border-slate-850" : "bg-white border-slate-200"}`}>
                  <Languages className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Bilingual Dynamics</div>
                  <div className="text-xs font-sans font-medium text-slate-400">ACC Switch Trajectory</div>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                <div className={`p-2 rounded-xl border ${isDark ? "bg-slate-950/40 border-slate-850" : "bg-white border-slate-200"}`}>
                  <Users className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Multi-Agent RL</div>
                  <div className="text-xs font-sans font-medium text-slate-400">Social Trust Models</div>
                </div>
              </div>
            </motion.div>

            {/* Core CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 pt-12"
            >
              <a
                href="#sandbox"
                className={`px-6 py-3 border rounded-full text-[10px] uppercase tracking-widest transition-all ${
                  isDark
                    ? "border-[#F7F7F7] hover:bg-white/60 backdrop-blur-md hover:text-[#121212]"
                    : "border-[#121212] hover:bg-[#121212] hover:text-[#F7F7F7]"
                }`}
                id="hero-sandbox-cta"
              >
                Launch Sandbox Lab
              </a>
              <a
                href="#portfolio"
                className={`px-6 py-3 border rounded-full text-[10px] uppercase tracking-widest transition-all ${
                  isDark
                    ? "border-white/20 hover:border-white"
                    : "border-black/20 hover:border-black"
                }`}
                id="hero-portfolio-cta"
              >
                View Selected Papers
              </a>
            </motion.div>
          </div>

          {/* Hero Visual side representation */}
          <div className="lg:col-span-4 lg:col-start-9 hidden lg:block" style={{ perspective: "1000px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-img-${featuredIndex}-${isDark ? 'dark' : 'light'}`}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative aspect-square w-full rounded-3xl overflow-hidden border border-slate-800/20 shadow-2xl group"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Image representations matching George's work */}
                {isDark ? (
                  <>
                    <img
                      src={darkPublications[featuredIndex].image}
                      alt={darkPublications[featuredIndex].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[30000ms] ease-linear hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="text-[9px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full backdrop-blur-md">
                        FEATURED ISSUE
                      </span>
                      <h4 className="text-sm font-sans font-medium text-white mt-2">
                        {darkPublications[featuredIndex].title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {darkPublications[featuredIndex].subtitle}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={lightPublications[featuredIndex].image}
                      alt={lightPublications[featuredIndex].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[30000ms] ease-linear hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="text-[9px] font-mono text-orange-600 bg-orange-500/10 px-2 py-0.5 rounded-full font-semibold backdrop-blur-md">
                        FEATURED ISSUE
                      </span>
                      <h4 className="text-sm font-sans font-semibold text-slate-950 mt-2">
                        {lightPublications[featuredIndex].title}
                      </h4>
                      <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                        {lightPublications[featuredIndex].subtitle}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 3. ABOUT SECTION & RESEARCH INTERESTS */}
      <motion.section 
        id="about" 
        className="py-24 relative mt-12"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Biography */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-4xl font-serif italic tracking-tight">
                Current Obsession
              </h2>
              <p className="text-sm font-light opacity-90 leading-relaxed max-w-[400px]">
                {personalInfo.bio}
              </p>
              
              <div className={`p-6 border text-xs ${
                isDark ? "border-white/10 bg-black/40 backdrop-blur-md" : "border-black/5 bg-white/60 backdrop-blur-md"
              }`}>
                <div className="flex items-center gap-2 font-medium mb-3 uppercase tracking-widest text-[10px] opacity-70">
                  <Info className="w-3.5 h-3.5" />
                  Latest Research Scope
                </div>
                <p className="opacity-90 font-light leading-relaxed">
                  Currently evaluating lightweight attention transformers that map human EEG sequence metrics directly to simulated brain-computer interface (BCI) diagnostic pipelines.
                </p>
              </div>
            </div>

            {/* Research interests capsules & languages */}
            <div className="lg:col-span-6 space-y-12 flex flex-col justify-end">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest mb-6 opacity-70 italic">
                  Core Academic Domain Clusters
                </h4>
                <div className="flex flex-wrap gap-3">
                  {personalInfo.researchInterests.map((interest, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: idx % 2 === 0 ? 1.5 : -1.5,
                        y: -3,
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 10 
                      }}
                      className={`relative overflow-hidden cursor-pointer px-5 py-2 border rounded-full text-[10px] uppercase tracking-widest transition-colors duration-300 ${
                        isDark
                          ? "border-white/20 bg-black/20 backdrop-blur-md hover:border-orange-500/50 hover:bg-orange-500/30 hover:text-white"
                          : "border-black/20 bg-white/40 backdrop-blur-md hover:border-orange-600/50 hover:bg-orange-600/20 hover:text-black"
                      }`}
                    >
                      {/* Shine effect on hover */}
                      <motion.span 
                        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                        whileHover={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                      <span className="relative z-10">{interest}</span>
                    </motion.span>
                  ))}
                </div>
              </div>

{/* Languages */}
              <div className={`pt-8 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
                <h4 className="text-[10px] uppercase tracking-widest mb-6 opacity-70 italic">Languages Spoken</h4>
                <div className="space-y-3 max-w-md pl-8">
                  {personalInfo.languages.map((lang, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className={`font-medium ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                        {lang.name}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px] uppercase">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </motion.section>

      <SectionDivider isDark={isDark} />

      {/* 4. COGNITIVE SANDBOX SECTION */}
      <motion.section 
        id="sandbox" 
        className={`py-24 relative`}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 md:px-12 w-full">
          <ResearchSandbox theme={theme} onTaskChange={(task) => setActiveCanvasTask(task)} />
        </div>
      </motion.section>

      <SectionDivider isDark={isDark} />

      {/* 5. RESEARCH PORTFOLIO SECTION */}
      <motion.section 
        id="portfolio" 
        className={`py-24 relative`}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 md:px-12 w-full space-y-12">
          <div className="flex flex-col">
             <span className="text-[11px] uppercase tracking-widest opacity-60 italic mb-2">01 / Selected Works</span>
            <h2 className="text-4xl font-serif tracking-tight">
              Publications & Empirical Research
            </h2>
          </div>

          <PublicationsList theme={theme} />
        </div>
      </motion.section>

      <SectionDivider isDark={isDark} />

      {/* 5B. EDUCATION SPIRAL SECTION */}
      <motion.section 
        className={`relative`}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <EducationSpiral theme={theme} />
      </motion.section>

      <SectionDivider isDark={isDark} />

      {/* 6. CHRONICLE (TIMELINE) SECTION */}
      <motion.section 
        id="chronicle" 
        className={`py-24 relative`}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 md:px-12 w-full space-y-12">
          <div className="flex flex-col">
             <span className="text-[11px] uppercase tracking-widest opacity-60 italic mb-2">03 / Professional Experience</span>
            <h2 className="text-4xl font-serif tracking-tight">
              Chronological Journey
            </h2>
          </div>

          <AcademicTimeline theme={theme} />
        </div>
      </motion.section>

      <SectionDivider isDark={isDark} />

      {/* 7. TECHNICAL SKILLS SECTION */}
      <TechnicalSkills isDark={isDark} />

      <SectionDivider isDark={isDark} />

      {/* 8. CREATIVE CORNER (GENERATIVE FLOCKING SIMULATOR) */}
      <motion.section 
        id="creative" 
        className={`py-24 relative`}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 md:px-12 w-full space-y-12">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest opacity-60 italic mb-2">04 / Current Obsession</span>
            <h2 className="text-4xl font-serif tracking-tight">
              Fluid Systems Visualizer
            </h2>
            <p className="opacity-90 font-light max-w-2xl mt-4">
              Exploring complex adaptive systems, cellular automata, and swarm intelligence algorithms visually. Click inside the viewport to interact directly with the flocking agents.
            </p>
          </div>

          <GenerativeArt theme={theme} />
        </div>
      </motion.section>

      <SectionDivider isDark={isDark} />

{/* 9. CONTACT & FOOTER SECTION */}
      <motion.section 
        id="contact" 
        className={`mt-8 pt-16 pb-12 relative`}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 md:px-12 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
            <div className="space-y-6 max-w-xl">
              <span className="text-[11px] uppercase tracking-widest opacity-60 italic block">05 / Get In Touch</span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
                Let's Connect
              </h2>
              <p className="text-sm font-light opacity-70 max-w-sm leading-relaxed">
                Open to research collaborations and conversations exploring the computational boundaries of intelligence.
              </p>
            </div>

            {/* Big clickable email CTA */}
            <a
              href="mailto:georgeokelloouma@gmail.com"
              className="group inline-flex items-center gap-3 text-lg md:text-2xl font-light border-b pb-2 border-current/20 hover:border-current/60 transition-colors w-fit relative"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40 animate-ping"></span>
                <Mail className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity relative" />
              </div>
              <span>georgeokelloouma@gmail.com</span>
              <ArrowRight className="w-5 h-5 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          <div className={`h-px w-full ${isDark ? "bg-white/10" : "bg-black/10"} mb-8`} />

          <footer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-60">
              © {new Date().getFullYear()} George Okello
            </div>

            <div className="flex gap-10">
              <a
                href="https://georgyokesh112.artstation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-xs font-medium hover:opacity-70 transition-opacity"
              >
                ArtStation
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                <MapPin className="w-3 h-3 opacity-60" />
                {personalInfo.location}
              </div>
            </div>
          </footer>
        </div>
      </motion.section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg border transition-colors ${
              isDark 
                ? "bg-slate-900 border-slate-700 text-white hover:bg-slate-800" 
                : "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
            }`}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
    </>
  );
}
