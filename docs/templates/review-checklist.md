---
title: "Template — Review Checklist"
---

# Template — Review Checklist

## When to Use

Use it in [Stage 4 — Verification](/guide/verify) when a person or a cross-review agent reviews agent output. Review code only for "was it well written" and you easily miss agent-specific mistakes—implementation that diverges from intent, tests that actually verify nothing, needlessly defensive code. This checklist nails those mistakes down as items so the reviewer doesn't miss the same things every time.

## How to Use

Copy the checklist below per PR/commit under review and paste it into a review comment or review-record document. Don't pass items you can't check (items with insufficient basis)—leave the reason next to them. If an item comes up repeatedly in review, move it into the project `CLAUDE.md` or a lint rule so it's caught automatically from the next cycle—leave it only in the checklist without moving it into a context asset and the same mistake repeats.

## Template

````markdown
# Review Checklist: [PR/Commit Identifier]

- Risk grade: <!-- Guidance: Write the grade per the risk matrix. e.g.: High -->
- Reviewer: <!-- Guidance: State whether it's a different person or agent than the implementing agent/session -->

## Intent Consistency

<!-- Guidance: Confirm the output actually matches the goals written in the intent document. -->

- [ ] The implementation actually satisfies the intent document's goals (success criteria) (e.g., "reduce onboarding to 5 steps" confirmed by actual step count)
- [ ] No scope not in the intent document was added arbitrarily (e.g., unrequested UI elements, out-of-scope refactoring)
- [ ] The intent document's non-goals (what was discarded) weren't accidentally re-implemented

## Security Basics

<!-- Guidance: Always check if the risk grade is Medium or above. -->

- [ ] User input doesn't go straight into a query/command/template without validation or escaping
- [ ] Authentication/authorization checks are in place at every entry point with no bypass path (e.g., missing middleware when adding an API route)
- [ ] Secrets (API keys, tokens) aren't hard-coded in code or logs

## Test Reality

<!-- Guidance: Confirm not the fact that tests pass, but the reason they pass. -->

- [ ] When you make the test fail (by deliberately breaking the logic), it actually fails — not a fake test that always passes
- [ ] Boundary values and failure cases (empty input, max value, network error, etc.) are included in the tests
- [ ] Tests verify intended behavior rather than implementation details (e.g., "is the result value correct" rather than "was the function called")

## Context Reflection

<!-- Guidance: Confirm the output follows the project's existing rules, conventions, and terms. -->

- [ ] Coding conventions (naming, folder structure) match `CLAUDE.md`/the existing codebase
- [ ] No new near-duplicate feature was built without reusing an existing util/helper
- [ ] Terms pinned in the domain glossary weren't used with a different meaning

## Slop Signals

<!-- Guidance: Look for patterns that look fine in a demo but become debt at the maintenance stage. -->

- [ ] No duplicated code (the same logic isn't copy-pasted in several places)
- [ ] No dead code (unused functions, unreachable branches, commented-out code blocks)
- [ ] No excessive defensive code (logic isn't made hard to read by wrapping impossible cases in try-catch/null checks)

## Overall Assessment

- [ ] Based on the items above, this output can be trusted and passed to the next stage (deployment)
- Items that didn't pass and follow-up actions: <!-- Guidance: State whether to close with a code fix or to fix the intent document/context asset too -->
````
