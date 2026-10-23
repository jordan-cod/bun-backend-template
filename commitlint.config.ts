import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['domain', 'application', 'infra', 'http', 'db', 'bdd', 'docs', 'ci', 'deps', 'ai', 'repo'],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'body-max-line-length': [2, 'always', 100],
    'trailer-exists': [0],
  },
}

export default config
