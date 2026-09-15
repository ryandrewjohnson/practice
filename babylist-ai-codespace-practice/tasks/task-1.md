# Task 1 — Funding progress

Add a visual progress indicator to each campaign showing how much of the price
has been raised.

## What "done" looks like

- A progress bar or equivalent visual per campaign
- Show the percentage funded as text as well (e.g. "62% funded")
- **If total contributions exceed the price, show the overage rather than
  capping the bar or percentage at 100%.** Look at the data before assuming
  none of these overshoot.

## Worth deciding and stating out loud before you prompt

- What should the bar look like once a campaign is overfunded? A capped bar
  with a separate "+$X over" label, or a bar that visually extends past 100?
  Either is defensible — pick one and say why.
- Rounding: 61.5% funded — round, floor, or show a decimal?

## Reminder for this exercise specifically

**Plan before you prompt.** Say out loud what you're about to ask for and why,
before you send the prompt. **While the agent is working, keep talking** — say
what you expect it to touch, or think ahead to what you'll check once it
responds. When it returns something, **verify it out loud**: does the math
check out for at least one campaign by hand?
