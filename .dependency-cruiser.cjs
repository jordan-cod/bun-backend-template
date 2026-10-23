module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'domain-is-pure',
      comment:
        'The domain depends on nothing but itself: no application, infra, http or npm packages.',
      severity: 'error',
      from: { path: '^src/domain' },
      to: { pathNot: '^src/domain', dependencyTypesNot: ['type-only'] },
    },
    {
      name: 'domain-no-packages',
      severity: 'error',
      from: { path: '^src/domain' },
      to: { dependencyTypes: ['npm', 'npm-dev', 'npm-optional', 'npm-peer'] },
    },
    {
      name: 'application-only-domain',
      comment:
        'Use cases orchestrate the domain through ports. They never touch infra, http or frameworks.',
      severity: 'error',
      from: { path: '^src/application' },
      to: { path: '^src/(infra|http)' },
    },
    {
      name: 'application-no-frameworks',
      severity: 'error',
      from: { path: '^src/application' },
      to: { path: 'node_modules/(elysia|drizzle-orm|drizzle-kit)' },
    },
    {
      name: 'http-not-infra',
      comment: 'Routes call use cases. Wiring of infra happens only in src/main.ts.',
      severity: 'error',
      from: { path: '^src/http' },
      to: { path: '^src/infra' },
    },
    {
      name: 'infra-not-http',
      severity: 'error',
      from: { path: '^src/infra' },
      to: { path: '^src/http' },
    },
    {
      name: 'not-to-tests',
      severity: 'error',
      from: { path: '^src' },
      to: { path: '^tests' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      mainFields: ['module', 'main', 'types', 'typings'],
    },
  },
}
