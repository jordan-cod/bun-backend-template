# ADR 0001: Stack and architecture

- Status: accepted
- Date: 2026-10-23

## Context

Backend service. Correctness and a codebase that AI agents can work in
safely matter more than raw speed.

## Decision

- **Runtime:** Bun.
- **HTTP:** Elysia, confined to `src/http`.
- **Database:** Postgres 17 with Drizzle, confined to `src/infra`.
- **Architecture:** use cases over a pure domain (hexagonal), enforced by dependency-cruiser.
- **Spec:** rules with ids in `docs/spec.md`, executable Gherkin scenarios in `features/`.
- **Language:** code 100% in English, mapped from the spec by `docs/glossary.md`.
- **Quality:** Biome (lint + format), TypeScript strict, comment checker, Gherkin validator, lefthook,
  commitlint, CI.
- **Deploy:** Docker Compose.

## Consequences

- Business rules can be tested without a server or database.
- Elysia and Drizzle can be swapped without touching the domain.
- TypeScript is pinned to 6.x: dependency-cruiser does not support the TypeScript 7 API yet.
