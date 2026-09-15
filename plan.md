# Plan

Progress tracker for the timed exercise in `babylist-ai-codespace-practice/`.

## Status

- **Current:** —
- **Completed:** Task 1 (1.1 — Setup; 1.2 — Funding progress indicator)
- **Up next:** Task 2 (`tasks/task-2.md`)

Status values: `Not started` / `In progress` / `Blocked` / `Complete`

## Checklists

Source of truth. When an item is added here, copy it into every sub-task that
isn't Complete.

### Before you start

- [ ] Ensure there are no uncommitted changes

### Definition of done

Every item must be confirmed before a sub-task is marked Complete.

- [ ] Commit changes
- [ ] Create PR for review

## How we split work

- Break a task into sub-tasks only when it is opened — don't read ahead into
  later `tasks/task-*.md` files.
- Each sub-task is an isolated piece of work that can be committed on its own.
- Don't oversplit: if the work fits cleanly in one commit, keep it as one
  sub-task.
- Each sub-task gets its own branch and PR.
- A task is Complete when all of its sub-tasks are Complete.

## Tasks

### Task 1 — Funding progress (`tasks/task-1.md`)

**Status:** Complete (PRs awaiting review)
**Worktree:** `.claude/worktrees/task-1`

#### 1.1 — Setup: test tooling + tracking docs

**Status:** Complete
**Branch:** `task-1.1-setup`
**PR:** https://github.com/ryandrewjohnson/practice/pull/2

Scope:
- Start from `main` in the worktree, so `src/app/page.tsx` is back at `main`
  (the earlier Task 1 attempt is discarded).
- Update `e2e/task-1-funding-progress.spec.ts` to one-decimal expectations
  (car seat `107.4% funded` / `+$26.00 over`, monitor `110.6% funded` /
  `+$21.00 over`) and mark the suite `test.describe.fixme` until 1.2 lands.
- Commit Playwright setup (`playwright.config.ts`, `package.json`/lock,
  `.gitignore`), `e2e/`, `CLAUDE.md`, `plan.md`.
- `playwright.config.ts` reads `PORT` (default 3000), so e2e can run from a
  worktree while another checkout's dev server holds 3000.

Before you start
- [x] Ensure there are no uncommitted changes (fresh worktree from `main`)

Definition of done
- [x] Commit changes
- [x] Create PR for review

#### 1.2 — Funding progress indicator

**Status:** Complete
**Branch:** `task-1.2-funding-progress` (stacked on `task-1.1-setup`; PR
targets it until 1.1 merges)
**PR:** https://github.com/ryandrewjohnson/practice/pull/3

Scope:
- `src/lib/funding.ts`: pure helpers `totalContributed`, `percentFunded`,
  `overageCents`, `formatPrice`, `formatPercent` (moved out of `page.tsx`).
- `page.tsx`: per-campaign bar (fill width capped at 100%), `N.N% funded`
  text, `+$X over` label when overfunded, `role="progressbar"` + aria values.
  Keep DOM compatible with the e2e spec selectors or update the spec.
- `tests/funding.test.ts`: normal, overfunded, exactly 100%, one-decimal
  formatting.
- Remove `fixme` from the e2e spec; `lint`, `test:run`, `test:e2e` pass.

Hand-check values:

| Campaign | Raised / Price | Text | Overage |
|---|---|---|---|
| Stroller | $420.00 / $899.00 | 46.7% | — |
| Car Seat | $375.00 / $349.00 | 107.4% | +$26.00 |
| Crib | $530.00 / $649.00 | 81.7% | — |
| Monitor | $220.00 / $199.00 | 110.6% | +$21.00 |

Before you start
- [x] Ensure there are no uncommitted changes

Definition of done
- [x] Commit changes
- [x] Create PR for review

### Task 2 — `tasks/task-2.md`

**Status:** Not started — break down into sub-tasks when opened.

### Task 3 — `tasks/task-3.md`

**Status:** Not started — break down into sub-tasks when opened.

## Notes / decisions

- **Task 1 — overfunded display:** bar capped at 100% with a separate
  `+$X over` label. Keeps the bar's layout intact, and an exact dollar
  overage is clearer than a visual overflow.
- **Task 1 — percent text:** one decimal (`toFixed(1)`), e.g. `46.7% funded`.
  Accepted edge case (not in current data): 99.96% displays as
  `100.0% funded` while still short.
- **Pre-existing on `main`:** `npx tsc --noEmit` fails on
  `tests/home.test.tsx` (Vitest globals have no types). New tests import
  `describe`/`it`/`expect` from `vitest` explicitly to avoid adding to it.
