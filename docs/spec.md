# Spec

> Business rules of the product. Every rule has a stable id (`PREFIX-n`) that code, tests, scenarios and
> commits reference. When a rule changes, change it here first, then the scenarios in `features/`, then
> the code. Ids are never reused.

## Prefixes

| Prefix | Area |
|---|---|
| `API` | API conventions |

## API conventions

| Id | Rule |
|---|---|
| API-1 | `GET /health` answers `200` with `{ "status": "ok" }` while the process is up. |

<!-- Add sections per area. Keep rules short, testable, and with concrete examples. -->

## Invariants

Things that must always be true. They become property tests.

| Id | Invariant |
|---|---|

## Decision log

| # | Decision | Why |
|---|---|---|
