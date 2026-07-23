---
title: "Adoption Roadmap"
---

# Adoption Roadmap

> Organizational adoption proceeds in four steps. Each step is also the process of passing through a specific segment of the [Maturity Model](/adoption/maturity).

VDLC is not adopted by applying it company-wide all at once. We recommend running all six stages once through a place where failure is cheap, and widening the scope using the assets and rules that come out of it as a foothold. Move to the next step only after confirming the current step's completion signal—widen the scope without the signal and you replicate the anti-patterns the [Manifesto](/manifesto) points out across the whole organization.

## Step 1 — Pilot

**Corresponding maturity**: [L1 Exploring](/adoption/maturity) → L2 Practicing transition

### Goal

Experience all [six stages](/guide/intent) from start to finish once, in an area where failure is cheap. The purpose of this step is not to verify speed but to actually run the whole span from intent definition to feedback.

### What to Do

- Pick one internal tool or small new project with limited users where failure doesn't directly affect revenue.
- Proceed in order without omissions from [Stage 1 — Intent](/guide/intent) through [Stage 6 — Evolve](/guide/evolve).
- Set up only minimal mechanisms like the plan-approval gate and automated checks, and keep the rest simple. Don't try to build a perfect system at this stage.

### Completion Signals

- The pilot project completed one or more full laps of the six stages.
- The team can explain the difference between cycles run without an intent document and plan approval and cycles that followed the procedure.
- The team directly experienced anti-patterns like "Vibes without verification" and "Prompts without context" at least once and pinned down the cause.

### Related Guides/Templates

[Stage 1 — Intent](/guide/intent) · [Intent Document Template](/templates/intent-doc) · [Stage 4 — Verification](/guide/verify)

## Step 2 — Context Asset-building

**Corresponding maturity**: L2 Practicing → preparing to enter [L3 Compounding](/adoption/maturity)

### Goal

Organize the rules and knowledge you repeatedly explained or judged on the fly during the pilot into a reusable form. Without this step, the pilot's experience is valid only within that project and doesn't carry over to the next.

### What to Do

- Move the domain rules you repeatedly explained every session during the pilot into a project rules file (CLAUDE.md, etc.).
- Turn the mistake patterns repeatedly caught in the verification stage into a review checklist.
- Organize how you applied different verification intensities to artifacts of different risk into a risk-grade table.
- Don't end [Stage 6 — Evolve](/guide/evolve) with one pass in the pilot's last cycle—settle it as a habit that keeps recurring.

### Completion Signals

- When starting the next cycle, you don't repeat the same explanation from scratch as before.
- Someone outside the team can roughly grasp the team's judgment criteria just from the project rules file and checklist.
- Context assets (rules file, checklist, grade table) are committed to the repo and version-controlled.

### Related Guides/Templates

[Stage 2 — Context](/guide/context) · [CLAUDE.md Example](/templates/claude-md) · [Review Checklist](/templates/review-checklist) · [Risk Matrix](/templates/risk-matrix)

## Step 3 — Team Rollout

**Corresponding maturity**: [L3 Compounding](/adoption/maturity) settling in

### Goal

Shift the pilot's rules and assets from individual ownership to team-shared, and build a verification system with test criteria, review rules, and risk grades at the team level.

### What to Do

- Move context assets from a personal repository to a location the team references and refreshes together (shared repo, wiki).
- Agree that the whole team applies the same criteria for differentiating verification intensity by risk grade.
- Document the plan-approval gate and cross-review as the team's standard working procedure.
- Put a feedback ritual (regular retrospective, checklist refresh) that reflects what's learned into assets at the end of each cycle onto the team schedule.

### Completion Signals

- Most team members set verification intensity based on team-shared rules and grade tables rather than individual judgment.
- New joiners onboard quickly by referencing the team's context assets during onboarding.
- The feedback ritual exists as a procedure fixed on the team schedule rather than a particular individual's habit.

### Related Guides/Templates

[Stage 3 — Co-Construction](/guide/build) · [Stage 4 — Verification](/guide/verify) · [Stage 6 — Evolve](/guide/evolve) · [Risk Matrix](/templates/risk-matrix)

## Step 4 — Organizational Standard

**Corresponding maturity**: [L4 Systematizing](/adoption/maturity)

### Goal

Settle VDLC as the organization's standard process rather than a particular team's practice, and manage its effect with metrics.

### What to Do

- Build a system to regularly collect the 4 [Metrics](/adoption/metrics) (cycle lead time, rework rate, verification pass rate, context asset growth).
- Select, from context assets scattered across teams, those valid organization-wide and promote them to shared assets.
- Make reusing organizational standard assets a default procedure in new projects and new-hire onboarding.
- Regularly inspect signals of worsening metrics, and if needed, designate an owner to refresh the verification system or assets.

### Completion Signals

- Metrics are regularly collected at the organization level rather than a particular team, and are actually used in decision-making.
- New projects start by reusing organizational standard context assets from the outset.
- Whether to apply VDLC is the organization's default rather than an individual's choice.

### Related Guides/Templates

[Metrics](/adoption/metrics) · [Maturity Model](/adoption/maturity)
