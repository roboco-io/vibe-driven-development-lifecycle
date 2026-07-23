---
layout: home
hero:
  name: VDLC
  text: Vibe-Driven Development Lifecycle
  tagline: Intent is the source — a software development lifecycle redesigned around vibe coding
  actions:
    - theme: brand
      text: Read the Manifesto
      link: /manifesto
    - theme: alt
      text: Practical Guide
      link: /guide/intent
    - theme: alt
      text: Adoption Roadmap
      link: /adoption/roadmap
features:
  - title: Intent as Source
    details: The original is natural-language intent, not code. A well-written intent document is an executable spec fed to agents again and again.
  - title: Humans Judge, AI Executes
    details: What to build, how far to allow it, and whether to trust the result are the human's job; how to implement it is the agent's.
  - title: Verification Sets the Pace
    details: Generation is no longer the bottleneck. Lead time is decided by how quickly you can trust what was built, so investing in verification assets is investing in speed.
  - title: Context as Asset
    details: Project rules, reusable skills, and domain wikis are not side documents but core assets. They thicken with every cycle, and the thicker they get, the faster the next cycle runs.
  - title: Run Small Cycles, Feed Back Often
    details: The unit of a cycle is hours and days, not week-long sprints. Run intent–build–verify in small units and fold what you learned back into context immediately.
  - title: Understanding as Ownership
    details: Output approved without understanding piles up as cognitive debt and compounds. With every cycle, a person's understanding must grow alongside the context assets.
---

## What VDLC Is

VDLC (Vibe-Driven Development Lifecycle) is a development lifecycle that reconstructs the entire software development process for an era in which AI agents are the ones implementing code. Its core proposition is a single one: **intent and context are the primary artifacts, and code is a secondary artifact regenerable from them.**

## The Lifecycle: Six Stages

```mermaid
flowchart LR
    subgraph H["Human-led · AI-assisted"]
        P1["1. Intent"]
        P2["2. Context"]
        P6["6. Evolve"]
    end
    subgraph A["AI-led · Human gate"]
        P3["3. Co-Construction"]
        P4["4. Verification"]
        P5["5. Ship & Observe"]
    end
    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 -->|"Fail"| P3
    P4 -->|"Pass"| P5
    P5 --> P6
    P6 --> P1
    P6 -.->|"Context asset update"| P2
```

Intent, Context, and Evolve (stages 1, 2, 6) are led by humans and assisted by AI. Co-Construction, Verification, and Ship & Observe (stages 3, 4, 5) are led by AI, but humans guard the gates of plan approval, final review, and deploy approval.

## Why Now

As vibe coding moves into practice, the cost of writing code is effectively converging to zero. The problem is that the rest of the lifecycle stays the same. If you leave the existing SDLC in place and slot AI only into the implementation stage, four problems recur.

- **Speed imbalance** — If only implementation gets faster while the stages before and after stay the same, total lead time barely shrinks.
- **Quality risk** — Enjoying generation speed without a verification system mass-produces code that dazzles in a demo but is impossible to maintain.
- **Knowledge evaporation** — Decisions and domain knowledge scattered through prompts and conversations vanish when the session ends, and the next task starts from bare ground again.
- **Capability erosion** — When approving code you don't understand becomes routine, cognitive debt accumulates, and the number of people who can judge the code steadily shrinks.

VDLC tackles these four problems head-on: it places the bottleneck stages at the center of the lifecycle, accumulates evaporating knowledge as context assets, and builds a structure in which a person's understanding grows along the way.

## Learn More

- [Manifesto](/manifesto) — the full text covering VDLC's definition, background, six principles, and relationship to existing methodologies
- [Practical Guide](/guide/intent) — a playbook covering how to execute each of the six stages
- [Templates](/templates/) — reusable document formats such as intent documents, PR-FAQs, and risk matrices
- [Adoption](/adoption/) — documents for designing an organizational adoption path with a maturity model, roadmap, and metrics
