import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, Github } from "lucide-react";

import { SoftwareNav } from "@/components/sections/software/SoftwareNav";
import { SoftwareHero } from "@/components/sections/software/SoftwareHero";
import { About } from "@/components/sections/About";
import { SoftwareProjects } from "@/components/sections/software/SoftwareProjects";
import { SoftwareExperience } from "@/components/sections/software/SoftwareExperience";
import { SoftwareGithub } from "@/components/sections/software/SoftwareGithub";

export function SoftwarePage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Scroll to top on mount to ensure starting at hero
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#050810] text-slate-300 font-sans overflow-x-hidden selection:bg-cyan-500/30"
    >
      <SoftwareNav />
      <SoftwareHero />
      <About />
      <SoftwareProjects />
      <SoftwareExperience />
      <SoftwareGithub />

      {/* Final CTA */}
      <section id="contact" className="py-32 border-t border-cyan-500/10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Have a problem<br/>worth building?
          </h2>
          <p className="text-xl text-slate-400 mb-12 font-light max-w-xl">
            Let's turn an idea into something that works.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="mailto:tembharerahul28@gmail.com"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f18] text-sm font-bold tracking-widest uppercase transition-colors w-full sm:w-auto"
            >
              Contact Me →
            </a>
            <a 
              href="#projects"
              className="px-8 py-4 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-sm font-bold tracking-widest uppercase transition-colors w-full sm:w-auto"
            >
              View Projects
            </a>
            <a 
              href="https://github.com/Rahull8767"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
