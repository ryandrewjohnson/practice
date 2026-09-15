# Task 3 — Two more asks, and a question about parallel work

*(Only open once task 2 works.)*

Two more independent-sounding requests:

**3a.** Add a "Contribute" button on each campaign. Clicking it should show a
small form (name + amount) and, on submit, add a new contribution to that
campaign's list, updating the totals and progress from Task 1 immediately.

**3b.** Add a summary header above the campaign list showing: total number of
campaigns, total raised across all of them, and total still needed across all
of them.

## Before you start: the actual point of this task

Both of these touch the same underlying data (`campaigns` and each
campaign's `contributions`), and both touch or depend on code you wrote in
earlier tasks (the progress display, the totals calculation).

**If you were going to parallelize these — run two agent sessions or two
terminals at once, one on 3a and one on 3b — what would you do to avoid them
conflicting or producing an inconsistent result?**

You don't have to actually run them in parallel. But **say out loud, before
you start, what your approach would be** if you did: how you'd scope the work
so two agents (or two of your own working sessions) don't step on the same
file or the same piece of state, and what you'd check afterward to make sure
nothing was silently overwritten.

Then implement both, in whatever order you choose, and build a summary
calculation utility once rather than duplicating logic if you already wrote
something similar in Task 1.

## At time's up

Stop and narrate: what's done, what you'd finish next, and what you'd verify
again if you had five more minutes.
