import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { featuredProjects, FeaturedProject } from "@/data/software";
import { ProjectMedia } from "./ProjectMedia";

export function SoftwareProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress for the track
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Update active index based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      const idx = Math.round(latest * (featuredProjects.length - 1));
      setActiveIndex(Math.min(Math.max(idx, 0), featuredProjects.length - 1));
    }
  });

  // Horizontal translation for the project track (desktop only)
  // 4 projects -> 3 steps. Each step is exactly -100vw. Total width = 400vw.
  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${100 * (featuredProjects.length - 1) / featuredProjects.length}%`]);

  return (
    <section id="projects" className="bg-[#0a0f18] text-white relative">
      {/* Desktop Horizontal Scroll Setup */}
      <div 
        ref={containerRef} 
        className={isMobile ? "w-full py-24" : `relative w-full h-[${featuredProjects.length * 100}vh]`}
        style={!isMobile ? { height: `${featuredProjects.length * 100}vh` } : undefined}
      >
        <div className={isMobile ? "container mx-auto px-6 flex flex-col gap-24" : "sticky top-0 h-screen w-full overflow-hidden flex items-center"}>
          
          {/* Section Header */}
          <div className={isMobile ? "mb-4" : "absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl px-8 z-50 pointer-events-none"}>
            <h2 className="text-sm font-mono tracking-[0.2em] text-cyan-400 mb-2 uppercase">
              Featured Work
            </h2>
            <p className="text-slate-400 font-light text-sm md:text-base">
              Selected projects — built, tested and shipped.
            </p>
          </div>

          {/* Track (Desktop) or Container (Mobile) */}
          <motion.div 
            className={isMobile ? "flex flex-col gap-24 w-full" : "flex h-full w-[400vw]"}
            style={isMobile ? undefined : { x, width: `${featuredProjects.length * 100}vw` }}
          >
            {featuredProjects.map((project, idx) => (
              <div 
                key={project.id} 
                className={isMobile ? "w-full" : "w-[100vw] h-full flex items-center justify-center px-8 md:px-16"}
              >
                <div className={`w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-opacity duration-700 ${!isMobile && activeIndex !== idx ? 'opacity-30' : 'opacity-100'}`}>
                  
                  {/* Media Section (55-65%) */}
                  <div className="w-full lg:w-[60%]">
                    <ProjectMedia 
                      src={project.media.src}
                      poster={project.media.poster}
                      type={project.media.type}
                      alt={project.title}
                    />
                  </div>

                  {/* Details Section (35-45%) */}
                  <div className="w-full lg:w-[40%] flex flex-col">
                    <div className="mb-6 flex items-center gap-4 text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase">
                      <span>0{idx + 1} / 0{featuredProjects.length}</span>
                      <span className="w-8 h-px bg-cyan-400/50" />
                      <span>{project.category}</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light max-w-md">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-slate-300 tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 mt-auto">
                      {project.caseStudyUrl && (
                        <a 
                          href={project.caseStudyUrl}
                          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors group"
                        >
                          View Case Study 
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                      
                      <div className="flex items-center gap-4 ml-auto">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all"
                            aria-label="GitHub Repository"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>

          {/* Progress Indicator (Desktop only) */}
          {!isMobile && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-3xl px-8 flex items-center justify-between pointer-events-none z-50">
              {featuredProjects.map((_, idx) => (
                <div key={idx} className="flex items-center gap-4 flex-1 first:flex-none last:flex-none">
                  <span className={`font-mono text-xs transition-colors duration-500 ${activeIndex === idx ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                    0{idx + 1}
                  </span>
                  {idx < featuredProjects.length - 1 && (
                    <div className="flex-1 h-px bg-white/10 mx-4 relative overflow-hidden">
                      {activeIndex === idx && (
                        <motion.div 
                          className="absolute inset-0 bg-cyan-400/50"
                          style={{
                            scaleX: useTransform(
                              smoothProgress,
                              [idx / (featuredProjects.length - 1), (idx + 1) / (featuredProjects.length - 1)],
                              [0, 1]
                            ),
                            transformOrigin: "left"
                          }}
                        />
                      )}
                      {activeIndex > idx && (
                        <div className="absolute inset-0 bg-cyan-400/50" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
