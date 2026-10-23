# Features

Executable spec: Gherkin scenarios, one folder per area. Every scenario is tagged with the rule ids it
proves (see [../docs/spec.md](../docs/spec.md)). `bun run features` validates the syntax and the tags.

## Conventions

- One `.feature` per feature, starting with `# language: <lang>` (`pt` or `en`). Keep one language per
  project.
- Every scenario has **tags with the rule ids** it proves: `@ORD-3 @ORD-7`. Extra tags: `@edge` (boundary),
  `@error` (validation/block), `@integration`.
- One behavior per scenario. Values are always concrete, never "any value".
- Tabular cases (boundaries, month ends) use `Scenario Outline` / `Esquema do Cenário` + `Examples`.
- Fix the clock in every scenario (`Given today is 2026-03-15`); never depend on the real date.
- An ambiguity found while writing becomes a `# PENDING DECISION: ...` comment above the scenario, with the
  assumed behavior, and is raised to the spec owner.
- Same meaning, same step wording: keep the step vocabulary below up to date so steps map to reusable
  step definitions.

## Step vocabulary

| Step | Meaning |
|---|---|
| `Quando eu faço GET em "/path"` | HTTP request in API scenarios |
| `Então a resposta tem status 200` | HTTP status |
| `E o corpo é {json}` | exact JSON body |
