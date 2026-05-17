# Rahul Tembhare Portfolio

A production-ready futuristic dark-theme portfolio for Rahul Tembhare — 3rd-year B.Tech Industrial IoT student at PCE Nagpur.

## Run & Operate

- `pnpm --filter @workspace/rahul-portfolio run dev` — run the portfolio (port 24836)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, Framer Motion
- Contact form: EmailJS (`@emailjs/browser`)
- GitHub integration: GitHub REST API with JSON fallback
- Build: Vite (ESM)

## Where things live

- `artifacts/rahul-portfolio/src/App.tsx` — root component; handles loading, dark mode, command palette
- `artifacts/rahul-portfolio/src/components/layout/` — Navbar, Footer, CustomCursor, LoadingScreen, ScrollProgress
- `artifacts/rahul-portfolio/src/components/sections/` — Hero, About, Skills, Projects, Experience, Education, Certifications, GitHubActivity, Contact
- `artifacts/rahul-portfolio/src/components/shared/` — CommandPalette, ProjectModal
- `artifacts/rahul-portfolio/src/data/` — projects.ts, skills.ts, experience.ts, certifications.ts, github-fallback.json
- `artifacts/rahul-portfolio/src/hooks/` — useScrollProgress, useActiveSection, useGitHubData, useCommandPalette
- `artifacts/rahul-portfolio/src/types/index.ts` — shared TypeScript interfaces

## Architecture decisions

- Dark mode default, persisted via `localStorage`. `.dark` class on `<html>`.
- Loading screen shown only once per browser session (via `sessionStorage`).
- GitHub Activity section tries the live API first; falls back to `github-fallback.json` silently on 429 rate-limit.
- EmailJS contact form uses honeypot + timing check for spam prevention. Requires three env vars (see `.env.example`).
- Custom cursor disabled on touch devices via `navigator.maxTouchPoints`.

## Product

A 10-section single-page futuristic portfolio: Hero (animated terminal + particle canvas), About (stats + timeline), Skills (glassmorphism cards), Projects (filterable with modal details), Experience (vertical timeline), Education, Certifications, GitHub Activity (live stats + repo cards), and Contact (EmailJS form + social links). Includes a command palette (⌘K), scroll progress bar, custom cursor, and two Easter eggs (type "sudo" / Konami code).

## User preferences

- GitHub username: `rahultembhare`
- Accent colors: cyan (`#00f5ff`) / blue (`#3b82f6`) / purple (`#7c3aed`)
- Font: JetBrains Mono for code elements, Inter for body

## EmailJS Setup

Copy `.env.example` → `.env` and fill in:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## Gotchas

- Screenshot tools always catch the loading screen because they start fresh sessions — the site works correctly in a real browser.
- The `pnpm-workspace` skill has the canonical workspace structure info.
- GitHub API stats images (github-readme-stats, streak-stats) are third-party — if they go down, the rest of the page is unaffected.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
