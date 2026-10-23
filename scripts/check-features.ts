import { AstBuilder, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin'
import { IdGenerator } from '@cucumber/messages'
import { Glob } from 'bun'

const parser = new Parser(new AstBuilder(IdGenerator.uuid()), new GherkinClassicTokenMatcher('en'))
const ruleTag = /^@[A-Z]{2,5}-\d+$/

let files = 0
let scenarios = 0
const errors: string[] = []

for await (const file of new Glob('features/**/*.feature').scan('.')) {
  files++
  try {
    const document = parser.parse(await Bun.file(file).text())
    for (const child of document.feature?.children ?? []) {
      const scenario = child.scenario
      if (!scenario) {
        continue
      }
      scenarios++
      if (!scenario.tags.some((tag) => ruleTag.test(tag.name))) {
        errors.push(`${file}:${scenario.location.line} "${scenario.name}" has no rule id tag`)
      }
    }
  } catch (error) {
    errors.push(`${file}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.info(`${files} feature files, ${scenarios} scenarios, all valid and tagged with rule ids`)
