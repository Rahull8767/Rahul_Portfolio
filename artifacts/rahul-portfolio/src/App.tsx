import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/shared/CommandPalette";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((d) => !d), []);
  return { isDark, toggle };
}

function useEasterEggs() {
  useEffect(() => {
    let typedBuffer = "";
    const SUDO = "sudo";
    const KONAMI = [
      "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
      "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
      "b","a",
    ];
    let konamiIndex = 0;

    const handleKey = (e: KeyboardEvent) => {
      // sudo easter egg
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      typedBuffer = (typedBuffer + e.key).slice(-SUDO.length);
      if (typedBuffer === SUDO) {
        const toast = document.createElement("div");
        toast.textContent = "Permission denied: this portfolio is open-source";
        toast.style.cssText = `
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          background: #0a0a1a; border: 1px solid rgba(0,245,255,0.4);
          color: #00f5ff; font-family: monospace; font-size: 13px;
          padding: 10px 20px; border-radius: 8px; z-index: 99999;
          box-shadow: 0 0 20px rgba(0,245,255,0.2);
          animation: fadeInUp 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
        typedBuffer = "";
      }

      // Konami code
      if (e.key === KONAMI[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI.length) {
          konamiIndex = 0;
          triggerConfetti();
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
}

function triggerConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99998;";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) { canvas.remove(); return; }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    color: ["#00f5ff","#3b82f6","#7c3aed","#a855f7","#06b6d4"][Math.floor(Math.random() * 5)],
    size: Math.random() * 6 + 3,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 8,
  }));

  let frame = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.07;
      p.rotation += p.rotationSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    frame++;
    if (frame < 120) requestAnimationFrame(animate);
    else canvas.remove();
  };
  requestAnimationFrame(animate);
}

export default function App() {
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const seen = sessionStorage.getItem("portfolio-loaded");
    return !seen;
  });

  const { isDark, toggle } = useTheme();
  const [cmdOpen, setCmdOpen] = useState(false);

  useEasterEggs();

  const handleLoadDone = useCallback(() => {
    sessionStorage.setItem("portfolio-loaded", "1");
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={handleLoadDone} />}
      </AnimatePresence>

      <ScrollProgress />
      <CustomCursor />

      <Navbar onCommandPaletteOpen={() => setCmdOpen(true)} />

      <main id="main-content" className="relative bg-background" aria-label="Portfolio main content">
        {/* Subtle global radial glow */}
        <div
          className="fixed inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(0,245,255,0.04) 0%, transparent 60%)",
          }}
        />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        isDark={isDark}
        onToggleTheme={toggle}
      />
    </>
  );
}
