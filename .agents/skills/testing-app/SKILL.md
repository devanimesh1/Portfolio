---
name: testing-portfolio
description: How to run, build, lint, and test the Portfolio app locally.
---

# Testing the Portfolio App

## Dev Server

```bash
npm run dev -- --port 3000
```

The app runs at `http://localhost:3000`. It is a Next.js app with no backend dependencies (Firebase is scaffolded but not wired up).

## Lint

```bash
npm run lint
```

Uses ESLint. Must pass clean before pushing.

## Build

```bash
npm run build
```

Runs Next.js production build with TypeScript type checking. Must pass clean before pushing.

## Key Pages & Routes

- `/` — Main portfolio page with all 10 sections (Hero, About, Experience, Skills, Projects, Certifications, AI Lab, Blog, Contact, Footer)
- `/admin` — Admin panel (no real auth — accepts any input)
- `/api/chat` — Chat API stub
- `/api/contact` — Contact form API stub
- `/api/recruiter` — Recruiter analysis API stub

## Interactive Components to Test

- **ChatBot**: Click the chat icon (bottom-right). Test starter prompts and custom queries. Responses are keyword-matched, not AI-powered.
- **Recruiter Mode**: Click "Recruiter Mode" button (bottom-left). Paste a job description to get a fit analysis. PDF download buttons are non-functional.
- **Project Modals**: Click "View Case Study" on any project card to open the detail modal.
- **Neural Cursor**: Move the mouse to see particle trail effects.

## Data Source

All resume/portfolio content is hardcoded in `src/data/resume.ts`. This is the single source of truth for all displayed information. When verifying text accuracy, compare against the user's resume PDFs.

## Mobile Testing

Use Chrome DevTools device toolbar to test at:
- 375px (mobile)
- 768px (tablet)
- 1280px+ (desktop)

The ChatBot opens full-screen on mobile. CTA buttons stack vertically. Experience timeline shifts to left-aligned on small screens.
