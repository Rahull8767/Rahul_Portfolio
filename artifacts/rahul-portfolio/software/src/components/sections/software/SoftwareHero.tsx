import { motion, useReducedMotion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { Github, Linkedin, Mail, Instagram, FileText, Code2, BarChart3, MoveRight, Download, ChevronDown } from "lucide-react";

export function SoftwareHero() {
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const bgX = useTransform(smoothX, [-1, 1], [20, -20]);
  const bgY = useTransform(smoothY, [-1, 1], [20, -20]);
  const portraitX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const portraitY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const badgeLeftX = useTransform(smoothX, [-1, 1], [25, -25]);
  const badgeLeftY = useTransform(smoothY, [-1, 1], [25, -25]);
  const badgeRightX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const badgeRightY = useTransform(smoothY, [-1, 1], [-25, 25]);
  const textX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const textY = useTransform(smoothY, [-1, 1], [-5, 5]);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  const portraitReveal = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#050810]">
      
      {/* Subtle Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)"
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-1 flex flex-col justify-center lg:flex-row lg:items-center w-full h-full">
        
        {/* Left Column: Typography, Actions, Stats */}
        <div className="flex-[1.1] pt-32 pb-12 lg:py-0 relative z-20 flex flex-col justify-center">
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}
            className="flex flex-col gap-2 mb-6"
          >
            {/* Small cyan accent line */}
            <div className="w-8 h-[2px] bg-cyan-400 mb-2" />
            <p className="text-[10px] md:text-xs tracking-[0.4em] text-slate-400 font-medium uppercase">
              Engineer <span className="text-cyan-400 mx-2">•</span> Builder <span className="text-cyan-400 mx-2">•</span> Creator
            </p>
          </motion.div>

          {/* Main Name Branding */}
          <motion.div style={{ x: textX, y: textY }}>
            <motion.h1 
              initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.1 }}
              className="font-black leading-[0.9] tracking-tight uppercase flex flex-col"
              style={{ 
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 8.5rem)",
              }}
            >
              <span className="text-white drop-shadow-md mt-16">RAHUL</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-md pb-2">
                TEMBHARE
              </span>
            </motion.h1>
          </motion.div>

          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed max-w-[480px]"
          >
            Building intelligent systems, connected applications, and real-world solutions.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a 
              href="#projects"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              View My Work <MoveRight className="w-4 h-4 ml-1" />
            </a>
            
            <a 
              href="/resume/rahul-tembhare-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-medium bg-[#050810] group"
            >
              <span className="absolute inset-0 rounded-full border border-slate-600 group-hover:border-slate-400 transition-colors" />
              Download Resume <Download className="w-4 h-4 ml-1 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 pt-8 flex items-start gap-8 md:gap-16 relative"
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-cyan-400">15+</span>
              <span className="text-xs text-slate-400 mt-1">Technologies Learned</span>
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-10 bg-white/10" />

            <div className="flex flex-col">
              <span className="text-3xl font-bold text-cyan-400">10+</span>
              <span className="text-xs text-slate-400 mt-1">Projects Completed</span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-10 bg-white/10" />

            <div className="flex flex-col">
              <span className="text-3xl font-bold text-cyan-400">Always</span>
              <span className="text-xs text-slate-400 mt-1">Learning</span>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex items-center gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/Rahull8767" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/rahultembhare/" },
              { icon: Instagram, href: "https://www.instagram.com/i.am_rahulllll/" },
              { icon: FileText, href: "/resume/rahul-tembhare-resume.pdf" },
              { icon: Mail, href: "mailto:tembharerahul28@gmail.com" }
            ].map((item, i) => (
              <a 
                key={i}
                href={item.href} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all bg-white/5"
                aria-label="Social link"
              >
                <item.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Portrait and Visuals */}
        <div className="flex-1 relative w-full h-[60vh] lg:h-full min-h-[400px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0 z-10">
          
          {/* Decorative Background Circle */}
          <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 pointer-events-none z-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-[58%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full border border-white/5"
              style={{
                boxShadow: "inset 40px 0 100px -50px rgba(34,211,238,0.2), inset -40px 0 100px -50px rgba(168,85,247,0.2)"
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5 backdrop-blur-[2px]" />
            </motion.div>
          </motion.div>

          {/* Floating Badge Left */}
          <motion.div style={{ x: badgeLeftX, y: badgeLeftY }} className="absolute top-[15%] left-[5%] lg:-left-[5%] z-30">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
              className="hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0a0f18]/80 backdrop-blur-md border border-white/10 shadow-2xl"
            >
              <div className="text-cyan-400 font-bold font-mono text-lg">{'</>'}</div>
              <div className="text-xs text-slate-300 leading-tight">
                Turning Ideas<br/>Into Impact
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Badge Right */}
          <motion.div style={{ x: badgeRightX, y: badgeRightY }} className="absolute bottom-[20%] right-[5%] lg:-right-[5%] z-30">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
              className="hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0a0f18]/80 backdrop-blur-md border border-white/10 shadow-2xl"
            >
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <div className="text-xs text-slate-300 leading-tight">
                Better<br/>Solutions<br/><span className="text-slate-400">Brighter Tomorrow</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Portrait Image */}
          <motion.div style={{ x: portraitX, y: portraitY }} className="relative w-[80%] h-full z-20">
            <motion.div
              initial="hidden" animate="visible" variants={portraitReveal} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="w-full h-full"
            >
              <img 
                src="/portrait.png" 
                alt="Rahul Tembhare" 
                className="w-auto h-full max-h-[85vh] object-contain object-bottom filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                style={{
                  WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 15%, black 100%)",
                  maskImage: "linear-gradient(to top, transparent 0%, black 15%, black 100%)"
                }}
              />
            </motion.div>
          </motion.div>

        </div>

      </div>

      {/* Decorative Vertical Text (Right Edge) */}
      <div className="hidden 2xl:flex flex-col justify-between absolute right-8 top-1/4 bottom-1/4 z-0 pointer-events-none text-[9px] tracking-[0.5em] text-slate-600 font-mono uppercase">
        <div className="flex flex-col gap-6 items-center">
          <span className="rotate-90">IDEA</span>
          <span className="rotate-90">PLAN</span>
          <span className="rotate-90">BUILD</span>
          <span className="rotate-90">SHIP</span>
          <span className="rotate-90">REPEAT</span>
        </div>
        <div className="flex flex-col gap-6 items-center opacity-50">
          <span className="rotate-90">TECHNOLOGY</span>
          <span className="rotate-90 mt-8">PEOPLE</span>
          <span className="rotate-90 mt-4">REAL IMPACT</span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-slate-500"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </motion.div>
        <span className="text-[9px] tracking-[0.3em] font-medium uppercase">Scroll Down</span>
      </motion.div>

    </section>
  );
}
