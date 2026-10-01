import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/data/certifications";
import { Shield, ExternalLink } from "lucide-react";

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 px-4" aria-labelledby="certifications-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">ls ./certifications</p>
          <h2 id="certifications-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-5 border border-white/10 hover:border-primary/30 hover:shadow-[0_0_18px_rgba(0,245,255,0.1)] transition-all duration-300 group"
              aria-label={`Certification: ${cert.title}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_10px_rgba(0,245,255,0.3)] transition-all">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm leading-snug">{cert.title}</h3>
                  <p className="text-xs text-primary mt-0.5">{cert.issuer}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="font-mono">{cert.date}</span>
                {cert.credentialId && (
                  <>
                    <span className="text-white/20">|</span>
                    <span className="font-mono truncate">ID: {cert.credentialId}</span>
                  </>
                )}
              </div>

              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200"
                  data-testid={`button-verify-${cert.id}`}
                >
                  <ExternalLink className="w-3 h-3" />
                  Verify
                </a>
              )}
            </motion.article>
          ))}

          {/* Placeholder slots */}
          {Array.from({ length: Math.max(0, 4 - certifications.length) }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="glass-card rounded-xl p-5 border border-dashed border-white/10 flex items-center justify-center"
            >
              <p className="text-xs text-muted-foreground/50 font-mono">More certifications coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
