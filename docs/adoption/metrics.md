---
title: "Metrics"
---

# Metrics

> Where the maturity model shows "how far along you are" qualitatively, these 4 metrics show "whether you're actually improving" quantitatively.

Metrics are treated separately from the [Maturity Model](/adoption/maturity). Maturity is a checklist that judges how well procedures and assets have settled in; metrics are numbers that track over time whether those procedures are actually paying off. An organization that has reached [L4 Systematizing](/adoption/maturity) collects these 4 regularly, but even at earlier stages we recommend measuring them early to confirm direction.

Every metric shares a common risk. When improving the number itself becomes the goal, the metric gets better while the actual quality of the output gets worse—the counter-effect (Goodhart's law). Each metric's "Caution" points this counter-effect out in advance.

## Cycle Lead Time

### Definition

The time taken from starting intent definition to deployment (or merge on verification-pass). It measures the total time for one VDLC cycle—from [Stage 1 — Intent](/guide/intent) through [Stage 5 — Ship & Observe](/guide/ship).

### How to Measure

Take the intent-document commit time (or work-ticket creation time) as the start point and the deploy-completion time (or final merge time) as the end point. You can pull these from a work-management tool or the repo's commit/PR timestamps. Aggregate the median regularly (e.g., per sprint or per month) by team/feature—the average is easily distorted by a few large tasks, so prefer the median.

### Interpretation Guide

- **Improving signal**: The median gets shorter cycle after cycle. Especially if it shortens when comparing tasks of similar size, that's a signal that [context assets](/adoption/roadmap) are being reused and the compounding effect is kicking in.
- **Worsening signal**: Lead time grows, or the spread (the gap between the maximum and the median) widens. A widening spread means only a certain type of task is hitting the bottleneck, so you first need to decompose which stage is delaying.

### Caution

Artificially slicing work into small pieces to shorten only the individual lead times improves the number, but the total time to actual output completion stays the same or grows. Check together whether the work-decomposition unit itself has changed. Also, since lead time is sometimes reduced by skipping verification, always view it alongside rework rate and verification pass rate.

## Rework Rate

### Definition

The proportion of output once marked "done" that later has to be touched again due to defects, misunderstood requirements, or design changes. Rework includes bug fixes, re-implementation after review rejection, and post-deploy rollback/hotfix.

### How to Measure

Among changes merged in a given period, count the proportion where a follow-up commit/PR aimed at defect fixing or re-implementation occurred for the same feature/area after merge. You can also approximate it as the proportion of "bug"-labeled issues in the issue tracker that reference the original work. Calculate it as `rework count / total done count`, fixing the period (e.g., monthly) to see the trend.

### Interpretation Guide

- **Improving signal**: Rework rate falls, and even when rework happens it stays a small fix. As the intent document's success criteria get clearer and the verification system settles in, it's natural for this metric to go down.
- **Worsening signal**: Rework rate rises, or rework repeats in the same area. Repeated rework is a signal that a certain context asset (domain rule, review checklist) is stale or was never there to begin with.

### Caution

You can lower the number by defining "done" loosely so rework isn't counted as rework to begin with. Have the team agree on and fix the definition of done (e.g., no defects within N days after deploy) and don't change it arbitrarily. Rework is sometimes reduced by over-strengthening verification, which grows lead time along with it, so don't optimize this metric in isolation.

## Verification Pass Rate (First-pass Rate)

### Definition

The proportion of output submitted to [Stage 4 — Verification](/guide/verify) for the first time that passes as-is without additional fixes. It looks at whether it passed on the first try without rejection at any stage—automated tests, cross-review, or human review.

### How to Measure

Among the PRs (or review requests) in a given period, count the proportion approved/merged without a fix commit due to review comments. Calculate it as `first-pass count / total verification-submission count`. Separating and tallying automated tests and human review lets you more precisely tell which verification stage is the bottleneck.

### Interpretation Guide

- **Improving signal**: The pass rate rises while the rework rate is also low. When both metrics improve together, it means the quality of intent documents and context assets is actually reducing rejections at the verification stage.
- **Worsening signal**: The pass rate is low or stagnant. If a certain type of rejection (the same convention violation, the same missing edge case) recurs, it's a signal that the rule hasn't yet been reflected into a context asset (CLAUDE.md, review checklist).

### Caution

Lower the verification criteria themselves to raise this metric (passing reviews perfunctorily) and the pass rate rises, but rework rate and production defects rise in its wake. Always interpret it paired with rework rate. Also, calculating the pass rate on only low-risk output makes it look better than reality, so take all submissions regardless of risk grade as the denominator.

## Context Asset Growth

### Definition

A metric that jointly looks at how much the reusable context assets a team/organization holds (project rules files, reusable skills, domain wikis, review checklists, risk-grade tables, etc.) have grown and how much they've been reused over a period.

### How to Measure

Approximate **growth** by the per-period increment in the number of context-asset files/changed lines committed to the repo, or the number of wiki pages. Complement it with **reuse rate**—how much new projects or new sessions referenced existing assets. For example, count how many items a new project's CLAUDE.md took as-is from the existing organizational standard, or how many times the onboarding checklist links to the existing wiki.

### Interpretation Guide

- **Improving signal**: Assets grow steadily while reuse frequency rises together. This metric is the most direct evidence that the compounding structure described by [Principle 4 — Context as Asset](/manifesto) is actually working.
- **Worsening signal**: Assets grow but reuse doesn't. Documents just pile up with no one referencing them—a signal that feedback is happening only perfunctorily. Conversely, if asset growth itself has stopped, that's a signal that [Stage 6 — Evolve](/guide/evolve) isn't working.

### Caution

Counting only file or line counts allows gaming by mass-producing empty documents to inflate the number. Always view it alongside the reuse rate (how many times it was actually referenced/cited) to distinguish "assets that only pile up" from "assets actually used." Also, if you leave stale assets un-pruned, growth keeps looking positive while the density of actually valid assets can drop, so manage a procedure to regularly weed out stale assets too.

## Viewing Them Together

The four metrics are designed to check one another—shorten only lead time and rework grows; raise only verification pass rate and the criteria can loosen. Viewing all four side by side on the same cadence and confirming that when one improves noticeably the rest don't worsen along with it is the surest way not to game this metric system. Refer to the last step of the [Adoption Roadmap](/adoption/roadmap) (organizational standard) for when to start measuring metrics.
