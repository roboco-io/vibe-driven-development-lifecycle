---
title: "Template — Risk Matrix"
---

# Template — Risk Matrix

## When to Use

Use it in [Stage 4 — Verification](/guide/verify) when assigning a risk grade to each artifact and setting the verification intensity that matches the grade. Apply the same verification intensity to every artifact and you waste resources; conversely, wave a high-failure-cost area through lightly and it leads to an incident. This matrix is a document that agrees in advance on the grading criteria and, per grade, how far you must verify before you can pass it.

## How to Use

Copy the matrix below once into your project's `docs/` or `specs/`, and don't recreate it every cycle. You may adjust the grading criteria (the description part) to fit your project domain, but re-obtain team agreement on "whether human review is required" even after adjusting—lowering verification intensity is a decision to accept more risk. At the actual verification point, fill the "Per-artifact assessment" table below the matrix with the artifacts handled this cycle, recording which grade they are and why.

## Template

````markdown
# Risk Matrix

<!-- Guidance: Grade definitions may be adjusted to fit the project domain, but re-obtain team agreement when adjusting. -->

| Grade | Applicable areas (examples) | Human review | Cross-review (separate agent) | Automated test level |
|---|---|---|---|---|
| High | Payments, authentication, personal-data handling, irreversible data changes (deletion, migration) | Required — cannot deploy without pre-merge approval | Required — a different session than the implementing agent checks consistency and missing cases | Unit tests + integration tests + boundary/failure-case coverage |
| Medium | Core business logic (price calculation, permission branching, notification-send conditions, etc.) | Recommended — promote if judged high-risk | Recommended — may skip if pressed for time, but record the reason | Unit tests required, major branches covered |
| Low | Internal tools, prototypes, doc/style changes, easily reversible settings | May skip — proceed on automated checks passing alone | May skip | Passing existing tests is enough; new tests not enforced |

## Grading Criteria

<!-- Guidance: Leave the principle for which way to grade ambiguous borderline cases. -->

- **Is it reversible?** If it can be rolled back immediately on failure, you may grade it one level lower. If it can't be undone—like data deletion or billing—it's unconditionally High.
- **How wide is the impact?** Authentication/payment logic affecting all users is High. Logic affecting only a specific admin screen may be graded Medium or below.
- **When in doubt, raise it one level.** If you can't decide between High and Medium, treat it as High. The cost of doing more verification is always cheaper than the cost of an incident.

## Per-artifact Assessment

<!-- Guidance: Actually fill in the artifacts to verify this cycle. Don't omit "why this grade." -->

| Artifact | Grade | Basis |
|---|---|---|
| e.g.: Payment-method registration API | High | Directly handles payment info and includes external PG integration where rollback on failure is hard |
| e.g.: Discount-rate calculation rework | Medium | Affects revenue but is limited to a specific promotion screen and can be rolled back immediately after deploy |
| e.g.: Internal admin dashboard filter UI | Low | Internal tool; no data corruption even if wrong |
````
