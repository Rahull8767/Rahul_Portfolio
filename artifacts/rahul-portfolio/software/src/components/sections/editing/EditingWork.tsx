import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { editingProjects } from "@/data/editing";

export function EditingWork() {
  const [, setLocation] = useLocation();
  const [activeProject, setActiveProject] = useState(editingProjects[0]);

  return (
    <section id="work" className="py-24 bg-[#050505] text-[#f4f4f5]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-12">
          <h2 className="text-sm font-mono tracking-widest uppercase text-slate-500">
            Selected Work
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* LARGE ACTIVE PREVIEW */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="w-full aspect-[4/3] md:aspect-video relative overflow-hidden bg-[#111] border border-white/10 group cursor-pointer" onClick={() => setLocation(`/editing/projects/${activeProject.slug}`)}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${activeProject.thumbnail})` }}
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              
              {/* Overlay CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="px-6 py-3 border border-white/20 bg-black/40 backdrop-blur-sm text-xs font-mono tracking-widest uppercase text-white">
                  View Project
                </div>
              </div>
            </div>
          </div>

          {/* COMPACT PROJECT LIST */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-start border-t border-white/10">
            {editingProjects.map((project, index) => (
              <div 
                key={project.id}
                onMouseEnter={() => setActiveProject(project)}
                onClick={() => setLocation(`/editing/projects/${project.slug}`)}
                className="group flex flex-col py-4 md:py-6 border-b border-white/10 cursor-pointer relative"
              >
                <div className="flex items-start justify-between w-full relative z-10">
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className={`text-xs font-mono transition-colors duration-300 ${activeProject.id === project.id ? 'text-fuchsia-400' : 'text-slate-600'}`}>
                      0{index + 1}
                    </span>
                    <h3 
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter transition-all duration-300 ${activeProject.id === project.id ? 'text-white translate-x-2' : 'text-slate-500 group-hover:text-white group-hover:translate-x-1'}`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  
                  <span className="text-[10px] font-mono text-slate-600 mt-1 hidden sm:block">
                    {project.year}
                  </span>
                </div>

                {/* Metadata Area */}
                <div 
                  className={`pl-[34px] md:pl-[54px] overflow-hidden transition-all duration-300 ${activeProject.id === project.id ? 'max-h-8 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                >
                  <div className="flex gap-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    <span>{project.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
