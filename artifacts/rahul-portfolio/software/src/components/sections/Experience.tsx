import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/data/experience";
import { Award, Users } from "lucide-react";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-4" aria-labelledby="experience-heading">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">./leadership --verbose</p>
          <h2 id="experience-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Experience & Leadership
          </h2>
        </motion.div>

        <div className="relative pl-8 border-l-2 border-primary/20">
          {/* Glowing line overlay */}
          <div
            className="absolute top-0 left-[-1px] w-[2px] bg-gradient-to-b from-primary/60 via-secondary/30 to-transparent"
            style={{ height: "100%" }}
            aria-hidden="true"
          />

          {experiences.map((exp, i) => {
            const Icon = exp.type === "leadership" ? Award : Users;
            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="relative mb-10 last:mb-0"
                aria-label={`${exp.role} at ${exp.organization}`}
              >
                {/* Dot on timeline */}
                <div className="absolute -left-[41px] w-5 h-5 rounded-full border-2 border-primary bg-background flex items-center justify-center shadow-[0_0_10px_rgba(0,245,255,0.5)]">
                  <Icon className="w-2.5 h-2.5 text-primary" />
                </div>

                <div className="glass-card rounded-xl p-5 border border-white/10 hover:border-primary/25 hover:shadow-[0_0_18px_rgba(0,245,255,0.07)] transition-all duration-300">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="text-base font-bold text-foreground">{exp.role}</h3>
                    {exp.duration && (
                      <span className="text-xs font-mono text-muted-foreground shrink-0">{exp.duration}</span>
                    )}
                  </div>
                  <p className="text-sm text-primary mb-2">{exp.organization}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  <div className="mt-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${
                      exp.type === "leadership"
                        ? "border-primary/30 text-primary bg-primary/5"
                        : "border-secondary/30 text-secondary bg-secondary/5"
                    }`}>
                      {exp.type === "leadership" ? "Leadership" : "Member"}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
