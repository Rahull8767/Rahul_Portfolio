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
        <button 
          onClick={() => setLocation("/")}
          className="hidden md:block text-xs font-medium tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase"
        >
          [ PERSONAL SITE ]
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-widest text-slate-400 uppercase">
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            className="hover:text-cyan-400 transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a 
          href="/resume/rahul-tembhare-resume.pdf" 
          target="_blank" 
          rel="noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          RESUME
        </a>
      </div>

      {/* Mobile Back Button (only shown on small screens) */}
      <button 
        onClick={() => setLocation("/")}
        className="block md:hidden text-xs font-medium tracking-widest text-cyan-400 uppercase"
      >
        [ PERSONAL SITE ]
      </button>
    </motion.nav>
  );
}
