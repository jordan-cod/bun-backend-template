# bun-backend-template

Bun · Elysia · Drizzle · Postgres backend template, with use cases over a pure domain, strict quality
gates and rules for AI agents.

## Use it

```bash
gh repo create jordan-cod/<name> --private --template jordan-cod/bun-backend-template --clone
cd <name>
bun install
bun run rename <name> "<one-line description>"
cp .env.example .env
bun run db:up
bun run dev
```

`GET http://localhost:3000/health` → `{ "status": "ok" }`

Then:

1. Replace "What this is" in `AGENTS.md` with what the product does.
2. Write the rules in `docs/spec.md` (ids like `ORD-1`) and the terms in `docs/glossary.md`.
3. Write scenarios in `features/`, tagged with the rule ids.
4. Record decisions in `docs/adr/`.

## What's inside

| Area | Tooling |
|---|---|
| Runtime | Bun, TypeScript 6 strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, ...) |
| HTTP | Elysia |
| Database | Postgres 17 in Docker, Drizzle ORM and migrations |
| Lint and format | Biome, with `Date`/`process` banned in domain and application |
| Architecture | dependency-cruiser: domain is pure, use cases don't touch infra or frameworks |
| Comments | `scripts/check-comments.ts`: only `// MARK:` allowed in `src` |
| Spec | `docs/spec.md` with rule ids, `features/*.feature` validated by `scripts/check-features.ts` |
| Git hooks | lefthook: Biome, types, comments, features on commit; commitlint on message; arch and tests on push |
| Commits | Conventional Commits with fixed scopes |
| CI | GitHub Actions running the same gates |
| AI | `AGENTS.md`, `CLAUDE.md`, skills in `.claude/skills/`, auto-format hook in `.claude/settings.json` |

## Quality gates

```bash
bun run verify
```

## Docs

- [Spec](docs/spec.md) · [Features](features/) · [Glossary](docs/glossary.md)
- [Architecture](docs/architecture.md) · [ADRs](docs/adr/)
- [AGENTS.md](AGENTS.md)
