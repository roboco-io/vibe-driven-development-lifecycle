---
title: "Template — PR-FAQ"
---

# Template — PR-FAQ

## When to Use

Use it in [Stage 1 — Intent](/guide/intent) when picturing the finished shape first. In the way Amazon uses it for new-product planning, you write the launch announcement (Press Release) and expected Q&A (FAQ) of something not yet built. Instead of listing features or requirements, it forces "what changes for the user if this succeeds" into sentences from the user's perspective, so it filters out the mistake of implementing the surface with no purpose at the document stage. Write it alongside the intent document (6-pager); usually you write the PR-FAQ first to picture the target shape, then fill in background and constraints with the 6-pager.

## How to Use

Copy the template below and describe it in past/present tense, imagining the actual launch moment. Don't use conditionals like "still under review"—write it as settled fact to make clear what you're aiming for. Fill quotes with statements someone might plausibly make. Since the FAQ's purpose is to anticipate the questions that will actually come and prepare answers in advance, don't dodge the hard questions (price, constraints, failure scenarios).

## Template

````markdown
# [Product/Feature Name] Launch Announcement

## Headline

<!-- Guidance: The product/feature and its core value in one sentence. Write it like a press-release title. -->

e.g.: [Service Name] launches a simple setup wizard that cuts onboarding time from 30 minutes to 5

## Customer Problem

<!-- Guidance: The concrete difficulty customers face now, in 1-2 paragraphs. Include figures or cases. -->

e.g.: 42% of new users drop off in their first session without finishing setup. Most get confused about what to enter during the initial setup process, which runs to 12 steps.

## Solution

<!-- Guidance: What you built and how it solves the customer problem, in 1-2 paragraphs. -->

e.g.: The new onboarding wizard cuts required inputs to 5 steps and naturally guides the rest of the settings at the point they're needed during use. Users reach the core feature right away in their first session.

## Quote — Company/Team

<!-- Guidance: One quote on why you built this feature, from the team's perspective. -->

e.g.: "The biggest loss was users giving up at the settings screen before ever feeling the service's value." — [Owner Name], [Team Name]

## Quote — Customer

<!-- Guidance: One sentence imagining what a customer who used this feature might say. -->

e.g.: "I saw my first result 5 minutes after signing up. Before, I used to give up while still setting things up." — [Fictional customer persona]

## How to Start

<!-- Guidance: One paragraph of action guidance on what the customer should do now. -->

e.g.: Existing users need to do nothing. New sign-ups automatically experience the new onboarding flow from the next release.

---

# FAQ

## Customer FAQ

<!-- Guidance: 3-5 questions actual users might ask, with answers. -->

1. **e.g.: What happens to the settings I already saved?** Answer: Existing settings are kept as-is, and the new onboarding applies only to new sign-ups.
2. **e.g.: Where do I find the advanced settings I skipped later?** Answer: They're surfaced as a guide banner at the top of the settings menu and are accessible anytime.
3. **e.g.: Does this cost extra?** Answer: No, it's provided free to users on existing plans.

## Internal FAQ

<!-- Guidance: 3-5 questions the team/stakeholders might ask, with answers. Include risks, trade-offs, and the measurement plan. -->

1. **e.g.: How do we judge success?** Answer: Compare 7-day retention and onboarding completion time 4 weeks after release. Refer to the success criteria in the intent document.
2. **e.g.: What's the rollback plan if it fails?** Answer: Wrap it in a feature flag so we can revert to the previous flow immediately.
3. **e.g.: What did we exclude from this scope, and why?** Answer: Social login integration isn't directly related to this drop-off problem, so we deferred it to the next cycle.
4. **e.g.: Which teams should join the review?** Answer: Product, the authentication domain owner, and QA. Classified as High risk because the auth flow is involved.
````
