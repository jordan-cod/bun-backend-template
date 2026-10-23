import { Glob } from 'bun'

const [name, description] = Bun.argv.slice(2)

if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error('Usage: bun run rename <kebab-case-name> ["one-line description"]')
  process.exit(1)
}

const targets = ['package.json', 'README.md', 'docs/adr/*.md', 'docker-compose.yml', '.env.example']
const replacements: Array<[RegExp, string]> = [
  [/bun-backend-template/g, name],
  [/POSTGRES_(USER|PASSWORD|DB): app/g, `POSTGRES_$1: ${name}`],
  [/pg_isready -U app/g, `pg_isready -U ${name}`],
  [
    /postgres:\/\/app:app@localhost:5432\/app/g,
    `postgres://${name}:${name}@localhost:5432/${name}`,
  ],
]

for (const pattern of targets) {
  for await (const file of new Glob(pattern).scan('.')) {
    const original = await Bun.file(file).text()
    const updated = replacements.reduce((text, [from, to]) => text.replace(from, to), original)
    if (updated !== original) {
      await Bun.write(file, updated)
      console.info(`updated ${file}`)
    }
  }
}

if (description) {
  const pkg = await Bun.file('package.json').json()
  pkg.description = description
  await Bun.write('package.json', `${JSON.stringify(pkg, null, 2)}\n`)
}

console.info(
  `\nRenamed to ${name}. Review the diff, then delete scripts/rename.ts and the "rename" script.`,
)
