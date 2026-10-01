import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    id: 1,
    title: "Smart India Hackathon",
    role: "Team Leadership",
    description: "Led a cross-functional team in developing a working prototype under pressure.",
    date: "2023"
  },
  {
    id: 2,
    title: "TechFest IIT Bombay",
    role: "Participant / Exhibitor",
    description: "Showcased technical projects and competed with top engineering students.",
    date: "2023"
  },
  {
    id: 3,
    title: "Generative AI Workshop",
    role: "Organizer",
    description: "Organized and facilitated a hands-on workshop introducing students to modern AI tools.",
    date: "2023"
  },
  {
    id: 4,
    title: "IEEE Student Branch",
    role: "Active Member",
    description: "Participated in organizing technical seminars and collaborative engineering projects.",
    date: "2022 - 2024"
  },
  {
    id: 5,
    title: "Symbiot Forum",
    role: "Core Committee",
    description: "Managed forum activities, technical discussions, and event logistics.",
    date: "2022 - 2023"
  },
  {
    id: 6,
    title: "Student Mentoring & Esports",
    role: "Mentor / Organizer",
    description: "Mentored junior students in coding and organized large-scale campus esports events.",
    date: "2021 - 2024"
  }
];

export function SoftwareExperience() {
  return (
    <section id="experience" className="py-24 bg-[#0a0f18] text-white relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 uppercase" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Building Beyond Code
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
            Leadership, community building, and technical events.
          </p>
        </div>

        <div className="relative border-l border-cyan-500/20 pl-8 md:pl-12 ml-4 md:ml-0 space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-[#0a0f18] border-2 border-cyan-500/50 group-hover:border-cyan-400 group-hover:bg-cyan-400/20 transition-all z-10" />
              
              {/* Content Card */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-6 md:p-8 hover:bg-white/[0.07] hover:border-cyan-500/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      {exp.title}
                    </h3>
                    <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mt-1">
                      {exp.role}
                    </div>
                  </div>
                  <div className="text-slate-500 font-mono text-xs border border-white/10 px-3 py-1 rounded-full w-fit">
                    {exp.date}
                  </div>
                </div>
                <p className="text-slate-400 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
