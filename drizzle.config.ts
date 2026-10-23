import { defineConfig } from 'drizzle-kit'

const url = process.env['DATABASE_URL']

if (!url) {
  throw new Error('DATABASE_URL is not set. Copy .env.example to .env.')
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/infra/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url },
  strict: true,
  verbose: true,
})
