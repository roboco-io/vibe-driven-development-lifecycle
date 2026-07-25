# Release Notes

VDLC is not a finished document but a methodology that keeps evolving. Versions follow SemVer: a major bump when a premise or core proposition changes, a minor bump when a principle or structure is added, a patch for wording and typo fixes. The very trajectory of the methodology's evolution is a live example of the "feedback" and "learning asset" VDLC talks about.

## v1.2 — 2026-07-25

**Detailed lifecycle diagram — a circular view of actors and harness**

- Replaced the plain P1–P6 diagram on the manifesto and landing pages with a circular ring diagram that surfaces, in one view, each stage's human/AI work, who leads, the human gates (plan approval, final review, ship approval), and the automated guardrails
- Implemented as a single Vue component driven by locale string data, supporting all three locales (English, Korean, Japanese)
- Reflows into a vertical 1→6 card stack on narrow screens (<960px) for mobile readability

## v1.1 — 2026-07-25

**The Weekly Cycle and prototype-driven shaping**

- Added the [Weekly Cycle](/cycle) page, which reinterprets Basecamp Shape Up's six-week cycle on top of VDLC's premises — a 4-day build (Mon–Thu) + 1-day cool-down (Fri) makes one week one heartbeat, with the context breaker, parallel bets, the delegability map, and the verification gate
- Introduced prototype-driven shaping — two patterns, convergent (fast iteration) and divergent (parallel curation), the throwaway principle, and auto-generated decision records
- Defined the pitch template — dual-currency Appetite, Rabbit Holes, No-Gos, decision-record links
- Framed cycle length as a re-betting rhythm — the right length is a function of verification-asset maturity, information arrival rate, and understanding bandwidth. Variants: upward 8 + 2 days (two weeks, enterprise), downward 2 + 1 days (three days)
- Introduced the release notes page and version display on the site and slides

## v1.0 — 2026-07-24

**Multilingual support**

- Established a three-language system with English as the root locale (English / 한국어 / 日本語)
- Translated all pages: manifesto, guide, templates, and adoption

## v0.3 — 2026-07-24

**Principle 6, "Understanding is ownership"**

- Added the problems of capability erosion and cognitive debt to the background, and promoted them to the sixth principle (5 principles → 6)
- Reflected the drive/gateway distinction and understanding-verification and learning mechanisms into the lifecycle
- Added the anti-pattern "approval without understanding"

## v0.2 — 2026-07-23

**Presentation slide deck**

- Added a Slidev presentation deck of about 30 slides, deployed together with the site (`/slides/`)

## v0.1 — 2026-07-22

**First public release of the site**

- Published the manifesto, the six-stage playbook, five templates, and adoption (roadmap, maturity model, metrics)
- Deployed at https://vdlc.roboco.io
