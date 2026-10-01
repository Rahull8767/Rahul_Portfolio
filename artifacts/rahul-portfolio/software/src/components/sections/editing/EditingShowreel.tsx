import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

export function EditingShowreel() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="showreel" className="relative w-full h-[100svh] min-h-[600px] bg-[#050505] overflow-hidden flex flex-col justify-end pt-24 pb-6 md:pb-12">
      
      {/* Background Cinematic Grain */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-between">
        
        {/* Headlines */}
        <motion.div 
          style={{ y, opacity }}
          className="w-full pt-12 md:pt-0"
        >
          <h1 
            className="text-[12vw] md:text-[8vw] lg:text-[110px] font-bold uppercase tracking-tighter leading-[0.85] text-[#f4f4f5] mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            CUT. MOVE.<br/>
            <span className="text-fuchsia-500 italic pr-4">FEEL.</span>
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-mono tracking-widest uppercase text-slate-400">
            <span>Video Editor</span>
            <span className="w-1 h-1 rounded-full bg-fuchsia-500" />
            <span>Visual Storyteller</span>
            <span className="w-1 h-1 rounded-full bg-fuchsia-500" />
            <span>Content Creator</span>
          </div>
        </motion.div>

        {/* Showreel Container */}
        <motion.div 
          className="w-full h-[40vh] md:h-[60vh] max-h-[600px] mt-8 relative group cursor-pointer"
        >
          {/* Frame Lines Metadata */}
          <div className="absolute -top-6 left-0 right-0 flex justify-between text-[10px] font-mono text-slate-500 tracking-widest uppercase">
            <span>SHOWREEL / 2026</span>
            <span>EDITED BY RAHUL TEMBHARE</span>
          </div>

          <div className="absolute inset-0 border border-white/10 overflow-hidden bg-[#111]">
            {/* Placeholder Image / Video */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a24] to-[#050505]" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 mix-blend-luminosity" />
            
            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 backdrop-blur-md bg-black/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-fuchsia-500/50 group-hover:bg-fuchsia-500/10 transition-all duration-500 ease-out">
                <Play className="w-6 h-6 md:w-8 md:h-8 ml-2 fill-white" />
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-white uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                PLAY SHOWREEL
              </div>
              <div className="text-[10px] font-mono tracking-widest text-white">
                01:32
              </div>
            </div>
            
            {/* Timeline track */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-white/20 w-full">
              <div className="h-full bg-fuchsia-500 w-0 group-hover:w-[15%] transition-all duration-1000 ease-out" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
