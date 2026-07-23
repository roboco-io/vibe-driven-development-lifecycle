---
title: "Maturity Model"
---

# Maturity Model

> A standard that divides the degree of VDLC adoption into 4 levels, to gauge where a team is now and what it should do next.

Maturity is judged by how well procedures and assets have settled in, not by whether tools are used. A team that uses a coding agent every day is still at a low level if it has no team-shared rules and no verification system; conversely, a team with low tool-usage frequency has already entered the next level if intent documents and a plan-approval gate have taken hold.

## The 4-Level Table

| Level | Name | Characteristics | Distinguishing signals |
|---|---|---|---|
| 1 | Exploring | An individual experimenting with vibe coding, no process | Prompt sessions evaporate; verification is "OK if it runs" |
| 2 | Practicing | An individual/a few run the VDLC cycle | Intent-document writing starts, context files exist, plan-approval gate used |
| 3 | Compounding | Team-level context assets accumulated and reused | Team-shared rules/skills/templates, risk-based verification, feedback ritual settled |
| 4 | Systematizing | Organizational standard settled, managed by metrics | Lead time/rework rate measured, assets reused in onboarding |

## Level Details

### L1 — Exploring

**Characteristics**: An individual is experimenting with a coding agent, but there's no team-level process. Prompts and their results stay inside each person's chat window.

**Distinguishing signals**: When a session ends, what was agreed in that session vanishes with it. The standard for judging whether output can be trusted is at the level of "just run it and OK if it works." The same question is re-explained every session.

**Key to the next level**: Leave the starting point, not the output—writing the purpose and success criteria on a single sheet before writing code.

### L2 — Practicing

**Characteristics**: An individual or a few deliberately run the [six-stage](/guide/intent) cycle. They write intent documents and proceed to implementation only after reviewing the agent's plan.

**Distinguishing signals**: Intent-document writing has begun, and a project rules file (CLAUDE.md, etc.) exists. They use the plan-approval gate, but this procedure is still an individual's habit, not the team's rule.

**Key to the next level**: Move the individual's rules file and habits into team-shared assets—shifting the CLAUDE.md and checklist you referenced alone into something the whole team uses and refreshes together.

### L3 — Compounding

**Characteristics**: Context assets accumulate and are reused at the team level. Verification intensity varies by risk, and a feedback ritual that reflects what's learned into assets at the end of each cycle has settled in.

**Distinguishing signals**: Team-shared rules/skills/templates exist and several people reference the same ones. There's a standard for differentiating verification intensity by risk grade. Regular feedback (retrospective, checklist refresh) is on the team schedule.

**Key to the next level**: Turn the qualitative sense of "it's getting better" into quantitative metrics—actually starting to measure [metrics](/adoption/metrics) like lead time and rework rate.

### L4 — Systematizing

**Characteristics**: VDLC is the organization's default rather than a particular team's practice. Effect is managed with metrics, and new projects and onboarding start on the premise of reusing existing assets.

**Distinguishing signals**: Metrics like cycle lead time and rework rate are measured regularly and used in decision-making. During onboarding, new joiners reuse organizational standard context assets.

**Key to maintaining the standard**: Don't neglect signals of worsening metrics—standardization is not a state you've reached but a state you keep maintaining by continually inspecting it with [metrics](/adoption/metrics).

## Self-diagnostic Checklist

Three questions per [principle](/manifesto) among the six, 18 in total. Within each principle, the questions are arranged by difficulty—question 1 (Q1) naturally becomes "yes" at the L2 (Practicing) level, question 2 (Q2) at the L3 (Compounding) level, and question 3 (Q3) at the L4 (Systematizing) level. The level determination that follows tallies these by the Q1/Q2/Q3 series separately, so marking which number (Q1/Q2/Q3) each question is when you answer makes scoring easy. All ask about observable facts, so answer only yes/no.

### Principle 1 — Intent as Source

- [ ] Q1. Before starting feature work, you leave the purpose and success criteria on at least a single sheet.
- [ ] Q2. There's a team-shared intent-document format (6-pager, PR-FAQ, etc.) and it's actually used for most work.
- [ ] Q3. You review the success criteria written in intent documents after the fact and reflect them into the quality standard for the next intent document.

