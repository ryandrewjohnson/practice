# Task 3 — Mark an item purchased (the curveball)

*(Only open once task 2 works. This one has a deliberate wrinkle.)*

Add a button on each item: "Mark as purchased." Clicking it should increment
`quantityPurchased` by 1 (not exceeding `quantityWanted`) and the UI should
update immediately to reflect the new state.

## The wrinkle

`registryItems` is a plain in-memory array exported from a module — there's no
backend, no database, no API route. Clicking a button in a React Server
Component can't mutate that array and have it reflected back in the UI the way
a normal database write would.

**This is intentional.** It's the moment where an AI suggestion is most likely
to produce something that looks right and doesn't actually work — or reaches
for more machinery (an API route, a database) than a 15-minute task needs.

## What "done" looks like

- Clicking the button visibly updates the count and, if now complete, the
  completion indicator from Task 1
- It doesn't silently fail, and it doesn't let purchased exceed wanted
- You can explain WHY whatever approach you took works, not just that it does

## Worth deciding out loud

- Does this need to be a Client Component now? What changes as a result?
- Is client-side-only state an acceptable shortcut for this scope, or would you
  flag it as something you'd revisit with more time (e.g. "in a real app this
  writes through an API, here I'm keeping it in local state to stay in scope")?
- If the AI proposes spinning up an API route and a data-fetching layer for
  this, is that proportional to the task? What would you push back on, and why?

## At time's up

Stop and narrate: what you'd build next, what you'd change for production,
what you deliberately kept small and why.
