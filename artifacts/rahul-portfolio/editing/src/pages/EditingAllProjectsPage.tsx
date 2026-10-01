import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useLocation } from "wouter";
import { featuredWorks } from "@/data/editing";
import { ProjectCard } from "@/components/sections/editing/EditingFeaturedWork";

export function EditingAllProjectsPage() {
  const [, setLocation] = useLocation();
  const [activeVideo, setActiveVideo] = useState<{title: string; video: string; aspectRatio?: string} | null>(null);

  const openVideoModal = (video: {title: string; video: string; aspectRatio?: string}) => {
    setActiveVideo(video);
    window.history.pushState({ videoModal: true }, "");
  };

  const closeVideoModal = () => {
    if (window.history.state?.videoModal) {
      window.history.back();
    } else {
      setActiveVideo(null);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (!window.history.state?.videoModal) {
        setActiveVideo(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideoModal();
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
    <div className="bg-[#050505] min-h-screen text-[#f4f4f5] font-sans selection:bg-[#8a2be2]/30 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 h-20 flex items-center px-6">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-wider text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </button>
      </header>

      {/* Main Grid */}
      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">All Projects</h1>
          <p className="text-white/50 text-sm md:text-base">A complete gallery of selected works, edits, and visual stories.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredWorks.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <ProjectCard project={project} onClick={() => openVideoModal(project)} />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-12"
            onClick={closeVideoModal}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors focus:outline-none bg-white/5 rounded-full backdrop-blur-md border border-white/10 z-50"
              onClick={closeVideoModal}
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`relative w-full max-h-[85vh] ${activeVideo.aspectRatio || 'aspect-[16/9] max-w-6xl'} bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10`}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeVideo.video}
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