### Principle 2 — Humans Judge, AI Executes

- [ ] Q1. A person has reviewed and approved the implementation plan the agent proposed before code was written.
- [ ] Q2. The plan-approval gate has settled as the team's documented procedure rather than an individual habit.
- [ ] Q3. The authority over what to build and when to deploy, and the scope of execution delegation, are codified at the organization level and covered in onboarding.

### Principle 3 — Verification Sets the Pace

- [ ] Q1. It's rare to merge agent output without automated tests or static analysis.
- [ ] Q2. The team has a standard for differentiating verification intensity (automated checks only vs. human review required) by risk level.
- [ ] Q3. You regularly measure a metric like verification pass rate (first-pass rate) and use it to improve the verification system.

### Principle 4 — Context as Asset

- [ ] Q1. A project rules file (CLAUDE.md, etc.) exists and is actually referenced.
- [ ] Q2. Team-shared context assets (skills, wiki, conventions) exist and several people reuse them.
- [ ] Q3. You track the growth and reuse of context assets, and new projects start with reusing existing assets by default.

### Principle 5 — Run Small Cycles, Feed Back Often

- [ ] Q1. One intent-build-verify cycle runs on a day-to-few-days scale rather than a sprint scale.
- [ ] Q2. There's a feedback ritual on the team schedule that moves what's learned into rules/checklists/wiki at the end of each cycle.
- [ ] Q3. You track whether the results of feedback lead to improvements in organizational metrics (lead time, rework rate, etc.).

### Principle 6 — Understanding as Ownership

- [ ] Q1. You have the habit of summarizing the plan or changes in your own words to confirm them before approving agent output.
- [ ] Q2. For high-risk changes, the team has a procedure (explain-back, code walkthrough, etc.) to confirm the approver can explain the content.
- [ ] Q3. A learning activity that repays points passed over without understanding during feedback is codified as an organizational standard procedure and covered in onboarding.

## Level Determination Rule (Tiered Mapping)

Don't simply sum the number of "yes" answers across the 18 questions. Instead, tally the Q1/Q2/Q3 series (6 questions each, one per principle) separately and check the conditions in order from the top level down.

| Check order | Condition | Level if met |
|---|---|---|
| 1 | 3 or more "yes" among the Q3 series (the 6 question-3 items) | L4 Systematizing |
| 2 | (if 1 unmet) 3 or more "yes" among the Q2 series (the 6 question-2 items) | L3 Compounding |
| 3 | (if 1 and 2 unmet) 3 or more "yes" among the Q1 series (the 6 question-1 items) | L2 Practicing |
| 4 | None of the three conditions above met | L1 Exploring |

Check in order from the top and take the level of the first condition satisfied as the final level (if a higher condition is met, don't check the lower ones). We set the threshold at 3 of 6 questions because the spec's per-level distinguishing signals each consist of about 3 items (e.g., L2 = intent document, context file, plan-approval gate—3 things)—each series has one question corresponding to each signal (6 principles × 1 question = 6 questions), so if half (3 or more) of them are "yes," that level's signals are genuinely manifesting.

Simple summation ignores that Q1/Q2/Q3 represent different maturity signals and produces misjudgments at the boundaries. For example, a team with "yes" on exactly the questions matching the spec's 3 L2 distinguishing signals has a total of 3, which the summation formula misjudges as L1—but the series rule satisfies 3 or more in the Q1 series and correctly determines L2. Likewise, a team that fully meets the L2 signals (all 6 in the Q1 series) and also has the 3 L3 distinguishing signals stays at L2 with a total of 9 in the summation formula, but the series rule satisfies 3 or more in the Q2 series and correctly determines L3.

The checklist is for self-assessment, and we recommend the whole team answers individually and then compares results. If there's a question where answers diverge widely, that itself is a signal of a procedure not shared within the team. Confirm the next step matching your diagnostic result in the [Adoption Roadmap](/adoption/roadmap).
