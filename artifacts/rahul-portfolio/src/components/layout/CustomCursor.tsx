import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a,button,input,textarea,[role='button']")) {
        setHovered(true);
      }
    };
    const handleLeave = () => setHovered(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleEnter);
    window.addEventListener("mouseout", handleLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleEnter);
      window.removeEventListener("mouseout", handleLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full bg-primary"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          willChange: "transform",
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9997] rounded-full border border-primary transition-all duration-200 ${
          hovered ? "opacity-100 scale-150" : "opacity-60"
        }`}
        style={{
          width: hovered ? 36 : 28,
          height: hovered ? 36 : 28,
          marginLeft: hovered ? -18 : -14,
          marginTop: hovered ? -18 : -14,
          willChange: "transform",
        }}
      />
    </>
  );
}
