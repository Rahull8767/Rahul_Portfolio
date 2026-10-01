import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function EditingHero() {
  const handleScrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="w-full min-h-[90svh] bg-[#050505] flex flex-col justify-end pt-24 pb-12 relative border-b border-white/5">
      
      {/* Background Cinematic Grain */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col h-full justify-between">
        
        {/* Top Text Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 md:mb-12 mt-8 md:mt-16">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10vw] md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-[#f4f4f5] mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              I build systems.<br/>
              I edit <span className="text-fuchsia-500 italic">stories.</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-mono tracking-widest uppercase text-slate-500 mb-6"
            >
              <span className="text-white">Video Editor</span>
              <span>//</span>
              <span className="text-white">Visual Storyteller</span>
              <span>//</span>
              <span className="text-white">Content Creator</span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 font-light text-sm md:text-base max-w-lg leading-relaxed"
            >
              Turning raw footage into purposeful visuals through editing, motion, rhythm and storytelling.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 min-w-[200px]"
          >
            <button 
              onClick={handleScrollToWork}
              className="px-6 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-mono font-bold tracking-widest uppercase transition-colors text-center w-full"
            >
              See My Work →
            </button>
            <button 
              onClick={handleScrollToAbout}
              className="px-6 py-4 border border-white/20 text-white hover:bg-white/5 text-xs font-mono font-bold tracking-widest uppercase transition-colors text-center w-full"
            >
              About Me
            </button>
          </motion.div>
        </div>

        {/* Massive Showreel Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full aspect-[4/3] md:aspect-[21/9] max-h-[60vh] relative group cursor-pointer overflow-hidden border border-white/10"
        >
          {/* Top Metadata */}
          <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] font-mono text-white/50 tracking-widest uppercase z-20 pointer-events-none">
            <span>SHOWREEL / 2026</span>
            <span className="hidden sm:inline">EDITED BY RAHUL TEMBHARE</span>
          </div>

          <div className="absolute inset-0 bg-[#050505]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-70 group-hover:scale-[1.02] transition-all duration-1000 mix-blend-luminosity" />
            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            
            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 backdrop-blur-md bg-black/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-fuchsia-500/50 group-hover:bg-fuchsia-500/10 transition-all duration-500 ease-out shadow-2xl">
                <Play className="w-6 h-6 md:w-8 md:h-8 ml-1 md:ml-2 fill-white" />
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white uppercase bg-black/40 px-3 py-1 backdrop-blur-sm rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                PLAY
              </div>
              <div className="text-[10px] font-mono tracking-widest text-white bg-black/40 px-3 py-1 backdrop-blur-sm rounded-sm">
                01:32
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
