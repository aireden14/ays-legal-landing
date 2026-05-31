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

  if (!leadResponse.ok) {
    json(res, 502, { ok: false, error: 'lead_request_failed' })
    return
  }

  json(res, 200, { ok: true })
}
