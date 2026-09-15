# Task 2 — Contributor details

*(Only open once task 1 works.)*

Each campaign should let you expand to see who contributed, sorted by
contribution amount, highest first.

Additionally: show how recently each contribution was made (e.g. "contributed
3 days ago").

## What "done" looks like

- An expand/collapse interaction per campaign revealing the contributor list
- Sorted descending by amount
- A relative time shown per contribution

## The wrinkle — pay attention to what the AI proposes here

**Look at `src/lib/gift-data.ts`.** There is no date or timestamp field on a
`Contribution` anywhere in the existing data.

If you ask an agent to "show how recently each contribution was made," watch
what it does. A plausible failure: it invents plausible-looking dates,
fabricates a `contributedAt` field with made-up values, or otherwise produces
something that *looks* like it works without you noticing the data doesn't
actually support it.

**This is the moment to verify rather than accept.** Does the response explain
where the timestamp is coming from? Is it real, or invented to satisfy the ask?

## Worth deciding out loud

- Is the right move to add real timestamp data to the mock file first, then
  build the feature — or flag that the data doesn't support this and scope it
  down (e.g., show contributor + amount only, skip recency) given the time
  available?
- Either is a legitimate answer. What's not legitimate is not noticing the gap.
