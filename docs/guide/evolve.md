---
title: "Stage 6 — Evolve"
---

# Stage 6 — Evolve

> VDLC without feedback is just fast coding.

## Purpose of This Stage

The result you shipped and observed in stage 5 changes nothing on its own. This stage's role is to feed what the cycle taught back into context assets so the next cycle runs better. As Principle 4 (Context as Asset) says, VDLC is designed as a compounding structure in which assets thicken with every cycle, and the thicker they get, the faster the next cycle runs. Skip this stage and every cycle repeats the same mistakes from scratch—coding that is merely fast. Feedback covers more than the organization's assets. As Principle 6 (Understanding as Ownership) says, the individual's understanding must grow here too.

## How to Execute

1. **Move repeated instructions into project rules.** If you've repeated the same instruction more than once, that's a rule the agent should know on its own. Add it to CLAUDE.md or an equivalent rules file.
2. **Reflect mistake patterns caught in verification into the review checklist.** If the same type of problem was found repeatedly in stage 4 (Verification), add an item that filters it into the checklist so it's caught automatically from the next cycle.
3. **Move newly organized domain knowledge into the wiki.** Domain rules, terms, and edge cases uncovered while running the cycle shouldn't stay buried in conversation logs—organize them into wiki documents.
4. **Repay points you passed over without understanding.** Revisit the patterns and techniques you met for the first time this cycle, put them into your own words, and if there's code you approved but can't explain, learn it here to pay off the cognitive debt.
5. **Run a light cycle retrospective, on an hourly scale.** Don't batch it weekly like a sprint retrospective. A few minutes at the end of each cycle is enough—just sweep three questions: what did I instruct repeatedly, what got caught in verification, what did I newly learn.

## Artifacts

- Updated project rules, review checklist, wiki documents — at least one
- Cycle retrospective record — short answers to the three questions are enough

Whether feedback is actually lifting the organization's speed is tracked with the [Adoption Metrics](/adoption/metrics).

## Completion Checklist

- [ ] At least one context asset (rules, checklist, wiki) was updated this cycle
- [ ] If there were repeated instructions, they were reflected into project rules
- [ ] If there were mistake patterns caught in verification, they were reflected into the review checklist
- [ ] If there was newly uncovered domain knowledge, it was reflected into the wiki
- [ ] If there were points passed over without understanding, they were revisited and put into your own words
- [ ] The cycle retrospective was done lightly at the end of each cycle rather than on a sprint scale

## Common Mistakes

- **Skipping feedback and moving straight to the next cycle.** Don't reflect what you learned into assets and the same mistake repeats identically in the next cycle. Speed is fast, but the organization doesn't get smarter.
- **Batching the retrospective on a sprint scale.** Batch the retrospective weeks later and the details of what you instructed repeatedly and what got caught and why blur. Better to do it briefly right after the cycle ends, while memory is sharp.
- **Leaving asset updates as personal notes.** If updated rules or knowledge don't go into files the agent reads (CLAUDE.md, wiki, checklist), the agent still knows nothing in the next cycle.

## With Claude Code

::: tip
At the end of each cycle, get into the habit of asking yourself "was there anything I instructed repeatedly this time?"—and if so, adding a line to CLAUDE.md. If it's a procedure you use repeatedly across several projects, promote it to a slash command or skill to make it a reusable asset.

Learning that crosses sessions can be reinforced with the memory feature. Leave a mistake pattern or domain knowledge you found in a given session in memory, and in the next session you can pick right up without repeating the same explanation.
:::
