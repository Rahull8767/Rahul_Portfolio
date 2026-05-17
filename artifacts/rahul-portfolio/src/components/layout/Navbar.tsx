import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Terminal } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["about", "skills", "projects", "experience", "github", "contact"];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

interface NavbarProps {
  onCommandPaletteOpen: () => void;
}

export function Navbar({ onCommandPaletteOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black/60 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group"
            aria-label="Rahul Tembhare — Back to top"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/40 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <span className="font-mono text-sm font-semibold text-primary tracking-wider hidden sm:block">RT</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-md bg-primary/10 border border-primary/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCommandPaletteOpen}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs text-muted-foreground border border-white/10 rounded-md hover:border-primary/30 hover:text-foreground transition-all duration-200 font-mono"
              aria-label="Open command palette (Ctrl+K)"
            >
              <span>⌘K</span>
            </button>
            <a
              href="/resume/rahul-tembhare-resume.pdf"
              download
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary border border-primary/40 rounded-md hover:bg-primary/10 hover:shadow-[0_0_12px_rgba(0,245,255,0.3)] transition-all duration-200"
              data-testid="button-download-resume-nav"
            >
              <Download className="w-3 h-3" />
              Resume
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-8"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const id = link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(id); setMobileOpen(false); }}
                    className="text-2xl font-semibold text-foreground hover:text-primary transition-colors py-2 border-b border-white/10"
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="/resume/rahul-tembhare-resume.pdf"
                download
                className="mt-4 flex items-center gap-2 text-primary font-semibold"
                data-testid="button-download-resume-mobile"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
