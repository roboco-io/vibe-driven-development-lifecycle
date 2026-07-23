---
title: "Stage 4 — Verification"
---

# Stage 4 — Verification

> It's not the speed at which something was built but the speed at which it became trustworthy that decides total lead time.

## Purpose of This Stage

The output from stage 3 is not yet an object of trust. The purpose of this stage is to close the gap between "it was built" and "it can be trusted." Since generation speed is no longer the bottleneck, investing in verification is the same as investing in total lead time. Applying the same verification intensity to every artifact wastes resources, so scale verification intensity in proportion to the cost of failure.

## How to Execute

1. **First line of defense — run automated tests and static analysis.** Pass verifications that run immediately without a person first—unit tests, lint, type checks. What isn't filtered here wastes every later stage.
2. **Assign a risk grade.** Judge how large the cost is if this artifact fails. Classify whether it's a high-failure-cost area like payments, authentication, or personal data, or a light area like an internal tool or prototype. Use the [Risk Matrix](/templates/risk-matrix) as the standard.
3. **Second line of defense — a separate agent cross-reviews.** In proportion to the risk grade, a different session/different agent than the one that implemented reads the code again and checks consistency with intent and missing cases.
4. **Final gate — a human reviews.** The higher the risk grade, the greater the weight of human review. Low-risk areas can move on with automated checks passing alone. Verification covers the approver's understanding too. For high-risk changes, put "can the approver explain this code" into the pass criteria—explain-back, explaining what you understood to the agent and having it confirmed, and code walkthroughs, tracing the change points together with the agent, are effective tools.
5. **Trace found problems to their root.** Don't stop at fixing the code. If there's room for the same problem to recur, go back up to the defect in the intent document or context asset and fix that too.

## Artifacts

- A verification plan with risk grades assigned — [Risk Matrix](/templates/risk-matrix)
- Review records — [Review Checklist](/templates/review-checklist)

Leave the verification-pass record as the basis for moving to stage 5 (Ship & Observe).

## Completion Checklist

- [ ] Each artifact has a risk grade assigned
- [ ] The first line of defense (automated tests, static analysis) runs automatically without human intervention
- [ ] High-risk areas went through a separate agent's cross-review
- [ ] High-risk areas have a human review record
- [ ] For high-risk changes, it was confirmed the approver can explain their content
- [ ] Found problems didn't stop at a code fix; where needed, the intent document and context assets were updated too

## Common Mistakes

- **Applying the same verification intensity to every artifact.** Review even a prototype at payment-system level and verification becomes the bottleneck; conversely, wave auth logic through as lightly as a prototype and it leads to an incident.
- **Trusting only automated checks and skipping human review.** Passing tests just means the defined cases were satisfied; whether it's consistent with intent is a separate question.
- **Fixing only the symptom and leaving the root.** If the same type of mistake recurs in the next cycle, it's a signal that the rule to block it hasn't yet been moved into a context asset.

## With Claude Code

::: tip
Split code review into a separate subagent or a dedicated review command, so it plays the second line of defense from a different perspective than the implementing session. The key is to avoid a structure where the same session approves its own results.

Enforce running tests before commit with a hook, so the first line of defense can't be skipped even if a person forgets. Add mistake patterns repeatedly caught in verification as items in the review checklist, so from the next cycle the same mistake gets caught automatically.
:::
