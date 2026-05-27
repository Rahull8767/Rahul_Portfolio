import { ArrowUp, Github, Linkedin, Mail, Instagram } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/Rahull8767", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rahultembhare/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:tembharerahul28@gmail.com", label: "Email" },
  { icon: Instagram, href: "https://www.instagram.com/i.am_rahulllll/", label: "Instagram" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4" aria-label="Site footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="font-mono text-primary font-bold text-lg">RT</span>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Building intelligent software and IoT solutions through code, automation, and AI.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-4 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href.slice(1)); }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Built with React · TypeScript · Tailwind · Framer Motion
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 Rahul Tembhare. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="p-2 rounded-lg border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
            data-testid="button-back-to-top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
