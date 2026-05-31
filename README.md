# АЮС Legal Landing

Одностраничный лендинг для сбора заявок на юридические услуги в Казахстане.

## Запуск

```bash
npm install
npm run dev
```

## Telegram

Форма отправляет заявки в `/api/lead`. Для деплоя на Vercel задайте переменные:

```bash
LEAD_ENDPOINT_URL=https://tg-transcriber-bot-feka.onrender.com/lead
LEAD_FORM_SECRET=same-secret-as-bot
```

Если переменные не настроены, сайт откроет WhatsApp администратора с готовым текстом заявки.
