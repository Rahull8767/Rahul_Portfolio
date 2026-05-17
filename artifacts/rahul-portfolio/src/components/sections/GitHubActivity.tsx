import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useGitHubData } from "@/hooks/useGitHubData";
import { Github, Star, GitFork, RefreshCw } from "lucide-react";

const GITHUB_USERNAME = "rahultembhare";

function LanguageBar({ languages }: { languages: { name: string; percentage: number }[] }) {
  const colors: Record<string, string> = {
    "Python": "#06b6d4",
    "JavaScript": "#3b82f6",
    "C / C++": "#7c3aed",
    "TypeScript": "#a855f7",
  };

  return (
    <div>
      <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Top Languages</h3>
      <div className="flex rounded-full overflow-hidden h-2 mb-3" aria-label="Language distribution bar">
        {languages.map((lang) => (
          <div
            key={lang.name}
            style={{ width: `${lang.percentage}%`, backgroundColor: colors[lang.name] ?? "#64748b" }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors[lang.name] ?? "#64748b" }}
            />
            <span>{lang.name}</span>
            <span className="font-mono text-muted-foreground/60">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: { name: string; description: string; language: string; stars: number; forks: number; url: string }; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card rounded-xl p-4 border border-white/10 hover:border-primary/30 hover:shadow-[0_0_14px_rgba(0,245,255,0.08)] transition-all duration-300 flex flex-col gap-2 group cursor-pointer"
      aria-label={`Repository: ${repo.name}`}
      data-testid={`link-repo-${repo.name}`}
    >
      <div className="flex items-center gap-2">
        <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        <span className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {repo.name}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{repo.description}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mt-auto pt-1">
        <span className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: repo.language === "Python" ? "#06b6d4" : repo.language === "JavaScript" ? "#3b82f6" : "#7c3aed" }}
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {repo.forks}
        </span>
      </div>
    </motion.a>
  );
}

export function GitHubActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { repos, languages, loading, error } = useGitHubData(GITHUB_USERNAME);

  return (
    <section id="github" className="py-24 px-4" aria-labelledby="github-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">github --status</p>
          <div className="flex items-center gap-3">
            <h2 id="github-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              GitHub Activity
            </h2>
            {error && (
              <span className="text-xs font-mono text-muted-foreground bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                Using cached data
              </span>
            )}
          </div>
        </motion.div>

        {/* Stats images — terminal style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-xl p-1 border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" aria-hidden="true" />
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0a0a1a`}
              alt="Rahul Tembhare's GitHub stats — stars, commits, pull requests, issues, and contributions"
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="glass-card rounded-xl p-1 border border-white/10 overflow-hidden">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=tokyonight&hide_border=true&background=0a0a1a`}
              alt="Rahul Tembhare's GitHub commit streak statistics"
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* Repos */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 font-mono tracking-wider uppercase flex items-center gap-2">
            <Github className="w-4 h-4 text-primary" />
            Pinned Repositories
          </h3>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card rounded-xl p-4 border border-white/10 animate-pulse h-28" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repos.map((repo, i) => (
                <RepoCard key={repo.name} repo={repo} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Language bar */}
        {languages.length > 0 && (
          <div className="glass-card rounded-xl p-5 border border-white/10">
            <LanguageBar languages={languages} />
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <RefreshCw className="w-3 h-3" />
            <span>Showing cached data — GitHub API may be rate-limited</span>
          </div>
        )}
      </div>
    </section>
  );
}
