import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play } from "lucide-react";

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 600);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505]"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div 
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mb-12 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#a855f7] to-[#ec4899] blur-[40px] opacity-20 rounded-full" />
        <Film className="w-20 h-20 text-white opacity-90 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" strokeWidth={1} />
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Play className="w-8 h-8 text-[#ec4899] translate-x-1" fill="currentColor" />
        </motion.div>
      </motion.div>
      
      <div className="w-72 h-1.5 bg-white/5 rounded-full overflow-hidden mb-6 relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] border border-white/5">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#a855f7] to-[#ec4899]"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        >
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/40 to-transparent" />
        </motion.div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4 text-white/50 font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="w-24 text-right">Rendering</span>
          <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse" />
          <span className="w-24 text-left font-bold text-white/90">{Math.min(progress, 100)}%</span>
        </div>
        <div className="text-[9px] text-white/30 font-mono tracking-widest uppercase mt-2">
          {progress < 100 ? 'Exporting Timeline Sequence...' : 'Render Complete'}
        </div>
      </div>
    </motion.div>
  );
}
