import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TOOLS = [
  { name: "Premiere Pro", iconUrl: "/assets/images/adobe-premiere-pro-icon.png", color: "#9999FF" },
  { name: "After Effects", iconUrl: "/assets/images/adobe-after-effects-icon.png", color: "#9999FF" },
  { name: "Photoshop", iconUrl: "/assets/images/adobe-photoshop-icon.png", color: "#31A8FF" },
  { name: "Lightroom", iconUrl: "/assets/images/adobe-lightroom-icon.png", color: "#31A8FF" },
  { name: "Illustrator", iconUrl: "/assets/images/adobe-illustrator-icon.png", color: "#FF9A00" },
  { name: "Higgsfield", iconUrl: "/assets/images/higgsfield-icon.png", color: "#FFFFFF" }
];

export function EditingStack() {
  const [radius, setRadius] = useState(110); // Mobile default

  useEffect(() => {
    const checkWidth = () => {
      setRadius(window.innerWidth >= 768 ? 140 : 110);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#a855f7]/10 via-transparent to-[#ec4899]/10" />
      
      {/* Center element */}
      <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-black border border-white/10 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        <span className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">RT</span>
      </div>

      {/* Orbit Rings */}
      <div className="absolute w-[220px] md:w-[280px] h-[220px] md:h-[280px] rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite]" />
      <div className="absolute w-[300px] md:w-[380px] h-[300px] md:h-[380px] rounded-full border border-white/5 border-dashed animate-[spin_30s_linear_infinite_reverse]" />

      {/* Orbiting Icons */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full flex items-center justify-center"
      >
        {TOOLS.map((tool, idx) => {
          const angle = (idx / TOOLS.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <motion.div
              key={idx}
              className="absolute w-12 h-12 md:w-16 md:h-16 bg-[#111] rounded-2xl flex items-center justify-center shadow-lg border border-white/10"
              style={{
                x,
                y,
              }}
            >
              {/* Counter-rotate so icons stay upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full flex items-center justify-center p-2.5 md:p-3 group"
              >
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-all duration-300"
                  style={{ backgroundColor: tool.color }}
                />
                <img
                  src={tool.iconUrl}
                  alt={tool.name}
                  className="w-full h-full object-contain filter drop-shadow-md relative z-10 group-hover:scale-110 transition-transform"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
