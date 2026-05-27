import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, Github, MessageSquare, Sun, Moon, X } from "lucide-react";

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette({ open, onClose, isDark, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { id: "about", label: "Go to About", icon: <span className="text-xs font-mono text-muted-foreground">§</span>, action: () => { scrollTo("about"); onClose(); } },
    { id: "skills", label: "Go to Skills", icon: <span className="text-xs font-mono text-muted-foreground">§</span>, action: () => { scrollTo("skills"); onClose(); } },
    { id: "projects", label: "Go to Projects", icon: <span className="text-xs font-mono text-muted-foreground">§</span>, action: () => { scrollTo("projects"); onClose(); } },
    { id: "experience", label: "Go to Experience", icon: <span className="text-xs font-mono text-muted-foreground">§</span>, action: () => { scrollTo("experience"); onClose(); } },
    { id: "contact", label: "Go to Contact", icon: <MessageSquare className="w-3.5 h-3.5" />, action: () => { scrollTo("contact"); onClose(); } },
    { id: "resume", label: "Download Resume", shortcut: "R", icon: <Download className="w-3.5 h-3.5" />, action: () => { window.open("/resume/Rahul_Tembhare_Resume_.pdf", "_blank"); onClose(); } },
    { id: "github", label: "Open GitHub", shortcut: "GH", icon: <Github className="w-3.5 h-3.5" />, action: () => { window.open("https://github.com/Rahull8767", "_blank"); onClose(); } },
    { id: "theme", label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode", icon: isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />, action: () => { onToggleTheme(); onClose(); } },
  ];

  const filtered = commands.filter((c) =>
    query.length === 0 || c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); filtered[selected]?.action(); }
  }, [open, filtered, selected]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[15vh] px-4"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="Command palette"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-lg bg-[#0a0a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-sans"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search commands"
              />
              <button onClick={onClose} aria-label="Close command palette" className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-6">No commands found</p>
              )}
              {filtered.map((cmd, idx) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                    idx === selected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-white/5"
                  }`}
                >
                  <span className={`shrink-0 ${idx === selected ? "text-primary" : "text-muted-foreground"}`}>{cmd.icon}</span>
                  <span className="flex-1">{cmd.label}</span>
                  {cmd.shortcut && (
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded border border-white/10 text-muted-foreground">{cmd.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-xs text-muted-foreground font-mono">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
