import { useState } from "react";
import { motion } from "framer-motion";

export function EngineerEditor() {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Dynamic Background Glow based on hover */}
      <div 
        className={`absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[100px] rounded-full transition-opacity duration-700 pointer-events-none ${hoverSide === "left" ? 'opacity-100' : 'opacity-0'}`}
      />
      <div 
        className={`absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 blur-[100px] rounded-full transition-opacity duration-700 pointer-events-none ${hoverSide === "right" ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Split Interaction Area */}
        <div className="w-full flex flex-col md:flex-row border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 relative">
          
          {/* Mobile vs VS indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-4 py-2 border border-white/10 rounded-full text-xs font-mono tracking-widest text-slate-500 z-10 hidden md:block">
            VS
          </div>

          {/* Left: ENGINEER */}
          <div 
            className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-center text-center group cursor-crosshair transition-colors duration-500"
            onMouseEnter={() => setHoverSide("left")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-slate-700 group-hover:text-cyan-400 transition-colors duration-500 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Engineer's Mind
            </h2>
            <div className={`flex flex-col gap-4 text-xs md:text-sm font-mono tracking-[0.3em] uppercase transition-all duration-500 ${hoverSide === "left" ? 'text-white opacity-100 translate-y-0' : 'text-slate-600 opacity-0 md:opacity-50 md:translate-y-4'}`}>
              <span>SYSTEMS</span>
              <span>PRECISION</span>
              <span>LOGIC</span>
              <span>AUTOMATION</span>
              <span>PROBLEM SOLVING</span>
            </div>
          </div>

          {/* Right: EDITOR */}
          <div 
            className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-center text-center group cursor-crosshair transition-colors duration-500"
            onMouseEnter={() => setHoverSide("right")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-slate-700 group-hover:text-fuchsia-400 transition-colors duration-500 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Editor's Eye
            </h2>
            <div className={`flex flex-col gap-4 text-xs md:text-sm font-mono tracking-[0.3em] uppercase transition-all duration-500 ${hoverSide === "right" ? 'text-white opacity-100 translate-y-0' : 'text-slate-600 opacity-0 md:opacity-50 md:translate-y-4'}`}>
              <span>TIMING</span>
              <span>STORY</span>
              <span>MOTION</span>
              <span>RHYTHM</span>
              <span>VISUAL IMPACT</span>
            </div>
          </div>
        </div>

        {/* Short Statement */}
        <div className="mt-16 max-w-2xl text-center space-y-2 text-base md:text-lg text-slate-400 font-light">
          <p>Most editors understand visuals.</p>
          <p>Most engineers understand systems.</p>
          <p className="text-white pt-2">I learned both.</p>
        </div>

      </div>
    </section>
  );
}
