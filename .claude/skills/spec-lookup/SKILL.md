---
name: spec-lookup
description: How to find, read and cite the business rules (docs/spec.md, ids like ORD-3) and scenarios (features/) for a change, translate terms with the glossary, and what to do when the spec is ambiguous or contradicts itself. Use before implementing or reviewing any behavior.
---

# Spec lookup

## Where things are

- `docs/spec.md`: the rules, grouped by section, each with a stable id (`PREFIX-n`).
- `docs/glossary.md`: domain terms → code names. Use it for every identifier.
- `features/`: the executable spec. Every scenario is tagged with rule ids (`grep -rn '@ORD-3' features/`).

## How to look up

1. Translate the task into spec terms with the glossary.
2. Grep the rule prefix in `docs/spec.md` (the prefixes are listed at its top).
3. Read the rule **and every rule it references** (ids in parentheses). Rules chain.
4. Check the invariants section and the decision log, if the spec has them.
5. List the ids you will cite in tests and in the commit body.

## When the spec is unclear

- Ambiguous, contradictory, or silent on a case: **stop and report it** with the rule ids and a concrete
  example. Propose a resolution, but don't implement an invented rule.
- If the owner decides, update `docs/spec.md` first, then the affected scenarios, then code.
