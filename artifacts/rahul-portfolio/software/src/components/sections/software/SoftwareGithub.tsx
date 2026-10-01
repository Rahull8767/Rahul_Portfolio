import { motion } from "framer-motion";
import { Github, GitBranch, Star, Activity } from "lucide-react";

export function SoftwareGithub() {
  // Static fallback data for GitHub since API requires token for stable rate limits
  const repos = [
    { name: "Rahul_Portfolio", desc: "My personal portfolio built with React, Vite, Tailwind and Framer Motion.", stars: 2, forks: 0, lang: "TypeScript" },
    { name: "AI_Beauty_Analysis", desc: "Facial analysis web app using Flask and OpenCV.", stars: 5, forks: 1, lang: "Python" },
    { name: "Body_Fitness_Tracker", desc: "Real-time posture tracking with MediaPipe.", stars: 4, forks: 2, lang: "Python" },
    { name: "IoT_Sensor_Node", desc: "ESP32 based sensor node firmware.", stars: 3, forks: 1, lang: "C++" }
  ];

  return (
    <section id="github" className="py-24 text-white border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 uppercase" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              Open Source / Build Log
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg font-light">
              My recent activity, public repositories, and contributions.
            </p>
          </div>
          <a 
            href="https://github.com/Rahull8767" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all rounded-md font-mono text-sm uppercase tracking-widest text-cyan-400"
          >
            <Github className="w-4 h-4" />
            View GitHub
          </a>
        </div>

        {/* Mock Contribution Graph area */}
        <div className="bg-[#0d131f] border border-white/5 rounded-xl p-6 md:p-8 mb-12 overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-mono tracking-widest uppercase text-slate-300">Contribution Activity (Last 90 Days)</h3>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-4 hide-scrollbar opacity-70">
            {Array.from({ length: 90 }).map((_, i) => {
              // Generate some random looking activity
              const intensity = Math.random();
              let bg = "bg-white/5";
              if (intensity > 0.9) bg = "bg-cyan-400";
              else if (intensity > 0.7) bg = "bg-cyan-500/80";
              else if (intensity > 0.5) bg = "bg-cyan-600/60";
              else if (intensity > 0.3) bg = "bg-cyan-900/40";
              
              return (
                <div key={i} className={`w-3 h-3 md:w-4 md:h-4 rounded-sm flex-shrink-0 ${bg}`} />
              );
            })}
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/Rahull8767/${repo.name}`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all group block"
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-2 group-hover:underline decoration-cyan-400/50 underline-offset-4">
                {repo.name}
              </h3>
              <p className="text-slate-400 font-light mb-6 text-sm line-clamp-2">
                {repo.desc}
              </p>
              <div className="flex items-center gap-6 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-xs font-mono text-slate-300">{repo.lang}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                  <GitBranch className="w-3.5 h-3.5" />
                  {repo.forks}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
