import { useEffect } from "react";

import { EditingNav } from "@/components/sections/editing/EditingNav";
import { EditingHero } from "@/components/sections/editing/EditingHero";
import { EditingStack } from "@/components/sections/editing/EditingStack";
import { EditingWork } from "@/components/sections/editing/EditingWork";
import { EditingAbout } from "@/components/sections/editing/EditingAbout";
import { EditingServices } from "@/components/sections/editing/EditingServices";
import { EngineerEditor } from "@/components/sections/editing/EngineerEditor";
import { EditingFooter } from "@/components/sections/editing/EditingFooter";

export function EditingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-[#f4f4f5] overflow-x-hidden selection:bg-fuchsia-500/30 font-sans">
      
      {/* 01. Header / Navigation */}
      <EditingNav />
      
      {/* 02. Hero */}
      <EditingHero />
      
      {/* 03. Creative Stack */}
      <EditingStack />
      
      {/* 04. Selected Work */}
      <EditingWork />
      
      {/* 05. About */}
      <EditingAbout />
      
      {/* 06. Services */}
      <EditingServices />
      
      {/* 07. Engineer x Editor */}
      <EngineerEditor />
      
      {/* 08. Final Contact / Footer */}
      <EditingFooter />
      
    </div>
  );
}
