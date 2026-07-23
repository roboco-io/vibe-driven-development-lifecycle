---
title: "Stage 2 — Context"
---

# Stage 2 — Context

> Prepare knowledge and rules as assets so the agent doesn't ask the same questions again every time.

## Purpose of This Stage

Even with the same model, what divides the quality of the output is the quality of the context. The goal of this stage is to have assets the agent can reference for the project's rules, structure, terms, and conventions without asking again every time. For a new project, set up a minimal skeleton; for an existing project, inspect and refresh the assets accumulated in prior cycles—confuse the two and you leave over-documentation on a new project and neglected documentation on an existing one.

## How to Execute

1. **Draft the skeleton of the project rules file.** Fill `CLAUDE.md` (or an equivalent file) with coding conventions, prohibitions, and frequently used commands at the minimum unit.
2. **Leave architecture decision records (ADRs).** Record "why this structure was chosen," briefly, along with alternatives and rationale, so the same debate doesn't recur later.
3. **Organize a domain glossary.** Pin terms whose meaning splits within the team (e.g., "account" vs. "user") in one place so agent and people talk with the same meaning.
4. **State coding conventions.** Move things instructed repeatedly every session—naming, folder structure, test placement rules—into the rules file.
5. **Inspect reusable skills (existing projects).** Check whether skills, prompts, and subagent definitions made in prior cycles are out of sync with the current code, and refresh them.

## Artifacts

- Project rules file — [CLAUDE.md Example](/templates/claude-md)

A new project can start with just items 1 and 4 (rules skeleton, conventions) of the five above. An existing project sweeps all five items from an "inspect and refresh" angle—most of the work is finding and fixing stale parts rather than writing anew.

## Completion Checklist

- [ ] A rules file exists, and an agent seeing the project for the first time can start work from it alone
- [ ] Recent major architecture decisions have ADRs
- [ ] Terms whose meaning splits within the team are pinned in the glossary
- [ ] Coding conventions exist as a file rather than being repeated verbally every session
- [ ] (Existing projects) The rules file's descriptions match the actual state of the code

## Common Mistakes

- **Stuffing everything into the rules file, bloating context.** When a file that must be read in full every session runs to thousands of lines, the rules that actually matter get buried in noise and only token cost grows. Split detailed rules out into reference links.
- **Leaving documents and actual code out of sync.** If you don't refresh the rules file after refactoring, the agent generates code on the premise of a structure that no longer exists. A context asset is an asset only when it changes as much as the code changes; otherwise it's debt.

## With Claude Code

::: tip
Manage `CLAUDE.md` in layers. Put personal working habits and global rules in the global `CLAUDE.md` in your home directory, and rules that apply only to a given project in the project-root `CLAUDE.md`. In a multi-project workspace, put organization-wide common rules in a parent directory and project-specific rules in the child projects, so they inherit without duplication.

Extract recurring work procedures into skills under `.claude/skills/`, and work you repeatedly delegate to a particular role into subagent definitions. In both cases the test is whether it's "an asset reusable as-is in the next cycle" rather than "a prompt improvised in one session." A skill that has never been reused is a candidate for context bloat, so mark it for cleanup.
:::
