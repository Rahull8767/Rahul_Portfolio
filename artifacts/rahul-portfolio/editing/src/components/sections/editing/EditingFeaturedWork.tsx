import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { featuredWorks, FeaturedWorkItem } from "@/data/editing";

function ProjectCard({ project, onClick }: { project: FeaturedWorkItem; onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(containerRef, { amount: 0.6 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isTouch) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    } else {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isInView, isHovered, isTouch]);

  return (
    <div 
      className="flex flex-col gap-4 cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={() => !isTouch && setIsHovered(false)}
    >
      <div 
        ref={containerRef}
        className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 transition-transform duration-500 ease-out group-hover:scale-[1.02] group-hover:border-white/10"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] pointer-events-none z-20" />

        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 z-10"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
          <Play className="w-5 h-5 ml-1 text-white" fill="currentColor" />
        </div>
      </div>

      <div className="flex flex-col">
        <h4 className="text-[15px] sm:text-lg font-black uppercase tracking-tight text-white">{project.title}</h4>
        <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/50 mt-1">{project.category}</p>
      </div>
    </div>
  );
}

export function EditingFeaturedWork({ onProjectClick }: { onProjectClick: (p: any) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  return (
    <section id="work" className="mb-24 md:mb-32">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase">Featured Work</h3>
            <div className="h-px bg-white/20 w-16"></div>
          </div>
          <p className="text-white/50 text-sm">Selected visual work.</p>
        </div>
        
        <button className="text-xs font-bold tracking-[0.2em] uppercase text-[#a855f7] hover:text-white transition-colors flex items-center gap-2 group">
          View All Projects <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Carousel / Grid */}
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {featuredWorks.map((project) => (
            <div 
              key={project.id} 
              className="w-[75vw] sm:w-auto flex-none snap-start"
            >
              <ProjectCard 
                project={project} 
                onClick={() => onProjectClick({
                  title: project.title,
                  video: project.video,
                  aspectRatio: "aspect-[16/10]" // fallback for modal if needed
                })} 
              />
            </div>
          ))}
        </div>

        {/* Mobile subtle scroll indicator */}
        <div className="block sm:hidden w-16 h-1 bg-white/10 rounded-full mx-auto mt-2 overflow-hidden">
          <div 
            className="h-full bg-white/40 rounded-full transition-all duration-150 ease-out"
            style={{ width: '50%', transform: `translateX(${scrollProgress * 100}%)` }}
          />
        </div>
      </div>
    </section>
  );
}
