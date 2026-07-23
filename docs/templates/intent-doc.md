---
title: "Template — Intent Document (Condensed 6-pager)"
---

# Template — Intent Document (Condensed 6-pager)

## When to Use

Use it in [Stage 1 — Intent](/guide/intent) when agreeing among people on "what to build and why" and leaving it as a document. In a condensed form of Amazon's 6-pager, the purpose is to carry background, problem, goals, constraints, and trade-offs as narrative so the agent can read without guessing between the lines. Write it before starting a new feature or project, before moving to stage 3 (Co-Construction).

## How to Use

Copy the template below as-is into a file under `specs/` or `docs/`. The comments (`<!-- -->`) under each section are guidance on what to write, so delete them after filling in the actual content. Sentences beginning with "e.g.:" are example fragments showing how to fill in, and should be replaced with facts from your actual project. Once the document is done, run it through stakeholder review, leave an approval record (review comments or commit log), and commit it to the repo—an intent document without agreement makes the next session repeat the same debate.

## Template

````markdown
# Intent Document: [Project/Feature Name]

## Background

<!-- Guidance: In 3-5 sentences, describe the current situation and what prompted the need for this document, backed by data or concrete cases. -->

e.g.: Last quarter, the onboarding drop-off rate for new sign-ups came to 42%. In user interviews, "I gave up midway through the settings screen" came up repeatedly.

## Problem

<!-- Guidance: Describe what hurts now in one paragraph. Descriptions at the level of "it would be nice if it were better" are subject to rejection. -->

e.g.: A new user goes through an average of 12 steps to reach the core feature in their first session. Seven of those steps are not strictly required by the current business logic.

## Goals (Success Criteria)

<!-- Guidance: Write sentences you can judge true or false, like "success if …". Adjective expressions like "usability improves" are prohibited. -->

- e.g.: Success if new users complete onboarding within 30 minutes
- e.g.: Success if the first-session drop-off rate falls to 20% or below

## Non-goals (What Was Discarded)

<!-- Guidance: Leave what you considered but deliberately excluded from this scope, and why. If you don't write it down, the same alternative gets proposed again without review. -->

- e.g.: Social login integration — not directly related to this drop-off problem, so deferred to the next cycle.
- e.g.: Redesigning onboarding for existing users — this scope is limited to new sign-ups.

## Constraints

<!-- Guidance: List the given boundary conditions—budget, schedule, tech stack, org policy, etc. -->

e.g.: The existing authentication system cannot be replaced. Deployment must finish within 2 weeks.

## Trade-offs and Rationale

<!-- Guidance: State the alternatives you examined, the reason for not choosing them, and the cost the chosen option pays. -->

e.g.: We cut onboarding from 12 steps to 5, deferring some advanced settings items to after onboarding. We judged that preventing early drop-off takes priority over early convenience for advanced users.

## Open Questions

<!-- Guidance: Leave questions you haven't answered yet. These are items to address in stakeholder review. -->

- e.g.: Do we apply the new onboarding flow to existing users too, or only to new sign-ups?
- e.g.: Is the success-criteria measurement point right after sign-up, or at the 7-day retention mark?
````
