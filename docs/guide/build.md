---
title: "Stage 3 — Co-Construction"
---

# Stage 3 — Co-Construction

> Keep control by approving the plan, and leave implementation entirely to the agent.

## Purpose of This Stage

Once intent and context are ready, this stage's role is to move them into an actual artifact. Here the human's job is not to write code but to control direction. A single gate—approving the plan the agent proposed—keeps the result within a predictable range, while the repetitive work of implementation is left entirely to the agent. When this boundary breaks, the human either loses speed by reviewing code line by line, or loses control by handing off implementation without a plan.

## How to Execute

1. **Decompose the work into independently verifiable units.** A single unit must let you judge on its own whether it's done. Even if it spans several files, split it further if you can't independently confirm "this unit is finished."
2. **Have the agent propose a plan.** Based on the intent document and context assets, let the agent build the plan first—what to implement, in what order, and how.
3. **The human approves the plan — this is the gate.** Read the plan, not the code, and check whether the direction is right, whether any unit is missing, whether it touches high-risk areas. So approval doesn't become a rote click, summarize the plan in your own words and check it back with the agent. If the summary is off, that is a problem of understanding before it is a problem of the plan, and you don't approve a plan you don't understand. Don't move to implementation without approval.
4. **The agent implements.** Within the scope of the approved plan, the agent writes the code. If a change not in the plan becomes necessary, get separate approval.
5. **Self-check per unit.** For each finished unit, have the agent run tests or re-verify the output itself, to secure a minimum of trust before moving to the next unit.

## Artifacts

- The approved implementation plan — leave it as a session log or plan document
- Implemented code and per-unit self-check records

Even if you don't leave the plan itself as a separate file, what was approved must be traceable from the commit message or PR description.

## Completion Checklist

- [ ] Every work unit is split to an independently verifiable size
- [ ] A plan was proposed before implementation, and there's a record of the human explicitly approving it
- [ ] No out-of-scope, unapproved changes are mixed in
- [ ] Conflicts between units run in parallel are isolated via worktree or branch separation
- [ ] A minimum self-check (running tests, etc.) was done for each unit

## Common Mistakes

- **Instructing implementation directly, without a plan.** Start with "just build this" and the agent fills the gaps arbitrarily; you only learn the direction was wrong when you go to review the result.
- **Proceeding with one giant work unit.** When a single approval changes dozens of files at once, plan approval degenerates into a virtually meaningless formality.
- **Approving agent output without reading it.** Wave through plan or implementation with "yes, looks good" without skimming, and the gate exists but doesn't function.

## With Claude Code

::: tip
Start in plan mode and the agent presents a plan before writing code, requiring a person to approve that plan before moving on. This flow enforces the stage 3 gate at the tool level.

If there are several independent units, run subagents in parallel to progress them at once. Since sharing the same working directory causes conflicts, isolate each agent's workspace with a git worktree and merge finished units in order.
:::
