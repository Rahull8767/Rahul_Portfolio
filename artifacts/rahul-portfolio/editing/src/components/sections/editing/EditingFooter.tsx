import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, Github, Instagram, Linkedin, Mail } from "lucide-react";

export function EditingFooter() {
  const [, setLocation] = useLocation();

  return (
    <section id="contact" className="pt-24 bg-[#050505] text-[#f4f4f5] flex flex-col border-t border-white/5 relative overflow-hidden">
      
      {/* Background Aurora */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[#e0aaff] opacity-[0.03] rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col pb-24 border-b border-white/10">
        
        {/* Status */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#e0aaff] uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e0aaff] animate-pulse" />
          Available for Work
        </div>

        {/* Headlines */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.9] mb-6 text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's Make<br/>
            <span className="text-gradient-accent">Something.</span>
          </motion.h2>
          <p className="text-slate-400 font-light text-base md:text-lg max-w-md">
            Have footage, a story, or an idea worth shaping? Let's talk.
          </p>
        </div>

        {/* Buttons / CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-start w-full max-w-lg mb-20">
          <a 
            href="mailto:tembharerahul28@gmail.com"
            className="w-full sm:w-auto glass-button-primary rounded-full px-8 py-4 text-xs font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-3 group"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto glass-button rounded-full px-8 py-4 text-white hover:bg-white/10 text-xs font-mono tracking-widest uppercase transition-colors"
          >
            Back to Top
          </button>
        </div>
        
        {/* Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-auto">
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest uppercase text-slate-400">
            <button onClick={() => setLocation("/software")} className="hover:text-white transition-colors">
              Software →
            </button>
            <button onClick={() => setLocation("/")} className="hover:text-[#e0aaff] transition-colors">
              Back to Main →
            </button>
          </div>

          <div className="flex items-center gap-6 text-slate-500">
            <a href="https://github.com/Rahull8767" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-white transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/rahultembhare/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0077b5]/20 hover:text-[#0077b5] hover:border-[#0077b5]/50 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/i.am_rahulllll/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:text-pink-500 hover:border-pink-500/50 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="mailto:tembharerahul28@gmail.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-white transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Tiny Bottom Bar */}
      <div className="container mx-auto px-6 md:px-12 py-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase">
        <div className="text-slate-400">Rahul Tembhare</div>
        <div className="hidden md:block">Video Editor / Visual Storyteller</div>
        <div>2026</div>
      </div>

    </section>
  );
}
