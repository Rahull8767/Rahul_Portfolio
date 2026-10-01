import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export function EditingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0.05)", "rgba(5, 5, 5, 0.5)"]
  );

  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(10px)", "blur(20px)"]
  );

  const handleNav = (route: string) => {
    setMenuOpen(false);
    if (route.startsWith("/")) {
      setTimeout(() => setLocation(route), 300);
    } else {
      setTimeout(() => {
        const element = document.querySelector(route);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const navLinks = [
    { name: "Projects", route: "#work" },
    { name: "Services", route: "#services" },
    { name: "Contact", route: "#contact" }
  ];

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] isolate w-[calc(100%-1.5rem)] md:w-auto max-w-5xl pointer-events-auto">
        
        {/* Mobile Nav */}
        <div className="md:hidden">
          <motion.nav 
            style={{ backgroundColor, backdropFilter }}
            className="rounded-full px-4 h-14 flex items-center justify-between gap-4 border border-white/10 shadow-lg"
          >
            <div 
              className="text-lg font-bold tracking-tight text-white cursor-pointer px-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Rahul<span className="text-gradient-accent ml-1">Tembhare</span>
            </div>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.nav>
          
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass rounded-3xl mt-3 overflow-hidden"
              >
                <ul className="px-3 py-3 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <button 
                        onClick={() => handleNav(link.route)}
                        className="w-full text-left px-4 py-3 rounded-2xl text-base text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button 
                      onClick={() => handleNav("/")}
                      className="w-full text-left px-4 py-3 rounded-2xl text-base text-[#e0aaff] hover:bg-white/10 transition-colors"
                    >
                      Personal Site →
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Nav */}
        <motion.nav 
          style={{ backgroundColor, backdropFilter }}
          className="hidden md:flex rounded-full px-6 h-14 items-center justify-between gap-8 border border-white/10 shadow-lg"
        >
          <div 
            className="text-xl font-bold tracking-tight text-white cursor-pointer pr-4"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Rahul<span className="text-gradient-accent ml-1">Tembhare</span>
          </div>
          
          <ul className="flex items-center gap-1 text-sm text-white/75">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button 
                  onClick={() => handleNav(link.route)}
                  className="px-4 py-2 rounded-full hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {link.name}
                </button>
              </li>
            ))}
            <li className="ml-2 pl-3 border-l border-white/10">
              <button 
                onClick={() => handleNav("/")}
                className="px-4 py-2 rounded-full text-[#e0aaff] hover:bg-white/10 transition-all duration-300 text-xs font-mono uppercase tracking-wider"
              >
                Personal Site
              </button>
            </li>
          </ul>
        </motion.nav>
      </header>
    </>
  );
}
