import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, Github, Instagram, Linkedin, Youtube, Mail } from "lucide-react";

export function EditingFooter() {
  const [, setLocation] = useLocation();

  return (
    <section id="contact" className="pt-24 bg-[#050505] text-[#f4f4f5] flex flex-col border-t border-white/5 relative overflow-hidden">
      
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-gradient-to-t from-[#050505] via-transparent to-[#050505] absolute inset-0 z-10" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2064&auto=format&fit=crop')] bg-cover bg-center" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col pb-24 border-b border-white/10">
        
        {/* Status */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-fuchsia-400 uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
          Available for Work
        </div>

        {/* Headlines */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.9] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's Make<br/>
            Something.
          </motion.h2>
          <p className="text-slate-400 font-light text-base md:text-lg max-w-md">
            Have footage, a story, or an idea worth shaping?
          </p>
        </div>

        {/* Buttons / CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-start w-full max-w-lg mb-16">
          <a 
            href="mailto:tembharerahul28@gmail.com"
            className="w-full sm:w-auto px-8 py-4 bg-[#f4f4f5] text-[#050505] text-xs font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-3 hover:bg-white group"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white hover:bg-white/5 text-xs font-mono tracking-widest uppercase transition-colors"
          >
            Watch Showreel
          </button>
        </div>
        
        {/* Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-auto">
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest uppercase">
            <button onClick={() => setLocation("/software")} className="hover:text-cyan-400 transition-colors">
              Software →
            </button>
            <button onClick={() => setLocation("/")} className="hover:text-cyan-400 transition-colors">
              Back to Main →
            </button>
          </div>

          <div className="flex items-center gap-6 text-slate-500">
            <a href="https://github.com/Rahull8767" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/rahultembhare/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/i.am_rahulllll/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="mailto:tembharerahul28@gmail.com" className="hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Tiny Bottom Bar */}
      <div className="container mx-auto px-6 md:px-12 py-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase">
        <div>Rahul Tembhare</div>
        <div className="hidden md:block">Video Editor / Visual Storyteller</div>
        <div>2026</div>
      </div>

    </section>
  );
}
