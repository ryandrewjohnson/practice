# Babylist AI-Assisted Interview — Practice Repo

Simulates their format: an existing small Next.js application, scoped tasks
added one at a time, worked with Claude Code or Copilot, narrated out loud.

Real interview: 75 minutes, GitHub Codespaces, Claude Code (own subscription) or
Copilot available. **They're watching how you prompt, how you evaluate suggestions,
where you lean on AI, where you override it — not whether the feature gets built.**

---

## Setup

### Option A — GitHub Codespaces (matches the real environment)

1. Push this folder to a new GitHub repo (private is fine):
   ```
   cd babylist-ai-practice
   git init
   git add .
   git commit -m "practice repo"
   gh repo create babylist-ai-practice --private --source=. --push
   ```
   (No `gh` CLI? Create an empty repo on github.com, then `git remote add origin <url> && git push -u origin main`.)
2. On the repo page, click **Code → Codespaces → Create codespace on main**.
3. Once it opens, run `npm install && npm run dev` in the terminal.
4. Open the forwarded port to see the app. Open Claude Code or Copilot Chat in the
   Codespaces sidebar same as you would locally.

### Option B — Local (faster to start, misses the Codespaces UI itself)

```
npm install
npm run dev
```
Open http://localhost:3000.

---

## How to run this like the real thing

1. **Set a 75-minute timer.**
2. Open `tasks/task-1.md`. **Do not read task 2 or 3 yet** — they're revealed
   progressively, same as a real interviewer adding scope.
3. Work in Claude Code (or Copilot). **Talk out loud the entire time** — their
   prep email says this is the biggest differentiator in every other round, and
   this round explicitly grades prompting and evaluation, which only shows up if
   you narrate it. Record yourself if you can.
4. When task 1 is genuinely done, open task 2. Same for task 3.
5. At 75 minutes, stop wherever you are and narrate how you'd finish and what
   you'd trade off — same closing discipline as every other round in this loop.
6. Afterwards, read `SOLUTION-NOTES.md`.

## What to narrate, specifically

This round scores differently from the others — not "did you solve it," but
**how you operated the tool.** Say these out loud as they happen:

- **What you're asking for and why.** Not just the prompt — the reasoning behind
  it. "I'm going to ask it to group these by category first, since that's the
  foundation the other tasks probably build on."
- **What you're checking before accepting.** Does the type check pass? Does it
  match the existing code style? Did it invent a prop or API that doesn't exist?
- **Where you override it.** If it proposes something you disagree with, say why,
  and say what you're doing instead.
- **Where you lean on it vs. where you already knew the answer.** This is the
  self-assessment moment — normal and expected, not a weakness to hide.

## Self-assessment (fill in after)

- Did I narrate my prompts, or just type quietly and paste results?
- Did I catch anything the AI got wrong? What, and how did I catch it?
- Did I accept anything without checking it? Would I, in the real interview?
- Where did I lean on AI most — and was that the same place I expected?
- Did I finish all three tasks? If not, could I clearly narrate how I'd finish?
