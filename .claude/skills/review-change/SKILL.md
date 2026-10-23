---
name: review-change
description: Checklist to review a diff or PR for spec fidelity, layer boundaries, determinism, error handling and tests. Use when reviewing code, before opening a PR, or when asked to audit a change.
---

# Review a change

Go through every item. Report findings with `file:line`, the rule id, and a concrete failing input.

## Spec fidelity

- [ ] Every behavior maps to a rule id in `docs/spec.md`; nothing invented.
- [ ] Rules referenced by those rules were also honored (follow the ids in parentheses).
- [ ] Invariants still hold.
- [ ] The scenarios tagged with those ids pass.

## Layers

- [ ] Rules in `domain`, orchestration in use cases, no rules in routes or repositories.
- [ ] `bun run arch` passes; no Elysia/Drizzle outside `http`/`infra`.

## Determinism and data

- [ ] No `Date`, `process` or randomness in domain/application; time from `Clock`, ids from `IdGenerator`.
- [ ] Boundaries checked: empty, zero, max, inclusive/exclusive ranges, month ends, time zones.
- [ ] Derived data computed, not stored, unless a cache is justified and recomputable.

## Errors and state

- [ ] Business failures are typed `Result` errors named after the rule; no generic `Error`.
- [ ] Commands run in one transaction; queries don't write.
- [ ] Retries and repeated jobs are idempotent.

## Tests and hygiene

- [ ] Tests cite rule ids and cover happy path, errors and edges.
- [ ] No comments except `// MARK:`; English names from the glossary.
- [ ] `bun run verify` green.
