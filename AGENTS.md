# AGENTS

Rules for any AI agent (and human) working in this repo. Read this before touching code.

## What this is

A Bun backend: Elysia (HTTP) + Drizzle (Postgres), use cases over a pure domain.

<!-- After creating a project from the template, replace this section with what the product does. -->

- Spec (source of truth for behavior): [docs/spec.md](docs/spec.md), rule ids like `API-1`
- Executable spec: [features/](features/), Gherkin scenarios tagged with rule ids
- Naming: [docs/glossary.md](docs/glossary.md)
- Layers and dependency rule: [docs/architecture.md](docs/architecture.md)
- Decisions: [docs/adr/](docs/adr/)

## Commands

| Command | What it does |
|---|---|
| `bun install` | install deps and git hooks |
| `bun run dev` | API with watch |
| `bun run db:up` | start Postgres in Docker |
| `bun run verify` | everything CI runs: lint, types, architecture, comments, features, tests |
| `bun run fix` | format and auto-fix lint |
| `bun test <path>` | run tests, scoped to what you touched |

Run `bun run verify` before saying a task is done.

## Non-negotiable rules

1. **The spec wins.** Behavior comes from `docs/spec.md` and `features/`. If the spec is ambiguous or wrong,
   stop and say so; never invent a rule silently. Reference rule ids in tests and commit bodies.
2. **English only in code**: identifiers, files, tables, columns, errors, logs, commits. Use the glossary
   for every domain term; add missing terms to the glossary first.
3. **No comments in code.** The only allowed comment is `// MARK: <section>`. Names and small functions
   explain the code. `bun run comments` enforces it.
4. **Deterministic core.** No `new Date()`, `Date.now()` or `process` in `domain` or `application`: time
   comes from a `Clock` port, config is injected. Biome blocks them there.
5. **Respect the layers** (see architecture). Rules live in `domain`; use cases only orchestrate.
   `bun run arch` blocks forbidden imports.
6. **Business errors are values** (`Result`), typed and named after the rule they protect. `throw` only
   for bugs.
7. **No `any`, no non-null assertions, no default exports** (except config files), no `console` in `src`
   (except `main.ts`).

## Code style

- Biome formats everything: 2 spaces, single quotes, no semicolons, trailing commas, 100 columns.
- Files: `kebab-case.ts`. Types and classes: `PascalCase`. Functions and variables: `camelCase`.
- One use case per file, named after the action: `create-order.ts` exports `CreateOrder`.
- Prefer small pure functions and `readonly` data. No classes in the domain unless they guard invariants.
- Imports inside `src` use the `@/` alias.

## Tests

- Every behavior change comes with a test that cites the rule id in its name or tags.
- Scenarios run against use cases with in-memory adapters. Don't spin up Postgres for domain rules.
- Test the edges: empty, zero, max values, boundaries of dates and time zones.
- Don't run the full suite for a small change; run the files you touched, then `bun run verify` at the end.

## Git

- Conventional Commits, **in English**, lower-case subject: `feat(domain): add order total rule`.
- Allowed scopes: `domain`, `application`, `infra`, `http`, `db`, `bdd`, `docs`, `ci`, `deps`, `ai`, `repo`.
- Never add a `Co-Authored-By` trailer or "generated with" lines to commits or PRs.
- Never commit `.env` or secrets.
- Branch from `main`, open a PR, CI must be green.

## Definition of done

- [ ] Behavior matches the spec rule ids involved
- [ ] Tests cover the happy path, the errors and the edges
- [ ] `bun run verify` passes
- [ ] Glossary updated if a new term appeared
- [ ] Spec or ADR updated if a decision changed

## Skills

Project skills live in `.claude/skills/`:

- `new-use-case`: step-by-step to add a use case across domain, application, infra and http
- `spec-lookup`: how to find and cite the rules for a change, and what to do when the spec is unclear
- `review-change`: checklist to review a diff for spec fidelity, layers, determinism and tests
