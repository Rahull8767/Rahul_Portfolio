import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLocation } from "wouter";

export function EditingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.8)"]
  );

  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(12px)"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
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
    { name: "WORK", route: "#work" },
    { name: "ABOUT", route: "#about" },
    { name: "SERVICES", route: "#services" },
    { name: "CONTACT", route: "#contact" }
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
      <motion.nav 
        style={{ backgroundColor, backdropFilter, borderColor }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b transition-colors pointer-events-auto"
      >
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 text-white cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="font-bold text-xl uppercase tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RT</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase group-hover:text-fuchsia-400 transition-colors hidden sm:block mt-1">
              Rahul Tembhare
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            {navLinks.map((link) => (
              <a key={link.name} href={link.route} className="hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => setLocation("/")}
              className="text-white hover:text-fuchsia-400 transition-colors ml-4 flex items-center gap-1"
            >
              [ PERSONAL SITE ]
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white text-[10px] font-mono tracking-widest uppercase hover:opacity-70 transition-opacity px-2 py-1 border border-white/10 rounded-sm"
          >
            MENU
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] text-[#f4f4f5] flex flex-col p-6 overflow-hidden md:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-bold text-xl uppercase tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RT</span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="text-white text-[10px] font-mono tracking-widest uppercase px-2 py-1 border border-white/10 rounded-sm"
              >
                CLOSE
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4 }}
                    className="cursor-pointer"
                    onClick={() => handleNav(link.route)}
                  >
                    <span className="text-4xl font-bold uppercase tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {link.name}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 text-xs font-mono tracking-widest uppercase border-t border-white/10 pt-6 mt-auto">
              <button onClick={() => handleNav("/")} className="text-left text-fuchsia-400">
                [ PERSONAL SITE ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
