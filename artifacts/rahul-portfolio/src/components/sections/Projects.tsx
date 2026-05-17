import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronRight, Star } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectModal } from "@/components/shared/ProjectModal";
import type { Project } from "@/types";

const FILTERS = ["All", "AI/ML", "IoT", "Full Stack", "Robotics"] as const;
type Filter = typeof FILTERS[number];

function ProjectCard({
  project,
  index,
  onDetails,
}: {
  project: Project;
  index: number;
  onDetails: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`glass-card rounded-2xl border border-white/10 hover:border-primary/30 hover:shadow-[0_0_24px_rgba(0,245,255,0.08)] transition-all duration-300 flex flex-col overflow-hidden group ${
        project.featured ? "lg:col-span-1" : ""
      }`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Featured accent banner */}
      {project.featured && (
        <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" aria-hidden="true" />
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            {project.featured && (
              <div className="flex items-center gap-1 mb-1.5">
                <Star className="w-3 h-3 text-primary fill-primary" />
                <span className="text-xs font-mono text-primary tracking-wider uppercase">Featured</span>
              </div>
            )}
            <span className="text-xs font-mono text-muted-foreground">{project.category}</span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="p-1.5 rounded-md hover:text-primary transition-colors text-muted-foreground"
                data-testid={`link-github-card-${project.id}`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="p-1.5 rounded-md hover:text-primary transition-colors text-muted-foreground"
                data-testid={`link-demo-card-${project.id}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-base font-bold text-foreground mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.description}</p>

        <ul className="space-y-1 mb-5">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="text-primary shrink-0 mt-0.5">›</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-mono">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs px-2 py-0.5 text-muted-foreground">+{project.tech.length - 4}</span>
          )}
        </div>

        <button
          onClick={() => onDetails(project)}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold transition-colors mt-auto"
          data-testid={`button-view-details-${project.id}`}
        >
          View Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = projects.filter(
    (p) => filter === "All" || p.category === filter || (filter === "IoT" && p.category === "IoT") || (filter === "Robotics" && p.category === "Robotics")
  );

  return (
    <section id="projects" className="py-24 px-4" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">git log --oneline</p>
          <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Projects
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project filter">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                role="tab"
                aria-selected={filter === f}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${
                  filter === f
                    ? "bg-primary/10 border border-primary/40 text-primary"
                    : "border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                }`}
                data-testid={`button-filter-${f.toLowerCase()}`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onDetails={setSelectedProject}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
