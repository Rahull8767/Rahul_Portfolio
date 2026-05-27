import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Github, Star, GitFork, Terminal, Cpu, Code2, 
  Settings, Heart, ExternalLink, Box, Sparkles 
} from "lucide-react";

interface ToolkitItem {
  category: string;
  items: string[];
}

const TOOLKIT: ToolkitItem[] = [
  { category: "Environment", items: ["Windows 11", "WSL2 (Ubuntu)", "Git / GitHub"] },
  { category: "IDE & Shell", items: ["VS Code", "PowerShell", "Zsh"] },
  { category: "Core Technologies", items: ["React / TypeScript", "Python / Flask", "C++ / Embedded C"] },
  { category: "Hardware Tools", items: ["ESP32", "Arduino CLI", "Raspberry Pi"] }
];

const INTERESTS = [
  {
    icon: Cpu,
    title: "IoT & Edge Systems",
    description: "Developing firmware, sensor protocols, and MQTT networks for local smart-home and industrial nodes.",
    status: "Active Focus",
    color: "from-cyan-500/20 to-blue-500/20 text-cyan-400"
  },
  {
    icon: Code2,
    title: "Full-Stack Web Engineering",
    description: "Building responsive, modern, type-safe web applications using React, Tailwind CSS, and Node.js.",
    status: "Building",
    color: "from-violet-500/20 to-purple-500/20 text-purple-400"
  },
  {
    icon: Sparkles,
    title: "Edge AI & Computer Vision",
    description: "Experimenting with MediaPipe, OpenCV, and TensorFlow.js models directly on lower-spec dev environments.",
    status: "Exploring",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400"
  },
  {
    icon: Settings,
    title: "Automation & DevEx Tools",
    description: "Writing scripts, configuration managers, and build pipelines to optimize day-to-day coding workflows.",
    status: "Ongoing",
    color: "from-amber-500/20 to-orange-500/20 text-amber-400"
  }
];

const CURATED_REPOS = [
  {
    name: "ai-beauty-analysis",
    description: "Real-time facial analysis and expression web application using Flask, OpenCV, and MediaPipe with smile detection.",
    language: "Python",
    langColor: "#3572A5",
    stars: 8,
    forks: 2,
    url: "https://github.com/Rahull8767"
  },
  {
    name: "iot-esp32-projects",
    description: "Collection of home automation nodes and sensor interfaces built for ESP32 utilizing FreeRTOS and MQTT protocols.",
    language: "C / C++",
    langColor: "#f34b7d",
    stars: 12,
    forks: 3,
    url: "https://github.com/Rahull8767"
  },
  {
    name: "gesture-recognition",
    description: "Browser-native hand gesture recognition using TensorFlow.js HandPose model with text-to-speech feedback.",
    language: "JavaScript",
    langColor: "#f1e05a",
    stars: 6,
    forks: 0,
    url: "https://github.com/Rahull8767"
  },
  {
    name: "fitness-posture-tracker",
    description: "Body posture and workout form scoring application using MediaPipe BlazePose with joint angle calculations.",
    language: "Python",
    langColor: "#3572A5",
    stars: 9,
    forks: 1,
    url: "https://github.com/Rahull8767"
  }
];

export function GitHubActivity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"toolkit" | "interests">("toolkit");

  return (
    <section id="github" className="py-24 px-4" aria-labelledby="github-heading">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">
            git --status --open-source
          </p>
          <h2 id="github-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Open Source & Development
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            I love sharing code, modular tools, and hardware firmwares. Here is a view of my developer configuration, 
            contribution priorities, and key projects.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Interactive Dev Hub (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-card rounded-xl border border-white/10 overflow-hidden flex flex-col h-full">
              {/* Tab Selector */}
              <div className="flex border-b border-white/10 bg-white/5 p-1.5 gap-2">
                <button
                  onClick={() => setActiveTab("toolkit")}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "toolkit"
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,245,255,0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Dev Environment
                </button>
                <button
                  onClick={() => setActiveTab("interests")}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "interests"
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,245,255,0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  Ecosystem Focus
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-5 flex-1 flex flex-col justify-center min-h-[300px]">
                {activeTab === "toolkit" ? (
                  <motion.div
                    key="toolkit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Box className="w-4 h-4 text-primary" />
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Workspace Spec</span>
                    </div>

                    {TOOLKIT.map((category) => (
                      <div key={category.category} className="border-l-2 border-primary/20 pl-4 py-0.5">
                        <h4 className="text-xs font-mono text-primary font-semibold uppercase">{category.category}</h4>
                        <p className="text-sm text-muted-foreground mt-1 font-sans">
                          {category.items.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="interests"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-primary" />
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Interests & Goals</span>
                    </div>
                    
                    <div className="space-y-3 font-sans text-sm text-muted-foreground leading-relaxed">
                      <p>
                        ⚡ High priority on building <strong className="text-foreground">Edge Computing firmware</strong> that consumes minimal energy while processing localized intelligence.
                      </p>
                      <p>
                        🌐 Excited about contributing to modular <strong className="text-foreground">UI components</strong> and dev-automation scripts in the JavaScript ecosystem.
                      </p>
                      <p>
                        🤖 Focus on connecting consumer sensors directly to <strong className="text-foreground">AI interfaces</strong> using lightweight REST/Websocket protocols.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Focus Areas Showcase (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTERESTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card rounded-xl p-5 border border-white/10 hover:border-primary/20 flex flex-col justify-between group transition-all duration-300"
                >
                  <div>
                    <div className={`p-2.5 rounded-lg w-fit bg-gradient-to-br ${item.color} mb-4`}>
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <h3 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-muted-foreground uppercase tracking-wider">Status</span>
                    <span className="text-primary font-bold">{item.status}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Highlight Repositories Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-6 font-mono tracking-wider uppercase flex items-center justify-center md:justify-start gap-2">
            <Github className="w-4.5 h-4.5 text-primary" />
            Featured Projects & Codebases
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CURATED_REPOS.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-xl p-5 border border-white/10 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(0,245,255,0.06)] transition-all duration-300 flex flex-col gap-3 group"
                aria-label={`Repository: ${repo.name}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    <span className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {repo.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mt-auto pt-2">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: repo.langColor }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500/80" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-primary/80" />
                    {repo.forks}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
