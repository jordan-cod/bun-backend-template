import { Glob } from 'bun'

const allowed = /^\s*\/\/ MARK: \S/
const lineComment = /(^|[^:'"`\\])\/\/(?!\/ <reference)/
const blockComment = /\/\*/

type Violation = { file: string; line: number; text: string }

function stripStrings(line: string): string {
  return line.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '""')
}

async function findViolations(): Promise<Violation[]> {
  const violations: Violation[] = []
  for await (const file of new Glob('src/**/*.ts').scan('.')) {
    const lines = (await Bun.file(file).text()).split('\n')
    lines.forEach((raw, index) => {
      if (allowed.test(raw)) {
        return
      }
      const code = stripStrings(raw)
      if (lineComment.test(code) || blockComment.test(code)) {
        violations.push({ file, line: index + 1, text: raw.trim() })
      }
    })
  }
  return violations
}

const violations = await findViolations()

if (violations.length > 0) {
  console.error('Comments are not allowed in src/. Only "// MARK: <section>" is accepted.\n')
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.text}`)
  }
  process.exit(1)
}
