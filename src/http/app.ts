import { Elysia } from 'elysia'

export function createApp() {
  return new Elysia().get('/health', () => ({ status: 'ok' as const }))
}

export type App = ReturnType<typeof createApp>
