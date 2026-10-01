import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, Cpu } from "lucide-react";

const COURSEWORK = [
  "Embedded Systems",
  "IoT Architecture",
  "Data Structures",
  "Machine Learning Fundamentals",
  "Computer Networks",
  "Digital Electronics",
];

const TRAINING = [
  { icon: Cpu, label: "Generative AI Workshop", note: "Organizer & Participant" },
  { icon: Cpu, label: "Embedded Systems hands-on training", note: "Lab-based" },
  { icon: BookOpen, label: "NPTEL Online Certifications", note: "Self-paced" },
];

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 px-4" aria-labelledby="education-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">cat ./education.md</p>
          <h2 id="education-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Education
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main degree */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-6 border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_24px_rgba(0,245,255,0.1)] transition-all duration-300 lg:col-span-1"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground leading-snug">Priyadarshini College of Engineering</h3>
                <p className="text-sm text-primary mt-0.5">B.Tech in Industrial IoT</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">2023 – 2027 (Expected)</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Relevant Coursework</p>
              <div className="flex flex-wrap gap-2">
                {COURSEWORK.map((c) => (
                  <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Workshops */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 border border-white/10 hover:border-secondary/25 transition-all duration-300"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4 font-mono tracking-wider uppercase">Workshops & Training</h3>
            <div className="space-y-3">
              {TRAINING.map(({ icon: Icon, label, note }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/8 hover:border-secondary/20 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
