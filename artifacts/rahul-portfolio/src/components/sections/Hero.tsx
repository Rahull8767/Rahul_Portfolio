import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Mail } from "lucide-react";

const ROLES = [
  "Industrial IoT Engineer",
  "Full Stack Developer",
  "AI/ML Enthusiast",
  "Software Engineer",
  "Hackathon Builder",
];

const TERMINAL_LINES = [
  { prompt: true, text: "python train_model.py --dataset beauty_analysis" },
  { prompt: false, text: "> Training... accuracy: 94.2%" },
  { prompt: true, text: "git push origin main" },
  { prompt: false, text: "> Pushed to Rahull8767/ai-beauty-analysis" },
  { prompt: true, text: "flask run --host=0.0.0.0" },
  { prompt: false, text: "> Running on http://0.0.0.0:5000" },
  { prompt: true, text: "arduino-cli compile --fqbn esp32:esp32:esp32" },
  { prompt: false, text: "> Sketch uses 342KB of program storage" },
];

const TECH_PILLS = ["React", "Python", "ESP32", "Flask", "OpenCV", "TensorFlow.js"];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let paused = false;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      if (paused) { raf = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((v) => (v >= TERMINAL_LINES.length ? 0 : v + 1));
    }, 900);
    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => { clearInterval(interval); clearInterval(blink); };
  }, []);

  return (
    <div className="glass-card rounded-xl overflow-hidden font-mono text-xs sm:text-sm leading-relaxed">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-muted-foreground text-xs">rahul@portfolio:~</span>
      </div>
      <div className="p-4 space-y-1 min-h-[180px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={line.prompt ? "text-primary" : "text-green-400/80"}
          >
            {line.prompt && <span className="text-muted-foreground mr-2">$</span>}
            {line.text}
          </motion.div>
        ))}
        <span
          className="inline-block w-2 h-4 bg-primary align-middle"
          style={{ opacity: cursor ? 1 : 0 }}
        />
      </div>
    </div>
  );
}

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setShow(true);
      }, 300);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,245,255,0.05) 0%, transparent 70%)",
        }}
      />

      <ParticleCanvas />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-[10px] sm:text-xs text-primary tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-4 border border-primary/30 px-2.5 py-1 rounded-full bg-primary/5 max-w-full text-center whitespace-normal sm:whitespace-nowrap">
              Open to opportunities & collaborations
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Rahul</span>
              <br />
              <span className="text-foreground">Tembhare</span>
            </h1>

            <div className="h-8 mb-5 overflow-hidden">
              <motion.p
                key={roleIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : -16 }}
                transition={{ duration: 0.28 }}
                className="text-lg font-mono text-primary"
              >
                {ROLES[roleIdx]}
              </motion.p>
            </div>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Building intelligent software and IoT solutions through code, automation, and AI.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 border border-primary/40 text-primary font-semibold hover:bg-primary/20 hover:shadow-[0_0_18px_rgba(0,245,255,0.35)] transition-all duration-200 text-sm"
                data-testid="button-view-projects"
              >
                View Projects
                <ChevronDown className="w-4 h-4" />
              </a>
              <a
                href="/resume/Rahul_Tembhare_Resume_.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-foreground font-semibold hover:border-primary/40 hover:text-primary transition-all duration-200 text-sm"
                data-testid="button-download-resume-hero"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="flex items-center gap-2 px-5 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="button-contact-hero"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {TECH_PILLS.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-muted-foreground font-mono hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TerminalCard />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
