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

const whatsappLinkFromPhone = (phone = '') => {
  let digits = String(phone).replace(/\D/g, '')
  if (digits.length === 10) digits = `7${digits}`
  if (digits.length === 11 && digits.startsWith('8')) digits = `7${digits.slice(1)}`
  return digits.length >= 10 ? `https://wa.me/${digits}` : ''
}

const sendDirectTelegramLead = async ({ problem, whatsapp, page, attribution }) => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.LEADS_CHAT_ID
  if (!token || !chatId) return false

  const whatsappLink = whatsappLinkFromPhone(whatsapp)
  const text = [
    '<b>Новая заявка: Заявка АЮС</b>',
    '',
    '<b>Сайт:</b> ays-legal-landing',
    `<b>Телефон:</b> ${escapeHtml(whatsapp)}`,
    whatsappLink ? `<b>WhatsApp:</b> ${escapeHtml(whatsappLink)}` : '',
    '',
    `<b>Сообщение:</b> ${escapeHtml(problem)}`,
    page ? `<b>Страница:</b> ${escapeHtml(page)}` : '',
    attribution ? `<b>Источник:</b> ${escapeHtml(attribution)}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })

  return response.ok
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'method_not_allowed' })
    return
  }

  const leadEndpoint = process.env.LEAD_ENDPOINT_URL || 'https://tg-transcriber-bot-feka.onrender.com/lead'
  const leadSecret = process.env.LEAD_FORM_SECRET || ''

  if (!leadEndpoint) {
    json(res, 500, { ok: false, error: 'lead_endpoint_missing' })
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

  const leadResponse = await fetch(leadEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(leadSecret ? { 'X-Lead-Secret': leadSecret } : {}),
    },
    body: JSON.stringify({
      site: 'ays-legal-landing',
      title: 'Заявка АЮС',
      phone: whatsapp,
      message: problem,
      page,
      attribution,
      fields: {
        'Проблема': problem,
        'WhatsApp': whatsapp,
      },
    }),
  })

  if (!leadResponse.ok && !(await sendDirectTelegramLead({ problem, whatsapp, page, attribution }))) {
    json(res, 502, { ok: false, error: 'lead_request_failed' })
    return
  }

  json(res, 200, { ok: true })
}
