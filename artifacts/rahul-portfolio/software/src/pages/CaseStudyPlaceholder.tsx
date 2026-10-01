import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";

export function CaseStudyPlaceholder() {
  const [match, params] = useRoute("/software/projects/:id");
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!match) return null;

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-300 font-sans p-8 md:p-16">
      <button 
        onClick={() => setLocation("/software")}
        className="mb-8 px-4 py-2 bg-white/5 rounded-md hover:bg-white/10 transition-colors text-sm"
      >
        ← Back to Software
      </button>
      <h1 className="text-3xl md:text-5xl text-cyan-400 font-bold mb-4 uppercase">
        {params?.id?.replace(/-/g, " ")}
      </h1>
      <p className="text-xl text-slate-400 mb-12">Case study content coming soon...</p>

      <div className="space-y-8 max-w-3xl">
        <section>
          <h2 className="text-xl font-bold text-white mb-2">TL;DR</h2>
          <p>Brief summary of the project.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Problem</h2>
          <p>What problem does this solve?</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">What I Built</h2>
          <p>The solution.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">How It Works</h2>
          <p>Operational details.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Technical Architecture</h2>
          <p>System design.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Challenge</h2>
          <p>What was hard about this?</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Result</h2>
          <p>Outcomes and impact.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">What I Learned</h2>
          <p>Key takeaways.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Technologies</h2>
          <p>Tech stack used.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Links</h2>
          <p>GitHub / Demo links here.</p>
        </section>
      </div>
    </div>
  );
}
