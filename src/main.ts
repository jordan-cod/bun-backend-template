import { createApp } from '@/http/app.ts'

const port = Number(process.env['PORT'] ?? 3000)

createApp().listen(port)

console.info(`listening on http://localhost:${port}`)
