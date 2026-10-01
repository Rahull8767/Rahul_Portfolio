import { useEffect, useState } from "react";

export function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:fixed"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 255, 218, 0.05), transparent 80%)`
      }}
    />
  );
}
