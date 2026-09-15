# Plan

Progress tracker for the timed exercise in `babylist-ai-codespace-practice/`.

## Status

- **Current:** 1.3 — Funding edge cases (unhappy paths)
- **Completed:** 1.1 — Setup; 1.2 — Funding progress indicator
- **Up next:** Task 2 (`tasks/task-2.md`)

Status values: `Not started` / `In progress` / `Blocked` / `Complete`

## Checklists

Source of truth. When an item is added here, copy it into every sub-task that
isn't Complete.

### Before you start

- [ ] Ensure there are no uncommitted changes

### Definition of done

Every item must be confirmed before a sub-task is marked Complete.

- [ ] Confirm edge cases are covered — unhappy paths as well as the happy path
- [ ] Commit changes
- [ ] Create PR for review
- [ ] PR merged into `main` (verify the change is on `origin/main`)

## How we split work

- Break a task into sub-tasks only when it is opened — don't read ahead into
  later `tasks/task-*.md` files.
- Each sub-task is an isolated piece of work that can be committed on its own.
- Don't oversplit: if the work fits cleanly in one commit, keep it as one
  sub-task.
- Each sub-task gets its own branch and PR, branched from the latest `main`
  and targeting `main`. Don't stack PRs — if a sub-task depends on another,
  wait for that PR to merge and pull `main` first.
- A task is Complete when all of its sub-tasks are Complete.

## Tasks

### Task 1 — Funding progress (`tasks/task-1.md`)

**Status:** In progress (1.3 open)
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
- [x] PR merged into `main` (merge commit `9d109c7`)

#### 1.2 — Funding progress indicator

**Status:** Complete — edge-case gaps found on review are handled in 1.3
**Branch:** `task-1.2-funding-progress`
**PR:** https://github.com/ryandrewjohnson/practice/pull/4 (replaces #3, which
merged into `task-1.1-setup` instead of `main`)

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
- [x] Confirm edge cases are covered — **gaps found** (price ≤ 0 → `NaN%` /
      `Infinity%` and a full bar; negative total → full bar). Fixed in 1.3.
- [x] Commit changes
- [x] Create PR for review
- [x] PR merged into `main` (merge commit `f6edc7b`)

#### 1.3 — Funding edge cases (unhappy paths)

**Status:** In progress
**Branch:** `task-1.3-funding-edge-cases`
**PR:** https://github.com/ryandrewjohnson/practice/pull/5

Scope:
- `percentFunded` returns `null` when the price isn't positive (0, negative,
  NaN) and floors a negative total at 0%.
- Move `FundingProgress` to `src/components/FundingProgress.tsx` (page files
  can't export it for tests). Invalid price → "Funding progress unavailable",
  no bar.
- Unit tests (`tests/funding.test.ts`) and component tests
  (`tests/funding-progress.test.tsx`) split into happy / unhappy path:
  zero/negative/NaN price, negative total, no contributions, 1-cent overage,
  99.96% rounding edge.
- Add the "edge cases covered" item to the Definition of done.

Before you start
- [x] Ensure there are no uncommitted changes (branched from `main` after
      #4 merged; only the DoD edit that ships with this sub-task)

Definition of done
- [x] Confirm edge cases are covered — unhappy paths as well as the happy path
      (7 new unhappy-path tests fail against the 1.2 logic, pass with guards)
- [x] Commit changes
- [x] Create PR for review
- [ ] PR merged into `main` (verify the change is on `origin/main`)

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
  `100.0% funded` while still short. Pinned by a test in 1.3.
- **Task 1 — invalid data:** a non-positive price shows "Funding progress
  unavailable" instead of a bar; a negative total (refunds) shows 0%.
- **Pre-existing on `main`:** `npx tsc --noEmit` fails on
  `tests/home.test.tsx` (Vitest globals have no types). New tests import
  `describe`/`it`/`expect` from `vitest` explicitly to avoid adding to it.
- **Task 1 — stacked PR mishap:** #3 (1.2) was stacked on #2 (1.1). #2
  merged first, GitHub didn't retarget #3 (base branch not deleted), and #3
  merged into `task-1.1-setup` — so 1.2 never reached `main`. Fixed by a new
  PR from `task-1.2-funding-progress` into `main`. Led to the "PR merged into
  `main`" DoD item and the no-stacking rule.
