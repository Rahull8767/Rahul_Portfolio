import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed top-0 left-0 z-[9999] h-[2px] bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-100"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
