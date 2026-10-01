import { motion } from "framer-motion";
import { useLocation } from "wouter";

export function SoftwareNav() {
  const [, setLocation] = useLocation();

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "GITHUB", href: "#github" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 flex items-center justify-between backdrop-blur-md bg-[#0a0f18]/80 border-b border-cyan-500/10"
    >
      <div className="flex items-center gap-6">
        <div 
          className="font-bold tracking-widest text-white text-sm cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        >
          RT / RAHUL TEMBHARE
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-widest text-slate-400 uppercase">
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            className="relative group hover:text-cyan-400 transition-colors py-1"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full rounded-full" />
          </a>
        ))}
        <a 
          href="/resume/rahul-tembhare-resume.pdf" 
          target="_blank" 
          rel="noreferrer"
          className="relative group hover:text-cyan-400 transition-colors py-1"
        >
          RESUME
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full rounded-full" />
        </a>
        <a 
          href="#contact"
          className="ml-4 relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition-all bg-[#0a0f18] rounded-full overflow-hidden group"
        >
          {/* Gradient Border via Pseudo Element */}
          <span className="absolute inset-0 rounded-full border border-transparent [background:linear-gradient(to_right,theme(colors.cyan.400),theme(colors.purple.500))_border-box] [mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]" />
          
          <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform">
            Let's Talk <span className="text-xl leading-none font-light">→</span>
          </span>
        </a>
      </div>

    </motion.nav>
  );
}
