import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { label: "Hackathons Participated", value: "5+" },
  { label: "Projects Built", value: "8+" },
  { label: "Technologies Learned", value: "15+" },
  { label: "Leadership Roles", value: "3+" },
];

const TIMELINE = [
  { id: "enroll-2023", year: "2023", event: "Enrolled in B.Tech Industrial IoT at PCE Nagpur" },
  { id: "hackathon-2024", year: "2024", event: "First major hackathon — Smart India Hackathon (SIH)" },
  { id: "aiprojects-2024", year: "2024", event: "Built AI projects: Beauty Analysis & Gesture Recognition" },
  { id: "workshop-2025", year: "2025", event: "Led Generative AI Workshop for college peers" },
];

function CountStat({ label, value }: { label: string; value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-5 text-center hover:border-primary/30 hover:shadow-[0_0_18px_rgba(0,245,255,0.1)] transition-all duration-300 border border-white/10"
    >
      <div className="text-3xl font-bold text-gradient mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-4" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">whoami</p>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm a third-year B.Tech student in Industrial IoT at Priyadarshini College of Engineering, Nagpur. I'm drawn to the intersection of hardware and software — building systems where embedded devices, cloud APIs, and AI models work together to solve real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond coursework, I've led teams in hackathons like SIH and TechFest IIT Bombay, organized a Generative AI workshop, and built projects from webcam-based AI apps to Arduino robots. I'm actively exploring full-stack development and AI/ML, and am looking for opportunities to contribute to real engineering teams.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative pl-6 border-l border-primary/30"
          >
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="mb-6 last:mb-0 relative"
              >
                <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(0,245,255,0.6)]" />
                <span className="font-mono text-xs text-primary block mb-0.5">{item.year}</span>
                <p className="text-sm text-muted-foreground">{item.event}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <CountStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
