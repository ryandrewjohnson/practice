# Solution notes — read AFTER your run

## Task 1

Easy for a tool to get functionally right. The actual test is whether you
noticed the overfunded campaigns in the data (check the numbers by hand: does
any campaign's contributions exceed its price?) and made a deliberate choice
about how to display that, rather than accepting a capped-at-100% bar without
noticing some campaigns exceed their goal.

## Task 2 — this is the important one

There is genuinely no timestamp data. If you asked an agent to "show how
recent" a contribution was without checking this first, one of three things
likely happened:

1. **It told you the data doesn't support this** and asked how you want to
   proceed — the good outcome, and worth noting if it happened, since it means
   the tool itself flagged the gap.
2. **It invented a `contributedAt` field with plausible fake values** and
   built the feature on top of fabricated data, without flagging that the
   values are made up. This is the trap. If you didn't check the diff closely
   enough to notice new fake data appearing in your source file, that's the
   thing to reflect on.
3. **It got confused or produced something that silently doesn't work**,
   which is its own kind of failure worth noticing.

**The behavior being tested is the same either way: did you look at what
changed in `gift-data.ts`, not just whether the UI rendered something
plausible?** A UI that renders "3 days ago" tells you nothing about whether
that number means anything.

## Task 3 — parallelization

There's no single right answer, but a reasonable one: 3a and 3b both read from
`campaigns`/`contributions`, but 3a *writes* to it (adding a new contribution)
while 3b only *reads* aggregate totals. If run as genuinely separate parallel
agent sessions touching the same file, the risk is a merge conflict or one
session's edit silently clobbering the other's, especially if both modify
`page.tsx` or add a new shared utility at the same time.

A defensible approach: scope 3a to its own new component file (e.g.
`ContributeForm.tsx`) and 3b to its own (`CampaignSummary.tsx`), and touch
`page.tsx` minimally and last, wiring both in sequentially once each piece
exists independently. That keeps two "parallel" workstreams from touching the
same lines of the same file even if you're switching between them quickly by
hand.

**What matters for the interview is that you had an answer at all before
starting** — not which specific strategy you picked.

## Pacing (scaled to 75 min)

- Task 1: ~20 min
- Task 2: ~20 min (includes noticing and discussing the wrinkle)
- Task 3: ~25 min (includes stating the parallelization approach before coding)
- Closing narration: ~10 min
