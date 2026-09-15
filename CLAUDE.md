# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo holds practice material for a timed take-home/interview exercise, not a production app.

- `babylist-ai-codespace-practice/` — the actual Next.js project. All commands below run from this directory.
- `test1/` — loose scratch copies of the same exercise's data/component files (no `package.json`, not a runnable project on its own).

## Commands (run from `babylist-ai-codespace-practice/`)

- `npm install` — install dependencies
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)

There is no test runner configured in this project.

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4, using `create-next-app` defaults.

- `src/app/page.tsx` — the single page in the app. Renders a list of group-gift campaigns.
- `src/app/layout.tsx` — root layout (Geist fonts, global CSS).
- `src/lib/gift-data.ts` — the entire data layer: an in-memory `campaigns` array (`GiftCampaign` → `Contribution[]`) exported as mock data. There is no backend, database, or API route — everything reads from this module directly.
- `@/*` path alias resolves to `src/*` (see `tsconfig.json`).

`babylist-ai-codespace-practice/CLAUDE.md` (importing `AGENTS.md`) is auto-generated/rewritten by `next dev` itself and carries Next.js's own breaking-change warnings for this version — leave it as-is rather than editing it as project documentation.

## Working in this repo

`tasks/task-*.md` define the exercise prompts and are meant to be opened one at a time, in order, during a timed run — don't read ahead into later tasks. `README.md` and `SOLUTION-NOTES.md` describe the exercise format and are for the human running the rehearsal, not implementation guidance for changes to the app itself.
