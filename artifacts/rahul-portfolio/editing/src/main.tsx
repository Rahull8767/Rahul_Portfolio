import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "@/index.css";
import { Router } from "wouter";

// Remove trailing slash from BASE_URL if present, as Wouter expects base without it
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router base={base}>
      <App />
    </Router>
  </StrictMode>,
);
