# Task 2 — Essentials filter

*(Only open once task 1 is done and grouping/completion works.)*

Add a toggle that filters the whole view down to items where `isEssential` is
`true`. When it's off, show everything (current behaviour). When it's on, only
essential items should appear — grouping and completion indicators from Task 1
should keep working on the filtered set.

## What "done" looks like

- A visible, clickable toggle (button, switch, checkbox — your call)
- Toggling it changes what's rendered, without a page reload
- Category grouping still makes sense when the set is filtered (e.g. a category
  with zero essential items shouldn't show an empty heading)

## Worth deciding out loud

- Where does this piece of UI state belong? (Local component state is fine here
  — say why you're not reaching for anything heavier.)
- What happens to a category that has items, but none of them essential, once
  the filter is on?
