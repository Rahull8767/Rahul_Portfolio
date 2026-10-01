import { motion } from "framer-motion";

export function EditingAbout() {
  return (
    <section id="about" className="py-24 bg-[#050505] text-[#f4f4f5] border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        {/* Left Area: Text & Badges */}
        <div className="w-full lg:w-2/3">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-2 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              About Me
            </h2>
            <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
              The person behind the edits.
            </p>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl font-light text-slate-300 leading-relaxed max-w-3xl mb-12"
          >
            I'm Rahul — an engineer who thinks in systems and an editor who thinks in moments. I care about timing, rhythm, detail, and the small decisions that make a piece of content feel <span className="text-white font-medium italic">right</span>.
          </motion.p>

          <div className="flex flex-wrap gap-3">
            {["VIDEO EDITING", "MOTION", "SHORT FORM", "STORYTELLING"].map((badge) => (
              <span 
                key={badge} 
                className="px-3 py-1.5 border border-white/10 rounded-sm text-[10px] font-mono tracking-widest text-slate-400 bg-white/5"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right Area: Optional Photo / Visual */}
        <div className="w-full lg:w-1/3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-[3/4] md:aspect-square lg:aspect-[3/4] bg-[#111] border border-white/10 relative overflow-hidden"
          >
            {/* Using a high-quality placeholder image for now */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop')] bg-cover bg-center opacity-60 grayscale mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest text-white/50 uppercase">
              RT / 2026
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
