import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";

export function EditingCaseStudyPlaceholder() {
  const [match, params] = useRoute("/editing/projects/:slug");
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!match) return null;

  return (
    <div className="min-h-screen bg-black text-[#f4f4f5] font-sans p-8 md:p-16">
      <button 
        onClick={() => setLocation("/editing")}
        className="mb-8 px-4 py-2 bg-white/5 rounded-md hover:bg-white/10 transition-colors text-sm uppercase tracking-widest font-bold"
      >
        ← Back to Editing
      </button>
      
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="text-5xl md:text-8xl font-bold uppercase leading-none mb-6 tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {params?.slug?.replace(/-/g, " ")}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest text-slate-400 mb-16 pb-8 border-b border-white/10">
          <div>TYPE: EDITORIAL</div>
          <div>YEAR: 2026</div>
          <div>ROLE: MOTION / EDITING</div>
        </div>

        <div className="w-full aspect-video bg-white/5 border border-white/10 flex items-center justify-center mb-16 rounded-xl overflow-hidden relative group">
          <span className="text-white/20 font-mono tracking-widest text-sm">VIDEO PLACEHOLDER</span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-lg font-light leading-relaxed text-slate-300">
          <div className="md:col-span-4 font-bold tracking-widest uppercase text-sm text-white">About the Project</div>
          <div className="md:col-span-8 mb-12">
            A deep dive into the creative choices, pacing, and visual storytelling used to bring this concept to life.
          </div>

          <div className="md:col-span-4 font-bold tracking-widest uppercase text-sm text-white">Editing Process</div>
          <div className="md:col-span-8 mb-12">
            From raw footage selection to the final grade, every step was meticulously crafted to ensure maximum impact and seamless flow.
          </div>
          
          <div className="md:col-span-4 font-bold tracking-widest uppercase text-sm text-white">Final Result</div>
          <div className="md:col-span-8 mb-12">
            A cohesive visual narrative that speaks for itself.
          </div>
        </div>
      </div>
    </div>
  );
}
