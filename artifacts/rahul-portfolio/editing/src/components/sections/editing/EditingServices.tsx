import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    title: "VIDEO EDITING",
    desc: "Long-form, YouTube, cinematic, and content-focused editing.",
    color: "from-[#e0aaff]/20 to-transparent"
  },
  {
    num: "02",
    title: "SHORT-FORM",
    desc: "Reels, Shorts, and fast-paced social content tailored for retention.",
    color: "from-[#9d4edd]/20 to-transparent"
  },
  {
    num: "03",
    title: "MOTION & VISUALS",
    desc: "Motion graphics, typography, transitions, and distinct visual treatments.",
    color: "from-[#e0aaff]/10 to-[#9d4edd]/10"
  }
];

export function EditingServices() {
  return (
    <section id="services" className="py-24 bg-[#050505] text-[#f4f4f5] border-t border-white/5 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-[#9d4edd] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-16 max-w-2xl">
          <h2 className="text-sm font-mono tracking-widest text-[#e0aaff] uppercase mb-4">
            Services
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            What I Can <span className="text-gradient-accent">Do</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((srv, idx) => (
            <motion.div 
              key={srv.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group flex flex-col glass-card rounded-[2rem] p-8 md:p-10 cursor-pointer transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${srv.color} hover:shadow-[0_0_30px_rgba(92,225,255,0.15)]`}
            >
              <div className="text-sm font-mono tracking-widest text-[#e0aaff] mb-8 group-hover:text-white transition-colors duration-300">
                {srv.num}
              </div>
              
              <h4 className="text-2xl font-bold uppercase tracking-tighter text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {srv.title}
              </h4>
              
              <p className="text-sm font-light text-slate-300 leading-relaxed mb-12">
                {srv.desc}
              </p>

              <div className="mt-auto flex items-center justify-between text-white/40 group-hover:text-[#e0aaff] transition-colors duration-300">
                <span className="text-[10px] font-mono tracking-widest uppercase">Explore</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#e0aaff]/50 group-hover:bg-[#e0aaff]/10 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
