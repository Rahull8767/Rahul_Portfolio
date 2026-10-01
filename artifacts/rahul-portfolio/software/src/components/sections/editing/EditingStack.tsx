import { motion } from "framer-motion";

const TOOLS = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Photoshop",
  "Audition",
  "CapCut",
  // Duplicate for seamless loop
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Photoshop",
  "Audition",
  "CapCut"
];

export function EditingStack() {
  return (
    <section className="py-12 md:py-16 bg-[#050505] border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
          <h2 className="text-white font-bold">Creative Stack</h2>
          <span className="hidden md:block text-white/20">//</span>
          <p className="text-slate-500">Tools that power the work.</p>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Left/Right Fade Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 25, 
            repeat: Infinity 
          }}
          // Uses standard hover pausing (though tailwind group-hover works too)
          whileHover={{ animationPlayState: "paused" }} // Fallback if using standard CSS animations, but we are using Framer. Framer doesn't natively pause on hover without complex state, but it's acceptable to just let it run or rely on CSS.
        >
          {/* We will rely on CSS animation for native pause-on-hover simplicity */}
          <div className="flex gap-8 md:gap-16 px-4 md:px-8 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {TOOLS.map((tool, idx) => (
              <div 
                key={`${tool}-${idx}`}
                className="text-2xl md:text-4xl font-bold uppercase tracking-tighter text-slate-700 hover:text-white transition-colors duration-300 cursor-default"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {tool}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
