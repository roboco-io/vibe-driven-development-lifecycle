---
title: "Stage 1 — Intent"
---

# Stage 1 — Intent

> Nail down what to build and why in verifiable sentences.

## Purpose of This Stage

The artifact of this stage is a document, not code, yet this document is what sets the ceiling for every stage that follows. When intent is vague, the agent fills the gaps with guesses, and those guesses come back as rework at the review stage. The goal is to finish the agreement on "what to build" among people first, and to leave that agreement in a document the agent can read without reading between the lines.

## How to Execute

1. **Describe the problem/opportunity in one paragraph.** Back up what hurts now and why it must be solved now with data or concrete cases. Reject descriptions at the level of "it would be nice if it were better."
2. **Work backward from the finished shape with a PR-FAQ.** Write the launch announcement and expected FAQ first, so you concretely picture "what changes if this succeeds" from the user's perspective.
3. **Describe background, constraints, and trade-offs in condensed 6-pager form.** Always record the alternatives you considered and discarded, and why. If you don't write down what you discarded, the same alternative gets proposed again later without re-examination.
4. **State verifiable success criteria.** Not "usability improves" but sentences you can judge true or false, like "success if onboarding takes 30 minutes or less."
5. **Get stakeholder agreement.** Leave review comments or an approval record in the document to shut down later claims of "nobody said that."

## Artifacts

- Intent document — [Intent Document Template](/templates/intent-doc) (condensed 6-pager form)
- PR-FAQ — [PR-FAQ Template](/templates/pr-faq)

Commit both documents to the repo as input for the next stage (Context) and for later cycles.

## Completion Checklist

- [ ] Success criteria are written as verifiable sentences, like "success if …"
- [ ] The alternatives deliberately discarded in trade-offs, and the reasons, are stated
- [ ] Background and constraints are concrete enough for the agent to read without guessing between the lines
- [ ] Agreement from all stakeholders (review comments, approval record) is recorded in the document
- [ ] The document is committed to the repo so it can be referenced as-is in the next session

## Common Mistakes

- **Feature-listing requirements.** Listing only "screen A, button B, API C" without why they're needed leaves the agent implementing the surface with no purpose.
- **Intent without success criteria.** With only immeasurable adjectives like "fast and stable," you can't set a pass line at the verification stage.
- **A write-once, throw-away document.** If it's neglected right after agreement and re-explained verbally every session, the document becomes a dead record and never carries over into a context asset.

## With Claude Code

::: tip
Commit the intent document to `specs/` or `docs/`, and state a rule in the project `CLAUDE.md`: "read the latest intent document first at the start of a session." That way every session starts from the same line.

Once the intent document is ready, move to plan mode. Point the prompt at the document path and ask, "build an implementation plan based on this intent document," and the agent proposes a plan that decomposes the intent into work units. Approving this plan is the gate into stage 3 (Co-Construction). Don't skip straight from the intent document to a plan without approval—undocumented intent evaporates in the next session.
:::
