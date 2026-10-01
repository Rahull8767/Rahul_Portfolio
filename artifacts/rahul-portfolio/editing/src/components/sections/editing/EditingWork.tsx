import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { editingProjects } from "@/data/editing";
import { X, Play, ArrowRight, ArrowLeft } from "lucide-react";
import { EditingProject } from "@/types";

// Extracted ProjectCard for individual 3D tilt logic
function ProjectCard({ project, onClick }: { project: EditingProject, onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full h-full">
      <motion.div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-[9/16] rounded-[2rem] overflow-hidden glass-card cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0aaff]/70 transition-colors hover:border-[#e0aaff]/30 shadow-2xl"
      >
        {/* Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.thumbnail})` }}
        />
        {/* Vignette/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
        
        {/* Content - Translated forward in 3D space */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-1 drop-shadow-md" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {project.title}
          </h3>
          <div className="text-[10px] font-mono text-[#e0aaff] uppercase tracking-widest flex items-center justify-between">
            <span className="bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">{project.category}</span>
            <span className="text-white/80">{project.year}</span>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-[#e0aaff]/30 flex items-center justify-center text-white shadow-[0_0_30px_rgba(92,225,255,0.3)]">
            <Play className="w-6 h-6 ml-1 text-[#e0aaff]" fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function EditingWork() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<EditingProject | null>(null);

  const categories = ["All", ...new Set(editingProjects.map(p => p.category))];
  
  const filteredProjects = activeCategory === "All" 
    ? editingProjects 
    : editingProjects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    if (activeVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeVideo]);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-none pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap transition-all font-medium tracking-wide ${
              activeCategory === category 
                ? 'bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda]/50' 
                : 'bg-slate-800/30 text-slate-400 hover:text-slate-200 border border-slate-700/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="w-full"
            >
              <ProjectCard project={project} onClick={() => setActiveVideo(project)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <p className="mt-8 text-xs text-slate-500">
        Videos shown are edited by me exclusively to demonstrate my editing skills.
      </p>

      {/* Full Screen Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a192f]/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none bg-slate-800/50 rounded-full backdrop-blur-md border border-slate-700"
              onClick={() => setActiveVideo(null)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              className="w-full max-w-7xl aspect-video bg-[#0a192f] rounded-3xl overflow-hidden relative border border-slate-700 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {activeVideo.video ? (
                <video 
                  src={activeVideo.video} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 relative">
                  <div className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-xl saturate-200" style={{ backgroundImage: `url(${activeVideo.thumbnail})` }} />
                  <div className="relative z-10 flex flex-col items-center p-8 text-center bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700">
                    <Play size={48} className="mb-4 opacity-80 text-[#64ffda] drop-shadow-[0_0_15px_rgba(100,255,218,0.3)]" />
                    <p className="font-mono text-sm tracking-widest uppercase text-slate-300 mb-2">Video playback unavailable</p>
                    <p className="text-xs text-slate-500 max-w-sm">
                      A placeholder is currently shown because a video file wasn't provided for this specific project.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
