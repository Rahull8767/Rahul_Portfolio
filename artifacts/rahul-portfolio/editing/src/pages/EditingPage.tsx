import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Menu, X, User, Film, Activity, Palette, Layers, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { useLocation } from "wouter";
import { EditingStack } from "@/components/sections/editing/EditingStack";
import { EditingFeaturedWork } from "@/components/sections/editing/EditingFeaturedWork";
import { EditingContactForm } from "@/components/sections/editing/EditingContactForm";

export function EditingPage() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{title: string; video: string; aspectRatio?: string} | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Work", id: "work" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" }
  ];

  const services = [
    { title: "Video\nEditing", icon: <Film className="w-8 h-8 text-[#a855f7]" />, color: "from-[#a855f7]/20", desc: "Cinematic edits for\nbrands, creators and businesses." },
    { title: "Motion\nGraphics", icon: <Activity className="w-8 h-8 text-[#ec4899]" />, color: "from-[#ec4899]/20", desc: "Engaging visuals\nthat make an impact." },
    { title: "Color\nGrading", icon: <Palette className="w-8 h-8 text-[#f97316]" />, color: "from-[#f97316]/20", desc: "Professional color\nto set the right mood." },
    { title: "VFX &\nCompositing", icon: <Layers className="w-8 h-8 text-[#8b5cf6]" />, color: "from-[#8b5cf6]/20", desc: "Clean, seamless\nvisual effects." }
  ];


  const tools = [
    { name: "Premiere Pro", iconUrl: "/assets/images/adobe-premiere-pro-icon.png" },
    { name: "After Effects", iconUrl: "/assets/images/adobe-after-effects-icon.png" },
    { name: "Photoshop", iconUrl: "/assets/images/adobe-photoshop-icon.png" },
    { name: "Lightroom", iconUrl: "/assets/images/adobe-lightroom-icon.png" },
    { name: "Illustrator", iconUrl: "/assets/images/adobe-illustrator-icon.png" },
    { name: "Higgsfield", iconUrl: "/assets/images/higgsfield-icon.png" }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-[#f4f4f5] font-sans overflow-x-hidden selection:bg-[#8a2be2]/30 selection:text-white relative">
      {/* Dynamic Mouse Spotlight Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.06), transparent 40%)`
        }}
      />
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="text-3xl font-black tracking-tighter cursor-pointer"
            onClick={() => handleScroll("home")}
          >
            R<span className="text-[#8a2be2]">T</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-white/60">
            {navLinks.map((link, i) => (
              <button 
                key={link.name} 
                onClick={() => handleScroll(link.id)}
                className={`hover:text-white transition-colors ${i === 0 ? "text-white border-b-2 border-[#8a2be2] pb-1" : ""}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setLocation("/software")}
              className="text-xs font-semibold tracking-wider uppercase text-white/50 hover:text-white transition-colors"
            >
              Software Site
            </button>
            <button 
              onClick={() => handleScroll("contact")}
              className="bg-gradient-to-r from-[#8a2be2] to-[#ff5722] rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:shadow-[0_0_20px_rgba(138,43,226,0.4)] transition-all flex items-center gap-2"
            >
              Let's Talk <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
            >
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => handleScroll(link.id)}
                  className="text-left text-lg font-bold text-white/80 hover:text-white uppercase tracking-wider py-2"
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-white/10 w-full my-2"></div>
              <button 
                onClick={() => setLocation("/software")}
                className="text-left text-lg font-bold text-[#e0aaff] uppercase tracking-wider py-2"
              >
                Software Site →
              </button>
              <button 
                onClick={() => handleScroll("contact")}
                className="mt-4 bg-gradient-to-r from-[#8a2be2] to-[#ff5722] rounded-full px-6 py-4 text-sm font-bold uppercase tracking-wide text-white flex items-center justify-center gap-2"
              >
                Let's Talk <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pt-24 pb-12 overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section id="home" className="relative w-full min-h-[auto] md:min-h-[85vh] flex flex-col md:justify-center mb-12 md:mb-24 pt-4 md:pt-8">
          
          <div className="relative z-10 w-full md:w-[60%] flex flex-col pt-0 md:pt-8 order-1 md:order-none">
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-3 md:mb-6"
            >
              <h3 className="text-white/60 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">Video Editor</h3>
              <div className="h-px bg-white/20 w-12 sm:w-16"></div>
            </motion.div>
            
            {/* Mobile Portrait (beside text, absolute) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="block md:hidden absolute top-0 right-[-1rem] w-[50%] max-w-[200px] z-[-1]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-transparent to-transparent z-10"></div>
              <img src="/portrait.png" className="w-full h-auto object-cover object-bottom opacity-90" alt="Rahul Tembhare" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[12vw] sm:text-[10vw] md:text-[7rem] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl mb-4 md:mb-6 max-w-[65%] md:max-w-none" 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-white">Rahul</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#8b5cf6]">Tembhare</span>
            </motion.h1>
            
            <motion.h4 
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/80 text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.3em] uppercase font-bold mb-3 md:mb-6"
            >
              Edit &bull; Create &bull; Inspire
            </motion.h4>
            
            <motion.p 
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-[11px] leading-snug sm:text-sm md:text-base max-w-[95%] md:max-w-[320px] mb-6 md:mb-10"
            >
              I build pixel-perfect digital experiences and craft cinematic visual stories with precise timing and rhythm.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-row items-center gap-3 sm:gap-6"
            >
              <button 
                onClick={() => handleScroll("work")}
                className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-full px-5 py-3 md:px-8 md:py-4 text-[10px] md:text-sm font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all whitespace-nowrap"
              >
                View My Work <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              
              <button 
                onClick={() => handleScroll("work")}
                className="flex items-center gap-2 group p-1.5 rounded-full whitespace-nowrap"
              >
                <div className="w-8 h-8 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all shrink-0">
                  <Play className="w-3 h-3 md:w-5 md:h-5 ml-0.5 text-white" fill="currentColor" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs md:text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors">Watch Showreel</div>
                </div>
                <div className="text-left block sm:hidden">
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider">Showreel</div>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Desktop Portrait & Decor (Hidden on mobile) */}
          <div className="hidden md:block absolute md:top-0 md:right-[-2rem] w-full md:w-[65%] h-[350px] sm:h-[450px] md:h-[110%] z-0 pointer-events-none mt-8 md:mt-0 order-2 md:order-none opacity-90 md:opacity-100 flex justify-center md:block">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10 hidden md:block"></div>
            
            <motion.img 
              initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              src="/portrait.png" 
              alt="Rahul Tembhare" 
              className="w-full max-w-[400px] md:max-w-none h-full object-contain md:object-right-bottom mx-auto md:mx-0 relative z-0" 
            />
            
           
          </div>

          {/* STATS */}
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-row items-center gap-6 sm:gap-12 pt-8 md:pt-24 mt-0 md:mt-auto order-3 md:order-none"
          >
            <div className="text-left flex-none">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899] mb-0.5">50+</div>
              <div className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-white/60">Videos Delivered</div>
            </div>
            <div className="text-left flex-none">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#f97316] mb-0.5">2+</div>
              <div className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-white/60">Years Experience</div>
            </div>
            <div className="text-left flex-none hidden md:block">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#eab308] mb-0.5">100%</div>
              <div className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-white/60">Client Satisfaction</div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="mb-24 flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase">About Me</h3>
              <div className="h-px bg-white/20 w-16"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              An engineer who thinks in systems. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">An editor who thinks in moments.</span>
            </h2>
            <div className="text-white/60 space-y-4 text-sm md:text-base leading-relaxed">
              <p>
                I care about timing, rhythm, detail, and the small decisions that make a piece of content feel <span className="text-white font-bold italic">right</span>.
              </p>
              <p>
                With a strong background in software engineering, I bring a unique analytical approach to visual storytelling. Whether I'm cutting a fast-paced reel or a long-form documentary, I focus on seamless transitions, engaging pacing, and narrative clarity.
              </p>
              <p>
                When I'm not in Premiere Pro or After Effects, you can usually find me building software projects, exploring new motion design trends, or experimenting with 3D web experiences.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative flex justify-center"
          >
            <EditingStack />
          </motion.div>
        </section>

        {/* SERVICES GRID */}
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-16 md:mb-24">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-[2rem] p-4 md:p-8 flex flex-col items-start gap-3 md:gap-5 group hover:border-white/10 transition-all shadow-lg"
            >
              <div className={`w-10 h-10 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${s.color} to-transparent p-px shadow-inner`}>
                <div className="w-full h-full bg-[#111] rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="scale-75 md:scale-100">{s.icon}</div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] md:text-base font-bold text-white leading-tight whitespace-pre-line mb-1 md:mb-2">{s.title}</h4>
                <p className="text-[9px] md:text-xs text-white/40 leading-relaxed whitespace-pre-line hidden sm:block">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <EditingFeaturedWork onProjectClick={setActiveVideo} />



        {/* CONTACT CTA & FOOTER */}
        <section id="contact" className="relative mt-32 scroll-mt-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-start justify-between gap-12 mb-12 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#a855f7]/10 to-[#ec4899]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex flex-col items-start gap-6 relative z-10 w-full lg:w-1/3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 p-1 flex items-center justify-center shrink-0">
                 <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center text-[#ec4899]">
                    <User className="w-7 h-7" fill="currentColor" />
                 </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-white leading-tight mb-4 tracking-tight">Let's Create <br/> Something Amazing.</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6">Open for freelance projects, internships, and creative collaborations.</p>
              </div>
            </div>

            <div className="relative z-10 w-full lg:w-2/3">
              <EditingContactForm />
            </div>
          </motion.div>

          <footer className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8 pb-4">
            <div className="text-[10px] text-white/40 font-medium">
              &copy; 2026 Rahul Tembhare. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://github.com/Rahull8767" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/rahultembhare/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-[#0077b5] hover:bg-[#0077b5]/20 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/i.am_rahulllll/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-pink-500 hover:bg-pink-500/20 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase">
              <span>Stories</span>
              <span>|</span>
              <span>Brands</span>
              <span>|</span>
              <span>Creators</span>
              <span>|</span>
              <span>You</span>
            </div>
          </footer>

        </section>

      </main>

      {/* Full Screen Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors focus:outline-none bg-white/5 rounded-full backdrop-blur-md border border-white/10 z-50"
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
              className={`w-full max-w-5xl max-h-[90vh] ${activeVideo.aspectRatio || 'aspect-video'} bg-[#0a0a0a] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl mx-auto`}
              onClick={e => e.stopPropagation()}
            >
              {activeVideo.video ? (
                <video 
                  src={activeVideo.video} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/50 relative">
                  <div className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-xl saturate-200" />
                  <div className="relative z-10 flex flex-col items-center p-8 text-center bg-[#111]/60 backdrop-blur-md rounded-2xl border border-white/10">
                    <Play size={48} className="mb-4 opacity-80 text-[#a855f7] drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
                    <p className="font-mono text-sm tracking-widest uppercase text-white/80 mb-2">Video playback unavailable</p>
                    <p className="text-xs text-white/40 max-w-sm">
                      A placeholder is currently shown because a video file wasn't provided for this specific project.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
