import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, FileText } from "lucide-react";
import { useLocation } from "wouter";

export function LandingPage() {
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isEntering, setIsEntering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleEnter = () => {
    setIsEntering(true);
    // Subtle transition time as requested (500-900ms)
    setTimeout(() => {
      setLocation("/portfolio");
    }, 800);
  };

  // Subtle parallax for the portrait
  const portraitX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const portraitY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden text-white font-sans flex flex-col items-center justify-center selection:bg-white/20"
      initial={{ background: "radial-gradient(circle at 50% 50%, rgba(20,20,25,1) 0%, rgba(10,15,24,1) 100%)" }}
      animate={{ background: "radial-gradient(circle at 50% 50%, rgba(120,0,100,0.15) 0%, rgba(10,15,24,1) 100%)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Background Atmosphere Elements */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,245,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div 
        className={`absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-1000 opacity-30`}
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
        }}
      />

      {/* Transition Overlay */}
      <AnimatePresence>
        {isEntering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute inset-0 z-50 pointer-events-none bg-fuchsia-500/10 backdrop-blur-md`}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Visual flare for transition */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] rounded-full blur-[150px] bg-fuchsia-400/20`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central Portrait (Focal Point) */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10">
        <motion.div 
          style={{ x: portraitX, y: portraitY }}
          className="relative w-[120%] sm:w-[90%] md:w-[60%] max-w-[800px] h-[75vh] md:h-[85vh] flex justify-center"
        >
          {/* Dynamic lighting behind portrait */}
          <motion.div 
            className="absolute inset-0 blur-3xl rounded-full transition-all duration-1000"
            animate={{ background: "linear-gradient(to top, rgba(232,121,249,0.15), transparent)" }}
          />
          <img 
            src={`${import.meta.env.BASE_URL}portrait.png`} 
            alt="Rahul Tembhare" 
            className="relative z-10 w-full h-full object-contain object-bottom filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{
              WebkitMaskImage: "linear-gradient(to top, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to top, black 80%, transparent 100%)"
            }}
          />
        </motion.div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-20 flex flex-col items-center justify-between h-full w-full py-12 md:py-16 px-6">
        
        {/* Top Section: Typography */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 1 }}
          className="flex flex-col items-center text-center mt-4 md:mt-8"
        >
          <h1 
            className="text-[10vw] md:text-[6vw] lg:text-[100px] font-bold italic tracking-tighter leading-none mb-4 drop-shadow-lg"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            RAHUL TEMBHARE
          </h1>
          <p className="text-xs md:text-sm tracking-[0.4em] text-slate-300 uppercase font-light mb-6">
            Engineer · Builder · Creator
          </p>
          <p className="text-sm md:text-base text-slate-400 font-light max-w-md mx-auto italic">
            "Building intelligent systems. Creating visual stories."
          </p>
        </motion.div>

        {/* Bottom Section: Enter CTA & Socials */}
        <div className="w-full max-w-5xl flex flex-col items-center gap-12 mt-auto">
          
          {/* Enter Button */}
          <motion.button
            onClick={handleEnter}
            disabled={isEntering}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className={`px-12 py-4 border text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-500/10 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded backdrop-blur-sm group flex flex-col items-center gap-2`}
          >
            <span className="relative z-10">
              ENTER CREATIVE
            </span>
            <div className={`h-[1px] w-0 group-hover:w-full transition-all duration-300 bg-fuchsia-400`} />
          </motion.button>

          {/* Social Icons */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-4 justify-center"
          >
            <a href="https://github.com/Rahull8767" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all backdrop-blur-md">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/rahultembhare/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all backdrop-blur-md">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/i.am_rahulllll/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all backdrop-blur-md">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="/resume/rahul-tembhare-resume.pdf" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all backdrop-blur-md">
              <FileText className="w-4 h-4" />
            </a>
            <a href="mailto:tembharerahul28@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all backdrop-blur-md">
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
          
        </div>
      </div>
    </motion.section>
  );
}
