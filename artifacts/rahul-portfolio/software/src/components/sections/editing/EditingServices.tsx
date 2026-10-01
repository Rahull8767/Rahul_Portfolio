import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    title: "VIDEO EDITING",
    desc: "Long-form, YouTube, cinematic, and content-focused editing."
  },
  {
    num: "02",
    title: "SHORT-FORM",
    desc: "Reels, Shorts, and fast-paced social content tailored for retention."
  },
  {
    num: "03",
    title: "MOTION & VISUALS",
    desc: "Motion graphics, typography, transitions, and distinct visual treatments."
  }
];

export function EditingServices() {
  return (
    <section id="services" className="py-24 bg-[#050505] text-[#f4f4f5] border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            What I Can Do
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {SERVICES.map((srv, idx) => (
            <motion.div 
              key={srv.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col border-t border-white/10 pt-6 cursor-default hover:border-fuchsia-500/50 transition-colors duration-300"
            >
              <div className="text-[10px] font-mono tracking-widest text-slate-500 mb-6 group-hover:text-fuchsia-400 transition-colors duration-300">
                {srv.num}
              </div>
              
              <h3 className="text-2xl font-bold uppercase tracking-tighter text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {srv.title}
              </h3>
              
              <p className="text-sm font-light text-slate-400 leading-relaxed max-w-sm mb-8">
                {srv.desc}
              </p>

              <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/30 uppercase group-hover:text-fuchsia-400 transition-colors duration-300">
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
