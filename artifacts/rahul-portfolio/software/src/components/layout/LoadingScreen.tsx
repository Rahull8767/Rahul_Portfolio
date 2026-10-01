import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Initializing portfolio...",
  "Loading projects...",
  "Connecting to GitHub...",
  "Ready.",
];

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < LINES.length) {
        setLines((prev) => [...prev, LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onDone, 400);
      }
    }, 380);

    const cursor = setInterval(() => setCursorVisible((v) => !v), 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursor);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: "#000010" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-mono text-sm text-primary w-80 space-y-2">
        {lines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-muted-foreground">$</span>
            <span>{line}</span>
          </motion.div>
        ))}
        <span
          className="inline-block w-2 h-4 bg-primary ml-4"
          style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
        />
      </div>
    </motion.div>
  );
}
