const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const json = (res, status, payload) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'method_not_allowed' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    json(res, 500, { ok: false, error: 'telegram_env_missing' })
    return
  }

  let body = {}
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  } catch {
    json(res, 400, { ok: false, error: 'invalid_json' })
    return
  }
  const problem = String(body.problem || '').trim()
  const whatsapp = String(body.whatsapp || '').trim()
  const page = String(body.page || '').trim()
  const attribution = String(body.attribution || '').trim()

  if (problem.length < 12 || whatsapp.replace(/\D/g, '').length < 10) {
    json(res, 400, { ok: false, error: 'invalid_payload' })
    return
  }

  const text = [
    '<b>Новая заявка АЮС</b>',
    '',
    `<b>Проблема:</b>\n${escapeHtml(problem)}`,
    '',
    `<b>WhatsApp:</b> ${escapeHtml(whatsapp)}`,
    page ? `<b>Страница:</b> ${escapeHtml(page)}` : '',
    attribution ? `<b>Источник:</b>\n${escapeHtml(attribution)}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })

  if (!telegramResponse.ok) {
    json(res, 502, { ok: false, error: 'telegram_request_failed' })
    return
  }

  json(res, 200, { ok: true })
}
