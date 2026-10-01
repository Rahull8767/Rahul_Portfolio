import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/skills";

const CATEGORY_COLORS: Record<string, string> = {
  "Programming": "primary",
  "Frontend": "secondary",
  "Backend": "accent",
  "IoT & Embedded": "primary",
  "AI / ML": "secondary",
  "Tools & Platforms": "accent",
};

function SkillCard({ category, items, index }: { category: string; items: string[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const color = CATEGORY_COLORS[category] ?? "primary";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card rounded-xl p-5 border border-white/10 hover:border-primary/25 transition-all duration-300 group"
    >
      <h3 className={`text-xs font-mono tracking-widest uppercase text-${color === "primary" ? "primary" : color === "secondary" ? "secondary" : "accent"} mb-4`}>
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className={`text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-muted-foreground font-mono
              hover:border-${color === "primary" ? "primary" : color === "secondary" ? "secondary" : "accent"}/40
              hover:text-${color === "primary" ? "primary" : color === "secondary" ? "secondary" : "accent"}
              hover:shadow-[0_0_8px_rgba(0,245,255,0.2)]
              transition-all duration-200 cursor-default`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-4" aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">ls -la ./skills</p>
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <SkillCard key={s.category} category={s.category} items={s.items} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
