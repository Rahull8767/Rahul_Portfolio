import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9980] flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl glass-card rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-mono text-primary tracking-widest uppercase">{project.category}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-1">{project.title}</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-mono">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.description}</p>

            <div className="mb-5">
              <h3 className="text-sm font-semibold text-foreground mb-2">Key Features</h3>
              <ul className="space-y-1.5">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 shrink-0">›</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {project.challenge && (
              <div className="mb-4 p-4 bg-primary/5 border border-primary/15 rounded-lg">
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">Challenge</h3>
                <p className="text-sm text-muted-foreground">{project.challenge}</p>
              </div>
            )}

            {project.lesson && (
              <div className="mb-5 p-4 bg-secondary/5 border border-secondary/15 rounded-lg">
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Lesson Learned</h3>
                <p className="text-sm text-muted-foreground">{project.lesson}</p>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-white/15 text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200"
                  data-testid={`link-github-${project.id}`}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20 transition-all duration-200"
                  data-testid={`link-demo-${project.id}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
