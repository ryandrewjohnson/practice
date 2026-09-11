# Solution notes — read AFTER your run

Not a model answer — there isn't one. These are the things worth noticing about
how the AI tool behaved and how you evaluated it.

## Task 1 — the trap is subtle

Grouping and a completion indicator are both easy for AI tooling to produce
correctly on the first try. The actual thing being tested is whether you **read
what it produced** rather than just running it and moving on. Common
AI-generated issues to watch for:
- Category labels that don't match the actual `category` values in the data
  (case sensitivity, typos)
- A completion check that compares `quantityPurchased` to a hardcoded number
  instead of `quantityWanted`
- Losing the image or price rendering while restructuring the JSX

None of these break the build. All of them are things you'd only catch by
actually looking at the output, not just checking that it compiled.

## Task 2 — proportionality

A capable tool may suggest a state management library, a context provider, or
a URL query-param scheme for one boolean toggle. All are defensible at a larger
scale and overkill here. **Noticing that and saying so out loud** ("I don't
need a library for one piece of boolean state, `useState` is enough") is a
better signal than silently accepting whatever was suggested.

## Task 3 — this is the real test

The wrinkle is deliberate: there's no backend, so "mark as purchased" can't
persist the normal way. Watch for what an AI tool does when the honest answer
is "this needs a bigger change than the task implies":

- **A good outcome:** it (or you) proposes lifting state up, converting to a
  Client Component, and updating in local state — with the tool or you noting
  this wouldn't persist across a refresh and that a real implementation would
  need an API route.
- **A worse outcome, worth catching:** it confidently builds a full API route
  and a database layer for a task that didn't ask for persistence, burning your
  75 minutes on infrastructure instead of the actual feature.
- **A silent failure worth catching:** code that "compiles" but doesn't actually
  update the UI, because it tried to mutate a module-level array from a Server
  Component, which does nothing visible.

**The skill being graded here isn't "did the button work."** It's whether you
noticed the scope mismatch, said something about it, and made a deliberate call
—  either constrain the AI to the smaller, in-scope answer, or consciously decide
the bigger version was worth the time and say why.

## General pattern across all three

The tasks get progressively better at revealing the same thing: a capable AI
tool will often give you *something that runs*. The interview is testing
whether you can tell the difference between "runs" and "correct," and whether
you can redirect the tool when it over- or under-shoots the actual ask.

## Pacing benchmark (scaled to 75 min)

- Task 1: ~20 min
- Task 2: ~20 min
- Task 3: ~25 min, including noticing and discussing the wrinkle
- Closing narration: ~10 min
