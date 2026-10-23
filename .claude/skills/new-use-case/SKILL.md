---
name: new-use-case
description: Step-by-step to add or change a use case (command or query) across domain, application, infra and http, with tests tied to spec rule ids. Use when implementing any feature, endpoint, job or business behavior.
---

# New use case

Follow the steps in order. Don't skip the spec and the test steps.

## 1. Pin the behavior

1. Run the `spec-lookup` skill: list every rule id the use case touches.
2. Find the scenarios that cover it: `grep -rl '@ORD-3' features/`. Those scenarios are the acceptance
   criteria; make their steps pass.
3. Name it with the glossary: verb + noun, English (`CreateOrder`, `CancelOrder`, `GetOrder`).
   Commands change state; queries start with `Get`/`List` and never change state.

## 2. Domain first

- Put every rule in `src/domain/<concept>/`: value objects, entities, pure functions.
- No `Date`, no I/O, no npm packages. `today`/`now` arrives as an argument.
- Errors are typed values: `Result<T, DomainError>`.
- Write unit tests for the rule edges first.

## 3. Ports

- If the use case needs data, add or extend an interface in `src/application/ports/`
  (`OrderRepository`, `Clock`, `UnitOfWork`, `IdGenerator`).
- Ports speak domain types, never Drizzle rows or HTTP DTOs.

## 4. The use case

- File `src/application/use-cases/<kebab-name>.ts`, class `<PascalName>` with `execute(input)`.
- Shape: validate input → load through ports → ask the domain → persist in one `UnitOfWork` → return
  `Result`.
- No business `if`s here. If you are writing a rule, move it to the domain.
- Test it with in-memory adapters (`tests/support/in-memory/`), citing rule ids in the test names.

## 5. Infra

- Implement new port methods in `src/infra/` with Drizzle.
- Schema change → edit `src/infra/db/schema.ts`, run `bun run db:generate`, commit the migration.

## 6. HTTP (only if exposed)

- Route in `src/http/`: Elysia schema for the body, call the use case, map `Result` errors to status
  codes (`422` business rule, `404` not found, `409` conflict). No rules in routes.
- Wire the dependencies in `src/main.ts`.

## 7. Finish

- `bun test <touched files>`, then `bun run verify`.
- Commit: `feat(<layer>): <what>`, body lists the rule ids.
