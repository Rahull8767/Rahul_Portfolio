import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Cpu, Database, Network, Box, LayoutTemplate, Globe } from "lucide-react";

export function SoftwareHero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#0a0f18]">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)"
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left Content */}
        <div className="flex-1 w-full max-w-2xl">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Currently Building: Advanced IoT Mesh Network
            </span>
          </motion.div>

          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            INDUSTRIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">IoT ENGINEER</span>
            <br />& FULL STACK <span className="text-slate-400">DEVELOPER</span>
          </motion.h1>

          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 mb-10 max-w-xl leading-relaxed font-light"
          >
            I build intelligent applications, connected systems and real-world solutions across software, AI and IoT.
          </motion.p>

          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f18] text-sm font-bold tracking-widest uppercase transition-colors"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/Rahull8767"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-sm font-bold tracking-widest uppercase transition-all"
            >
              GitHub
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Content - Technical Visualization */}
        <div className="flex-1 w-full relative h-[400px] lg:h-[600px] flex items-center justify-center">
          <TechnicalVisualization />
        </div>

      </div>
    </section>
  );
}

function TechnicalVisualization() {
  const nodes = [
    { id: 1, label: "AI", icon: Cpu, x: "20%", y: "20%", delay: 0 },
    { id: 2, label: "DATA", icon: Database, x: "50%", y: "15%", delay: 0.2 },
    { id: 3, label: "COMPUTER VISION", icon: Box, x: "80%", y: "30%", delay: 0.4 },
    { id: 4, label: "IoT", icon: Network, x: "25%", y: "60%", delay: 0.6 },
    { id: 5, label: "APPLICATION", icon: LayoutTemplate, x: "75%", y: "70%", delay: 0.8 },
    { id: 6, label: "REAL WORLD", icon: Globe, x: "50%", y: "85%", delay: 1.0 },
  ];

  return (
    <div className="relative w-full max-w-[500px] aspect-square">
      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const nextNode = nodes[i + 1];
          return (
            <motion.path
              key={`line-${node.id}`}
              d={`M ${node.x} ${node.y} L ${nextNode.x} ${nextNode.y}`}
              stroke="rgba(34, 211, 238, 0.2)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: node.delay, ease: "easeInOut" }}
            />
          );
        })}
        {/* Additional Cross Connections */}
        <motion.path d="M 20% 20% L 25% 60%" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} />
        <motion.path d="M 50% 15% L 75% 70%" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 1 }} />
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: node.delay }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
            style={{ left: node.x, top: node.y, zIndex: 10 }}
          >
            <div className="w-12 h-12 rounded-xl bg-[#0a0f18] border border-cyan-500/30 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/30 transition-colors" />
              <Icon className="w-5 h-5 text-cyan-400 relative z-10" />
              <div className="absolute inset-0 border border-cyan-400 rounded-xl animate-ping opacity-20 [animation-duration:3s]" />
            </div>
            <div className="px-3 py-1 rounded bg-[#0a0f18]/80 border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] font-mono tracking-widest text-slate-300 whitespace-nowrap">
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
