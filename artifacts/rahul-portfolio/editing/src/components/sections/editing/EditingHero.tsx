import { motion } from "framer-motion";
import { Download, ArrowRight, Play, Edit3 } from "lucide-react";

export function EditingHero() {
  const handleScrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]">
      {/* Cinematic Grain Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
        }}
      />
      
      {/* Background Aurora Orbs */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-[#9d4edd] opacity-[0.08] rounded-full blur-[150px] pointer-events-none animate-hero-breathe" />
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-[#ff6d00] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-32 pb-20">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl lg:text-[130px] font-bold uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-white block">RAHUL</span>
            <span className="text-gradient-accent block mt-2">TEMBHARE</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 font-light text-lg md:text-xl max-w-md leading-relaxed mb-10"
          >
            Crafting compelling visual stories, dynamic motion graphics, and cinematic experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <button 
              onClick={handleScrollToWork}
              className="glass-button-primary rounded-full px-8 py-3.5 text-sm font-medium tracking-wide flex items-center gap-2 group"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="/resume.pdf"
              download
              className="glass-button rounded-full px-8 py-3.5 text-sm font-medium tracking-wide flex items-center gap-2 text-white hover:text-[#e0aaff] hover:border-[#e0aaff]/50 transition-all"
            >
              Download Resume
              <Download className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-8 md:gap-16 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-3xl font-bold text-[#e0aaff] mb-1 font-mono">5+</div>
              <div className="text-xs text-slate-500 font-medium">Years Editing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#e0aaff] mb-1 font-mono">50+</div>
              <div className="text-xs text-slate-500 font-medium">Videos Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#e0aaff] mb-1 font-mono">100%</div>
              <div className="text-xs text-slate-500 font-medium">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Circular Image with Badges */}
        <div className="relative flex justify-center items-center lg:justify-end mt-12 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full p-1"
          >
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-br from-[#9d4edd]/20 to-[#ff6d00]/10 shadow-[0_0_100px_rgba(157,78,221,0.15)]" />
            
            {/* Inner Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#111]">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-700" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop')" }}
              />
            </div>

            {/* Floating Badge 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 -left-4 md:top-24 md:-left-12 glass-card rounded-2xl p-4 flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-full bg-[#e0aaff]/20 flex items-center justify-center text-[#e0aaff]">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">Visual</div>
                <div className="text-xs text-slate-400">Storytelling</div>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 -right-4 md:bottom-24 md:-right-8 glass-card rounded-2xl p-4 flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-full bg-[#ff6d00]/20 flex items-center justify-center text-[#ff6d00]">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">Seamless</div>
                <div className="text-xs text-slate-400">Transitions</div>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

