import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export type ProjectMediaProps = {
  src: string;
  poster?: string;
  alt: string;
  type?: "video" | "image";
};

export function ProjectMedia({ src, poster, alt, type = "image" }: ProjectMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5, margin: "0px" });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    if (isInView) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented
          console.warn("Autoplay prevented for video:", src);
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isInView, type, src]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0f18] border border-white/5 group"
      style={{ aspectRatio: "16/9" }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Subtle Cyan Glow on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.15)] pointer-events-none z-20" />
      <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/20 rounded-2xl transition-all duration-500 z-20 pointer-events-none" />

      {type === "video" ? (
        <>
          {/* Blurred Background Layer for Cinematic Effect (prevents black bars) */}
          <div className="absolute inset-0 z-0 opacity-50 blur-2xl saturate-150 transform scale-110 pointer-events-none">
            {poster ? (
              <img src={poster} alt="" className="w-full h-full object-cover" />
            ) : (
              <video src={src} muted loop className="w-full h-full object-cover" />
            )}
          </div>
          
          {/* Poster fallback while video loads */}
          {!isVideoLoaded && poster && (
            <img
              src={poster}
              alt={alt}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 z-10"
            />
          )}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-contain relative z-10 transition-all duration-700 group-hover:brightness-110"
            onLoadedData={() => setIsVideoLoaded(true)}
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 z-0 opacity-50 blur-2xl saturate-150 transform scale-110 pointer-events-none">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain relative z-10 transition-all duration-700 group-hover:brightness-110 group-hover:scale-105"
            loading="lazy"
          />
        </>
      )}
    </motion.div>
  );
}
