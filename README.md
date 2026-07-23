# VDLC — Vibe-Driven Development Lifecycle

**English** | [한국어](README.ko.md) | [日本語](README.ja.md)

A software development lifecycle redesigned for the era when AI agents are the primary authors of code. The core thesis: **intent and context are the primary artifacts, and code is a regenerable secondary artifact.**

📖 **Website: https://vdlc.roboco.io** (English · [한국어](https://vdlc.roboco.io/ko/) · [日本語](https://vdlc.roboco.io/ja/))

## What is VDLC

VDLC rebuilds the entire development process around vibe coding instead of bolting AI onto the implementation stage of a traditional SDLC. It consists of:

- **Six principles** — Intent as Source; Humans Judge, AI Executes; Verification Sets the Pace; Context as Asset; Run Small Cycles, Feed Back Often; Understanding as Ownership
- **A six-stage lifecycle** — Intent → Context → Co-Construction → Verification → Ship & Observe → Evolve. Stages 1·2·6 are human-led with AI support; stages 3·4·5 are AI-led with human gates (plan approval, final review, deploy approval)
- **Practical assets** — stage-by-stage playbooks, document templates, a maturity model, an adoption roadmap, and metrics

## Repository layout

| Path | Description |
|---|---|
| `docs/` | VitePress site — English at the root, Korean under `ko/`, Japanese under `ja/` |
| `slides/` | Slidev presentation deck (Korean), deployed at `/slides/` |
| `vdlc.md` | Original Korean manifesto (source of truth for the Korean text) |
| `specs/` | Design and planning documents |

## Development

```bash
npm install
npm run docs:dev     # dev server
npm run docs:build   # production build

cd slides
npm install
npm run dev          # slide dev server
npm run build        # slide build
```

Pushing to `main` triggers GitHub Actions, which builds the site and slides and deploys them to GitHub Pages.
