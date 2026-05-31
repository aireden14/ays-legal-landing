import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const adminName = 'Али'
const whatsappDisplay = '+7 775 876 2049'
const whatsappDigits = '77758762049'
const whatsappHref = (text) =>
  `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(text)}`

const getAttribution = () => {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  const source = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((key) => [key, params.get(key)])
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)

  return source.length ? `\n\nИсточник:\n${source.join('\n')}` : ''
}

const trackGoal = (goal) => {
  if (typeof window === 'undefined') return
  window.dataLayer?.push?.({ event: goal })
  if (typeof window.ym === 'function' && window.SITE_ANALYTICS?.yandexMetrikaId) {
    window.ym(window.SITE_ANALYTICS.yandexMetrikaId, 'reachGoal', goal)
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  }),
}

const Icon = ({ children }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
)

const MessageIcon = () => (
  <Icon>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.94-.92L3 20l1.33-4.36A8.35 8.35 0 0 1 3 11.5a8.5 8.5 0 0 1 18 0Z" />
  </Icon>
)

const ArrowIcon = () => (
  <Icon>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
)

const CheckIcon = () => (
  <Icon>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
)

const ShieldIcon = () => (
  <Icon>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </Icon>
)

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`section ${className}`}>
    {children}
  </section>
)

const Nav = () => (
  <motion.header
    className="topbar"
    initial={{ opacity: 0, y: -18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
  >
    <a className="brand" href="#top" aria-label="АЮС">
      <span className="brand-mark">АЮС</span>
      <span>Агентство Юридического Сотрудничества</span>
    </a>
    <nav className="desktop-nav" aria-label="Навигация">
      <a href="#help">Помощь</a>
      <a href="#process">Как работаем</a>
      <a href="#request">Заявка</a>
    </nav>
    <a
      className="nav-call"
      href={whatsappHref(`Али, здравствуйте. Хочу получить консультацию в АЮС.${getAttribution()}`)}
      onClick={() => trackGoal('click_whatsapp_header')}
    >
      <MessageIcon />
      <span>WhatsApp</span>
    </a>
  </motion.header>
)

const LegalScene = () => (
  <motion.div
    className="legal-scene"
    initial={{ opacity: 0, y: 28, rotateX: 8 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
  >
    <div className="case-window">
      <div className="case-top">
        <span>АЮС</span>
        <span>разбор ситуации</span>
      </div>
      <div className="case-body">
        <div className="balance-card">
          <span>Счета и взыскания</span>
          <strong>нужен контроль</strong>
        </div>
        <div className="case-list">
          <span />
          <span />
          <span />
        </div>
        <div className="lawyer-card">
          <ShieldIcon />
          <div>
            <strong>Подбираем юриста</strong>
            <span>под вашу проблему и город</span>
          </div>
        </div>
      </div>
    </div>
    <div className="floating-note">
      <CheckIcon />
      <span>Оплата только за результат</span>
    </div>
  </motion.div>
)

const Hero = () => (
  <section id="top" className="hero">
    <div className="hero-bg" />
    <div className="hero-content">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial="hidden" animate="show" variants={fadeUp}>
          Казахстан. Дистанционно и с возможностью офлайн-встречи
        </motion.p>
        <motion.h1 initial="hidden" animate="show" variants={fadeUp} custom={1}>
          Вернем контроль над вашими счетами
        </motion.h1>
        <motion.p className="lead" initial="hidden" animate="show" variants={fadeUp} custom={2}>
          Профессиональная отмена исполнительных надписей и защита от незаконных действий ЧСИ в
          Казахстане. Оплата только за результат.
        </motion.p>
        <motion.div className="hero-actions" initial="hidden" animate="show" variants={fadeUp} custom={3}>
          <a className="btn btn-primary" href="#request" onClick={() => trackGoal('hero_form_click')}>
            Оставить заявку
            <ArrowIcon />
          </a>
          <a
            className="btn btn-glass"
            href={whatsappHref(`Али, здравствуйте. Хочу описать юридическую проблему.${getAttribution()}`)}
            onClick={() => trackGoal('click_whatsapp_hero')}
          >
            <MessageIcon />
            Написать в WhatsApp
          </a>
        </motion.div>
        <motion.div className="quick-trust" initial="hidden" animate="show" variants={fadeUp} custom={4}>
          <span>Без выдуманных обещаний</span>
          <span>Юрист под вашу ситуацию</span>
          <span>Сначала разбираем проблему</span>
        </motion.div>
      </div>
      <LegalScene />
    </div>
  </section>
)

const helpItems = [
  ['Исполнительные надписи', 'Разбираем ситуацию и подбираем юриста для отмены надписи, если есть законные основания.'],
  ['Действия ЧСИ', 'Помогаем сформулировать проблему и найти специалиста для защиты от незаконных действий.'],
  ['Блокировки и удержания', 'Передаем юристу детали по счетам, взысканию и документам, чтобы он оценил дальнейшие шаги.'],
  ['Консультация по маршруту', 'Объясняем, кто может помочь, как будет проходить работа и что нужно подготовить.'],
]

const Help = () => (
  <Section id="help">
    <motion.div className="section-heading" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <p className="eyebrow">С чем обращаются</p>
      <h2>Сначала понимаем проблему, потом соединяем с подходящим юристом</h2>
      <p>
        АЮС не обещает универсальный результат заранее. Мы аккуратно собираем вводные и ищем
        юриста, который работает именно с вашим типом вопроса.
      </p>
    </motion.div>
    <div className="benefit-grid">
      {helpItems.map(([title, text], index) => (
        <motion.article
          className="glass-card"
          key={title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={index}
        >
          <div className="check-badge">
            <CheckIcon />
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
        </motion.article>
      ))}
    </div>
  </Section>
)

const advantages = [
  ['Работаем дистанционно по всей стране', 'Можно начать из любого города Казахстана. Если нужна личная встреча, передадим юристу, что вы хотите офлайн-формат.'],
  ['Расскажем всё о подобранном юристе', 'До начала работы вы понимаете, кому передается вопрос, чем юрист занимается и почему он подходит под ситуацию.'],
  ['Без лишней бюрократии на старте', 'В заявке достаточно описать проблему и оставить WhatsApp. Остальное уточним в переписке.'],
]

const Advantages = () => (
  <Section id="advantages" className="advantages">
    <div className="wide-panel">
      <motion.div className="panel-copy" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <p className="eyebrow">Почему удобно</p>
        <h2>Вы не ищете юриста вслепую</h2>
        <p>
          Мы выступаем как понятная точка входа: фиксируем проблему, объясняем процесс и помогаем
          найти специалиста без давления и громких цифр.
        </p>
      </motion.div>
      <div className="advantage-list">
        {advantages.map(([title, text], index) => (
          <motion.div
            className="advantage-item"
            key={title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            custom={index}
          >
            <span>{index + 1}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
)

const steps = [
  ['Вы оставляете заявку', 'Коротко описываете проблему и оставляете номер WhatsApp.'],
  ['Мы уточняем детали', 'Понимаем документы, город, срочность и желаемый формат общения.'],
  ['Подбираем юриста', 'Находим специалиста под вашу задачу и рассказываем о нем до передачи контакта.'],
  ['Юрист оценивает работу', 'Дальше вы обсуждаете правовую позицию, сроки и условия уже со специалистом.'],
]

const Process = () => (
  <Section id="process">
    <motion.div className="section-heading" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <p className="eyebrow">Процесс</p>
      <h2>Четыре спокойных шага без сложных форм</h2>
    </motion.div>
    <div className="step-grid">
      {steps.map(([title, text], index) => (
        <motion.article
          className="step"
          key={title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={index}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </motion.article>
      ))}
    </div>
  </Section>
)

const LeadForm = () => {
  const [form, setForm] = useState({ problem: '', whatsapp: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [lastWhatsappMessage, setLastWhatsappMessage] = useState('')

  const message = useMemo(
    () =>
      [
        `${adminName}, здравствуйте. Хочу оставить заявку в АЮС.`,
        '',
        `Проблема: ${form.problem || 'не указана'}`,
        `WhatsApp: ${form.whatsapp || 'не указан'}`,
        getAttribution(),
      ].join('\n'),
    [form],
  )

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const submit = async (event) => {
    event.preventDefault()
    if (form.problem.trim().length < 12) {
      setError('Опишите проблему чуть подробнее, чтобы мы могли понять запрос.')
      return
    }
    if (form.whatsapp.replace(/\D/g, '').length < 10) {
      setError('Укажите номер WhatsApp, по которому можно с вами связаться.')
      return
    }

    setStatus('sending')
    trackGoal('lead_submit_attempt')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: form.problem.trim(),
          whatsapp: form.whatsapp.trim(),
          page: window.location.href,
          attribution: getAttribution(),
        }),
      })

      if (!response.ok) throw new Error('telegram_failed')
      setLastWhatsappMessage(message)
      setStatus('sent')
      setForm({ problem: '', whatsapp: '' })
      trackGoal('lead_submit_success')
    } catch {
      setStatus('fallback')
      trackGoal('lead_submit_failed')
    }
  }

  return (
    <Section id="request" className="request-section">
      <motion.div className="request-panel" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <div className="request-copy">
          <p className="eyebrow">Заявка</p>
          <h2>Опишите проблему. Мы напишем вам в WhatsApp</h2>
          <p>
            Не нужно знать юридические термины. Напишите своими словами: что произошло, кто
            взыскивает, есть ли блокировка счета или исполнительная надпись.
          </p>
          <div className="contact-line">
            <span>Контакт администратора</span>
            <strong>{adminName}, {whatsappDisplay}</strong>
          </div>
        </div>
        <form className="lead-form" onSubmit={submit}>
          <label>
            <span>Описание проблемы</span>
            <textarea
              value={form.problem}
              onChange={(event) => update('problem', event.target.value)}
              placeholder="Например: пришло уведомление от ЧСИ, заблокировали счет, хочу понять можно ли отменить исполнительную надпись..."
              rows="7"
            />
          </label>
          <label>
            <span>Номер WhatsApp</span>
            <input
              value={form.whatsapp}
              onChange={(event) => update('whatsapp', event.target.value)}
              inputMode="tel"
              placeholder="+7 777 000 00 00"
            />
          </label>
          {error && <p className="form-alert">{error}</p>}
          {status === 'sent' && (
            <p className="form-success">
              Заявка отправлена. Мы свяжемся с вами в WhatsApp. Можно не ждать и{' '}
              <a href={whatsappHref(lastWhatsappMessage || message)} target="_blank" rel="noopener noreferrer">
                сразу написать администратору
              </a>.
            </p>
          )}
          {status === 'fallback' && (
            <p className="form-alert">
              Telegram временно не принял заявку. WhatsApp доступен как дополнительный способ связи:{' '}
              <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer">
                написать администратору
              </a>.
            </p>
          )}
          <button className="btn btn-primary form-button" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправляем...' : 'Получить подбор юриста'}
            <ArrowIcon />
          </button>
          <p className="privacy-note">
            Нажимая кнопку, вы отправляете данные администратору АЮС для связи по заявке.
          </p>
        </form>
      </motion.div>
    </Section>
  )
}

const faqItems = [
  ['Вы сами оказываете юридические услуги?', 'АЮС помогает принять заявку, понять суть вопроса и подобрать юриста. Правовую оценку и дальнейшие действия обсуждает профильный специалист.'],
  ['Можно ли работать удаленно?', 'Да. Заявку можно начать дистанционно по Казахстану. Если клиент хочет офлайн-встречу, мы сообщим это юристу.'],
  ['Нужно ли платить сразу?', 'В оффере заявлена оплата только за результат. Конкретные условия по вашей ситуации уточняются после подбора специалиста.'],
]

const FAQ = () => (
  <Section id="faq" className="faq-section">
    <motion.div className="section-heading" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <p className="eyebrow">Вопросы</p>
      <h2>Коротко о главном</h2>
    </motion.div>
    <div className="faq-list">
      {faqItems.map(([question, answer], index) => (
        <motion.article
          className="faq-item"
          key={question}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          custom={index}
        >
          <h3>{question}</h3>
          <p>{answer}</p>
        </motion.article>
      ))}
    </div>
  </Section>
)

const Footer = () => (
  <footer className="footer">
    <div>
      <strong>АЮС</strong>
      <span>Агентство Юридического Сотрудничества</span>
    </div>
    <a href={whatsappHref(`${adminName}, здравствуйте. Хочу обратиться в АЮС.${getAttribution()}`)}>
      {whatsappDisplay}
    </a>
  </footer>
)

const App = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <Help />
      <Advantages />
      <Process />
      <LeadForm />
      <FAQ />
    </main>
    <Footer />
  </>
)

export default App
