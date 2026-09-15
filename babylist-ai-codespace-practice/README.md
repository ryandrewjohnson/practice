# Babylist AI-Assisted Interview — Codespaces Practice Run

This one is meant to be run **in an actual GitHub Codespace**, not locally —
the point is to validate the real environment (Claude Code extension install,
login, GitHub, MFA) before the interview, not just practice the reasoning.

75-minute round, GitHub Codespaces, Claude Code or Copilot available. This
exercise assumes Claude Code via your own subscription.

---

## Setup — do this today, not the night before

1. Push this folder to your practice repo (or a throwaway one):
   ```
   cd babylist-ai-codespace-practice
   git init && git add . && git commit -m "practice repo 2"
   gh repo create babylist-ai-codespace-practice-2 --private --source=. --push
   ```
2. On the repo page: **Code → Codespaces → Create codespace on main.**
3. In the Codespace terminal: `npm install && npm run dev`.
4. Install the **Claude Code** extension from the Extensions marketplace inside
   the Codespace, and log in with your subscription.
   - **This step is the actual test.** If the extension won't install, or
     login fails, or it can't reach the network — you want to find that out
     now, not at 11am on the 15th.
5. If anything fails at step 4, that's exactly the information to put in the
   follow-up email about environment setup.

---

## How to run it

1. **75-minute timer.**
2. Open `tasks/task-1.md` only. Don't read ahead.
3. Work in Claude Code. **Everything below is what the actual interview is
   scoring — treat it as the rehearsal, not the coding.**
4. When a task is done, open the next one.
5. At 75 minutes, stop and narrate how you'd finish.
6. Read `SOLUTION-NOTES.md` after.

## The five things from the prep call — rehearse all five today

**1. No custom skills or agents.** Direct the plain agent conversationally.
Don't build reusable tooling — that's explicitly off-scope for this round.

**2. Plan before you execute.** Say the plan out loud before sending a prompt.

**3. Talk WHILE the agent works — this is the hard one.** When you send a
prompt and it's thinking or running a tool call, keep narrating. Practice
saying something like *"while that runs, let me think about what I'll check
once it's back"* instead of sitting in silence. This will feel unnatural the
first few times. That's why it's worth doing today.

**4. Verify visibly, don't just accept.** When it responds, say out loud what
you're checking. Task 2 in this exercise is built specifically to reward this
and punish skipping it.

**5. Have a parallelization answer ready.** Task 3 asks for one directly.
Practice stating an approach BEFORE writing code, even if you end up working
sequentially in practice.

## Self-assessment

- Did the Claude Code extension work cleanly in the Codespace? Any friction?
- Did I catch the missing-timestamp issue in Task 2, or did I notice fabricated
  data only after being told to look?
- Did I go silent during any tool-call wait? How long, and what would I say
  next time?
- Did I state a parallelization approach before or after starting to code?
