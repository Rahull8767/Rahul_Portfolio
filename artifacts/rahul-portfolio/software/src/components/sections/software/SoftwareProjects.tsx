import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, ScanFace, Layers, Network, Cpu, Bot } from "lucide-react";
import { useLocation } from "wouter";
import { softwareProjects } from "@/data/software";

const TECH_STACK = [
  { name: "AI / ML", icon: Brain },
  { name: "Computer Vision", icon: ScanFace },
  { name: "Full Stack", icon: Layers },
  { name: "IoT", icon: Network },
  { name: "Embedded Systems", icon: Cpu },
  { name: "Automation", icon: Bot }
];

export function SoftwareProjects() {
  const [, setLocation] = useLocation();
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(softwareProjects[0].id);

  const activeProject = softwareProjects.find(p => p.id === hoveredProjectId) || softwareProjects[0];

  return (
    <section id="projects" className="py-24 text-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12"
      >
        
        {/* Tech Stack / Capabilities */}
        <div className="mb-24">
          <h2 className="text-sm font-mono tracking-[0.2em] text-cyan-400 mb-8 uppercase">
            What I Build With
          </h2>
          <div className="flex flex-wrap gap-4">
            {TECH_STACK.map((tech) => (
              <div 
                key={tech.name}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 cursor-default hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <tech.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span className="text-sm font-medium tracking-wide text-slate-300 group-hover:text-white transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Builds Heading */}
        <div className="mb-12 border-b border-white/10 pb-8 flex items-end justify-between">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Selected Builds
          </h2>
        </div>

        {/* Project Browser */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 h-auto lg:h-[600px]">
          
          {/* List - Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-2">
            {softwareProjects.map((project, index) => {
              const isActive = hoveredProjectId === project.id;
              
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onClick={() => setLocation(`/software/projects/${project.slug}`)}
                  className={`group relative py-6 px-6 cursor-pointer border-l-2 transition-all duration-300 ${
                    isActive ? "border-cyan-400 bg-white/5" : "border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm text-slate-500 w-8">
                      0{index + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-colors ${isActive ? "text-cyan-400" : "text-white"}`} style={{ fontFamily: "'Clash Display', sans-serif" }}>
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 font-mono text-xs text-slate-400 uppercase tracking-wider">
                        <span>{project.category}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span className="truncate">{project.tech.slice(0, 2).join(" · ")}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-cyan-400 translate-x-0 opacity-100" : "text-slate-600 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Large Preview - Right Side */}
          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 hidden md:flex items-center justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-[#0a0f18] via-[#0a0f18]/40 to-transparent"
              >
                {/* Abstract Data Visualization Background for the active project */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(34,211,238,0.1) 0%, transparent 70%)`
                }}>
                  {/* Just some abstract shapes that change based on ID */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-500/30 rounded-full animate-spin-slow" />
                  <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-blue-500/20 rounded-full animate-reverse-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-[200px] font-bold text-white/[0.02] font-mono select-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    0{softwareProjects.findIndex(p => p.id === activeProject.id) + 1}
                  </div>
                </div>

                <div className="relative z-10">
                  <h4 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    {activeProject.title}
                  </h4>
                  <p className="text-slate-300 font-light mb-6 line-clamp-2">
                    {activeProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map(t => (
                      <span key={t} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-cyan-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
