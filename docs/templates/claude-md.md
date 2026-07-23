---
title: "Template — CLAUDE.md Example"
---

# Template — CLAUDE.md Example

## When to Use

Use it in [Stage 2 — Context](/guide/context) when setting up the skeleton of a project rules file or inspecting and refreshing an existing one. The rules file is a context asset that keeps the agent from repeating the same questions every session ("how do I run tests," "what's the naming rule"). Unlike the other pages on this site, this document is an **exception to the tool-neutral principle**: it provides concrete examples based on `CLAUDE.md`, the file Claude Code actually reads. The format differs by tool, but the kinds of content to include are largely the same, so even with a different tool you can reference the section structure as-is.

## How to Use

Don't copy the example below verbatim. The comment above each section explains "why this section is needed"; it doesn't mean copy the content as-is. Delete sections that don't apply to your project, and if there's something you repeat verbally every session, add that as a section first. If the file balloons to thousands of lines, the rules that actually matter get buried, so don't write every detailed rule in this file—split them into separate documents and leave only links. In a multi-project workspace, put organization-wide common rules in the parent directory's `CLAUDE.md` and project-specific rules in the child projects, managing them in an inheritance structure.

Teams not using Claude Code can apply the same structure to their tool's corresponding file. For example, there's an `AGENTS.md` convention that many agent tools read in common, Cursor uses `.cursor/rules`, and other tools often have their own rules-file format—the filename and syntax differ, but the purpose of "having the agent read the project rules automatically at session start" is the same.

## Template

````markdown
# CLAUDE.md

<!-- Why it's here: Pin the nature of this document in one line at the very top, so the agent immediately recognizes "this isn't a reference doc but rules to follow." -->
This file holds the rules that AI agents working in this repository must follow.

## Project Overview

<!-- Why it's here: Give "what this project does"—hard to tell from code alone—in one paragraph, so the agent makes judgments fitting the purpose. -->
e.g.: This repository is an in-house payment-approval API server. Written in Node.js + TypeScript, it integrates with 3 external PG providers.

## Frequently Used Commands

<!-- Why it's here: So build/test/lint commands aren't asked about or guessed every time. Guess wrong and the agent fails trying to run a command that doesn't exist. -->
- Test: `npm test`
- Lint: `npm run lint`
- Run local server: `npm run dev`
- Migration: `npm run db:migrate`

## Coding Conventions

<!-- Why it's here: Prevent repeating naming/structure rules verbally every session. Without conventions, style diverges by agent and by session. -->
- Filenames use kebab-case, components use PascalCase.
- API response types must be declared explicitly under `types/` and `any` must not be used.
- Test files go in the same directory as their target file as `*.test.ts`.

## Prohibitions

<!-- Why it's here: Block hard-to-reverse or high-risk actions in advance. Ties into the areas classified as High in the risk matrix. -->
- Don't commit directly to the `main` branch. Always go through a PR.
- Don't run migration files directly against the production DB without separate approval after creating them.
- Don't expose the contents of `.env` or files under `secrets/` in logs or commits.

## Architecture Notes

<!-- Why it's here: Leave "why it's structured this way" so the agent doesn't propose refactorings that arbitrarily change the structure. Split detailed rationale into an ADR and link only a summary here. -->
Payment-approval logic is separated by an adapter pattern per PG provider (`src/adapters/`). Adding a PG provider requires implementing only a new adapter, without modifying existing adapters. See `docs/adr/0003-pg-adapter-pattern.md` for the background.

## Domain Glossary

<!-- Why it's here: Pin terms whose meaning splits within the team, so agent and people talk with the same meaning. -->
- "approve": the state of having received a payment-success response from the PG provider. Distinct from "complete"—complete means settlement is also finished.
- "merchant": our customer company that uses this system. Don't confuse it with "user," which means the end consumer.

## Test Principles

<!-- Why it's here: Ties into the "Test Reality" item of the review checklist. Enforces actual verification, not tests written just to pass. -->
When adding new logic, always include failure cases (PG provider timeout, duplicate approval request) in the tests, not just the happy path. Payment-related changes are High by the [Risk Matrix](/templates/risk-matrix), so don't merge without integration tests.

## Session-start Rules

<!-- Why it's here: Explicitly specify the documents to reference so every session starts from the same line. -->
Before starting work, read the latest intent document first (the most recent file under `specs/`). If you receive an instruction that conflicts with the intent document, don't implement it right away—check with the user first.
````
