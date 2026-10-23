import { describe, expect, it } from 'bun:test'
import { createApp } from '@/http/app.ts'

describe('GET /health', () => {
  it('reports the service as up', async () => {
    const response = await createApp().handle(new Request('http://localhost/health'))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})
