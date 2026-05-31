import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const readRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })

const leadDevProxy = () => ({
  name: 'lead-dev-proxy',
  configureServer(server) {
    server.middlewares.use('/api/lead', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }))
        return
      }

      try {
        const rawBody = await readRequestBody(req)
        const leadResponse = await fetch('https://tg-transcriber-bot-feka.onrender.com/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: rawBody,
        })
        const responseText = await leadResponse.text()

        res.statusCode = leadResponse.status
        res.setHeader('Content-Type', leadResponse.headers.get('content-type') || 'application/json; charset=utf-8')
        res.end(responseText)
      } catch (error) {
        server.config.logger.error(error)
        res.statusCode = 502
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({ ok: false, error: 'lead_proxy_failed' }))
      }
    })
  },
})

export default defineConfig({
  base: './',
  plugins: [react(), leadDevProxy()],
  server: { port: 5173, open: true }
})
