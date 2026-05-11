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
TELEGRAM_BOT_TOKEN=123456:bot-token
TELEGRAM_CHAT_ID=123456789
```

Если переменные не настроены, сайт откроет WhatsApp администратора с готовым текстом заявки.
