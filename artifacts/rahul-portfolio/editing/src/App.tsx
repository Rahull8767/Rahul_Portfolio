import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation } from "wouter";

import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { EditingPage } from "@/pages/EditingPage";
import { EditingCaseStudyPlaceholder } from "@/pages/EditingCaseStudyPlaceholder";
import { EditingAllProjectsPage } from "@/pages/EditingAllProjectsPage";
import { SoftwarePage } from "@/pages/SoftwarePage";

function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((d) => !d), []);
  return { isDark, toggle };
}

export function App() {
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const seen = sessionStorage.getItem("portfolio-loaded");
    return !seen;
  });

  const { isDark, toggle } = useTheme();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [location] = useLocation();

  const handleLoadDone = useCallback(() => {
    sessionStorage.setItem("portfolio-loaded", "1");
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={handleLoadDone} />}
      </AnimatePresence>

      <main id="main-content" className="relative bg-background" aria-label="Portfolio main content">
        <AnimatePresence mode="wait">
          <Switch key={location} location={location}>
            <Route path="/" component={EditingPage} />
            <Route path="/software" component={SoftwarePage} />
            <Route path="/projects" component={EditingAllProjectsPage} />
            <Route path="/projects/:slug" component={EditingCaseStudyPlaceholder} />
          </Switch>
        </AnimatePresence>
      </main>

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        isDark={isDark}
        onToggleTheme={toggle}
      />
    </>
  );
}
