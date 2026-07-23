---
title: "Stage 5 — Ship & Observe"
---

# Stage 5 — Ship & Observe

> Shipping is not the end but the start of gathering input for the next cycle.

## Purpose of This Stage

The output that passed stage 4 is now up for verification in the real environment. This stage's role is not the act of deploying itself but returning what happens in the operating environment into a form the next cycle can consume. A CI/CD pipeline and observability tools are preconditions for this stage. Without automated deployment, manual work wedges between verification-pass and deploy and eats away speed; without observability, operational problems slip by unnoticed into the next cycle. If either one is missing, VDLC stops here.

## How to Execute

1. **Automatically deploy the verified output.** The decision of whether to deploy was already made at the stage 4 gate (including risk-proportional human review), so deploy execution is handled by the pipeline as-is, without separate approval. If a person intervenes again at execution here, the speed secured at the verification stage is wasted.
2. **Observe operational data.** Continuously check predefined observation targets—logs, error rate, latency, user-behavior metrics. Observation must happen in normal times, not after an incident breaks out.
3. **Organize issues into reproducible context.** When you find a problem, record it in a form with three things: logs, reproduction steps, and expected behavior. Miss these three and the next cycle has to repeat the investigation from scratch.
4. **Pass the organized context as input to the next cycle.** The issue becomes material that loops back to stage 1 (Intent) or stage 2 (Context). Break it off here and observation ends as mere record.

## Artifacts

- Automated deploy history — leave it as pipeline run logs
- Reproducible issue context — records complete with logs, reproduction steps, and expected behavior

Issue context must connect as input to the next cycle's stage 1 intent document or stage 2 context assets.

## Completion Checklist

- [ ] Verified output is automatically deployed without a person's manual approval
- [ ] The tools and targets for observing operational data after deploy are defined
- [ ] Each found issue is recorded together with logs, reproduction steps, and expected behavior
- [ ] Organized issues connect to the next cycle's input (intent document or context assets)
- [ ] A CI/CD pipeline and observability tools are actually in place

## Common Mistakes

- **Passing issues along only in conversation.** Wave it off with "this seems weird" and there's no reproduction context, so the next cycle's agent or person has to find the cause from scratch.
- **Automating even the deploy-approval gate.** What you automate is deploy execution of approved output, not the judgment of whether to deploy. Wave even high-risk changes straight through without stage 4 human review, and—just as with requirements interpretation and architecture choice—the human gate at the judgment point disappears and you go far in the wrong direction.
- **Deferring observation to incident-response time.** Dig through logs only when an outage hits, without normal-time observability, and the time and information to build reproducible context are already gone.

## With Claude Code

::: tip
Set up a pipeline that deploys an agent triggered by an operational issue, and first-pass handling—from issue registration through reproduction and fix proposal—becomes possible without a person. Force the three items of logs, reproduction steps, and expected behavior in the issue template, and you secure input the agent can start on right away.

Run `claude` headless inside the CI pipeline and you can detect failures found after deploy and automate cause analysis or a fix-commit proposal. The person just channels this proposal back into the verification stage (stage 4) to pass through the gate.
:::
